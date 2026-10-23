import { join, resolve } from 'node:path';
import { cases } from '../eval/suite.js';
import { sourceManifest, structuralChecks, hash, assessmentInput } from '../eval/run.js';
import { tools } from '../eval/bridge.js';

const directory = process.env.EVAL_DIR;
if (!directory) throw new Error('EVAL_DIR is required: point to a complete, independently judged evaluation run. Missing evidence is not PASS.');
const run = resolve(directory);
const manifest = await Bun.file(join(run, 'manifest.json')).json();
const current = await sourceManifest();
const snapshot = await sourceManifest(join(run, 'source/docs/dba'));
const failures = [];
const skill = await Bun.file(join(run, 'source/skills/dba/SKILL.md')).text();
const judgeModel = process.env.JUDGE_MODEL ?? 'gpt-6-astra';
if (manifest.manifest.hash !== current.hash || snapshot.hash !== current.hash) failures.push('source candidate/snapshot does not match current checkout');
if (!manifest.finishedAt || !manifest.sourceUnchanged || manifest.repeats !== 3) failures.push('run incomplete, changed source, or fewer than three repetitions');
if (manifest.fixtureIds.length !== cases.length || cases.some(c => !manifest.fixtureIds.includes(c.id))) failures.push('fixture matrix incomplete');
if (manifest.records.length !== cases.length * 3 || manifest.toolsHash !== hash(JSON.stringify(tools)) || manifest.skillDelivery !== 'inline-frozen-source' || manifest.nativeSkillRegistryVerified !== false) failures.push('run boundary/record count mismatch');
const threads = new Set();
let environment;
let judgeConcurrency;
for (const fixture of cases) for (let repeat = 1; repeat <= 3; repeat++) {
  const file = join(run, 'records', `${fixture.id}-${repeat}.json`);
  if (!await Bun.file(file).exists()) { failures.push(`missing record: ${fixture.id}/${repeat}`); continue; }
  const raw = await Bun.file(file).text();
  const record = JSON.parse(raw);
  if (!record.threadId || threads.has(record.threadId)) failures.push(`session not fresh: ${fixture.id}/${repeat}`);
  threads.add(record.threadId);
  if (record.sourceHash !== current.hash || record.model !== manifest.model || record.effort !== manifest.effort || JSON.stringify(record.fixture) !== JSON.stringify(fixture)) failures.push(`record identity mismatch: ${fixture.id}/${repeat}`);
  if (JSON.stringify(record.input) !== JSON.stringify(assessmentInput(skill, fixture))) failures.push(`input is not frozen skill and fixture: ${fixture.id}/${repeat}`);
  const fingerprint = JSON.stringify({ isolation: record.isolation, runtime: record.runtime });
  environment ??= fingerprint;
  if (fingerprint !== environment || record.runtime?.environments?.length !== 0 || record.runtime?.sandbox?.type !== 'readOnly' || record.runtime?.sandbox?.networkAccess !== false || !record.runtime?.ephemeral || record.runtime?.approvalPolicy !== 'never') failures.push(`runtime differs or is not isolated: ${fixture.id}/${repeat}`);
  failures.push(...structuralChecks(fixture, record).failures.map(f => `${fixture.id}/${repeat}: ${f}`));
  const judgementFile = join(run, 'judgements', `${fixture.id}-${repeat}.json`);
  if (!await Bun.file(judgementFile).exists()) { failures.push(`semantic review missing: ${fixture.id}/${repeat}`); continue; }
  const judgement = await Bun.file(judgementFile).json();
  if (judgement.recordHash !== hash(raw) || judgement.result?.pass !== true || !judgement.result?.rationale || judgement.result?.issues?.length !== 0 || judgement.status !== 'completed' || judgement.model !== judgeModel || judgement.effort !== 'high' || !judgement.threadId || threads.has(judgement.threadId)) failures.push(`semantic review failed or not bound: ${fixture.id}/${repeat}`);
  const batch = await Bun.file(join(run, 'judgements', `${judgement.batchId}.json`)).json();
  judgeConcurrency ??= judgement.concurrency;
  if (batch.concurrency !== judgement.concurrency || judgement.concurrency !== judgeConcurrency || !Number.isInteger(judgeConcurrency) || judgeConcurrency < 1 || judgeConcurrency > 8) failures.push(`judge concurrency not fixed or invalid: ${fixture.id}/${repeat}`);
  let matching;
  try { matching = JSON.parse(batch.text).decisions.filter(d => d.key === `${fixture.id}-${repeat}`); } catch { matching = []; }
  if (batch.status !== 'completed' || batch.threadId !== judgement.threadId || batch.model !== judgement.model || matching.length !== 1 || JSON.stringify(matching[0]) !== JSON.stringify(judgement.result)) failures.push(`independent judge transcript mismatch: ${fixture.id}/${repeat}`);
}
if (failures.length) throw new Error(failures.join('\n'));
console.log(`PASS: ${cases.length} fixtures × 3 fresh sessions, source ${current.hash}; structural and independent semantic checks. Human candidate acceptance remains pending; L/R not verified.`);
