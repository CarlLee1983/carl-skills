#!/bin/bash
# Static packaging check: copy skills/ciso alone, validate metadata, resolve every relative Markdown link inside the copy.
set -euo pipefail
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -R skills/ciso "$tmp/ciso"
validator=~/.codex/skills/.system/skill-creator/scripts/quick_validate.py
if [ -f "$validator" ]; then
  python3 "$validator" "$tmp/ciso"
else
  echo "quick_validate.py not installed; metadata validation skipped"
fi
python3 - "$tmp/ciso" <<'PY'
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
# ADR 0006 Falsified if: the entry and the references (except sources.md and acceptance.md) must not name underlying skills.
# The names come from the known-skills list in sources.md, so a new entry is covered automatically; an empty list only warns (no must-maintain registry).
src = (root / 'references/sources.md').read_text() if (root / 'references/sources.md').exists() else ''
section = re.search(r'^## Known underlying security skills\n([\s\S]*?)(?=^## |\Z)', src, re.M)
rec_names = re.findall(r'^\| `([^`]+)`', section.group(1), re.M) if section else []
named = []
for md in root.rglob('*.md'):
    rel = md.relative_to(root).as_posix()
    if rel in ('references/sources.md', 'references/acceptance.md'):
        continue
    named += [f'{rel}: {n}' for n in rec_names if re.search(r'(?<![\w-])' + re.escape(n) + r'(?![\w-])', md.read_text())]
if not rec_names:
    print('warning: sources.md lists no known underlying security skills; the no-names check had nothing to compare')
need = ['SKILL.md', 'LICENSE'] + [f'references/{n}.md' for n in 'evidence review delegation sources acceptance'.split()]
missing = [n for n in need if not (root / n).exists()]
sections = {}
for cap in ['review']:
    f = root / f'references/{cap}.md'
    if not f.exists():
        continue
    heads = re.findall(r'^## (.+)$', f.read_text(), re.M)
    lack = [h for h in ['Triggers', 'Inputs', 'Steps', 'Output', 'Done', 'Blocked', 'Handoff'] if h not in heads]
    if lack: sections[cap] = lack
print({'links_checked': count, 'broken_links': bad, 'personal_or_repo_paths': abs_paths, 'missing_files': missing, 'missing_sections': sections, 'underlying_skills_named_outside_sources': named})
sys.exit(1 if bad or missing or sections or abs_paths or named else 0)
PY
