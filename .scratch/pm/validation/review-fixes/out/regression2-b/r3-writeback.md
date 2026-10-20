## 工具呼叫

- Skill {"skill": "pm"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.claude/skills/pm/references/risk.md"}
- Glob {"pattern": ".scratch/notes/**", "path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/spec.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/01-export-schema.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/02-markdown-writer.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/03-export-cli.md"}
- Read {"file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/04-table-support.md"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/04-table-support.md", "old_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n", "new_string": "- [ ] 含表格的筆記匯出後表格結構完整。\n\n## Comments\n\n2026-10-20 PM 風險備註（來源：spec.md 備註、本工單範圍）\n- 風險：mdlite 是否支援 GFM 表格未驗證（assumed；spec 與本工單皆標明未驗證，函式庫文件未提及）。若不支援，本工單的轉換方式無法成立。影響範圍：04 本身。\n- 預防：開工前先以 `docs/workflow/research-ticket.md` 開研究工單驗證 mdlite 的表格支援（假設：支援 GFM 表格；方法：以含表格的樣本實際轉換；通過標準：輸出表格結構完整）。驗證結果出來前，不宜把 04 當作可確定的工作。\n- 應變：若不支援，備選為改用其他函式庫、自行實作表格輸出，或縮小範圍；屬範圍變更，須由使用者決定並走 `docs/workflow/plan-spec.md`，不由本備註改動。\n"}
- Edit {"replace_all": false, "file_path": "/private/var/folders/mp/2hbmdcp15qjfn3fhgctttgl40000gn/T/tmp.Vzbm05NpKS/.scratch/notes/issues/02-markdown-writer.md", "old_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n", "new_string": "- [ ] 單元測試涵蓋標題、清單、程式碼區塊。\n\n## Comments\n\n2026-10-20 PM 風險備註（來源：spec.md 備註、本工單驗收）\n- 風險：單篇轉換小於 50ms 只是推論（inferred；依 beta 使用者平均 3KB 筆記估算，未量測），且本工單驗收條件沒有涵蓋效能。影響範圍：02，以及下游 03、04。\n- 預防：實作時對代表性筆記（含 3KB 平均值與較大筆記）量測轉換時間，結果記錄在本工單留言。是否納入驗收由使用者決定（屬驗收變更，本備註不改動）。\n- 應變：若實測明顯超過 50ms，先回報並由使用者決定放寬目標或優化；在此之前，03 的 CLI 不要承諾批次匯出的耗時。\n"}

## 最終回覆

我已讀完 `.scratch/notes` 的 spec 和 4 張工單,依 pm skill 的 risk 流程找出兩項有依據的風險,並把預防與應變措施寫進對應工單的 `## Comments`。資料來自剛讀的檔案,日期 2026-10-20。

| 風險 | 影響範圍 | 依據 | 證據標籤 | 建議驗證 |
|---|---|---|---|---|
| mdlite 是否支援 GFM 表格未驗證 | 04 | `spec.md` 備註、`04-table-support.md` 範圍(兩處都寫「未驗證」,函式庫文件也沒提到) | assumed | 用含表格的樣本實際轉換,表格結構完整才算通過 |
| 單篇轉換小於 50ms 只是估算,02 的驗收沒有涵蓋效能 | 02,以及下游 03、04 | `spec.md` 備註(以 beta 使用者平均 3KB 筆記估算,未量測)、`02-markdown-writer.md` 驗收 | inferred | 對代表性筆記量測轉換時間 |

- **mdlite 風險:** 若 mdlite 不支援 GFM 表格,04 的做法就不成立。我在 04 寫了預防與應變措施,並在其中建議開工前先驗證。
- **效能風險:** 我在 02 寫了實作時量測並記錄的預防措施,以及超標時回報再決定的應變措施。這份留言也提醒 03 的 CLI 在量測前不要承諾批次匯出的耗時。

**驗證工作項目(我沒有建立工單):**
- 驗證 mdlite 需要跑程式實測,PM 不能執行,也不開工單。
- 專案規則 `AGENTS.md` 對「驗證性質的研究或原型」指定的入口是 `docs/workflow/research-ticket.md`。
- 建議由該流程處理,假設是「mdlite 支援 GFM 表格」。通過標準是樣本表格轉換後結構完整。通過後 04 可確定,失敗則要由你決定是換函式庫、自行實作還是縮小範圍,那屬於範圍變更,要走 `docs/workflow/plan-spec.md`。
- 這次只有讀取入口,我沒有開始執行。

**未涵蓋與限制:**
- 我沒有 Bash 或 `gh`,無法確認 PR #11 是否真的合併,也沒有重新讀取檔案確認寫入結果,只收到編輯成功的回報。
- 01 已 closed,`spec.md` 說明其 schema 測試已通過。我沒有查證,但它不是風險,所以沒列入表格。
- 我只改了 02 和 04 的 Comments。State、Blocked by、驗收條件和 spec 都沒動,也沒有 commit。
- 是否把效能目標加進 02 的驗收,由你決定。
