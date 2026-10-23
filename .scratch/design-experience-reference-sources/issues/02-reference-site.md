# 02: 參考網站

**What to build:** 使用者丟一個喜歡的網址時，技能截圖並拆成 5–8 個屬性（附截圖區域），請使用者逐項標「要／不要／無所謂」，再做 2–3 個採用程度不同的視覺處理，套在自家代表畫面上與參考網站並排截圖比較，之後回饋沿用既有回饋表。量測值只當重組自家 token 的起點，不沿用對方品牌、圖像、文案與品牌色組合，商用字體只記名稱與替代。主題起手時「要」的屬性推導氣質形容詞並取代參考題。瀏覽器不可用時改用文字擷取並請使用者補截圖，SESSION 標「未以畫面審看」。

規格：[spec.md](../spec.md)。用語見 `GLOSSARY.md`「參考網站」。

**Blocked by:** 01

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/design-experience-reference-sources)

- [x] 參考來源 reference 補上屬性拆解、三值標記、抽取邊界、採用程度不同的處理比較、工具退路
- [x] 主題起手訪談：屬性標記取代「參考與反參考」題，「要」屬性作為氣質回合輸入；訪談 reference 與主檔說法一致、不重複
- [x] SESSION「參考來源」欄位納入屬性標記
- [x] 夾具：本機起的 HTML 參考頁，有可辨識字級比例、間距節奏與配色結構
- [x] 驗收文件新增情境 4（參考網站）、8（瀏覽器不可用）
- [x] 獨立代理跑情境 4、8，並回歸主題起手訪談情境，結果追加到驗證紀錄

## Comments

2026-10-23：已整合並驗證。實作 commit `9a695b1`，經 [PR #28](https://github.com/CarlLee1983/carl-skills/pull/28) 合併進 main（合併 commit `68ee271`）。驗證證據見 `.scratch/design-experience/validation/reference-sources.md` 的工單 02 段落；未以最終文字重跑的情境列在該檔「彙整與限制」。
