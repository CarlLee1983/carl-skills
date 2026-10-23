import { test, expect } from 'bun:test';
import { cases } from '../eval/cases.js';

test('pending restore fixtures do not accidentally carry completed cleanup from the historical baseline', () => {
  for (const fixture of cases) {
    const data = JSON.parse(fixture.files['evidence/assessment.json']);
    if (data.drill?.execution?.status === 'not started' || data.pendingEvidence) {
      expect(data.drill.cleanup.status).not.toBe('completed');
    }
  }
});

test('missing RPO proof dependencies are not supplied as independent controlled evidence', () => {
  for (const id of ['validation-missing', 'missing-baseline']) {
    const fixture = cases.find(c => c.id === id);
    const data = JSON.parse(fixture.files['evidence/assessment.json']);
    expect(data.drill.recoveryPoint.independentlyVerified).toBe(false);
    expect(data.drill.recoveryPoint.proofEvidence).toContain('#/drill/validation');
    expect(data.drill.recoveryPoint.proofEvidence).toContain('#/drill/dataBaseline');
    const absent = id === 'validation-missing' ? 'controlled/validation-100' : 'controlled/baseline-100';
    expect(Object.hasOwn(fixture.files, absent)).toBe(false);
  }
});

test('unavailable files are limited to explicit references in the fixed controlled-document slots', () => {
  const unavailable = id => cases.find(c => c.id === id).unavailableFiles;
  expect(unavailable('missing-baseline')).toEqual(['controlled/baseline-100']);
  expect(unavailable('history-evidence-unavailable')).toEqual(['controlled/change-100', 'controlled/execution-100', 'controlled/baseline-100']);
  expect(unavailable('approval-approved-awaiting-execution')).toEqual([]);
  expect(unavailable('revoked-in-flight')).toEqual([]);
  expect(unavailable('validation-missing')).toEqual([]);
  expect(unavailable('save-failed-no-replacement')).toEqual(['controlled/change-100', 'controlled/execution-100', 'controlled/baseline-100']);
  for (const fixture of cases) for (const path of fixture.unavailableFiles) expect(Object.hasOwn(fixture.files, path)).toBe(false);
});

test('setting-only and blocked CALL observations contain no alternate actual retention proof', () => {
  for (const id of ['retention-setting-only', 'call-denied']) {
    const fixture = cases.find(c => c.id === id);
    const data = JSON.parse(fixture.files['evidence/assessment.json']);
    expect(data.backup.actualCoverageStart).toBeUndefined();
    expect(data.backup.actualCoverageEnd).toBeUndefined();
    expect(data.backup.coverageIsComplete).toBeUndefined();
    expect(data.pitr).toBeNull();
    expect(data.drill).toBeNull();
    expect(Object.hasOwn(fixture.files, 'controlled/validation-100')).toBe(false);
  }
});

test('the qualified interval proof cannot accidentally carry an exact checkpoint timestamp', () => {
  const fixture = cases.find(c => c.id === 'rpo-uncertain-bound');
  const data = JSON.parse(fixture.files['evidence/assessment.json']);
  const baseline = JSON.parse(fixture.files['controlled/baseline-100']);
  const validation = JSON.parse(fixture.files['controlled/validation-100']);
  expect(baseline.point).toBeUndefined();
  expect(validation.recoveryMarker).toBeUndefined();
  expect(validation.bandMembershipVerified).toBe(true);
  expect(validation.verifiedPossibleTimeRange).toEqual(baseline.possibleTimeRange);
  const [earliest, latest] = baseline.possibleTimeRange.map(Date.parse);
  const reference = Date.parse(data.drill.rpoReferenceTime);
  expect((reference - latest) / 1000).toBeLessThan(data.policy.rpoSeconds);
  expect((reference - earliest) / 1000).toBeGreaterThan(data.policy.rpoSeconds);
});

test('single-invariant live validation has no inherited two-invariant recovery-point assertion', () => {
  for (const fixture of cases.filter(c => c.id.startsWith('live-validation-'))) {
    const data = JSON.parse(fixture.files['evidence/assessment.json']);
    const controlled = JSON.parse(fixture.files['controlled/baseline-100']);
    expect(data.assessment.selectedClaims).toEqual(['restorable']);
    expect(data.drill.recoveryPoint).toBeNull();
    expect(data.drill.dataBaseline.requiredInvariants).toEqual(['recovery marker is commit-955']);
    expect(controlled.requiredInvariants).toEqual(data.drill.dataBaseline.requiredInvariants);
    expect(fixture.commands.at(-1).output).toEqual([{ marker: data.pendingEvidence.expectedMarker }]);
  }
});
