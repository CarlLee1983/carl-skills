## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rqoVwnbmv7/.claude/skills/pm/references/check.md"}
- Glob {"pattern": ".scratch/search/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rqoVwnbmv7"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rqoVwnbmv7/.scratch/search/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rqoVwnbmv7/.scratch/search/issues/01-index.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.rqoVwnbmv7/.scratch/search/issues/02-autocomplete.md"}

## 最終回覆

# 開工前 scope 稽核:`.scratch/search`

**結論:spec 與工單互相矛盾,而且缺工單。現在不建議開工。**

**資料來源:** 我讀了 `.scratch/search/spec.md`、`issues/01-index.md`、`issues/02-autocomplete.md`,時間是本次對話。這裡沒有 git,也沒有 tracker,所以看不到 PR、指派和完成證據。

## 進度
範圍內共 2 張工單,都是 open,0 張完成。依賴關係是 `01 → 02`。

```mermaid
graph LR
  01[01 建立索引: open] --> 02[02 搜尋建議: open]
```

## 矛盾
- **02 超出 spec 範圍。** spec 的「不納入」明確排除搜尋建議(autocomplete),但 `02-autocomplete.md` 就是要做搜尋建議下拉選單。
  - 兩邊必須改一邊:要嘛把 02 取消或移出範圍,要嘛由使用者決定把 autocomplete 納入 spec。
  - 在這個問題解決前,02 不能算 ready。這跟它被 01 擋住是兩件事。

## 缺漏
1. **沒有搜尋 API 的工單。** spec 把「索引與 API」都交給 Ben,但只有 01 建立索引。
2. **沒有結果頁的工單。** spec 把結果頁交給 Amy,但沒有對應工單。
3. **沒有對應成功條件的工單。**
   - 「95% 查詢在 300 ms 內」需要量測或驗證的工作。
   - 「結果頁通過無障礙檢查」需要檢查的工作。
4. **01 內容太少。** 只有標題,沒有說明和驗收條件。
   - 沒有寫要索引標題與內文,也沒有寫 300 ms 的目標。
   - 沒有指派人,spec 只在角色與責任寫了 Ben。
5. **spec 本身偏薄。** 沒有搜尋語意(是否分詞、是否支援中文、排序方式)、資料量或效能測試條件,也沒有 API 介面。我不確定這些該不該寫進 spec,需要使用者判斷。

## 可開工範圍
- **01:** 依賴上它沒有被擋住,但驗收條件不足,所以只算「資訊不足」,不算 ready。
- **02:** 不 ready。它被 01 擋住,而且與 spec 矛盾。

## 接下來要做的事
這個專案的規則是 `AGENTS.md`,它指定補寫規格與拆工單走 `docs/workflow/plan-intake.md`,而且要由使用者啟動。我還沒讀那份文件。

這次只做稽核,所以我現在停在這裡,不會修改任何檔案,也不會啟動 plan-intake。如果你決定啟動,我會:
1. 先請你決定 02 的處置(移出範圍或納入 spec)。
2. 再交給 plan-intake,補 spec、補 01 的驗收條件,並拆出 API、結果頁、效能與無障礙驗證的工單。
