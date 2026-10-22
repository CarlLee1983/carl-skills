## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".claude/skills/pm/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK/.claude/skills/pm/references/next-step.md"}
- Glob {"pattern": "docs/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK"}
- Glob {"pattern": ".scratch/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK/docs/workflow/build-ticket.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.hysgztTGfK/.scratch/notes/issues/02-markdown-writer.md"}

## 最終回覆

我不會直接動手整理「上線規格包」。pm skill 規定它不自己撰寫規格或工單,只能交給專案的規劃入口。我找了一輪,目前沒有可以交的入口,所以先停在這裡問你。

**`.scratch/notes` 的狀態**
- 這個計畫有 2 張工單,兩張都標示 `State: closed`。
  - 01 匯出資料結構:驗收項已勾選,檔案記載 PR #11 已合併至 main。
  - 02 Markdown 寫出器:驗收項已勾選,檔案記載 PR #12 已合併至 main。
- 這些只是工單檔案自己的記載,屬於 **inferred**。專案不是 git repo,我也沒有查 PR 的實際狀態。
- 照 `spec.md` 的交付終點(PR 合併至 main),計畫看起來已結案,不需要再往下接。
- 查詢時間是 2026-10-22,資料來源是 `.scratch/notes/` 底下的三個檔案。

**入口檢查**
1. **專案規則**:`AGENTS.md` 只指向 `docs/workflow/build-ticket.md`。它只接受已有範圍與驗收的工單,而上線規格包現在還沒有工單,也不是寫規格的入口。
2. **對話與計畫內容**:`spec.md` 和工單裡都沒有提到規劃或寫規格的入口。
3. **已安裝的 skill**:我逐一比對過,沒有適合起草規格或工單的。
4. **結論**:找不到入口,我不會自己挑一個。

**請你決定**
- 你有沒有規劃或寫規格的入口,例如某個 skill、文件或流程?告訴我名稱,我讀過之後再交接。
- 或者你指定要用哪種方式產出「上線前檢查清單、驗收標準、缺口清單」,以及要放在哪裡。我不會自己新建檔案或格式。

這次我沒有改任何檔案,也沒有 commit、push 或 merge。
