import { readdir, mkdtemp, rm, mkdir, chmod, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { root, skillRoot, hash } from '../eval/run.js';
import { cases } from '../eval/suite.js';

const markdown = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (['.git', '.verification', 'node_modules'].includes(item.name)) continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) await walk(path);
    else if (item.name.endsWith('.md')) markdown.push(path);
  }
}
await walk(root);
await walk(skillRoot);
const errors = [];
for (const path of markdown) {
  const content = await Bun.file(path).text();
  for (const match of content.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const link = match[1].split('#')[0];
    if (!link || /^[a-z]+:/i.test(link)) continue;
    if (!await Bun.file(resolve(dirname(path), decodeURIComponent(link))).exists()) errors.push(`${path}: broken link ${link}`);
  }
}
const skill = await Bun.file(join(skillRoot, 'SKILL.md')).text();
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontmatter || !/^name: dba$/m.test(frontmatter[1]) || !/^description: .+$/m.test(frontmatter[1])) errors.push('Invalid Agent Skills frontmatter');
const ids = [...new Set([...[...skill.matchAll(/^\|[^\n]+\|$/gm)].map(m => m[0]).join('\n').matchAll(/`([a-z]+(?:[.-][a-z]+)+)`/g)].map(m => m[1]).filter(id => id.includes('.')))];
const command = process.env.DBCLI_COMMAND ? JSON.parse(process.env.DBCLI_COMMAND) : ['dbcli'];
if (!Array.isArray(command) || !command.length || command.some(x => typeof x !== 'string')) throw new Error('DBCLI_COMMAND must be a JSON argv array');
const child = Bun.spawn([...command, 'capabilities', '--format', 'json'], { cwd: '/tmp', stdout: 'pipe', stderr: 'pipe' });
const stdout = await new Response(child.stdout).text();
const stderr = await new Response(child.stderr).text();
if (await child.exited !== 0) throw new Error(`Capability catalog failed: ${stderr}`);
const catalog = JSON.parse(stdout);
if (catalog.schemaVersion !== 1) errors.push('Unsupported capability catalog version');
// capabilities check is a pure config/capability inspection: no database connection.
const temporary = await realpath(await mkdtemp(join(tmpdir(), 'dba-config-check-')));
try {
  const anchors = join(temporary, 'anchors');
  await mkdir(anchors, { mode: 0o700 });
  for (const fixture of cases.filter(c => /^(live-validation-|b2-live-identity-|b3-live-privileges-)/.test(c.id))) {
    const directory = join(temporary, fixture.id);
    await mkdir(directory, { mode: 0o700 });
    const path = join(directory, 'config.json');
    const content = fixture.files['config/assessment/config.json'];
    const record = JSON.stringify({ version: 1, configSha256: hash(content), updatedAt: '2026-10-19T11:00:00Z' });
    for (const [file, value] of [[path, content], [join(directory, '.config-integrity.json'), record], [join(anchors, `${hash(path)}.json`), record]]) {
      await Bun.write(file, value); await chmod(file, 0o600);
    }
    const child = Bun.spawn([...command, '--config', directory, '--use', 'assessment', 'capabilities', 'check', '--require', fixture.oracle.requiredIds.join(','), '--format', 'json'], { cwd: temporary, env: { ...process.env, DBCLI_AGENT_MODE: '1', DBCLI_CONFIG_INTEGRITY_ANCHOR_DIR: anchors }, stdout: 'pipe', stderr: 'pipe' });
    const output = await new Response(child.stdout).text();
    const error = await new Response(child.stderr).text();
    if (await child.exited !== 0) errors.push(`${fixture.id}: offline config/capability check failed: ${error || output}`);
    else if (JSON.parse(output).ok !== true) errors.push(`${fixture.id}: config does not resolve required capabilities`);
  }
} finally { await rm(temporary, { recursive: true }); }
for (const id of ids) {
  const cap = catalog.capabilities?.find(c => c.id === id);
  if (!cap) errors.push(`Missing published capability: ${id}`);
  else for (const engine of ['postgresql', 'mysql', 'mariadb']) if (!cap.engines.includes(engine)) errors.push(`${id} missing engine ${engine}`);
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`PASS: ${markdown.length} Markdown files; skill frontmatter; ${ids.length} capability IDs in contract v1 catalog (three SQL engines).`);
