## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy/.claude/skills/pm/references/plan.md"}
- Glob {"pattern": ".scratch/sync/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy/.scratch/sync/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy/.scratch/sync/issues/01-model.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy/.scratch/sync/issues/02-api.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.h4uE6ooeOy/.scratch/sync/issues/03-client.md"}

## 最終回覆

**結論:現有紀錄無法估出完成日期和總成本。** 依 pm skill 的 plan 規則,只能用來源裡有的資料計算,所以我不會捏造數字。

**查詢來源:** `.scratch/sync/spec.md` 和 `issues/01~03`,2026-10-20 唯讀查詢。

**已記錄的內容**
- **里程碑(verified):** M1 資料模型與衝突規則、M2 同步 API、M3 客戶端整合。三張工單各屬一個里程碑。
- **依賴(verified):** 01 → 02 → 03,是一條線性鏈,沒有循環,也沒有缺少的節點。依賴順序和里程碑順序一致。
- **狀態(verified):** 三張工單都是 open,沒有完成證據。

**缺少的資料(coverage gap)**
- 沒有任何工單的工期或工時。
- 沒有負責人或人力配置。
- 沒有成本、預算或費率。
- 沒有目標日期或截止日。
- spec 只列出里程碑,沒有成功標準,工單也沒有驗收條件。

**平行度**
- 這條鏈是線性的,依賴上沒有可平行的分支。
- 完成日期只能等於三張工單依序做完。
- 因為沒有工期,我不把這條鏈稱為排程上的關鍵路徑。

**下一步**
- 請在工單裡補上工期(或點數加速率)、負責人、成本或費率,以及目標日期。補齊後我就能算完成日期、總成本,以及和目標日期的差距。
- 補資料屬於規劃工作。依 `AGENTS.md`,要走 `docs/workflow/plan-intake.md`,由你啟動。我沒有修改任何檔案,也沒有啟動任何流程。
