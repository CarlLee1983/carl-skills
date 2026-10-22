---
status: accepted
---

# 每個 skill 各自以 tag 打版號

本集合不設共用版號，每個 skill 以 annotated tag `<skill>/vX.Y.Z` 各自打版號，並各自建立 GitHub Release。skill 是一個一個獨立安裝的，共用版號會讓沒有變更的 skill 也跟著升版，版號就看不出哪個 skill 真正變了。版號依 skill 對外的行為合約升級：改名、改觸發條件、移除能力、改固定輸出格式，或讓使用者原本的回覆方式失效時升 MAJOR；新增能力、模式或必須遵守的規則時升 MINOR；只改措辭、修漏洞或修連結、行為不變時升 PATCH。版號只記在 tag 與 Release notes，notes 連到該 skill 的驗收案例與 `.scratch/<skill>/validation/` 驗證紀錄。Skills CLI 安裝時一律取最新內容，不會依 tag 鎖定版本，所以 tag 的作用是標出變更點、對應驗證證據，而不是控制使用者裝到哪一版。

首次打版號時，calibrate-codex、design-experience、devops、pm 從 `1.0.0` 起，四個 tag 都指向同一個 commit。humanize-writing 還在修改中，暫不打版號，等合約穩定後依同一規則打 `humanize-writing/v1.0.0`。1.0.0 的 notes 只寫「首次版本」、一句話能力說明，以及驗收與驗證紀錄的連結，不回推之前的變更紀錄。建立與推送 tag、發布 Release 都需要另外取得授權。

## Considered Options

- 整個 repo 共用一個版號：只要維護一條版本線，但沒有變更的 skill 也會跟著升版，版號就不能反映單一 skill 的合約變化。
- 在 SKILL.md frontmatter 或 README 記版號：讀者不必查 tag 就能看到版號，但版號會有兩處要同步維護，而且目前沒有任何工具會讀這個欄位。
- 合約仍在變動的 skill 從 `0.x` 起：可以宣告「隨時可能改變」，但這次只有 humanize-writing 還在修改，所以選擇不幫它打版號，而不是讓它用 0.x 起跳。

**Falsified if:** 改動經常必須同時調整多個 skill 的合約，使各自的版號總是一起升級；或者 Skills CLI 開始依 tag 或 ref 鎖定安裝版本，需要不同的 tag 格式；或者某個 skill 的 `skills/<skill>/SKILL.md` 需要被工具讀取 frontmatter 版號。
