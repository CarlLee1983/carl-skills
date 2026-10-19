"""Test selection from current descriptions only, without full skill instructions."""
from pathlib import Path
import json, subprocess, tempfile
out = Path('.scratch/skill-language/validation').resolve()
descriptions = {p.parent.name: next(x.removeprefix('description: ') for x in p.read_text().splitlines() if x.startswith('description: ')) for p in sorted(Path('skills').glob('*/SKILL.md'))}
requests = {
 'R1': '功能大致做完了，但不知道介面從哪裡開始，幫我比較設計方向。',
 'R2': '幫我看計畫進度，哪張工單接下來可以開始？',
 'R3': '這幾個 PR 都合併了，該升哪個版本？現在適合發布嗎？',
 'R4': '這篇 X 貼文太像 ChatGPT，幫我改得像本人，保留我的不確定語氣。',
 'R5': '我又遇到同樣的 Codex 錯誤，調校一下並記住這條工作規則。',
 'R6': '依已定案設計稿，把這個按鈕的 margin 從 8px 改成 12px。',
 'R7': '把 README 裡 Claude Code 的安裝路徑改成 /team/skills。',
 'R8': 'Translate this one sentence into English: 我今天在家。',
 'R9': 'Use the active Goal to keep advancing the authorized plan through its implementation workflow.',
 'R10': 'Help me resume the UI exploration from our saved design session.',
 'R11': 'Remove AI tone from this English product note without changing its claims.',
 'R12': 'Evaluate whether these internal documentation changes require a release.'
}
prompt = 'Select the applicable skill for each independent request using ONLY the supplied descriptions. Return JSON mapping IDs to a skill name or null when none applies, with a brief reason. Do not use tools, inspect files, execute workflows, or apply ordinary routing; this is an offline metadata-only selection test.\nDESCRIPTIONS:\n'+json.dumps(descriptions,ensure_ascii=False)+'\nREQUESTS:\n'+json.dumps(requests,ensure_ascii=False)
(out/'routing-input.txt').write_text(prompt)
with tempfile.TemporaryDirectory(prefix='skill-routing-') as wd:
 r=subprocess.run(['codex','exec','--ephemeral','--skip-git-repo-check','-s','read-only','-m','gpt-6.1-sol','-c','model_reasoning_effort="medium"','-C',wd,'--json','-o',str(out/'routing-output.json'),'-'],input=prompt,capture_output=True,text=True,timeout=240)
 events=[]
 for line in r.stdout.splitlines():
  try:
   e=json.loads(line)
   if e.get('type') in ['item.started','item.completed'] and e.get('item',{}).get('type')!='agent_message': events.append({'type': e['item']['type'], 'command': e['item'].get('command')})
  except json.JSONDecodeError: pass
 result={'exit_code':r.returncode,'non_message_event_types':events}
 (out/'routing-run.json').write_text(json.dumps(result,indent=2))
 print(json.dumps(result))
 if r.returncode: print(r.stderr[-1500:])
