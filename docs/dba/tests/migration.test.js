import { test, expect } from 'bun:test';
import { mkdtemp, mkdir, copyFile, chmod, rm, cp, readdir, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { sourceManifest, sourcePath, skillRoot } from '../eval/run.js';
import { reviewSources, workflows } from '../eval/suite.js';

test('the split source reconstructs the exact evaluation snapshot and detects changed product bytes', async () => {
  const manifest = await sourceManifest();
  expect(manifest.files.filter(f => f.path.startsWith('skills/dba/')).length).toBe(4);
  expect(manifest.files.some(f => f.path.includes('.scratch/') || f.path.includes('.verification/'))).toBe(false);
  const snapshot = await realpath(await mkdtemp(join(tmpdir(), 'dba-migration-')));
  try {
    for (const file of manifest.files) {
      const target = join(snapshot, file.path);
      await mkdir(dirname(target), { recursive: true });
      await copyFile(sourcePath(file.path), target);
      await chmod(target, file.mode);
    }
    expect(await sourceManifest(join(snapshot, 'docs/dba'))).toEqual(manifest);
    // Replay through the snapshot's own module, not the live path adapter.
    const frozen = await import(join(snapshot, 'docs/dba/eval/run.js'));
    expect(await frozen.sourceManifest()).toEqual(manifest);
    expect(frozen.sourcePath('skills/dba/SKILL.md')).toBe(join(snapshot, 'skills/dba/SKILL.md'));
    expect(frozen.evidenceRoot).toBe(join(snapshot, '.scratch/dba/validation/.verification'));
    // Every developer-document link must also resolve in the frozen candidate.
    for (const file of manifest.files.filter(f => f.path.endsWith('.md'))) {
      const path = join(snapshot, file.path);
      for (const match of (await Bun.file(path).text()).matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
        const link = match[1].split('#')[0];
        if (!link || /^[a-z]+:/i.test(link)) continue;
        expect(await Bun.file(resolve(dirname(path), link)).exists()).toBe(true);
      }
    }
    const product = join(snapshot, 'skills/dba/SKILL.md');
    await Bun.write(product, `${await Bun.file(product).text()}\n`);
    expect((await sourceManifest(join(snapshot, 'docs/dba'))).hash).not.toBe(manifest.hash);
  } finally { await rm(snapshot, { recursive: true, force: true }); }
});

test('the independently copied skill resolves all references without development files', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'dba-package-'));
  const product = join(temporary, 'dba');
  try {
    await cp(skillRoot, product, { recursive: true });
    async function check(directory) {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        expect(entry.isSymbolicLink()).toBe(false);
        if (entry.isDirectory()) await check(path);
        else if (path.endsWith('.md')) {
          const text = await Bun.file(path).text();
          for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
            const link = match[1].split('#')[0];
            if (!link || /^[a-z]+:/i.test(link)) continue;
            const target = resolve(dirname(path), link);
            expect(target.startsWith(`${product}/`)).toBe(true);
            expect(await Bun.file(target).exists()).toBe(true);
          }
        }
      }
    }
    await check(product);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test('semantic judging reads every workflow specification and strategy from the frozen collection layout', async () => {
  const run = await mkdtemp(join(tmpdir(), 'dba-review-sources-'));
  try {
    for (const file of (await sourceManifest()).files) {
      const target = join(run, 'source', file.path);
      await mkdir(dirname(target), { recursive: true });
      await copyFile(sourcePath(file.path), target);
    }
    const names = Object.keys(workflows);
    const specs = await reviewSources(run, names);
    for (const [index, name] of names.entries()) {
      const workflow = workflows[name];
      const spec = await Bun.file(sourcePath(`docs/dba/${workflow.spec}`)).text();
      const strategy = await Bun.file(sourcePath(`docs/dba/${workflow.strategy}`)).text();
      expect(specs[index]).toBe(`${name} 核准規格：\n${spec}\n${name} 核准驗收策略：\n${strategy}`);
    }
  } finally { await rm(run, { recursive: true, force: true }); }
});
