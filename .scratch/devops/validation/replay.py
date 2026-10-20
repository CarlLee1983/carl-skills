"""Offline text-only replay of devops acceptance: a fresh read-only Codex session per subcase.

Usage: python3 replay.py [release|devops|all] [case ids...]
The prompt carries the whole installed skill (entry plus references, acceptance files excluded),
so routing from SKILL.md to the right capability is part of what is tested.
"""
from pathlib import Path
import concurrent.futures
import json
import re
import subprocess
import sys
import tempfile

ROOT = Path.cwd()
SKILL_DIR = ROOT / 'skills/devops'
OUT = ROOT / '.scratch/devops/validation'
files = ['SKILL.md'] + sorted(
    f'references/{p.name}' for p in (SKILL_DIR / 'references').glob('*.md')
    if p.name not in ('acceptance.md', 'release-acceptance.md'))
skill = '\n\n'.join(f'===== FILE: {f} =====\n' + (SKILL_DIR / f).read_text() for f in files)

HEADER = '''This is an isolated offline skill evaluation, case {case_id}. Use only the supplied skill and fixture evidence. Do not use any tools, access real files/remotes, or perform real actions. Treat paths, SHAs, commands, runs and receipts below as fictional tool returns. Missing evidence is unavailable, never invent success. Follow the skill as if its referenced files had been read on demand. Produce the actual report, proposal when applicable, and a TEXT-ONLY simulated event log within granted authorization; include results and unresolved states. Do not grade yourself or infer an expected answer. Reply in Traditional Chinese in at most {words} words. This simulation instruction overrides ordinary tool-based routing for this evaluation.

SKILL (all files of the installed skill):
{skill}
'''


def split_inputs(body):
    return re.findall(r'\*\*(共用輸入|輸入(?: [ABC])?)：\*\* ([\s\S]*?)(?=\n\*\*|\Z)', body)


def release_cases():
    src = (SKILL_DIR / 'references/release-acceptance.md').read_text()
    common = src[src.index('| 證據位置'):src.index('所有案例均須')]
    proposal = src.split('## 授權案例的共用提案\n')[1].split('## 13 ')[0]
    parts = {int(n): body for n, body in re.findall(r'^## (\d\d) ([\s\S]*?)(?=^## |\Z)', src, re.M)}
    for n, body in parts.items():
        inputs = split_inputs(body)
        shared = next((v for k, v in inputs if k == '共用輸入'), '')
        for label, value in inputs:
            if label == '共用輸入':
                continue
            case_id = f'{n:02}' + (label[-1] if label[-1] in 'ABC' else '')
            extra = ''
            if n == 6:
                extra = 'Case 05 policy: release Friday 10:00 Asia/Taipei, no exceptions.\n'
            if n == 16 and label == '輸入 B':
                extra = next(v for k, v in inputs if k == '輸入 A') + '\nThe following B override replaces workflow failure and receipt status.\n'
            prop = ('PROPOSAL FIXTURE FOR CASES 13-16 (prepare proposal before applying case authorization):' + proposal) if n >= 13 else ''
            req = 'User request: 評估本次變更與實際發布候選；僅在有明確授權時模擬操作。'
            yield 'release', case_id, f'DEFAULT OFFLINE EVIDENCE:\n{common}\n{prop}\n{req}\n\nCASE INPUT OVERRIDES:\n{shared}\n{extra}\n{value}\n', 600


def devops_cases():
    src = (SKILL_DIR / 'references/acceptance.md').read_text()
    common = src[src.index('| 證據位置'):src.index('所有案例均須')]
    for case_id, body in re.findall(r'^## (D\d\d) [^\n]*\n([\s\S]*?)(?=^## |\Z)', src, re.M):
        value = next(v for k, v in split_inputs(body) if k == '輸入')
        yield 'devops', case_id, f'DEFAULT OFFLINE EVIDENCE:\n{common}\n\nCASE INPUT (the user request and overrides):\n{value}\n', 700


def run(case):
    group, case_id, body, words = case
    out = OUT / group
    out.mkdir(exist_ok=True)
    prompt = HEADER.format(case_id=case_id, words=words, skill=skill) + '\n' + body
    (out / f'{case_id}-input.txt').write_text(body)  # skill text is identical for every case; see skill-snapshot.md
    with tempfile.TemporaryDirectory(prefix='devops-replay-') as wd:
        cmd = ['codex', 'exec', '--ephemeral', '--skip-git-repo-check', '-s', 'read-only', '-m', 'gpt-6.1-sol',
               '-c', 'model_reasoning_effort="medium"', '-C', wd, '--json', '-o', str(out / f'{case_id}-output.md'), '-']
        r = subprocess.run(cmd, input=prompt, capture_output=True, text=True, timeout=600)
    events = []
    for line in r.stdout.splitlines():
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if event.get('type') in ('item.started', 'item.completed'):
            item = event.get('item', {})
            if item.get('type') != 'agent_message':
                events.append(item.get('type'))
    result = {'group': group, 'case': case_id, 'exit_code': r.returncode, 'non_message_event_types': events,
              'output_exists': (out / f'{case_id}-output.md').exists()}
    if r.returncode:
        result['error'] = r.stderr[-1500:]
    print(json.dumps(result), flush=True)
    return result


if __name__ == '__main__':
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'
    only = set(sys.argv[2:])
    cases = []
    if which in ('release', 'all'):
        cases += list(release_cases())
    if which in ('devops', 'all'):
        cases += list(devops_cases())
    if only:
        cases = [c for c in cases if c[1] in only]
    (OUT / 'skill-snapshot.md').write_text(skill)
    first = run(cases[0])
    results = [first]
    if first['exit_code'] == 0 and not first['non_message_event_types']:
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            results.extend(pool.map(run, cases[1:]))
    name = f'runs-{which}' + ('-' + '-'.join(sorted(only)) if only else '') + '.json'
    (OUT / name).write_text(json.dumps(results, indent=2, ensure_ascii=False))
