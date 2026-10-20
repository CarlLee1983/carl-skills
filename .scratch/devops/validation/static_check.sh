#!/bin/bash
# Static packaging check: copy skills/devops alone, validate metadata, resolve every relative Markdown link inside the copy.
set -euo pipefail
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -R skills/devops "$tmp/devops"
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py "$tmp/devops"
python3 - "$tmp/devops" <<'PY'
import re, sys
from pathlib import Path
root = Path(sys.argv[1]); bad = []; count = 0
for md in root.rglob('*.md'):
    text = md.read_text()
    for target in re.findall(r'\]\(([^)]+)\)', text):
        if re.match(r'https?://', target):
            continue
        path, _, anchor = target.partition('#')
        dest = (md.parent / path).resolve() if path else md
        count += 1
        if not dest.exists():
            bad.append(f'{md.relative_to(root)} -> {target}')
            continue
        if anchor:
            heads = {re.sub(r'[^\w\- ]', '', h).strip().lower().replace(' ', '-') for h in re.findall(r'^#+ (.+)$', dest.read_text(), re.M)}
            if anchor not in heads:
                bad.append(f'{md.relative_to(root)} -> {target} (anchor)')
        if root.resolve() not in dest.resolve().parents and dest.resolve() != root.resolve():
            bad.append(f'{md.relative_to(root)} -> {target} (outside skill)')
abs_paths = [str(p.relative_to(root)) for p in root.rglob('*.md') if re.search(r'/Users/|~/\.|carl-skills/', p.read_text())]
need = ['SKILL.md','LICENSE'] + [f'references/{n}.md' for n in 'environment ci release deploy observe incident recovery optimize release-operations release-policy release-acceptance evidence acceptance sources'.split()]
missing = [n for n in need if not (root / n).exists()]
sections = {}
for cap in 'environment ci deploy observe incident recovery optimize'.split():
    heads = re.findall(r'^## (.+)$', (root / f'references/{cap}.md').read_text(), re.M)
    lack = [h for h in ['Triggers','Inputs','Steps','Output','Done','Blocked','Handoff'] if h not in heads]
    if lack: sections[cap] = lack
rel = (root / 'references/release.md').read_text()
rel_lack = [k for k in ['**Triggers:**','**Inputs:**','## 1. Fix','**Output:**','**Done:**','**Blocked:**','**Handoff:**'] if k not in rel]
if rel_lack: sections['release'] = rel_lack
print({'links_checked': count, 'broken_links': bad, 'personal_or_repo_paths': abs_paths, 'missing_files': missing, 'missing_sections': sections})
sys.exit(1 if bad or missing or sections or abs_paths else 0)
PY
