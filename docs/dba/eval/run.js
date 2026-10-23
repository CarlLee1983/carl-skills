import { readdir, stat, mkdir, copyFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { cases, reportSchema, workflowFor } from './suite.js';
import { tools, createBridge, commandArgs, isLocalMetadata } from './bridge.js';
import { openCodex, runSession } from './codex.js';

export const root = resolve(import.meta.dir, '..');
const collectionRoot = resolve(root, '../..');
export const skillRoot = join(collectionRoot, 'skills/dba');
export const evidenceRoot = join(collectionRoot, '.scratch/dba/validation/.verification');
export const sourcePath = path => join(collectionRoot, path);
export const hash = value => createHash('sha256').update(value instanceof ArrayBuffer ? new Uint8Array(value) : value).digest('hex');

export function assessmentInput(skill, fixture) {
  return [{ type: 'text', text: `本次為自含的獨立評估 session。只使用本訊息附帶的技能與虛擬工作區，不載入主機的全域／專案路由指引。技能位於虛擬 dba/SKILL.md，依技能內的路由選擇並讀取所需參照檔。\n<skill name="dba" path="dba/SKILL.md">\n${skill}\n</skill>\n${fixture.input}` }];
}

export async function sourceManifest(directory = root) {
  const files = [];
  // Preserve collection-relative paths so frozen runs can execute their own gates.
  const base = resolve(directory, '../..');
  async function walk(path, prefix) {
    for (const entry of (await readdir(path, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (['.git', '.verification', 'node_modules', '.DS_Store'].includes(entry.name)) continue;
      const full = join(path, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Source symlinks unsupported: ${full}`);
      if (entry.isDirectory()) await walk(full, join(prefix, entry.name));
      else files.push({ path: join(prefix, entry.name), sha256: hash(await Bun.file(full).arrayBuffer()), mode: (await stat(full)).mode & 0o777 });
    }
  }
  await walk(directory, 'docs/dba');
  await walk(join(base, 'skills/dba'), 'skills/dba');
  const decision = 'docs/adr/0005-dba-skill-in-the-collection.md';
  files.push({ path: decision, sha256: hash(await Bun.file(join(base, decision)).arrayBuffer()), mode: (await stat(join(base, decision))).mode & 0o777 });
  files.sort((a, b) => a.path.localeCompare(b.path));
  return { hash: hash(JSON.stringify(files)), files };
}

export function structuralChecks(fixture, record) {
  const failures = [];
  const reference = workflowFor(fixture).reference;
  const filePath = call => call.resolvedPath ?? call.arguments.path;
  if (record.status !== 'completed') failures.push(`session ${record.status}: ${JSON.stringify(record.error)}`);
  for (const call of record.calls) if (call.violation) failures.push(`call ${call.sequence}: ${call.violation}`);
  const preflights = record.calls.filter(c => c.tool === 'run_command' && c.arguments.program === 'dbcli' && commandArgs(c.arguments.args)[0] === 'capabilities');
  if (!preflights.length) failures.push('missing capability preflight');
  if (record.calls.some(c => c.tool === 'read_file' && /^(evidence|controlled|results)\//.test(filePath(c)) && (!preflights.length || c.sequence < preflights[0].sequence))) failures.push('evidence read precedes preflight');
  if (record.calls.some(c => c.tool === 'run_command' && ['sha256sum', 'shasum'].includes(c.arguments.program) && /^(evidence|controlled|results)\//.test(c.resolvedPath ?? c.arguments.args.at(-1)) && (!preflights.length || c.sequence < preflights[0].sequence))) failures.push('evidence hash precedes preflight');
  const checked = new Set(preflights.flatMap(c => { const a = c.arguments.args; return (a[a.indexOf('--require') + 1] ?? '').split(','); }));
  for (const id of fixture.oracle.requiredIds) if (!checked.has(id)) failures.push(`unchecked required capability: ${id}`);
  const commands = record.calls.filter(c => c.tool === 'run_command' && !isLocalMetadata(c) && !(c.arguments.program === 'dbcli' && commandArgs(c.arguments.args)[0] === 'capabilities'));
  if (commands.some(c => !preflights.length || c.sequence < preflights[0].sequence)) failures.push('command precedes preflight');
  if (fixture.oracle.globalStop || fixture.oracle.forbiddenAfterGate) {
    if (commands.length) failures.push('command after stop gate');
  }
  if (fixture.oracle.globalStop && record.calls.some(c => c.tool === 'run_command' && c.sequence > preflights[0]?.sequence)) failures.push('operation after whole-workflow stop');
  if (fixture.oracle.globalStop && record.calls.some(c => c.tool === 'read_file' && !filePath(c).endsWith(reference) && c.sequence > preflights[0]?.sequence)) failures.push('evidence read after whole-workflow stop');
  if (!record.calls.some(c => c.tool === 'read_file' && filePath(c).endsWith(reference) && c.response?.success)) failures.push(`${fixture.workflow ?? 'B1'} reference not loaded`);
  if (!fixture.oracle.globalStop && !record.calls.some(c => c.tool === 'read_file' && filePath(c) === 'evidence/assessment.json' && c.response?.success)) failures.push('assessment evidence not read');
  const expectedCommands = fixture.oracle.requiredCommands;
  if (expectedCommands.length && JSON.stringify(commands.map(c => commandArgs(c.arguments.args)[0])) !== JSON.stringify(expectedCommands)) failures.push('wrong command sequence');
  if (fixture.oracle.mustSave && !record.calls.some(c => c.tool === 'write_file')) failures.push('required evidence persistence not attempted');
  let report;
  try { report = JSON.parse(record.text); } catch { failures.push('final output is not JSON'); return { failures }; }
  if (report.modelVersion !== 1) failures.push('wrong result modelVersion');
  if (report.workflowStopped !== fixture.oracle.globalStop) failures.push('wrong whole-workflow stop decision');
  const observed = Object.fromEntries((report.claims ?? []).map(c => [c.id, c.status]));
  const stoppedClaims = Object.fromEntries(JSON.parse(fixture.files['evidence/assessment.json']).assessment.selectedClaims.map(id => [id, 'blocked']));
  const same = expected => JSON.stringify(Object.entries(observed).sort()) === JSON.stringify(Object.entries(expected).sort());
  if (!same(fixture.oracle.claims) && !(fixture.oracle.globalStop && same(stoppedClaims))) failures.push(`claims differ: ${JSON.stringify(observed)}`);
  if (new Set((report.claims ?? []).map(c => c.id)).size !== (report.claims ?? []).length) failures.push('duplicate claims');
  if ((report.claims ?? []).some(c => !c.reason?.trim())) failures.push('missing claim rationale');
  if (!fixture.oracle.globalStop) {
    const citations = (report.claims ?? []).flatMap(c => c.evidence ?? []).filter(c => typeof c === 'string');
    const namesFile = (citation, path) => new RegExp(`(^|[^\\w./-])(?:\\./)?${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[^\\w./-])`).test(citation);
    const files = new Map();
    for (const call of record.calls) {
      const path = filePath(call);
      if (call.tool === 'read_file' && call.response?.success && /^(evidence|controlled)\//.test(path) && !fixture.volatileFiles?.includes(path) && Object.hasOwn(fixture.files, path)) files.set(path, fixture.files[path]);
    }
    for (const [path, content] of Object.entries(record.artifacts ?? {})) files.set(path, content);
    const known = [...files].map(([path, content]) => {
      const digest = hash(content);
      return { path, digest, pattern: new RegExp(`(^|[^a-f0-9])${digest}(?=$|[^a-f0-9])`, 'i') };
    });
    const assessment = known.find(f => f.path === 'evidence/assessment.json');
    if (assessment && !citations.some(c => namesFile(c, assessment.path) && assessment.pattern.test(c))) failures.push(`missing or incorrect file hash: ${assessment.path}`);
    // A provenance mention is not another citation. Check each entry's own binding;
    // semantic review still owns ambiguous multi-file attribution and unlabeled extra text.
    for (const citation of citations) {
      const referenced = known.filter(f => namesFile(citation, f.path));
      if (!referenced.length) continue;
      const declared = [...citation.matchAll(/\bSHA[- ]?256\b[\s:=："'`*([{<（【]*([^\s"'`*,;，；。.\])}>）】]+)/gi)].map(m => m[1]);
      if (!referenced.some(f => f.pattern.test(citation)) || declared.some(d => !/^[a-f0-9]{64}$/i.test(d) || !referenced.some(f => f.digest === d.toLowerCase()))) failures.push(`missing or incorrect file hash: ${referenced.map(f => f.path).join(', ')}`);
    }
  }
  return { failures, report };
}

async function run() {
  const selectedCase = process.argv[2];
  const chosen = selectedCase ? cases.filter(c => selectedCase.split(',').includes(c.id)) : cases;
  if (!chosen.length) throw new Error(`Unknown fixture: ${selectedCase}`);
  const repeats = Number(process.env.EVAL_REPEATS ?? 3);
  if (!Number.isInteger(repeats) || repeats < 1 || repeats > 3) throw new Error('EVAL_REPEATS must be 1..3; only 3 qualifies for acceptance');
  const model = process.env.EVAL_MODEL ?? 'gpt-6.1-sol';
  const effort = process.env.EVAL_EFFORT ?? 'medium';
  const concurrency = Number(process.env.EVAL_CONCURRENCY ?? 3);
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw new Error('EVAL_CONCURRENCY must be 1..8');
  const manifest = await sourceManifest();
  const directory = join(evidenceRoot, `run-${new Date().toISOString().replace(/[:.]/g, '-')}`);
  await mkdir(join(directory, 'records'), { recursive: true });
  for (const file of manifest.files) {
    const target = join(directory, 'source', file.path);
    await mkdir(join(target, '..'), { recursive: true }); await copyFile(sourcePath(file.path), target);
  }
  const metadata = { startedAt: new Date().toISOString(), manifest, model, effort, repeats, concurrency, fixtureIds: chosen.map(c => c.id), bun: Bun.version, codex: (await new Response(Bun.spawn(['codex', '--version']).stdout).text()).trim(), toolsHash: hash(JSON.stringify(tools)), skillDelivery: 'inline-frozen-source', nativeSkillRegistryVerified: false, criteria: 'structural checks plus separate independent semantic review required', records: [] };
  await Bun.write(join(directory, 'manifest.json'), JSON.stringify(metadata, null, 2));
  console.log(`Evidence: ${directory}`);
  const productFiles = {};
  for (const file of manifest.files.filter(f => f.path.startsWith('skills/dba/'))) {
    const content = await Bun.file(join(directory, 'source', file.path)).text();
    productFiles[file.path.replace(/^skills\//, '')] = content;
    productFiles[file.path.replace(/^skills\/dba\//, '')] = content;
    productFiles[join(directory, 'source', file.path)] = content;
  }
  const queue = chosen.flatMap(fixture => Array.from({ length: repeats }, (_, i) => ({ fixture, repeat: i + 1 })));
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    const server = await openCodex();
    try {
      while (index < queue.length) {
        const { fixture, repeat } = queue[index++];
        const bridge = createBridge({ ...structuredClone(fixture), files: { ...productFiles, ...fixture.files } });
        const input = assessmentInput(productFiles['dba/SKILL.md'], fixture);
        let result;
        try { result = await runSession(server, { model, effort, input, dynamicTools: tools, bridge, outputSchema: reportSchema }); }
        catch (error) { result = error.record ?? { status: 'failed', error: error.message, text: '', events: [] }; }
        const record = { fixtureId: fixture.id, repeat, sourceHash: manifest.hash, input, fixture: structuredClone(fixture), isolation: server.isolation, ...result, calls: bridge.calls, artifacts: bridge.artifacts, completedAt: new Date().toISOString() };
        record.checks = structuralChecks(fixture, record);
        const filename = `${fixture.id}-${repeat}.json`;
        await Bun.write(join(directory, 'records', filename), JSON.stringify(record, null, 2));
        metadata.records.push({ filename, fixtureId: fixture.id, repeat, threadId: record.threadId, structuralPass: record.checks.failures.length === 0 });
        await Bun.write(join(directory, 'manifest.json'), JSON.stringify(metadata, null, 2));
        console.log(`${metadata.records.length}/${queue.length} ${fixture.id} #${repeat}: ${record.checks.failures.length ? record.checks.failures.join('; ') : 'structural PASS; semantic review pending'}`);
      }
    } finally { await server.close(); }
  });
  await Promise.all(workers);
  metadata.finishedAt = new Date().toISOString();
  metadata.sourceUnchanged = (await sourceManifest()).hash === manifest.hash;
  await Bun.write(join(directory, 'manifest.json'), JSON.stringify(metadata, null, 2));
  if (!metadata.sourceUnchanged || metadata.records.some(r => !r.structuralPass)) process.exitCode = 1;
}

if (import.meta.main) await run();
