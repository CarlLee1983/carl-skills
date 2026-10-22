# 事實查核：pinterest-git-clone-optimization-commit-graph.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/pinterest-git-clone-optimization-commit-graph.mdx`
- 圖解元件：`/Users/carl/Dev/Carl/CarlStack/src/components/PinterestGitCloneOptimizationDiagram.astro`
- 公司：Pinterest
- 查核日期：2026-10-22
- 方法：Pinterest 的主張只採 Pinterest Engineering 原文；Git 機制採 git-scm.com 官方文件、GitHub Blog，以及 commit-graph 作者 Derrick Stolee 在 Microsoft DevBlogs 的系列文。ByteByteGo、Gigazine 只當線索。

## 一手來源

Pinterest Engineering, “How a one line change decreased our clone times by 99%”，Urvashi Reddy、Adam Berry、Rui Li（Engineering Productivity Team），2020-10-23。
https://medium.com/pinterest-engineering/how-a-one-line-change-decreased-our-build-times-by-99-b98453265370

Medium 對非瀏覽器請求回 403，原文經 Wayback Machine 2025-03-17 快照讀取（http://web.archive.org/web/20250317104723/https://medium.com/pinterest-engineering/how-a-one-line-change-decreased-our-build-times-by-99-b98453265370）。網址 slug 與 Gigazine 2020 年的引用都寫 “build times”，快照時標題已是 “clone times”，可見發表後改過標題。原文的程式碼是嵌入圖片，快照沒有文字；refspec 的實際寫法（`+refs/heads/master:refs/remotes/origin/master`）只見於 Gigazine 的轉述，但「只抓 master」這一點原文正文有寫。

## 總評：未通過

文章的主軸講錯了。標題與第 3 節說 Pinterest 靠 `git config fetch.writeCommitGraph true` 加上 Commit-Graph 把 clone 從 40 分鐘降到 30 秒，但 Pinterest 原文從頭到尾沒有提到 commit-graph。真正的「一行」是在 Jenkins Checkout 階段補上 refspec，只抓 master，不再抓 2,500 多個分支；當時他們本來就已經用 shallow clone、不抓 tags、depth 50。文章自己列的 ByteByteGo 參考連結也寫 refspec，和正文矛盾。

連帶錯的還有根因（原文沒有「CPU 100%、頻寬沒打滿、卡在物件協商」的說法）與規模（原文是 35 萬筆以上的 commit、完整 clone 20GB、2,500 多個分支，圖解寫成 50 萬以上、數百 GB、數萬分支）。第 5 節的成效數字（伺服器 CPU 降 85%、不再 OOM、CI 回饋提速 65%、每天省數千小時、傳輸量減 90%）在原文都找不到；原文只說 “significantly reduced our build times”。

站得住的 Pinterest 數字只有三個：40 分鐘、30 秒、99%（80 倍是這兩個數字直接相除）。Git 機制的解說大致正確（generation number 定義、可達性性質、`fetch.writeCommitGraph`、`--changed-paths`、partial clone 三種模式），但有三處小錯：generation number 是 2.19 才進來，不是 2.18；commit-graph 沒有獨立的「Generation Number Chunk」；協商時 want 是由客戶端送出，不是伺服器告知。

統計：SUPPORTED 16、CONTRADICTED 6、NOT FOUND 7。

## 主張逐項查核

### P. 歸給 Pinterest 的主張

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| P1 | 案例發生在 Pinterest 的大型 Monorepo（前言） | SUPPORTED | “We have six main repositories at Pinterest: Pinboard, Optimus, Cosmos, Magnus, iOS, and Android. Each one is a monorepo … Pinboard is as old as the company and is the largest monorepo.”（原文） |
| P2 | 優化前一次拉取「長達 40 多分鐘」（前言、圖解「40+ 分鐘」、第 5 節「40+ 分鐘」） | SUPPORTED（有但書） | “Cloning our largest repo, Pinboard went from 40 minutes to 30 seconds.” 但書：原文是 40 分鐘，不是「40 多分鐘／40+」；而且只說 Pinboard 這個 repo。 |
| P3 | 縮短到 30 秒，提升超過 99%（前言、第 5 節、圖解） | SUPPORTED | “This simple one line change reduced our clone times by 99% … went from 40 minutes to 30 seconds.” |
| P4 | 加速 80 倍（第 5 節、圖解） | SUPPORTED（推算） | 原文沒寫 80 倍，是 40 分鐘 ÷ 30 秒的算術結果。 |
| P5 | 數十萬 Commit 的超大型 Monorepo（description） | SUPPORTED | “Pinboard has more than 350K commits and is 20GB in size when cloned fully.” |
| P6 | Pinterest 的「一行」是 `git config --global fetch.writeCommitGraph true`，靠 Commit-Graph 加速；「Pinterest 在其工程基礎設施中啟用了這項特性」（標題、description、前言、第 3 節、圖解「單行神奇指令」） | CONTRADICTED | 原文的一行是 refspec：“We found that setting the refspec option during git fetch reduced our cloning step by 99%.”；“By simply adding the refspec option and specifying which refs we care about (master, in our case), we can limit the refs to the branch we care about and save a lot of time.” 全文沒有 commit-graph、`writeCommitGraph` 或 generation number。 |
| P7 | 根因是物件協商時的拓撲遍歷，CPU 單核飆到 100%、出站頻寬沒打滿（前言、第 1 節、四維度第 1 點、圖解「協商階段 CPU 100%」） | CONTRADICTED | 原文的根因是抓了全部分支：“by not setting it in the pipeline configuration script, we’re telling Git to fetch all refspecs: +refs/heads/*:refs/remotes/origin/*. In the case of Pinboard, that operation would be fetching more than 2,500 branches.” 原文沒有 CPU、頻寬或 negotiation 的描述。 |
| P8 | 規模為 500,000+ Commits、數萬 Branches 與 Tags、數百 GB（圖解）；第 1.2 節 SVG 的 50 萬／48 萬筆提交，以及「50 萬筆提交與 5 萬個分支」 | CONTRADICTED | “more than 350K commits and is 20GB in size when cloned fully”；“more than 2,500 branches”。第 1.2 節的數字雖然寫成假設情境，但放在 Pinterest 案例裡、又和圖解一致，讀者會當成 Pinterest 的實況。另外原文的 Checkout 已設定不抓 tags（“to not fetch any tags”），tags 不是問題的一部分。 |
| P9 | Git 伺服器 CPU 使用率降低 85%，不再因併發協商觸發 OOM（第 5 節、圖解） | NOT FOUND | 原文沒有伺服器端的任何數字。 |
| P10 | PR 自動化測試回饋時間整體提速 65%，每天累計節省數千小時（第 5 節、圖解「CI 構建整體提速 65%」） | NOT FOUND | 原文只有 “significantly reduced our build times as a result”，沒有百分比或工時。 |
| P11 | 數千 Runner 互相搶佔頻寬、全球數千名工程師協同效率躍升（圖解） | NOT FOUND | 原文提到的規模是 “For Pinboard alone, we do more than 60K git pulls on business days.” 和 “monorepos that get committed to a few hundred times a day”，沒有 Runner 數或工程師人數。 |
| P12 | Pinterest 的成效來自「Commit-Graph 與物件優化策略」，並推薦 Blobless／Treeless 組合（第 5 節開頭、四維度第 4 點） | NOT FOUND | 原文沒有 partial clone（`--filter`）。它當時用的是 “a shallow clone, to not fetch any tags, and to fetch the last 50 commits”，再加 refspec。 |
| P13 | 傳輸體積削減 90% 以上、本機切換分支毫秒級回應（圖解） | NOT FOUND | 原文沒有。這個案例也只涉及 CI pipeline，不涉及本機開發。 |
| P14 | 持續集成隊列嚴重塞車、開發者 PR 驗證隊列塞車（前言、圖解） | NOT FOUND | 原文只說 clone 頻繁且耗時：“Cloning monorepos that have a lot of code and history is time consuming, and we need to do it frequently throughout the day in our continuous integration pipelines.” 沒有提隊列。 |
| P15 | 工程啟示「不要盲目擴容硬體、先 Profile 分 I/O 或 CPU」歸為 Pinterest 案例的借鑑（第 6 節） | NOT FOUND | 原文的 Learnings 是 “it’s sometimes the one line fixes that can make a huge difference.” 沒有 profiling 或硬體擴容的討論。 |

### G. Git 機制（git-scm、GitHub Blog、Stolee 系列文）

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| G1 | Git 2.18 引入 Commit-Graph（第 2 節） | SUPPORTED | Stolee：“One new feature in 2.18 is a serialized commit-graph.” https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph/ |
| G2 | 2.18 引入的 Commit-Graph 最關鍵的創新就是 generation number（第 2 節、2.2） | CONTRADICTED（輕微） | “As shipped in Git 2.18, this file only speeds up commit walks by a constant multiple … An algorithm for computing generation numbers in Git is slated for the next major release (Git 2.19).” https://devblogs.microsoft.com/devops/supercharging-the-git-commit-graph-iii-generations/ |
| G3 | 檔案位置 `.git/objects/info/commit-graph`（2.1） | SUPPORTED | gitformat-commit-graph SYNOPSIS：“$GIT_DIR/objects/info/commit-graph”。https://git-scm.com/docs/gitformat-commit-graph |
| G4 | 檔案佈局為 OID Fanout（256 槽）、OID Lookup、Commit Data（Root Tree、Parent 1、Parent 2）、Generation Number Chunk（拓撲深度整數）四塊（2.1 SVG、圖解） | CONTRADICTED（局部） | 前三塊正確：“OID Fanout (ID: {O, I, D, F}) (256 * 4 bytes)”、“OID Lookup … sorted in ascending order”、“Commit Data (ID: {C, D, A, T })”。但拓撲深度不在獨立的 chunk 裡：“The next 8 bytes store the topological level (generation number v1) of the commit and the commit time”（在 CDAT 內）；另外的 GDA2 chunk 存的是 “corrected commit date offsets”，不是拓撲深度。https://git-scm.com/docs/gitformat-commit-graph |
| G5 | `G(C) = 1 + max(G(P))`，無 parent 時為 1（2.2） | SUPPORTED | “If a commit has no parents, then its generation number is 1. Otherwise, the generation number of a commit is one more than the maximum generation number of its parents.”（Stolee III） |
| G6 | 若 A 可到達 B 則 G(A) > G(B)；G(A) ≤ G(B) 則 A 不可能到達 B，可據此剪枝（2.2） | SUPPORTED | “If gen(A) < gen(B) then A cannot reach B. This allows us to short-circuit commit graph walks in several ways.”（Stolee III）。文章寫 ≤，在 A ≠ B 時成立。 |
| G7 | 拓撲遍歷複雜度從 `O(N)` 降到 `O(log N)`（四維度第 2 點、圖解） | NOT FOUND | 官方文件與 Stolee 系列文都沒有這種複雜度宣稱。generation number 是剪枝，最差情況仍可能走很多 commit；`O(log N)` 沒有出處。 |
| G8 | `fetch.writeCommitGraph` 讓每次 fetch 自動增量寫入 commit-graph（第 3 節） | SUPPORTED（有但書） | “Set to true to write a commit-graph after every git fetch command that downloads a pack-file from a remote. Using the --split option, most executions will create a very small commit-graph file on top of the existing commit-graph file(s).” https://git-scm.com/docs/git-config 。但書：只在下載了 pack-file 時寫入。 |
| G9 | `--reachable` 包含所有從 refs 可到達的提交（3.1） | SUPPORTED | “generate the new commit graph by walking commits starting at all refs.” https://git-scm.com/docs/git-commit-graph |
| G10 | `--changed-paths` 預先計算變更路徑的 Bloom filter，加速 `git log -- <path>`（3.1） | SUPPORTED | “compute and write information about the paths changed between a commit and its first parent … It provides significant performance gains for getting history of a directory or a file with git log -- <path>.”；設定項稱為 “changed-path Bloom filters”。同上 URL |
| G11 | Blobless clone 下載完整 commit 與 tree，blob 按需拉取（第 4 節表格） | SUPPORTED | “the initial git clone will download all reachable commits and trees, and only download the blobs for commits when you do a git checkout.” https://github.blog/open-source/git/get-up-to-speed-with-partial-clone-and-shallow-clone/ |
| G12 | Treeless clone 歷史只有 commit，適合 CI Runner，查歷史要網路請求（第 4 節表格） | SUPPORTED | “We strongly recommend that developers do not use treeless clones for their daily work. Treeless clones are really only helpful for automated builds when you want to quickly clone, compile a project, then throw away the repository.” 同上 URL |
| G13 | Shallow clone `--depth=1` 只取最新 commit，適合一次性容器，限制歷史操作（第 4 節表格） | SUPPORTED | “These clones truncate the commit history to reduce the clone size. This creates some unexpected behavior issues, limiting which Git commands are possible. These clones also put undue stress on later fetches, so they are strongly discouraged for developer use.” 同上 URL |
| G14 | 協商時客戶端告知 Haves，「伺服器則告訴客戶端我有新的哪些 Commit（Wants）」（1.2） | CONTRADICTED（輕微） | want 由客戶端送出：“Clients MUST send all the obj-ids they want from the reference discovery phase as want lines.” 伺服器先做的是 reference discovery（廣播 refs）。https://git-scm.com/docs/gitprotocol-pack |

## 參考連結檢查

| 連結 | 狀態 | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| `https://medium.com/pinterest-engineering`，連結文字 “Pinterest Engineering: How a single git config line saved 99% clone time” | 部落格首頁（curl 回 403，屬 Medium 擋爬蟲，瀏覽器可開） | 首頁，不是文章；連結文字的篇名不存在，原文篇名是 “How a one line change decreased our clone times by 99%” | 撐不起。改成原文網址後，只能撐 P1–P5，並會直接反駁 P6–P8。連結文字的 “git config line” 也是錯的，原文改的是 Jenkins pipeline 的 refspec。 |
| `/blog/git-2-56-monorepo-merge-base-scaling/`（站內） | 檔案存在 | 站內文章 | 延伸閱讀，未查內容，和 Pinterest 案例無關。 |
| https://git-scm.com/docs/git-commit-graph | 200 | 官方文件 | 撐 G9、G10。 |
| https://github.blog/open-source/git/highlights-from-git-2-18/ | 404（舊網址 github.blog/2018-06-18-highlights-from-git-2-18/ 轉到 /engineering/highlights-from-git-2-18/，也是 404） | — | 失效。可改用 Stolee 的 Microsoft DevBlogs 系列文撐 G1、G2、G5、G6。 |
| https://bytebytego.com/guides/the-one-line-change-that-reduced-clone-times-by-a-whopping-99-says-pinterest | 200 | 二手整理 | 不能當 Pinterest 主張的依據；而且它寫的是 “The Checkout step didn’t use the Git refspec option … fetching more than 2500 branches”，和正文的 commit-graph 說法矛盾。 |
| frontmatter `repositoryUrl` https://github.com/ByteByteGoHq/system-design-101 | 存在 | repo 首頁，二手整理 | 不能撐任何 Pinterest 主張。 |

## 修正建議（供作者參考，本次不改文）

1. 改寫主軸：Pinterest 的一行是在 Jenkins Checkout 階段加 refspec（只抓 master），不是 `fetch.writeCommitGraph`。標題、description、前言、第 3 節、第 5 節和圖解「單行神奇指令」都要跟著改。如果想保留 commit-graph 的解說，就拆成「Pinterest 案例」和「另外值得知道的 Git 機制」兩部分，不要說 Pinterest 用了它。
2. 根因改成原文的說法：沒設 refspec 時，Git 預設抓 `+refs/heads/*:refs/remotes/origin/*`，Pinboard 有 2,500 多個分支。拿掉「CPU 100%、頻寬沒打滿、卡在物件協商」。
3. 規模數字改成 35 萬筆以上的 commit、完整 clone 20GB、2,500 多個分支、Pinboard 每個工作日 6 萬次以上 git pull；拿掉 50 萬、數萬分支、數百 GB。
4. 刪除或標成示意值：伺服器 CPU 降 85%、OOM、CI 提速 65%、每天省數千小時、傳輸量減 90%、毫秒級切換分支、數千 Runner、數千名工程師。
5. 第 5 節開頭把成效歸給「Commit-Graph 與物件優化策略」是錯的。原文的配置是 shallow、no tags、depth 50 加 refspec；GitHub Blog 正好也建議 shallow clone 搭配 `--single-branch`（“Shallow clones are best combined with the --single-branch --branch=<branch> options as well”），可以拿來當呼應 Pinterest 案例的一手機制來源。
6. Git 機制的小修：generation number 改為 2.19 起；佈局圖拿掉獨立的「Generation Number Chunk」（拓撲深度存在 CDAT，GDA2 存 corrected commit date offset）；`O(N) → O(log N)` 拿掉或改成「大幅減少需要走訪的 commit」；want 是客戶端送出。
7. 第 4 節表格推薦 CI 用 Treeless，下面的「CI/CD Runner 極致加速推薦組合」卻用 Blobless，前後不一致，選一個。
8. 參考連結：第一條換成原文網址並更正篇名；修掉 404 的 GitHub Blog 2.18 連結，改用 Stolee 的 DevBlogs 系列；ByteByteGo 兩條標明是二手整理，或移除。
