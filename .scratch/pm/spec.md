# pm：完整生命週期的專案經理 skill

Status: ready-for-agent

決策依據：[ADR 0001](../../docs/adr/0001-pm-single-entry-and-project-entry-points.md)；用語依 [GLOSSARY](../../GLOSSARY.md)。

## Problem Statement

plan-pm 只涵蓋開工之後的一段：看進度、找就緒前緣、核對結案、交接實作。開工前確認範圍與計畫、執行中處理風險與變更、對外整理報告、整個計畫的結案與回顧，都沒有對應的能力，使用者得自己記得要做、用什麼做。plan-pm 還把交接對象寫死為 `implement`／`implement-spec`，在採用其他工作流程的專案中無法使用。

## Solution

把 plan-pm 改名並擴充為單一的 `pm` skill。使用者用自然語言提出專案管理需求，pm 入口依意圖選擇八項 PM 能力之一（scope、plan、check、next-step、risk、change、report、close），意圖不明時預設 check。所有判斷都以紀錄來源為依據、預設唯讀；需要寫回時只寫既有 tracker，並受現有授權約束。pm 不綁定任何工作流程：交接、稽核後的補件、驗證工作都指向專案入口，依專案規則、上下文、已安裝的 skill 或 agent 能力依序查找，都沒有時詢問使用者。

推出分五層，每層各為一張工單，前一層通過驗收才疊下一層：

1. 結構重組（純搬移）
2. 入口解耦
3. close 與 report
4. risk 與 change
5. scope 與 plan

## User Stories

### 入口與分派

1. As a 使用者, I want 用一個 pm 入口處理所有專案管理需求, so that 我不必記得八個不同的指令。
2. As a 使用者, I want 意圖不明時 pm 預設查看進度, so that 最常見的用法不需要多說明。
3. As a 使用者, I want 一句話涵蓋多項需求時（例如「看進度並整理報告」）pm 依生命週期順序串接, so that 我不必拆成多次請求。
4. As a 使用者, I want 所有能力預設唯讀, so that 查詢不會意外改動 tracker 或程式碼。
5. As a 使用者, I want 舊名稱 plan-pm 直接移除、不留別名, so that 不會有兩個入口互相搶觸發。
6. As a 使用者, I want pm 的 description 明確排除「從零規劃新工作」與「寫 spec」, so that 規劃需求仍走專案入口。
7. As a 維護者, I want 主入口只放共用原則與分派表、各能力細節按需載入, so that 常駐 context 維持精簡。
8. As a 使用者, I want 我的個人路由索引隨改名同步更新, so that 單次交接特例仍然生效。

### 紀錄來源與證據

9. As a 使用者, I want 每個結論標明查詢來源與時點, so that 我能判斷資訊是否過期。
10. As a 使用者, I want 資料不完整時 pm 只報告已知覆蓋範圍, so that 我不會被推論出的完成度誤導。
11. As a 使用者, I want 風險、變更、行動項目與回顧都寫回既有 tracker, so that 不會出現第二份帳本與 tracker 不一致。
12. As a 使用者, I want tracker 不支援某類紀錄時 pm 回報缺口並交給我決定放哪裡, so that pm 不自行發明存放格式。
13. As a 使用者, I want pm 區分驗證過、推論與假設的陳述, so that 我知道哪些需要再確認。

### 專案入口

14. As a 使用者, I want pm 先從 AGENTS.md、CLAUDE.md 及其連結文件找專案宣告的入口, so that 交接遵循該專案的工作流程。
15. As a 使用者, I want 專案規則沒有宣告時，pm 從上下文、已安裝的 skill 或 agent 能力提出建議, so that 沒有寫規則的專案也能運作。
16. As a 使用者, I want 都找不到時 pm 詢問要用什麼方式、不自行挑選, so that 不會被帶進我沒選的流程。
17. As a 使用者, I want 專案規則與已安裝 skill 衝突時以專案規則為準, so that 專案約定不被宿主預設覆蓋。
18. As a 使用者, I want pm 依入口宣告的範圍決定交出一張工單還是一整批，入口未宣告時一律交出單一工作單位, so that 交接粒度符合入口的能力。
19. As a 使用者, I want 整批交給入口後 pm 不再重複派發其內部節點, so that 不會有兩個排程者。
20. As a 使用者, I want 所選入口不存在時 pm 回報限制、不宣稱已開始, so that 我知道實際狀態。

### check

21. As a 使用者, I want pm 依明確依賴建出 DAG 並分出完成、進行中、就緒、等待與資訊不足, so that 我一眼看出整體狀態。
22. As a 使用者, I want pm 指出缺失節點、環與矛盾狀態的具體鏈路, so that 我能修正計畫本身。
23. As a 使用者, I want pm 主動核對仍開啟的工單與已合併 PR 的對應, so that 該結案的工單不會被遺漏。
24. As a 使用者, I want 單張工單的結案判斷分成「符合關閉條件」「尚有工作」「證據不足」, so that 我知道下一步該補什麼。
25. As a 使用者, I want 進度比例標明分母與取消項目的處理方式, so that 工單數不會被誤讀成功能完成度。

### next-step

26. As a 使用者, I want pm 先說明進行中工作該繼續、修正或等待，再列就緒前緣, so that 不會同時開太多工作。
27. As a 使用者, I want 推薦依明確優先序、期限、解鎖量與計畫順序並附理由, so that 我能判斷推薦是否合理。
28. As a 使用者, I want pm 提出一份具體的單次交接提案，我回「執行這張」或「同意」就接續, so that 不必重貼 prompt。
29. As a 使用者, I want 多份提案未選定時 pm 只問選哪一份, so that pm 不替我挑。
30. As a 使用者, I want 接受提案後 pm 重新核對前置、承接者與分支狀態, so that 已完成或已在進行的工作不會重做。
31. As a 使用者, I want 認同分析或同意改規則不被當成執行授權, so that 授權邊界清楚。
32. As a 使用者, I want 沒有可做的工作時 pm 說明原因，計畫完成時明說無工作可接續, so that pm 不為了「下一步」替我追加目標。

### Goal 推進

33. As a 使用者, I want Goal 推進維持獨立的執行模式、跨 check、next-step、close 運作, so that 授權與持續推進不和職責混在一起。
34. As a 使用者, I want 有 active Goal 但只要求查看時 pm 維持查詢模式, so that Goal 生命週期不被意外觸動。
35. As a 使用者, I want Goal 推進中某節點受阻時，pm 繼續推進其他已授權的獨立工作, so that 一張受阻工單不卡住整個 Goal。

### close

36. As a 使用者, I want close 只在整個計畫範圍的工單都結案後進行, so that 不會提早宣告完成。
37. As a 使用者, I want close 核對整體驗收與我約定的交付終點, so that 「PR 已就緒」不會被當成「已交付」。
38. As a 使用者, I want close 產出一份移交清單, so that 接手者知道交付了什麼、還有什麼待處理。
39. As a 使用者, I want close 的經驗回顧寫回該計畫的 tracker 位置, so that 回顧跟計畫放在一起。
40. As a 使用者, I want 回顧發現需要改規則時 pm 提議修改而不自己動手, so that 規則變更仍由我決定。
41. As a 使用者, I want close 不處理分支與 worktree 清理, so that 它在任何環境都能獨立運作。

### report

42. As a 使用者, I want report 預設在對話中交付進度、待決事項與行動項目, so that 不會產生多餘檔案。
43. As a 使用者, I want 只有我要求時 report 才寫成檔案、寫到 tracker 或我指定的位置, so that 檔案產出是我主動要的。
44. As a 使用者, I want pm 絕不自行寄信、發訊息或發布頁面, so that 對外溝通由我把關。
45. As a 使用者, I want 行動項目寫回 tracker 並在後續 report 追蹤其狀態, so that 行動有人跟進。
46. As a 使用者, I want 待決事項標明需要誰決定、影響哪些工作, so that 我知道該找誰。

### risk

47. As a 使用者, I want risk 從紀錄來源辨識風險與未驗證的假設, so that 我提早看見可能出問題的地方。
48. As a 使用者, I want 每項風險附上影響範圍與依據, so that 我能排優先順序。
49. As a 使用者, I want risk 提出驗證方式並指向專案入口（例如一張研究或原型工單）, so that 驗證工作走正常流程。
50. As a 使用者, I want pm 自己只做唯讀查證、不跑實驗或寫原型, so that 驗證不在 pm 裡偷偷發生。
51. As a 使用者, I want 預防與應變措施在授權內寫回 tracker, so that 風險清單不只存在對話裡。

### change

52. As a 使用者, I want change 評估一項變更對 DAG 的影響（哪些工作被阻、被取代、需重做）, so that 我在決定前看見代價。
53. As a 使用者, I want change 列出至少兩個取捨選項, so that 我在真正的選項之間做決定。
54. As a 使用者, I want 我決定後 pm 在授權內調整工單中繼資料（依賴、狀態、附理由的取消、新增占位工單）, so that 計畫跟上決策。
55. As a 使用者, I want 需要改 spec 內容時 pm 交回專案入口, so that 規格仍由規劃流程維護。
56. As a 使用者, I want 符合 ADR 門檻的取捨由 pm 提議記錄、不自行撰寫, so that 決策紀錄由我把關。
57. As a 使用者, I want 取消前置工作而沒有替代或豁免時，下游不被釋放, so that 變更不會悄悄移除依賴。

### scope

58. As a 使用者, I want scope 稽核目標、範圍、成功條件與角色責任是否都有寫明, so that 開工前就發現缺口。
59. As a 使用者, I want scope 指出彼此矛盾的範圍描述, so that 不會帶著衝突開工。
60. As a 使用者, I want scope 把補件指回專案入口、不自己訪談或寫 spec, so that 規劃仍由我啟動。

### plan

61. As a 使用者, I want plan 稽核里程碑、依賴與資源限制是否有記錄、有沒有衝突, so that 計畫在執行前就可信。
62. As a 使用者, I want 來源沒有工期、資源或成本資料時 plan 不估完成日或成本, so that 不會產生假精確的數字。
63. As a 使用者, I want 來源有這些資料時 plan 計算關鍵路徑與偏差並標明依據, so that 有資料時我拿得到分析。
64. As a 使用者, I want plan 區分 DAG 上的獨立分支與實際能平行的工作（人力、共用程式碼、整合）, so that 不會高估平行度。

### 可攜性與維護

65. As a 維護者, I want 只安裝 skill 目錄就能運作，沒有對本 repo 或個人路徑的必要引用, so that 其他專案可以單獨安裝。
66. As a 維護者, I want 每層補上該層能力的行為情境並實際模擬, so that 每次疊加都有行為證據。
67. As a 維護者, I want 純搬移層沿用既有行為證據、只補封裝檢查, so that 不重做沒變的驗證。

## Implementation Decisions

- **封裝**：單一 `pm` skill，取代 plan-pm；舊目錄、舊維護文件位置與 README 條目一併改名，不留別名（ADR 0001）。
- **主入口內容**：共用原則（紀錄來源、證據與標示、唯讀預設、授權、專案入口查找）與一張意圖到能力的分派表；分派表說明預設能力為 check、多能力依生命週期順序串接（scope → plan → check → next-step → risk → change → report → close）。
- **能力 reference**：每項 PM 能力一份 reference，只在分派到時載入；Goal 推進維持獨立的 reference，跨 check、next-step、close 使用。
- **第 1 層（結構重組）**：現有內容逐段搬到主入口、check、next-step 與 Goal reference，行為不變；同時更新個人路由索引中 plan-pm 的單次交接特例（repo 外，動手前取得同意）。
- **第 2 層（入口解耦）**：移除單次交接、Goal 推進、description 中所有寫死的 `implement`／`implement-spec` 與特定宿主指令語法，改為專案入口查找順序：專案規則 → 上下文 → 已安裝 skill 或 agent 能力（提出建議）→ 詢問使用者。交接粒度依入口宣告，未宣告時交單一工作單位；整批交接後入口擁有內部排程。單次交接的繁中回覆詞（「執行這張」「執行這份 spec」「同意」「開始」）保留，改為回應 pm 剛提出的具體提案。
- **第 3 層（close、report）**：close 由 check 的單張結案延伸為整個計畫範圍的驗收、移交清單與回顧；report 預設對話內交付，寫檔與寫回 tracker 需使用者要求或授權，對外發布一律不做。
- **第 4 層（risk、change）**：risk 列風險、假設與驗證方式，驗證交給專案入口；change 做 DAG 影響分析與取捨，決定後只改工單中繼資料，spec 變更交回專案入口，ADR 只提議。
- **第 5 層（scope、plan）**：兩者都是稽核；plan 只對來源中有的工期、資源、成本資料做計算。
- **description**：涵蓋八項職責的中英文觸發詞，明文排除從零規劃新工作與撰寫 spec。
- **寫入權限**：所有能力的寫回只能寫到紀錄來源，且受使用者與專案的現有授權約束；入口內建的寫入步驟不擴大授權；Goal 的持續性不擴大授權。

## Testing Decisions

- **好的測試**只觀察外部行為：pm 選了哪項能力、讀取與寫入了什麼、交接給哪個入口、拒絕了什麼、如何標示證據與未知。不檢查 reference 的措辭或段落結構。
- **行為接縫**（唯一的行為接縫）：維護驗收文件的情境表。每層補上該層能力的情境；以新對話或獨立評估代理執行，只提供單獨複製的 skill 目錄與情境資料，記錄實際輸出、工具證據與限制；唯讀模擬，不執行真實工單或發布。
- **入口解耦的情境資料**：三種假專案——專案規則宣告了入口、只有已安裝的 skill、兩者皆無——驗證查找順序、規則優先與「詢問而不挑選」。
- **封裝接縫**：單獨複製 skill 目錄、`quick_validate.py`、相對連結留在目錄內、無個人絕對路徑、`git diff --check`；只證明封裝，不代表行為正確。
- **沿用證據**：第 1 層內容不變，沿用 plan-pm 匯入時的行為證據，只重做封裝檢查。
- **前例**：plan-pm 匯入驗證紀錄與現有維護驗收情境表。

## Out of Scope

- write-guard hook 改為依專案文件宣告判斷允許的根目錄檔名（另立小任務）。
- 把既有專案的 `CONTEXT.md` 遷移為 `GLOSSARY.md`。
- pm 自行訪談、產出 spec 或工單、跑實驗或寫原型。
- 分支、worktree 清理與 PR 合併後收尾。
- 對外發布報告（郵件、即時通訊、artifact）。
- 新增 pm 專屬的進度檔、狀態機或匯入格式。
- 在 Claude Code 以外的宿主做完整整合測試（每層模擬時記錄實際涵蓋的宿主）。

## Further Notes

- plan-pm 只有極少量的實際使用紀錄，改名沒有既有使用者需要遷移；這也是不留別名的理由之一。
- 每層各為一張工單，前一層通過驗收才開始下一層；工單切分由專案入口處理。
