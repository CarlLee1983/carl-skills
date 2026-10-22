# CarlStack 09-02 公司案例文清點

日期：2026-10-21（台北）。範圍：CarlStack `src/content/blog` 中 `publishDate` 以 `2026-09-02` 開頭的 101 篇。

## 方法

腳本掃標題、slug 與全文的公司名（含 Facebook→Meta、BeyondCorp→Google 等別名），留下「標題或 slug 帶公司名」或「全文提到某公司 ≥ 8 次」的 23 篇；再列出每篇的外部連結（排除 SVG 的 `w3.org` 與每篇都有的 ByteByteGo `system-design-101` 範本連結），抽樣讀邊界案例的內文。「數字主張」是正文中帶單位（ms、萬、億、%、倍、QPS、TB…）的數字個數，屬字面計數（推斷），只用來排優先序。

## 結果

### A 批：歸給公司、沒有一手來源專文（先查）

| slug | 公司 | 數字主張 | 一手來源連結 |
| --- | --- | --- | --- |
| `stripe-payment-gateway-smart-routing` | Stripe（與 Adyen） | 6 | 無 |
| `tiktok-massive-frontend-monorepo-architecture` | TikTok | 14 | 只有 `web-infra-dev` 開源 repo（Garfish、Rspack） |
| `youtube-video-upload-transcoding-pipeline` | YouTube | 11 | 無（Google Cloud 媒體方案頁、RFC 8216 HLS） |
| `serverless-cloud-native-database-neon-planetscale` | Neon、PlanetScale | 20 | 無 |
| `system-design-interview-stack-overflow-architecture` | Stack Overflow | 18 | 無；潤稿已在 handoff `drafts/`，原文自相矛盾 |
| `airbnb-microservices-evolution-architecture` | Airbnb | 9 | 只有部落格首頁（medium.com/airbnb-engineering）與 ByteByteGo |
| `netflix-hierarchical-caching-push-messaging` | Netflix | 8 | 只有部落格首頁（netflixtechblog.com） |
| `reddit-core-storage-high-concurrency-architecture` | Reddit | 9 | 只有 r/RedditEng 首頁、`reddit/baseplate.go` repo、ByteByteGo |

### B 批：有對應的一手專文（查正文是否超出來源）

| slug | 公司 | 數字主張 | 一手來源連結 |
| --- | --- | --- | --- |
| `discord-trillions-messages-scylladb-scaling` | Discord | 13 | discord.com blog（billions、trillions 兩篇） |
| `figma-postgres-scaling-architecture` | Figma | 17 | figma.com blog「how-figma-scaled-to-multiple-databases」＋ YouTube 演講 |
| `meta-scale-automated-bug-fixing-sapfix-infer` | Meta | 9 | engineering.fb.com SapFix 文、fbinfer.com |
| `shopify-resilient-payment-systems` | Shopify | 8 | shopify.engineering「10 tips…」 |
| `slack-message-pipeline-architecture` | Slack | 10 | slack.engineering Flannel 文＋首頁、ByteByteGo |
| `twitter-recommendation-algorithm-pipeline` | Twitter／X | 23 | blog.x.com 2023 開源文、`twitter/the-algorithm` |
| `uber-api-gateway-evolution-architecture` | Uber | 3 | uber.com blog（API layer 演進、microservice 架構） |
| `pinterest-git-clone-optimization-commit-graph` | Pinterest | 24 | 只有 Pinterest 部落格首頁；git-scm、github.blog 支撐 commit-graph 機制，原始案例只經 ByteByteGo |

### C 批：只有局部段落歸給公司（查那一段）

| slug | 公司 | 待查段落 | 一手來源連結 |
| --- | --- | --- | --- |
| `api-versioning-strategies-backward-compatibility` | Stripe | §3「Stripe 式版本控制架構：雙向變更閘道器」與開頭「數百個歷史 API 版本」 | 無 |
| `zero-trust-architecture-beyondcorp` | Google | §2 BeyondCorp 組件拓撲、「2014 年發布」 | 無 |
| `omarchy-dhh-omakase-linux-desktop` | DHH／Omarchy | 對 DHH 理念與 Omarchy 元件的描述 | omarchy.org manual、`basecamp/omakub` |
| `tsdb-architecture-lsm-gorilla-compression` | Facebook Gorilla | Gorilla 壓縮與數字 | VLDB 2015 論文 |

### 已查核

| slug | 結果 |
| --- | --- |
| `mcdonalds-event-driven-architecture` | 未通過，見 `validation/results.md`「查核：麥當勞事件驅動架構」 |

### 判為通用技術解說（直接潤稿）

| slug | 理由 |
| --- | --- |
| `end-to-end-encryption-signal-vs-mtproto` | 比較的是公開協定，不是某公司的內部架構 |
| `system-design-interview-dropbox-google-drive-sync` | 面試題的假想設計，產品名只當題目 |

## 查核格式

比照麥當勞那次：每項主張標 SUPPORTED／CONTRADICTED／NOT FOUND，附引文與 URL；參考連結逐一檢查是否支撐正文（首頁、404、標題不符都記下）。

## 處置狀態（2026-10-22）

A、B、C 三批 20 篇全部查核、修正並發布，處置與 gate 紀錄見 `validation/results.md`。麥當勞一文使用者決定不處理。
