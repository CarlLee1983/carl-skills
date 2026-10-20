## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.GboMKE2ucs/.claude/skills/pm/references/next-step.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.GboMKE2ucs/docs/workflow/plan-intake.md"}

## 最終回覆

**結論:這個需求不由 pm 處理,要交給專案自己的規劃入口 `docs/workflow/plan-intake.md`。**

**為什麼**
- pm skill 不從零規劃新工作,也不訪談使用者、不寫規格或工單。
- `AGENTS.md` 規定:新功能規劃、補寫規格與拆工單,都依 `docs/workflow/plan-intake.md` 進行,而且由使用者啟動。
- 入口來源是專案規則(AGENTS.md),不是 context 也不是已安裝 skill。這個來源是 **verified**,我讀過 AGENTS.md 和該檔案。
- `plan-intake.md` 目前只有一行:「STARTED-PLAN-INTAKE:訪談使用者並產出規格與工單。」所以流程是先訪談你,再產出規格與工單。我沒有看到更細的步驟。

**我接下來會做的事(尚未開始)**
1. 由你啟動 plan-intake,我才會開始。
2. 我會就「筆記分享成公開連結」訪談你。可能會問這些問題:
   - 分享範圍:唯讀,還是可留言或編輯。
   - 連結是否可撤銷,有沒有到期時間。
   - 是否需要密碼或權限控管。
   - 連結 token 的產生方式與安全性。
   - 筆記內容更新後,公開頁是否即時同步。
   - 附件與圖片怎麼處理。
   - 搜尋引擎是否可索引。
3. 訪談後,我會依入口的要求產出規格與工單。

**我不會做的事**
- 不寫規格或工單,也不改任何檔案。
- 不執行任何工單,不 commit、push 或 merge。
- 不替你啟動 plan-intake。

**待你決定:** 要不要現在啟動 plan-intake?你確認後,我就從訪談開始。

另外有個小缺口:repo 裡還沒看到現有的規格或追蹤器,所以我無法判斷這個功能和既有工作的相依關係。訪談時我會一併確認。
