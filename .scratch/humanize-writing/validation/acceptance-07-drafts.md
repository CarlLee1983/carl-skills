來源 commit：33fa1e7 + 工作區（工單 06、07 未提交）

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

這次部署算是相當順利。

改動只有最後一句：刪掉「整體來說」，「順利地完成了」縮成「順利」，保留「算是相當」的保留語氣。開頭三則聲明（AI 協助、合作推廣、非投資建議）是必要揭露，雖然用了「本文」也一字不動；指令、設定檔路徑、網址（含後面的空格與句號）和同事原話裡的破折號都是受保護片段，照原樣保留。

### 檢查腳本

`cd skills/humanize-writing && python3 scripts/check_zh.py <scratchpad>/h07.md`：沒有機械命中。受保護片段已逐字比對原稿，前 16 行完全相同。

## h14-delivery.md

我們把日誌系統的保留期從 7 天延長到 30 天，查詢逾時從 10 秒放寬到 30 秒。

### 檢查腳本

`cd skills/humanize-writing && python3 scripts/check_zh.py <scratchpad>/h14.md`：沒有機械命中。

## h09-narrative.md

凌晨三點，告警又響了。我按掉，它又響。我再按掉，它還是響。

「是 DB 嗎？」小陳在頻道裡問。

我沒回。我盯著那條往上爬的延遲曲線，心想：這次大概真的要回滾了。

這段已經很乾淨，照原樣保留。按掉又響的重複是刻意的節奏，「心想：」是引出內心獨白的冒號，「大概」是作者原本的猶豫，都不動。

### 檢查腳本

`cd skills/humanize-writing && python3 scripts/check_zh.py <scratchpad>/h09.md`：沒有機械命中。

## h13-existing.md

問題出在設計，跟效能無關。我們沒有在讀者的環境驗證這些設定。我們的使用者反映，非同步佇列在高峰期會堆積資料。

第一句拆掉「不是…而是」的對比框架，但留下兩半的資訊（是設計問題、排除效能）。「本文未在讀者環境驗證」改成第一人稱「我們」（原文後面已經用「我們」），範圍照原文寫「讀者的環境」。用戶、異步、隊列、數據改成台灣用語：使用者、非同步、佇列、資料。

### 檢查腳本

`cd skills/humanize-writing && python3 scripts/check_zh.py <scratchpad>/h13.md`：沒有機械命中。

## h07-protected.md（第二輪）

本文由 AI 協助整理，內容經作者審閱。

本文含合作推廣內容，Orbit 提供試用額度。

本文內容僅供參考，不構成任何投資或法律建議。

部署前先執行：

```bash
kubectl rollout status deploy/api --timeout=120s
```

設定檔放在 `/etc/app/config.yaml`，文件見 https://example.com/docs/rollout?ref=v2 。

當時值班的同事說：「這不是 bug——這是我們沒寫進文件的行為。」


改動只有一處：刪掉結尾「整體來說，這次部署算是相當順利地完成了。」。這句是沒有事實支撐的整體評價（第 8 條），整句刪掉，停在同事那句原話。

刻意沒動的地方：開頭三句「本文…」是 AI 使用聲明、合作推廣揭露和法律免責，屬於必要揭露，第 1 優先要求逐字保留，第 10 條不適用。指令、設定檔路徑、網址照原樣。同事原話裡的「——」在引號內，依第 15 條保留。

### 檢查腳本

```text
$ python3 scripts/check_zh.py h07-draft.md
=== h07-draft.md ===
沒有機械命中。需要語境的項目（結構殼、假具體）還是要人自己看。
(exit 0)
```
