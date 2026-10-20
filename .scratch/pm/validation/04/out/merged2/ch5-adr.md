## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Glob {"pattern": "docs/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/.scratch/notes/issues/04-table-support.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/docs/adr/0001-json-intermediate.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.kvBQmyT99O/docs/workflow/plan-spec.md"}

## 最終回覆

我已讀完 `.scratch/notes` 的 spec、4 張工單和 `docs/`。目前沒有改任何檔案,因為 pm skill 要求先做影響評估,等你選定方案後才能寫入。

## 變更評估(唯讀,查詢時間 2026-10-20)

**變更內容:** 匯出永久只輸出 Markdown,不做 HTML 轉換。這是你剛下的決定。

**對工單的影響:**
- **被擋住:** 沒有。02、03、04 的範圍裡都沒提到 HTML。
- **被取代:** 沒有。
- **需要重做:** 目前看不到任何一項,不過有一個前提受影響。
  - `docs/adr/0001-json-intermediate.md`(accepted)寫「先轉成 JSON 結構再由各寫出器處理」。
  - 只剩 Markdown 一種輸出後,「多個寫出器」這個理由就變弱了。
  - 01 已 closed,PR #11 也已合併。如果日後要拿掉 JSON 中介層,01 就會被波及。

**spec 層面:**
- `spec.md` 目前沒有寫「不做 HTML」。
- 這個決定要寫成 spec 的範圍聲明,屬於 spec 變更,PM 不能直接改。

**ADR 門檻:**
- 這個取捨很難回頭,日後加 HTML 要大改匯出結構,而且沒有背景的人看了會覺得意外。
- 所以它達到 ADR 門檻,建議記成 status: proposed 的決策紀錄。

**可選方案:**

| 方案 | 動到的節點 | 風險 | 可逆性 |
| --- | --- | --- | --- |
| A. 只在 spec 與 ADR 記錄「Markdown 唯一輸出」,保留 JSON 中介層與現有工單 | spec、新 ADR、可能把 ADR 0001 標註為前提已變 | 保留了用不到的抽象,但不用重做 | 高。日後加 HTML 仍可沿用 JSON 層 |
| B. 同 A,再把簡化匯出結構(去掉 JSON 中介層)排成新工單 | 01 的成果(PR #11)與 02 的介面 | 要重做已合併的工作 | 低。這正是你說很難回頭的部分 |
| C. 暫不記錄,維持現狀 | 無 | 決定只存在對話裡,日後容易被推翻或遺忘 | 高,但不符合你要記錄的目的 |

**我的建議:** 選 A。理由是沒有任何工單被擋住,不會干擾進行中的工作。這個決定和 JSON 中介層是否保留是兩件事,B 可以之後再另外決定。

**另外兩個與此決定無關、但已存在的未驗證項目:**
- `spec.md` 說匯出 JSON 結構已由 PR #11 的 schema 測試驗證。這點有來源,工單 01 也寫了。
- 02 預估單篇轉換小於 50ms,這只是推論,尚未量測。
- 04 假設 mdlite 支援 GFM 表格,也尚未驗證。04 的範圍完全落在 Markdown 內,而 Markdown 現在是唯一輸出,所以這個假設風險更值得先查證。這可以另開研究工單,依 `docs/workflow/research-ticket.md`。

## 請你選擇
請選 A、B 或 C。

## 選定後我會做的事
- **工單 metadata:** A 方案不需要改任何工單。B 方案會新增一張佔位工單,只含標題與依賴,內容由專案入口填寫。
- **spec 與 ADR:** 這兩項不由 PM 直接寫。
  - 專案規則 `AGENTS.md` 只宣告 spec 變更走 `docs/workflow/plan-spec.md`,沒有宣告 ADR 的專屬入口。
  - 所以我會把決定、受影響工單和這份評估,交給 `plan-spec`(`plan-spec.md` 目前只有一行內容:「STARTED-PLAN:訪談、修改 spec、切分工單」)。
  - 我也會請該入口一併處理 ADR 的提議,建議內容是「匯出永久只輸出 Markdown」及其理由。
- **範圍:** 你授權我改 `.scratch/notes` 和 `docs`,但依 skill,spec 與 ADR 的實際內容由專案入口負責,所以我只讀了入口,接下來會依它進行,並在此停下等你的選擇。
