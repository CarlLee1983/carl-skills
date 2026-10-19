建議：實際候選 A→B 升 patch 至 1.4.3，目前可發布；PR #12 尚未合併，應另行評估納入後的候選。本次僅授權評估，所有操作均未執行。

評估單位：`orbit` CLI；正式通道目的地 `registry.example/orbit`。基準為已交付的 1.4.2，收據及 tag 均指向 A；固定目標為 B（`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`）。

| 決策 | 結果與依據 |
| --- | --- |
| 本次 PR 納入下一版 | **需要**。PR #12 的 head C 新增相容 `--color`，具有交付影響；但尚未合併，不屬於 B 的實際候選。 |
| 實際候選版本調整 | **patch：1.4.3**。`diff/A..B` 僅有 `dist/cli.js` 尾端換行修正，向下相容且尚未交付；政策明定交付 `dist/`。 |
| 現在發布 B | **可發布**。`checks/B.json` 證明 B 在 Node 22／Linux 的 `test`、`package` 均通過；政策採逐次發布。此結論不構成操作授權。 |

若先納入 PR #12，完整候選預估需升 **minor 至 1.5.0**。合併後須重新固定目標 SHA、檢視完整差異並通過必要檢查；C 目前 pending，不能算通過，也不能阻擋已通過檢查的 B。

操作提案：以 B 為來源，更新 `package.json`、`CHANGELOG.md` 為 1.4.3，再建立僅含這些變更的 commit；取得實際 SHA 並完成必要驗證後，建立指向該 commit 的 `v1.4.3`、push、啟動 `release.yml`，最後核對正式收據。工作樹、既有同名版本／tag、精確命令及恢復程序均無證據，須先補齊，才能形成可授權執行的完整方案。

文字模擬事件紀錄：

- 已完成：依提供的政策、差異、交付收據及 B 檢查作出評估。
- 已辨識：PR #12 未合併；C 檢查 pending；未將其計入 B。
- 未執行：升版、commit、tag、push、workflow、發布。
- 未解決：操作前狀態與命令細節缺失；無新版本交付證據。
