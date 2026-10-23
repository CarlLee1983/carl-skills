import { test, expect } from 'bun:test';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('rejudging refuses before changing prior transcripts or invoking a model', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'dba-judge-test-'));
  try {
    await Bun.write(join(directory, 'manifest.json'), JSON.stringify({ records: [] }));
    await mkdir(join(directory, 'judgements'));
    const transcript = join(directory, 'judgements/batch-previous.json');
    await Bun.write(transcript, 'original failed review');
    const proc = Bun.spawn(['bun', join(import.meta.dir, '../eval/judge.js'), directory], { stdout: 'pipe', stderr: 'pipe' });
    const error = await new Response(proc.stderr).text();
    expect(await proc.exited).not.toBe(0);
    expect(error).toContain('Judgement evidence already exists');
    expect(await Bun.file(transcript).text()).toBe('original failed review');
  } finally { await rm(directory, { recursive: true }); }
});
