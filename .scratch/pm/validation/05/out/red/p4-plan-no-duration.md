## 工具呼叫

- Skill {"skill": "pm"}
- Glob {"pattern": ".scratch/sync/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC/.claude/skills/pm/references/check.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC/.scratch/sync/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC/.scratch/sync/issues/01-model.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC/.scratch/sync/issues/02-api.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC/.scratch/sync/issues/03-client.md"}
- Grep {"pattern": "估|工時|成本|預算|estimate|cost|points|人天|velocity", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.7yqdu3krvC", "-i": true, "output_mode": "files_with_matches"}

## 最終回覆

這些資料不夠,我沒辦法估出完成日期或總成本。

**進度(查詢來源:`.scratch/sync/` 下的 spec 和 3 張工單,2026-10-20 讀取)**
- 3 張工單全部是 `open`,已完成 0/3。
- 依賴關係是線性的:`01 資料模型 (M1) → 02 同步 API (M2) → 03 客戶端整合 (M3)`。
- 目前可開始的只有 01,它沒有前置條件。02 要等 01,03 要等 02。
- 工單裡沒有 assignee、PR 或完成證據。
- 目前沒有可用來核對結案的 PR 紀錄,這個專案也不是 git repo。

**為什麼不能估**
- spec 只列了三個里程碑,沒有範圍細節。
- 三張工單都沒有工時、點數、成本、預算或人力配置。
- 我也找不到歷史速度可以參考。
- 日期和成本需要這些輸入。我如果硬給數字,只會是猜的。

**要估算需要你補其中幾項**
1. 每張工單的工作量,例如人天或點數。
2. 人力配置和單位成本(人天費率或 token 預算)。
3. 開工日,以及是否有假日或緩衝要排。

因為 3 張是嚴格串行,完成日期等於三段工期相加,沒有平行可以縮短。補了數字就能直接算。

**接下來的建議入口**
- 依 `AGENTS.md`,補寫規格和拆工單走 `docs/workflow/plan-intake.md`,實作單張工單走 `docs/workflow/build-ticket.md`。這兩個入口都來自專案規則。
- 如果要先開工,下一步會是用 `build-ticket.md` 做工單 01。
- 這次是唯讀模擬,我不會執行工單。我讀完入口後會停下來,等你指示。
