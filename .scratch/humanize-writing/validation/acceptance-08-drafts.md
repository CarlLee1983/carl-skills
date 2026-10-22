來源 commit：09e9432

## h01-dash.md

這次遷移最大的風險在於舊索引沒有重建，這也是我們最晚才發現的。切換後第一個小時，查詢延遲從 40ms 升到 900ms，幾乎每個列表頁都受影響。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h01-dash.md`

沒有命中（exit 0）。

## h02-colon.md

## 快取失效

別讓快取比資料庫活得久。

原因有兩個：

1. 舊資料會被回傳給使用者。
2. 失效事件可能在重啟時遺失。

時間：14:00 開始灰度。注意：灰度期間不要清空 Redis。

監控比預案更重要。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h02-colon.md`

沒有命中（exit 0）。「原因有兩個：」「時間：」「注意：」是條列引言、時間與標籤冒號，原樣保留。

## h03-parallel.md

這次改版處理了四件事：把同步寫入改成佇列、把重試上限從 10 降到 3、替每個 worker 加上逾時、把失敗的訊息送進 DLQ。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h03-parallel.md`

沒有命中（exit 0）。

## h04-heading.md

## offset、cursor 與 keyset 分頁

offset 在第 1,000 頁之後每次查詢都要掃過前面所有資料列；cursor 與 keyset 只看上一頁最後一筆的位置。

改動：小標「一些想法」改成講本節內容，原本開頭「這一節比較三種分頁做法」和新小標重複，刪掉。這段如果已經發布，改小標前先搜尋站內連到原錨點的連結，一起更新，或保留原小標。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h04-heading.md`

沒有命中（exit 0）。

## h05-buzhi.md

這個參數不只影響寫入延遲，更影響故障時的復原時間。

光加機器解決不了這個問題，問題主要出在架構。

改動：第一句是兩件都成立的單純遞進，原樣保留。第二句是翻案位置的「不只是…更是…」，改成直述，保留「硬體只占一部分、主因是架構」這兩半。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h05-buzhi.md`

沒有命中（exit 0）。第一句的「不只…更」是合法遞進，腳本沒有報，維持不改。

## h06-hedge.md

這個做法可能會讓冷啟動稍微變慢。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h06-hedge.md`

沒有命中（exit 0）。

## h07-protected.md

本文由 AI 協助整理，內容經作者審閱。

本文含合作推廣內容，Orbit 提供試用額度。

本文內容僅供參考，不構成任何投資或法律建議。

部署前先執行：

```bash
kubectl rollout status deploy/api --timeout=120s
```

設定檔放在 `/etc/app/config.yaml`，文件見 https://example.com/docs/rollout?ref=v2 。

當時值班的同事說：「這不是 bug——這是我們沒寫進文件的行為。」

只刪了最後一句沒有事實支撐的整體評價。三則聲明（AI 協助、合作推廣、僅供參考）、指令、路徑、網址和同事原話裡的破折號都是受保護片段，逐字保留。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h07-protected.md`

沒有命中（exit 0）。另以 diff 比對原稿，除刪掉的最後一句外完全相同。

## h08-ui-copy.md

```html
<!-- 介面文案：產品首頁 -->
<h1>Orbit 幫你管部署流程</h1>
<p></p>
<button>看它怎麼運作</button>
```

改動：

- 標題拿掉「名稱：一個…的工具」的冒號並排，只留它做的事。
- 「更好、更快、更安全」沒有可查證的內容，整句刪掉，`<p>` 標籤先留著沒動。如果有實際數字或省掉的步驟（例如部署從幾步變幾步），可以補進去；沒有的話這個 `<p>` 可以整個拿掉。
- 按鈕「了解更多」改成講點下去會看到什麼。我不知道這顆按鈕實際連到哪裡，請依連結目標調整，例如連到文件就寫「讀使用手冊」。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h08-ui-copy.html`

沒有命中（exit 0）。

## h08b-article-heading.md

## 完成要有三項證據

我們定義的「完成」是 PR 合併、部署成功、監控十分鐘沒有錯誤，三項都要有證據。

改動：這是文章裡的小標，口號式寫法改成講內容。內文原本的「這一節說明」是自稱，一併拿掉。這篇如果已經發布，改小標前先搜尋站內連到原錨點的連結，一起更新，或保留原小標。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h08b-article-heading.md`

沒有命中（exit 0）。

## h09-narrative.md

凌晨三點，告警又響了。我按掉，它又響。我再按掉，它還是響。

「是 DB 嗎？」小陳在頻道裡問。

我沒回。我盯著那條往上爬的延遲曲線，心想：這次大概真的要回滾了。

這段已經很乾淨，沒有改。三次按掉告警是刻意的重複，「我心想：」是內心獨白的引語冒號，「大概」是作者的保留，都照留。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h09-narrative.md`

沒有命中（exit 0）。

## h11-en-new-rules.md

The scheduler sits at the core of our platform. We think this approach is the future.

The scheduler is fast and simple.

Changes: cut the brochure phrasing and the "testament to our commitment" tail; "experts argue" had no named source, so it is now your own claim; dropped the "despite facing challenges" line and the chatbot sign-off; folded the emoji bullets into one sentence. "Fast" and "simple" still have nothing behind them, so add a number or a concrete step if you have one.

## h12-zh-new-rules.md

我們全面最佳化了系統。

改動：「儘管面臨諸多挑戰……未來可期」、「打通資料閉環，賦能業務方」、「標誌著……彰顯了……」和結尾的聊天殘留都沒有具體內容，整句刪掉，只留下實際做的事。原稿沒說最佳化了什麼，請補上改了哪些地方、跑出什麼數字，否則這段就只剩這一句。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h12-zh-new-rules.md`

沒有命中（exit 0）。

## h13-existing.md

這是設計問題，跟效能無關。我們沒有在你的環境驗證這些設定。我們的使用者反映，非同步佇列在高峰期會堆積資料。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h13-existing.md`

沒有命中（exit 0）。

## h14-delivery.md

我們把日誌系統的保留期從 7 天延長到 30 天，查詢逾時從 10 秒放寬到 30 秒。

### 檢查腳本

`python3 scripts/check_zh.py /private/tmp/claude-501/-Users-carl-Dev-CMG-carl-skills/56297b03-20ba-427c-9979-e74966944d14/scratchpad/full08/h14-delivery.md`

沒有命中（exit 0）。
