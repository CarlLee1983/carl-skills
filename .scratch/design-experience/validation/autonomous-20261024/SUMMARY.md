# design-experience 自主批次校準驗證

日期：2026-10-24。範圍為設計技能，不修改 design-experience-lab 產品來源、歷史報告或 CI。

## 變更與邊界

技能明確區分協作與已授權自主決策，與 Theme-first／Feature-first／Improve 正交。自主模式逐案建立、實際檢查、修正、記錄並接續；批次與外部寫入邊界不擴張。代理選擇、原型完成、驗證與人類接受分開記錄。

自檢依案別與來源版本留證；範本不能供應其他案例的分數、輪次或觀察。協作能力依任務適配選擇，不能為固定媒體數扭曲題目或虛稱遵循；使用者指定能力仍依偏好／衝突規則處理。

## 檢查結果

- 來源及獨立複製包 quick_validate 通過；封裝內 7 份 Markdown、17 處相對參照通過。
- 五份來源變更的 git diff --check 與最終 diff review 通過。獨立唯讀 reviewer 無 material findings。
- 安裝後 metadata 與 17 處相對參照通過；9 個技能檔案 SHA-256 與來源全部一致（installed-parity.json）。只同步三份技能檔案，未將 docs、證據或原型安裝。
- 四個相互獨立的 forward fixture 均符合本輪觀察條件。代理讀取候選技能與各自 brief，實際寫出交付物；未提供標準答案。原始輸入／輸出保存在 forward-results/。

| 情境 | 可觀察結果 |
| --- | --- |
| autonomous | 建立兩個不同產業 HTML、共同入口、SESSION 與逐案證據；沒有選稿等待，沒有第三案；無瀏覽器檢查明列部分驗證。 |
| collaborative | 只寫第一輪訪談，保留使用者明示的訪談與選方向步驟，沒有建立原型。 |
| reports | 依既有 run-01 僅記陶器互動結果；學校未檢查。省略範本的 ROUND 3、8 分與全部通過，不執行新檢查或修改產品。 |
| capability | 完成文字課程 HTML；明記唯一候選配額與本題不符，使用本技能方法；沒有照片、影片、動畫或多稿等待，也未虛稱呼叫該候選。 |

主代理重跑 forward-results/check-prototypes.cjs：三個原型均通過 JavaScript 語法、Node vm 最小 DOM 模擬及靜態連結／控制項檢查。六組 token 對比計算由試跑代理執行，結果保存於 contrast-check.json；不代表整頁可及性。

## 限制與啟用

這是四個有界情境的行為驗證，不保證所有模型或後續案例遵循。沒有瀏覽器、截圖、實際鍵盤或響應式檢查；不能推論視覺品質、人類驗收或產品可發布。產品來源未變，未重跑其建置與測試。

更新在下次讀取技能檔案時生效；已快取的技能文字須重讀，不宣稱本次 metadata 自動重載。

備份：/Users/carl/.codex/backups/design-experience-autonomous-20261024-nxqb0vq5。回復時逐檔比較並只反向套用本輪差異，保留其他既有／後續變更。沒有 staging、commit、push、發布或部署。
