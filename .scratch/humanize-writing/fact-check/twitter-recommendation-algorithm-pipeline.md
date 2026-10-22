# 事實查核：twitter-recommendation-algorithm-pipeline.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/twitter-recommendation-algorithm-pipeline.mdx`，連同 `src/components/TwitterRecommendationPipelineDiagram.astro` 的圖解文字
- 公司：Twitter／X
- 查核日期：2026-10-22
- 方法：只採一手來源，包括 Twitter 2023-03-31 的部落格文 “Twitter's Recommendation Algorithm”、`twitter/the-algorithm` 與 `twitter/the-algorithm-ml` 的 README 和程式碼，以及 X 在 2026 年開源的 `xai-org/x-algorithm` README。ByteByteGo 只當線索用。
- 取得方式：blog.x.com 對自動化請求回 Cloudflare 驗證頁（HTTP 403），所以部落格引文取自 Wayback Machine 封存的 blog.twitter.com 原文（同一篇，2023-03-31，署名 “Written by the Twitter Team”）。

## 總評：未通過

文章的骨架對得上 2023 年的開源資料。四段管線（候選檢索 → 排序 → 過濾與啟發式 → 混排）、每次請求約 1,500 則候選、約 4,800 萬參數的 Heavy Ranker 採 parallel MaskNet、Home Mixer 建在 Scala 的 Product Mixer 上、GraphJet、SimClusters、Earlybird 基於 Lucene，這些都有一手出處。

問題集中在文章最想強調的地方：

1. **權重表錯了。** 文章把「點讚」權重寫成 +30，官方 README 是 0.5，兩個版本都是。文章把 −369 歸給「舉報／封鎖／靜音」，但 −369 只對應 Report；封鎖、靜音與「顯示較少」屬於 `negative_feedback_v2`，權重是 −74。表格的「模型預測目標」欄也對錯列：+75 對應的是「回覆並被作者互動」，不是 `P(Reply)`；+11 對應的是「點進對話並按讚或回覆」，不是 `P(Video/Media)`。TIP 框由這些錯誤推出兩個結論：「作者互動是點讚的 2.5 倍」實際是 150 倍；「一次舉報要十幾個讚才能抵消」在計算上不成立，也是 X 官方點名過的誤讀。
2. **「1.5 秒 SLA 硬性邊界」不是原文。** 原文寫的是 “completes in under 1.5 seconds on average”，這是平均值，不是 SLA。
3. **「50%／50% 嚴格劃分候選池」不是原文。** 原文說的是 For You 時間軸的內容平均各半，而且 “may vary from user to user”，不是候選池的硬性配額。圖解的「~750 則」也是從這個誤讀推出來的。
4. **時期錯置。** 文章在 2026-09 發表，用現在式描述「使用者打開 X 首頁時」的系統，但內容全是 2023 年 3 月的快照。X 在 2026 年 1 月另外開源了 `xai-org/x-algorithm`：現行管線的站內來源是 Thunder，站外來源是 Phoenix retrieval 加 SimClusters，排序改用 transformer 模型 Phoenix，Home Mixer 也改寫成 Rust。依 brief 的規則，這算 CONTRADICTED。

另外，SimClusters 的社群數被寫成「數千個」，原文是 145k；特徵寫成「數百個維度」，原文是約 6,000 個。「Topic Balance：平衡政治、科技、娛樂」是把原文的 Content Balance（站內與站外的比例）改寫成主題平衡。

統計：SUPPORTED 20、CONTRADICTED 10、NOT FOUND 12。

## 主張逐項查核

### A. 規模與時期

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 全球每天產生 5 億則推文（前言、圖解、比較表） | SUPPORTED | “distill the roughly 500 million Tweets posted daily down to a handful of top Tweets” — 2023 部落格（下稱 Blog）。註：候選池原文寫的是 “from a pool of hundreds of millions”。 |
| A2 | 「1.5 秒（1,500 毫秒）的端到端 SLA 限制」；比較表寫「~1,500 ms（SLA 硬性邊界）」；圖解寫「端到端 SLA 嚴控 <1.5s」 | CONTRADICTED | Blog：“The pipeline above runs approximately 5 billion times per day and completes in under 1.5 seconds on average. A single pipeline execution requires 220 seconds of CPU time”。原文是平均值，沒有提到 SLA 或硬性上限。 |
| A3 | 2023 年 X 團隊將核心推薦演算法開源（前言） | SUPPORTED（有但書） | Blog 日期是 2023-03-31，署名 “Written by the Twitter Team”。當時公司還叫 Twitter，2023 年 7 月才改名 X。 |
| A4 | 以現在式描述「當使用者打開 X 首頁時」系統怎麼運作，全文都以 2023 年的元件為準（前言及全文） | CONTRADICTED（時期） | `xai-org/x-algorithm`（2026-01-19 建立）README：“This repository contains the core code that determines which posts a viewer sees in the For You feed on X… ranks posts using a transformer model.” 站內來源是 “`thunder/` keeps recent posts from the accounts a viewer follows in memory”，站外來源是 “`phoenix/` retrieval and `simclusters/`”。https://github.com/xai-org/x-algorithm 。文章內容只能當作「2023 年開源版本」的描述。 |

### B. 候選檢索

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 候選池收斂到 1,500 則 | SUPPORTED | Blog：“For each request, we attempt to extract the best 1500 Tweets from a pool of hundreds of millions through these sources.” |
| B2 | 「X 將候選池嚴格劃分為兩大等份來源：50% In-Network 與 50% Out-of-Network」；圖解寫「~750 則關注圈內／~750 則探索推薦」 | CONTRADICTED | Blog：“Today, the For You timeline consists of 50% In-Network Tweets and 50% Out-of-Network Tweets on average, though this may vary from user to user.” 原文講的是最終時間軸的平均比例，而且因人而異，不是候選池的嚴格配額。 |
| B3 | In-Network 由 Earlybird 負責，它是以客製化 Apache Lucene 建成的分散式搜尋叢集與倒排索引 | SUPPORTED | `src/java/com/twitter/search/README.md`：“Earlybird is a real-time search system based on Apache Lucene”；“The architecture uses a distributed inverted index that is sharded and replicated.”；“Earlybird (Search Index) is the major candidate source for in-network tweets” https://github.com/twitter/the-algorithm/blob/main/src/java/com/twitter/search/README.md |
| B4 | 近期推文的索引「完全駐留在記憶體中，並按時間倒序維護」 | NOT FOUND | 上述 README 只寫到 realtime cluster 索引 “all public tweets posted in about the last 7 days”，沒有寫「完全駐留記憶體」或時間倒序。README 連到的 Earlybird 論文（ICDE 2012）本次沒有查。 |
| B5 | Earlybird 依「互動基礎分值」篩出前幾百則 | NOT FOUND | Blog 的說法是另一種機制：“It efficiently ranks Tweets of those you follow based on their relevance using a logistic regression model… The most important component in ranking In-Network Tweets is Real Graph.” 「前幾百則」沒有出處。文章漏掉了 Real Graph 與 logistic regression。 |
| B6 | GraphJet 在記憶體中維護「用戶 ⇄ 推文」的二分互動圖 | SUPPORTED | Blog：“GraphJet, a graph processing engine that maintains a real-time interaction graph between users and Tweets”；repo README 介紹 UTEG：“Maintains an in memory User to Post interaction graph… built on the GraphJet framework.” |
| B7 | 找相似用戶，再遍歷他們近期按讚或轉發的推文 | SUPPORTED | Blog：“Who likes similar Tweets to me, and what else have they recently liked?”；“What Tweets did the people I follow recently engage with?” |
| B8 | 統計「共現權重（Co-engagement Weight）」 | NOT FOUND | Blog 只說 “rank the resulting Tweets using a logistic regression model”。另外，原文指出這類圖遍歷只供應約 15% 的時間軸推文，“embedding space approaches have become the larger source of Out-of-Network Tweets”；文章沒有交代兩者的比重。 |
| B9 | 全平台劃分成「數千個」SimClusters 興趣社群 | CONTRADICTED | Blog：“There are 145k communities, which are updated every three weeks.” 文中舉例的「Rust 開發者」「NBA 球迷」等社群名稱是示意，原文沒有。 |
| B10 | SimClusters 以矩陣分解建成 | SUPPORTED | Blog：“SimClusters discover communities anchored by a cluster of influential users using a custom matrix factorization algorithm.” |
| B11 | 用戶與推文都投影到社群空間，依推文在社群內的熱度比對用戶興趣 | SUPPORTED | Blog：“Users and Tweets are represented in the space of communities”；“We can embed Tweets into these communities by looking at the current popularity of a Tweet in each community.” |

### C. Home Mixer 與特徵

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | Home Mixer 是中央調度中樞，用 Scala 建構 | SUPPORTED | Blog：“Home Mixer is built on Product Mixer, our custom Scala framework… This service acts as the software backbone that connects different candidate sources, scoring functions, heuristics, and filters.” |
| C2 | 「基於 Scala / Finagle 微服務框架」 | NOT FOUND（Finagle 部分） | Blog 與 `home-mixer/README.md`、`product-mixer/README.md` 都沒有提到 Finagle。 |
| C3 | 並行呼叫 Earlybird、GraphJet 與 SimClusters 收集候選 | SUPPORTED（有但書） | `home-mixer/README.md` 的候選來源是 “Earlybird Search Index, User Tweet Entity Graph, Cr Mixer, Follow Recommendations Service”。SimClusters 是經由 Cr Mixer（後來的 Tweet Mixer）間接呼叫，Home Mixer 不直接打 SimClusters。 |
| C4 | 向 Feature Store 查詢「數百個維度」的特徵 | CONTRADICTED | `home-mixer/README.md`：“Feature Hydration — Fetch the ~6000 features needed for ranking”；Blog：“takes into account thousands of features”。 |
| C5 | 「分散式記憶體 Feature Store」（關鍵思考第 3 點） | NOT FOUND | 一手資料沒有描述 Feature Store 的儲存形式。 |

### D. Heavy Ranker 與權重

權重的出處是 `the-algorithm-ml/projects/home/recap/README.md`。2023-03-31 的初版和 2023-04-05 的修訂版都已核對。

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | Heavy Ranker 採 MaskNet，約 4,800 萬參數 | SUPPORTED | Blog：“Ranking is achieved with a ~48M parameter neural network”；README：“The model architecture is a parallel MaskNet”。 |
| D2 | 以多任務學習同時預測多種行為的機率 | SUPPORTED | Blog：“outputs ten labels to give each Tweet a score, where each label represents the probability of an engagement”。註：實際有 10 個輸出，文章只列 5 個。 |
| D3 | `Score = Σ w_i × P(Action_i)`，權重可動態調整 | SUPPORTED | README：“score = sum_i { (weight of engagement i) * (probability of engagement i) }”；“The exact weights in the file can be adjusted at any time”。 |
| D4 | 點讚權重 +30.0（表格、SVG） | CONTRADICTED | 4/05 版：“scored_tweets_model_weight_fav: 0.5”；3/31 版：“recap.engagement.is_favorited: 0.5”。兩版都找不到 30。 |
| D5 | 轉發權重 +1.0 | SUPPORTED | “scored_tweets_model_weight_retweet: 1.0” |
| D6 | 「作者回覆該互動」權重 +75.0 | SUPPORTED（數字）；表格欄位錯列 | “scored_tweets_model_weight_reply_engaged_by_author: 75.0”。但表格的預測目標欄寫 `P(Reply)`，而一般回覆的權重是 13.5（4/05 版）或 27（3/31 版）。 |
| D7 | 點擊查看對話串 +11.0 | SUPPORTED（數字）；表格欄位錯列 | “scored_tweets_model_weight_good_click: 11.0”，定義是 “click into the conversation of this Tweet and reply or Like a Tweet”。表格的預測目標欄寫成 `P(Video/Media)`，影片相關的 `video_playback50` 權重其實是 0.005。 |
| D8 | 「舉報／封鎖／靜音」權重 −369.0 | CONTRADICTED | −369 只對應 “scored_tweets_model_weight_report: -369.0”（“click Report Tweet”）。封鎖、靜音與「顯示較少」屬於 “negative_feedback_v2: -74.0”，定義是 “requesting "show less often" on the Tweet or author, block or mute the Tweet author”。 |
| D9 | TIP：「作者互動的權重是普通點讚的 2.5 倍」 | CONTRADICTED | 75 ÷ 0.5 = 150 倍。2.5 倍是拿錯誤的 +30 算出來的。 |
| D10 | TIP：「單次舉報的負權重需要十幾個點讚才能抵消」 | CONTRADICTED | 權重乘的是預測機率，不是行為次數。README 寫明：“the weights were originally set so that, on average, each weighted engagement probability contributes a near-equal amount to the score.” X 在 2026-08-14 的 README 也點名這種讀法是誤解：“it'd be incorrect to see that a report has 468 times higher weight than a like and conclude that e.g. "1 report cancels out 468 likes"” https://github.com/xai-org/x-algorithm 。即使照文章的邏輯算，−369 ÷ 0.5 也是 738，不是「十幾個」。 |
| D11 | 「GPU 叢集低延遲推理（<50ms）」（圖解） | NOT FOUND | 一手資料沒有給 Heavy Ranker 的推理延遲或硬體配置。repo 列出的模型服務框架是 navi（“machine learning model serving written in Rust”），沒有寫用 GPU。 |

### E. 過濾、重排與混排

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | 可見性過濾會排除封鎖、靜音的作者與 NSFW 內容 | SUPPORTED | Blog：“filtering out Tweets from users you’ve blocked, NSFW content, and Tweets you’ve already seen”；`home-mixer/README.md`：“Visibility Filtering (blocked, muted authors/tweets, NSFW settings)”。 |
| E2 | 排除「過去 24 小時內」看過的推文 | NOT FOUND（24 小時部分） | 去重本身有出處：“Deduplication / previously seen Tweets removal”。24 小時這個時間窗沒有出處。 |
| E3 | 垃圾訊息與侵權內容的安全合規過濾 | SUPPORTED | repo README 介紹 visibility-filters：“Responsible for filtering X content to support legal compliance, improve product quality, increase user trust…” |
| E4 | 作者多樣性：同一作者不得連續出現 | SUPPORTED | Blog：“Author Diversity: Avoid too many consecutive Tweets from a single author.” |
| E5 | 「領域分散（Topic Balance）：平衡政治、科技、娛樂等標籤比例」 | CONTRADICTED | 原文是 Content Balance，指站內與站外推文的比例：“Content Balance: Ensure we are delivering a fair balance of In-Network and Out-of-Network Tweets.” 一手資料沒有依主題平衡的機制。原文的 Feedback-based Fatigue 是 “Lower the score of certain Tweets if the viewer has provided negative feedback around it”，也不是文章寫的「審美疲勞」。 |
| E6 | 穿插廣告、關注推薦等非推文內容 | SUPPORTED | Blog：“blends together Tweets with other non-Tweet content like Ads, Follow Recommendations, and Onboarding prompts”。「熱門話題卡片」沒有出處。 |
| E7 | 「過濾剔除 ~50%」（圖解） | NOT FOUND | 沒有出處。 |
| E8 | 漏斗終點是「Top 50」 | NOT FOUND | 沒有出處。 |

### F. 比較表與「關鍵思考」

| # | 主張 | 判定 | 說明 |
|---|---|---|---|
| F1 | 傳統關注時間軸靠 Fan-out 與 Redis List，延遲 <50 ms | NOT FOUND | 一手資料沒有給這個延遲。2023 年時 Twitter 的做法已經不同：Blog 寫 “We recently stopped using Fanout Service, a 12-year old service”，`home-mixer/README.md` 的 Following 分頁則是 “FollowingEarlybirdCandidatePipelineConfig (fetch tweets from Search Index)”。如果這張表要代表 Twitter，就和 2023 年的資料相反。 |
| F2 | 用戶一分鐘前的按讚能立即反映在下一次刷新 | NOT FOUND | GraphJet 是 “real-time interaction graph”，但一手資料沒有給端到端的新鮮度數字。 |
| F3 | 冷啟動能力強，靠 SimClusters 與熱度探索 | NOT FOUND | 這是作者的推論，一手資料沒有談冷啟動。 |

## 參考連結檢查

| 連結 | 狀態 | 說明 |
|---|---|---|
| https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm | 自動化請求被 Cloudflare 擋下（403），內容透過 Wayback Machine 封存的 blog.twitter.com 同路徑原文核對 | 篇名 “Twitter's Recommendation Algorithm” 相符，日期 2023-03-31，署名 “Written by the Twitter Team”。能撐起 A1、B1、B6、B7、B9–B11、C1、D1、D2、E1、E4、E6；它也是 A2、B2、B9、E5 的反證。正文兩處與參考區各引用一次。 |
| https://github.com/twitter/the-algorithm | 存在，最後推送 2025-09-08 | 能撐起 Earlybird、UTEG／GraphJet、Home Mixer、visibility-filters 等元件描述。 |
| （缺）https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md | 文章沒有引用 | 權重與 MaskNet 的真正出處在這裡。文章寫「在 X 開源的權重參數配置中」，卻沒有連到這份 README，而且數字和它不一致。 |
| https://github.com/ByteByteGoHq/system-design-101（正文、參考區、frontmatter `repositoryUrl`） | 存在，是 repo 首頁 | 屬於二手整理。參考區標題寫成 “Social Media Recommendation Architecture”，但目錄沒有這個條目；相關條目是 “How does Twitter recommend “For You” Timeline in 1.5 seconds?”（https://bytebytego.com/guides/how-does-twitter-recommend-tweets ）。該頁只有一張圖加五行階段摘要，沒有權重數字，所以權重表的錯誤也不是來自這裡。 |
| （缺）https://github.com/xai-org/x-algorithm | 文章沒有引用 | 2026 年的現行 For You 開源版本。文章若維持現在式，就應該引用並改寫；若只談 2023 年，就應該明示時間點。 |

## 修正建議（供作者參考，本次不改文）

1. 前言開頭改成「X（當時仍叫 Twitter）2023 年 3 月開源的推薦管線」，所有現在式改成 2023 年的時間點，再加一句說明 2026 年 X 另外開源的 `xai-org/x-algorithm` 已改用 Thunder、Phoenix 與 transformer 排序。
2. 權重表照 `the-algorithm-ml` README（2023-04-05 版）重寫：Like 0.5、Retweet 1.0、Reply 13.5、Good profile click 12.0、Video playback50 0.005、Reply engaged by author 75.0、Good click 11.0、Good click v2 10.0、Negative feedback v2（封鎖、靜音、顯示較少）−74.0、Report −369.0。修正預測目標欄，連到該 README，並刪掉 TIP 裡「2.5 倍」「十幾個讚抵消」兩個結論，改為說明權重乘的是預測機率，而且原本的設計目標是讓各項平均貢獻接近。
3. 「1.5 秒 SLA」改成「平均不到 1.5 秒」，並可補上原文的 “220 seconds of CPU time” 與每天約 50 億次執行。
4. 「50%／50% 嚴格劃分候選池」與圖解的「~750 則」改成「最終時間軸平均各半，因人而異」。
5. SimClusters 改成 14.5 萬個社群、每三週更新；特徵數改成約 6,000 個；Topic Balance 改回 Content Balance（站內與站外比例），並補上原文的 Social Proof。
6. Finagle、GPU <50ms、24 小時、~50% 剔除、Top 50、<50 ms、Redis List 等數字與元件都沒有出處，請刪除或標成示意。Earlybird 的站內排序補上 Real Graph 與 logistic regression。
7. 參考區把 ByteByteGo 換成具體條目連結並註明是二手整理，`repositoryUrl` 不應該指向二手 repo，另外補上 `the-algorithm-ml` 的 Heavy Ranker README。
