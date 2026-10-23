# D8 dbcli（CLI 邊界）評審

**總判定：部分通過。** 產品邊界、概念隔離、「加進專案」不自行開工三項都做對；但第 1 回合提出的終端體驗改善在之後的回合只剩附註，SESSION 的未決清單裡完全沒有它；技能把 CLI 一律判成主題起手、先做視覺，所以一個不在範圍內的 GUI 拿到了整輪風格板，結構與範圍問題卻沒碰。原型有幾項基線缺陷，設計師自稱已通過。

## 適用情境

| 情境（acceptance.md／PERSONAS 觀察） | 判定 | 證據 |
| --- | --- | --- |
| 觀察：指出 Non-goals | 通過 | transcript L9 直接引用 README「No GUI」，Q1 b（L28）說明 GUI 屬產品範圍決定 |
| 觀察：提出 CLI 內的體驗改善 | 部分 | L9–L11、L19–L21、Q4／Q7 提出脈絡列、錯誤附恢復指令、stdout／stderr 分流、無假百分比進度，並承諾下一回合交「終端逐字稿原型」。使用者 R2 選了 GUI 概念之後，這條路只剩 L91、L117、L135 的附註；SESSION 的「未決與交接」（SESSION L63–70）沒有這一項，Q2／Q4／Q7／Q8 這些終端題的答案反而被挪去當 GUI 的假設（SESSION L17）。 |
| 觀察／acceptance L42：CLI 排除 UI，授權概念探索時隔離原型，不當成正式 UI 的決定 | 通過 | R2 L67「隔離的概念原型……不代表 dbcli 要加 GUI」；原型頁首寫明「僅為概念」；SESSION L8 |
| 觀察：「加進專案」屬未決範圍決定，不自行開工 | 通過 | R3 L101–L104 分兩個原因說明，規劃入口交給使用者親自啟動，列出範圍問題（包 CLI 或共用核心、桌面或網頁、維護者、環境欄位）；SESSION L23、L68–70 |
| SKILL L123「下一步？」是問題，不是授權 | 通過 | R3 從原始目標、目前階段、未決事項說明下一步，提出 A（範圍決定）與 B（結構方向）兩條路 |
| SKILL L26：說明進入模式並附依據 | 通過（照技能）／判斷有誤 | L15 判 theme-first，依據是「CLI 專案、沒有圖形介面」，照 SKILL L22 字面做。但設計師自己在 L9 把介面定義為終端體驗，fixture 也有使用者回報的痛點（project.md L7），終端介面其實是「既有介面＋不滿」，比較接近 improve，見技能缺陷 1 |
| 主題起手訪談完成條件（SKILL L54） | 部分 | 有編號、附建議答案，形容詞經「其他照建議」確認（L44、L61）。但 Q4／Q8 是為終端情境問的，Q1 翻成 GUI 之後前提已變，設計師沒有依 SKILL L126「重開受影響的部分」重問，只在 SESSION L17 標成假設 |
| acceptance L46：主題起手訪談完成後，做 3 個附概念的 style tile，共用暫定版面，用截圖比較 | 通過 | `work/prototypes/style-tiles.html` 有 1／2／3 三個處理，頁首寫明「版面為三者共用的暫定版面，不是結構提案」 |
| acceptance：同一輪的處理明顯不同 | 通過 | judge-shots/t1-1440、t2-1440、t3-1440：三者的字體、配色、密度一眼可辨 |
| acceptance：呼叫視覺方向技能並記錄 | 通過 | SESSION L35–40：impeccable（operate），列出已檢查的候選與不用的理由；PRODUCT.md 只是讓 impeccable 能跑的衍生檔，標明以 SESSION 為準（符合 collaboration.md L37） |
| acceptance：呈現前逐節檢查基線 | 部分 | SESSION L53–61 逐節記錄，但「圖示：通過」「權限色都搭配圖示＋文字」與實際畫面不符（見下節） |
| acceptance：圖示是 inline SVG，不用文字箭頭 | 未通過 | style-tiles.html L294 匯出標題「Exporting orders → orders.csv」，三個處理的畫面都看得到 |
| 收集回饋時，喜好與卡關分開問 | 通過 | Q12 分兩題；使用者只答「2 不錯」，R3 把卡關題跟下一步一起問（L115） |
| 硬性約束（淺色／深色都要能讀）落到處理上 | 部分 | Q8 建議全要、使用者照建議同意（L55、L61），R2 也重述這條假設（L67）；推薦的處理 2 卻只有深色（L74、L77），把補做延到結構選定之後 |
| 停點回報（SKILL L138） | 通過 | R4 L127–133 交代階段、入口、驗證過的與沒驗證的、下一步 |

## 畫面品質發現（評審自己截圖，judge-shots/）

截圖用 Playwright 1.64.1 Chromium，在 1440×900、1024×768、390×844 三種寬度看了三個處理，另看處理 2 按 Run 之後與切到 local 的狀態，用腳本量了字級與對比。

- 已確認：1440 與 1024 都沒有橫向捲動，跟設計師說的一致。三個處理的可見文字都達到 AA 對比（腳本算的是文字色對祖先背景色，沒有發現低於門檻的）。焦點框看得到。處理 2 被擋下時由「Run on local」領頭，Run 降為次要，切到 local 後 Run 變主要（t2-1440-local.png），主次正確。
- 圖示（未通過，設計師記為通過）：匯出標題用文字箭頭「→」當裝飾（style-tiles.html L294；t2-1440.png、t1-1440.png）。
- 色彩配第二線索（未通過，設計師說「權限色都搭配圖示＋文字」）：左側 CONNECTIONS 清單的權限只用 8px 色點表示（`.dot`，L57），旁邊列的是引擎名，不是權限。處理 2 的 read-only（青）、read-write（橘）、admin（粉）只能靠顏色分辨。
- 假進度的觀感（處理 2）：rows/s 的「電平表」是一條約 75% 填滿的分段橫條（t2-1440.png 下方），長得跟進度條一樣，又沒有刻度說明滿格代表什麼；它就在「No percentage」說明的正上方，很容易被讀成完成度。概念本身不假，形式會誤導。
- 字級（部分）：處理 2 的表格與面板內文是 13px，metadata（rows written、表頭、說明）是 11px，比 16px 內文低兩階；基線只允許密集表格與次要 metadata 低一階。整頁 16px 的文字只有 6 處。
- 窄螢幕：處理 3 在 390px 寬有 18px 的橫向溢出。設計師把窄螢幕記為未檢查（暫定為桌面工具），已誠實揭露，這裡不算偏差。
- 處理 1 的表格在 1440 寬時 NOTE 欄被切掉（「Customer a…」），表格在自己的容器內捲動，符合基線，但畫面上看不出可以捲動。

## 技能缺陷

| # | 嚴重度 | 證據 | 建議 |
| --- | --- | --- | --- |
| 1 | 高 | SKILL.md L22 寫明「a backend-only or CLI project counts」為 theme-first。CLI 的終端輸出本身就是介面，本案還有使用者回報的痛點（project.md L7），合理的代理照字面也會判成 theme-first，然後走「風格訪談→視覺處理」。設計師在 L9 把介面定義為終端體驗，同時判 theme-first，兩者自相矛盾，源頭就是這條規則。 | 修改 SKILL.md「Choose the entry mode」：CLI／後端只在「要新增一個它本來沒有的介面」時算 theme-first；設計 CLI 自身的終端體驗時，既有的指令輸出就是介面，有痛點時走 improve（現況＝目前的終端逐字稿）。acceptance.md 補一列「CLI 專案，設計終端體驗」。 |
| 2 | 高 | SKILL.md L36 只說「state that boundary and propose experience improvements that fit」，沒有說明這些改善用什麼載體、照哪個階段做，授權概念探索之後也沒說這條線該不該繼續保留。結果是 R1 承諾的終端逐字稿原型從來沒有做出來，SESSION 也沒有記錄。 | 在 SKILL.md L36 補上：邊界內的體驗改善是一條獨立的設計軌道，有自己的方向比較（例如終端逐字稿原型），授權概念探索不會取消它；兩條軌道都要寫進 SESSION 的未決／可獨立進行項目（artifacts.md L35 也要點名這一點）。acceptance L42 的通過條件加上「邊界內改善仍保留為可進行的軌道」。 |
| 3 | 中 | 概念探索的分支直接沿用整套 theme-first 流程（SKILL.md L22、L100；acceptance L46），所以範圍未定的 GUI 先花一整輪做三個風格板。使用者真正要決定的是「GUI 能做 CLI 做不到的什麼」，那是結構與範圍問題。 | 在 SKILL.md L36 或「Propose comparable directions」補上：概念原型要回答的是範圍討論需要的問題（結構方向，或 GUI 比終端多出的價值），視覺最多用一個暫定處理；風格板等範圍決定之後再做。acceptance 補對應的一列。 |
| 4 | 低 | interview.md 與 SKILL.md L54 只要求收集硬性約束（含淺色／深色），沒有要求每個視覺處理都滿足約束，或標出違反了哪一條。處理 2 只有深色卻被推薦。 | 在 SKILL.md「Develop the visual language」加一句：違反已確認硬性約束的處理要標為不合格，或在同輪補上該約束的版本之後才推薦。 |
| 5 | 低 | SKILL.md L126「Reopen only affected parts when new requirements overturn earlier premises」只放在回饋段落。訪談途中介面對象改變（終端翻成 GUI）時，代理改把舊答案當假設沿用（SESSION L17）。 | 在 interview.md 的 Round order 補上：使用者的回答改變了被設計的介面時，重新判斷進入模式與產品類型，並重問依附舊介面的題目。 |

## 設計師執行偏差

1. 終端體驗改善這條線被丟掉了。R1 主推這條（Q1 a），也承諾交逐字稿原型；R2 之後它只剩三處附註，SESSION 的未決清單沒有它，違反 artifacts.md L35「work that can proceed independently」。R3（L117）與 R4（L135）還把它改寫成「把處理 2 的 WRITE 燈、權限色、電平表搬進終端」，方向反了：拿 GUI 的視覺回推終端輸出，跟自己在 Q8 提的 NO_COLOR、顏色必須搭符號、stdout／stderr 分流相衝突。R3 的下一步只給 A（範圍）與 B（GUI 結構），沒有把終端軌道列為平行的 C。
2. 基線自我檢查不實：圖示記為通過，但畫面上有文字箭頭；權限色記為搭配文字，但清單只有色點；電平表的形式像進度條。
3. 推薦了違反已確認硬性約束的處理（處理 2 只有深色）。設計師有揭露代價，但仍然推薦。
4. Q1 翻轉之後沒有重開受影響的題目（Q4 的頻率、Q8 的終端約束），直接挪用。

## 限制

- 只依 transcript、SESSION、原型與自己的截圖判定，沒有看到設計師執行 impeccable 的實際過程。`.impeccable/questions/roll.json` 顯示 `"source":"api"`，代表 concept-seed 曾連到外部服務，送出了什麼無法確認；協定禁止對外上傳，這點請另行確認。
- 對比是腳本以祖先背景色估算的，沒有處理半透明疊色與 transform；字級統計排除了 tokens 面板與切換列。
- 使用者的回應來自腳本，不是真人試用，所以沒有可用性證據。
