## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.claude/skills/pm/references/plan.md"}
- Glob {"pattern": ".scratch/cart/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.scratch/cart/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.scratch/cart/issues/01-model.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.scratch/cart/issues/02-coupon.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.scratch/cart/issues/03-tax.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.MBWJKy274y/.scratch/cart/issues/04-checkout.md"}

## 最終回覆

**結論:DAG 允許 02 和 03 平行,但依現有紀錄,我不建議同時開兩條線。** 查詢來源是 `.scratch/cart/` 的 spec 和 4 張工單,查詢時間是 2026-10-20。

**DAG(依各工單的 `Blocked by`)**
- 01 已 closed,沒有相依。
- 02 和 03 都只被 01 擋住,彼此沒有相依。01 已完成,所以兩張現在都能開工。
- 04 被 02 和 03 擋住,要兩張都完成才能開始。

**平行的限制(依 plan 的平行度檢查)**
1. **人力:** `spec.md` 寫「團隊目前只有 Ben 一位工程師」。兩條線都得由同一人做,所以是輪流做,不是真的同時進行。
2. **程式碼重疊:** 02 改 `src/cart/pricing.ts` 的折扣計算,03 改同一檔案的稅額計算。兩邊改的是同一個檔案,雙線並行很可能產生合併衝突。另外,折扣和稅額通常有計算順序關係(例如稅是算在折扣前還是折扣後)。工單沒寫這件事,我無法判斷,只能標為未紀錄。

**建議**
- 照順序做 02 再 03,或 03 再 02,都可以,因為兩者在 DAG 上沒有先後。
- 如果你仍想開兩條線,可以用兩個分支加兩個 worktree。但同一檔案的衝突要先處理,而且人力上仍然只有 Ben 一個人。
- 兩張都完成之前,04 不能開始。

**缺漏(依 plan 的規則,我只指出,不補寫)**
- 所有工單都沒有里程碑、工期、負責人或估算,所以我不算完成日期,也不稱最長相依鏈為關鍵路徑。
- 折扣與稅額的計算順序、以及兩張工單在 `pricing.ts` 內是否真的碰到同一段程式,都沒有紀錄。要補這些,得走專案的規劃入口 `docs/workflow/plan-intake.md`,這個入口由你啟動。

**接下來的入口(來源:專案規則 `AGENTS.md`)**
實作單張工單走 `docs/workflow/build-ticket.md`。如果你要開工,我建議先選 02 或 03 其中一張,你選定後再交接。這次是唯讀評估,所以我什麼都不會執行,也沒有修改任何檔案。
