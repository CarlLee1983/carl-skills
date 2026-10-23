# dbcli 介面設計 SESSION

## 任務與目標

- 專案：dbcli（給 AI agent 與終端用的資料庫 CLI）。來源：專案概述 fixtures/project.md；尚未讀到程式碼、`.dbcli` 格式與完整 README。
- 原始請求：「幫 dbcli 設計一個介面」。使用者第 2 回合：原本想的是圖形介面；既然 README 不做，「先做個概念看看就好」。
- 進入模式：theme-first。依據：CLI 專案，無既有圖形介面、品牌或設計系統。
- 範圍邊界（有來源）：README Non-goals「No GUI」。本工作是**隔離的 GUI 概念探索**（使用者授權），不是產品方向；是否加入 GUI 屬產品範圍決定，未決，交由專案規劃入口。
- 主要使用者：終端機前的人（含新手）；agent 走結構化輸出，不是此概念的讀者。
- 核心任務：確認連線與權限脈絡後查詢／匯出；被拒時能理解並恢復。

## 訪談

- 產品類型：功能型工具（推論，依據：權限分級、黑名單、匯出、schema）。
- 已定（使用者答）：Q1 = GUI 概念（隔離）；Q3 = 連線可自行命名（如 prod、local），**沒有正式環境欄位**。
- 已定（使用者「其他照建議」，以建議答案為準）：Q2 人優先；Q4 脈絡常駐、寫入／admin 加強；Q5 語氣冷靜・精確・可信賴，避免熱情口語與表情符號；Q6 UI 文字英文；Q7 匯出不先 COUNT，顯示筆數／大小／速率／經過時間，不給百分比；Q8 淺色深色都要可讀、色彩一律搭配符號。
- 原 Q4／Q8 係為終端情境而問，套用到 GUI 為設計假設。
- 範圍問題（留給規劃入口）：是否加 GUI；GUI 與 CLI 的關係（包 CLI 或共用核心）；是否新增連線的環境欄位。

## 目前階段

**暫停（第 4 回合，使用者：「範圍的事我再想想，今天先到這裡」）。** 視覺語言已選定（處理 2）；下一階段為結構方向比較，尚未開始（等待 Q13）。恢復時先確認範圍決定的結果，再接 Q13／Q10／Q12。
使用者第 3 回合要求「直接加進專案」：已說明這是產品範圍決定（README No GUI），須由使用者以專案規劃入口決定；設計接受不授權範圍擴張或正式實作。

## 方向與決策

- 視覺處理（編號）：
  - 1 卡片目錄：Card catalog — 連線是貼標籤的抽屜，權限是橡皮章。橡木外框、紫色印泥 read-only、Courier New＋Gill Sans、中密度。
  - 2 混音台通道：Channel strip — 膠帶標籤連線名、寫入權限＝亮起的 ARM 燈、匯出速率電平表。深色、高密度、Avenir Next Condensed＋SF Mono。
  - 3 機場指標：Wayfinding band — 黃色指標帶標示所在連線與下一步、拒絕時紅色告示。白底、寬鬆、Seravek＋SF Mono。
- 設計師建議：2。
- **使用者選擇（第 3 回合）：視覺處理 2 混音台通道。** 理由：未陳述（原話「2 不錯」）。結構未選，未定稿。
- 結構方向（字母）：尚未提出；共用暫定版面不是結構提案。

### 視覺技能

- 使用 impeccable（Operate 模式）：執行 `impeccable context`、`concept-seed --scope direction --mode operate`（seed key cb419a98f423b18c5c146d6d31dfa57e），並套用 mode-operate 與 craft-floor 規則。
- 對應：自列 7 個受眾世界（依共鳴排序：混音台通道、工程圖標題欄、鐵路聯鎖盤、危險品標示、病患手環核對、實驗記錄本、圖書館卡片目錄），抽中第 7 → 處理 1；我的首選（混音台）→ 處理 2；挑戰者「機場黃色指標」判定 competitive（產品清晰度勝、受眾認同不及）→ 處理 3；「深色開發者主控台」competitive 但與 2 重疊未採；光譜線軌、中央欄排版、錄音帶 J-card、星圖判定 declined。
- 為讓 impeccable 能執行，建立 `PRODUCT.md`（內容取自本 SESSION，產品事實以本檔為準）。未使用 impeccable 的決策頁、DESIGN.md、finish reviewer：選擇與比較由本流程負責。impeccable detector 依其說明延到選定後再跑。
- 已檢查但未用：design-taste-frontend（排除 app 畫面）、hallmark／minimalist-ui／industrial-brutalist-ui（風格固定或偏行銷頁）。

## 設計與入口

- 比較頁：[prototypes/style-tiles.html](prototypes/style-tiles.html)（v1，離線單檔，瀏覽器直接開；上方切換 1/2/3）。
- 樣本行為：Switch connection 在 prod（read-only）與 local（read-write）間切換；Run 在 prod 只會強調拒絕訊息；匯出數字每秒模擬增加，可取消。全部樣本資料，不連線。
- 真實整合點（未定）：連線清單與權限等級來源、拒絕錯誤的結構化代碼、匯出進度事件、黑名單欄位資訊。
- 圖示：Lucide v1.8.0（ISC），授權聲明在 HTML 註解。
- 截圖腳本：[shoot.cjs](shoot.cjs)（需 Playwright；以 `NODE_PATH=<含 playwright 的 node_modules> node shoot.cjs` 在 work/ 執行）。

## 驗證

- v1，Playwright 1.64.1 Chromium 截圖：1440×900、1024×768（三個處理，皆無橫向捲動）；1440 下 local（read-write）狀態；鍵盤焦點（Switch connection 焦點框三者皆可見）。截圖：screenshots/v1-t{1,2,3}-{1440,1024,local}.png、v1-focus-all.png。
- 設計底線（taste baseline）：
  - 字級：通過，每個處理五級，兩種字型角色。設計師註記欄與切換列屬比較用外框，不算處理本身。
  - 間距：通過，4／8 倍數。
  - 色彩對比：已修正（處理 2 膠帶標籤上的灰字）；權限色都搭配圖示＋文字。處理 1 卡片紅線只用在表頭，避免與錯誤色混淆。
  - 強調：已修正，被拒時恢復動作領頭，Run 降為次要。
  - 表面：通過。
  - 圖示：通過，Lucide。
  - 溢出：已修正長資料表名稱截斷；表格在自身容器內捲動。
- 未檢查：各處理的另一種明暗配色、窄螢幕、對比數值未逐一量測（僅目視＋色值估算）、真人試用。

## 未決與交接

- Q9 已答：處理 2。Q11 未答，改以 Q13 提問：是否開始用處理 2 做結構方向 A/B/C 比較（建議要）。
- Q10 未答：處理 2 補淺色版（建議要，結構選定後做）。
- Q12 未答：喜歡什麼（目前僅「2 不錯」）、卡在哪，分開記錄。
- 使用者想把 GUI 加進專案：待使用者啟動專案規劃入口；需帶入的範圍問題見「訪談」節，另含 README Non-goals 修改、桌面 App 或本機網頁、維護責任。
- 產品範圍：是否加 GUI、環境欄位，交規劃入口。
- 正式實作：未授權（使用者表達意願，但範圍決定未做）。
