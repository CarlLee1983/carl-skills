# 事實查核：serverless-cloud-native-database-neon-planetscale.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/serverless-cloud-native-database-neon-planetscale.mdx`（publishDate 2026-09-02）
- 查核日期：2026-10-22
- 範圍：正文、表格、兩張 SVG 的 `<text>`／`<desc>`、frontmatter 的 title／description／repositoryUrl
- 證據等級：只採 Neon、PlanetScale、Vitess 官方文件／官方部落格／官方 GitHub；二手報導只當線索並註明

## 總評：局部修正

主架構有出處：Neon 的計算儲存分離（無狀態 compute、Safekeeper 以 Paxos 持久化 WAL、Pageserver 重放 WAL 回頁、物件儲存、copy-on-write 分支、scale-to-zero）與 PlanetScale／Vitess 的 VTGate → VTTablet（sidecar）→ MySQL 分片結構，都能在官方文件找到對應。問題集中在具體細節：33 項主張中 9 項與一手來源矛盾、3 項找不到出處。最需要改的是三處：PlanetScale 的線上 schema 變更被寫成「gh-ost 原理＋CDC 雙寫」（實際是 Vitess VReplication，Vitess v22 起已不支援 gh-ost）；Neon 連線池被寫成「PgBouncer in Rust」（官方寫的是 PgBouncer，Rust 寫的是 proxy，兩者不是同一個元件）；連線池收斂被歸給 VTGate（PlanetScale 官方說連線池在 VTTablet 層）。另外文章發表於 2026-09，卻把 PlanetScale 整家公司定位為 MySQL，忽略了 2025-09-22 GA 的 PlanetScale for Postgres，比較矩陣需要補註。

統計：SUPPORTED 21／CONTRADICTED 9／NOT FOUND 3。

## Neon 相關主張

| # | 主張（出處位置） | 判定 | 一手證據 |
| - | - | - | - |
| N1 | 「原生 100% 相容 PostgreSQL」（表格） | CONTRADICTED | 官方相容性頁只說 "Neon is Postgres. However, as a managed Postgres service, there are some differences you should be aware of."，並列出不支援 tablespaces（"Neon does not support PostgreSQL tablespaces."）、無 superuser、不支援 `track_commit_timestamp` 等差異，沒有「100%」說法。https://neon.com/docs/reference/compatibility |
| N2 | 計算與儲存徹底分離（表格、第 2 節標題） | SUPPORTED | "Compute nodes do not own durable state and can be replaced freely." https://neon.com/docs/introduction/architecture-overview |
| N3 | 分支基於儲存層 copy-on-write，秒級建立 TB 級分支（表格） | SUPPORTED | "A branch is a copy-on-write clone of your data." https://neon.com/docs/introduction/branching ；官方部落格（2024-03-04）："copy a Postgres database over 1TB in size in just one second via branching" https://neon.com/blog/how-to-copy-large-postgres-databases-in-seconds |
| N4 | 原生 scale-to-zero，無請求時計算節點凍結、秒級冷啟動（表格） | SUPPORTED | "reactivates automatically within a few hundred milliseconds"；預設閒置 5 分鐘後暫停。補註：16 CU 以上的 compute 不會 scale to zero，Free 方案不能關閉。冷啟動實為次秒級，「秒級」措辭偏保守但不矛盾。https://neon.com/docs/introduction/scale-to-zero |
| N5 | 「內建基於 Rust 的 WebSocket／TCP 輕量 Connection Pooler」（表格） | CONTRADICTED | 官方連線池文件："Neon uses PgBouncer to provide connection pooling, enabling up to 10,000 concurrent connections." 用 Rust 寫、接受 TCP／WebSocket／SQL over HTTP 的是 `proxy`（neondatabase/neon repo 的 `proxy/README.md`），它負責驗證與路由，不是連線池。文章把兩個元件混成一個。https://neon.com/docs/connect/connection-pooling ；https://github.com/neondatabase/neon/tree/main/proxy |
| N6 | SVG：「Neon Connection Pooler (PgBouncer in Rust)」 | CONTRADICTED | 同上：Neon 用的是 PgBouncer（C 語言專案），文件沒有任何「Rust 版 PgBouncer」。圖中也省略了實際位於客戶端與 compute 之間的 Neon proxy。 |
| N7 | 單計算節點垂直擴展＋儲存無上限＋多唯讀副本（表格） | SUPPORTED | 方案頁："Storage is unlimited on paid plans (Launch and Scale)."（Free 方案 1 GB/project）；autoscaling 上限 16 CU、固定規格最高 56 CU。https://neon.com/docs/introduction/plans ；唯讀副本："Neon's read replicas do not replicate or duplicate data." https://neon.com/docs/introduction/read-replicas |
| N8 | PostgreSQL 計算節點改造成無狀態（第 2 節、SVG） | SUPPORTED | README："Compute nodes are stateless PostgreSQL nodes backed by the Neon storage engine." https://github.com/neondatabase/neon |
| N9 | 儲存層為自研 Rust 分散式儲存引擎（第 2 節） | SUPPORTED | neondatabase/neon repo 語言統計以 Rust 為主（約 11.2 MB，第二名 Python 約 2.9 MB），`pageserver`、`safekeeper` 為 Rust workspace 成員（以 `gh api repos/neondatabase/neon/languages` 查得）；官方部落格文章標題 "How we scale an open-source, multi-tenant storage engine for Postgres written in Rust"。 |
| N10 | SVG：計算節點「本地無資料磁碟」 | CONTRADICTED | 架構頁："Local NVMe - used as a performance cache for data pages."；相容性頁指出 unlogged tables 與 temporary tables 存在 compute 本地儲存、受本地磁碟大小限制。持久資料不在本地是對的，但「本地無資料磁碟」不對。 |
| N11 | SVG：計算節點到儲存層是「WAL 日誌串流與 8KB Page 按需拉取」 | SUPPORTED | WAL 送往 safekeeper、頁面向 pageserver 取（架構頁）。8KB 是 PostgreSQL 預設頁大小，Neon 官方頁面未明寫此數字，屬推論。 |
| N12 | SVG：Safekeeper Quorum 叢集，Paxos 共識、持久化最新 WAL | SUPPORTED | "A transaction is considered committed once a quorum of safekeepers has acknowledged the WAL record."，並寫明 "via the Paxos protocol"。https://neon.com/docs/introduction/architecture-overview |
| N13 | SVG：Pageserver 重放 WAL、按需提供資料頁 | SUPPORTED | "it reconstructs the page by replaying WAL up to the requested LSN and returns the result." 同上 |
| N14 | SVG：AWS S3 物件儲存做不可變冷資料歸檔 | SUPPORTED | 官方部落格："cloud object storage such as S3"；"Files are never modified in place." https://neon.com/blog/architecture-decisions-in-neon 。補註：架構頁只寫 "object storage"，未綁定 AWS。 |
| N15 | 儲存以不可變 WAL 組織，建分支不複製物理資料、只記錄快照 LSN（第 2 節） | SUPPORTED | "The immutable file format made it straightforward to support branching."（同上部落格）；"Writes to a branch are saved as a delta."、"A branch and its parent can share the same data but diverge at the point of branch creation."（branching 文件）；可從過去時間點建分支。 |
| N16 | CLI 指令 `neon branch create pr-123`（第 2 節） | CONTRADICTED | CLI 參考只有複數形式並以 `--name` 指定名稱：`neon branches create --name feature/user-auth`；未記載單數 `branch` 子指令或位置參數。https://neon.com/docs/reference/cli-branches |
| N17 | 1 秒內為 PR 提供含生產環境全量資料的獨立測試庫（第 2 節） | SUPPORTED | 見 N3 的 2024-03-04 官方部落格。 |
| N18 | 客戶端以 HTTP／WebSocket／TCP 接入（SVG） | SUPPORTED | `proxy/README.md`："postgres protocol over TCP"、"postgres protocol over WebSockets"、"SQL over HTTP"。 |

> Neon 計 18 項（SUPPORTED 13、CONTRADICTED 5）。SVG 的「Compute VM」字樣本次未找到官方逐字出處，視為 N8 的附屬描述，不單獨計分。

## PlanetScale／Vitess 相關主張

| # | 主張（出處位置） | 判定 | 一手證據 |
| - | - | - | - |
| P1 | PlanetScale 是基於 Vitess 的 MySQL 相容服務（表格、title） | SUPPORTED，但定位已過時 | 分支文件與 Vitess 文件路徑均屬 PlanetScale 的 Vitess 產品線。但 "PlanetScale for Postgres is now generally available and out of private preview."（2025-09-22）https://planetscale.com/blog/planetscale-for-postgres-is-generally-available 。文章 2026-09 發表，把整家公司當成「MySQL 派」需補註。 |
| P2 | Vitess 源自 YouTube（表格、description） | SUPPORTED | "Vitess was created in 2010 to solve the MySQL scalability challenges that the team at YouTube faced." https://vitess.io/docs/overview/history/ |
| P3 | 「支撐 YouTube 數十億 QPS」（第 3 節） | NOT FOUND | Vitess 歷史頁與首頁都沒有任何 QPS 數字，只提到 YouTube 用戶規模成長 50 倍以上。https://vitess.io/docs/overview/history/ ；https://vitess.io/ |
| P4 | 分支為「Vitess 邏輯分支與 Schema 鏡像」（表格） | SUPPORTED | "Please note that only the schema is copied."；資料需靠 Data Branching® 或還原備份。https://planetscale.com/docs/vitess/schema-changes/branching ；建分支會起新的 Vitess cluster 並套用 schema（https://planetscale.com/blog/what-makes-up-a-planetscale-database ，2023-08-23）。 |
| P5 | Scale-to-zero：「託管環境自適應休眠」（表格） | CONTRADICTED | 官方 database sleeping 文件："Database sleeping cannot be initiated by customers."，只適用於已停用的 Hobby 方案資料庫與逾期未付款組織，且 "not available on Enterprise or Business plans"。不是依流量自動休眠的功能。Hobby 方案已於 2024-04-08 停止。https://planetscale.com/docs/plans/database-sleeping ；https://planetscale.com/docs/concepts/hobby-plan |
| P6 | 100,000+ 併發連線、抗數十萬併發（SVG、表格、第 4 節） | SUPPORTED | 官方部落格（2022-11-01）："running one million active connections on a PlanetScale database." https://planetscale.com/blog/one-million-connections |
| P7 | 連線池收斂在 VTGate（「萬級連線壓至數百」）（SVG、表格「透過 VTGate 提供頂級連接池」） | CONTRADICTED | 同一篇官方部落格："Vitess and PlanetScale offer connection pooling on the VTTablet level."；Vitess 架構頁也把 connection pooling 列為 vttablet 功能。VTGate 負責接收大量客戶端連線與路由，收斂到 MySQL 的連線池在 VTTablet。「數百」這個數字也找不到出處。 |
| P8 | VTGate 無狀態、可任意水平擴展（SVG） | SUPPORTED | Vitess FAQ 描述 VTGate 為近乎無狀態的輕量 proxy，可加開實例擴展（https://vitess.io/docs/faq/getting-started/components/what-is-vtgate-and-how-does-it-work/ ，經搜尋摘要取得，未逐字核對）；PlanetScale 的 VTGates 可依 CPU 自動擴展 https://planetscale.com/docs/vitess/scaling/vtgates |
| P9 | VTGate 做分散式 SQL 解析、路由、跨分片查詢（SVG） | SUPPORTED | "a lightweight proxy server that routes traffic to the correct VTTablet servers"、"returns consolidated results back to the client" https://vitess.io/docs/concepts/vtgate/ |
| P10 | VTGate 有「查詢快取」（SVG） | NOT FOUND | 查到的 VTGate 官方說明都沒有結果快取。VTGate 有 query plan cache，但「查詢快取」易被讀成結果快取，需改寫或補出處。 |
| P11 | VTTablet 是 MySQL 的 sidecar（SVG） | SUPPORTED | "a `mysqld` instance with a sidecar process called `vttablet`" https://planetscale.com/blog/what-makes-up-a-planetscale-database |
| P12 | Deploy Request 流程類似 GitHub PR（第 3 節） | SUPPORTED | 在 development branch 修改後開 deploy request、檢視 schema diff、部署；"deploy non-blocking schema changes to your production database with zero downtime" https://planetscale.com/docs/vitess/schema-changes/deploy-requests |
| P13 | 「透過 gh-ost 原理在後台建立影子表並以 CDC 雙寫同步」（第 3 節） | CONTRADICTED | Vitess DDL 策略頁：偏好的 `vitess` 策略使用 VReplication，"`gh-ost` and `pt-osc` strategies are not supported as of v22." https://vitess.io/docs/24.0/user-guides/schema-changes/ddl-strategies/ 。PlanetScale 部落格寫的是 "By using the power of Vitess, we can schedule and execute online schema changes"，並說使用者不必自己操作 gh-ost。另外 gh-ost 本身是讀 binlog 追蹤變更，並非「雙寫」，「CDC 雙寫」對 gh-ost 和 VReplication 都不成立。 |
| P14 | 切換過程「零鎖表、零停機」（第 3 節） | CONTRADICTED（零鎖表部分） | 零停機有官方說法（見 P12），但零鎖表不成立：Vitess 文件 "incoming queries are momentarily blocked, but not lost"；PlanetScale 官方說明 cut-over 需要 "acquire a table lock, also known as a metadata lock"。https://planetscale.com/docs/vitess/schema-changes/how-online-schema-change-tools-work |
| P15 | 「跨節點無限水平 Sharding」（表格、description「水平無限擴展」） | NOT FOUND | 官方文件支持水平分片，但找不到「無限」的說法，屬行銷式誇飾。 |

> PlanetScale 計 15 項（SUPPORTED 8、CONTRADICTED 4、NOT FOUND 3）。SVG 的 `Keyspace [-80)`／`[80-]` 分片範圍屬 Vitess 通用命名慣例，不列入計分；第 4 節「資料量達數十 TB」為選型建議而非事實主張，也不列入。

## 背景變動（文章未主張，但影響讀者理解）

- Databricks 於 2025-05-14 宣布以約 10 億美元收購 Neon（多家媒體報導，屬二手來源；本次未找到交易完成的一手公告）。文章完全未提。
- PlanetScale for Postgres 於 2025-09-22 GA，並在開發 Postgres 水平分片系統 Neki；文章把「Neon＝Postgres、PlanetScale＝MySQL」當成兩大流派的分界，到 2026-09 已不準確。

## 參考連結檢查

文章結尾沒有參考連結區塊，也沒有任何內文連結。唯一的外部連結是 frontmatter 的 `repositoryUrl: https://github.com/ByteByteGoHq/system-design-101`：

- 存在（HTTP 200），是 repo 首頁，不是具體文章。
- repo 內容為通用系統設計圖解。全 repo 檔名搜尋沒有 Neon、PlanetScale、Vitess 相關檔案；最接近的 `data/guides/what-is-serverless-db.md` 談的是 Amazon Aurora Serverless。
- 結論：不支撐正文任何一項 Neon／PlanetScale 主張。建議改為 Neon、PlanetScale、Vitess 官方文件連結（見上表 URL）。

## 建議修正方向（僅供參考，本次未改文章）

1. 第 3 節改寫線上 schema 變更機制：Vitess VReplication、影子表、cut-over 會短暫阻擋查詢；刪除 gh-ost 與「CDC 雙寫」。
2. Neon 連線池改為 PgBouncer（最高 10,000 併發連線），並把 Rust 寫的 proxy（TCP／WebSocket／HTTP）畫成獨立元件。
3. 連線池收斂改歸 VTTablet，VTGate 保留路由與大量客戶端連線的角色。
4. CLI 改為 `neon branches create --name pr-123`。
5. 「100% 相容」「本地無資料磁碟」「YouTube 數十億 QPS」「無限水平」「查詢快取」改寫或刪除。
6. PlanetScale 的 scale-to-zero 欄改為「不支援」（database sleeping 不是依流量自動休眠）。
7. 補註 PlanetScale for Postgres 與 Databricks 收購 Neon 的時間點。
