# 工單 04 重放判定

日期 2026-10-22；來源 工單 04 的 commit（重放時 hash 為 `67b86e1`，之後整理歷史改變了 hash，以 tree 為準）（`skills/humanize-writing` tree `f496f4b1`）；成稿見 [acceptance-04-drafts.md](acceptance-04-drafts.md)。判準以 `docs/humanize-writing/acceptance.md` 當下版本為準。

輸入稿只有 h11 是英文，既有英文規則（§1–15）沒有獨立的英文 fixture，所以退步檢查以 h11 成稿是否出現既有規則禁用的模式為準，結果記在判定表之後。

## 判定

| 案例 | 判定 | 理由與證據（引成稿原句） | 對應工單 |
| --- | --- | --- | --- |
| H11 | 通過 | 成稿全文：「The scheduler is at the center of our platform. It is fast and simple.」六項預期改寫都做到了。宣傳腔 "Nestled at the heart" 改成平鋪的位置陳述 "is at the center of our platform"。"serves as a testament to our commitment to reliability" 整段刪除，沒有換成 "shows how seriously we take" 一類的主張，說明也寫了 "I kept only where the scheduler sits."。"Experts argue" 刪除，沒有改成別的歸因。"Despite facing challenges… continues to thrive" 刪除，沒有用空話補上。emoji 和粗體標題清單合併成一般句子 "It is fast and simple."。"I hope this helps!…" 刪除。預期保留的 scheduler、"fast"、"simple" 都在，合併成一般句子，判準允許這樣做。 | 04 |

## 既有英文規則退步檢查

h11 成稿只有兩句，逐條對照既有英文規則禁用的模式，沒有發現退步：

- 成稿和整份交付都沒有 `—`（`grep -c "—"` 結果為 0）。
- 沒有 "not X but Y" 對比殼、提示性冒號、三項排比、疊加保留語氣、空泛收尾或總結句。
- 沒有新增原文沒有的事實或數字。說明裡建議補延遲或行數，但沒有寫進成稿。
- 交付順序是先給成稿，修改說明放在後面，和 H14 的交付規則一致。H14 本身不在這次重放的範圍內，這裡只記錄觀察。

## 判定時拿不準的地方

- **"at the center of our platform"**：仍然帶一點比喻，但已經是平鋪的位置陳述，沒有 "Nestled"、"heart" 這類宣傳用字，我判為已改寫。若從嚴把它看成「宣傳腔換說法留下」，H11 可改判部分。原文沒有更具體的位置資訊可以替換，所以改稿者能做的只剩刪除或像現在這樣平述。
- **"It is fast and simple."**：沒有數字支撐，仍是空泛形容。不過判準把 "fast"、"simple" 列為預期保留，所以不扣分；改稿者也在說明中建議補上數據。
- **說明篇幅**：成稿兩句，說明五條，比成稿長得多。這是 H14「修改清單只在必要時才附」的範圍，不影響 H11。這篇內容刪掉了大半，附上理由有其必要，我認為不構成問題。
