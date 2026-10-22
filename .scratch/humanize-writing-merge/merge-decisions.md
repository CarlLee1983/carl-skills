# humanize-writing 三份副本合併：已定案的決定

日期：2026-10-22（台北），`/grill-with-docs` 三輪訪談，使用者全部同意。比對對象：A＝`skills/humanize-writing/`（來源目錄），B＝`~/.claude/skills/humanize-writing/`（9/24 手動副本），C＝`~/.codex/skills/humanize-writing/`（7/7 手動副本，A 與 B 的共同祖先）。

## 架構（ADR 0004、GLOSSARY「發佈與安裝」）

1. A 是唯一來源；其他位置都是安裝副本或專案副本。
2. 全域改用 Skills CLI 安裝到 `~/.agents/skills/humanize-writing`，`~/.claude/skills/` 以符號連結指向，比照 pm、design-experience。
3. Codex 透過同一份安裝副本讀取；`~/.codex/skills/humanize-writing` 刪除前先確認 Codex 讀得到新版。
4. 先合併、後替換：B、C 獨有內容裁決後經 PR 併入 A，合併後才安裝並替換全域副本。
5. CarlStack 維持專案副本＋rsync＋prettier。
6. 舊副本備份到 `~/.agents/skills.bak-20261022/claude-humanize-writing/`、`codex-humanize-writing/`。

## 規則裁決

| 項目 | 決定 |
| --- | --- |
| 中文破折號 | 成稿中禁用，改逗號、句號或括號；規則裡引用的反例除外，A 自己行文的破折號一併改掉 |
| 冒號 | 禁提示性冒號（鋪梗後揭曉）；放行標籤、時間、條列引言、引語 |
| 排比 | 不設硬上限；每項都要成立，湊數的刪；敘事刻意重複保留 |
| 標題 | 文章小標要講內容（A）；介面文案標題可當招牌（B 的 E 組），各自標明範圍 |
| 「不只…更」 | 遞進合法，翻案位置才禁（採 B） |
| 疊加保留語氣 | 刪重複的保留詞，留下的一層強度等於原句整體強度 |
| B 的中文 A–F | 整批併入：A 完全沒有的新增，部分重疊的補進 A 對應節；不保留 A–F 分組，用 A 的連續編號 |
| B 的英文 §10–17 | 比照中文併法，接在 A 英文 §15 之後續編 |
| `check_zh.py` | 併入 `scripts/`；對岸用語改讀 `zh-tw.md` 用語表；相對路徑；定位為建議步驟，跑一次逐筆判斷，不要求清零；SKILL.md 寫 `python3 scripts/check_zh.py <path>` |
| B SKILL.md 流程規則 | 併入：受保護片段逐字保留（擴充 A 的 URL／key 規則）、先結構後用字、審稿時比對受保護片段、交付先給成稿 |
| description 觸發詞 | 補回「改得像本人」「X post」「over-polished draft」三個（合約變更） |
| C 的 Model routing | 捨棄 |
| 介面文案 | B 的 E 組拆成 `references/interface-copy.md`，中英共用，SKILL.md 以指標在潤飾介面文案時讀取 |

## 交付

- 新建 `docs/humanize-writing/acceptance.md`：每個裁決項目一個案例，另含受保護片段、介面文案、敘事模式不受影響、`check_zh.py` 輸出；合併前子代理重跑，結果記到 `.scratch/humanize-writing/validation/`。
- 一個 PR，每張工單一個 commit（`/to-tickets` 時改定，原為四個 commit）。
- 合併、驗收通過後打 `humanize-writing/v1.0.0` 與 Release（另需授權，依 ADR 0003）。
- 之後：同步 CarlStack 專案副本、安裝全域副本、備份並移除舊副本。
