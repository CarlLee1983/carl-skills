"""Compare repository source against HEAD; requires tiktoken (measurement only)."""
import json
from pathlib import Path
import subprocess
import tiktoken

enc = tiktoken.get_encoding('o200k_base')
rows = []
for p in sorted(Path('skills').rglob('*.md')):
    old = subprocess.check_output(['git', 'show', f'HEAD:{p}'], text=True)
    new = p.read_text()
    if old == new:
        continue
    row = {'path': str(p), 'before': len(enc.encode(old)), 'after': len(enc.encode(new))}
    if p.name == 'SKILL.md':
        for label, content in [('description_before', old), ('description_after', new)]:
            desc = next(line.removeprefix('description: ') for line in content.splitlines() if line.startswith('description: '))
            row[label] = len(enc.encode(desc))
    rows.append(row)
policy_before = len(enc.encode(subprocess.check_output(['git', 'show', 'HEAD:AGENTS.md'], text=True)))
policy_after = len(enc.encode(Path('AGENTS.md').read_text()))
print(json.dumps({'repo_policy': {'before': policy_before, 'after': policy_after}, 'tiktoken': tiktoken.__version__, 'encoding': enc.name, 'baseline': subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip(), 'files': rows, 'totals': {key: sum(row.get(key, 0) for row in rows) for key in ['before', 'after', 'description_before', 'description_after']}}, indent=2))
