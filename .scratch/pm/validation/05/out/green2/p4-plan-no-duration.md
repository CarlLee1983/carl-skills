## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.claude/skills/pm/references/plan.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.scratch/sync"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.scratch/sync/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.scratch/sync/issues/01-model.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.scratch/sync/issues/02-api.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.WDQ3kKhRYa/.scratch/sync/issues/03-client.md"}

## 最終回覆

**結論:現有資料算不出完成日期,也算不出總成本。** 我不會估一個數字給你。

**查詢來源**:`.scratch/sync/` 的 `spec.md` 和 `issues/01~03`,查詢日期 2026-10-20,唯讀。

**缺少的資料**
- **工期**:三張工單和 spec 都沒有記錄天數、點數或預估工時。
- **人力**:沒有負責人或可用人數。
- **成本**:沒有預算、人天單價或費率。
- **日期**:沒有開始日、目標日或截止日,所以也無法算和計畫的差距。

**已有的資料**
- **里程碑**:spec 記了 M1 資料模型與衝突規則、M2 同步 API、M3 客戶端整合。工單 01、02、03 各對應 M1、M2、M3。
- **相依性**:01 沒有前置,02 依賴 01,03 依賴 02。這是一條線性鏈,沒有缺節點,沒有循環,也和里程碑順序一致。
- **狀態**:三張都是 open,沒有任何完成證據。

**平行度**
DAG 上沒有彼此獨立的分支,所以沒有可平行的工作。這條鏈就是唯一路徑,三張工單只能依序做。這只是相依性的結論,不是排程上的關鍵路徑,因為沒有工期可以算。

**其他缺口**
- spec 只有里程碑一行,沒有目標、成功標準和範圍。
- 工單沒有驗收條件,也沒有資源限制的記錄。
- 這些缺口屬於規劃,依 `AGENTS.md` 該走 `docs/workflow/plan-intake.md`,由你啟動。我不會自己補。

**下一步**
如果你在 plan-intake 或工單裡補上各工單的工期、負責人和成本基準(例如人天單價與日曆假設),我就能依序加總 01→02→03,算出完成日期和總成本,並標明每個輸入的來源與假設。

照 skill 的規定,這次只做審查,不接續執行任何入口,也沒有改動任何檔案。
