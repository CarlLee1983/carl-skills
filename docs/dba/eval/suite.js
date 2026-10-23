import { cases as b1Cases } from './cases.js';
import { b2Cases } from './b2-cases.js';
import { b3Cases } from './b3-cases.js';
import { join } from 'node:path';
export { reportSchema } from './cases.js';
export const workflows = {
  B1: { reference: 'references/backup-recovery.md', spec: 'specs/sources/b1.md', strategy: 'specs/sources/b4.md' },
  B2: { reference: 'references/replication-ha.md', spec: 'specs/sources/b2.md', strategy: 'specs/sources/b2-strategy.md' },
  B3: { reference: 'references/privileges-change-governance.md', spec: 'specs/sources/b3.md', strategy: 'specs/sources/b3-strategy.md' },
};
export const cases = [...b1Cases.map(c => ({ ...c, workflow: 'B1' })), ...b2Cases, ...b3Cases];
export function workflowFor(fixture) {
  const workflow = workflows[fixture.workflow ?? 'B1'];
  if (!workflow) throw new Error(`Unknown workflow: ${fixture.workflow}`);
  return workflow;
}

export async function reviewSources(run, names) {
  const specs = [];
  for (const name of names) {
    const w = workflowFor({ workflow: name });
    const source = join(run, 'source/docs/dba');
    specs.push(`${name} 核准規格：\n${await Bun.file(join(source, w.spec)).text()}\n${name} 核准驗收策略：\n${await Bun.file(join(source, w.strategy)).text()}`);
  }
  return specs;
}

// Independently reviewable branch inventory; deleting a fixture cannot shrink the gate silently.
import coverage from '../specs/b2-coverage.json';
import b3Coverage from '../specs/b3-coverage.json';
function checkWorkflowCoverage(fixtures, workflow, spec, count, seen) {
  const expected = new Set();
  for (let category = 1; category <= count; category++) {
    const branches = spec.categories[category];
    if (!branches?.length) throw new Error(`Missing ${workflow} category: ${category}`);
    for (const id of branches) {
      if (seen.has(id) || expected.has(id)) throw new Error(`Duplicate coverage branch: ${id}`);
      seen.add(id); expected.add(id);
      if (!fixtures.some(c => c.id === id && c.workflow === workflow && c.category === category)) throw new Error(`Missing ${workflow} branch: ${id}`);
    }
  }
  for (const fixture of fixtures.filter(c => c.workflow === workflow)) if (!expected.has(fixture.id)) throw new Error(`${workflow} branch not mapped: ${fixture.id}`);
}
export function validateCoverage(fixtures) {
  const ids = new Set();
  for (const fixture of fixtures) {
    if (ids.has(fixture.id)) throw new Error(`Duplicate fixture: ${fixture.id}`);
    ids.add(fixture.id);
    workflowFor(fixture);
  }
  if (fixtures.filter(c => c.workflow === 'B1').length !== 58) throw new Error('B1 regression matrix must retain all 58 cases');
  const seen = new Set();
  checkWorkflowCoverage(fixtures, 'B2', coverage, 16, seen);
  checkWorkflowCoverage(fixtures, 'B3', b3Coverage, 19, seen);
}
validateCoverage(cases);
