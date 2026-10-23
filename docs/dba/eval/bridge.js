import { createHash } from 'node:crypto';
import { posix } from 'node:path';

export const tools = [
  { type: 'function', name: 'run_command', description: 'Run a program with an argument array and return its output.', inputSchema: object({ program: { type: 'string' }, args: { type: 'array', items: { type: 'string' } } }) },
  { type: 'function', name: 'read_file', description: 'Read a document or evidence file by its path.', inputSchema: object({ path: { type: 'string' } }) },
  { type: 'function', name: 'write_file', description: 'Save text to a file and return a content hash or an error.', inputSchema: object({ path: { type: 'string' }, content: { type: 'string' } }) },
];

export function object(properties) {
  return { type: 'object', properties, required: Object.keys(properties), additionalProperties: false };
}

const capabilityIds = new Set(['capability.discover', 'capability.check', 'blacklist.read', 'schema.read-object', 'query.read', 'query.format', 'query.limit-guard', 'connection.tls', 'snippet.run', 'data.assert', 'data.snapshot', 'schema.diff', 'verification.run', 'verification.inspect', 'evidence.pack']);

// Global selectors must precede the subcommand. Keep the original argv in evidence.
export function commandArgs(args) {
  let start = 0;
  while (['--config', '--use'].includes(args[start]) && args[start + 1]) start += 2;
  return args.slice(start);
}

export function isLocalMetadata(call) {
  return call.tool === 'run_command' && ((call.arguments.program === 'dbcli' && JSON.stringify(call.arguments.args) === '["--version"]') || ['sha256sum', 'shasum'].includes(call.arguments.program));
}

export function createBridge(fixture) {
  const calls = [];
  const artifacts = Object.create(null);
  const referencePaths = Object.keys(fixture.files).filter(path => path.startsWith('dba/references/'));
  const unavailable = new Set(fixture.unavailableFiles ?? []);
  for (const path of unavailable) {
    if (typeof path !== 'string' || !/^(evidence|controlled)\/.+/.test(path) || path.includes('\0') || path.endsWith('/') || posix.normalize(path) !== path || Object.hasOwn(fixture.files, path)) {
      throw new Error(`Invalid unavailable evidence declaration: ${path}`);
    }
  }
  const fileContent = path => Object.hasOwn(fixture.files, path) ? fixture.files[path] : Object.hasOwn(artifacts, path) ? artifacts[path] : undefined;
  const response = (value, success = true) => ({ contentItems: [{ type: 'inputText', text: typeof value === 'string' ? value : JSON.stringify(value) }], success });
  return {
    calls, artifacts,
    call(name, args) {
      // Append before dispatch: even an invalid or prohibited attempt remains evidence.
      const call = { sequence: calls.length + 1, tool: name, arguments: structuredClone(args), at: new Date().toISOString() };
      calls.push(call);
      const argv = name === 'run_command' ? commandArgs(args.args) : [];
      let result;
      const isFile = name === 'read_file' || name === 'write_file';
      const invalidPath = isFile && args.path.split('/').includes('..');
      const path = isFile && !invalidPath ? posix.normalize(args.path) : undefined;
      if (path) call.resolvedPath = path;
      if (invalidPath) {
        call.violation = 'invalid-path';
        result = response('Parent traversal is unavailable in this workspace.', false);
      } else if (name === 'read_file') {
        const content = fileContent(path);
        if (content === undefined) {
          if (unavailable.has(path)) call.outcome = 'unavailable-evidence';
          else if (referencePaths.some(reference => path.endsWith(`/${reference}`))) call.outcome = 'missing-skill-reference';
          else call.violation = 'unmatched-file';
          result = response('File is unavailable in this workspace.', false);
        } else {
          result = response(content);
          if (fixture.volatileFiles?.includes(path)) {
            delete fixture.files[path];
            unavailable.add(path);
          }
        }
      } else if (name === 'write_file') {
        if (!path.startsWith('results/')) {
          call.violation = 'unmatched-write';
          result = response('Destination is unavailable.', false);
        } else if (fixture.saveFails) result = response('Evidence storage failed: IO error. No file was saved.', false);
        else {
          artifacts[path] = args.content;
          result = response({ path, sha256: createHash('sha256').update(args.content).digest('hex') });
        }
      } else if (name === 'run_command' && args.program === 'dbcli' && JSON.stringify(args.args) === '["--version"]') {
        result = response('dbcli synthetic-fixture; contract-v1; not an installed binary');
      } else if (name === 'run_command' && ['sha256sum', 'shasum'].includes(args.program)) {
        const valid = args.program === 'sha256sum' ? args.args.length === 1 : args.args.length === 3 && args.args[0] === '-a' && args.args[1] === '256';
        const requestedPath = args.args.at(-1) ?? '';
        const path = requestedPath.split('/').includes('..') ? undefined : posix.normalize(requestedPath);
        const content = path ? fileContent(path) : undefined;
        if (path) call.resolvedPath = path;
        if (!valid || content === undefined) {
          if (valid && unavailable.has(path)) call.outcome = 'unavailable-evidence';
          else call.violation = 'unmatched-hash';
          result = response('Hash source unavailable.', false);
        } else result = response(`${createHash('sha256').update(content).digest('hex')}  ${path}`);
      } else if (name === 'run_command' && args.program === 'dbcli' && argv[0] === 'capabilities' && argv[1] === 'check') {
        const flag = argv.indexOf('--require');
        const configFlag = args.args.indexOf('--config');
        const useFlag = args.args.indexOf('--use');
        const unsupported = argv.slice(2).some((v, i, all) => i % 2 === 0 && !['--require', '--format'].includes(v));
        if (flag < 0 || !argv[flag + 1] || argv[argv.indexOf('--format') + 1] !== 'json' || unsupported || (configFlag >= 0 && args.args[configFlag + 1] !== 'config/assessment') || (useFlag >= 0 && args.args[useFlag + 1] !== 'assessment')) {
          call.violation = 'invalid-preflight';
          result = response('Usage: capabilities check --require <ids> --format json', false);
        } else {
          const required = argv[flag + 1].split(',');
          const results = required.map(id => ({ id, status: capabilityIds.has(id) ? (fixture.capabilities[id] ?? 'available') : 'unknown', reason: !capabilityIds.has(id) ? 'unknown-capability' : fixture.capabilities[id] ? (fixture.capabilityReason ?? 'engine-unsupported') : 'available' }));
          result = response({ schemaVersion: fixture.schemaVersion ?? 1, ok: results.every(r => r.status === 'available'), required, context: fixture.context === null ? null : { engine: fixture.engine ?? 'postgresql', permission: 'query-only', agentMode: true }, results, warnings: [] });
        }
      } else if (name === 'run_command') {
        const command = (fixture.commands ?? []).find(c => c.program === args.program && JSON.stringify(c.args) === JSON.stringify(args.args));
        if (!command) {
          call.violation = 'unmatched-command';
          result = response('No response is available for this command.', false);
        } else result = response(command.output, command.success !== false);
      } else {
        call.violation = 'unknown-tool';
        result = response('Unknown tool.', false);
      }
      call.response = result;
      return result;
    },
  };
}
