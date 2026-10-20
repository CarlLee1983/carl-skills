建議：實際候選 B 升 patch 至 1.4.3，評估為可發布；PR #12 尚未合併，若納入則須重新評估，預測升 minor。

1. **範圍**
依供應的 devops 技能進行離線發布評估。發布單位為 `orbit` CLI，正式目的地 `registry.example/orbit`；基準為已交付的 1.4.2／A，實際候選為 A..B。另評估 PR #12／C，不將它算入 B。未查驗即時遠端、工具身分、工作樹與目前發布狀態；證據時間未提供。

2. **判斷**

| 對象 | 納入下一版 | 版本調整 | 發布時機 |
| --- | --- | --- | --- |
| 實際候選 B | 需要 | patch：1.4.3 | 可發布 |
| PR #12／C | 需要 | 若合併，預測 minor：1.5.0 | 條件式候選被阻擋 |

**verified：**`diff/A..B` 僅修正 `dist/cli.js` 尾端換行，向下相容且尚未交付；`checks/B.json` 的 Node 22／Linux `test`、`package` 均通過。依逐次發布政策，B 符合發布評估條件。

**verified：**覆寫證據確認 PR #12 未合併，C 新增相容的 `--color`，檢查 pending。**inferred：**若合併，依 SemVer 應升 minor；仍須檢查實際合併 SHA 的完整候選及必要結果。C 的 pending 不阻擋 B，B 的通過也不能替代 C 或合併提交的驗證。

3. **操作**
未執行。`authorization.txt` 僅授權評估。

具體提案：以 B 為基底，僅更新 `package.json`、`CHANGELOG.md` 至 1.4.3；建立準備提交，記錄實際新 SHA、確認 diff 並重跑必要檢查。通過後，依 `docs/release.md` 建立指向該提交的 `v1.4.3`、push、啟動 `release.yml`，最後核對正式收據。上述寫入均須明確授權；不得直接沿用 B 的檢查。失敗或結果未知時停止相依步驟、先查現況，不重複發布或改寫既有 tag。

4. **證據**
基準：`releases/1.4.2.json`／A。候選：`refs.json`、`diff/A..B`、`checks/B.json`。PR：覆寫證據、`PR-12.diff`／C。政策：`RELEASE-POLICY.md`、`docs/release.md`。

5. **後續**
評估已完成；準備與發布未開始。由發布負責人決定授權；若先合併 PR，須改以新固定 SHA 重評版本與檢查。尚無新版本交付證據。

TEXT-ONLY 模擬事件紀錄
E1｜成功：依覆寫證據區分 B 與未合併 C。
E2｜成功：完成實際候選與條件式候選評估。
E3｜未執行：升版、commit、tag、push、workflow、發布；無授權。
E4｜未解決：C 檢查 pending；準備提交與正式收據尚不存在於供應證據。
