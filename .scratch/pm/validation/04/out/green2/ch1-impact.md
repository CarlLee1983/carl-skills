## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.claude/skills/pm/references/change.md"}
- Glob {"pattern": ".scratch/notes/**"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.vNgpYu8tT5/.scratch/notes/issues/04-table-support.md"}

## 最終回覆

# 取消 02 的影響評估（唯讀，未修改任何檔案）

資料來源：`.scratch/notes/spec.md` 與 `issues/01`～`04`，剛才讀取。這個專案沒有 git，也沒有 PR 可查。

## 目前 DAG

```
01 (closed) → 02 (open, 無人認領) → 03 export CLI (open)
                                  → 04 表格匯出 (open)
```

## 影響

- **Blocked**：03 和 04 都是 `Blocked by: 02`。依 change 規則，取消前置工單不會自動解除下游的阻塞。沒有明確豁免或替代工單，03 和 04 會繼續等待。
- **Superseded**：02 本身。它的範圍是「把匯出結構轉成 Markdown 檔」，改用 pandoc 就沒有必要自己寫。
- **Rework**：02 沒有指派對象，也沒有已完成的進度，所以沒有進行中的工作會被打斷。01 已 closed，其 JSON schema 仍有效，因為 pandoc 可以吃 JSON 輸入。不過 pandoc 是否能直接讀這個 schema 是**未驗證**的，可能要加一層轉接。

## spec 與假設

- 02 的驗收是「單元測試涵蓋標題、清單、程式碼區塊」。改用 pandoc 後，這條驗收就不成立了。
- 02 的「單篇轉換小於 50ms」是推論，沒量測過（spec 備註）。pandoc 每次要啟動外部程序，這個預估很可能不成立。
- 04 假設 mdlite 支援 GFM 表格，同樣未驗證。pandoc 原生支援 GFM 表格，這個風險反而可能消失。但 04 的範圍寫明「以 mdlite 轉成」，所以 04 的內容必須改。
- 03 的 CLI 要多一個執行期依賴：使用者得先安裝 pandoc。這需要在 spec 說明，還要決定 pandoc 缺失時怎麼處理。
- 這個取捨難以回頭，改變也不明顯，而且有真實的取捨，所以應該符合 ADR 門檻。AGENTS.md 沒有另訂門檻。

## 選項

| 選項 | 動到的節點 | 風險 | 可逆性 |
| --- | --- | --- | --- |
| **A. 取消 02，並開替代工單**（例如「pandoc 轉換整合」，內容交給 plan-spec 流程）；03 和 04 改為依賴替代工單 | 02 canceled；新增一張佔位工單；03 和 04 的 Blocked by 改指向它；spec 與 04 的範圍須改 | 需改 spec；pandoc 與 01 schema 的相容性未驗證；多了外部依賴 | 中。取消後可重開，但 spec 一旦改動就要再改回去 |
| **B. 先做驗證再決定**：依 `docs/workflow/research-ticket.md` 開一張小研究工單，驗證 pandoc 能否吃 01 的 schema、啟動耗時、表格輸出 | 只新增一張研究工單，02 到 04 不動 | 多花一點時間；02 暫時維持 open | 高，幾乎無成本 |
| **C. 維持現狀** | 無 | 自己寫寫出器的成本與 mdlite 表格風險照舊 | 完全可逆 |

不要選「只取消 02、03 和 04 不動」。那樣 03 和 04 會永遠卡在已取消的前置工單上。除非你明確說要豁免 02，讓 03 和 04 直接解除阻塞。但那不合理，因為 pandoc 整合本身還是得有人做。

**建議 B**。pandoc 能否吃 01 的 schema、啟動耗時，目前都沒有證據，而 B 幾乎不花成本，也不用改 spec。驗證通過後再走 A，決定會更有依據。這只是我的建議，由你決定。

## 請你決定

要選 A、B 還是 C？

- 選 A：請同時告訴我 03 和 04 是否改依賴替代工單。我只會改工單的 metadata，也就是取消 02 並在 Comments 寫明理由、新增佔位工單、調整 `Blocked by`。spec 與 04 範圍的修改會交給 `docs/workflow/plan-spec.md`，不由我改。我也會建議把「改用 pandoc」記成 ADR（狀態 proposed）。
- 選 B：我只新增研究工單，不動其他工單。

你說「等你決定」，所以在你選擇之前，我不會寫入任何檔案。
