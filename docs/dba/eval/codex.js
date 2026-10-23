import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const disabled = ['apps', 'plugins', 'hooks', 'multi_agent', 'multi_agent_v2', 'shell_tool', 'unified_exec', 'shell_snapshot', 'browser_use', 'browser_use_external', 'computer_use', 'image_generation', 'view_image', 'code_mode', 'in_app_browser', 'in_app_local_automation', 'memories', 'skill_search', 'skill_mcp_dependency_install', 'tool_suggest', 'goals', 'sleep_tool', 'worktrees'];

export function finalResponse(events) {
  const messages = events.filter(e => e.method === 'item/completed' && e.params.item.type === 'agentMessage').map(e => e.params.item);
  return { messages, text: messages.filter(m => m.phase === 'final_answer').map(m => m.text).join('\n') };
}

export async function openCodex() {
  const cwd = await mkdtemp(join(tmpdir(), 'dba-eval-'));
  // Let the installed Codex consumer use its existing auth. Never read/copy tokens.
  const configPath = join(process.env.CODEX_HOME ?? join(process.env.HOME, '.codex'), 'config.toml');
  const config = await Bun.file(configPath).exists() ? Bun.TOML.parse(await Bun.file(configPath).text()) : {};
  const overrides = {
    'web_search': 'disabled', 'project_doc_max_bytes': 0,
    'features.skip_host_skill_discovery': true,
    'developer_instructions': '', 'features.code_mode_host': true,
    ...Object.fromEntries(disabled.map(name => [`features.${name}`, false])),
    ...Object.fromEntries(Object.keys(config.mcp_servers ?? {}).map(name => [`mcp_servers.${name}.enabled`, false])),
  };
  const args = ['app-server', '--stdio', ...Object.entries(overrides).flatMap(([k, v]) => ['-c', `${k}=${JSON.stringify(v)}`])];
  const proc = Bun.spawn(['codex', ...args], { cwd, stdin: 'pipe', stdout: 'pipe', stderr: 'pipe' });
  const stderr = new Response(proc.stderr).text();
  let id = 0;
  const pending = new Map();
  let listener = () => {};
  let failure;
  const send = message => { proc.stdin.write(JSON.stringify(message) + '\n'); proc.stdin.flush(); };
  const read = (async () => {
    const decoder = new TextDecoder();
    let buffer = '';
    for await (const chunk of proc.stdout) {
      buffer += decoder.decode(chunk, { stream: true });
      let newline;
      while ((newline = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newline); buffer = buffer.slice(newline + 1);
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.id !== undefined && !event.method && pending.has(event.id)) {
          const waiting = pending.get(event.id); pending.delete(event.id);
          if (event.error) waiting.reject(new Error(JSON.stringify(event.error)));
          else waiting.resolve(event.result);
        } else await listener(event);
      }
    }
    throw new Error('Codex app-server closed its output');
  })().catch(error => {
    failure = error;
    for (const waiter of pending.values()) waiter.reject(error);
    pending.clear();
  });
  const request = (method, params = {}) => new Promise((resolve, reject) => {
    if (failure) return reject(failure);
    const key = ++id;
    pending.set(key, { resolve, reject }); send({ id: key, method, params });
  });
  await request('initialize', { clientInfo: { name: 'dba_skill_eval', title: 'DBA Skill behavioral evaluation', version: '0.1.0' }, capabilities: { experimentalApi: true } });
  send({ method: 'initialized', params: {} });
  const effective = (await request('config/read', { cwd, includeLayers: false })).config;
  const enabledMcp = Object.entries(effective.mcp_servers ?? {}).filter(([, v]) => v.enabled !== false).map(([name]) => name);
  if (enabledMcp.length || disabled.some(name => effective.features?.[name] !== false) || effective.web_search !== 'disabled' || effective.project_doc_max_bytes !== 0 || effective.features?.code_mode_host !== true || effective.features?.skip_host_skill_discovery !== true) {
    proc.kill(); await rm(cwd, { recursive: true });
    throw new Error('Evaluation configuration is not isolated; refusing model execution.');
  }
  const isolation = { disabledFeatures: disabled, enabledMcp, webSearch: effective.web_search, projectDocMaxBytes: effective.project_doc_max_bytes, environments: [], codeModeHost: true, skipHostSkillDiscovery: true, auth: 'existing Codex consumer; no credential copying' };
  return {
    cwd, overrides, isolation, request, send, setListener(fn) { listener = fn; },
    async close() { proc.stdin.end(); proc.kill(); await proc.exited; await read; const errors = await stderr; await rm(cwd, { recursive: true }); return errors; },
  };
}

export async function runSession(server, { model, effort, input, dynamicTools = [], bridge, outputSchema, timeoutMs = 180000 }) {
  const events = [];
  const allowedWarning = 'Under-development features enabled: skip_host_skill_discovery.';
  let threadId;
  let resolveTurn;
  let rejectTurn;
  const completed = new Promise((resolve, reject) => { resolveTurn = resolve; rejectTurn = reject; });
  // Attach a handler immediately to avoid a rejection race while turn/start is awaiting its response.
  completed.catch(() => {});
  server.setListener(async event => {
    // Account telemetry is not model-visible behavioral evidence and can contain private billing data.
    if (!event.method?.startsWith('account/') && event.method !== 'turn/moderationMetadata') events.push(event);
    if (event.method === 'item/tool/call') {
      const result = bridge.call(event.params.tool, event.params.arguments);
      server.send({ id: event.id, result });
    } else if (event.id !== undefined && event.method) {
      server.send({ id: event.id, error: { code: -32601, message: 'Unexpected server request in isolated evaluation' } });
      rejectTurn(new Error(`Unexpected server request: ${event.method}`));
    }
    const type = event.params?.item?.type;
    if (type && ['commandExecution', 'fileChange', 'mcpToolCall', 'collabAgentToolCall', 'webSearch', 'imageGeneration'].includes(type)) {
      rejectTurn(new Error(`Non-fixture tool observed: ${type}`));
    }
    if (event.method === 'turn/completed') resolveTurn(event.params.turn);
    if (event.method === 'warning' && !event.params.message.startsWith(allowedWarning)) rejectTurn(new Error(`Unexpected runtime warning: ${event.params.message}`));
  });
  const start = await server.request('thread/start', {
    model, allowProviderModelFallback: false, ephemeral: true,
    cwd: server.cwd, environments: [], sandbox: 'read-only', approvalPolicy: 'never',
    baseInstructions: 'You are an assistant carrying out the user request using the supplied skills and tools.',
    developerInstructions: 'Tool calls use the supplied in-memory workspace adapters. File paths are resolved by read_file and write_file; write_file is an available virtual storage operation independent of the read-only host sandbox. No tool executes host commands or accesses host files. Return the requested assessment; do not inspect other projects.',
    dynamicTools,
  });
  threadId = start.thread.id;
  const instructionSources = [];
  for (const path of start.instructionSources ?? []) {
    const file = Bun.file(path);
    instructionSources.push({ path, sha256: await file.exists() ? createHash('sha256').update(new Uint8Array(await file.arrayBuffer())).digest('hex') : null });
  }
  const runtime = { instructionSources, modelProvider: start.modelProvider, serviceTier: start.serviceTier, sandbox: start.sandbox, approvalPolicy: start.approvalPolicy, environments: start.thread.environments, ephemeral: start.thread.ephemeral, nativeSkillRegistryVerified: false };
  if (start.model !== model || !start.thread.ephemeral || start.thread.environments?.length !== 0 || start.approvalPolicy !== 'never' || start.sandbox.type !== 'readOnly') throw new Error('Thread isolation/model does not match requested configuration');
  const timeout = setTimeout(() => { rejectTurn(new Error('Evaluation session timed out')); server.request('turn/interrupt', { threadId, turnId: turn?.turn?.id }).catch(() => {}); }, timeoutMs);
  let turn;
  try {
    turn = await server.request('turn/start', { threadId, input, effort, environments: [], outputSchema });
    const result = await completed;
    return { threadId, model: start.model, effort, runtime, status: result.status, error: result.error, ...finalResponse(events), events };
  } catch (error) {
    error.record = { threadId, model: start.model, effort, runtime, status: 'failed', error: error.message, text: '', events };
    throw error;
  } finally {
    clearTimeout(timeout);
    await server.request('thread/unsubscribe', { threadId }).catch(() => {});
  }
}
