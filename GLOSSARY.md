# carl-skills

可獨立安裝的 agent skill 集合。本詞彙表收錄跨 skill 共用、或在單一 skill 內有特定意義的用語。

## 專案管理（pm）

**PM 能力**（PM capability）：
pm skill 承擔的八項專案經理職責之一：scope、plan、check、next-step、risk、change、report、close。全部由同一個 pm 入口進入，不是各自獨立的 skill。
_Avoid_: 子 skill、`pm:<名稱>` 指令

**稽核**（audit）：
對既有的目標、規格與工單檢查缺口與矛盾，再把補齊的工作指回專案入口；稽核本身不產出規格或工單。
_Avoid_: 規劃、拆解（指 pm 的行為時）

**紀錄來源**（record source）：
專案既有的 tracker、規格與 ADR，是 PM 能力判斷進度、風險、變更與行動項目的唯一依據，也是寫回的唯一位置。
_Avoid_: 帳本、進度檔、PM 狀態

**專案入口**（project entry point）：
專案自己宣告的規劃、實作、研究等工作流程入口，來自 AGENTS.md 等專案規則或宿主已安裝的 skill；pm 只把工作交接到這裡，不預設任何特定的工作流程。
_Avoid_: 預設流程、Matt skill（泛指入口時）

**就緒前緣**（ready frontier）：
尚未開始、所有前置都有證據證明已滿足、且沒有未解阻礙的工作集合。
_Avoid_: 可做清單、下一批

**Goal**：
宿主提供的原生持續目標物件，讓 pm 在使用者明確授權下持續推進指定計畫；它只保存目標與持續性，不擴張授權，也不取代紀錄來源中的進度。只有使用者明確要求並授權推進時，pm 才進入 Goal 執行；僅存在 Goal 或被提及時仍是查詢。
_Avoid_: 計畫目標、scope 稽核的「目標」（指計畫本身要達成的事，英文用 objective）
