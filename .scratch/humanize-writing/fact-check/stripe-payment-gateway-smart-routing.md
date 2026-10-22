# 事實查核：stripe-payment-gateway-smart-routing.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/stripe-payment-gateway-smart-routing.mdx`
- 公司：Stripe（另提及 Adyen）
- 查核日期：2026-10-22
- 方法：只採 Stripe 官方文件（docs.stripe.com）、官方部落格與新聞稿作為證據；第三方整理只當線索。

## 總評：未通過

標題宣稱這是「Stripe 全球支付網關與跨國智慧路由架構」，但文章的兩根主幹都沒有 Stripe 出處，而且和 Stripe 公開資料對不上。第一根是交易狀態機：文中的 `INITIATED → PROCESSING → AUTHORIZED → CAPTURED → SETTLED`（另有 `TIMEOUT`、終態 `FAILED`）和 Stripe 公開的 PaymentIntent 狀態模型不同。Stripe 沒有 `SETTLED`、`TIMEOUT` 狀態，付款失敗時會回到 `requires_payment_method`，不是進入終態 `FAILED`。第二根是「智慧路由決策引擎」：文中說它結合硬性規則、Interchange++ 費率模型、P99 健康度評分與斷路器，動態算出最佳路徑。Stripe 唯一公開的多處理商路由是 Orchestration（private preview），它的做法是商家在 Dashboard 自訂條件規則，由左到右比對、套用第一條符合的規則，再加一個重試處理商；文件沒有提到費率最佳化、健康度評分或斷路器。

查證得到的 SUPPORTED 項目，大多是 Stripe 公開 API 的行為（`Idempotency-Key`、409、授權 7 天、部分請款、PCI Level 1），或是教科書層級的常識，撐不起標題那種「Stripe 內部架構」的說法。超時補償的時間參數（5 秒、10 秒／30 秒／2 分鐘）、Redis `SET NX EX 86400`、Acquirer A 98.2%／180ms 等具體數字都找不到出處。文末沒有參考連結區，只有 frontmatter 的 `repositoryUrl` 指向 ByteByteGo 的 repo 首頁，而那是二手來源，裡面也沒有 Stripe 條目。

統計：SUPPORTED 11、CONTRADICTED 3、NOT FOUND 7。

## 主張逐項查核

### A. 角色與定位

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | Stripe、Adyen 是支付網關／PSP，提供標準 API 與安全 Token 化服務（第 1 節表格、SVG「Stripe / Acquirer」） | SUPPORTED | Stripe Security：“certified us to PCI Service Provider Level 1”；“We tokenize PANs internally, isolating raw numbers from the rest of our infrastructure.” https://docs.stripe.com/security 。註：SVG 把 Stripe 和收單行畫在同一格，只是示意，不代表 Stripe 本身就是收單行。 |
| A2 | Stripe 與 Adyen 的「點擊即付」仰賴多收單機構（Multi-Acquirer）智慧路由（前言） | NOT FOUND（Adyen 部分） | Stripe 部分見 B2。Adyen 官方頁面寫的是自有的全球銀行牌照與單一技術堆疊（https://www.adyen.com/industries/financial-services）；二手資料普遍說 Adyen 本身就是收單行，這和「仰賴多家外部收單機構分流」的說法方向相反。找不到 Adyen 一手資料描述它做多收單機構路由。 |

### B. 智慧路由

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 「Stripe 等網關採用動態智慧路由演算法」，依「1. 硬性規則過濾 2. 費率最優模型（Interchange++ 最低成本）3. 歷史健康度評分（即時成功率、延遲 P99）4. 斷路器與配額熔斷」計算最優路徑（第 4 節正文與 SVG） | CONTRADICTED | Stripe Orchestration Rules：“create rules based on payment conditions, such as card country or currency. Stripe executes the conditions in order, from left to right, and applies the first action that matches a payment’s condition.” 可用條件只有 Amount、BIN、Card country、Card issuer、Card type、Currency、Metadata；動作是選「main and retry processors」。整份文件沒有費率模型、健康度／延遲評分或斷路器，而且這項功能仍是 “Orchestration is in private preview.” https://docs.stripe.com/payments/orchestration/rules 。Stripe 公開的做法是商家自訂、依序比對第一條符合的規則，不是引擎即時算出的最佳路徑。 |
| B2 | 大型業務會用多家收單／處理商，並有備用渠道 | SUPPORTED（有但書） | 同上：“Use Orchestration to route payments across all of your processors.” 但書：這是 private preview 功能，不是 Stripe 一般網關的預設架構；沒有啟用規則時 “payments route to Stripe.” |
| B3 | 軟性拒絕時「立即切換至備用收單行重試」（第 4 節） | SUPPORTED（有但書） | Orchestration 可設定在另一家處理商重試一次（搜尋結果摘錄 https://docs.stripe.com/payments/orchestration 的說法：“attempt a payment that failed on your main processor one more time on another chosen processor”）。Stripe 文件沒有使用「軟性拒絕」一詞來定義觸發條件。 |
| B4 | 硬性拒絕不重試，以免被卡組織罰款（第 4 節） | SUPPORTED | Stripe Declines：“Adaptive Acceptance helps you avoid excessive retry penalties”，被擋下的付款回傳 `"advice_code": "do_not_try_again"`。https://docs.stripe.com/declines |
| B5 | 日本 JCB 卡優先路由至日本境內收單行，以避開跨國手續費與發卡行風控（第 4 節） | NOT FOUND | Stripe 文件沒有描述依卡別自動導向境內收單行的機制。Stripe 只有一篇行銷性質的 “Local acquiring 101” 說明本地收單的概念（https://stripe.com/en-cn/resources/more/local-acquiring-101），沒有講到 Stripe 自己怎麼路由。Orchestration 雖然可以依 card country 設規則，但要由商家自己設定。 |
| B6 | SVG 數字「Acquirer A（成功率 98.2%，延遲 180ms）」 | NOT FOUND | 沒有任何來源。看起來是示意數字，但放在 Stripe 標題底下，讀者容易當成實測值。 |

### C. 交易模型與狀態機

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | 交易狀態機為 `INITIATED → PROCESSING → AUTHORIZED → CAPTURED → SETTLED`，另有 `TIMEOUT`，`FAILED`／`SETTLED`／`REFUNDED` 是終態（第 3 節；前言說 Stripe 與 Adyen 依賴這套 FSM） | CONTRADICTED | Stripe 公開的 PaymentIntent 狀態是 `requires_payment_method`、`requires_confirmation`、`requires_action`、`processing`、`requires_capture`、`succeeded`、`canceled`。失敗不是終態：“If the payment attempt fails (for example, due to a decline), the PaymentIntent’s status returns to `requires_payment_method` so that the payment can be retried.” 沒有 `SETTLED`、`TIMEOUT` 狀態。https://docs.stripe.com/payments/paymentintents/lifecycle 。（Stripe 內部的資料模型沒有公開；文章的 FSM 若要當通用設計範例，就不能掛在 Stripe 名下。） |
| C2 | 授權有時效，一般為 7 天（第 2 節） | SUPPORTED | “Usually, an authorization for an online card payment is valid for 7 days.” 但 Visa MIT 約 5 天（4 天 18 小時），實體刷卡多為 2 天，日本 JPY 交易最長 30 天。https://docs.stripe.com/payments/place-a-hold-on-a-payment-method |
| C3 | 支援部分請款（Partial Capture）與撤銷授權（Void／Release）（第 2 節） | SUPPORTED | “To capture less … pass the `amount_to_capture` option. A partial capture automatically releases the remaining amount.”；“If you need to cancel an authorization, you can cancel the PaymentIntent.” 同上 URL |
| C4 | 用樂觀鎖 `version` 欄位與 `UPDATE … WHERE version = ?` 防止併發競態（第 3 節） | NOT FOUND | Stripe 沒有公開這種實作。屬於通用設計建議，文章沒有明說是 Stripe 的做法，但放在 Stripe 標題下容易被誤讀。 |

### D. 冪等性與超時補償

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 客戶端帶 `Idempotency-Key`（第 5.1 節） | SUPPORTED | “Idempotency keys are sent in the `Idempotency-Key` header.” https://docs.stripe.com/error-low-level |
| D2 | 冪等鍵示例用 UUIDv7 | CONTRADICTED（輕微） | Stripe 建議 v4：“we suggest using V4 UUIDs, or another random string with enough entropy” https://docs.stripe.com/api/idempotent_requests 。文章沒有明說這是 Stripe 的做法，但和 Stripe 的建議不一致。 |
| D3 | 同一個 Key 的請求還在處理中時回傳 `409 Conflict` | SUPPORTED | “If a `409` indicates that another request with the same key is still executing, wait and retry with that key”；狀態碼表：“409 Conflict — The request conflicts with another request, potentially due to using the same idempotent key.” https://docs.stripe.com/error-low-level |
| D4 | 已完成時直接回傳先前結果，不重複扣款 | SUPPORTED | “Retries with the same key return the saved response, including `500` errors.” https://docs.stripe.com/api/idempotent_requests ；Stripe 2017 年部落格：“the server simply replies with a cached result of the successful operation” https://stripe.com/blog/idempotency |
| D5 | 網關在 Redis 執行 `SET payment:idemp:<key> <status> NX EX 86400` | NOT FOUND | Stripe 沒有公開冪等鍵存在哪裡，官方部落格也沒講。只有保留期限大致對得上：“Stripe retains keys for at least 24 hours and can remove them after that.” https://docs.stripe.com/error-low-level |
| D6 | 收單行超過 5 秒沒回應就標記 `TIMEOUT`，送進延遲佇列，在 10 秒、30 秒、2 分鐘後向收單行查詢訂單狀態，補齊狀態後發 Webhook（第 5.2 節） | NOT FOUND | 找不到這些參數的出處。Stripe 公開的是另一套做法：商家端在 24 小時內用同一個 key 重試，之後改用查詢物件、Dashboard 與 webhook 對帳；事故復原時 “Stripe attempts to reconcile failed operations and send webhook events for any objects created during reconciliation.” https://docs.stripe.com/error-low-level |

### E. 可用性與安全

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | 99.999% 可用性（description；在 Stripe 標題下） | SUPPORTED（有但書） | Stripe BFCM 2023 新聞稿：“the Stripe API maintained availability greater than 99.999%, with a peak of 27,395 requests per second.” https://stripe.com/newsroom/news/bfcm2023 。但書：這是黑五網一期間的數字，不是全年 SLA。 |
| E2 | 卡號在前端經 PCI-DSS Level 1 認證的 Tokenization SDK 轉成 Token，源站不接觸明文（第 6 節） | SUPPORTED | “certified us to PCI Service Provider Level 1”；用 Elements／Checkout 整合時，Stripe 協助商家完成 SAQ。https://docs.stripe.com/security |

### F. 整篇定位

| # | 主張 | 判定 | 說明 |
|---|---|---|---|
| F1 | 標題「Stripe 全球支付網關與跨國智慧路由架構：交易狀態機、多收單機構容災與超時補償實踐」，暗示全文是 Stripe 的實際架構 | NOT FOUND | 找不到 Stripe 一手資料描述這組架構（FSM、路由引擎、延遲佇列對帳）。內文其實是通用支付系統設計，只有 B 節一句「Stripe 等網關採用…」和前言明確掛名 Stripe／Adyen。 |

## 參考連結檢查

文末沒有參考連結區，只有 frontmatter 的 `repositoryUrl`：

| 連結 | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://github.com/ByteByteGoHq/system-design-101 | 存在（約 90.6k stars） | repo 首頁，是 ByteByteGo 圖解的目錄 | 都撐不起。目錄裡沒有任何 Stripe 條目，也沒有 smart routing；相關的只有 “Payment System”、“How to Avoid Double Payment”、“Reconciliation in Payment”、“How VISA Works…” 等通用圖解，而且屬於二手整理，不能當作 Stripe 主張的證據。 |

## 修正建議（供作者參考，本次不改文）

1. 標題與前言拿掉「Stripe 的架構」這個框架，改寫成通用支付網關設計；要提 Stripe，就只引用它公開的 API 行為（D1、D3、D4、C2、C3、E2）並附上文件連結。
2. 第 3 節 FSM 要嘛標成「示意的通用模型」，要嘛改用 Stripe PaymentIntent 的真實狀態並附上 lifecycle 文件。
3. 第 4 節如果要寫 Stripe，就改成 Orchestration 實際的機制：商家自訂條件規則、依序套用第一條符合的規則、一個重試處理商、private preview。拿掉 Interchange++ 費率模型、P99 健康度評分、斷路器這些沒有出處的說法，或明講是作者自己的設計。
4. 98.2%／180ms、5 秒／10 秒／30 秒／2 分鐘、Redis `EX 86400` 等數字要標成示意值；UUIDv7 改成 Stripe 建議的 v4，或說明這是作者自己的選擇。
5. 99.999% 要註明是 BFCM 2023 期間的數字。
6. 補一個參考連結區，換成上面列出的 Stripe 官方文件。
