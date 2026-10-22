# 事實查核：system-design-interview-stack-overflow-architecture.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/system-design-interview-stack-overflow-architecture.mdx`
- 歸屬公司：Stack Overflow／Stack Exchange
- 查核日期：2026-10-22（只查核，未改文章）

## 總評：未通過

31 項歸給 Stack Overflow 的具體主張中，12 項有一手來源支持，12 項與來源矛盾，7 項找不到出處；矛盾加無出處共 19 項，過半。硬體骨架（9 台 Web、2 台 Redis、HAProxy 一主一備、SQL Server 大記憶體、L1 本機快取＋L2 Redis、Dapper）有出處，但文章標榜的「三大核心支柱」中，有兩根與來源矛盾。第一根是「L0 Fastly 攔截 90～95% 匿名讀取」：Nick Craver 寫明 Q&A 站「output cache nothing」，2017 年的 Fastly VCL 也把 flair 以外的回應一律設成 `private`。第三根是「Tag 倒排索引放在 Redis Set 做 SINTER、1 毫秒內」：實際上是另外 3 台 Tag Engine 伺服器跑的獨立服務，以官方數據換算，每個請求平均約 37～40 ms。標題「微秒級」、description「數億 QPS」、內文「渲染低於 15 ms」、「2 台 SQL Server 主從」、「Master 純寫入」、「.NET 9」都與來源對不上，或找不到來源。另外，這套架構描述的是 2013～2019 年的自建機房時期，2025 年 Stack Overflow 已遷到 Google Cloud（Kubernetes、nginx、Cloudflare，HAProxy 退役），文中卻用現在式寫，又加上 .NET 9，時間點混在一起。

## 已知自相矛盾的判定

| 原文矛盾 | 來源怎麼說 | 判定 |
| :-- | :-- | :-- |
| description「數億 QPS」vs 內文 3,000～5,000 QPS | 2016-02-09：「209,420,973 … HTTP requests to our load balancer」（一天），約 2,424 req/s；2019-07-30：「308,065,226 HTTP hits」，約 3,566 req/s（換算，推論） | 「數億」是**每日**請求數，不是每秒。description 錯，內文 3,000～5,000 大致對得上 |
| 標題「微秒級」vs 內文毫秒 | 2019 performance 頁：首頁 12.2 ms、問題頁 18.3 ms；2016：問題頁平均 22.71 ms | 「微秒級」錯，應為毫秒級；內文「低於 15 毫秒」也偏低（問題頁 18.3 ms） |
| SVG「95%」vs 內文「超過 90%」 | 找不到任何 CDN 命中率數字；來源反而指出 HTML 不在 CDN 快取 | 兩個數字都沒有出處，且與來源描述的快取策略矛盾 |
| SVG「.NET 9」 | 2016：.NET 4.6.1；2025：公開站台仍有「older applications on the full .NET framework」 | 找不到 .NET 9 的出處，現有證據反而指向舊版 framework |

## 逐項主張

縮寫：A16 = Nick Craver〈Stack Overflow: The Architecture – 2016 Edition〉（2016-02-17）；R13 = Nick Craver〈What it takes to run Stack Overflow〉（2013-11-22）；C19 = Nick Craver〈How We Do App Caching – 2019 Edition〉（2019-08-06）；H17 = Nick Craver〈HTTPS on Stack Overflow〉（2017-05-22）；P19 = stackexchange.com/performance 2019-12-31 存檔；G25 = Stack Overflow Blog〈Moving the public Stack Overflow sites to the cloud: Part 1〉（2025-08-28）；S11 = Sam Saffron〈How I learned to stop worrying and write my own ORM〉（2011-03-30）。

### 硬體與規模

| # | 主張（位置） | 判定 | 來源引文與說明 |
| :-- | :-- | :-- | :-- |
| 1 | 9 台 .NET Web 伺服器（description、內文第 22 行） | SUPPORTED（2016～2019） | P19：「9 web servers / RAM: 64GB」；A16 列 11 台 IIS，但另說「not 9x redundancy … We don't want to do that load 9 times on the web tier」，也就是 9 台承接正式流量。2025 年後已遷上雲，不再適用 |
| 2 | 2 台 SQL Server 主從實例（第 22 行） | CONTRADICTED | R13：「4 MS SQL Servers」；A16：「4 Microsoft SQL Servers」「We run 2 SQL Server clusters with AlwaysOn Availability Groups」；P19：「4 sql servers / Organized as 2 clusters」。R13 只把「2 SQL servers」當成理論上的最低需求 |
| 3 | 2 台 Redis（第 22 行） | SUPPORTED（2013～2019） | A16：「2 Redis Servers」；P19：「2 redis servers / RAM: 256GB」；C19：「We currently only run 2 physical Redis servers per data center」 |
| 4 | 常年 CPU 使用率低於 10%（第 22 行） | CONTRADICTED（輕微） | R13：「Those web servers average between 5-15% CPU … The SQL servers average around 5-10% CPU」。Web 層上緣是 15%，沒有「常年低於 10%」的說法；Redis 才低於 2%（A16） |
| 5 | 平均渲染延遲低於 15 毫秒（第 22 行） | CONTRADICTED | P19：首頁「12.2 ms」、問題頁「18.3 ms」；A16：「22.71 … ms average … for 49,180,275 question page renders」。只有首頁低於 15 ms，主要頁面（問題頁）沒有 |
| 6 | 標題「微秒級效能」 | CONTRADICTED | 同上，所有官方數字都是毫秒級 |
| 7 | 全球前 50 大網站（第 20 行） | NOT FOUND | 一手來源沒有排名說法 |
| 8 | 每月 5,000 萬訪客（description、第 20、37 行） | NOT FOUND | 官方 stackoverflow.co/talent/audience 只寫「Millions of average monthly unique visitors」；「5,000 萬」只出現在第三方轉述 |
| 9 | 單日數億次 PV（第 20 行） | CONTRADICTED | P19：「1.3 BILLION page views per month」，約每日 4,300 萬（換算）；A16：一天「66,294,789 … page loads」。「數億」是 HTTP 請求數，不是 PV |
| 10 | 數億 QPS（description） | CONTRADICTED | 見上方「已知自相矛盾」：數億是每日請求數 |
| 11 | 平均 3,000～5,000 QPS（第 38 行） | SUPPORTED（推論，2016～2019） | 依 A16（約 2,424 req/s）與 C19（約 3,566 req/s）的每日請求數換算；來源沒有直接寫 QPS |
| 12 | 峰值 15,000+ QPS（第 38 行） | NOT FOUND | 找不到峰值請求率數字 |
| 13 | 讀寫比 100:1～1000:1（第 35 行） | NOT FOUND | 唯一相關數字是 R13：「Stack Overflow actually has a 40:60 read-write ratio」，指的是兩層快取之後的資料庫磁碟存取，量的東西不同，不能拿來支撐原文 |
| 14 | 資料量數百 GB 至數 TB、可完全裝入單台伺服器 RAM（第 39 行） | SUPPORTED（附註） | P19：「RAM: 1.5 TB • DB size: 2.8 TB」「RAM: 768 GB • DB size: 3.9 TB」；G25：「we needed about 1.5TB of memory to hold the database in memory」。資料庫確實放在記憶體裡，但總量是 TB 級，原文「數百 GB」偏低 |

### CDN 與負載平衡

| # | 主張（位置） | 判定 | 來源引文與說明 |
| :-- | :-- | :-- | :-- |
| 15 | CDN 用 Fastly（SVG、3.1） | SUPPORTED（2017～2025，已過時） | H17：「The IP their DNS resolves to is the CDN/Proxy (Fastly) now」；C19：「we had moved to Fastly at this point」。2016 年前用 CloudFlare（A16），2025 年改成 Cloudflare（G25：「move all public assets behind the Cloudflare CDN」） |
| 16 | CDN 攔截 95%（SVG）／超過 90%（3.1）的讀請求，只有 5% 穿透 | CONTRADICTED | C19：「For the past several years, Stack Overflow (and all Q&A sites) output cache nothing.」H17 的線上 VCL 只讓 `/users/flair/` 快取 180 秒，其餘「set beresp.http.Cache-Control = "private"」，原文作者說明「bypass everything else」。至少在 2017～2019 年，問題頁 HTML 不在 CDN 快取，沒有任何命中率數字 |
| 17 | 問題頁回傳 `Cache-Control: public, s-maxage=60` 與 Surrogate-Keys（3.1） | CONTRADICTED | 同上，H17 的 VCL 把回應改成 `private`；找不到 s-maxage=60 或 Surrogate-Key 的任何出處 |
| 18 | HAProxy 雙機主備（SVG） | SUPPORTED（2019，已過時） | P19：「2 Haproxy servers / 1 live / 1 fail over」。2016 年是 4 台（A16：「4 HAProxy Load Balancers」）；2025 年 HAProxy 隨機房退役（G25：「HAProxy logs … were slated for retirement with the datacenter shutdown」） |

### Web 層與快取

| # | 主張（位置） | 判定 | 來源引文與說明 |
| :-- | :-- | :-- | :-- |
| 19 | Web 伺服器跑 .NET 9（SVG） | NOT FOUND | 一手來源沒有任何 .NET 9 的說法。A16：「.Net 4.6.1」；G25（2025）：公開站台「we have some older applications on the full .NET framework」，並跑在 Windows Kubernetes 上。2020 年遷到 .NET Core 只見於 InfoQ 二手報導 |
| 20 | IIS（SVG） | SUPPORTED（自建機房時期，已過時） | A16：「Web Tier (IIS 8.5, ASP.Net MVC 5.2.3, and .Net 4.6.1)」。2025 年起改為 Kubernetes＋nginx（G25） |
| 21 | L1 進程內記憶體快取（SVG、3.1） | SUPPORTED | A16：「"L1" is HTTP Cache on the web servers or whatever application is in play」；C19 把它分成 Global／Site／Local Cache，都是各台 web server 的記憶體快取 |
| 22 | L1 快取「最熱門的 20% 問題」與全域設定（3.1） | NOT FOUND | 沒有「20%」或「快取熱門問題」的說法；C19 反而說整頁 output cache 已經不用了 |
| 23 | L2 Redis 跨節點共享快取（SVG、3.1） | SUPPORTED | A16：「"L2" is falling back to Redis and fetching the value out … The next server wanting the value may miss L1, but would find the value in L2/Redis」 |
| 24 | Redis 存 Session、即時瀏覽數、按讚數、使用者權限分值（SVG、3.1） | NOT FOUND | A16 列的 Redis 用途是快取、pub/sub（清 L1、websocket 推播）；沒有提到 Session、瀏覽數、投票或權限分值 |

### 標籤檢索

| # | 主張（位置） | 判定 | 來源引文與說明 |
| :-- | :-- | :-- | :-- |
| 25 | Tag 倒排索引放在 Redis Set／BitMap 或本機記憶體，用 `SINTER` 求交集（SVG、3.3） | CONTRADICTED | A16：「"Stack Server" which runs the tag engine and is based on http.sys」「when you visit /questions/tagged/java, you're hitting the tag engine」；R13：「3 Tag Engine servers (anything searching by tag hits this)」。這是獨立的 Tag Engine 服務，跑在 3 台專用伺服器上，不是 Redis；沒有任何來源提到 SINTER 或 BitMap |
| 26 | 多標籤查詢壓到 1 毫秒以內（3.3） | CONTRADICTED（推論） | A16：「3,661,134 … Tag Engine requests」「147,018,571 … ms (40.8 hours) spent on Tag Engine requests」，平均約 40 ms／次；R13 算起來約 37 ms／次（換算） |

### 資料庫與 ORM

| # | 主張（位置） | 判定 | 來源引文與說明 |
| :-- | :-- | :-- | :-- |
| 27 | SQL Server「Master 純寫入＋唯讀副本」（SVG） | CONTRADICTED | A16：「Each of these clusters has 1 master (taking almost all of the load) and 1 replica in New York … All replicas are asynchronous」，master 承擔幾乎所有負載，讀寫都在上面。R13：備援機「now used for read-only loads … (this mainly consists of the Stack Exchange API)」，唯讀副本只服務 API |
| 28 | SQL Server 巨量 RAM（SVG） | SUPPORTED | A16：「each with 384GB of RAM」「each with 768GB of RAM」；P19：「RAM: 1.5 TB」；G25：1.5 TB 放進記憶體 |
| 29 | Dapper 是 Stack Overflow 自研、開源的輕量 ORM（3.2） | SUPPORTED | Dapper README：「Dapper was originally developed for and by Stack Overflow, but is F/OSS」；A16：「Dapper, our open source Micro-ORM」 |
| 30 | 放棄 Entity Framework 才自研 Dapper（3.2） | CONTRADICTED | S11：「Much of our work at Stack Overflow depended on the assumption that LINQ-2-SQL is fast enough. Turns out it was not fast enough for us.」A16：「We have some legacy Linq2Sql, but all new development is using Dapper」。被換掉的是 LINQ-to-SQL；EF 只出現在 S11 的效能比較裡（「Entity Framework 4.1 elapsed 550ms」） |
| 31 | Dapper 靠 Emit IL 映射，速度接近原生 `SqlDataReader`（3.2） | SUPPORTED | Dapper 原始碼 `SqlMapper.cs`：`new DynamicMethod("Deserialize" …)`、`dm.GetILGenerator()`；README 基準測試：Hand Coded SqlCommand 119.70 µs、Dapper `QueryFirstOrDefault<T>` 133.73 µs |

第 5 節「系統設計面試總結矩陣」是推薦解法，沒有歸給 Stack Overflow，不列入查核。其中「即時通知用 WebSocket」剛好與 A16 相符（「We use websockets to push real-time updates … new answers and comments」）；「Elasticsearch 倒排索引」在 Stack Overflow 實際用於 /search 與相關問題（A16），不是用來做標籤篩選。

## 參考連結檢查

文章正文**沒有參考連結段落**，也沒有任何行內來源連結。唯一的外部連結是 frontmatter 的 `repositoryUrl`：

| 連結 | 狀態 | 內容與支撐程度 |
| :-- | :-- | :-- |
| https://github.com/ByteByteGoHq/system-design-101 | 存在（200），是 repo 首頁而非具體文章 | README 的「How to Design Stack Overflow」連到 bytebytego.com 的指南。指南原文（`data/guides/how-will-you-design-the-stack-overflow-website.md`，2024-02-20）只有一句具體主張：「Stack Overflow serves all the traffic with only 9 on-premise web servers, and it's on monolith!」它是二手整理，只能間接支撐第 1 項（9 台 Web）與「單體」，其餘主張都沒有涵蓋 |

另外，作者可能參考的 stackexchange.com/performance 目前回應 **404**，要看只能用 Wayback Machine 存檔（本報告用 2019-12-31 版）。

## 一手來源

- Nick Craver，〈Stack Overflow: The Architecture – 2016 Edition〉：https://nickcraver.com/blog/2016/02/17/stack-overflow-the-architecture-2016-edition/
- Nick Craver，〈What it takes to run Stack Overflow〉（2013）：https://nickcraver.com/blog/2013/11/22/what-it-takes-to-run-stack-overflow/
- Nick Craver，〈Stack Overflow: How We Do App Caching – 2019 Edition〉：https://nickcraver.com/blog/2019/08/06/stack-overflow-how-we-do-app-caching/
- Nick Craver，〈HTTPS on Stack Overflow: The End of a Long Road〉（2017）：https://nickcraver.com/blog/2017/05/22/https-on-stack-overflow/
- stackexchange.com/performance（2019-12-31 存檔）：http://web.archive.org/web/20191231070423/https://stackexchange.com/performance
- Stack Overflow Blog，〈Moving the public Stack Overflow sites to the cloud: Part 1〉（2025-08-28）：https://stackoverflow.blog/2025/08/28/moving-the-public-stack-overflow-sites-to-the-cloud-part-1/
- Stack Overflow Blog，〈The great unracking〉（2025-12-24）：https://stackoverflow.blog/2025/12/24/the-great-unracking-saying-goodbye-to-the-servers-at-our-physical-datacenter/
- Sam Saffron，〈How I learned to stop worrying and write my own ORM〉（2011）：https://samsaffron.com/archive/2011/03/30/How+I+learned+to+stop+worrying+and+write+my+own+ORM
- Dapper README 與原始碼：https://github.com/DapperLib/Dapper

二手線索（不當證據）：InfoQ〈Stack Overflow New Architecture〉（2020，.NET Core 遷移）、ByteByteGo 指南。
