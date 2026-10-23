# 01: 主題起手加目標稿（tracer bullet）

**What to build:** 沒有既有介面的使用者貼上一張生成的 UI 圖時，技能被觸發，判定意圖為目標稿（意圖不明時以可修正理解提出），做三類可行性審查與四種取捨，只問圖回答不了的訪談題，把取捨後的目標稿當成方向 A 與處理 1，做成可試用的原型與原圖並排。這張 ticket 打通整條路：新的參考來源 reference 骨架、主檔短節與主題起手分支、description 觸發、SESSION「參考來源」欄位、夾具、驗收條目與獨立代理驗證。

規格：[spec.md](../spec.md)。用語見 `GLOSSARY.md`「參考來源」「目標稿」。

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent
State: open
Owner: claude-code (feat/design-experience-reference-sources)

- [x] 新增參考來源 reference，只在有參考來源時讀取；涵蓋意圖判斷（依意圖不依媒介）、三類可行性審查（缺少能力或資料、生成瑕疵、品味基線）、四種取捨（照做／改做法／刪除／待產品決定，附理由）、與原圖並排的原型比較
- [x] 主檔新增短節指向該 reference；主題起手分支：訪談只問圖回答不了的部分，氣質形容詞由圖推導後請使用者確認，訪談完成條件不變；目標稿成為 A 加 1，替代方案只對應審查發現
- [x] description 新增一個觸發分支：使用者帶來 UI 圖或喜歡的網站
- [x] SESSION 新增「參考來源」欄位（編號、類型、位置、可行性取捨、是否以畫面審看）；交接列出被刪除與待產品決定的項目；素材放既有 `references/` 子目錄
- [x] 圖片過小或被裁切時請使用者補完整尺寸，看不到的區塊標「看不到」
- [x] 夾具：本機 HTML 渲染的生成風 PNG，埋入亂碼文字、固定尺寸排版、缺少的空白或錯誤狀態、不存在的資料欄位、對比不足小字，附專案能力清單
- [x] 驗收文件新增情境 1（主題起手加目標稿）、7（意圖不明）、9（被裁切的目標稿）
- [x] 獨立 general-purpose 代理只讀技能目錄與夾具跑上述情境，結果寫進 `.scratch/design-experience/validation/reference-sources.md`，行為與提案品質兩層判定皆通過
- [x] `git diff --check` 與新檔空白檢查通過
