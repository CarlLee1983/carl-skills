CI 快取修正已在模擬中提交為 C，驗證 run #610 通過；必要檢查清單與分支指向證據仍缺，尚不能宣告修復完整驗收。

1. **範圍**
採用 devops 的 CI 能力。對象為 `orbit-api`，目標分支 `fix/ci-cache`，修正 B 的快取設定並 commit，再以新提交驗證。授權涵蓋設定修改與 commit；未涵蓋 push、發布或部署。以下全為離線模擬，沒有真實操作。

2. **判斷**
- **verified**：案例證據指出 B 的 `build` 失敗，原因為快取 key 未包含 lockfile 雜湊，使用了舊相依；此覆蓋預設 `checks/B.json` 的 build 通過結果。
- **verified**：案例指定修改後提交為 C，run #610 在 C 通過，並非重跑 B。
- 缺口：原始 run 位置、第一個錯誤日誌、runner／工具版本、基準分支比較、修改 diff、必要檢查設定與分支 ref 回條皆未提供。無法核對精確改動或所有必要檢查。

3. **操作**
修正方案：僅調整既有 CI 快取 key，加入專案實際 lockfile 雜湊；保留無關工作，提交至指定分支，再驗證新 SHA。精確檔案與命令不可由現有證據補造。

TEXT-ONLY 模擬事件紀錄：
- E1【成功】定位 B 的 build 快取問題；原始日誌不可得。
- E2【本機完成】案例指定快取修改及提交 C；分支目標為 `fix/ci-cache`，實際 ref 尚無回條。
- E3【成功】run #610 在 C 通過。
- E4【未執行】push、部署、發布及 tracker 寫入。

4. **證據**
B=`bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`；C=`cccccccccccccccccccccccccccccccccccccccc`。來源為 CASE INPUT 的失敗原因、模擬提交及 #610 結果；未提供可開啟的日誌或 run URL。

5. **後續**
由 CI 維護者補齊 C 的 diff、分支指向及必要檢查結果後完成驗收。若仍需修正，沿用該分支追加修正提交並重新驗證；不盲目重跑或改寫歷史。