# 事實查核：discord-trillions-messages-scylladb-scaling.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/discord-trillions-messages-scylladb-scaling.mdx`，連同 `src/components/DiscordScyllaDbArchitectureDiagram.astro` 的圖解文字
- 公司：Discord（另提及 ScyllaDB）
- 查核日期：2026-10-22
- 方法：證據只採 Discord 官方部落格兩篇一手專文、文中嵌入的官方 gist，以及 Discord 另一篇官方文章（pytest daemon）；ScyllaDB 的技術事實採 seastar.io。ByteByteGo 只當線索。
  - T = “How Discord Stores Trillions of Messages”，Bo Ingram，2023-03-06，https://discord.com/blog/how-discord-stores-trillions-of-messages
  - B = “How Discord Stores Billions of Messages”，Stanislav Vishnevskiy，2017-01-13，https://discord.com/blog/how-discord-stores-billions-of-messages

## 總評：局部修正

文章的骨架和 Discord 原文一致：MongoDB → Cassandra → ScyllaDB 三段演進、`((channel_id, bucket), message_id)` 的 schema、177 → 72 節點、Rust 寫的 data services、以 channel ID 做一致性雜湊路由、request coalescing 的 worker task 訂閱機制、雙寫加 Rust migrator 掃 token range 後 firehose 進 ScyllaDB，這些都找得到原文。

問題集中在幾個最顯眼的數字和年份，而且出現在 description、前言、圖解和總結表這些讀者一定會看到的位置。最嚴重的是「P99 讀取延遲從數十秒降到 15ms」：原文是 Cassandra 上歷史訊息讀取 p99 為 40–125ms，ScyllaDB 為 15ms。「數十秒」只對得上 2016 年單一頻道因墓碑而載入 20 秒、GC 停頓 10 秒的事件，不是 p99。年份也有兩處錯：Cassandra 不是 2017 年才採用（2017 年 1 月的文章說已經切換「just over a year」），ScyllaDB 切換是 2022 年 5 月，不是 2023 年（2023 年是部落格發文時間）。分桶「約 10 天或 1,000 則訊息」的「1,000 則」是誤讀，原文的分桶純粹以時間切。遷移段把「P99 穩定在 15ms 以內」寫成切換前的放行條件，但原文的 15ms 是切換後幾個月的成果。

另外，原文的 data services 是在還跑 Cassandra 時就先上線（“We’re still seeing hot partitions and increased latency on our Cassandra cluster, just not quite as frequently”），文章與總結表把 Rust 服務層和 ScyllaDB 綁成同一次「2023」變更，時序不對。LRU 快取、「O(N) → O(1)、消除 99% 以上重複查詢」、Coordinator 誤判超時引發雪崩、「後續優化至不到一半」等說法在原文找不到。前言稱 ByteByteGo 為「一手工程資料」也不正確，它是二手整理。

統計：SUPPORTED 22、CONTRADICTED 7、NOT FOUND 8。

## 主張逐項查核

### A. 年表與規模

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 2015 年單體 MongoDB，單一資料庫耗盡記憶體與磁碟 I/O（前言第 1 點） | SUPPORTED（有但書） | B：“The original version of Discord was built in just under two months in early 2015… Everything on Discord was stored in a single MongoDB replica set”；“Around November 2015, we reached 100 million stored messages… the data and the index could no longer fit in RAM and latencies started to become unpredictable.” 原文沒有提到「磁碟 I/O 耗盡」。「Discord 自 2015 年創立」宜改為「2015 年上線」。 |
| A2 | Cassandra 是 2017 年採用（前言第 2 點「2017（Apache Cassandra 叢集）」、第一節「在 2017 年，Discord 選擇 Apache Cassandra」、總結表「2017 Apache Cassandra 架構」） | CONTRADICTED | B 發表於 2017-01-13，文中說 “It has now been just over a year since we made the switch”，也就是 2015 年底到 2016 年初就已切換。T 只說 “In 2017, we ran 12 Cassandra nodes, storing billions of messages.” 2017 是第一篇部落格的年份，不是採用年份。 |
| A3 | Cassandra「承載了從數十億到數千億訊息的成長」（前言第 2 點） | CONTRADICTED（輕微） | T：“At the beginning of 2022, it had 177 nodes with trillions of messages.” 是「數兆」，不是「數千億」；文章其他地方又寫「數兆」，前後不一致。 |
| A4 | Cassandra 叢集 177 個節點（前言、第一節、總結表） | SUPPORTED | T：“At the beginning of 2022, it had 177 nodes with trillions of messages.” |
| A5 | ScyllaDB + Rust 架構是「2023」（前言第 3 點、總結表欄名） | CONTRADICTED | T：“We switched our messages database over in May 2022”。2023 年 3 月是 T 的發文日期。 |
| A6 | 讀取 P99 延遲「從數十秒」壓到 15ms 內（description、前言、圖解「P99 延遲: 數十秒 ➔ <15ms」、總結表「偶發飆升至數秒至數十秒」） | CONTRADICTED | T：“fetching historical messages had a p99 of between 40-125ms on Cassandra, with ScyllaDB having a nice and chill 15ms p99 latency, and message insert performance going from 5-70ms p99 on Cassandra, to a steady 5ms p99 on ScyllaDB.” 「數十秒」只對得上 B 記載的 2016 年單一事件（“running 10 second ‘stop-the-world’ GC constantly”、“a Discord channel that was taking 20 seconds to load”），那不是 p99。15ms 本身正確。 |
| A7 | 以 72 台 ScyllaDB 節點取代 177 台 Cassandra（第二節、總結表） | SUPPORTED | T：“we’re going from running 177 Cassandra nodes to just 72 ScyllaDB nodes. Each ScyllaDB node has 9 TB of disk space, up from the average of 4 TB per Cassandra node.” 註：節點變少部分是因為單機磁碟變大，文章「同樣負載下僅用 72 台」沒提到這點。 |
| A8 | 72 台「後續優化至不到一半」／「後續縮減至更少」（第二節、總結表） | NOT FOUND | 原文只有 177 → 72。72 本身就是 177 的不到一半；「後續」再縮減找不到出處。 |
| A9 | 「全球數億用戶」（第四節）、圖解「數千萬在線活躍用戶」、圖解行動版「百萬用戶」、description「百萬併發熱點」 | NOT FOUND | T、B 都沒有這些用戶數或併發數。 |

### B. Cassandra 資料模型

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | `CREATE TABLE messages (channel_id bigint, bucket int, message_id bigint, author_id bigint, content text, PRIMARY KEY ((channel_id, bucket), message_id)) WITH CLUSTERING ORDER BY (message_id DESC);`（第一節） | SUPPORTED | T 嵌入的官方 gist（https://gist.github.com/DiscordBlog/ce8615e96a5002fbaf401678064c0ab8）逐字相同；T：“The CQL statement above is a minimal version of our message schema.” B 的 gist 也相同（https://gist.github.com/vishnevskiy/1c82641eb8a38c8b68108bf17d787768），B 註明 “this omits about 10 columns”。 |
| B2 | 分桶約 10 天，用以限制單一熱門頻道的 partition 膨脹（第一節、圖解） | SUPPORTED | B：“We decided to bucket our messages by time. We looked at the largest channels on Discord and determined if we stored about 10 days of messages within a bucket that we could comfortably stay under 100MB.” gist：`BUCKET_SIZE = 1000 * 60 * 60 * 24 * 10`。T：“a bucket, which is a static time window.” |
| B3 | 分桶依「時間或數量」切分，「約 10 天或 1,000 則訊息」（第一節、圖解「Bucket ID: 10 天/1k則」） | CONTRADICTED | 原文的 bucket 只依時間計算（見 B2 的 gist 與 T 的 “static time window”）。B 裡的 1,000 是另一回事：“In a year, this kind of server is unlikely to reach 1,000 messages”，講的是語音為主的伺服器一年訊息量。 |
| B4 | Snowflake ID 可依時間排序，讀最新訊息只需掃連續磁碟區塊（第一節） | SUPPORTED | T：“Every ID we use is a Snowflake, making it chronologically sortable.” B：“Related data is stored contiguously on disk providing minimum seeks”；“when loading a channel we could tell Cassandra exactly where to range scan for messages.” 「保證全域時間遞增」比原文的 “chronologically sortable” 說得更強。 |

### C. Cassandra 的瓶頸

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | JVM GC 停頓造成延遲飆升（第一節第 1 點） | SUPPORTED | T：“GC pauses would cause significant latency spikes”；“super long consecutive GC pauses that got so bad that an operator would have to manually reboot and babysit the node”。 |
| C2 | 節點 GC 時，Coordinator 誤判超時並把請求轉給其他副本，連鎖引發雪崩式連線堆積（第一節第 1 點） | NOT FOUND | 原文描述的連鎖機制是 hot partition 加 quorum：“Since we perform reads and writes with quorum consistency level, all queries to the nodes that serve the hot partition suffer latency increases”。沒有提到 coordinator 誤判或請求轉發。 |
| C3 | 大量刪除留下墓碑，讀取時掃描墓碑造成記憶體暴漲與 GC 停頓（第一節第 2 點） | SUPPORTED（有但書） | B：“Cassandra had to effectively scan millions of message tombstones (generating garbage faster than the JVM could collect it).” 但書：這是 2016 年 Puzzles & Dragons 頻道的單一事件，B 當時已把墓碑壽命從 10 天降到 2 天並追蹤空 bucket。T 的「Our Cassandra Troubles」沒有把墓碑列為 177 節點時期的問題；T 只在遷移段提到最後幾個 token range 因未壓實的墓碑卡在 99.9999%。文章把它列為「數兆級規模下」的瓶頸，時期不對。 |
| C4 | 壓實落後拖累查詢（第一節第 3 點） | SUPPORTED（有但書） | T：“We were prone to falling behind on compactions… we’d also see cascading latency as a node tried to compact.” 「耗盡 CPU 與 NVMe 磁碟頻寬」找不到出處。 |
| C5 | 維運摩擦極高（第一節第 4 點） | SUPPORTED（有但書） | T：“it was a high-toil system — our on-call team was frequently paged”；“we were having to cut down on maintenance operations that became too expensive to run”；以及 “gossip dance”。「`nodetool repair` 與擴容需要數天甚至數週」找不到出處。 |

另註：T 把 hot partition 列為 Cassandra 時期的首要問題（“Lots of concurrent reads… can hotspot a partition”），文章的「四大致命瓶頸」沒有列入，反而放到第三節當成換 ScyllaDB 之後才要處理的問題。

### D. ScyllaDB 選型

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 首要目標是「在不顛覆既有資料模型與查詢語意的前提下，根除 JVM GC 與資源爭用」（第二節） | NOT FOUND | T 列的理由是：“Its promise of better performance, faster repairs, stronger workload isolation via its shard-per-core architecture, and a garbage collection-free life”。原文也提到 2020 年已先把其他資料庫都遷到 ScyllaDB，以及 ScyllaDB 團隊為 Discord 改善 reverse query，文章都沒寫。 |
| D2 | ScyllaDB 相容 Cassandra／CQL（第二節） | SUPPORTED | T：“ScyllaDB, a Cassandra-compatible database written in C++.” |
| D3 | C++、Seastar、thread-per-core 無共享架構（第二節、圖解） | SUPPORTED | T：“shard-per-core architecture”、“written in C++ rather than Java”。Seastar 不在 Discord 原文中，出自 seastar.io：“Seastar is used in Scylla, a high-performance NoSQL database compatible with Apache Cassandra.” https://seastar.io/ |
| D4 | 沒有 GC（第二節、圖解） | SUPPORTED | T：“it is void of a garbage collector, since it’s written in C++ rather than Java.” |

### E. Rust data services

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | 在 Python API 與資料庫之間插入 Rust 實作的資料服務（第三節、圖解） | SUPPORTED | T：“data services — intermediary services that sit between our API monolith and our database clusters… we chose… Rust!”；“roughly one gRPC endpoint per database query and intentionally contain no business logic.” Python 出自另一篇官方文章：“At Discord, we utilize a Python monolith to power our API”（https://discord.com/blog/pytest-daemon-10x-local-test-iteration-speed，2023-12-08）。 |
| E2 | 依 `Hash(channel_id)` 做一致性雜湊路由，同頻道請求導向同一實例（第三節、圖解） | SUPPORTED | T：“We implemented consistent hash-based routing to our data services… For messages, this is a channel ID, so all requests for the same channel go to the same instance of the service.” |
| E3 | Request coalescing：第一個請求啟動任務，後續請求訂閱，任務查一次資料庫後把結果回給所有訂閱者（第三節、圖解） | SUPPORTED | T：“If multiple users are requesting the same row at the same time, we’ll only query the database once. The first user that makes a request causes a worker task to spin up in the service. Subsequent requests will check for the existence of that task and subscribe to it. That worker task will query the database and return the row to all subscribers.” 註：原文說的是同一個 row；文章程式碼以 `(channel_id, bucket)` 為 key 回傳整串訊息，是作者的延伸。 |
| E4 | 資料服務有本地 LRU 快取／微快取，查詢後寫入快取（第三節程式碼、圖解「LRU 快取與 Bucket 窗口」「本地微快取」） | NOT FOUND | T 沒有提到 data services 有快取。B 甚至寫明當初的需求是 “We also do not want to have to cache messages in Redis or Memcached.” |
| E5 | 使用 Tokio 非同步執行期（第三節、圖解） | SUPPORTED | T：“The Tokio ecosystem is a tremendous foundation for building a system on asynchronous I/O”。 |
| E6 | 把資料庫負載從 `O(N)` 降到 `O(1)`，消除 99% 以上的重複查詢（第三節 TIP、總結表） | NOT FOUND | T 只說 “we’re able to significantly reduce traffic spikes against the database”，沒有量化。 |
| E7 | 情境：Midjourney 等數十萬成員伺服器 `@everyone`，數十萬客戶端同秒送 `GET /channels/{channel_id}/messages?limit=50`；圖解「100k 併發請求」、程式碼「後續 99,999 個請求」 | NOT FOUND | T 只有：“Let’s imagine a big announcement on a large server that notifies @everyone: users are going to open the app and read the message, sending tons of traffic to the database.” Midjourney、API 路徑與 100k 等數字都是作者的示意。 |
| E8 | Rust 服務層與 ScyllaDB 是同一次「2023」變更；總結表把熱點防護歸在 ScyllaDB 架構、Cassandra 架構「無」（前言第 3 點、總結表） | CONTRADICTED | Data services 先在 Cassandra 前面上線：“These improvements help a lot, but they don’t solve all of our problems. We’re still seeing hot partitions and increased latency on our Cassandra cluster, just not quite as frequently. It buys us some time so that we can prepare our new optimal ScyllaDB cluster and execute the migration.” |

### F. 遷移

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| F1 | 雙寫 Cassandra 與 ScyllaDB（第四節第 1 點） | SUPPORTED（有但書） | T：“We begin dual-writing new data to Cassandra and ScyllaDB”。「ScyllaDB 失敗不阻斷主流程」找不到出處。 |
| F2 | 自研 Rust migrator 掃 Cassandra token range，firehose 進 ScyllaDB（第四節第 2 點） | SUPPORTED | T：“we extended our data service library to perform large-scale data migrations. It reads token ranges from a database, checkpoints them locally via SQLite, and then firehoses them into ScyllaDB.” 文章漏掉最有說服力的數字：Spark migrator 估計三個月，Rust 版估計九天，“migrating messages at speeds of up to 3.2 million per second”。 |
| F3 | 把一部分讀取同時送兩邊比對做資料校驗（第四節第 3 點） | SUPPORTED | T：“We performed automated data validation by sending a small percentage of reads to both databases and comparing results”。 |
| F4 | 影子讀為非同步，比對筆數、內容雜湊與延遲，驗證後逐步提高讀取流量百分比（第四節第 3 點） | NOT FOUND | 原文沒有這些細節。原文反而說 Rust migrator 夠快之後就放棄分階段方案：“we can forget our complicated time-based approach and instead flip the switch for everything at once”，最後 “flipped the switch to make ScyllaDB the primary database”。 |
| F5 | 「在 ScyllaDB P99 穩定在 15ms 以內後」才切換主流量（第四節第 4 點） | CONTRADICTED | 15ms 是 T 在「Several Months Later…」一節報告的切換後成果。切換前的依據是：“The cluster held up well with full production traffic, whereas Cassandra was suffering increasingly frequent latency issues.” |
| F6 | 零停機遷移數兆筆資料（第四節） | SUPPORTED | T：“we need to migrate trillions of messages with no downtime”。 |
| F7 | 儲存層用 Super-Disk + RAID（圖解「NVMe Super-Disk + RAID」） | SUPPORTED（有但書） | T：“we provision a new ScyllaDB cluster using our super-disk storage topology. By using Local SSDs for speed and leveraging RAID to mirror our data to a persistent disk”。原文說 Local SSD，沒有說 NVMe。 |

## 參考連結檢查

| 連結（位置） | 狀態 | 是否支撐正文 |
|---|---|---|
| https://discord.com/blog/how-discord-stores-trillions-of-messages（前言、參考資料） | 200；篇名相符；作者 Bo Ingram，2023-03-06 | 支撐 2022 年的 177 節點、data services、coalescing、一致性雜湊、遷移與 72 節點／15ms。是正文主要依據，但 A5、A6、E8、F5 與它衝突。 |
| https://discord.com/blog/how-discord-stores-billions-of-messages（參考資料） | 200；篇名相符；作者 Stanislav Vishnevskiy，2017-01-13 | 支撐 MongoDB 時期、schema、10 天分桶、墓碑事件。A2 的「2017 年採用 Cassandra」與它衝突。 |
| https://github.com/ByteByteGoHq/system-design-101（前言、參考資料、frontmatter `repositoryUrl`） | 200；repo 首頁 | 參考資料把它標成「System Design 101: How Discord Stores Trillions of Messages」，但連到的是 repo 首頁；README 第 107 行才有同名條目，實際連到 https://bytebytego.com/guides/how-discord-stores-trillions-of-messages 。這是二手整理，前言稱它為「一手工程資料」不正確。該頁的數字（177 節點、40–125ms → 15ms）與 Discord 原文一致，所以文章的「數十秒」與「2023」也不是從這裡來的。 |

## 修正建議（供作者參考，本次不改文）

1. 把 description、前言、圖解 tag、總結表的「P99 數十秒 → 15ms」改成「歷史訊息讀取 p99 從 40–125ms 降到 15ms，寫入 p99 從 5–70ms 降到 5ms」。10 秒 GC、20 秒載入要提的話，標明是 2016 年的單一墓碑事件。
2. 年份：Cassandra 改成「2015 年底至 2016 年初採用」；ScyllaDB 切換改成「2022 年 5 月」，總結表欄名一併修正；前言「數千億」改成「數兆」。
3. 分桶拿掉「或 1,000 則訊息」，圖解的「10 天/1k則」改成「10 天」。
4. 把 Rust data services 的時序改正：先在 Cassandra 前上線、緩解 hot partition 但沒根治，之後才遷移。總結表的「熱點防護」不要歸給 ScyllaDB。也建議把 hot partition 補回 Cassandra 的瓶頸清單。
5. 第四節拿掉「P99 穩定在 15ms 後才切換」與「逐步提升讀取流量百分比」，改成原文的「小比例讀取雙送比對，全量流量下表現穩定後一次切換」。可補上 Spark 三個月 → Rust 九天、每秒 320 萬筆、卡在 99.9999% 的墓碑插曲。
6. LRU 快取、`O(N) → O(1)`、99%、Coordinator 雪崩、「後續縮減至更少」、Midjourney、用戶數等，要嘛刪掉，要嘛明確標為作者的示意或推論。程式碼的 LRU 快取與原文 data services 不符，建議拿掉或另外註明。
7. 72 節點補上「單機磁碟從平均 4 TB 增加到 9 TB」，免得讀者以為同規格機器少了一半。
8. 前言把 ByteByteGo 改稱二手整理；參考資料的 ByteByteGo 連結改指向該條目頁，或直接刪除。
