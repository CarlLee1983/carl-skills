# 事實查核：reddit-core-storage-high-concurrency-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/reddit-core-storage-high-concurrency-architecture.mdx`（含 `RedditCoreStorageDiagram.astro` 圖中文字）
- 查核日期：2026-10-22
- 查核範圍：歸給 Reddit 的具體主張（元件、選型、資料模型、流程、數字、年份）；教科書知識（鄰接表／巢狀集合比較、ZSET 時間複雜度）不查
- 統計：SUPPORTED 22 項、CONTRADICTED 13 項、NOT FOUND 15 項（共 50 項）

## 總評：未通過

文章標題與「四大核心」中的招牌主張，多數與一手來源矛盾或查無出處。「Thing2」不是 Reddit 的模型名稱（程式碼叫 `Thing`，官方 wiki 叫 ThingDB）。核心不是「僅兩張表」，而是「每種型別各兩張表」再加 relation 表。Subreddit 熱門列表不在 Redis Sorted Sets，而是存在 Cassandra 的 CachedQuery。留言樹不是 Materialized Path，也不是 Cassandra 寬表：Reddit 原始碼註解明說兩版 Cassandra 寬表設計都已放棄，實際存的是 parent→children 的整棵樹。2025 年留言後端則落在 PostgreSQL、Memcached、Redis。此外，Flink 即時 Hot Ranking、Rust 版 Baseplate、OpenTelemetry、±3% fuzzing 雜訊、99% 命中率、100:1 讀寫比都查無出處。站得住的主要是 r2 時代的基本面：每型別 EAV、Memcached 前置、鎖防擊穿、投票存 Cassandra、hot 公式程式碼。這些不足以撐起正文的主架構敘事。另外，文字版公式是 2014 年以前的舊版，跟同節的 Python 實作互相矛盾。

## 一手來源代號

| 代號 | 來源 | 說明 |
| --- | --- | --- |
| [R2] | reddit-archive/reddit 開源碼（master） | https://github.com/reddit-archive/reddit |
| [NW] | Neil Williams, "The Evolution of Reddit.com's Architecture", QCon SF 2017（InfoQ 逐字稿） | https://www.infoq.com/presentations/reddit-architecture-evolution/ |
| [SH] | Steve Huffman 2010 演講，InfoQ 報導 "7 Lessons Learned While Building Reddit" | https://www.infoq.com/news/2010/05/7-Lessons-Reddit |
| [WIKI] | Reddit 開源專案 wiki "Architecture Overview" | https://github.com/reddit-archive/reddit/wiki/Architecture-Overview |
| [BPG] | reddit/baseplate.go repo（README、go.mod、目錄） | https://github.com/reddit/baseplate.go |
| [IR] | Reddit 官方財報新聞稿 Q3 2025（Business Wire） | https://www.businesswire.com/news/home/20251030834086/en/Reddit-Announces-Third-Quarter-2025-Results/ |
| [CMT]* | InfoQ 2025-11 報導 RedditEng〈Modernizing Reddit's Comment Backend Infrastructure〉 | https://www.infoq.com/news/2025/11/reddit-comments-go-migration/（原文 https://www.reddit.com/r/RedditEng/comments/1mbqto6/ ，reddit.com 擋爬蟲，未能直接開啟） |
| [REV2]* | InfoQ 2023-10 報導 RedditEng REV2 規則引擎 | https://www.infoq.com/news/2023/10/reddit-rev2 |
| [PI]* | RedditEng〈You Broke Reddit: The Pi-Day Outage〉2023-03-21（經鏡像與摘要） | https://www.reddit.com/r/RedditEng/comments/11xx5o0/ |
| [AUR]* | InfoQ 2024-04 報導 Reddit 媒體 metadata 遷至 Aurora Postgres | https://www.infoq.com/jp/news/2024/04/reddit-metadata-s3-postgres/ |

標 * 者：reddit.com 原文無法從本機抓取，證據為 InfoQ 對具名 RedditEng 原文的轉述，屬「二手轉述一手」，報告中另行註明。

## 逐項查核

### A. 開場與規模數字

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 1 | 每月超過 8.5 億名活躍訪問者 | NOT FOUND | Reddit 官方財報只報 DAUq／WAUq，不報 MAU；8.5 億只見於第三方統計站。 |
| 2 | 圖：「支撐每日數億活躍用戶」 | CONTRADICTED | [IR]："Daily Active Uniques ("DAUq") increased 19% year-over-year to 116.0 million"（Q3 2025）。實際約 1.16 億，不是「數億」。 |
| 3 | 讀寫比高達 100:1 以上（正文與圖兩處） | NOT FOUND | [NW]、[WIKI] 都沒有量化讀寫比；[WIKI] 只說寫入負載多在 request 之外處理。 |
| 4 | 熱點時單一貼文一秒數萬次寫入 | NOT FOUND | 查無。 |

### B. Thing 模型

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 5 | 模型名稱為「Thing2」 | CONTRADICTED | [R2] `r2/lib/db/thing.py` 的類別叫 `Thing`；[WIKI] 稱 "ThingDB"。全 repo 的 `thing2` 只出現在 relation 表欄位 `thing2_id`（`tdb_sql.py` 第 226 行），是「關聯的第二個 thing」，不是模型名。 |
| 6 | 動機：ALTER TABLE 成本高，所以改用 EAV 免 schema 變更 | SUPPORTED | [SH]：每個新功能都要改 schema，"Adding a new column to a 10 million rows table can take a long time"。 |
| 7 | 時間點是 2008 年 | NOT FOUND | [SH] 只說 Reddit 2005 年創立，沒有 2008 年導入的說法。 |
| 8 | 「整套系統的核心僅由兩張 PostgreSQL 資料表構成」（正文與圖「僅兩張表」） | CONTRADICTED | [WIKI]："uses two tables for each thing type"。[R2] `tdb_sql.py` 為每個型別建立 `<app>_thing_<name>` 與 `<app>_data_<name>`，另有 `<app>_rel_<name>` relation 表。 |
| 9 | Schema：單一 `things` 表帶 `thing_type INT`（1 Account、2 Subreddit、3 Link、4 Comment）與 `created_at` | CONTRADICTED | [R2] `tdb_sql.py` 190–205 行：thing 表欄位是 `thing_id, ups, downs, deleted, spam, date`，沒有 `thing_type` 欄；型別靠「一型別一張表」區分。型別代碼 1–4 是虛構的。 |
| 10 | data 表為 (thing_id, key, value) | SUPPORTED | [R2] `tdb_sql.py` 213–219 行：`thing_id`、`key`、`value`，另有 `kind` 欄。 |
| 11 | 屬性值都是字串 | SUPPORTED | [R2] `value` 為 `sa.String`，型別記在 `kind` 欄。 |
| 12 | 無 JOIN，複雜關聯要在應用層多次查詢 | SUPPORTED | [SH] 指出這套設計讓資料庫沒有 join、方便分散。 |
| 13 | 「所有物件類型（用戶、貼文、投票）統一抽象」為 Thing | CONTRADICTED | 投票不是 Thing。[R2] 早期是 relation，最終版 `r2/models/vote.py` 的 `LinkVotesByAccount`／`CommentVotesByAccount` 是 `tdb_cassandra.DenormalizedRelation`，存在 Cassandra。 |
| 14 | 圖：依 Type 分庫分表 | SUPPORTED（部分） | [R2] `example.ini`：`db_table_link = thing`、`db_table_srmember = relation, subreddit, account` 等，按型別配置資料庫。「依 ID 分片」查無。 |

### C. 快取層

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 15 | Memcached 快取整個 Thing 物件 | SUPPORTED | [NW]：Thing 讀取先查 memcache，miss 才回 DB；"we write to memcache from making a change, rather than deleting it"。 |
| 16 | Memcached 吸收／命中 99% 讀取 | NOT FOUND | [NW]、[WIKI]、[SH] 都沒有命中率數字。 |
| 17 | 讀取延遲小於 1ms；取得 Python/Go 物件 | NOT FOUND | 查無延遲數字；r2 為 Python 2，Go 與 r2 的 Thing 快取無關。 |
| 18 | 快取失效時用分散式 Mutex，只讓一個 worker 回源 | SUPPORTED | [R2] `r2/lib/memoize.py`：`with g.make_lock("memoize", ...)`，註解 "see if it was completed while we were waiting for the lock"；`thing.py` 1220 行 Query 快取 miss 時 `g.make_lock("thing_query", ...)`，註解 "prevent concurrent requests for the same data"。鎖本身是 `r2/lib/lock.py` 的 `MemcacheLock`。註：Thing by-ID 讀取路徑沒有這把鎖。 |
| 19 | 圖：Memcached 一致性雜湊分流 | SUPPORTED | [R2] `r2/lib/cache.py` 89 行：`'ketama': True, # consistent hashing`。 |
| 20 | Subreddit 熱門列表由 Redis Sorted Sets 提供（`ZADD subreddit:tech:hot`、`ZREVRANGE`） | CONTRADICTED | [R2] `r2/models/query_cache.py`："This module provides a Cassandra-backed lockless query cache ... a list of items that would be in that listing are maintained in Cassandra"。[NW]：listing 先是 memcache 中的 ID 列表，"nowadays in Cassandra"。r2 原始碼沒有 Redis／ZADD。 |
| 21 | 圖：限制只存 Top N 貼文 ID | SUPPORTED | [R2] `query_cache.py`：`MAX_CACHED_ITEMS = 1000`（存在 Cassandra，不是 Redis）。 |

### D. 留言樹

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 22 | 熱門貼文可達 50,000 條留言、巢狀數十層 | NOT FOUND | 查無。 |
| 23 | Reddit 採用 Materialized Path（路徑編碼 "0001.0001"） | CONTRADICTED | [R2] `r2/models/comment_tree.py` 文件字串：存的是 "tree: dict of comment id -> list of child comment ids"，另有 `parents`、`depth`，都由樹即時算出，沒有路徑字串。[NW]："the parent relationships of that whole tree in one place"。 |
| 24 | Cassandra 寬表：`post_id` 為 Partition Key、`comment_id`／`path` 為 Clustering Key | CONTRADICTED | [R2] 同檔：CommentTreeStorageV2（欄名 `(parent_comment id, comment_id)`）"was abandoned because counters ended up being unreliable"；V3（欄名 `(depth, parent_comment_id, comment_id)`）"was abandoned because of more unexpected GC problems"。實際使用 `CommentTreePermacache`，key 為 `'comments_' + link._id`，存整棵樹。 |
| 25 | 圖：寬表高吞吐寫入、無鎖競爭 | CONTRADICTED | [R2] `CommentTreePermacache._mutation_context` 回傳 `g.make_lock("comment_tree", ...)`，寫入要加鎖；原始碼註解說「消除鎖」的 Cassandra 模型已放棄。[NW] 也描述 megathread 需要獨立的 "fast lane" 佇列。 |
| 26 | 開貼文時一次拉取該貼文所有留言 ID、Parent 與分數 | SUPPORTED（部分） | [R2] 樹結構一次從 permacache 讀出；分數則另讀預先計算、按排序法分存的 `CommentScoresByLink`（`r2/lib/comment_tree.py` 的 `get_comment_scores`）。 |
| 27 | 在應用層記憶體建樹、排序並截斷分頁 | SUPPORTED（部分） | [R2] 樹與 parents／depth 在記憶體中組出；排序用的是預算好的分數，不是請求時才算熱度。 |
| 28 | 圖：遷至 Cassandra／ScyllaDB | NOT FOUND（ScyllaDB） | 查無 Reddit 使用 ScyllaDB 的一手來源。 |
| 29 | 總結表：現代架構留言存於 Cassandra 寬表 | CONTRADICTED | [CMT]*：留言建立會寫入 "PostgreSQL for persistence, Memcached for caching, and Redis"，報導未提及 Cassandra。 |

### E. Hot Ranking 與 Vote Fuzzing

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 30 | 文字公式 `log10(max(\|U-D\|,1)) + sign(U-D)·(t_post - t_0)/45000` | CONTRADICTED（過時，且與同節程式碼矛盾） | [R2] 2013 版（commit `8af415476b`）是 `round(order + sign * seconds / 45000, 7)`；2014-01-12 commit `50d35de04b`〈Make hot score continuous〉改成 `round(sign * order + seconds / 45000, 7)`。文中文字公式是舊版，下方 Python 卻是新版。 |
| 31 | Python 實作（`1134028003`、`/45000`、`round(...,7)`、epoch 1970） | SUPPORTED | [R2] `r2/lib/db/_sorts.pyx`：`seconds = date - 1134028003`、`return round(sign * order + seconds / 45000, 7)`、`epoch = datetime(1970, 1, 1, tzinfo = g.tz)`。 |
| 32 | 45000 秒＝12.5 小時；每 12.5 小時要多 10 倍淨票才能維持排名 | SUPPORTED | 由 [R2] 公式直接推導（log10 項每 +1 對應 45000 秒）。 |
| 33 | 早期排行榜靠批次 Cron Job 計算 | CONTRADICTED | [NW]：vote queue 會頻繁更新 listing，並在讀改寫時加鎖、依 subreddit ID 分區；[SH]：listing 計算丟到佇列由背景 job 執行。熱門排行是佇列驅動的增量更新，不是 cron。 |
| 34 | 現代用 Flink 串流即時計算 Hot Ranking／投票聚合 | NOT FOUND | Reddit 的 Flink 一手資料只涉及安全／反濫用（見 #44），查無用於 Hot Ranking 或投票聚合。 |
| 35 | Vote fuzzing 存在，目的是讓刷票機器人無法判斷投票是否生效 | NOT FOUND（一手） | 只找到社群貼文與 Daily Dot 引述員工發言；Reddit 說明中心頁面回 403，r2 開源碼搜尋 `fuzz` 0 筆（應屬未開源的反作弊程式碼）。廣為流傳，但本次未取得一手出處。 |
| 36 | 雜訊幅度 ±3% | NOT FOUND | 查無；社群描述是在顯示的讚／倒讚中加減相同票數、淨分不變，與「分數加 ±3% 雜訊」不同，但這些描述也不是一手來源。 |

### F. Baseplate 與現代技術棧

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 37 | Reddit 開源微服務框架 Baseplate | SUPPORTED | [BPG] README："[Baseplate][baseplate.py] implemented in go"；GitHub `reddit/baseplate.py`（已 archived）描述 "reddit's python service framework"。 |
| 38 | Baseplate 支援 Rust | NOT FOUND | reddit 組織的公開 repo 只有 baseplate.py、baseplate.go、baseplate-celery、baseplate.py-upgrader，沒有 Rust 版。另外，文章把 Baseplate 寫成「為了脫離 Python 瓶頸」而開發，但它最初就是 Python 框架。 |
| 39 | 內部通訊用 Thrift／gRPC | SUPPORTED | [BPG] 有 `thriftbp`、`grpcbp` 套件；go.mod 依賴 `github.com/apache/thrift`、`google.golang.org/grpc`。[NW]："Thrift gives us nice, strong schemas"。 |
| 40 | 「全面取代」舊有 HTTP JSON 內部呼叫 | NOT FOUND | 查無；[BPG] 本身也有 `httpbp`。 |
| 41 | 內建 OpenTelemetry 追蹤 | CONTRADICTED | [BPG] `tracing/doc.go`："Package tracing provides tracing integration with zipkin"，並實作 opentracing 介面；go.mod 只有 `opentracing-go`，沒有 OpenTelemetry。 |
| 42 | 內建 Prometheus 指標 | SUPPORTED | [BPG] 有 `prometheusbp` 套件，go.mod 依賴 `prometheus/client_golang`。 |
| 43 | 結構化日誌 | SUPPORTED | [BPG] 有 `log` 套件（無須細究實作）。 |
| 44 | Kafka + Flink 做即時反作弊風控 | SUPPORTED* | [REV2]*：REV2 的 Lua 規則由 Kafka 事件觸發，"Flink Stateful Functions and Reddit's Baseplate application framework execute these Lua rules"。 |
| 45 | 後端技術棧：Python 2 單體 | SUPPORTED | [R2] 為 Pylons 應用，原始碼含 Python 2 語法（如 `raise CreationError, "..."`）；[REV2]* 也提到 REV1 跑在 Python 2.7。 |
| 46 | Python → Go 重構 | SUPPORTED* | [CMT]*：留言功能 "migrating from a legacy Python system to a domain-specific Go microservice"。 |
| 47 | Kubernetes 部署 | SUPPORTED* | [PI]*：2023 年 Pi Day 314 分鐘當機，起因是某叢集從 Kubernetes 1.23 升級到 1.24。 |
| 48 | 圖：「多區域」Kubernetes 部署 | NOT FOUND | 查無多區域的一手說法。 |
| 49 | 圖：毫秒級跨 AZ 故障轉移 | NOT FOUND | 查無。 |
| 50 | 總結表：現代儲存含 Cassandra（投票）＋ Aurora PostgreSQL | SUPPORTED（Cassandra 投票為一手；Aurora 為 *） | 投票：[R2] `vote.py` 的 `VotesByAccount(tdb_cassandra.DenormalizedRelation)`。Aurora：[AUR]* 報導 Reddit 把媒體 metadata 集中到 AWS Aurora Postgres。 |

## 參考連結檢查

| 連結 | 狀態 | 性質 | 能支撐正文哪些主張 |
| --- | --- | --- | --- |
| [Reddit Engineering Blog: Evolution of Reddit Core Storage](https://www.reddit.com/r/RedditEng/) | HTTP 200 | 子版首頁，不是具體文章。搜尋不到名為 "Evolution of Reddit Core Storage" 的貼文，連結文字等於虛構篇名。 | 無法支撐任何具體主張。 |
| [Reddit Open Source: Baseplate.py / Baseplate.go](https://github.com/reddit/baseplate.go) | HTTP 200 | 具體 repo，但只連 baseplate.go（baseplate.py 已 archived，未連）。 | 支撐 #37、#39、#42、#43；反駁 #41（OpenTelemetry），也不支撐 #38（Rust）。 |
| [How Reddit Ranking Algorithms Work (Amir Salihefendic Analysis)](https://moz.com/blog/reddit-stumbleupon-delicious-and-hacker-news-algorithms-exposed) | HTTP 200 | 署名錯誤：實際是 Moz 的〈Reddit, Stumbleupon, Del.icio.us and Hacker News Algorithms Exposed!〉，作者 Danny Dover，2008-07-02 發表，不是 Amir Salihefendic，頁面也沒有他的名字。 | 只解釋 45000 秒＝12.5 小時，屬 2014 年前的舊版公式；不支撐 Python 實作版本，也沒提 vote fuzzing。屬二手來源，一手應改連 `reddit-archive/reddit` 的 `_sorts.pyx`。 |
| [ByteByteGo: Reddit's Core Architecture Visual Guide](https://bytebytego.com/guides/reddit's-core-architecture) | HTTP 404 | 網址含撇號，失效；正確網址 https://bytebytego.com/guides/reddits-core-architecture/ 回 200。內容同 repo 的 `data/guides/reddit's-core-architecture.md`（2024-03-06）。 | 二手。內容只提 Fastly、Postgres＋memcached、Cassandra、Debezium、RabbitMQ、Kafka、AWS＋Kubernetes、Go；完全沒提 Thing2、Redis ZSet、Materialized Path、Flink、Rust、Baseplate，因此也撐不起正文的主架構。 |
| frontmatter `repositoryUrl`: https://github.com/ByteByteGoHq/system-design-101 | HTTP 200 | 第三方 repo | 二手整理，不是 Reddit 的一手來源。 |

## 未能直接取得的來源

reddit.com 擋下 curl 與 WebFetch，Chrome 擴充套件未連線，Wayback 回 429。因此 [CMT]、[PI] 與 RedditEng 的 REV2、Aurora 原文都只能透過 InfoQ 報導或鏡像確認；需要更強的證據時，請用瀏覽器直接開啟原文核對引文。
