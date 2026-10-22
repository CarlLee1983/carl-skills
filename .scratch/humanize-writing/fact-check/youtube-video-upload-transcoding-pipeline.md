# 事實查核：youtube-video-upload-transcoding-pipeline.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/youtube-video-upload-transcoding-pipeline.mdx`（含三個 SVG 元件 `YouTubeVideoPipelineDiagram.astro`、`YoutubeResumableUploadDiagram.astro`、`YoutubeDagTranscodingDiagram.astro` 的 `<text>`）
- 歸屬公司：YouTube／Google
- 查核日期：2026-10-22
- 範圍：只查核，不改文章

## 總評：未通過

主架構的骨幹有一手出處：Google 在 ASPLOS 2021 發表的 Argos VCU 論文，確實描述 YouTube 把影片切成 closed GOP 分塊平行轉碼、用無環任務依賴圖（DAG）排程，以及依熱門程度分級投入轉碼算力。這比麥當勞那篇好，骨架可以留。

但文章疊在骨架上的具體主張，多數找不到一手出處：分塊大小 5–20 MB、Bigtable／Spanner 存上傳狀態、MD5／CRC32／SHA-256 校驗、Colossus 存原始檔、5–10 秒切片、「萬核平行、2 小時影片 5 分鐘內轉完」、首幀 <200 ms、各編碼省多少頻寬，全部 NOT FOUND（32 項中 21 項）。另有 2 項與官方來源矛盾：上傳時序圖的 API 形狀（官方用空 PUT＋`Content-Range: bytes */總長` 探測進度，不是 `HEAD /upload/status`），以及「熱度感知」的細節（論文說導入 VCU 後 VP9 與 H.264 都在上傳時產出，YouTube 說明頁說 4K 慢是處理時間，不是熱度門檻）。

文末三個參考連結都能開，但沒有一個支撐 YouTube 的具體架構：Google Cloud 連結是媒體產業行銷頁，文章標的「Video Processing & Streaming Architecture Best Practices」並不存在；ByteByteGo 連到 repo 首頁，裡面相關的那篇只講每分鐘 500 小時與 VCU 效率 20–33 倍。真正能撐住骨架的 Argos 論文、YouTube 官方部落格、YouTube Data API 文件，文章都沒有引用。

依「多數具體主張無出處或矛盾」的定義判為未通過。修法方向：以 Argos 論文與 YouTube 官方部落格改寫主架構，NOT FOUND 的數字與元件刪除，或明確標為「作者推演／通用做法」，不再歸給 YouTube。

## 統計

| 判定 | 數量 |
| --- | --- |
| SUPPORTED | 9 |
| CONTRADICTED | 2 |
| NOT FOUND | 21 |
| 合計 | 32 |

## 主要一手來源

| 代號 | 來源 | 說明 |
| --- | --- | --- |
| [P1] | Ranganathan et al., *Warehouse-Scale Video Acceleration: Co-design and Deployment in the Wild*, ASPLOS 2021 — https://research.google/pubs/warehouse-scale-video-acceleration-co-design-and-deployment-in-the-wild/ （全文由 ACM 取得受阻，改讀 https://gwern.net/doc/cs/hardware/2021-ranganathan.pdf 鏡像） | Google 官方論文，描述 YouTube 影片處理平台 |
| [P2] | YouTube 官方部落格，*Reimagining video infrastructure to empower YouTube*，2021-04-21 — https://blog.youtube/inside-youtube/new-era-video-infrastructure/ | Argos 晶片訪談 |
| [P3] | YouTube Data API，*Resumable Uploads* — https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol | 公開 API 的續傳協定 |
| [P4] | YouTube 說明中心，影片處理說明 — https://support.google.com/youtube/answer/71674 | 處理順序與時間 |
| [P5] | Google Cloud 部落格，*A peek behind Colossus, Google's file system*，2021-04-20 — https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system | Colossus 與 YouTube 的關係 |
| [P6] | Google Peering，Edge Network 說明 — https://peering.google.com/#/infrastructure | 邊緣節點快取 YouTube（頁面為 JS 動態載入，WebFetch 只取到標題；引文來自搜尋摘錄） |

## 逐項查核

### 開場與規模

| # | 主張（出處位置） | 判定 | 依據 |
| --- | --- | --- | --- |
| 1 | 每分鐘超過 500 小時新影片上傳（內文首段、description） | SUPPORTED | [P2]：“more than 500 hours of video content on average is uploaded every minute to the platform”。[P1] 的說法較保守：“uploads of multiple hundreds of hours of video every minute”。 |

### 階段 1：可續傳分塊上傳

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 2 | YouTube 採用 HTTP 可續傳分塊上傳（Google Resumable Media Upload） | SUPPORTED | [P3]：“To start a resumable video upload, send a POST request…” 帶 `uploadType=resumable`。限定：這是公開 Data API 的協定，YouTube 網頁上傳器內部用什麼未公開。 |
| 3 | 斷線後伺服器回 `308 Resume Incomplete` 與 `Range` 標頭（時序圖） | SUPPORTED | [P3]：“the API response will have an HTTP 308 (Resume Incomplete) response code”，“the Range header specifies how many bytes of the file have already been successfully uploaded”。 |
| 4 | 客戶端切成 5–20 MB 的 Chunk（內文、總覽圖「5MB-20MB 局部區塊」） | NOT FOUND | [P3] 只規定 “The chunk size must be a multiple of 256 KB”，沒有 5–20 MB 的範圍。 |
| 5 | 時序圖：`POST /upload/init` 建立會話、`HEAD /upload/status` 探測已持久化範圍 | CONTRADICTED | [P3] 的會話建立是對 `/upload/youtube/v3/videos?uploadType=resumable` 送 POST；探測進度是送空的 PUT，標頭設 `Content-Length: 0` 與 “set the Content-Range header value to bytes */CONTENT_LENGTH”，不是 HEAD，也沒有 `/upload/status` 端點。 |
| 6 | 伺服器在 Bigtable／Spanner 記錄已收到的 Byte Range | NOT FOUND | [P1]～[P5] 都沒提到上傳狀態存放在哪個資料庫。 |
| 7 | 每個 Chunk 帶 MD5／CRC32，整檔驗證 SHA-256（內文、總覽圖「完整性 SHA-256 驗證」） | NOT FOUND | [P3] 全文沒有任何 checksum 規定（MD5、CRC32、SHA-256 都沒出現）。 |
| 8 | 原始影片存放於 Colossus／Distributed BlobStore | NOT FOUND | [P5] 只泛稱 Colossus “underpins Google's most popular products, supporting globally available services like YouTube”，並提到 “YouTube serving nodes” 共用底層檔案系統；沒有說原始上傳檔存在 Colossus，也沒有「BlobStore」這個名稱。[P1] 只寫 “saved to the cloud storage system”。 |
| 9 | Bigtable 存影片中繼資訊（總覽圖） | NOT FOUND | 一手來源未提及。 |

### 階段 2：GOP 切片與 DAG 排程

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 10 | 依 GOP 關鍵幀邊界切片，每片可獨立平行轉碼 | SUPPORTED | [P1]：“Transcoders can also shard the video into chunks (also known as closed Groups of Pictures, or GOPs) that can each be processed in parallel”。 |
| 11 | 切片通常 5–10 秒（內文、兩張圖、演進對比表） | NOT FOUND | [P1] 沒有給切片長度。 |
| 12 | 轉碼拆成 DAG 工作流 | SUPPORTED | [P1]：“an acyclic task dependency graph is generated to capture the work to be performed. The graph is placed into a global work queue system, where each operation is a variable-sized ‘step’”。 |
| 13 | 單一影片轉成「包含數千個獨立子任務」的 DAG | NOT FOUND | [P1] 沒有子任務數量。 |
| 14 | DAG 中音訊軌、視訊軌、字幕軌分離成不同分支（DAG 圖 STAGE 2A/2B、總覽圖） | NOT FOUND | [P1] 只談視訊轉碼，沒有描述音訊或字幕分支。 |
| 15 | 失敗時只重跑失敗的切片（總覽圖「轉碼失敗局部自動重試」、對比表） | NOT FOUND | [P1] 只泛稱排程系統 “adapting to performance and load variations as well as service or infrastructure failures”，以及硬體故障 “addressed through redundancy and fallback at higher-level software layers”；沒有說以切片為單位重試。 |

### 階段 3：轉碼矩陣與編碼策略

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 16 | 「萬核平行」，2 小時影片 5 分鐘內轉完（標題 description、內文、對比表、圖） | NOT FOUND | 一手來源沒有此數字。[P1] 說上傳的端到端延遲需求是 “video upload's minutes to hours”；[P4] 說 “It can take 4 times longer for 4K quality to be available after an upload finishes”。官方描述是分鐘到小時，與「5 分鐘內」的口徑不一致。 |
| 17 | 早期單體轉碼：2 小時影片需 1–2 小時（對比表） | NOT FOUND | 一手來源未提。 |
| 18 | 輸出 H.264、VP9、AV1 三種編碼 | SUPPORTED | [P1]：VCU 編碼核心 “is able to encode H.264 and VP9”；[P2]：次世代晶片 “adding in AV1, a new advanced coding standard that compresses more efficiently than VP9”。 |
| 19 | 依編碼分成兩個 Worker Pool：H.264 負責 360p／720p／1080p，VP9／AV1 負責 1440p／4K／8K（總覽圖） | NOT FOUND | 一手來源沒有這種分池。[P1] 描述的 MOT 是 “a single transcoding task produces the desired combination of resolutions and formats for a given chunk”，同一任務產出所有解析度與格式，與「依編碼分池、分解析度」的畫法有落差。 |
| 20 | VP9 比 H.264 省 30–40%（表格）／省 30%–50%（總覽圖） | NOT FOUND | 一手來源未取得具體百分比。[P2] 只說 VP9 畫質較好但 “uses 5x more computer resources to encode”。二手報導稱 YouTube 2015 年部落格寫平均省 35%、Google 工程師在 I/O 稱約 50%，原文未能開啟驗證。另外表格與圖自己的數字也不一致。 |
| 21 | AV1 比 VP9 再省 20–30%（表格） | NOT FOUND | [P2] 只說 AV1 “compresses more efficiently than VP9”，沒有百分比。 |
| 22 | AV1 計算複雜度極高、需專用 ASIC（表格） | SUPPORTED | [P2]：AV1 “has an even higher computation load to encode”，且 YouTube 在次世代 VCU 晶片加入 AV1。 |
| 23 | 熱度感知原則：熱門影片值得投入更多轉碼算力以省頻寬，冷門影片壓低成本，舊片變熱門會重處理 | SUPPORTED | [P1]：popularity 分三個 bucket，最熱門的 “worth spending extra processing time to reduce bandwidth to the user”，長尾 “minimize storage and transcoding costs”，且 “old videos can increase in popularity and may need to be reprocessed with a higher popularity treatment well after upload”。 |
| 24 | 熱度感知細節：新片先只轉 H.264 360p／720p／1080p 上線，熱門後才觸發 AV1 與 4K／8K 深度壓製（IMPORTANT 區塊、啟示 2） | CONTRADICTED | [P1]：未加速時期 VP9 只給最熱門影片，但 “With VCUs, we could instead shift to producing both VP9 and H.264 at upload time”，所以現行做法不是上傳時只出 H.264。[P4]：上傳後 “initially be processed in low quality”，且 “Higher-quality videos, such as 4K or 1080p, can take more time to process”。1080p 並不在立即可用的那一層，4K 晚出現的原因是處理時間，不是熱度門檻。 |

### 階段 4：封裝與分發

| # | 主張 | 判定 | 依據 |
| --- | --- | --- | --- |
| 25 | YouTube 封裝為 HLS（`.m3u8`、`.ts`／`.m4s`）與 MPEG-DASH（`.mpd`） | NOT FOUND | 未取得 YouTube 一手文件。二手報導（InfoQ 2015）稱 YouTube HTML5 播放器依賴 MSE 播放 DASH，原始 YouTube 工程部落格文章已 404。RFC 8216 只定義 HLS 本身，不說明 YouTube 用法。範例 manifest 裡 HLS 搭 VP9 也無出處。 |
| 26 | DRM 加密保護（總覽圖） | NOT FOUND | 一手來源未提及轉碼管線的 DRM 步驟。 |
| 27 | 音訊 AAC-LC／Opus、5.1 空間音訊、多國語音（DAG 圖、總覽圖） | NOT FOUND | 本次查到的一手來源都沒有描述音訊編碼。 |
| 28 | 預覽縮圖精靈圖、AI 字幕生成屬於此管線（總覽圖） | NOT FOUND | 一手來源未提。 |
| 29 | 透過 Google 邊緣節點（Edge PoPs）快取分發 | SUPPORTED | [P6]（搜尋摘錄）：ISP 部署 Google 提供的伺服器，“Static content that's very popular with the local host's user base, including YouTube and Google Play, is temporarily cached on edge nodes”。頁面本身無法直接抓取全文。 |
| 30 | 播放器以 5 秒分塊為單位切換畫質 | NOT FOUND | 一手來源沒有分塊長度。ABR 原理本身屬通用知識，不另查。 |
| 31 | 首幀秒開 <200 ms（對比表） | NOT FOUND | 一手來源沒有此數字。 |
| 32 | AV1 是 4K／8K HDR 首選（表格） | NOT FOUND | 一手來源未提。二手實測（Streaming Learning Center）發現 4K 影片播放的是 VP9 而非 AV1；YouTube 說明中心的直播編碼頁寫 AV1 不支援 HDR（僅限直播情境，不能直接套用到點播）。 |

### 不列入計數的項目

- 啟示 4 提到「Cloudflare / Google CDN」是給讀者的通用建議，不是歸給 YouTube 的主張；但讀者可能誤以為 YouTube 使用 Cloudflare，建議改寫。
- 「手機 4K MOV、直播 FLV、老舊攝影機 AVI」與「50 GB／60 FPS 無損母片」屬情境舉例，不列入計數。
- I／P／B 幀、HLS／DASH、ABR 的 throughput／buffer 原理屬教科書知識，不查。

## 參考連結檢查

| 連結 | HTTP | 類型 | 標題是否相符 | 支撐正文哪些主張 |
| --- | --- | --- | --- | --- |
| https://cloud.google.com/solutions/media-entertainment | 200 | 首頁型行銷頁（“Media and entertainment solutions \| Google Cloud”），內容是 AI、內容製作、個人化 | 不符。文章標的「Video Processing & Streaming Architecture Best Practices」不存在；頁面除頁尾「Google Cloud on YouTube」外沒有 YouTube 內容，也沒有 chunk、GOP、Colossus、DAG | 無。內文「本文基於 Google Cloud Media Architecture 文獻」也因此沒有依據 |
| https://datatracker.ietf.org/doc/html/rfc8216 | 200 | 具體文件（HLS 規格） | 相符 | 只支撐 HLS 的通用格式（`.m3u8`、`EXT-X-STREAM-INF`），不支撐 YouTube 使用 HLS 的任何主張 |
| https://github.com/ByteByteGoHq/system-design-101 | 200 | repo 首頁，不是具體文章；frontmatter 的 `repositoryUrl` 也指向這裡 | 不符。repo 沒有「YouTube Architecture Deep Dive」；相關的是 `data/guides/how-does-youtube-handle-massive-video-content-upload.md`（2024-02-23，“How YouTube Handles Massive Video Uploads”） | 只有 #1（每分鐘 500 小時）與 VCU 效率 20–33 倍；沒有提到分塊上傳、GOP、DAG、HLS／DASH、熱度感知。屬二手整理，只能當線索 |

文章沒有引用、但真正支撐骨架的一手來源：[P1] Argos VCU 論文、[P2] YouTube 官方部落格、[P3] YouTube Data API 續傳文件、[P4] YouTube 說明中心。

## 查核限制

- [P1] 全文透過 gwern.net 鏡像取得（ACM 回 403），內容與 Google Research 頁面的摘要一致。
- [P6] peering.google.com 為 JS 動態頁，引文取自搜尋結果摘錄，未直接讀到頁面全文。
- #20、#25 的二手線索指向 YouTube 2015 年工程部落格（“YouTube now defaults to HTML5”），原網址 404，web.archive.org 無法存取，因此仍列 NOT FOUND。
