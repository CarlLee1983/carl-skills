# 事實查核：netflix-hierarchical-caching-push-messaging.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/netflix-hierarchical-caching-push-messaging.mdx`（含 `src/components/NetflixCachingPushDiagram.astro` 的 SVG `<text>` 與行動版文字）
- 查核日期：2026-10-22
- 範圍：只查歸給 Netflix 的具體主張；泛用教科書知識不查。本報告只查核，沒有改動文章。

## 總評：局部修正

主架構有出處：Zuul Push 長連線叢集、WebSocket／SSE、Push Registry、Goldilocks 策略、依開放連線數擴展、EVCache（Memcached、跨 AZ 寫多份、本地 AZ 讀、Ketama 一致性雜湊、zone fallback）、RENO、Slow-Fast 通知架構，都能在 Netflix 一手來源找到。和麥當勞那篇「主架構虛構」的情況不同。

不過有三類問題必須修正：

1. **第三節整段 XFetch 沒有出處。** 「Netflix 採用 XFetch」在 Netflix 部落格、演講與 EVCache 原始碼都找不到。這個演算法出自 Vattani 等人 2015 年的 VLDB 論文，不是 Netflix 的作法；文中「永遠只有一個請求刷新」的說法也和演算法本身矛盾。這一節出現在正文、比較表與架構圖，等於一整根支柱沒有依據。
2. **推播派送流程和一手來源矛盾。** 文章說「RENO 查 Registry 後透過 gRPC 直接投遞給 Zuul」。Netflix 2018 年的演講架構是 Push Library → Kafka 佇列 → Message Processor 查 Registry → 投遞；RENO 文章只說它用 Zuul 維護的 registry 過濾在線裝置。gRPC 在所有來源都沒有出現。
3. **多數數字沒有出處。** 包括 200 ms 渲染、EVCache 讀取低於 1 ms、`m4.large`、50,000 條執行緒；事件範例「好友觀影邀請、新集數上架」也和 RENO 列出的事件類型不符。

另外，參考連結有兩條只指向 netflixtechblog.com 首頁，掛的標題在部落格上並不存在（詳見最後一節）。

統計：SUPPORTED 17 項、CONTRADICTED 2 項、NOT FOUND 13 項，共 32 項。

## 一手來源清單

| 代號 | 來源 | 類型 | 取得方式 |
| --- | --- | --- | --- |
| S1 | Susheel Aroskar，〈How we scaled push messaging for millions of Netflix devices〉，QCon New York 2018 投影片：https://archive.qconnewyork.com/system/files/presentation-slides/final_qcon_ny_-_zuul_push_presentation.pdf | Netflix 工程師官方演講 | 下載 PDF 後抽出全文（站台憑證已過期） |
| S2 | InfoQ 演講頁〈Scaling Push Messaging for Millions of Devices @Netflix〉，2018-08-14：https://www.infoq.com/presentations/neflix-push-messaging-scale/ | 同一場演講的影片頁（頁面沒有逐字稿） | curl |
| S3 | Netflix TechBlog〈Pushy to the Limit: Evolving Netflix's WebSocket proxy for the future〉，2024-09：https://netflixtechblog.com/pushy-to-the-limit-evolving-netflixs-websocket-proxy-for-the-future-b468bc0ff658 | Netflix 官方部落格 | 原站對 curl 回 403，全文改從逐字轉載站 noise.getoto.net 讀取 |
| S4 | Netflix TechBlog〈Rapid Event Notification System at Netflix〉，2022-02（Ankush Gulati、David Gevorkyan）：https://netflixtechblog.com/rapid-event-notification-system-at-netflix-6deb1d2b57d1 | Netflix 官方部落格 | 同 S3，經轉載站讀取 |
| S5 | Netflix TechBlog〈Thinking Fast & Slow for a Personalized Notification System〉，2026-06（Matthew Wood 等）：https://medium.com/netflix-techblog/thinking-fast-slow-for-a-personalized-notification-system-4d89b26525cd | Netflix 官方部落格 | 同 S3，經轉載站讀取 |
| S6 | Netflix/EVCache GitHub README 與 Wiki：https://github.com/Netflix/EVCache 、https://github.com/Netflix/EVCache/wiki | Netflix 官方 repo | curl；另外 clone 了 repo 搜尋原始碼 |
| S7 | Netflix/zuul GitHub 原始碼，`zuul-core/.../netty/server/push/PushProtocol.java`：https://github.com/Netflix/zuul | Netflix 官方 repo | 淺層 clone 後 grep |
| S8 | Netflix Q4 2023 股東信（SEC 8-K Ex.99.1）：https://www.sec.gov/Archives/edgar/data/1065280/000106528024000029/ex991_q423.htm | 官方財報 | curl |
| S9 | QCon London 2014，Ruslan Meshenberg（Netflix）〈How Netflix Leverages Multiple Regions to Increase Availability: An Active-Active Case Study〉摘要 | Netflix 工程師官方演講 | 只讀到搜尋摘要 |

S3、S4、S5 的原站 netflixtechblog.com 擋掉了指令列抓取，所以全文從 noise.getoto.net 的逐字轉載讀取，轉載頁有標明原文 URL。引文應和原文一致，但嚴格來說這是轉載，不是直接從原站讀到的。

二手線索（只當線索，不當證據）包括：InfoQ 新聞 2018/07（Srini Penchikala）、computingbytes.substack.com 的演講筆記、ByteByteGo〈4 Ways Netflix Uses Caching to Hold User Attention〉。

## 逐項主張

### 開場與 frontmatter

| # | 主張（文章位置） | 判定 | 依據 |
| --- | --- | --- | --- |
| 1 | 「超過 2.6 億付費訂閱用戶」（首段） | SUPPORTED（數字已過時） | S8：「Global Streaming Paid Memberships … 260.28」（Q4 2023）。Q4 2024 已達約 301.6M（二手報導：Motley Fool、Nasdaq），而且 Netflix 從 2025 年起不再每季公布訂閱數。文章發表於 2026-09，用 2.6 億偏舊。 |
| 2 | 打開智慧電視時，個人化片單「必須在 200 毫秒內完成渲染」 | NOT FOUND | 查過的 Netflix 來源都沒有 200 ms 這個指標。 |
| 3 | 手機點擊播放後，電視端立即同步播放進度 | SUPPORTED（寬鬆） | S4 把「Viewing Activity」列為事件來源，要求跨裝置即時反映；S3 也提到 phone-as-controller 與 Companion Mode 的裝置對裝置訊息。不過沒有任何來源描述「手機點播、電視同步進度」這個具體情境。 |
| 4 | Zuul Push 在邊緣維護「數千萬條」常駐連線（首段、圖 `<desc>`「數千萬智慧電視」） | SUPPORTED（已過時，而且名稱已改） | S3：「Over the last five years, Pushy has gone from tens of millions of concurrent connections to hundreds of millions of concurrent connections」。S2 的 2018 摘要則說「millions of "always-on" persistent connections」。現在的系統名稱是 Pushy，規模是數億條連線。 |

### 一、Zuul Push

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 5 | iOS／Android 走 APNs／FCM；電視、串流裝置、瀏覽器改用 Zuul Push | SUPPORTED | S4：「For notifications to web, TV & other streaming devices, we use a homegrown push notification solution called Zuul Push」；行動裝置的最後一哩走 APNS 與 FCM。 |
| 6 | 用長連線取代每隔數秒一次的輪詢（含圖中「取代輪詢 (No Polling)」） | SUPPORTED（「數億次無效請求」這個數字 NOT FOUND） | S3：「the TV UI would continuously poll a backend service … These requests would happen every few seconds」；S1：「thin (by getting rid of polling)」。 |
| 7 | 裝置建立 WebSocket 或 SSE 長連線 | SUPPORTED | S1 架構圖標「WebSockets / SSE」；S7 的 `PushProtocol` enum 只有 `WEBSOCKET` 與 `SSE` 兩個值。 |
| 8 | 裝置連到「距離最近的」Zuul Push 節點 | NOT FOUND | S1 只說 ELB 不能代理 WebSocket，所以改用 TCP 模式（「Run ELB as a TCP load balancer」），沒有提到就近路由。 |
| 9 | 連線成功後由 Zuul 節點寫入 Push Registry | SUPPORTED | S1：「Push Registry — Tracking clients' connection Metadata in real-time」，架構圖箭頭標「Register User」，範例程式碼 `registerClient(...) … storeInRedis(auth)`。 |
| 10 | Registry 的鍵值是 `(AccountID, DeviceID) ➔ ZuulServerNodeIP`（圖中寫成「Client ID ➔ Zuul Server Node」） | NOT FOUND（具體鍵值） | 方向大致正確。S3：「the Push library will look up the Pushy connected to the target device in the Push Registry」。但沒有來源寫出 AccountID／DeviceID／IP 這種鍵值結構。補充：S1 寫明後端儲存是「Redis … Dynomite」，S3 說後來遷移到 KeyValue，文章完全沒提。 |
| 11 | 「通知中心（RENO）查詢 Registry 取得目標節點 IP，隨後透過 gRPC 直接將事件投遞給該台 Zuul 伺服器」 | **CONTRADICTED** | S1 的架構是 Push Library → Message Queue →（Message Processor）「Lookup server」→「Deliver message」，而且「We use Kafka message queues to decouple message senders from receivers … Fire and Forget」。查 Registry、投遞訊息的是 Message Processor，不是 RENO。S4 只說 RENO 用 registry 判斷裝置是否在線：「notifications are sent only to devices that are currently online by leveraging an existing registry that is kept up-to-date by Zuul」。S3 提到 2024 年後新增的 direct push 由 Push library 查 Registry 後直送，但送出方是 Push library，不是 RENO。gRPC 在 S1、S3、S4、S7 都沒有出現。 |
| 12 | 事件範例：「好友觀影邀請、新集數上架」 | NOT FOUND | S4 列出的事件是 Viewing Activity、Personalized Recommendation Refresh、Membership Plan Changes、Member "My List" Updates、Member Profile Changes、System Diagnostic Signals，沒有好友邀請或新集數上架。 |
| 13 | Goldilocks 原則：放棄超大型機器，改用大量輕量實例（含圖中「大量輕量節點」） | SUPPORTED（框架偏差） | S1：「Goldilocks strategy — Optimize for cost, NOT instance count」、「More number of smaller servers >> few BIG servers」。但 Goldilocks 的原意是「不大不小、成本最佳」，並不是越小越好。S3 也說 Netflix 後來把每節點目標從約 60,000 提高到約 200,000 條連線。 |
| 14 | 單機維持 100 萬條連線，一旦崩潰會引發驚群重連 | SUPPORTED | S3：「We could have a million connections per instance, but a down node would lead to a thundering herd of a million devices reconnecting at the same time.」 |
| 15 | 使用 AWS `m4.large` 這類實例 | NOT FOUND（一手來源） | S1 投影片沒有實例型號。二手的 computingbytes 筆記說演講中提到「m4.large … 84k concurrent connections」，但我沒能取得演講逐字稿或影片內容（S2 頁面沒有逐字稿），無法確認。 |
| 16 | 依「Current Open Connections」自動擴展，不看 CPU 或 RPS | SUPPORTED | S1：「How to auto-scale? RPS? CPU?? Open Connections」、「Auto-scale on number of open connections per box」；S3：「scale exponentially; the farther we are past our target average connection count, the more instances we'll add」。 |

### 二、EVCache

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 17 | EVCache 全名 Ephemeral Volatile Cache，以 Memcached 為基礎 | SUPPORTED | S6 README：「EVCache is a memcached & spymemcached based caching solution」，並逐字列出 Ephemeral／Volatile／Cache 三個字的意思。 |
| 18 | 單次首頁載入要聚合數十種推薦模型；如果讀取全部打到 Cassandra，資料庫會撐不住 | NOT FOUND（一手來源） | 只有二手的 ByteByteGo guide 寫到 EVCache 作為 look-aside、miss 時回 Cassandra，以及每晚預先算好的首頁存在 EVCache。「數十種推薦模型」沒有出處。 |
| 19 | 同一 Region 的每個 AZ 各有一份副本；寫入時送到所有 AZ，讀取只讀本地 AZ | SUPPORTED（「同步」沒有依據） | S6 Wiki：「all the reads by a client are sent to the same zone whereas the writes are done on both the zones … Since the data is always read from the local zone this improves the latency」。Wiki 描述的是同一個 cluster 在各 zone 都有副本，不是「各自獨立的叢集」；也沒說寫入是同步。 |
| 20 | 讀取延遲低於 1 毫秒、「亞毫秒級」（正文與圖） | NOT FOUND | S6 只說「improves the latency」。Netflix 的 Josh Evans 在 QCon London 2016 的投影片摘要寫的是「milliseconds of latency per request」（只讀到搜尋摘要）。沒有來源寫出低於 1 ms。 |
| 21 | 客戶端內建一致性雜湊；節點無回應時改讀另一個 AZ 的副本 | SUPPORTED | S6 Wiki：「sharded across the cluster within the same zone based on Ketama consistent hashing algorithm」、「If zone fallback is enabled …」；README：「Operations have topological awareness, retries, fallbacks」。 |
| 22 | 比較表：「EVCache 跨 AZ **異步**複製與本域讀取」 | NOT FOUND（並且和正文自相矛盾） | 正文寫「寫入時**同步**廣播至所有 AZ」，表格卻寫「異步」。S6 沒有說明跨 AZ 寫入是同步還是非同步；README 的「Transparent nearline global data replication」講的是跨 Region，不是跨 AZ。 |

### 三、XFetch

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 23 | 「Netflix 採用了 XFetch 機率性提前更新演算法」（正文、比較表、圖中「XFetch 演算法：機率性提前失效防止雪崩」） | NOT FOUND | S1、S3、S4、S6 都沒有提到。在 clone 下來的 Netflix/EVCache 原始碼裡 grep `xfetch`、`stampede`、`early expir`、`probabilistic`，零結果。網路搜尋也找不到任何 Netflix 來源把 XFetch 和 EVCache 連在一起。XFetch 出自 Vattani、Chierichetti、Lowenstein 2015 年的 VLDB 論文〈Optimal Probabilistic Cache Stampede Prevention〉。 |
| 24 | 情境：「Top 10 熱門片單」快取到期，瞬間有 50,000 條微服務執行緒同時湧入 | NOT FOUND | 沒有 Netflix 來源。這是一個假設情境，文中卻用 Netflix 的口吻敘述，沒有標明是假設。 |
| 25 | XFetch「保證永遠只有一個幸運的請求在背景完成資料刷新…徹底消除快取擊穿」 | **CONTRADICTED** | 依原論文與常見實作，XFetch 是每個讀取者各自以機率決定要不要提早重算，不保證只有一個請求重算，也不是背景非同步更新；它降低的是 stampede 的機率，並不能「徹底消除」。順帶一提，公式寫成 `P(Refresh) = … > TTL_remaining` 混淆了機率和布林條件：原式是條件判斷 `now − δ·β·ln(rand()) ≥ expiry`。 |

### 四、Slow-Fast 與圖中後端區塊

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 26 | Netflix 有一套 Slow-Fast 雙層通知決策架構 | SUPPORTED | S5：「a hierarchical system where a "slow" policy makes strategic, personalized decisions about a member's weekly messaging plan … while a "fast" policy handles the tactical, real-time decisions」。 |
| 27 | Slow 評估通知疲勞度，限制每位用戶每週的推播頻率 | SUPPORTED（「每天」與「離線與準即時模型」沒有依據） | S5：「define a personalized pacing of messages over a defined time horizon」、「actions that independently specify push and email frequencies」、「Negative Signals: Capturing the likelihood of member fatigue or a propensity to opt out」。 |
| 28 | Fast 在「數十毫秒內」依用戶狀態、設備類型與最新內容挑選通知標題與圖片（含圖中「Fast: 毫秒級內容選擇」） | NOT FOUND | S5 只說 Fast 負責「maximize immediate relevance and select the optimal message」，而且是「Every day, when a notification opportunity arises」。沒有毫秒等級的延遲數字，也沒有提到標題、圖片或設備類型。 |
| 29 | 圖中把「RENO 事件分發與 Slow-Fast 決策」畫成同一個後端引擎，Slow-Fast 管的是 Zuul Push 推播 | NOT FOUND | S5 的對象是 push、email、in-app 等行銷與推薦通知；S4 的 RENO 管的是跨裝置狀態同步事件。沒有任何來源把兩者串在一起，文章把兩套不同系統混在一起了。 |
| 30 | 多區域雙活（Active-Active）（圖） | SUPPORTED | S9：Netflix 的 Ruslan Meshenberg 在 QCon London 2014 談 Active-Active 多區域部署（只讀到摘要）。 |
| 31 | 跨區 Cassandra 異步複製（圖） | NOT FOUND（未直接查證） | 搜尋結果只有二手報導（TechRepublic、cassandra.link），沒有讀到 Netflix 一手原文。 |
| 32 | 去重與優先級調度（圖中放在 Slow-Fast 方塊裡） | SUPPORTED（位置放錯） | S4 是 RENO 的設計：「Event Prioritization」、priority-based queues、「duplicate events are merged」。這是 RENO 的功能，不屬於 Slow-Fast。 |

## 參考連結檢查

| 文中連結 | 實際 URL | 狀態 | 是首頁還是具體文章 | 能否支撐正文 |
| --- | --- | --- | --- | --- |
| Netflix Technology Blog: *How Netflix Scales Push Messaging for Millions of Devices* | `https://netflixtechblog.com/` | 網站存在（curl 回 403，屬於擋爬蟲，瀏覽器可以開） | **首頁** | 不能。部落格上找不到這個標題。最接近的是 QCon NY 2018 演講〈Scaling Push Messaging for Millions of Devices @Netflix〉（S2，投影片 S1），它可以支撐 #7、#9、#13、#16；部落格文章〈Pushy to the Limit〉（S3）可以支撐 #4、#6、#14、#16。建議改連 S2 和 S3。 |
| Netflix Technology Blog: *EVCache: Distributed in-memory datastore for Netflix* | `https://netflixtechblog.com/` | 同上 | **首頁** | 不能。真實標題是 2013 年的〈Announcing EVCache: Distributed in-memory datastore for Cloud〉（medium.com/netflix-techblog/announcing-evcache-distributed-in-memory-datastore-for-cloud-c26a698c27f7，由 EVCache README 引用；我沒有讀到原文）。標題被改成「for Netflix」。可以支撐 #17、#19、#21 的是 S6 的 Wiki。 |
| ByteByteGo: *System Design 101: 4 Ways Netflix Uses Caching* | `https://github.com/ByteByteGoHq/system-design-101` | 200 | **repo 首頁** | 部分可以。repo 內有條目〈4 Ways Netflix Uses Caching to Hold User Attention〉（bytebytego.com/guides/4-ways-netflix-uses-caching-to-hold-user-attention），只能支撐 EVCache 作為 look-aside、transient store、primary store 等用途（和 #18 相關）。它是二手整理，**沒有**提到 Zuul Push、XFetch、Goldilocks、Slow-Fast、200 ms 或亞毫秒。 |
| 正文首段的兩個連結 | 同上兩個首頁 | 同上 | 首頁 | 同上 |
| frontmatter `repositoryUrl` | ByteByteGo repo | 200 | — | 這個欄位通常指向作者自己的範例 repo；指向第三方 repo 容易讓人以為那是原始碼出處。建議確認這個欄位的用途。 |

## 建議修正方向（只供參考，未改動文章）

1. 刪掉第三節的 XFetch，或改寫成「業界常見作法（Vattani et al., 2015）」，不要歸給 Netflix；比較表和圖中的 XFetch 字樣也要一起移除。
2. 把派送流程改成來源描述的版本：Push Library → Kafka → Message Processor 查 Registry → 投遞；刪掉 gRPC，以及「RENO 直接查 Registry」的說法。
3. 刪掉沒有出處的數字，或改成有出處的數字：200 ms、低於 1 ms、`m4.large`、50,000 條執行緒、數億次請求。
4. 更新規模與名稱：Zuul Push 已演進成 Pushy，現在是數億條連線，每節點約 200,000 條。
5. 事件範例改用 RENO 文中列出的類型。
6. 把 Slow-Fast 和 RENO 分開描述。
7. 修正 EVCache 跨 AZ 複製「同步」和「異步」前後矛盾的寫法。
8. 參考連結改成具體文章：S1／S2、S3、S4、S5、S6。
