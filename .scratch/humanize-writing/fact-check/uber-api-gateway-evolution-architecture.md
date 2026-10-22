# 事實查核：uber-api-gateway-evolution-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/uber-api-gateway-evolution-architecture.mdx`（連同 `src/components/UberApiGatewayEvolutionDiagram.astro` 圖解文字）
- 公司：Uber
- 查核日期：2026-10-22
- 方法：只採 Uber 官方部落格作為證據，主要是三篇：
  - 〈Designing Edge Gateway, Uber's API Lifecycle Management Platform〉（Pavel Astakhov、Madan Thangavelu、Uday Kiran Medisetty，2020-08-18）https://www.uber.com/blog/gatewayuberapi/
  - 〈The Architecture of Uber's API gateway〉（Madan Thangavelu、Abhishek Parwal、Rohit Patali，2021-05-19）https://www.uber.com/blog/architecture-api-gateway/
  - 〈Introducing Domain-Oriented Microservice Architecture〉（Adam Gluck，2020-07-23）https://www.uber.com/blog/microservice-architecture/

  ByteByteGo 只當線索。

## 總評：未通過

文章的骨架是「2014–2024 四代演進」：2014 單體 Node.js RTAPI、2016 各業務線自建閘道、2019 Envoy 邊緣 gRPC 閘道、現代 Protobuf 宣告式平台。這個骨架和 Uber 自己的說法對不上。Uber 2020 年的 Edge Gateway 專文明講是三代：

1. 第一代（2014）是 dispatch 與 api 兩個服務自然長出來的架構。
2. 第二代是 2015 年初起家的「all-encompassing gateway」RTAPI（Node.js），屬於集中式。
3. 第三代從 2018 年初開始，2019 年完成遷移，是「self-service, decentralized, and layered」：Edge Gateway 用單一 Golang 服務加 UI，把 BFF 拆成 presentation layer 的微服務。

文章因此把 RTAPI 提早一代，又虛構了「2016 年 Rider／Driver／Eats 自建閘道」這一代。第三、四代的 Envoy 核心和 Protobuf Schema 也和原文衝突：Uber 的閘道是 Go 加開源的 Zanzibar，用 Thrift IDL 註解與 YAML 做設定並生成程式碼；Envoy 只出現在 2021 年文中「正在開發」的 gRPC runtime 計畫裡。多區域 Active-Active、CityID／UserID 一致性雜湊、「10 秒內」轉移百萬級請求，這些都找不到一手出處。

文中的主要參考連結 `evolution-of-ubers-api-layer` 在 uber.com 上是 404，這個 slug 其實是 ByteByteGo 指南的檔名。連 ByteByteGo 那篇也寫「3 main stages」。

統計：SUPPORTED 7、CONTRADICTED 7、NOT FOUND 9。

## 主張逐項查核

### A. 代際框架與 RTAPI

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 「從 2014 年到 2024 年十年間，Uber 的 API 閘道層經歷了四個截然不同的代際演進」（前言、description、圖解） | CONTRADICTED | Edge Gateway 專文分三代，標題依序是 “First gen: the organic evolution”、“Second gen: the all-encompassing gateway”、“Third gen: self-service, decentralized, and layered”。https://www.uber.com/blog/gatewayuberapi/ 。2021 年續篇也說 “we walked through multiple generations of Uber's API gateway evolution”，沒有第四代。https://www.uber.com/blog/architecture-api-gateway/ |
| A2 | 第 1 代（2014）就是單體 Node.js RTAPI，「所有叫車業務請求都匯聚至」RTAPI（第 1 代節、圖解 GEN 1 (2014)） | CONTRADICTED | 2014 年是：“A 2014 survey of Uber's architecture would have resulted in two key services: dispatch and api.” RTAPI 是第二代：“started out with a single RESTful API in early 2015.” https://www.uber.com/blog/gatewayuberapi/ |
| A3 | RTAPI 是 Real-Time API，用 Node.js 寫成 | SUPPORTED | “The API gateway layer was named as RTAPI, short for Real Time-API.”；“This API gateway was one of the largest NodeJS applications at Uber”。同上 URL。註：時期應是第二代（2015 起）。 |
| A4 | RTAPI 透過內部 RPC 呼叫「後端少數幾個單體 Python/Node 服務」 | NOT FOUND | 原文沒有提到 Python。RTAPI 成熟期的規模是 “Communicated with ~400+ downstream services that are owned by 100+ teams at Uber”，跟「少數幾個單體服務」差很多。同上 URL。 |

### B. RTAPI 撞上的天花板

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | CPU 密集運算（大 JSON、加解密）阻塞 Event Loop，導致並行請求超時崩潰 | NOT FOUND | 原文沒有 CPU、event loop 的說法。最接近的是 “The complexity of the code in the gateway deviated from being IObound.” 和 “A performance regression introduced by a few APIs could result in slowing down the gateway.” 只說會「變慢」，沒有說「崩潰」。https://www.uber.com/blog/gatewayuberapi/ |
| B2 | 所有工程師都在同一個 RTAPI 倉庫提交程式碼 | SUPPORTED | “It took on the label of a monorepo”；“providing freeform coding space for 1,500 engineers”。同上 URL。 |
| B3 | 新功能的 Bug「曾多次導致整個 Uber 全球 App 無法打開」 | NOT FOUND | 原文只寫到 NPE 讓部署卡住：“key gateway deployments stalled for a few days until the NPE is fixed.” 沒有提到全球 App 打不開。同上 URL。 |
| B4 | 沒有嚴格 Schema，後端欄位型別隨意變更，頻繁讓手機端 Crash | NOT FOUND | 原文提到的是動態語言的問題：“growing challenges with having such a dynamic language”，以及 NPE。沒有寫到手機端 Crash。同上 URL。 |

### C. 第 2 代（2016）去中心化自建閘道

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | 2016 年各業務團隊自建 Rider Gateway（Node）、Driver Gateway（Go）、Eats Gateway（Java）（正文、SVG、圖解 GEN 2 (2016)、對比表） | CONTRADICTED | 第二代就是集中式 RTAPI（“all-encompassing gateway”），當時的緩解作法是同一個 repo 內的 “API sharded deployments and decentralized reviews”。去中心化是第三代（“As of early 2018…”），而且做法是 Edge Gateway 這 “single standalone Golang service” 加上 presentation layer 的微服務，沒有分語言各自建閘道。https://www.uber.com/blog/gatewayuberapi/ |
| C2 | 去中心化「不到兩年」帶來的治理災難：各語言重做 Auth／限流、JWT 漏洞要協調數十團隊修補、App 首頁需發多次跨網路 HTTP 請求 | NOT FOUND | 一手來源沒有這段歷史。Uber 文中的代價是第二代集中式閘道成為瓶頸：“the gateway team started to become a bottleneck for product development at Uber”。同上 URL。 |

### D. 第 3 代（2019）邊緣 gRPC 閘道

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 2019 年以 C++／Go 與 Envoy Proxy 打造標準化邊緣閘道（正文、圖解「引入 Envoy / Go 邊緣層」、表格「Envoy + Go 集中代理」） | CONTRADICTED | 第三代閘道是 Go 加 Zanzibar：“At the time of development of the gateway, our language choices were Go and Java.”；“The entire working of code generation is abstracted as an Uber OSS lib, Zanzibar.” Envoy 只出現在比較反向代理（“reverse proxies like envoy, Nginx”），以及 2021 年仍在開發中的 gRPC runtime “based on envoy”。https://www.uber.com/blog/architecture-api-gateway/ |
| D2 | 集中處理橫切面能力：鑑權、限流（另列 TLS 卸載、OAuth 2.0／JWT、Redis Token Bucket、Jaeger／OpenTelemetry） | SUPPORTED（有但書） | “Every external API request is Authenticated (AuthN) and/or Authorized (AuthZ).”；“An endpoint owner may elect to rate limit an API.”；閘道職責含 “rate limiting, load shedding, header enrichment and propagation”。同上 URL。但書：TLS 卸載、OAuth 2.0／JWT、Redis Token Bucket、Jaeger／OTel 這些具體實作，原文都沒有提到。 |
| D3 | 協定轉換：外部 HTTP/JSON，內部轉成 gRPC／Thrift | SUPPORTED（有但書） | Protocol manager 支援 “JSON, Thrift, or Protobuf”，可以 “receive an incoming JSON request and respond with a proto encoded response”。gRPC 方面，2021 年還是 “developing a flavor of API gateway runtime for gRPC requests”，2019 年並沒有上線。同上 URL。 |
| D4 | 手寫 BFF 聚合讓閘道程式碼難以維護，「隨著微服務數量突破 4,000 個」（時期為 2019） | CONTRADICTED | 2019 年的數字是 “an eventual growth of 2,200+ micro-services that powered all of Ubers products by 2019”（https://www.uber.com/blog/gatewayuberapi/ ）；2020 年的 DOMA 文：“around 2,200 critical microservices”（https://www.uber.com/blog/microservice-architecture/ ）。四千多個是 2023 年 Up 文的數字（4,500 stateless services）。而且第三代正是把 BFF 從閘道移到 presentation layer：“microservices that are tagged specifically to provide the backend for the frontend”，不是第三代遺留下來的痛點。 |

### E. 第 4 代（現代）宣告式統一 API 平台

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | 後端工程師在 Git 倉庫提交 Protobuf Schema（SVG 範例 `option (uber.api.route) = { path: "/v2/home" }`）宣告 API | CONTRADICTED | Uber 閘道的設定是 Thrift IDL 加註解與 YAML，再透過 UI 發布：“The gateway thrift file heavily uses the feature of annotations in thrift IDLs.”；“The configurations for each component are captured in Thrift and/or YAML files.”；Edge Gateway 是 “a single standalone Golang service paired with a UI”。`uber.api.route` 查無出處。https://www.uber.com/blog/architecture-api-gateway/ 、https://www.uber.com/blog/gatewayuberapi/ |
| E2 | CI 自動檢查向後相容性，杜絕 Breaking Changes | NOT FOUND | 原文反而承認協定轉換 “exposed itself to complex compatibility issues”。沒有提到 CI 相容性檢查。https://www.uber.com/blog/architecture-api-gateway/ |
| E3 | 自動生成閘道路由程式碼與手機端強型別 SDK（iOS／Android／TypeScript），「零手寫膠水代碼」 | SUPPORTED（有但書） | 閘道採 “code generation approach to create a runnable build artifact”；“A CI job fetches all of the endpoint IDL from the gateway”，用來生成手機端程式碼；“~20% of mobile build is code generated from the schemas defined in this layer”。但書：沒有提到 TypeScript；業務編排仍由 presentation layer 服務手寫（Glue、CFF 框架），「零膠水代碼」是誇大。 |
| E4 | 執行引擎為「Envoy Core ＋ Go Plugins」 | CONTRADICTED | 見 D1：閘道 runtime 是 Go 與 Zanzibar 生成的程式碼；Envoy 版只是 gRPC 的開發中計畫。 |
| E5 | 多區域 Active-Active；依 CityID／UserID 一致性雜湊把長連線釘在最近的區域；區域中斷時「10 秒內」把百萬級請求轉到備用區域，不引發資料庫死鎖 | NOT FOUND | 三篇一手文都沒有提到。最接近的只有橫切面能力裡的 “datacenter stickiness”（gatewayuberapi），以及 “Having redundant data centers and zones is the current, de facto architecture…”（architecture-api-gateway）。「10 秒」查無出處。 |
| E6 | 基於 TCP Vegas 的自適應併發限制，依延遲動態縮小併發窗口，優先保障核心請求 | SUPPORTED（有但書） | Uber 的 Cinnamon load shedder 確實使用 TCP-Vegas 的變形：Cinnamon Auto-Tuner 專文（2023-12-07）說明它比較觀測延遲與參考延遲，再調整 inflight limit。https://www.uber.com/blog/cinnamon-auto-tuner-adaptive-concurrency-in-the-wild/ 、https://www.uber.com/blog/cinnamon-using-century-old-tech-to-build-a-mean-load-shedder/ 。但書：Cinnamon 是各服務內嵌的函式庫，不是 API 閘道的功能；把它寫成閘道的能力，找不到出處。「P99 延遲與錯誤率」「丟棄行銷推播」也不是原文的說法。 |
| E7 | 第 3 代的多區域流量排程是「靜態 DNS 分流」（對比表） | NOT FOUND | 查無出處。 |
| E8 | 全鏈路 mTLS 與分散式追蹤（圖解 GEN 4） | NOT FOUND | 閘道文沒有提到 mTLS。 |

### F. 背景敘述

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| F1 | 後端由數千個獨立微服務組成（前言） | SUPPORTED | “As Uber has grown to around 2,200 critical microservices”。https://www.uber.com/blog/microservice-architecture/ 。註：前言的「數千萬名乘客」「全球數百座城市」沒有另外查證，屬於背景描述，不列入統計。 |

## 參考連結檢查

| 連結（文中標題） | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://www.uber.com/blog/evolution-of-ubers-api-layer/（“The Evolution of Uber's API Gateway Architecture”，前言與參考區各出現一次） | 404（2026-10-22 實測，導向 `/tw/zh-tw/...` 後顯示「找不到頁面」） | 不存在 | 都撐不起。這個 slug 其實是 ByteByteGo repo 的 `data/guides/evolution-of-uber's-api-layer.md`。Uber 實際的專文是 `gatewayuberapi`（2020）和 `architecture-api-gateway`（2021），篇名也不同。 |
| https://www.uber.com/blog/microservice-architecture/（“Engineering Uber's Microservice Architecture”） | 存在（200） | 具體文章，但真實篇名是 “Introducing Domain-Oriented Microservice Architecture”（Adam Gluck，2020-07-23），篇名不符 | 只撐得起 F1（約 2,200 個微服務）。文中的 gateway 指 DOMA 的 “single entry-point” 概念，沒有提到 API 閘道演進、Envoy 或多區域。 |
| https://github.com/ByteByteGoHq/system-design-101（“System Design 101: Evolution of API Gateway at Scale”；也是 frontmatter 的 `repositoryUrl`） | 存在 | repo 首頁；沒有叫這個名字的條目 | 二手整理，不能當作證據。repo 內的〈Evolution of Uber's API Layer〉（2024-03-14）寫的是 “Uber's API gateway went through 3 main stages”，內容摘自 Uber 2020 年專文，同樣和文章的四代框架相反。 |

## 修正建議（供作者參考，本次不改文）

1. 代際框架改成 Uber 自己的三代，並附上年份：
   - 第一代（2014）：dispatch 加 api。
   - 第二代（2015 年初起）：集中式 Node.js RTAPI。高峰約 800,000 req/s，約 1,600 支 API，部署成 40 多個獨立服務。
   - 第三代（2018 起，2019 完成遷移）：Edge Gateway，用 Go 加 Zanzibar，分 edge、presentation、product、domain 四層。

   刪除「2016 自建 Rider／Driver／Eats 閘道」這一代，以及「2014–2024 四代」的說法。
2. 第 1 代的問題改用原文列出的項目：動態語言與 NPE、1,500 名工程師共用 monorepo、2,500 個 npm 套件升級困難、業務邏輯滲進閘道、閘道團隊成為瓶頸。刪除「CPU 阻塞 Event Loop 崩潰」「多次讓全球 App 打不開」。
3. Envoy 只能寫成 2021 年「規劃中的 gRPC runtime」。閘道設定改寫成 Thrift IDL 註解加 YAML、透過 UI 發布、用 Zanzibar 生成程式碼；SVG 的 Protobuf `uber.api.route` 範例要標成示意，或改成 Thrift 註解。
4. 「4,000 個微服務」若放在 2019 年要改成 2,200+。多區域 Active-Active、一致性雜湊、10 秒故障轉移、靜態 DNS、全鏈路 mTLS 這些內容，要嘛刪除，要嘛明寫是作者自己的設計建議。
5. 自適應限流改寫成 Uber 的 Cinnamon（服務端 load shedder，TCP-Vegas 變形，2023），附上連結，不要寫成閘道的功能。
6. 參考連結：把 404 的 `evolution-of-ubers-api-layer` 換成 `gatewayuberapi` 與 `architecture-api-gateway`；DOMA 文改成真實篇名；ByteByteGo 標成二手整理，或直接拿掉。
