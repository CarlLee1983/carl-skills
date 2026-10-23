"""Offline text-only replay of ciso acceptance: a fresh read-only Codex session per case.

Usage: python3 .scratch/ciso/validation/replay.py [case ids...]   (run from the repo root)
The prompt carries the whole installed skill (entry plus references, acceptance excluded),
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
SKILL_DIR = ROOT / 'skills/ciso'
OUT = ROOT / '.scratch/ciso/validation'
files = ['SKILL.md'] + sorted(
    f'references/{p.name}' for p in (SKILL_DIR / 'references').glob('*.md')
    if p.name != 'acceptance.md')
skill = '\n\n'.join(f'===== FILE: {f} =====\n' + (SKILL_DIR / f).read_text() for f in files)

HEADER = '''This is an isolated offline skill evaluation, case {case_id}. Use only the supplied skill and fixture evidence. Do not use any tools, access real files/remotes, or perform real actions. Treat paths, code, SHAs and values below as fictional tool returns. Missing evidence is unavailable ("無此證據"), never invent results. Follow the skill as if its referenced files had been read on demand. Produce the actual report the skill calls for. Do not grade yourself or infer an expected answer. Reply in Traditional Chinese in at most {words} words. This simulation instruction overrides ordinary tool-based routing for this evaluation.

SKILL (all files of the installed skill):
{skill}
'''


def cases():
    src = (SKILL_DIR / 'references/acceptance.md').read_text()
    common = src[src.index('| 證據位置'):src.index('所有案例均須')]
    for case_id, body in re.findall(r'^## (C\d\d) [^\n]*\n([\s\S]*?)(?=^## |\Z)', src, re.M):
        value = re.search(r'\*\*輸入：\*\* ([\s\S]*?)(?=\n\*\*預期)', body).group(1)
        yield case_id, f'DEFAULT OFFLINE EVIDENCE:\n{common}\n\nCASE INPUT (the user request and fixtures):\n{value}\n', 700


def run(case):
    case_id, body, words = case
    prompt = HEADER.format(case_id=case_id, words=words, skill=skill) + '\n' + body
    (OUT / f'{case_id}-input.txt').write_text(body)  # skill text is identical for every case; see skill-snapshot.md
    with tempfile.TemporaryDirectory(prefix='ciso-replay-') as wd:
        cmd = ['codex', 'exec', '--ephemeral', '--skip-git-repo-check', '-s', 'read-only', '-m', 'gpt-6.1-sol',
               '-c', 'model_reasoning_effort="medium"', '-C', wd, '--json', '-o', str(OUT / f'{case_id}-output.md'), '-']
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
    result = {'case': case_id, 'exit_code': r.returncode, 'non_message_event_types': events,
              'output_exists': (OUT / f'{case_id}-output.md').exists()}
    if r.returncode:
        result['error'] = r.stderr[-1500:]
    print(json.dumps(result), flush=True)
    return result


if __name__ == '__main__':
    only = set(sys.argv[1:])
    selected = [c for c in cases() if not only or c[0] in only]
    (OUT / 'skill-snapshot.md').write_text(skill)
    first = run(selected[0])
    results = [first]
    if first['exit_code'] == 0 and not first['non_message_event_types']:
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            results.extend(pool.map(run, selected[1:]))
    name = 'runs' + ('-' + '-'.join(sorted(only)) if only else '') + '.json'
    (OUT / name).write_text(json.dumps(results, indent=2, ensure_ascii=False))
