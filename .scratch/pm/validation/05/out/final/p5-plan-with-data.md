## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.claude/skills/pm/references/plan.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship/issues/01-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship/issues/02-sender.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship/issues/03-ui.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MWfJAIWpL5/.scratch/ship/issues/04-e2e.md"}

## 最終回覆

**依目前資料，計畫可算出進度與成本。** 缺口是沒有記錄里程碑、截止日和預算,所以無法算和目標的差距。

來源是 `.scratch/ship/` 下的 spec 和 4 張工單,剛剛讀取(2026-10-20)。4 張工單都是 open。

**關鍵路徑:01 → 02 → 04**(Ben 2 天 + Ben 4 天 + Amy 1 天,共 7 個工作日)

| 工單 | 負責 | 工時 | 預計日期 |
|---|---|---|---|
| 01 通知資料表 | Ben | 2 天 | 11/2–11/3 |
| 02 發送服務 | Ben | 4 天 | 11/4–11/9 |
| 03 設定頁 | Amy | 3 天 | 11/4–11/6 |
| 04 端對端驗收 | Amy | 1 天 | 11/10 |

- **最早完成日:2026-11-10(週二)。** 依據是 spec 記錄的開始日 11/2(週一)、只計工作日,以及各工單的估時。
- **成本:NT$ 80,000。** 四張工單共 10 人天(2+4+3+1),乘以 spec 的人天成本 NT$ 8,000。我把「人天成本」當作每人每工作日的費用,這是我的假設。成本算的是投入的人天,不是日曆長度。
- **03 有 1 個工作日的浮動。** 它 11/6 完成,04 要等 02 在 11/9 完成,所以 03 延後 1 天也不影響完工日。
- **平行性:** 依相依關係,02 和 03 可以同時做。它們分屬 Ben 和 Amy,資料裡沒有記錄共用檔案、環境或其他限制。我只能說資料沒有衝突,不能保證實際上不會互相影響。
- **資源限制:** spec 寫明每人同時只做一張。排程已遵守這點:Ben 的 01 和 02 前後接續,Amy 的 03 和 04 也是。

**計算的前提與限制:**
- 假設工作日只排除週末。資料沒有記錄假日或請假,所以沒有扣除。
- 沒有估時緩衝、返工或等待時間。
- 沒有里程碑或截止日,所以不算延誤。沒有預算上限,所以不算超支。

這份是唯讀稽核,我沒有改檔案,也沒有執行任何工單。若要補里程碑、截止日或預算,應回到專案的規劃入口 `docs/workflow/plan-intake.md`,由你啟動。我不會自己填寫這些資料。
