import { test, expect } from 'bun:test';
import { b2Cases } from '../eval/b2-cases.js';
import { structuralChecks, assessmentInput, hash } from '../eval/run.js';
import { createBridge } from '../eval/bridge.js';

test('B2 assessment loads its own reference without a B1 requirement or route answer in input', () => {
  const fixture = b2Cases[0];
  const bridge = createBridge({ ...structuredClone(fixture), files: { ...fixture.files, 'dba/references/replication-ha.md': 'B2 reference' } });
  bridge.call('read_file', { path: 'dba/references/replication-ha.md' });
  bridge.call('run_command', { program: 'dbcli', args: ['capabilities', 'check', '--require', 'capability.check', '--format', 'json'] });
  bridge.call('read_file', { path: 'evidence/assessment.json' });
  const report = { modelVersion: 1, workflowStopped: false, claims: Object.entries(fixture.oracle.claims).map(([id,status]) => ({id,status,reason:'fixture observation',evidence:[`evidence/assessment.json SHA-256 ${hash(fixture.files['evidence/assessment.json'])}`]})) };
  expect(structuralChecks(fixture, {status:'completed',calls:bridge.calls,text:JSON.stringify(report)}).failures).toEqual([]);
  const participant = assessmentInput('Skill content',fixture)[0].text;
  expect(participant).not.toContain('references/backup-recovery.md');
  expect(participant).not.toContain('references/replication-ha.md');
});

test('B2 cannot pass by loading only B1 reference or collecting after unsupported contract', () => {
  const fixture = b2Cases.find(c=>c.id==='b2-unsupported-contract');
  const bridge = createBridge({...structuredClone(fixture),files:{...fixture.files,'dba/references/backup-recovery.md':'B1'}});
  bridge.call('read_file',{path:'dba/references/backup-recovery.md'});
  bridge.call('run_command',{program:'dbcli',args:['capabilities','check','--require','capability.check','--format','json']});
  bridge.call('read_file',{path:'evidence/assessment.json'});
  const result=structuralChecks(fixture,{status:'completed',calls:bridge.calls,text:JSON.stringify({modelVersion:1,workflowStopped:true,claims:[]})});
  expect(result.failures).toContain('B2 reference not loaded');
  expect(result.failures).toContain('evidence read after whole-workflow stop');
});

test('three-engine live identity evidence exercises blacklist then read query without a fake SHOW schema', () => {
  for(const engine of ['postgresql','mysql','mariadb']){
    const fixture=b2Cases.find(c=>c.id===`b2-live-identity-${engine}`);
    expect(fixture).toBeDefined();
    expect(fixture.oracle.requiredCommands).toEqual(['blacklist','query']);
    expect(JSON.parse(fixture.files['evidence/assessment.json']).topology.observed).toBeNull();
  }
});

test('coverage rejects a deleted branch and a duplicate instead of accepting reduced evidence', async () => {
  const { validateCoverage, cases } = await import('../eval/suite.js');
  expect(()=>validateCoverage(cases)).not.toThrow();
  expect(()=>validateCoverage(cases.filter(c=>c.id!=='b2-call-denied'))).toThrow('b2-call-denied');
  expect(()=>validateCoverage([...cases,b2Cases[0]])).toThrow('Duplicate');
});

test('planned operation and dual-channel fixtures carry matching deployment evidence', () => {
  const data = id => JSON.parse(b2Cases.find(c=>c.id===id).files['evidence/assessment.json']);
  expect(data('b2-handoff-instance').ha.kind).toBe('Multi-AZ DB instance');
  expect(data('b2-handoff-promotion').ha.kind).toBe('Single-AZ read replica');
  expect(data('b2-handoff-promotion').topology.observed.receiver).toBe('replica-1');
  for(const engine of ['mysql','mariadb']){
    const d=data(`b2-dual-channel-${engine}`);
    expect(d.assessment.deployment).toBe('self-managed');
    expect(d.topology.expected.sources).toEqual(d.replication.channels.map(c=>c.source));
    expect(d.ha).toBeNull();
  }
});

test('SQL-invisible standby fixture has consistent platform-only instance identity', () => {
  const fixture=b2Cases.find(c=>c.id==='b2-standby-invisible');
  const d=JSON.parse(fixture.files['evidence/assessment.json']);
  expect(d.assessment.resource).toBe('rds:example:instance-b2');
  expect(d.provenance.resource).toBe(d.assessment.resource);
  expect(d.ha.resource).toBe(d.assessment.resource);
  expect(Object.values(d.topology.observed).sort()).toEqual(d.ha.members.map(m=>m.id).sort());
  expect(d.topology.expected).toEqual(d.topology.observed);
  expect(d.topology.sqlSource).toBeUndefined();
  expect(d.topology.platformSource).toBe(d.ha.source);
  expect(d.replication).toBeNull();
  expect(d.event).toBeNull();
  expect(d.retention).toBeNull();
  expect(fixture.oracle.claims).toEqual({ha_config:'met',progress:'indeterminate',transition:'indeterminate'});
});

test('missing topology evidence has no inherited complete platform or replication substitute', () => {
  for(const id of ['b2-missing-node','b2-missing-channel','b2-visibility-blacklist','b2-visibility-limit','b2-visibility-permissions']){
    const d=JSON.parse(b2Cases.find(c=>c.id===id).files['evidence/assessment.json']);
    expect(d.replication).toBeNull(); expect(d.ha).toBeNull(); expect(d.event).toBeNull();
  }
});

test('live observations have a controlled acquisition clock bound to the exact query and target', async () => {
  const { cases } = await import('../eval/suite.js');
  const live = cases.filter(c => /^(live-validation-|b2-live-identity-|b3-live-privileges-)/.test(c.id));
  expect(live).toHaveLength(9);
  for (const fixture of cases) {
    const d = JSON.parse(fixture.files['evidence/assessment.json']);
    const context = d.pendingEvidence?.acquisitionContext;
    if (!live.includes(fixture)) { expect(context).toBeUndefined(); continue; }
    expect(context).toBeDefined();
    const query = fixture.commands.at(-1);
    expect(context.command).toEqual({ program: query.program, args: query.args });
    expect(context.target).toBe(fixture.workflow === 'B1' ? d.drill.target : d.assessment.resource);
    expect(context.profile).toBe('assessment');
    expect(context.kind).toBe('controlled synthetic clock');
    expect(context.sourceId).toContain(fixture.engine);
    expect(Date.parse(context.startedAt)).toBeLessThan(Date.parse(context.acquiredAt));
    expect(Date.parse(context.acquiredAt)).toBeLessThanOrEqual(Date.parse(d.assessment.referenceTime));
    expect(context.binding).toContain('only after this exact command succeeds');
    expect(Array.isArray(query.output)).toBe(true);
    if (fixture.workflow === 'B1') {
      expect(d.drill.execution.validationFinishedAt).toBeUndefined();
      expect(context.applicability).toContain('unchanged');
    }
  }
});

test('rebuild failure retains required topology while all observations agree on the missing replica', () => {
  const fixture = b2Cases.find(c => c.id === 'b2-rebuild-failed');
  const d = JSON.parse(fixture.files['evidence/assessment.json']);
  expect(d.topology.expected.receivers).toContain('node-c');
  expect(d.topology.expected.channels).toContain('c-from-b');
  expect(d.topology.observed.receivers).not.toContain('node-c');
  expect(d.topology.observed.channels).not.toContain('c-from-b');
  expect(d.ha.members.some(m => m.id === 'node-c')).toBe(false);
  expect(d.replication.channels.some(c => c.receiver === 'node-c')).toBe(false);
  expect(d.topology.complete).toBe(true);
  expect(d.event.protection.missingReplica).toBe('node-c');
  expect(d.event.protection.missingChannel).toBe('c-from-b');
  expect(d.event.protection.observedAt).toBe(d.topology.observedAt);
  expect(d.event.transition.chainVerified).toBe(true);
  expect(fixture.oracle.claims).toEqual({transition:'met',protection:'not-met'});
});
