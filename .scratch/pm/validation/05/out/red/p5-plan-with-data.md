## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.claude/skills/pm/references/check.md"}
- Glob {"pattern": "**/*", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship/issues/01-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship/issues/02-sender.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship/issues/03-ui.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Brn7h12fYv/.scratch/ship/issues/04-e2e.md"}

## 最終回覆

**依 pm skill 的 check 看 `.scratch/ship`:關鍵路徑是 01 → 02 → 04,最早 2026-11-10(週二)完成,成本 NT$80,000。**

資料來源是 `.scratch/ship/` 下的 `spec.md` 和 4 張工單,讀取時間為 2026-10-20。4 張工單都是 open,沒有 PR 或完成證據可查。

**依賴關係**
- 01 沒有前置。
- 02 和 03 都等 01。
- 04 等 02 和 03。

**排程**(Ben 與 Amy 各 1 人,每人同時只做一張,從 11/2 起只計工作日)

| 工單 | 負責 | 工時 | 日期 |
|---|---|---|---|
| 01 通知資料表 | Ben | 2 天 | 11/2–11/3 |
| 02 發送服務 | Ben | 4 天 | 11/4–11/9(11/7、11/8 是週末) |
| 03 設定頁 | Amy | 3 天 | 11/4–11/6 |
| 04 端對端驗收 | Amy | 1 天 | 11/10 |

**關鍵路徑**
- 01 → 02 → 04 共 2+4+1 = 7 個工作日,所以最早 11/10 完成。
- 03 在 11/6 就完成,比 02 早收尾,有 1 個工作日的餘裕(11/9)。
- 04 要等 02 完成,所以 11/10 才能開始。

**成本**
- spec 寫「人天成本 NT$8,000」。我把它當作每人天 NT$8,000。
- 總工時是 2+4+3+1 = 10 人天,所以是 NT$80,000。
- 這只是工時成本。Amy 在 11/9 的空檔我沒有另外計價。

**資料沒有涵蓋的部分**
- 我沒有查到假日、請假或 Ben 與 Amy 的可用性,所以日期是假設 11/2–11/10 全是工作日。
- 估時是單點估計,沒有緩衝。
- 資料只有這些本地檔案,沒有外部 tracker。

**目前可以開始的工單**:只有 01(open、沒有前置、負責人是 Ben)。依專案規則(`AGENTS.md`),實作單張工單的入口是 `docs/workflow/build-ticket.md`。這次是唯讀評估,我沒有啟動任何工單,也沒有修改檔案。
