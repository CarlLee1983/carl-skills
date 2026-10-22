# 事實查核：api-versioning-strategies-backward-compatibility.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/api-versioning-strategies-backward-compatibility.mdx`
- 公司：Stripe
- 批次：C 批（局部）。只查 §3「Stripe 式版本控制架構：雙向變更閘道器」整節（含內嵌 SVG 文字）、開頭「數百個歷史 API 版本」與 description 的「Stripe 式雙向轉換適配器」。其餘段落屬通用技術解說，不查。
- 查核日期：2026-10-22
- 方法：只採 Stripe 官方部落格（Brandur Leach, 2017；2024 年新版發布流程公告）、docs.stripe.com 的 versioning／upgrades 文件與 changelog 作為證據。

## 總評：局部修正

§3 的骨幹說對了一半。Stripe 確實把每個破壞性變更封裝成一個 version change module，回應會從最新版本依序往回套用這些模組，帳號也會在第一次 API 請求時鎖定版本；這些都有 Brandur 2017 年的原文支撐。問題出在文章把它畫成「雙向」閘道：Brandur 的文章只描述回應方向的轉換，沒有提到請求會被逐版「向上」轉換；而且原文明講，有副作用的變更無法封裝在模組裡，核心程式碼要另外檢查版本，這和圖中「核心業務永遠只運行最新邏輯・零歷史相容包袱」正面衝突。開頭「數百個歷史 API 版本」也誇大了：Stripe changelog 從 2011-06-21 到 2026-09-30 共列出 124 個正式版本（不含 `.preview`），2017 年原文則是「almost a hundred」。

另外，文章用現在式描述 2017 年的機制，沒有交代 Stripe 自 2024-09-30.acacia 起改成「每月無破壞性版本＋每半年一次 major release」的新流程，也沒有官方文件保證 2017 年的版本到 2026 年仍可用。

統計：SUPPORTED 4、CONTRADICTED 3、NOT FOUND 4。

## 主張逐項查核

### A. 開頭與 description

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | Stripe「在單一核心代碼庫下維護數百個歷史 API 版本」（第 24 行） | CONTRADICTED | Stripe changelog（https://docs.stripe.com/changelog ，以 `changelog.md` 全文統計標題）列出的正式版本從 `2011-06-21` 到 `2026-09-30.endive` 共 124 個，不到兩百，稱「數百」誇大。2017 年原文的說法是 “Our current approach has been sufficient for almost a hundred backwards-incompatible upgrades over the past six years.” https://stripe.com/blog/api-versioning 。建議改成「一百多個」並註明時點。 |
| A2 | 單一核心代碼庫，舊版差異抽離在核心路徑之外（第 24 行、description「Stripe 式雙向轉換適配器」） | SUPPORTED（有但書） | “Version change modules keep older API versions abstracted out of core code paths.”；“API resources are written so that the structure they describe is what we’d expect back from the current version of the API.” https://stripe.com/blog/api-versioning 。但書：「雙向」不成立，見 B1。 |

### B. §3 架構與 SVG

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 請求方向有「Request Translators: 2017 ➔ 2019 ➔ 2026」，「按版本更新鏈依序向上補充預設值與欄位映射」（SVG 第二格；節名「雙向變更閘道器」） | NOT FOUND | Brandur 原文只描述回應轉換，沒有請求參數的逐版向上轉換。版本來源只寫到判定目標版本：“A `Stripe-Version` header if one was supplied.”／“The user’s pinned version, which is set on their very first request to Stripe.” 圖說是 “Requests are processed by version change modules before returning a response.”，指的是回應前處理，沒有方向上的雙向設計。https://stripe.com/blog/api-versioning |
| B2 | 回應方向「Response Translators: 2026 ➔ 2019 ➔ 2017」，依序向下修補（SVG 第四格） | SUPPORTED | “It then walks back through time and applies each version change module that finds along the way.”；“Version changes are written so that they expect to be automatically applied backwards from the current API version.” https://stripe.com/blog/api-versioning |
| B3 | 回應轉換會「剃除新版專屬不可識別欄位」（SVG 第四格說明） | NOT FOUND | 原文的範例是改寫欄位結構（Event 的 `request` 欄位），沒有提到剔除新欄位。https://stripe.com/blog/api-versioning |
| B4 | 「核心業務微服務（永遠只運行最新 2026 商業邏輯）」「單一主幹代碼庫・零歷史相容包袱」（SVG 中央格） | CONTRADICTED | 原文承認有例外會滲進核心程式碼：“Sometimes a more complicated change is necessary which leaks out of the module that defines it.”；“We assign these modules a `has_side_effects` annotation and the transformation they define becomes a no-op”；“Elsewhere in the code a check will be made to see whether they're active”；“This reduced encapsulation makes changes with side effects more complex to maintain, so we try to avoid them.” https://stripe.com/blog/api-versioning 。所以不是「零歷史相容包袱」。 |
| B5 | 轉換層是獨立的「API 閘道轉換層」，後面接「核心業務微服務」（SVG 結構） | NOT FOUND | 原文描述的是 API 程式碼內的 version change modules，沒有說是獨立的閘道或微服務層。https://stripe.com/blog/api-versioning |
| B6 | 用戶「在 2017 年註冊時鎖定」API 版本（第 89 行） | SUPPORTED（有但書） | “The first time a user makes an API request, their account is automatically pinned to the most recent version available.” https://stripe.com/blog/api-versioning 。但書：鎖定時點是第一次 API 請求，不是註冊。現行文件稱為帳號的 default API version，可在 Workbench 調整、可用 `Stripe-Version` 標頭覆寫（https://docs.stripe.com/api/versioning）。 |
| B7 | 2017 年鎖定的版本「在 2026 年依然能完美執行」（第 89 行） | NOT FOUND | 2017 年原文：“To date, we’ve maintained compatibility with every version of our API since the company’s inception in 2011.”，但同篇也說 “we expect to eventually start retiring our older API versions.” 現行 versioning、upgrades 文件與 2024 年新流程公告（https://stripe.com/blog/introducing-stripes-new-api-release-process ）都沒有寫舊版本的支援期限或保證。2017 年的版本字串仍列在 changelog，但這只證明紀錄存在，不證明 2026 年仍可呼叫。 |
| B8 | 每個歷史版本的差異封裝為單獨的轉換函式（第 140 行「優勢」） | SUPPORTED | 每個模組 “defines documentation about the change, a transformation, and the set of API resource types” https://stripe.com/blog/api-versioning |
| B9 | 範例版本「2017-05-10」（SVG 第一格，Stripe 標題下） | CONTRADICTED（輕微） | Stripe 2017 年的版本是 `2017-01-27`、`2017-02-14`、`2017-04-06`、`2017-05-25`、`2017-06-05`、`2017-08-15`、`2017-12-14`，沒有 `2017-05-10`（https://docs.stripe.com/changelog）。若只是示意，宜標明。 |

### C. 時期問題（不計入統計）

全節用現在式描述 2017 年的機制。Stripe 自 2024 年起改為：“Starting with the 2024-09-30.acacia release … we release new API versions monthly with no breaking changes. Twice a year, we issue a new major release … that starts with an API version containing breaking changes.” 版本名稱也變成 `YYYY-MM-DD.<代號>`，目前是 `2026-09-30.endive`。https://docs.stripe.com/api/versioning 。內部是否仍用 version change modules，現行官方資料沒有說明。

### 範圍外觀察（未查核，供參考）

§1 的 SVG 標題「Custom Header 版本控制 (Stripe)」與表格把 Stripe 列在 Custom Header 一欄，範例標頭寫 `X-API-Version`，§5 寫 `X-Version`。Stripe 實際的標頭名稱是 `Stripe-Version`（https://docs.stripe.com/api/versioning），若要掛 Stripe 名字，範例宜改用真名或明說是通用示意。

## 參考連結檢查

文末沒有參考連結區，只有 frontmatter 的 `repositoryUrl`：

| 連結 | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://github.com/ByteByteGoHq/system-design-101 | 存在 | repo 首頁 | 都撐不起。README 目錄沒有 Stripe 條目，和版本相關的只有 “What do version numbers mean?”（語意化版本號，與 API 版本控制無關）；而且屬二手整理。 |

建議補上的一手來源：https://stripe.com/blog/api-versioning （Brandur Leach, 2017-08-05）、https://docs.stripe.com/api/versioning 、https://stripe.com/blog/introducing-stripes-new-api-release-process 。

## 修正建議（供作者參考，本次不改文）

1. 開頭「數百個」改成「一百多個（截至 2026-09 的 changelog）」，或引用 2017 年原文「近百次不相容升級」並標年份。
2. 節名與 SVG 拿掉「雙向」與 Request Translators，改為「回應依版本鏈往回轉換」；若要保留請求轉換，明說是作者延伸的設計，不是 Stripe 公開的做法。
3. 中央格的「零歷史相容包袱」改寫，補一句 Stripe 原文承認有副作用的變更要在核心程式碼檢查版本。
4. 「2017 年的版本 2026 年依然能完美執行」改成有出處的說法（2017 年時 Stripe 對 2011 年以來所有版本維持相容），並補上 2024 年起的月版＋半年 major release 流程。
5. 「註冊時鎖定」改成「第一次 API 請求時鎖定」；範例版本改用真實版本（如 `2017-05-25`）或標為示意。
6. 補上參考連結區，引用上列一手來源。
