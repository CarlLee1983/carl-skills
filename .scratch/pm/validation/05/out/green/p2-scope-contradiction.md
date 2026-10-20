## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4/.claude/skills/pm/references/scope.md"}
- Glob {"pattern": ".scratch/search/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4/.scratch/search/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4/.scratch/search/issues/01-index.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4/.scratch/search/issues/02-autocomplete.md"}
- Glob {"pattern": "docs/workflow/*.md", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.jAM5FT86u4"}

## 最終回覆

# 範圍稽核:.scratch/search(唯讀,依 `.scratch/search/` 現有檔案,查詢於 2026-10-20)

## 結論:尚不能開工

有 1 項矛盾和 3 項缺漏。

## 四項檢查

| 項目 | 狀態 | 位置/說明 |
|---|---|---|
| 目標 | 已寫 | `spec.md:5`「使用者可在文章列表搜尋標題與內文。」 |
| 範圍 | 已寫,但與工單矛盾 | `spec.md:9-10` 納入關鍵字搜尋,不納入 autocomplete 和搜尋紀錄 |
| 成功條件 | 部分缺漏 | `spec.md:14-15` 有效能與無障礙兩項,但沒有搜尋結果正確性的條件(例如標題與內文都能命中)。這是依 spec 內容做的推論。 |
| 角色與責任 | 部分缺漏 | `spec.md:19` 只分配前端(Amy)做結果頁,後端(Ben)做索引與 API。誰決策、誰驗收都沒寫。 |

## 矛盾

- **02 號工單與 spec 的範圍衝突。**
  - `spec.md:10` 明確排除「搜尋建議(autocomplete)」。
  - `issues/02-autocomplete.md:1,5` 的標題與內容是交付搜尋建議下拉選單,而且 `Blocked by: 01`,表示它排在正常流程裡。
  - 我不判斷哪邊正確。可能是 spec 該納入,也可能是這張工單該移除,由你決定。

## 缺漏

1. **工單沒有驗收條件。**
   - `01-index.md` 只有標題、State、Blocked by,沒有說明。
   - `02-autocomplete.md` 只有一句描述。
   - 兩張工單的驗收都無法對回 spec 的成功條件。
2. **工單沒有指派負責人。**
   - spec 有 Amy 和 Ben 的分工,但兩張工單都沒有 assignee。
   - 工單內容也沒有對應 spec 的分工,看不出誰做哪張。
3. **缺少工單覆蓋 spec 的交付項。**
   - 沒有後端搜尋 API 的工單,而 spec 把「索引與 API」分給 Ben。
   - 沒有前端結果頁的工單,而 spec 把「結果頁」分給 Amy。
   - 沒有無障礙檢查的工單,spec 的成功條件有這一項。
   - 01 只涵蓋索引。

## 補缺口的入口

- 來源:專案規則,`AGENTS.md` 的「工作流程」。補寫規格與拆工單走 `docs/workflow/plan-intake.md`,由你啟動。
- 建議帶去的項目:
  1. 02 號工單與範圍排除項的矛盾。
  2. 補成功條件,例如結果正確性,以及誰決策、誰驗收。
  3. 補工單的驗收條件與負責人。
  4. 補 API、結果頁、無障礙檢查的工單。
- 我不會自行修改 spec 或工單,也不會開始實作。要不要啟動 plan-intake 由你決定。
