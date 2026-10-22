# 事實查核：figma-postgres-scaling-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/figma-postgres-scaling-architecture.mdx`，連同 `src/components/FigmaPostgresScalingDiagram.astro` 的圖解文字
- 公司：Figma
- 查核日期：2026-10-22
- 方法：只採 Figma 官方部落格兩篇作為證據，第三方整理（ByteByteGo）只當線索。
  - 【垂直拆庫文】Tim Liang，“The growing pains of database architecture”，2023-04-04，https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/
  - 【水平分片文】Sammy Steele，“How Figma’s databases team lived to tell the scale”，2024-03-14，https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/

## 總評：未通過

文章的骨架和 Figma 原文一致：從單一 RDS Postgres 起步，先升級機型、加 read replica 與 PgBouncer，再依資料表群組垂直拆庫，最後自建 Go 寫的 DBProxy 做水平分片；colo、邏輯分片與實體分片分離、AST 解析這幾個核心概念也都有出處。問題出在兩處。第一，標題與前言說「零停機」「全生命週期零停機」，原文寫的卻是每次垂直拆庫約 30 秒部分不可用（約 2% 請求失敗），第一張水平分片表的切換則是主庫約 10 秒部分不可用。第二，「階段 4：零停機遷移」整節的四步流水線和原文對不上：Figma 刻意不用快照還原，邏輯複製是整份資料複製而不是依 shard key 分流，影子讀比對的是「經過 view 與不經過 view 的查詢」而不是新舊庫，切換也不是 1 秒內無感。原文真正的關鍵步驟（用 Postgres view 先做邏輯分片、百分比灰度、PgBouncer 暫停、LSN 同步、反向複寫以便回滾）文章都沒有寫。

此外，128 個邏輯分片、16 台實體機、1x→10x→30x→100x 的階段刻度、三庫拆分圖（含 Activity Log DB）、Redis、io2、熔斷、租戶隔離等細節都找不到出處，卻以 Figma 的事實口吻呈現。

統計：SUPPORTED 16、CONTRADICTED 10、NOT FOUND 15。

## 主張逐項查核

### A. 整體敘事（標題、description、前言）

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 2020–2024 年間「超過 100 倍」的流量與資料規模成長；標題「擴展 100 倍」 | CONTRADICTED（輕微） | 【水平分片文】“Figma’s database stack has grown almost 100x since 2020.” 原文是「接近」100 倍，而且指的是資料庫堆疊，不是「流量與資料規模」。 |
| A2 | 時間跨度約四年 | SUPPORTED | 【水平分片文】“Over the past four years, we’ve made a significant effort to stay ahead of the curve” |
| A3 | 沒有更換儲存引擎，留在 AWS RDS PostgreSQL | SUPPORTED | 【水平分片文】“we began to explore building a horizontally sharded solution on top of our existing vertically partitioned RDS Postgres infrastructure.” |
| A4 | 演進路徑：單體垂直擴展 → 領域垂直拆庫 → DBProxy 水平分片 | SUPPORTED | 【水平分片文】“In 2020, we were running a single Postgres database hosted on AWS’s largest physical instance, and by the end of 2022, we had built out a distributed architecture with caching, read replicas, and a dozen vertically partitioned databases.” 之後 “In late 2022, we set out to …” 做水平分片。 |
| A5 | 「成功支撐起數兆級的請求負載」（前言） | NOT FOUND | 兩篇原文都沒有請求量數字。 |
| A6 | 「實現全生命週期的零停機遷移」（前言）、標題「維持零停機」、description「零停機邏輯複製」 | CONTRADICTED | 【垂直拆庫文】目標是 “Limit potential availability impact to <1 minute”；實際 “During each operation, we observed a ~30 second period of partial availability impact (~2% of requests dropped).”【水平分片文】“We successfully failed over with only ten seconds of partial availability on database primaries and no availability impact on replicas.” 目標用語是 “near-zero downtime”。 |
| A7 | Postgres 承載「龐大的畫布節點（Canvas Nodes）、版本歷程、評論與組織權限中繼資料」（前言）；圖解與 SQL 範例把 Canvas/Nodes 放進分片 | NOT FOUND | 原文只說 Postgres 存中繼資料：【垂直拆庫文】“most of our metadata—like permissions, file information, and comments”；【水平分片文】“file metadata, organization metadata, comments, file versions, and more.” 兩篇都沒有提到畫布節點存在 Postgres。 |

### B. 階段 1：單體垂直擴展

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 升級到頂規 `r5.24xlarge` | SUPPORTED | 【垂直拆庫文】“Upgrade our database to the largest instance available (from r5.12xlarge to r5.24xlarge)” |
| B2 | 搭配 `io2` 高 IOPS 磁碟 | NOT FOUND | 原文沒有提到磁碟類型。 |
| B3 | 引入 PgBouncer 管理連線 | SUPPORTED（有但書） | 【垂直拆庫文】“Add PgBouncer as a connection pooler to limit the impact of a growing number of connections (which were in the thousands)”。「Fork 處理程序造成記憶體與 context switch 耗損」是通用的 Postgres 解說，不是原文給的理由。 |
| B4 | 讀寫分離，把唯讀查詢、分析報表與搜尋導到 read replica | SUPPORTED（有但書） | 【垂直拆庫文】“Create multiple read replicas to scale read traffic”。「分析報表與搜尋」原文沒有。 |
| B5 | 引入 Redis 快取熱門檔案中繼資料與 session | NOT FOUND | 【水平分片文】只說 2022 年底的架構含 “caching”，沒有說是 Redis，也沒有說快取什麼。 |
| B6 | 各階段刻度 1x→10x、10x→30x、30x→100x+ | NOT FOUND | 原文沒有這種分段。 |
| B7 | 10 倍時的瓶頸是 Primary 寫入 IOPS 飽和、WAL 寫入逼近磁碟上限 | CONTRADICTED（時期錯置） | 2020 年單體時期的瓶頸是 CPU：【垂直拆庫文】“we observed upwards of 65% CPU utilization during peak traffic”。IOPS 上限是垂直拆庫之後、水平分片前才出現的問題：【水平分片文】“Our highest write tables were growing so quickly that we would soon exceed the maximum IO operations per second (IOPS) supported by Amazon’s Relational Database Service (RDS).” 原文沒有提到 WAL。 |
| B8 | replica lag 讓應用層讀到過期資料 | SUPPORTED（有但書） | 【垂直拆庫文】“not all reads or data fetching could be moved to replicas due to application sensitivity to replication lag.” 原文沒有「雪崩」這種描述。 |

### C. 階段 2：垂直拆庫

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | 依業務邊界把一組組資料表搬到獨立 RDS 實例 | SUPPORTED | 【垂直拆庫文】“Instead of splitting each table across many databases, we would move groups of tables onto their own databases.”【水平分片文】“We split groups of related tables—like ‘Figma files’ or ‘Organizations’—into their own vertical partitions” |
| C2 | 拆成三個庫：Auth/Org DB、Files DB、Activity Log DB（第 2 節 SVG；元件圖「Auth & Org 獨立資料庫…低頻全域查詢」） | CONTRADICTED | 原文是「十幾個」庫：“a dozen vertically partitioned databases”；拆分是多次操作，“Our first operation involved moving two high-traffic tables, while our final operation in October 2022 involved 50.” 原文沒有 Activity Log DB，也沒有說 Org 庫是「讀多寫少」。原文挑表的依據是 AAS 量測與 ActiveRecord runtime validator，文章沒寫。 |
| C3 | 跨庫後失去 foreign key、JOIN 與交易 | SUPPORTED | 【垂直拆庫文】“we lose important functionality such as atomic transactions between tables, foreign key validations, and joins.” 「改成多次 RPC 呼叫」原文沒有。 |
| C4 | 「拆分後僅過了一年，單獨的 Files DB 寫入量與容量再次觸及最高規格 RDS 的極限」 | CONTRADICTED | 原文的「一年」指的是拆庫之前的戰術修補：【垂直拆庫文】“We started with a few tactical fixes to secure an additional year of runway”。拆庫後原文寫的是 “Our largest partition has CPU utilization hovering ~10%”，後來的壓力來自個別大表：【水平分片文】“some of our tables, containing several terabytes and billions of rows, were becoming too large for a single database”，並提到 vacuum 與 IOPS。沒有點名 Files DB，也沒有「一年」。 |

### D. 選型

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 評估過 CockroachDB、Google Spanner、Vitess | SUPPORTED | 【水平分片文】“During our evaluation, we explored CockroachDB, TiDB, Spanner, and Vitess.” |
| D2 | 也評估過 Citus | NOT FOUND | 兩篇都沒有提到 Citus。 |
| D3 | 不選 NewSQL 的理由：要改寫數千個查詢、放棄 Postgres 除錯工具鏈、分散式交易的跨區延遲 | NOT FOUND（理由與原文不同） | 原文的理由是遷移風險、專業累積與時程：【水平分片文】“switching to any of these alternative databases would have required a complex data migration …”；“we would have had to rebuild our domain expertise from scratch”；“we had only months of runway remaining.”【垂直拆庫文】“we would’ve had one of the largest single-cluster footprints for cloud-managed distributed Postgres. We didn’t want to bear the burden of being the first customer to hit certain scaling issues”。「改寫數千查詢」「跨區延遲」都沒有出處。 |
| D4 | 不選 Vitess：它為 MySQL 最佳化，Postgres 支援有落差 | SUPPORTED（有但書） | 【垂直拆庫文】“Migrating to NoSQL databases or Vitess (MySQL) would require a complex double read and write migration”。原文的重點是要做雙讀雙寫遷移，不是「語法支援落差」。 |
| D5 | 自研 DBProxy，插在應用層與資料庫之間 | SUPPORTED（有但書） | 【水平分片文】“we built out a new golang service, DBProxy. DBProxy sits between the application layer and PGBouncer.” 精確位置是在 PgBouncer 前面。 |

### E. DBProxy 與分片設計

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | 預先規劃 128 個邏輯分片，初期分配在 16 台 RDS（每台 8 個），擴容時搬 4 個；圖解「128 Logical Shards」「邏輯分片 #000–#063／#064–#127」 | NOT FOUND | 兩篇都沒有分片數量。原文示意圖只有 “Four logical shards on two physical shards”。 |
| E2 | 邏輯分片與實體節點解耦，擴容不必改應用層 | SUPPORTED | 【水平分片文】“Once a table is horizontally sharded at the application layer, it can support any number of shards at the physical layer. We can always scale out further by simply running a physical shard split.” 原文用 Postgres view 實作邏輯分片，文章沒提。 |
| E3 | Colo：強關聯的表共用同一個 shard key，同 shard key 內可用 JOIN 與 ACID 交易 | SUPPORTED | 【水平分片文】“colocations … which shared the same sharding key and physical sharding layout”；“Tables within a colo support cross-table joins and full transactions when restricted to a single sharding key.” |
| E4 | Colo 範例表 `Files`、`CanvasNodes`、`Frames`、`Versions`，以及 `canvas_nodes` 的 SQL 範例 | NOT FOUND | 原文沒有這些表名。原文的 colo 示意是 “Tables sharded by UserID and by FileID are each colocated together”。 |
| E5 | shard key 例如 `OrgID` 或 `FileID`；以雜湊避免 re-hashing | SUPPORTED（有但書） | 【水平分片文】“selected a handful of sharding keys like UserID, FileID, or OrgID”；“we decided to use the hash of the sharding key for routing.” 文章漏了 UserID。 |
| E6 | 轉發前先把 SQL 解析成 AST；WHERE 帶 shard key 就直送目標分片 | SUPPORTED | 【水平分片文】“A query parser reads SQL sent by the application and transforms it into an Abstract Syntax Tree (AST). A logical planner … extracts the query type … and logical shard IDs … A physical planner maps the query from logical shard IDs to physical databases.”；“single-shard queries are filtered to a single shard key.” |
| E7 | 缺 shard key 的查詢會在開發環境警報或阻斷，只有極少數受控的後台報表允許 scatter-gather | CONTRADICTED | 原文的 query engine 一般性地支援 scatter-gather：“if the query is missing a sharding key, our query engine has to perform a more complex ‘scatter-gather.’” 限制是靠 shadow planning 選出「支援最常見 90% 查詢」的子集：“all range scan and point queries are allowed, but joins are only allowed when joining two tables in the same colo and the join is on the sharding key.” 沒有「開發環境阻斷」「只限後台報表」。 |
| E8 | DBProxy 內建查詢超時與熔斷（circuit breaking） | NOT FOUND | 原文最接近的是 “DBProxy also allowed us to implement features like dynamic load-shedding and request hedging.” 沒有提到熔斷或超時。 |
| E9 | 租戶隔離：超大組織的爆炸半徑限於所屬分片，「其餘 90% 以上用戶完全不受影響」 | NOT FOUND | 兩篇都沒有。原文的「90%」是查詢語言涵蓋率，不是用戶比例。 |
| E10 | DBProxy 負責連線多路復用（第 4 點標題、圖解「連線池多路復用」） | NOT FOUND | 原文的連線池仍是 PgBouncer；DBProxy 的功能列表是 “load-shedding, improved observability, transaction support, database topology management, and a lightweight query engine.” |

### F. 階段 4：遷移流程

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| F1 | 把數 TB 資料「從單體庫搬遷至 128 個分片庫」 | NOT FOUND | 原文是逐表（群組）從一個庫切到 N 個庫：“Instead of moving data from 1 to 1 database, we were going from 1 to N.” 沒有 128，也不是一次搬整個單體庫。 |
| F2 | 第 1 步：從主資料庫備份恢復基礎資料（Snapshot Copy） | CONTRADICTED | 【垂直拆庫文】“We considered carefully coordinating a snapshot restore … but a restore eliminated the possibility of having a smaller storage footprint.” 改為先刪除目的庫索引、跑邏輯複製、複製完再重建索引：“we reduced the copy time to a matter of hours.” |
| F3 | 第 2 步：Logical Decoding 建 replication slot，依 Shard Key 把變更重播到對應分片 | CONTRADICTED | 【水平分片文】“We avoided having to implement ‘filtered logical replication’ (where only a subset of data is copied to each shard). Instead, we copied over the entire dataset and then only allowed reads/writes to the subset of data belonging to a given shard.” |
| F4 | 第 3 步：DBProxy 同時讀舊單體庫與新分片庫，背景比對一致性，用 Datadog 監控，跑數週直到 mismatch 為零 | CONTRADICTED | 原文的 shadow reads 比的是 view 與非 view 查詢，發生在邏輯分片階段：“We also built out a shadow reads framework which could send all live read traffic through views, comparing the performance and correctness of view versus non-view queries.” 原文沒有 Datadog、「數週」、「mismatch 為零」。實體切換的同步依據是 LSN：【垂直拆庫文】“We used LSNs to determine if two databases were synchronized.” |
| F5 | 第 4 步：寫入路由切換「在 1 秒內完成，客戶端無感知」；圖解「毫秒寫入切流」 | CONTRADICTED | 【水平分片文】“only ten seconds of partial availability on database primaries”。【垂直拆庫文】“~30 second period of partial availability impact (~2% of requests dropped)”；切換流程是 PgBouncer 暫停新連線、撤銷查詢權限、取消進行中的查詢（“we typically cancel a little under 10 queries”）、等 LSN 同步後再恢復。 |
| F6 | 選在低峰期切換 | NOT FOUND | 原文沒有提到切換時段；垂直拆庫文反而強調不靠維護窗口。 |

### G. 圖解元件

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| G1 | 應用層是「Rails / Go Services」「Rails & Go 應用層」 | NOT FOUND（輕微） | 【垂直拆庫文】“We use Ruby for the application backend … Our developers use ActiveRecord”。Go 在原文裡是 DBProxy 的實作語言，不是應用服務；原文也沒有直接說 Rails。 |

圖解中的其他文字（DBProxy 的 AST 解析、影子讀、128 分片、Colo A／B、Auth & Org 庫）已併入 C2、E1、E6、E10、F4 判定。

## 參考連結檢查

| 連結 | 存在？ | 篇名／作者是否相符 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/ | 存在 | 網址正確，但頁面標題是 “The growing pains of database architecture”（Tim Liang，2023-04-04），不是文章寫的 “How Figma scaled to multiple databases” | 撐起階段 1、2（B1、B3、B4、C1、C3）與 F2、F5 的反證。 |
| https://www.youtube.com/watch?v=kYv_3j3m5mE ，標為 “Figma Engineering: How Figma's databases team lived to tell the scale” | 影片不可用：oEmbed 回 `Not Found`，頁面 `playabilityStatus` 為 `ERROR`，標題空白 | 篇名與連結不符：這個篇名是 Figma 部落格文章（Sammy Steele，2024-03-14），不是影片 | 撐不起任何主張。階段 3 的主要依據應換成 https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/ ，這篇目前完全沒被引用。 |
| https://github.com/ByteByteGoHq/system-design-101（文末與 frontmatter `repositoryUrl`） | 存在 | repo 首頁 | 屬於二手來源。README 有 “100X Postgres Scaling at Figma” 條目（https://bytebytego.com/guides/100x-postgres-scaling-at-figma），內容只是兩篇 Figma 文的簡短摘要，沒有 128 分片、Colo 範例表、影子讀流程等細節，所以也不是那些 NOT FOUND 細節的來源。 |

## 修正建議（供作者參考，本次不改文）

1. 拿掉標題與前言的「零停機」「全生命週期零停機」，改成原文的說法：垂直拆庫每次約 30 秒部分不可用（約 2% 請求失敗），第一張水平分片表切換時主庫約 10 秒部分不可用、replica 不受影響。「超過 100 倍」改為「接近 100 倍」；刪除「數兆級請求」。
2. 重寫「階段 4」：照原文寫 Postgres view 邏輯分片與百分比灰度、view／非 view 的影子讀、整份邏輯複製（不做 filtered replication）、刪索引加速初始複製、PgBouncer 暫停、LSN 同步、反向複寫以便回滾。刪除快照還原、依 shard key 重播、Datadog、1 秒切流、低峰期。
3. 「階段 1」的瓶頸改為 CPU 尖峰 65% 以上；IOPS、vacuum、TB 級大表移到水平分片的動機。刪除 io2、Redis，或標成作者補充。
4. 「階段 2」的三庫圖改成示意並註明實際上有十幾個垂直分割庫，或改用原文的 “Figma files”“Organizations” 例子；「一年後 Files DB 撞牆」改成原文敘述。
5. 128／16／8／4 分片數字、Colo 範例表與 `canvas_nodes` SQL、熔斷、租戶隔離 90%、DBProxy 連線多路復用都要標成作者的示意設計，或直接刪除。scatter-gather 改寫為原文的「支援，但用 shadow planning 選出涵蓋 90% 查詢的子集，join 限同 colo 且以 shard key 連接」。
6. 選型段補上 TiDB，刪除 Citus；不選 NewSQL 的理由改用原文（遷移風險、要重建專業、只剩幾個月 runway）。
7. 參考連結：第一篇改用原標題；把失效的 YouTube 連結換成水平分片文；ByteByteGo 註明為二手摘要。圖解的「Rails / Go Services」改成「Ruby（ActiveRecord）應用層」。
