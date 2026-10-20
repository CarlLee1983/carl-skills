#!/usr/bin/env bash
# 用法：[RAW_DIR=<目錄>] [SKILL_SRC=<skill 目錄>] run.sh <標籤> <情境名稱>...   例：run.sh red r1-identify ch1-impact
# 在拋棄式暫存目錄組出假專案（_base + 情境覆蓋層 + 單獨複製的 skills/pm），
# 以 claude -p 跑一個全新對話。預設只開放唯讀工具；情境目錄有 tools.txt 時改用其中的工具
# （可寫的情境不含 Bash，並在結束後比對暫存專案的變更，存成 out/<標籤>/<情境>.diff）。
# 萃取結果存到 out/<標籤>/；原始 stream-json 存到 RAW_DIR（預設在系統暫存區，不進版本庫）。
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../../../.." && pwd)"
LABEL="$1"; shift
RAW_DIR="${RAW_DIR:-${TMPDIR:-/tmp}/pm-sim-raw}/$LABEL"
mkdir -p "$HERE/out/$LABEL" "$RAW_DIR"

RO_PREAMBLE='[唯讀模擬] 這是行為評估：不要執行任何工單、不要修改檔案、不要 commit/push/merge、不要發布任何東西。pm skill 安裝在 .claude/skills/pm/，請載入並依其指示處理下面的需求；如果依 skill 會「接續執行」所選入口，只需讀取入口並明說你接下來會做什麼，然後停止。

'
RW_PREAMBLE='[模擬] 這是行為評估，專案位於拋棄式暫存目錄，可以寫檔，但沒有 Bash，也不要 commit/push/merge、不要發布任何東西。pm skill 安裝在 .claude/skills/pm/，請載入並依其指示處理下面的需求；如果依 skill 會「接續執行」所選入口，只需讀取入口並明說你接下來會做什麼，然後停止。

'

run_one() {
  local name="$1"
  local tmp; tmp="$(mktemp -d)"
  cp -R "$HERE/fixtures/_base/." "$tmp/"
  cp -R "$HERE/fixtures/$name/." "$tmp/"
  local tools="Read,Glob,Grep,Skill" pre="$RO_PREAMBLE" perm="default"
  if [ -f "$tmp/tools.txt" ]; then tools="$(cat "$tmp/tools.txt")"; pre="$RW_PREAMBLE"; perm="acceptEdits"; fi
  local prompt; prompt="$(cat "$HERE/fixtures/$name/prompt.txt")"
  rm -f "$tmp/prompt.txt" "$tmp/tools.txt"
  local snap; snap="$(mktemp -d)"
  cp -R "$tmp/." "$snap/"
  mkdir -p "$tmp/.claude/skills"
  cp -R "${SKILL_SRC:-$REPO/skills/pm}" "$tmp/.claude/skills/pm"
  local out="$HERE/out/$LABEL/$name" raw="$RAW_DIR/$name"
  (cd "$tmp" && claude -p --model sonnet --setting-sources project \
      --tools "$tools" --permission-mode "$perm" --output-format stream-json --verbose \
      "$pre$prompt" < /dev/null > "$raw.jsonl" 2> "$raw.err") || true
  python3 -I - "$raw.jsonl" > "$out.md" <<'PY'
import json, sys
tools, text = [], []
for line in open(sys.argv[1]):
    try:
        e = json.loads(line)
    except ValueError:
        continue
    if e.get("type") == "assistant":
        for b in e["message"]["content"]:
            if b.get("type") == "tool_use":
                tools.append(f'{b["name"]} {json.dumps(b["input"], ensure_ascii=False)}')
            elif b.get("type") == "text":
                text.append(b["text"])
print("## 工具呼叫\n")
print("\n".join(f"- {t}" for t in tools) or "(無)")
print("\n## 最終回覆\n")
print(text[-1] if text else "(無回覆)")
PY
  { echo "## 暫存專案變更（相對於模擬前）"; echo;
    diff -ruN --exclude=.claude "$snap" "$tmp" | sed "s#$snap#before#g; s#$tmp#after#g" || true; } > "$out.diff"
  rm -rf "$tmp" "$snap"
}

for s in "$@"; do run_one "$s" & done
wait
