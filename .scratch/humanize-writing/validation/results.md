# 敘事模式行為驗證結果

日期：2026-10-21。分支：`feat/humanize-writing-narrative`。輸入與檢查點見 `inputs.md`。每個案例由一個獨立子代理盲測：只拿到 SKILL.md 與原文，看不到檢查點。

| 案例 | 結果 | 說明 |
| --- | --- | --- |
| A 繁中事故故事 | 通過 | 戲劇化開場、情緒直說、套語描寫、預告、三個單句段、結尾說教都已移除；數字、術語、時間順序、「說實話有點慌」「不太確定」都保留；沒有新增細節。 |
| B 英文短篇（第一輪） | 部分通過 | 禁用句式都已處理，刻意重複與 Mara 的對白保留；但哥哥台詞被重組成「Ten years… Ten years…」，加了原文沒有的修辭。 |
| B 英文短篇（收緊 §5 後重跑） | 通過 | 只刪「As you know」與「I'm upset because」，其餘字句照原順序保留。 |
| C 中英混合貼文 | 通過 | 逐段判斷模式（第 2 段為敘事，其餘為論述）；論述段套用 zh-tw.md，敘事段刪掉情緒直說；「大概 2%」、200／37 與英文術語都保留。 |

## 修正

- 兩份 narrative reference 的 §5 改為明確列出可刪的部分（「你也知道」框架、說明自己情緒的子句），其餘字句照原文與原順序保留。

## 觀察（未處理）

- A 與 C 的子代理把「繁中正文夾英文術語」判成混合語言，四個 reference 都讀了，但只套用繁中規則，輸出不受影響。這是改版前就有的語言判斷模糊，不屬於本次敘事範圍。

## 論述規則 9–11（防禦性否定、「本文」免責、段尾固定警語）

來源：carlstack.gravito.dev〈emudhra-client-trust-runtime-remediation〉。先由主代理手改「今天新增的是修復傳遞」一節，作者試讀後認可；規則依該次手法寫成。之後用未作為範例的「負向測試」一節盲測。

| 檢查點 | 結果 |
| --- | --- |
| 只載入 zh-tw.md，判為論述、不載入 narrative | 通過 |
| `--insecure` 紅線與「不附加 token」保留 | 通過 |
| 「DNS 失敗不能當成已拒絕」這類排除真實誤解的否定保留 | 通過 |
| 「並非完整矩陣」刪除、「不能只測一個 host」改為正面陳述 | 通過 |
| 「本文未在讀者環境執行」改第一人稱並保留範圍限制 | 通過；措辭「我沒有在讀者的環境執行過」偏生硬 |
| 不新增主張 | 大致通過；對照組改寫成「它也連不上，問題就在網路」，把原文的目的說成判讀方法，屬於輕微引申 |
| 事實、網址、主機名、術語、「可能」保留 | 通過 |

作者試讀後確認兩點並寫入規則：「本文」改第一人稱時用口語（「我沒有實際跑過」），以及否定改寫成正面陳述時保留原句作用，不把目的延伸成判讀方法（zh-tw §9／en §10）。

## 第二篇：tsrs-typecheck-shadow-validation（論述規則 12–13）

全文盲改：§9–11 都抓到；新冒出兩類（讓步轉折句型重複、分號串長句），作者試讀手改後認可，寫成 zh-tw §12–13、en §13–14。全文盲改把第 34 行「這是目標，不能縮成已完全相容」併掉，屬執行偏差。

規則補上後，用未作為範例的第 22–36 行再盲測：

| 檢查點 | 結果 |
| --- | --- |
| 只載入 zh-tw.md | 通過 |
| 第 24、26、34 行分號拆句，未加因果 | 通過 |
| 第 34 行「不能縮成已完全相容」保留 | 通過（上一輪的偏差沒有重現） |
| 標題不是平衡口號，§12 不誤用 | 通過 |
| 原文較乾淨時少改 | 通過，只改 4 處 |

差異：第 28 行「不是 tsrs 的實測結果」這一輪保留、全文那一輪改成「這組數字是我假設的」。兩種都符合 §9，屬判斷差異。

觀察：兩篇文章的粗體結尾 `**…。**` 後接中文字，CommonMark 不認為是粗體結束，live 頁面直接顯示星號。這是部落格原始檔問題，不在本 repo。

## 第三篇：order-system-write-ownership（敘事首次碰真實文本；放寬 §9–12）

全文盲改：第 3–5、15–20 行正確判為敘事並原樣保留（開頭本來就具體）。沒有新的禁用類型，但三條規則寫得太窄：「本例／這篇」不在 §10 字面內、約 15 段以範圍限定句收尾不在 §11 字面內、同一紅線全文出現 4 次但 §9 只看上一句。另有設問句標題 4/6。作者同意：放寬 §9（全文重複，紅線留一處）、§10（本例／這篇／本系列，無「我」時省略主詞）、§11（含範圍限定句）、§12（全部標題同一句型時才改）；SKILL.md 寫明英文術語不構成混合語言。全文盲改刪掉第 72 行圖說，作者決定保留。

放寬後用第 74–107 行盲測：

| 檢查點 | 結果 |
| --- | --- |
| 只載入 zh-tw.md（不再誤判混合語言） | 通過 |
| 「本例」「這篇」「本文」處理，原文無「我」時省略主詞 | 通過 |
| 第 90 行段尾範圍限定句併入前句，三條紅線都保留 | 通過 |
| 第 76 行粗體紅線保留 | 通過 |
| 標題一問一述，§12 不誤用 | 通過 |
| 沒有新的禁用類型 | 通過（達成停止條件） |

盲測指出「紅線留一處」可能波及開頭的主張句，補一句：開頭陳述全文主張的那句不算重複（zh-tw §9／en §10）。

## 實作：CarlStack eMudhra（第一篇正式發布）

技能盲改後，子代理自己標出 §10 範例「我沒有實際跑過」把「沒在讀者環境執行」的範圍改窄，違反第 1 優先。作者決定改回「我沒有在你的環境跑過」，並修正 zh-tw §10／en §11 範例，註明範圍照原文。其餘作者修正：標題「今天」改成具體日期、刪第 45 行冒號引子、第 25 行孤立連結句併入句中。

## 實作：CarlStack tsrs（第二篇正式發布）

技能盲改 19 行，沒有新的類型。主代理修正 3 處：Wasm 標題被改成只剩讓步的前半（丟了「維護責任」那半的保留），換回作者認可的版本；「尚不是…的指令」被改強為「還不能」，改回「還不到…的時候」；第一人稱範圍句改成「沒有在你的 repository 跑過」。子代理指出 §13 範例把「診斷順序與平行執行相關的差異」拆成兩類可能誤讀，這次照原文保留。

## 實作：CarlStack order-system-write-ownership（第三篇正式發布）

技能盲改 12 行，敘事段（第 20–22 行）判定正確且未改，沒有新的類型。§10「省略主詞」在三處讓句子不通順，子代理改用「這裡」；作者認可，補進 zh-tw §10／en §11。發布前另把 §13／§14 會把一類差異拆成兩類的範例換掉。

## 實作：multi-item、magpie、youtube（第四至六篇，平行盲改）

- multi-item：子代理把「本例」全改成「這裡」，全文「這裡」從 1 增到 10，成為新口頭禪。主代理改回 3 個；標題丟了「也能」的可行性，改成「Savepoint 方案：先扣再退回，…」。作者同意在 zh-tw §10／en §11 加「替代詞全文最多兩三次」。
- magpie、multi-item：段尾範圍限定密集，但多為作者未驗證範圍（事實）或技術紅線，§11 無法處理。候選做法：把驗證範圍集中成一段；待作者試讀手改版。
- youtube：敘事（阿晴故事線 8 處）判定正確並保留；抓到 3 處對岸用語（接口、消息、協議）。

作者試讀 magpie 集中版後同意：新增 zh-tw §14／en §15「查核範圍集中到開頭查核段」。

## 實作：09-02 第一批（event-sourcing、linux-io、cpu-cache、distributed-queue、data-pipelines）

- 五篇平行盲改後發布（CarlStack `064acac`），同步技能的批次教訓（carl-skills PR #14：圖表文字、URL 鍵、事實查核、台灣用語）。
- stack-overflow 與麥當勞潤稿完成但暫緩發布，稿子存在 handoff 的 `drafts/`。stack-overflow 原文自相矛盾：description「數億 QPS」對內文 3,000–5,000；標題「微秒級」對內文毫秒；SVG「95%」對內文「超過 90%」；SVG 寫 .NET 9。
- 已發布文章的局部事實疑點（未修）：linux-io 說 `FD_SETSIZE` 在核心標頭檔（實為 glibc）；ET 模式「資料永久遺失」（實為資料仍在緩衝區、只是不再通知）；Netty 預設 ET 只對 native epoll transport 成立。

## 查核：麥當勞事件驅動架構（未通過）

主架構與一手來源不符。麥當勞公開的 EDA 是 Amazon MSK（Kafka）＋ Schema Registry ＋ DynamoDB 備援，訂單平台跑 Kubernetes（medium.com/mcdonalds-technical-blog 的 “Behind the scenes: McDonald's event-driven architecture”、“…The data journey and how it works”、2026-08 “When a Missed Message Becomes a Missed Meal”；aws.amazon.com/solutions/case-studies/mcdonalds/）。文章的 API Gateway → Lambda → SQS → DynamoDB Streams → EventBridge、SQLite、Local WebSocket、us-east-1／us-west-2、30ms、10 秒切換全部查無出處，DLQ 與事件匯流排與來源矛盾；四個參考連結無一支撐正文（兩個首頁、一個 404、一個標題不符）。

作者同意的原則：把虛構事實潤得更像人寫只會更可信。通用技術解說直接潤稿、局部疑點另記；公司案例文先查核，不通過者由作者逐篇選「依一手來源重寫」或「改標成參考設計並刪除歸給該公司的數字與元件」。

## 查核：公司案例文 A 批（8 篇，2026-10-22）

清點見 `company-case-inventory.md`；逐項報告在 `fact-check/<slug>.md`（SUPPORTED／CONTRADICTED／NOT FOUND ＋引文與 URL）。

| slug | 總評 | S／C／NF | 要點 |
| --- | --- | --- | --- |
| stripe-payment-gateway-smart-routing | 未通過 | 11／3／7 | 狀態機非 Stripe PaymentIntent 狀態；智慧路由與 Stripe Orchestration（商家自訂規則）矛盾；超時補償數字無出處 |
| tiktok-massive-frontend-monorepo-architecture | 未通過 | 9／5／14 | 官方工具鏈是 Rush＋PNPM＋Sparo／Cobuilds／Subspaces，文章全未提；Garfish、Rspack 與此 MonoRepo 無關聯證據；CI 與快取數字矛盾 |
| youtube-video-upload-transcoding-pipeline | 未通過 | 9／2／21 | 骨架有 Argos VCU 論文支撐；熱度感知細節與上傳 API 形狀矛盾；元件與數字多無出處 |
| serverless-cloud-native-database-neon-planetscale | 局部修正 | 21／9／3 | 主架構對得上官方；gh-ost／雙寫、Rust 版 PgBouncer、VTGate 連線池、CLI 指令等細節錯 |
| system-design-interview-stack-overflow-architecture | 未通過 | 12／12／7 | 硬體骨架有出處；Fastly 快取 90–95%、Redis Tag 索引與來源矛盾；2013–2019 架構寫成現在式 |
| airbnb-microservices-evolution-architecture | 未通過 | 14／8／15 | 三代年份全錯；DAG 分層時間因果顛倒；Viaduct 被寫成薄閘道（官方相反） |
| netflix-hierarchical-caching-push-messaging | 局部修正 | 17／2／13 | 主架構有出處；XFetch 整段無出處；RENO 投遞流程矛盾；多數數字無出處 |
| reddit-core-storage-high-concurrency-architecture | 未通過 | 22／13／15 | Thing2／兩張表、Redis 熱榜、Cassandra Materialized Path 留言樹與原始碼矛盾；hot 公式新舊版混用 |

共同模式：8 篇沒有一篇的參考連結支撐正文。連結多指向部落格首頁或 ByteByteGo repo 首頁，標註的篇名常常不存在，另有 404 與署名錯誤。

查核過程的事故：netflix 子代理查 SEC 財報時把使用者 email 放進 User-Agent 送出（子代理自行回報）；之後的查核 brief 要明寫禁止。

## 處置：公司案例文 A 批（2026-10-22，已 stage 未發布）

使用者同意的處置：youtube、stack-overflow 依一手來源重寫；tiktok、stripe、airbnb、reddit 改成「參考設計」，開頭交代該公司實際公開過什麼；neon-planetscale、netflix 局部修正。8 篇在事實修完後再去 AI 味，共用一份子代理 brief（三種模式、frontmatter 只改 title／description、禁止送出個資）。

- 兩輪 code-reviewer 抓到的問題都退回原子代理修正：reddit 手機版圖解標題仍歸屬 Reddit；stripe `do_not_try_again` 的描述與連結不符；tiktok 結尾「並重」的立場被改反；多處對岸用語。
- 主代理查證後修正：Stack Overflow 的 40:60 是資料庫磁碟存取的讀寫比（Craver 2013）；reddit ZADD 範例分數依 hot 公式重算。
- gate：`content:policy` 8 篇通過、`check` 退出碼 0、`test` 117／117；1280 與 320 px 版面腳本量測，320 px 無溢出，桌面 5 處經截圖確認為誤判。
- 回饋技能：對岸用語 8 個補進 `zh-tw.md` 對照表（PR #15）。三種處置模式屬於查核後的改寫流程，留在 brief，不進技能。
- 待使用者決定：`repositoryUrl` 指向 ByteByteGo repo 首頁；airbnb、reddit 的 `series` 與參考設計定位衝突；airbnb `coverAlt`；封面圖文字未檢查；tiktok 啟示第 3 點的立場。

## 查核：公司案例文 B／C 批（12 篇，2026-10-22）

逐項報告在 `fact-check/<slug>.md`。B 批查整篇，C 批只查歸給公司的段落。

| slug | 批 | 總評 | S／C／NF | 要點 |
| --- | --- | --- | --- | --- |
| discord-trillions-messages-scylladb-scaling | B | 局部修正 | 22／7／8 | 骨架對；「P99 數十秒→15ms」四處錯（原文讀取 40–125ms）；Cassandra、ScyllaDB 年份錯；Rust data services 時序顛倒 |
| figma-postgres-scaling-architecture | B | 未通過 | 16／10／15 | 「零停機」與原文（30 秒部分不可用）矛盾；遷移流程是 Figma 明說沒採用的做法；128／16／8／4 分片數無出處；YouTube 連結失效 |
| meta-scale-automated-bug-fixing-sapfix-infer | B | 未通過 | 15／14／7 | 骨架錯：觸發 SapFix 的是 Sapienz，不是 Infer；75% 是 Sapienz 人工修復率；修復策略漏 revert、虛構 ML 策略 |
| shopify-resilient-payment-systems | B | 未通過 | 6／5／12 | 10 原則與原文（Bart de Water 2022 個人分享）只對上 5 項；等候室實作錯；寫成 AWS（實為 GCP） |
| slack-message-pipeline-architecture | B | 未通過 | 6／5／19 | Vitess 分片鍵寫成 workspace（遷移後是 channel）；延遲 100ms（原文 500ms）；元件職責錯、虛構 Channel Router |
| twitter-recommendation-algorithm-pipeline | B | 未通過 | 20／10／12 | 權重表錯（讚 0.5 寫成 +30）；TIP 結論是官方點名的誤讀；2023 快照寫成現在式（2026-01 已另開源 `xai-org/x-algorithm`，主代理已查證） |
| uber-api-gateway-evolution-architecture | B | 未通過 | 7／7／9 | 原文只有三代，文章寫四代；Envoy／Protobuf 寫錯（實為 Zanzibar＋Thrift）；主要參考連結 404，slug 是 ByteByteGo 檔名 |
| pinterest-git-clone-optimization-commit-graph | B | 未通過 | 16／6／7 | 那一行是 refspec 只抓 master，不是 commit-graph；根因與規模數字錯；成效數字多無出處 |
| api-versioning-strategies-backward-compatibility | C | 局部修正 | 4／3／4 | 「數百個版本」實為 124；「零歷史包袱」與原文矛盾；請求方向轉換無出處；2024 起改月版＋半年 major 未提 |
| zero-trust-architecture-beyondcorp | C | 局部修正 | 7／4／3 | 服務間 mTLS 屬 BeyondProd；代理是 GFE 不是 Envoy；無風險分數；「開創零信任」不成立 |
| omarchy-dhh-omakase-linux-desktop | C | 局部修正 | 30／6／7 | 理念與沿革對；4.0 預設終端機是 Foot；Windows VM 無 GPU 直通；Agents 面板描述錯 |
| tsdb-architecture-lsm-gorilla-compression | C | 局部修正 | 16／3／1 | 演算法與論文逐字相符；1.37 bytes 是整個資料點不是浮點值；「壓縮率 96%」是時間戳比例 |

共同模式與 A 批相同：B 批雖然連到一手專文，正文仍大量超出來源，錯誤集中在 description、前言、圖解、總結表這些顯眼位置的數字與年份；多篇把某一時期的架構寫成現在式。B 批 7／8 未通過，C 批 4 篇都是局部修正。

個資：12 個子代理都回報未送出 email 或個資，User-Agent 一律通用字串。omarchy 子代理用 `gh` 讀公開 repo 時帶了本機 GitHub 登入（工具預設），未放入個資內容。

## 發布：公司案例文 A 批（2026-10-22）

使用者試讀 reddit 後同意發布；決定刪除 8 篇指向 ByteByteGo repo 首頁的 `repositoryUrl`、airbnb／reddit 保留系列、tiktok 維持「值得評估」。CarlStack `6fe3c1c`（8 篇＋7 圖解）與 `c964c15`（技能對照表同步），rebase 到遠端新內容後重跑 `content:policy`、`check`（退出碼 0）、`test`（117／117），Cloudflare Workers 部署 run 39726635520 成功。正式網址抽查 4 篇皆 200、已無 ByteByteGo 連結、新內容（ZADD 重算分數、磁碟存取讀寫比、「值得評估」）在線。airbnb `coverAlt` 與封面圖文字仍未處理。

## 處置：公司案例文 B／C 批（2026-10-22，已 stage 未發布）

使用者同意：B 批 figma、meta、shopify、slack、twitter、uber、pinterest 依一手來源重寫；discord 局部修正＋全文去 AI 味；C 批 4 篇局部修正。8 篇 ByteByteGo `repositoryUrl` 刪除（使用者 A 批時定案）。主代理在改稿中途把 C 批擴為「事實修正後全文去 AI 味」（理由：09-02 文章本來就要去 AI 味，且 `updatedDate` 會讓它們排到最近更新），已告知使用者可在試讀時要求退回。

- 兩個 code-reviewer：C 批與 discord 無 CRITICAL／HIGH；B 批 2 項 HIGH（uber 20% 手機 build 數字時期錯置、meta 合入比例自相矛盾）與數項 MEDIUM／LOW，全部退回原子代理修正。figma「10 秒部分不可用」經審查抓原文確認就是 2023-09 第一張分片表那次。
- 主代理自修：zero-trust、figma 標題縮短；tsdb 刪 ByteByteGo 正文連結、論文改 https；api-versioning 表格移除 Stripe 歸屬、「雙向」與「HATEOAS」說法修正；zero-trust「NIST 歸納三原則」改成「800-207 列七項 tenets，常見濃縮為三點」、「上下文感知存取代理」改回論文的 Access Proxy；pinterest 刪掉案例欄指向通用 commit-graph 欄的因果箭頭；uber 第 1 代 tag 改中性樣式；discord 箭頭標籤縮短（實際渲染重疊卡片邊）。
- gate：12 篇 `updatedDate: 2026-10-22T13:29:27+08:00`（omarchy 原有值被更新）；`content:policy` 12 篇通過、`check` 退出碼 0（標籤修正後重跑仍 0）、`test` 117／117。版面：320 px 只有 tsdb 一處 delta-of-delta 情況標籤超出 viewBox，屬 HEAD 既有、本次未改；桌面被腳本標出的新增標籤經截圖確認未溢出。
- 未處理（brief 鎖定或範圍外）：多篇 `coverAlt` 仍帶舊主張（uber 多區域、slack、figma 智慧路由、pinterest commit-graph、zero-trust 微隔離、discord 數萬筆、meta、shopify 狀態機）；封面圖文字未檢查；`series`「復盤」為對岸用語；tsdb 既有 SVG 溢出；zero-trust §4「未授權微服務無法發起 TCP 連線」技術上不精確。

## 發布：公司案例文 B／C 批（2026-10-22）

使用者試讀 meta 後同意發布，並決定：只改帶錯誤主張的 coverAlt、順手修 tsdb 既有 SVG 溢出。封面圖逐張看過，都沒有文字。CarlStack `51ea05d`（12 篇＋11 圖解）與 `2a96e64`（8 篇 coverAlt：airbnb、discord、meta、shopify、slack、uber、pinterest、zero-trust；tsdb delta-of-delta 標籤縮短，版面量測 1280／320 皆 OK）。gate：`content:policy`、`check`（退出碼 0）、`test` 117／117。Cloudflare 部署 run 39729480856 成功；正式網址抽查 7 篇皆 200、無 ByteByteGo repo 連結、新內容在線。

公司案例文 A、B、C 三批（20 篇）至此全部發布。仍未處理：麥當勞一文（查核未通過，待使用者決定）、`series`「復盤」用語、zero-trust §4「未授權微服務無法發起 TCP 連線」的技術精確度。

使用者決定（2026-10-22）：麥當勞一文不處理；`series` 保留；zero-trust §4 改寫為「未授權微服務仍能建立 TCP 連線，但會在 TLS 握手時被拒絕；要在 TCP 層擋下需搭配網路政策」，CarlStack `b8fe0d5` 已部署（run 39730485302）並在正式網址確認。公司案例文工作結束。
