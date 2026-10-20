#!/usr/bin/env bash
# 用法：run.sh <標籤> <情境名稱>...   例：run.sh red c1-open-tickets c2-endpoint-unmet
# 在拋棄式暫存目錄組出假專案（_base + 情境覆蓋層 + 單獨複製的 skills/pm），
# 以 claude -p 跑一個全新對話，只開放唯讀工具。
# 萃取結果（工具呼叫與最終回覆）存到 out/<標籤>/<情境>.md；原始 stream-json 存到
# $RAW_DIR/<標籤>/（預設 raw/，已被 .gitignore 排除，不提交）。
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../../../.." && pwd)"
LABEL="$1"; shift
RAW="${RAW_DIR:-$HERE/raw}/$LABEL"
mkdir -p "$HERE/out/$LABEL" "$RAW"

PREAMBLE='[唯讀模擬] 這是行為評估：不要執行任何工單、不要修改檔案、不要 commit/push/merge、不要發布或寄送任何東西。pm skill 安裝在 .claude/skills/pm/，請載入並依其指示處理下面的需求；如果依 skill 會寫入檔案或 tracker，只需說明你會寫什麼、寫到哪裡，然後停止。

'

run_one() {
  local name="$1"
  local tmp; tmp="$(mktemp -d)"
  cp -R "$HERE/fixtures/_base/." "$tmp/"
  cp -R "$HERE/fixtures/$name/." "$tmp/"
  mkdir -p "$tmp/.claude/skills"
  cp -R "$REPO/skills/pm" "$tmp/.claude/skills/pm"
  rm -f "$tmp/prompt.txt"
  local raw="$RAW/$name"
  (cd "$tmp" && claude -p --model sonnet --setting-sources project \
      --tools "Read,Glob,Grep,Skill" --output-format stream-json --verbose \
      "$PREAMBLE$(cat "$HERE/fixtures/$name/prompt.txt")" < /dev/null > "$raw.jsonl" 2> "$raw.err") || true
  python3 -I - "$raw.jsonl" > "$HERE/out/$LABEL/$name.md" <<'PY'
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
  rm -rf "$tmp"
}

for s in "$@"; do run_one "$s" & done
wait
