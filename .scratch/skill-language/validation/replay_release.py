"""Offline text-only replay: a fresh read-only Codex session per acceptance subcase."""
from pathlib import Path
import concurrent.futures
import json
import re
import subprocess
import tempfile

ROOT = Path.cwd()
OUT = ROOT / '.scratch/skill-language/validation/release'
OUT.mkdir(exist_ok=True)
src = (ROOT / 'skills/release-assessment/references/acceptance.md').read_text()
common = src[src.index('| 證據位置'):src.index('所有案例均須')]
proposal = src.split('## 授權案例的共用提案\n')[1].split('## 13 ')[0]
parts = {int(n): body for n, body in re.findall(r'^## (\d\d) ([\s\S]*?)(?=^## |\Z)', src, re.M)}
skill = '\n\n'.join((ROOT / p).read_text() for p in ['skills/release-assessment/SKILL.md', 'skills/release-assessment/references/operations.md'])
cases = []
for n, body in parts.items():
    inputs = re.findall(r'\*\*(共用輸入|輸入(?: [ABC])?)：\*\* ([\s\S]*?)(?=\n\*\*|\Z)', body)
    shared = next((value for label, value in inputs if label == '共用輸入'), '')
    for label, value in inputs:
        if label == '共用輸入':
            continue
        case_id = f'{n:02}' + (label[-1] if label[-1] in 'ABC' else '')
        # Referenced prior-case inputs must be explicit without expected outcomes.
        extra = ''
        if n == 6:
            extra = 'Case 05 policy: release Friday 10:00 Asia/Taipei, no exceptions.\n'
        if n == 16 and label == '輸入 B':
            extra = next(v for k, v in inputs if k == '輸入 A') + '\nThe following B override replaces workflow failure and receipt status.\n'
        prompt = f'''This is an isolated offline skill evaluation, case {case_id}. Use only the supplied skill and fixture evidence. Do not use any tools, access real files/remotes, or perform real actions. Treat paths, SHAs, commands and receipts below as fictional tool returns. Missing evidence is unavailable, never invent success. Produce the actual assessment/report, proposal when applicable, and a TEXT-ONLY simulated event log within granted authorization; include results and unresolved states. Do not grade yourself or infer an expected answer. Reply in Traditional Chinese in at most 600 words. This simulation instruction overrides ordinary tool-based routing for this evaluation.

SKILL:
{skill}

DEFAULT OFFLINE EVIDENCE:
{common}

{('PROPOSAL FIXTURE FOR CASES 13-16 (prepare proposal before applying case authorization):' + proposal) if n >= 13 else ''}

CASE INPUT OVERRIDES:
{shared}
{extra}
{value}
'''
        cases.append((case_id, prompt))
        (OUT / f'{case_id}-input.txt').write_text(prompt)

def run(case):
    case_id, prompt = case
    with tempfile.TemporaryDirectory(prefix='skill-language-replay-') as wd:
        cmd = ['codex', 'exec', '--ephemeral', '--skip-git-repo-check', '-s', 'read-only', '-m', 'gpt-6.1-sol', '-c', 'model_reasoning_effort="medium"', '-C', wd, '--json', '-o', str(OUT / f'{case_id}-output.md'), '-']
        r = subprocess.run(cmd, input=prompt, capture_output=True, text=True, timeout=240)
        events = []
        for line in r.stdout.splitlines():
            try:
                event = json.loads(line)
                if event.get('type') in ['item.started', 'item.completed']:
                    item = event.get('item', {})
                    if item.get('type') != 'agent_message':
                        events.append(item.get('type'))
            except json.JSONDecodeError:
                pass
        result = {'case': case_id, 'exit_code': r.returncode, 'non_message_event_types': events, 'output_exists': (OUT / f'{case_id}-output.md').exists()}
        if r.returncode:
            result['error'] = r.stderr[-1500:]
        print(json.dumps(result), flush=True)
        return result

if __name__ == '__main__':
    # Prove the configured model/session works before launching the remaining cases.
    first = run(cases[0])
    results = [first]
    if first['exit_code'] == 0 and not first['non_message_event_types']:
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            results.extend(pool.map(run, cases[1:]))
    (OUT / 'runs.json').write_text(json.dumps(results, indent=2))
