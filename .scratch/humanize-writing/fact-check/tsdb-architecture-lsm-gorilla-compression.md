# 事實查核：tsdb-architecture-lsm-gorilla-compression.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/tsdb-architecture-lsm-gorilla-compression.mdx`
- 圖解：`/Users/carl/Dev/Carl/CarlStack/src/components/TsdbArchitectureLsmGorillaDiagram.astro`（第 3 欄 Gorilla 與手機版說明），以及文章內嵌的兩張 Gorilla SVG
- 公司：Facebook（Gorilla）
- 批次：C 批，只查歸給 Gorilla 的部分；LSM-Tree、倒排索引、Roaring Bitmap、InfluxDB／TimescaleDB 對照、降採樣建議屬通用解說，不查
- 查核日期：2026-10-22
- 一手來源：Pelkonen et al., “Gorilla: A Fast, Scalable, In-Memory Time Series Database”, PVLDB 8(12), 2015。https://www.vldb.org/pvldb/vol8/p1816-teller.pdf （以 `pdftotext` 抽出全文比對）

## 總評：局部修正

演算法本體寫得很準。delta-of-delta 的公式、五段變長前綴與位元數（`0`／`10`+7／`110`+9／`1110`+12／`1111`+32）、XOR 的 `0`／`1`+`0`／`1`+`1`+5 bits 前導零+6 bits 長度，都和論文 4.1.1、4.1.2 節逐字對得上；16 bytes／點、12 倍縮減也有原文。

問題集中在 1.37 bytes 這個數字被誤用了兩次。論文的 1.37 bytes 是「時間戳加數值」整個資料點的平均大小（16 bytes → 1.37 bytes），文章第四節第 2 小節和圖解卻說成「浮點數由 8 Bytes 降至 1.37 Bytes」。另外圖解把「約 96% 的時間戳壓成 1 bit」寫成「平均壓縮率：96%」，把比例誤當壓縮率；XOR 重用前一區塊的條件也簡化成「有效位長度相同」，和論文的條件不同。文章沒有引用論文的資料量與查詢延遲數字（73 倍、14 倍、每秒 1,200 萬點等），這部分無從查核，也沒有出錯。

統計：SUPPORTED 16（其中 5 項有但書）、CONTRADICTED 3、NOT FOUND 1。

## 主張逐項查核

### A. 論文定位與總體數字

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 本文依據 Facebook 論文 Gorilla（VLDB 2015）（第 34 行） | SUPPORTED | 論文首頁：“Gorilla: A Fast, Scalable, In-Memory Time Series Database … Facebook, Inc.”，刊於 PVLDB vol. 8（VLDB 2015）。 |
| A2 | 資料點由 64-bit 時間戳與 Float64 值組成，原始 16 Bytes／點（第 135 行；手機版說明） | SUPPORTED | “a simple 3-tuple of a string key, a 64 bit time stamp integer and a double precision floating point value”；“At 16 bytes per point …” |
| A3 | Facebook 在 2015 年的論文中「提出了革命性的雙重壓縮演算法」（第 137 行） | SUPPORTED（有但書） | 論文自稱 “Gorilla incorporates a new time series compression algorithm”，但 XOR 部分是改造既有方法：“repurposing an existing XOR based floating point compression scheme to work in a streaming manner”；“similar to existing floating point compression algorithms, like the ones described in [17] and [25]”。「革命性」「提出」對 XOR 部分說過頭。 |
| A4 | 平均每點壓縮至 1.37 Bytes（第 137 行；手機版說明「16 Byte/點 壓縮至 1.37 Byte/點」） | SUPPORTED | “compress time series to an average of 1.37 bytes per point”；“A two-hour block allows us to achieve a compression ratio of 1.37 bytes per data point.” 但書：這是兩小時區塊下的數字。 |
| A5 | 「12 倍以上的記憶體節省」（第 137 行）；「壓縮比達 10 倍以上」（手機版說明） | SUPPORTED（有但書） | “a 12x reduction in size”；摘要：“reduce Gorilla’s storage footprint by 10x”。原文是 12x，不是「12 倍以上」；16／1.37 ≈ 11.7。 |

### B. 時間戳 delta-of-delta

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | D = (tn − tn−1) − (tn−1 − tn−2)（第 146 行；圖解） | SUPPORTED | “(a) Calculate the delta of delta: D = (tn − tn−1) − (tn−1 − tn−2)” |
| B2 | D == 0 只寫 1 bit `0`（SVG 情況 1；圖解） | SUPPORTED | “(b) If D is zero, then store a single ‘0’ bit” |
| B3 | −63 ≤ D ≤ 64：`10` + 7 bits，共 9 bits | SUPPORTED | “(c) If D is between [-63, 64], store ‘10’ followed by the value (7 bits)” |
| B4 | −255 ≤ D ≤ 256：`110` + 9 bits，共 12 bits | SUPPORTED | “(d) If D is between [-255, 256], store ‘110’ followed by the value (9 bits)” |
| B5 | −2047 ≤ D ≤ 2048：`1110` + 12 bits，共 16 bits | SUPPORTED | “(e) if D is between [-2047, 2048], store ‘1110’ followed by the value (12 bits)” |
| B6 | 其餘：`1111` + 32 bits，共 36 bits | SUPPORTED | “(f) Otherwise store ‘1111’ followed by D using 32 bits” |
| B7 | D = 0 佔比超過 90%（SVG 情況 1、第 173 行） | SUPPORTED（有但書） | “We have found that about 96% of all time stamps can be compressed to a single bit.” 但書：這是 Facebook ODS 的實測，文章第 173 行寫成「絕大多數週期性監控場景」的通則。 |
| B8 | 「每個時間戳平均開銷僅需 1 bit」（SVG 底部說明、第 173 行「每個時間戳僅需 1 個 bit」） | NOT FOUND | 論文只給「約 96% 壓成 1 bit」的比例，沒有給平均位元數；其餘 4% 用 9–36 bits，平均必然大於 1 bit。另外每個區塊第一個時間戳以 14 bits 存與區塊起點的差值（“the first time stamp, t0, in the block is stored as a delta from t−1 in 14 bits”），文章沒提。 |
| B9 | 圖解：「平均壓縮率：96% (1~2 bit/pt)」（`.astro` 第 191 行） | CONTRADICTED | 96% 是「壓成單一 bit 的時間戳比例」，不是壓縮率；論文沒有「1~2 bit/pt」的數字。原文見 B7。 |

### C. 浮點值 XOR

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | 相鄰值接近時，符號位、指數位與「大部分高位尾數」相同（第 179 行） | SUPPORTED（有但書） | “If values are close together the sign, exponent, and first few bits of the mantissa will be identical.” 原文是 “first few bits”，「大部分」說過頭。 |
| C2 | X = Vn XOR Vn−1；X == 0 只寫 1 bit `0`（SVG；圖解） | SUPPORTED | “compute a simple XOR of the current and previous values”；“If XOR with the previous is zero (same value), store single ‘0’ bit” |
| C3 | X ≠ 0 寫 `1`；落在前一區間時寫控制位 `0` + 有效位元（SVG 2a） | SUPPORTED | “store bit ‘1’ followed by either a) or b): (a) (Control bit ‘0’) If the block of meaningful bits falls within the block of previous meaningful bits, i.e., there are at least as many leading zeros and as many trailing zeros as with the previous value, use that information for the block position and just store the meaningful XORed value.” |
| C4 | 否則控制位 `1` + 5 bits 前導零數 + 6 bits 有效位長度 + 有效位元（SVG 2b） | SUPPORTED | “(b) (Control bit ‘1’) Store the length of the number of leading zeros in the next 5 bits, then store the length of the meaningful XORed value in the next 6 bits. Finally store the meaningful bits of the XORed value.” |
| C5 | 圖解：「若有效位長度相同 ➔ 複用前導零」（`.astro` 第 213 行） | CONTRADICTED（輕微） | 論文的條件是「前導零與尾隨零都至少和前一個值一樣多」，也就是落在前一區塊內（見 C3），不是有效位長度相同；長度不同但落在區塊內一樣重用。 |
| C6 | 「浮點數平均大小由 8 Bytes 驟降至 1.37 Bytes」（第 199 行）；圖解「平均每點僅佔 1.37 Bytes (原 8B)」（`.astro` 第 219 行） | CONTRADICTED | 1.37 bytes 是整個資料點（時間戳 + 值，原 16 bytes）的平均：“compress each by series down from 16 bytes to an average of 1.37 bytes”。論文給的值部分分布是：約 51% 壓成 1 bit，約 30% 用 `10` 平均 26.6 bits，約 19% 用 `11` 平均 36.9 bits（“Roughly 51% of all values are compressed to a single bit … About 30% … average compressed size of 26.6 bits. The remaining 19% … average size of 36.9 bits”）。依此估算值的平均約 1.7 bytes（推論，非原文數字），本身就超過 1.37 bytes。 |

### D. 資料量與查詢延遲

| # | 主張 | 判定 | 說明 |
|---|---|---|---|
| D1 | 文章沒有引用 Gorilla 的資料量或延遲數字 | — | 第 23 行「每秒數百萬至數千萬筆」是通用描述，沒掛 Gorilla 名下。論文原數字供參：Spring 2015 有 “more than 2 billion unique time series … about 12 million data points added per second”；“reducing query latency by 73x and improving query throughput by 14x when compared to … HBase”；26 小時資料放在 1.3TB RAM。不列入統計。 |

## 參考連結檢查

| 連結 | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| http://www.vldb.org/pvldb/vol8/p1816-teller.pdf | 存在（HTTP 200，PDF；https 版本也可用） | 具體論文，篇名與作者相符（Pelkonen, Franklin, Teller, Cavallaro, Huang, Meza, Veeraraghavan） | A、B、C 全部。 |
| https://github.com/ByteByteGoHq/system-design-101（正文第 34 行與 frontmatter `repositoryUrl`） | 存在 | repo 首頁 | 撐不起 Gorilla 主張。README 有 “Time Series DB (TSDB) in 20 Lines”、“B-Tree vs. LSM-Tree” 兩個條目，屬二手整理，最多支撐通用解說；沒有 Gorilla 條目。 |

## 修正建議（供作者參考，本次不改文）

1. 第 199 行改成「整個資料點（時間戳 + 值）平均由 16 Bytes 降至 1.37 Bytes」；圖解 `.astro` 第 219 行同步改掉「原 8B」，或改寫論文給的值分布（51% 1 bit、30% 平均 26.6 bits、19% 平均 36.9 bits）。
2. 圖解第 191 行「平均壓縮率：96% (1~2 bit/pt)」改成「約 96% 的時間戳只需 1 bit」。
3. 圖解第 213 行改成「前導零與尾隨零都不少於前一個值 ➔ 重用前一區塊位置」。
4. SVG 底部與第 173 行「平均僅需 1 bit」改成「約 96% 的時間戳只需 1 bit（Facebook ODS 實測）」；可補一句區塊第一個時間戳用 14 bits。
5. 第 137 行「提出了革命性的」可改為「改造既有 XOR 浮點壓縮、做成串流版本」；「12 倍以上」改「約 12 倍」。
6. 第 179 行「大部分高位尾數」改「尾數最前面幾個位元」。
