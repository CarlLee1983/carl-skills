# 事實查核：tiktok-massive-frontend-monorepo-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/tiktok-massive-frontend-monorepo-architecture.mdx`
- 歸屬公司：TikTok／ByteDance
- 查核日期：2026-10-22（台北時間）
- 範圍：正文、表格、兩張內嵌 SVG 的 `<text>`、frontmatter 的 title／description、文末參考連結。只查核，不改文章。

## 總評：未通過

文章的主架構「四道治理防線」大多查無出處，或與 TikTok 官方公開的做法不符。第一道（AST／ESLint 邊界、`apps/packages/domains` 目錄）與第二道（AST DAG 受影響分析、剪枝 80%）找不到任何一手來源；第三道的機制與數字和 TikTok 官方部落格描述的 Rush Cobuilds 相反：官方是「同一個 job 開多個實例、用 Redis 類服務搶鎖」，沒有中央協調器；壓測只用 3 台機器，時間從 88 分鐘降到 36 分鐘，不是 20~50 台、60 → 5 分鐘。第四道說 TikTok 採用 Garfish，同樣查無出處，只有 Garfish 本身的沙盒機制有官方文件支撐。

更根本的問題是錯置。TikTok 官方實際公開的前端 MonoRepo 工具鏈是 RushJS + PNPM workspaces，外加 Sparo（Git 加速）、Cobuilds（分散式建置）與 Subspaces（多 lockfile），文章一個都沒提，反而把同屬 ByteDance 卻沒有證據與這個 MonoRepo 相關的 Garfish、Rspack 寫成主角。文章唯一站得住的具體數字「20 萬檔案」來自 TikTok 官方，但同一來源的專案數（500+／1,000+）也與文章的「200 個子專案」矛盾。

統計：SUPPORTED 9 項、CONTRADICTED 5 項、NOT FOUND 14 項（共 28 項）。

## 主要一手來源

| 代號 | 來源 | 性質 |
| --- | --- | --- |
| S1 | [Sparo: Faster git for frontend monorepos](https://developers.tiktok.com/blog/2024-sparo-faster-git-for-frontend-monorepos)（TikTok for Developers，Adrian Zhang） | TikTok 官方工程部落格 |
| S2 | [Cobuilds: A shortcut for distributed builds with Rush.js](https://developers.tiktok.com/blog/cobuilds-distributed-builds-with-rush)（TikTok for Developers，Cheng Liu） | TikTok 官方工程部落格 |
| S3 | [Subspaces: Divide and conquer your NPM upkeep](https://developers.tiktok.com/blog/subspaces-divide-and-conquer-your-npm-upkeep)（TikTok for Developers，William Huang） | TikTok 官方工程部落格（僅讀到搜尋摘要，未取得全文） |
| S4 | [web-infra-dev/garfish](https://github.com/web-infra-dev/garfish) README 與 `website-new/docs/guide/concept/sandbox.md` | ByteDance 官方開源 repo |
| S5 | [web-infra-dev 組織頁](https://github.com/web-infra-dev) | ByteDance 官方 |
| S6 | [Announcing Rspack 0.1](https://rspack.rs/blog/announcing-0-1)（2023-03-06） | ByteDance Web Infra 官方部落格 |
| L1 | [ByteByteGo: How TikTok Manages a 200K File Frontend MonoRepo](https://bytebytego.com/guides/how-tiktok-manages-a-200k-file-frontend-monorepo/) | 二手整理，只當線索 |

## 逐項主張

### 規模與背景

| # | 主張（文章位置） | 判定 | 依據 |
| --- | --- | --- | --- |
| 1 | 前端 MonoRepo 規模達 20 萬個檔案（title、description、多處） | SUPPORTED | S1："TikTok's TypeScript monorepo surpassed 1,000 projects and 200,000 source files this spring"；S2："more than 200,000 source files" |
| 2 | 前端團隊規模「數千名工程師」（開頭） | NOT FOUND | S1、S2 皆未提工程師人數 |
| 3 | 上百個業務子應用，含 TikTok 短影音、TikTok Shop、創作者中心、廣告後台、私訊（開頭） | NOT FOUND | S2 只說 "shared across ten business lines"；S3 摘要提到一年內把 "hundreds of isolated frontend projects" 併入 MonoRepo。具體是哪些產品線，官方未列 |
| 4 | 「重新編譯所有 200 個子專案」（挑戰第 2 點） | CONTRADICTED | S2："more than 500 TypeScript projects"；S1："surpassed 1,000 projects"。官方數字是 500 以上到 1,000 以上，不是 200 |
| 5 | CI 建置動輒超過 1 小時（開頭、挑戰第 2 點） | SUPPORTED（附條件） | S2 的壓測：Cobuild 關閉時 1 小時 28 分。但這是 "shadow monorepo"（700+ 專案）的模擬，不是正式環境 CI 佇列時間 |
| 6 | `pnpm install` 與 `tsc --noEmit` 消耗數十 GB 記憶體（挑戰第 3 點） | NOT FOUND | 官方來源未提記憶體用量 |
| 7 | Git 在此規模極為緩慢（開頭） | SUPPORTED | S1："People with slow internet frequently reported `git clone` taking more than 40 minutes." 官方解法是 Sparo，文章完全沒提 |

### 工具鏈歸屬

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 8 | ByteDance 以 Garfish、Rspack 與「現代 MonoRepo 治理工具鏈」治理這個 MonoRepo（開頭、description） | NOT FOUND | 沒有任何一手來源把 Garfish 或 Rspack 與 TikTok 前端 MonoRepo 連在一起。S1："our frontend uses PNPM workspaces with RushJS"。官方公開的工具是 Rush、PNPM、Sparo、Cobuilds、Subspaces |
| 9 | 表格「ByteDance Eden」是現代治理 MonoRepo 工具 | NOT FOUND | 中英文搜尋皆查無 ByteDance「Eden」MonoRepo 工具的公開資料；搜尋到的 Eden 是 Meta 的版本控制系統（EdenFS），與 ByteDance 無關 |
| 10 | Garfish 是 ByteDance 自研開源（第四道防線） | SUPPORTED | S5 組織說明："We are a ByteDance team focused on building an open ecosystem that advances web development." |
| 11 | Rspack 是 ByteDance 以 Rust 撰寫的打包器 | SUPPORTED | S6："ByteDance Web Infra team"；S4/rspack repo 描述："Fast Rust-based bundler for the web with a modernized webpack API" |
| 12 | Rust 工具鏈帶來 5~10 倍效能躍升（啟示第 3 點） | SUPPORTED（限 Rspack） | S6：Rspack "can bring 5~10 times improvement to applications' build scripts"。文章把這個數字推廣到 SWC、Turbopack，這部分沒有查 |

### 第一道防線：領域套件邊界

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 13 | 目錄為 `apps/`（tiktok-web、tiktok-shop、creator-studio）、`packages/`、`domains/`（video-player、checkout-flow） | NOT FOUND | 官方來源沒有公開目錄結構或這些套件名稱 |
| 14 | 以 `package.json` `exports` 收斂公開介面，並用自訂 ESLint／AST 規則攔截層級與跨領域依賴，跨領域走 Event Bus | NOT FOUND | S1、S2、S3 皆未提 ESLint 邊界規則或 Event Bus |

### 第二道防線：受影響範圍分析

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 15 | 以靜態 AST 解析 `import`／`export` 建構全庫依賴 DAG，再由 Git Diff 傳播找出受影響子圖（含 SVG「依賴關係拓撲圖分析引擎 (AST DAG)」） | NOT FOUND | 官方未描述 AST 層級的分析。S2 唯一相關的是專案層級的選取範例："using `rush list --to git:origin/main` for example"，Rush 的專案圖來自 `package.json` 依賴，不是 AST |
| 16 | CI 只跑受影響套件，剪枝 80% 以上無關任務（含 SVG「0% 浪費」） | NOT FOUND | 官方無此數字 |

### 第三道防線：雲端快取與分散式排程

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 17 | 以內容雜湊為 key 的雲端建置快取；任一 CI 機器**或同事電腦**執行過即可重用，快取存於 S3／Redis | CONTRADICTED | 雲端快取本身成立，S2："Rush already uses cloud storage to cache previously built projects"。但寫入權限與文章相反，S2：快取 "only written during controlled builds of the "main" branch in a continuous integration (CI) environment"，工程師電腦只能讀。Redis 在 S2 中用於 cobuild 協調鎖，不是存放建置產物 |
| 18 | 3 分鐘的 Webpack/Rspack 編譯在 200 毫秒內命中結束 | NOT FOUND | 官方無此數字。S2 唯一的全快取命中數字是整體建置 "3 mins"（模擬環境） |
| 19 | 由「中央協調器」把任務動態派發到各 CI 節點（DTE） | CONTRADICTED | S2 的 Cobuilds 設計沒有中央派發者，而是 "launching two instances of the same job on two different VM's"，各機器透過 Redis 類 key/value 服務的鎖得知哪些專案已在建置，自行跳過 |
| 20 | 20~50 台平行 CI Agent 節點 | NOT FOUND | S2 壓測為主 runner 加 "2 extra pipelines"（共 3 台），未公開正式環境機器數 |
| 21 | 結合 Rspack，端到端 CI 由 60 分鐘壓到 5 分鐘以內 | CONTRADICTED | 官方唯一公開的 CI 前後數字是 S2 的模擬壓測：關閉 1 小時 28 分 → Cobuild 1 小時 18 分 → 加 log-only 模式 36 分；只有「全部命中快取」才是 3 分。文中未提 Rspack |

### 第四道防線：Garfish 微前端

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 22 | TikTok 採用 Garfish 作為微前端架構（「TikTok 採用了自研開源的 Garfish」） | NOT FOUND | Garfish README 只說 "has been polished and tested by a large number of online applications"，未指名 TikTok 或任何產品；搜尋亦無一手來源 |
| 23 | Garfish 以 `Proxy` 代理 `window`，卸載時自動清理掛載屬性與事件監聽 | SUPPORTED | S4 sandbox.md：「採用優先使用 `Proxy` 而不支持 `Proxy` 將降級到快照沙箱」；副作用清理列出「計時器：`setInterval`、`setTimeout`」「全局事件監聽：`addEventListener`」，「在沙箱銷毀的時候統一進行清除」 |
| 24 | CSS 以命名空間或 Shadow DOM 隔離 | SUPPORTED | S4 sandbox.md 討論 CSS Scope：「通過 `scope` 來隔離子應用的所有樣式」，並另有 Shadow DOM 隔離段落 |
| 25 | 支援多技術棧共存 | SUPPORTED | S4 README："supports any kind of framework and technology system access" |
| 26 | 子應用分工：短影音 React 18、電商直播 Vue 3、創作者中心動態遠端腳本（SVG 內文字） | NOT FOUND | 無任何來源說明 TikTok 各子應用的框架 |
| 27 | 各子應用獨立打包發布到 CDN，獨立灰度上線 | NOT FOUND | 官方未描述 TikTok 前端的部署方式 |

### 參考資料標題

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 28 | ByteByteGo 有一篇〈System Design 101: Managing Monorepo at Massive Scale〉 | CONTRADICTED | system-design-101 repo 沒有這個標題；相關條目實為〈How TikTok Manages a 200K File Frontend MonoRepo〉與〈Monorepo vs. Microrepo: Which is Best?〉。前者（L1）內容只談 Sparo 與 Git 加速，沒有 Garfish、Rspack、Eden、ESLint 邊界、Affected Graph、DTE、20~50 台或 60 → 5 分鐘 |

## 參考連結檢查

| 連結 | HTTP | 首頁或具體文章 | 支撐正文哪些主張 |
| --- | --- | --- | --- |
| `https://github.com/web-infra-dev/garfish` | 200 | repo 首頁 | 支撐 #10、#23~#25（Garfish 為 ByteDance 開源、沙盒、多框架）；不支撐 #22「TikTok 採用」 |
| `https://github.com/web-infra-dev/rspack` | 200 | repo 首頁 | 支撐 #11（Rust 打包器）；README 未提 TikTok、MonoRepo，也沒有 5~10 倍數字（數字在 S6 部落格） |
| `https://github.com/web-infra-dev`（正文內連） | 200 | 組織首頁 | 只支撐「Web Infra 是 ByteDance 團隊」 |
| `https://github.com/ByteByteGoHq/system-design-101`（文末與 frontmatter `repositoryUrl`） | 200 | repo 首頁，不是具體文章 | 連結標示的標題不存在（#28）。實際相關條目只支撐 #1、#7 的 20 萬檔案與 Git 緩慢；且為二手整理，不能當證據 |

文末三個連結都能開啟，但全部是 repo 或組織首頁，沒有一個指向具體文章，也沒有任何一個 TikTok 官方來源。正文最核心的第二、三道防線完全沒有引用。

## 修正建議（供作者參考，未動文章）

1. 若要保留 TikTok 案例，應以 S1、S2、S3 為主軸改寫：Rush + PNPM workspaces、Sparo（sparse checkout + partial clone，clone 23 分 → 2 分）、Cobuilds（多實例 + Redis 鎖，88 分 → 36 分）、Subspaces（多 lockfile），並逐段附上官方連結。
2. 刪除或改寫為「通用做法」的段落：ESLint／AST 邊界、AST DAG、剪枝 80%、200 毫秒、20~50 台、60 → 5 分鐘、ByteDance Eden、React 18／Vue 3 子應用分工。
3. Garfish 段落可保留為「ByteDance 開源的微前端框架如何做沙盒」，但不能寫成「TikTok 採用」。
4. 修正專案數為官方數字（500+ 或 1,000+），並把 ByteByteGo 參考改成實際條目連結，或改引 TikTok 官方部落格。
