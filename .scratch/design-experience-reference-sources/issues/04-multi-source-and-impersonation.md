# 04: 多來源編號與冒用邊界

**What to build:** 使用者一次帶多個參考來源時，每個以 R1、R2… 穩定編號，與 A/B/C、1/2/3、P1… 並存；不同來源在同一屬性衝突時列成一題詢問，不平均；目標稿與參考網站可混用。他人實際產品被當目標稿（「做成跟 Stripe 首頁一模一樣」）時改以參考網站處理並說明原因；帶他牌 logo 或名稱的生成圖先移除品牌元素再審查；使用者自己的設計照常處理。

規格：[spec.md](../spec.md)。

**Blocked by:** 01, 02

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/design-experience-reference-sources)

- [x] 參考來源 reference 補上多來源編號、衝突詢問、混用、冒用邊界
- [x] SESSION 與回饋表能以 R 編號引用來源（「R2 的導覽」）
- [x] 驗收文件新增情境 5（Stripe）、6（多來源衝突）
- [x] 獨立代理跑情境 5、6，結果追加到驗證紀錄

## Comments

2026-10-23：已整合並驗證。實作 commit `76267ac`，經 [PR #28](https://github.com/CarlLee1983/carl-skills/pull/28) 合併進 main（合併 commit `68ee271`）。驗證證據見 `.scratch/design-experience/validation/reference-sources.md` 的工單 04 段落；未以最終文字重跑的情境列在該檔「彙整與限制」。
