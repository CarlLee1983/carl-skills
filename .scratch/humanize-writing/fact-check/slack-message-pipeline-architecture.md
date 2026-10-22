# 事實查核：slack-message-pipeline-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/slack-message-pipeline-architecture.mdx`
- 圖解：`/Users/carl/Dev/Carl/CarlStack/src/components/SlackMessagePipelineDiagram.astro`（連同文內三張 inline SVG 的文字）
- 公司：Slack
- 查核日期：2026-10-22
- 方法：只採 Slack 官方工程部落格（slack.engineering）與官方開發者文件（docs.slack.dev）作為證據；ByteByteGo、InfoQ 等整理只當線索。

## 總評：未通過

文章的骨架有一手出處：Slack 確實有自研、以一致性雜湊分配頻道的 Channel Server，有 Envoy 做 TLS 終結並把 WebSocket 轉給 Gateway Server，有 Presence Server，MySQL 跑在 Vitess 後面，也確實在邊緣 PoP 部署過 Flannel。問題出在這些名詞之間的接法與細節，很多跟原文對不上，或是原文根本沒寫。

最大的三處錯誤：第一，文章說 Vitess 以 `workspace_id` 當一級分片鍵，但 Slack 的 Vitess 專文講的正好相反：按 workspace 分片是舊架構，造成熱點與單一分片撐不住大客戶，搬上 Vitess 的目標之一是改按 channel ID 分片訊息資料。第二，全球延遲寫成「不到 100 毫秒」，Slack 原文寫的是 500ms。第三，Channel Server 的職責寫錯：文中說它「持有成員在線清單與 Gateway 映射」，並多出一個 Slack 沒有的「Channel Router」；原文是 Channel Server 存頻道歷史，使用者資訊與 WebSocket 訂閱在 Gateway Server，在線狀態在 Presence Server，路由由 Admin Server 依 CHARMs 管理的雜湊環決定。

此外，大量具體數字與機制在 Slack 一手資料裡找不到：Flannel `< 2ms` 與 95% 命中率、30 秒 Ping/Pong、500ms／30s 抖動退避、30 天冷熱分層、Delta Sync 的 500 筆門檻與 `last_read_ts`、「節省 90% 以上內部封包」、Message Server 寫入 Kafka 事件日誌等。時期也被混在一起：Flannel 文是 2017 年，即時訊息架構文是 2023 年，2023 年的文章沒有提到 Flannel，文章卻用現在式把兩者畫成同一條路徑（「Flannel 常駐在 Edge Gateway 旁」「訂閱 Channel Server 變更事件」）。

參考連結方面，Vitess 那條連到 vitess.io 的通用頁，而且已經 404，篇名「Vitess at Slack」也不是該頁；「Real-time Messaging Architecture at Scale」連到 slack.engineering 首頁，不是那篇文章。

統計：SUPPORTED 6、CONTRADICTED 5、NOT FOUND 19。

## 主張逐項查核

### A. 連線層

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | Slack 早期靠 Long Polling，之後重構成 WebSocket（第 1 節開頭） | NOT FOUND | 兩篇一手文都沒提 Long Polling。2017 年 Flannel 文描述的已經是 WebSocket 加 `rtm.start` 的流程。https://slack.engineering/flannel-an-application-level-edge-cache-to-make-slack-scale/ |
| A2 | 客戶端經邊緣 Envoy 做 TLS 終結，再轉進 Gateway；Gateway 分布多地區（第 1.1 節、全景圖「Edge Gateway (Envoy)」「地理路由」） | SUPPORTED | Real-time Messaging（2023-04-11）：Envoy 用於 load balancing 與 TLS termination，並把客戶端 WebSocket 連線轉給 GS；“Unlike all other servers, GSs are deployed across multiple geographical regions.” https://slack.engineering/real-time-messaging/ 。註：原文沒說 Envoy 在「全球 PoP」，部署多地區的是 GS。 |
| A3 | Edge Envoy 與內部核心建立長期 TCP／gRPC 連線池；圖中「Gateway Ingress Tier ➔ Channel Server」走 gRPC（第 1.1 節 SVG 與條列） | NOT FOUND | 一手文沒有提到 gRPC、連線池或「Ingress Tier」。 |
| A4 | 每 30 秒一次 Application-level Ping/Pong（第 1.1 節） | NOT FOUND | 一手文沒有心跳間隔。 |
| A5 | Slack 客戶端實作 Full Jitter 指數退避，base 500ms、上限 30s（第 1.2 節，程式碼標「Slack Client 抖動重連邏輯範例」） | NOT FOUND | slack.engineering 找不到客戶端重連演算法的文章。500ms／30s 與通用 WebSocket 教學的建議值相同，應是通用寫法套上 Slack 名義。 |

### B. 寫入與時序

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 客戶端產生 `client_msg_id`，樂觀 UI 先渲染為 `sending`，回執後改 `sent`（第 2.1 節） | NOT FOUND | `client_msg_id` 確實是訊息事件的選填欄位（Node SDK `GenericMessageEvent`，https://docs.slack.dev/tools/node-slack-sdk/reference/web-api/interfaces/GenericMessageEvent ），但 `sending`／`sent` 狀態流程沒有一手出處。 |
| B2 | Slack 用「精確到微秒的時間戳」當訊息唯一識別碼與排序依據（第 2.2 節） | CONTRADICTED | 官方文件：“The `ts` value is essentially the ID of the message, guaranteed unique within the context of a channel or conversation.”；“They _look like_ UNIX/epoch timestamps… But they're actually message IDs, even if they're partially composed in seconds-since-the-epoch.” https://docs.slack.dev/messaging/retrieving-messages 。官方明說它不是真正的時間戳，唯一性只在頻道內。 |
| B3 | 序列生成器在同一微秒衝突時強制遞增微秒位數，保證「全域單調遞增」與因果一致性；全景圖「生成全域單調遞增 Msg ID」（第 2.2 節 IMPORTANT 框、全景圖、第 6 節表） | NOT FOUND | 一手資料沒有描述 `ts` 的產生機制。官方只保證頻道內唯一，「全域單調遞增」超出官方說法。SQL schema 文中已標「示意」，不另計。 |

### C. 頻道扇出

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | Slack 自研 Channel Server 叢集，頻道以一致性雜湊分配到節點（第 3.2 節） | SUPPORTED | Real-time Messaging：Channel ID 經雜湊對應到唯一 CS，由 CHARMs（consistent hash ring managers）管理；“At peak times, about 16 million channels are served per host.” https://slack.engineering/real-time-messaging/ |
| C2 | 由「Channel Router（一致性雜湊）」把訊息路由到 Channel Server（第 3.2 節 SVG） | CONTRADICTED | 原文的路徑是 Webapp → Admin Server（AS）→ 依雜湊環找到 CS；雜湊環由 CHARMs 管理，設定透過 Consul 取得。沒有 Channel Router 這個元件。同上 URL。 |
| C3 | Channel Server 持有頻道「在線成員狀態、訂閱清單與 Gateway 映射」（第 3.2 節 SVG 與條列 1） | CONTRADICTED | 原文：CS 是存放 channel history 的有狀態記憶體服務；GS 存 user information 與 WebSocket subscriptions；在線狀態由 Presence Servers 追蹤。同上 URL。 |
| C4 | Channel Server 把同一台 Gateway 上的成員合併成一次 RPC，「節省 90% 以上內部網路封包」（第 3.2 節條列 2、SVG） | NOT FOUND | 原文確實是 CS 送給每台訂閱該頻道的 GS，再由 GS 送給自己的客戶端，所以「按 Gateway 扇出」的形狀有依據；但原文沒用 batching 的說法，90% 沒有出處。 |
| C5 | 「為什麼不用 Redis Pub/Sub」的理由（第 3.1 節） | NOT FOUND | Slack 一手文沒有拿 Redis Pub/Sub 比較。這段是作者的推論，卻寫成 Slack 的設計理由。 |
| C6 | Channel Server 把離線成員交給 Push Notification 服務（APNs／FCM）（第 3.2 節 SVG、全景圖） | NOT FOUND | 一手資料只說推播通知走 job queue：“every Slack message post, push notification, URL unfurl, calendar reminder, and billing calculation”（Scaling Slack's Job Queue，2017-12-06）https://slack.engineering/scaling-slacks-job-queue/ 。沒說由 CS 觸發。 |

### D. 儲存

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 核心資料庫建在 MySQL 上，透過 Vitess 治理分片（第 4.1 節） | SUPPORTED | Scaling Datastores at Slack with Vitess（2020-12-01）：“Vitess now serves 99% of our overall query load”。https://slack.engineering/scaling-datastores-at-slack-with-vitess/ 。註：99% 是 2020 年的數字。 |
| D2 | 以 `workspace_id` 當一級分片鍵，同團隊資料落在同一分片；第 6 節表「Vitess MySQL 分片（按 Workspace 隔離）」 | CONTRADICTED | 同上文：按 workspace 分片是 Vitess 之前的舊架構，問題包括大客戶的分片 “reached the largest available hardware” 與 “We found that we were hitting some major hotspots”；搬上 Vitess 時 “we wanted to shard the message data by the unique id of the channel.” 文章把舊方案寫成 Vitess 的做法。 |
| D3 | 近 30 天訊息在 SSD 節點，歷史訊息非同步搬到壓縮歸檔（第 4.1 節） | NOT FOUND | Vitess 文沒有提冷熱分層、30 天或 SSD。 |
| D4 | 「支援數千億筆訊息儲存」（第 6 節表） | NOT FOUND | 沒有一手數字。Vitess 文給的是 2.3M QPS 尖峰、median 2ms、p99 11ms。 |

### E. Flannel

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | Slack 開發了部署在邊緣的 Flannel 快取（第 4.2 節） | SUPPORTED | Flannel 文（Bing Wei，2017-05-31）：Flannel 是 application-level edge cache，“deployed to our edge points-of-presence”。https://slack.engineering/flannel-an-application-level-edge-cache-to-make-slack-scale/ 。註：這是 2017 年的架構，2023 年的 Real-time Messaging 文沒有提到 Flannel，文章用現在式描述，應註明年份。 |
| E2 | 讀取延遲：直查 MySQL 15–50ms，Flannel `< 2ms`（第 4.2 節表） | NOT FOUND | Flannel 文沒有延遲數字。原文給的數字是 4M 同時連線、600K client QPS，以及 1.5K 人團隊資料量減少 7 倍、32K 人團隊減少 44 倍。 |
| E3 | Flannel 快取成員清單、頻道列表、自訂 Emoji 與常用元資料（第 4.2 節） | SUPPORTED（Emoji 除外） | 原文：快取 “relevant data of users, channels, bots, and more”。Emoji 沒有提到。 |
| E4 | 95% 以上客戶端初始載入請求在邊緣命中（第 4.2 節） | NOT FOUND | 原文沒有命中率。 |
| E5 | Flannel 訂閱 Channel Server 變更事件主動更新（第 4.2 節表） | NOT FOUND | 原文：Flannel 對主 AWS 區的 Slack 伺服器開一條 WebSocket，“consuming real-time events” 保持更新；沒有指名 Channel Server。 |
| E6 | Flannel「常駐在 Edge Gateway 旁」，並由 Gateway＋Flannel 計算重連缺口（第 4.2 節、第 5.1 節 SVG） | NOT FOUND | Flannel 文沒有 Gateway 元件；客戶端直接連 Flannel。2023 年文的 Gateway Server 與 2017 年的 Flannel 被拼在同一條路徑上，兩份一手資料都沒有這種組合。 |

### F. 斷線同步

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| F1 | 重連帶 `last_read_ts`，缺口少於 500 筆回傳 JSON Delta，寫入本地 SQLite，否則降級全量快照（第 5 節、全景圖「本地 SQLite 快取狀態」） | NOT FOUND | 一手資料沒有 Delta Sync 協定、500 筆門檻或客戶端 SQLite 的描述。 |

### G. 整體與圖解

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| G1 | 訊息「不到 100 毫秒」出現在全球同事螢幕；第 6 節表「低於 100ms 全球延遲」（前言、第 6 節） | CONTRADICTED | Real-time Messaging：“our system delivers messages across the world in 500ms.” https://slack.engineering/real-time-messaging/ |
| G2 | 「數千萬活躍用戶同時在線、數百萬個活躍頻道」「數萬名同時在線成員」（前言） | NOT FOUND | 一手文沒有這組數字。最接近的是 CS 每台尖峰約 1,600 萬頻道（同文另一處寫 “tens of millions of channels per host”，原文自己前後不一）、Flannel 2017 年 4M 同時連線。 |
| G3 | 全景圖「Message Server 寫入 Kafka 事件日誌」 | NOT FOUND | 一手資料裡 Kafka 是 job queue 前面的持久緩衝（Kafka → JQRelay → Redis），訊息發送確實經過 job queue（https://slack.engineering/scaling-slacks-job-queue/ ），但沒有「Message Server 寫入 Kafka 事件日誌」這條路徑。另全景圖「Redis 緩存近期訊息與未讀計數器」也無出處。 |
| G4 | 全景圖「Lucene / ES 即時全文倒排索引」 | NOT FOUND | slack.engineering 沒有使用 Elasticsearch 的出處。Slack 工程師在 Berlin Buzzwords 2019 的演講描述的是 Solr（https://2019.berlinbuzzwords.de/sites/2019.berlinbuzzwords.de/files/media/documents/slack_search_-_berlin_buzzwords_2019.pdf ，未逐頁核對）。 |
| G5 | 全景圖「Presence & Typing」元件 | SUPPORTED | Real-time Messaging：Presence Servers 追蹤在線使用者並驅動客戶端的在線指示。Typing 部分原文沒寫。 |

## 參考連結檢查

| 連結 | 狀態 | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| [Slack Engineering: Real-time Messaging Architecture at Scale](https://slack.engineering/) | 200 | 首頁，不是文章；篇名也不是 Slack 的原篇名 | 本身撐不起任何主張。應改連 https://slack.engineering/real-time-messaging/ （原篇名 “Real-time Messaging”，2023-04-11）。 |
| [Slack Engineering: Flannel - An Application-Level Edge Cache](https://slack.engineering/flannel-an-application-level-edge-cache-to-make-slack-scale/) | 200 | 具體文章（2017-05-31） | 撐得起 E1、E3；撐不起 E2、E4、E5、E6。 |
| [Vitess at Slack: Scaling MySQL Horizontally](https://vitess.io/docs/overview/what-is-vitess/) | 404 | 原本是 vitess.io 的通用介紹頁，跟 Slack 無關；篇名是自編的 | 撐不起任何 Slack 主張。應改連 https://slack.engineering/scaling-datastores-at-slack-with-vitess/ ，而該文反駁 D2。 |
| [ByteByteGo: Journey of a Slack Message Visual Guide](https://bytebytego.com/guides/what-is-the-journey-of-a-slack-message) | 200 | 二手整理 | 內容是 Real-time Messaging 文的摘要（WebApp → AS → CS → GS → Envoy），沒有 Flannel、Vitess、Delta Sync。二手來源，不能當證據。 |
| frontmatter `repositoryUrl`: https://github.com/ByteByteGoHq/system-design-101 | 200 | repo 首頁 | 二手來源，撐不起 Slack 主張。 |

## 修正建議（供作者參考，本次不改文）

1. 第 4.1 節分片鍵改寫：按 workspace 分片是 Vitess 之前的舊架構，搬遷動機是熱點與大客戶撐爆單一分片，訊息資料改按 channel ID 分片；第 6 節表「按 Workspace 隔離」一併修正。
2. 前言與第 6 節的「不到 100 毫秒」改成 Slack 原文的 500ms，並附 Real-time Messaging 連結。
3. 第 3 節照原文改寫元件職責：Webapp → Admin Server →（CHARMs 管理的雜湊環）→ Channel Server（存頻道歷史）→ Gateway Server（存使用者資訊與 WebSocket 訂閱）→ 客戶端；在線狀態歸 Presence Server。拿掉 Channel Router；「節省 90%」刪除或標成示意。第 3.1 節 Redis Pub/Sub 的比較改成作者觀點。
4. Flannel 段標明是 2017 年的設計；拿掉 `< 2ms`、15–50ms、95% 命中、Emoji、「訂閱 Channel Server」「常駐 Edge Gateway 旁」，可改用原文數字（4M 連線、600K QPS、7 倍／44 倍資料量縮減）。
5. `ts` 改照官方說法：外觀像 epoch 時間戳，實際是頻道內唯一的訊息 ID；拿掉「精確到微秒」「全域單調遞增」「強制遞增微秒位數」，或明說是作者推測。
6. 30 秒 Ping/Pong、500ms／30s 退避、30 天 SSD 冷熱分層、Delta Sync 500 筆門檻與 SQLite、Kafka 事件日誌、Lucene／ES，在正文與全景圖都標成「通用設計示意」，不要掛在 Slack 名下；程式碼註解「Slack Client 抖動重連邏輯範例」改成「通用範例」。
7. 參考連結換成三篇 slack.engineering 原文（Real-time Messaging、Flannel、Scaling Datastores with Vitess），可加 Scaling Slack's Job Queue；Vitess 那條 404 必須換掉。ByteByteGo 移到「延伸閱讀」並標二手。
