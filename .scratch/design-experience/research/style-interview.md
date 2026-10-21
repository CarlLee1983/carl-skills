# 風格方向訪談：專業做法與依產品類型的提問

> 研究日期：2026-10-21。用途：修訂 `skills/design-experience`，讓代理人在「只有主題、沒有現成 UI」時以編號回合訪談使用者，再產出 3 個視覺處理方向（visual treatments）。
> 標記：**[來源]** 有引用網址可查；**[推論]** 是我從來源歸納或延伸的判斷，未被來源直接陳述。來源編號見文末。

## 結論摘要

1. **先問目標與受眾，再問美感。** Samantha Warren 的 style tile 流程第一步是讓利害關係人列出並排序「視覺的目標」，用來決定之後每個風格取捨的優先順序 [S1][S2]；NN/g 的 stakeholder interview 也以成功指標、優先事項、既有限制開場 [S5]。這和本 skill 要求的「一行受眾＋主要動作」一致。**[來源]**
2. **形容詞是原料，但要靠「相對詞對」逼出取捨。** Warren 用 semantic differential（例：modern ↔ old-fashioned）讓客戶在量尺上標位置，且常把每個詞配一個範例網站（MailChimp＝illustrative、NPR＝typographic）[S2]。品牌界常用的 personality sliders 做法相同 [S9][S10]。單問「你想要什麼感覺」只會得到「簡潔、現代、專業」這類無區辨力的詞。**[來源＋推論]**
3. **3 個方向、允許混搭，是業界慣例。** Warren 的實例就是 3 個方向（clean / strong / friendly），客戶最後從三張 tile 各取一部分組合 [S2]；Adobe XD 的指南也描述多個 mood board 並列後混合 [S14]。所以 3 個 treatments 的設計是對的，但要預期使用者「挑 A 的字體＋B 的色彩」，回合設計應容納這種回覆。**[來源]**
4. **方向要用「元件」而非整頁或純氛圍圖呈現。** Warren 認為 mood board 太模糊、comp 太具體，style tile 介於中間 [S1]；Dan Mall 的 element collage 進一步放真實 UI 元件，目的是取得「繼續走的方向」而非簽核 [S11]。**[來源]**
5. **語氣（tone）是獨立軸，NN/g 有現成四軸：** formal↔casual、serious↔funny、respectful↔irreverent、matter-of-fact↔enthusiastic；並建議再加幾個具體語氣詞與「反語氣詞」[S3]。可直接當作情緒形容詞之外的一個訪談回合。**[來源]**
6. **產品類型決定哪些問題會改變設計。** 電商的關鍵是商品找尋路徑與圖片 [S6]；後台／儀表板的關鍵是「立即行動 vs 事後分析」與密度 [S7][S8]；內容站的關鍵是閱讀與掃讀 [S12][S13]；品牌／企業站的關鍵是信任與「我們是誰」[S15]。泛用的「喜歡什麼顏色」對所有類型都是低價值問題。**[來源＋推論]**
7. **功能型 UI 的「風格」主要是克制。** Shopify 要求 admin app 與宿主介面一致、不為與眾不同而與眾不同 [S16]；Material 建議只在大量資訊的列表／表格／長表單提高密度 [S8]。訪談後台時，形容詞回合應縮短，改問工作情境與密度。**[來源]**
8. **美感會讓使用者原諒小問題，但遮不住大問題，且會干擾回饋。** [S4] 對訪談的意義：使用者對方向的稱讚不等於方向可用，回饋回合應問「做主要動作時哪裡卡」而不只是「喜不喜歡」。**[來源＋推論]**
9. **事後驗證可用 Microsoft Desirability Toolkit。** 給 ≤25 個正負混合形容詞（原版至少 40% 負面詞），請人選 5 個描述畫面，再比對事先定義的品牌屬性 [S4b]。可用於讓使用者對 3 個方向「各選 3 個詞」，檢查方向是否命中訪談得到的 mood 形容詞。**[來源＋推論]**

## 訪談共通骨架（給代理人用）**[推論，綜合 S1、S2、S3、S5]**

| 回合 | 目的 | 必得產出 |
| --- | --- | --- |
| 0. 推斷類型 | 先讀現有材料，猜產品類型並請使用者確認 | 類型＋信心 |
| 1. 受眾與主要動作 | 誰、在什麼情境、最重要的一個動作 | 一行受眾＋主要動作 |
| 2. 硬性限制 | 品牌資產、平台、語言、明暗模式、無障礙 | 限制清單 |
| 3. 情緒取捨 | 3–5 組相對詞對（含 NN/g 語氣軸），每題附建議答案 | 2–3 個 mood 形容詞（＋1 個反形容詞） |
| 4. 參考／反參考（可選） | 「像這個、不要像那個」，並問「是哪一點」 | 具體屬性，而非網站名 |
| 5. 類型專屬題 | 見下節，挑 2–4 題真正會改變設計的 | 密度、圖像角色、層次等決策 |

每題附建議答案的寫法：先陳述代理人推斷（依據什麼材料），再給選項；使用者可只回「同意」。**[推論]**

## 依產品類型的提問集（只列會改變設計的題目）

### 1. 電商／購物網站

UX 優先順序：讓人找到商品（分類導覽、搜尋、策展路徑三條路）、讓人判斷商品、順暢結帳 [S6][S6b]。

| # | 問題 | 改變什麼 | 建議答案方向 |
| --- | --- | --- | --- |
| 1 | 商品數量與品類廣度？顧客多半知道要買什麼，還是來逛？ | 首頁以搜尋為主還是策展／分類為主；Baymard 指出首頁若只呈現不到 40% 品類，使用者會誤判商品範圍 [S6] | 品類多→分類＋顯眼搜尋；精品少量→策展敘事 |
| 2 | 商品靠「看」決定還是靠「規格」決定？（服飾 vs 3C） | 圖片尺寸與比例、規格表的權重 **[推論；Baymard 有分垂直類別但細節在付費報告 S6c]** | 視覺型→大圖、網格寬鬆；規格型→比較表、密度較高 |
| 3 | 有沒有自有商品攝影？去背圖還是情境圖？ | 版面能否倚賴圖片撐質感；Baymard 指出 stock 圖與平淡去背圖表現較差 [S6] | 沒有好照片→方向應以字體與色塊建立質感 |
| 4 | 價格帶與品牌定位（平價促銷 vs 高端） | 色彩飽和度、留白、促銷元素多寡 **[推論]** | 平價→高對比促銷色；高端→低飽和、多留白 |
| 5 | 促銷／廣告版位的必要程度 | Baymard：過度花俏的廣告會搶走導覽並被視為垃圾訊息 [S6] | 預設把促銷限制在不擋分類的位置 |
| 6 | 主要裝置（手機占比） | 行動優先的導覽與圖片比例；Shopify 指出多數店面流量來自手機 [S16] | 預設 mobile-first |

雜訊題：「喜歡什麼顏色」「要不要輪播」（輪播是實作題，Baymard 已有結論 [S6]）。常見陷阱：視覺壓過搜尋框、首頁做成品牌形象頁而看不出賣什麼 [S6]。

### 2. 品牌／企業／行銷／個人官網

UX 優先順序：第一眼說清楚「是誰、做什麼、為什麼可信」，再導向單一轉換（聯絡、預約、作品）[S15][S5]。

| # | 問題 | 改變什麼 |
| --- | --- | --- |
| 1 | 訪客看完要做的唯一一件事？ | CTA 的層次與重複頻率 **[推論]** |
| 2 | 有哪些既有品牌資產（logo、字體、色票、攝影風格）？哪些可以動？ | 方向是「延伸既有品牌」還是「從零建立」；Warren 指 style tile 特別適合把既有品牌轉到網頁 [S1] |
| 3 | 三個主要競品或同業是誰？要和他們「像」還是「不像」？ | 定位差異；品牌問卷普遍要求列出競品並說明差異 [S17] |
| 4 | 用一組比喻描述品牌（例：如果是交通工具會是什麼？為什麼？） | 引出形容詞；Warren 的破冰題 [S2] |
| 5 | 語氣四軸各在哪個位置？ | 文案與排版的正式程度 [S3] |
| 6 | 信任靠什麼建立：作品、客戶名單、人、數據、獎項？ | 首屏內容與圖像角色 **[推論，參考 S15]** |
| 7 | 個人站：主角是「人」還是「作品」？ | 肖像與作品的版面主次 **[推論]** |

雜訊題：「想要高級感」（未經相對詞對拆解就無區辨力）。常見陷阱：只有氛圍沒有訊息、每個利害關係人形容詞互相矛盾——Warren 的做法是把分歧明確記下來，而不是平均掉 [S2]。

### 3. 功能型產品 UI／後台／儀表板

UX 優先順序：效率、可掃讀、一致與可預期；風格表現讓位給任務 [S7][S8][S16]。

| # | 問題 | 改變什麼 |
| --- | --- | --- |
| 1 | 使用者看到資料後是「立即處置」還是「之後分析」？ | operational vs analytical 儀表板，決定警示強度與更新頻率 [S7] |
| 2 | 每天用多久、是否長時間盯著？ | 密度（default／comfortable／compact）[S8]；長時間使用者通常傾向 dark 或低對比 **[推論]** |
| 3 | 主要畫面是表格／列表／長表單，還是圖表？ | 只在大量資訊處提高密度；對話框與警示保持預設間距 [S8] |
| 4 | 哪些偏離值或門檻必須一眼看到？ | 色彩角色：顏色作為類別的輔助線索，不用來表示數量，並搭配形狀 [S7] |
| 5 | 是否嵌在其他系統（Shopify、Salesforce 等）內？ | 必須服從宿主設計系統，品牌表現降到最低 [S16] |
| 6 | 使用者是內部熟手還是偶爾使用的客戶？ | 標籤明確度、引導程度 **[推論]** |

雜訊題：大量情緒形容詞回合（後台的 mood 通常收斂到 calm / precise / trustworthy 一類，問太多是浪費回合）**[推論]**。常見陷阱：用圓餅圖、儀表、3D 圖，或把儀表板當探索工具 [S7]；整個 App 套用最高密度 [S8 引 MUI 文件]。

### 4. 內容／編輯型網站（部落格、媒體、知識庫）

UX 優先順序：可讀性、掃讀、層次、長期閱讀舒適 [S12][S13]。

| # | 問題 | 改變什麼 |
| --- | --- | --- |
| 1 | 讀者是「讀完一篇」還是「找到答案就走」？ | 長文排版 vs 掃讀結構；NN/g 指出無層次的頁面會造成 F 型掃讀 [S12] |
| 2 | 典型文章長度與結構（有無大量小標、程式碼、圖表）？ | 字級、行長、標題階層 **[推論]** |
| 3 | 內容發布頻率與首頁角色（時序串流 vs 精選） | 首頁版型 **[推論]** |
| 4 | 圖片是內容的一部分還是裝飾？ | 圖片比例與版面網格 **[推論]** |
| 5 | 主要語言（中文長文 vs 英文） | 字體選擇與行高；中文長文需另外檢查字體 **[推論]** |
| 6 | 作者聲音的語氣四軸 | 標題字體個性、裝飾程度 [S3] |

常見陷阱：標題與段落開頭沒有承載資訊的詞——NN/g 建議以倒金字塔與資訊前置寫法 [S13][S12]。

### 其他類型（來源有獨立處理者）

- **SaaS 行銷／落地頁**：B2B 買家第一資訊需求是價格；複雜方案應提供典型情境的參考價 [S18]。應加問「是否公開價格、是否提供試用」。**[來源]**
- **行動 App**：遵循平台慣例、品牌不覆蓋系統行為；我無法直接讀到 Apple HIG 原文，只取得第三方摘要，標為 **[未直接驗證]** [S19]。應加問「iOS／Android／兩者」「是否需要跟隨系統明暗」。

## 引出非設計師品味的技巧

| 技巧 | 做法 | 依據 |
| --- | --- | --- |
| 相對詞對／semantic differential | 給 3–5 組對立詞，請對方在 5 點量尺標位置；每個極端配一個範例網站 | Warren [S2]；personality sliders [S9][S10] |
| 比喻題 | 「如果你的網站是一輛車／一個人／一家店，會是什麼？為什麼？」重點在「為什麼」引出的形容詞 | Warren [S2] |
| 形容詞彙整 | 收集所有回答裡的形容詞，依出現頻率排序，取主題；利害關係人分歧時明確記錄 | Warren [S1][S2] |
| 語氣四軸＋反語氣詞 | 用 NN/g 四軸定位，再補 2–3 個具體語氣詞與要避免的詞 | NN/g [S3] |
| 參考／反參考（this not that） | 請對方給喜歡與討厭的網站，追問「具體是哪一點」（字體？留白？色彩？）；把網站名轉成屬性 | Warren 把詞與網站配對 [S2]；**屬性化追問為 [推論]** |
| 視覺 A/B（多方向並列） | 同時呈現 3 個 style tile／element collage，允許混搭 | [S1][S2][S11][S14] |
| 受控詞彙回饋 | 對每個方向請對方從 ≤25 個正負混合詞中選 3–5 個，比對訪談得到的 mood 形容詞 | Microsoft Desirability Toolkit [S4b] |

注意：受控詞彙也有歧義，NN/g 記錄過受試者把 “sophisticated” 理解成負面 [S4b]，所以收到形容詞要追問一句代表意思。**[來源]**

## 從專案材料推斷產品類型 **[推論；來源未直接討論，由上述類型差異反推]**

給代理人的指示建議：在第一回合前先讀現有材料，用證據提出推斷，再讓使用者確認，而不是直接問「這是什麼類型的網站」。

| 訊號（在 README、規格、資料模型、路由、文案中找） | 推斷類型 |
| --- | --- |
| `product`、`cart`、`checkout`、`sku`、`inventory`、價格欄位、金流整合 | 電商 |
| `admin`、`dashboard`、`role`、`permission`、CRUD 表單、報表、批次操作 | 後台／儀表板 |
| `post`、`article`、`author`、`tag`、Markdown／CMS、RSS | 內容站 |
| `about`、`contact`、`portfolio`、`case study`、單頁、少量動態資料 | 品牌／個人官網 |
| `pricing`、`signup`、`trial`、`features` 區塊 | SaaS 行銷頁 |
| React Native／Expo／Swift／Kotlin、推播、離線 | 行動 App |

規則建議：證據混雜時（例：電商前台＋商家後台），分成兩個介面各自訪談，因為兩者的 mood 與密度答案相反；推斷信心低時把類型當第一個問題並附建議答案。

## 來源

- [S1] Samantha Warren, Style Tiles — https://styletil.es/
- [S2] Samantha Warren, “Style Tiles and How They Work,” A List Apart — https://alistapart.com/article/style-tiles-and-how-they-work/
- [S3] NN/g, “The Four Dimensions of Tone of Voice” — https://www.nngroup.com/articles/tone-of-voice-dimensions/
- [S4] NN/g, “The Aesthetic-Usability Effect” — https://www.nngroup.com/articles/aesthetic-usability-effect/
- [S4b] NN/g, “Using the Microsoft Desirability Toolkit to Test Visual Appeal” — https://www.nngroup.com/articles/microsoft-desirability-toolkit/
- [S5] NN/g, “Stakeholder Interviews 101” — https://www.nngroup.com/articles/stakeholder-interviews/
- [S6] Baymard Institute, Homepage & Category UX（首頁常見陷阱）— https://baymard.com/research-articles/ecommerce-homepage-ux
- [S6b] Baymard Institute, Ecommerce UX Best Practices — https://baymard.com/learn/ecommerce-ux-best-practices
- [S6c] Baymard Institute, Product Page research topic（細節為付費內容）— https://baymard.com/product-page
- [S7] NN/g, “Dashboards: Making Charts and Graphs Easier to Understand” — https://www.nngroup.com/articles/dashboards-preattentive/
- [S8] Material Design, “Applying density” — https://m2.material.io/design/layout/applying-density.html （M2 版，未核對 M3）
- [S9] Miro, Personality Sliders template — https://miro.com/templates/personality-sliders/
- [S10] Helder Design, brand personality sliders（PDF）— https://helder.design/wp-content/uploads/2023/04/branding-template-brand-personality-sliders.pdf
- [S11] Dan Mall, “RIF Element Collages” — https://v3.danmall.com/articles/rif-element-collages
- [S12] NN/g, “F-Shaped Pattern of Reading on the Web” — https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- [S13] NN/g, “Inverted Pyramid” — https://www.nngroup.com/articles/inverted-pyramid/
- [S14] Adobe XD Ideas, Communicating visual design (part 3) — https://xd.adobe.com/ideas/guides/comprehensive-guide-ux-design-communicating-visual-design-part-3
- [S15] NN/g, Corporate Websites topic（About Us 與信任；僅讀到摘要）— https://www.nngroup.com/topic/corporate-websites/
- [S16] Shopify, App design guidelines — https://shopify.dev/docs/apps/design/index
- [S17] Tabletop Media Group 等品牌問卷範本（競品與形容詞題；二手範本，可信度中）— https://www.ncrla.org/wp-content/uploads/2020/11/Brand-Design-Questionaire.pdf
- [S18] NN/g, “Show Prices for Common Scenarios” 與 B2B topic — https://www.nngroup.com/articles/show-prices-for-common-scenarios/ ；https://www.nngroup.com/topic/b2b-websites/
- [S19] Apple HIG Branding（原文無法擷取，僅參考第三方摘要，未直接驗證）— https://developer.apple.com/design/human-interface-guidelines/branding

未能取得：GV／Jake Knapp「Three-Hour Brand Sprint」原文（library.gv.com 無法解析、Medium 回 403），因此 personality sliders 以 Miro 與 Helder 範本為據；Polaris 官方 experience values 頁已重新導向，改用 shopify.dev 的 app 設計指引。
