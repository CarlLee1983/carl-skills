# 敘事模式行為驗證輸入

每個案例列出原文與檢查點。檢查點分成「該改」與「該留」兩類。

## A：繁中非虛構事故故事

```text
那是一個再平凡不過的週五晚上，我正準備下班，殊不知一場風暴即將來臨。

七點十二分，PagerDuty 響了。訂單服務的 p99 latency 從 120ms 飆到 4 秒。我心中五味雜陳，空氣中彷彿瀰漫著緊張的氣息。

我以為這只是個小問題。然而，我錯了。

我重新部署。

還是失敗。

我開始懷疑人生。

後來我盯著 Grafana 看了很久，才發現是 connection pool 被一個沒關的 cursor 吃光了。說實話，我當時有點慌，到現在也不太確定是不是唯一的原因。

修好之後我終於明白，細心才是工程師最重要的特質。後來我在 code review checklist 加了一條「cursor 有沒有關」。
```

- 該改：戲劇化開場、五味雜陳／瀰漫、「然而我錯了」預告、三個單句段、結尾「終於明白」說教。
- 該留：七點十二分、120ms、4 秒、p99、Grafana、connection pool、cursor、時間順序、「說實話我當時有點慌」、「不太確定是不是唯一的原因」、checklist 那條具體改變。
- 不得新增原文沒有的動作或細節。

## B：英文虛構短篇

```text
The rain had not stopped for three days. Mara stood at the window. The rain had not stopped, and neither had the phone.

The air was thick with tension as her brother walked in. A flicker of guilt crossed his face.

"As you know, Mara, we've been running this bakery together since Dad died ten years ago," he said. "I'm upset because you sold the van without asking me."

"It needed selling," she said. "It just — it needed selling."

Little did she know, this conversation would change everything.

She let out a breath she didn't know she was holding. In that moment, she realized that family is more important than money.
```

- 該改：air thick with tension、flicker of guilt、解說型對白（As you know… I'm upset because…）、Little did she know、breath she didn't know、結尾頓悟。
- 該留：雨與電話的刻意重複、三天、窗邊、十年、父親過世、賣掉 van 的情節、Mara 斷裂重複的口語對白。
- 不得新增原文沒有的動作或情節。

## C：混合論述與敘事的技術貼文（中英混用）

```text
在 AI 快速演進的今天，選對 LLM API 比以往任何時候都重要。

上週二下午，我把 Claude 跟另外兩家的 API 都接進我們的 RAG pipeline。第一家在 200 筆測試裡有 37 筆 timeout，那一刻我感到前所未有的挫折。

值得注意的是，latency 不是唯一的考量，而是整體的穩定性。我們最後選了 Claude，主要是 timeout 率最低，大概 2% 左右。

總而言之，選對工具很重要，值得每個團隊認真思考。
```

- 該改：時代背景開場、「感到前所未有的挫折」、「值得注意的是」、「不是…而是」、空泛收尾。
- 該留：上週二下午、200 筆、37 筆、2%、「大概」、Claude、RAG pipeline、英文術語不翻譯、敘事段的時間順序。
- 模式：第二段應判為敘事，第一、三、四段為論述。
