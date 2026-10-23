import { test, expect } from 'bun:test';
import { b3Cases } from '../eval/b3-cases.js';
import { structuralChecks, assessmentInput, hash } from '../eval/run.js';
import { createBridge } from '../eval/bridge.js';

test('B3 assessment loads its own reference without a B1/B2 requirement or route answer in input', () => {
  const fixture = b3Cases[0];
  const bridge = createBridge({ ...structuredClone(fixture), files: { ...fixture.files, 'dba/references/privileges-change-governance.md': 'B3 reference' } });
  bridge.call('read_file', { path: 'dba/references/privileges-change-governance.md' });
  bridge.call('run_command', { program: 'dbcli', args: ['capabilities', 'check', '--require', 'capability.check', '--format', 'json'] });
  bridge.call('read_file', { path: 'evidence/assessment.json' });
  const report = { modelVersion: 1, workflowStopped: false, claims: Object.entries(fixture.oracle.claims).map(([id, status]) => ({ id, status, reason: 'fixture observation', evidence: [`evidence/assessment.json SHA-256 ${hash(fixture.files['evidence/assessment.json'])}`] })) };
  expect(structuralChecks(fixture, { status: 'completed', calls: bridge.calls, text: JSON.stringify(report) }).failures).toEqual([]);
  const participant = assessmentInput('Skill content', fixture)[0].text;
  expect(participant).not.toContain('references/backup-recovery.md');
  expect(participant).not.toContain('references/replication-ha.md');
  expect(participant).not.toContain('references/privileges-change-governance.md');
});

test('B3 cannot pass by loading only B1/B2 reference or collecting after unsupported contract', () => {
  const fixture = b3Cases.find(c => c.id === 'b3-unsupported-contract');
  const bridge = createBridge({ ...structuredClone(fixture), files: { ...fixture.files, 'dba/references/backup-recovery.md': 'B1', 'dba/references/replication-ha.md': 'B2' } });
  bridge.call('read_file', { path: 'dba/references/backup-recovery.md' });
  bridge.call('read_file', { path: 'dba/references/replication-ha.md' });
  bridge.call('run_command', { program: 'dbcli', args: ['capabilities', 'check', '--require', 'capability.check', '--format', 'json'] });
  bridge.call('read_file', { path: 'evidence/assessment.json' });
  const result = structuralChecks(fixture, { status: 'completed', calls: bridge.calls, text: JSON.stringify({ modelVersion: 1, workflowStopped: true, claims: [] }) });
  expect(result.failures).toContain('B3 reference not loaded');
  expect(result.failures).toContain('evidence read after whole-workflow stop');
});

test('three-engine live privilege evidence respects engine schema boundaries (PG schema check; MySQL/MariaDB SHOW GRANTS without fake schema)', () => {
  const pg = b3Cases.find(c => c.id === 'b3-live-privileges-postgresql');
  expect(pg).toBeDefined();
  expect(pg.oracle.requiredIds).toContain('schema.read-object');
  expect(pg.oracle.requiredCommands).toEqual(['blacklist', 'schema', 'query']);

  for (const engine of ['mysql', 'mariadb']) {
    const fixture = b3Cases.find(c => c.id === `b3-live-privileges-${engine}`);
    expect(fixture).toBeDefined();
    expect(fixture.oracle.requiredIds).not.toContain('schema.read-object');
    expect(fixture.oracle.requiredCommands).toEqual(['blacklist', 'query']);
    expect(JSON.parse(fixture.files['evidence/assessment.json']).privilegesAudit.directGrants).toBeNull();
  }
});

test('B3 coverage rejects a deleted branch and a duplicate instead of accepting reduced evidence', async () => {
  const { validateCoverage, cases } = await import('../eval/suite.js');
  expect(() => validateCoverage(cases)).not.toThrow();
  expect(() => validateCoverage(cases.filter(c => c.id !== 'b3-cleanup-handoff-four-checks'))).toThrow('b3-cleanup-handoff-four-checks');
  expect(() => validateCoverage([...cases, b3Cases[0]])).toThrow('Duplicate');
});

test('B3 cleanup handoff and risk acceptance fixtures carry structured four-item and irreversible risk fields', () => {
  const handoff = JSON.parse(b3Cases.find(c => c.id === 'b3-cleanup-handoff-four-checks').files['evidence/assessment.json']);
  expect(handoff.changePostVerify.healthAndCleanup.cleanupStatus).toBe('ready_for_human_cleanup_handoff');
  expect(Object.keys(handoff.changePostVerify.healthAndCleanup.cleanupPlan).sort()).toEqual([
    'approvalRef',
    'approvalValidAndCoversCleanup',
    'evidenceCustodian',
    'evidenceRetainedAndAccessible',
    'exactScope',
    'executor',
    'target',
  ]);
  const irreversible = JSON.parse(b3Cases.find(c => c.id === 'b3-irreversible-risk-accepted').files['evidence/assessment.json']);
  expect(irreversible.changePreflight.recoveryPlan.kind).toBe('authorized_irreversible_risk_acceptance');
  expect(irreversible.changePreflight.recoveryPlan.riskAcceptedByAuthorizedOwner).toBe(true);
  expect(irreversible.changePreflight.recoveryPlan.acceptedBy).toBeTruthy();
  expect(irreversible.changePreflight.recoveryPlan.stopAndMitigationPlan).toBeTruthy();
  expect(irreversible.changePreflight.recoveryPlan.mandatoryRecoveryPolicyApplies).toBe(false);
});
