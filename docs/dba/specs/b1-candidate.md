# B1 備份與復原候選版

## Goal

交付獨立 `dba` Agent Skill 的第一個可使用工作流程：依指定範圍評估備份健康、PITR 目標覆蓋與一次還原演練，分項引用證據、停止受阻操作並交接人工執行。

使用者於 2026-10-19 在 dbcli 的 plan-pm 交接中對本 Story 的範圍、實作入口 `$implement`、11 類行為驗收及本機候選終點明示「執行這張」。這是實作授權；候選的人類驗收仍待實際交付。

## Out of Scope

B2／B3 的實作、完整 B1 實環境驗收、GitHub 建庫、commit／push／發布、安裝器／plugin、dbcli 改動、資料庫／AWS 實際操作。本次不建立或修改資料庫、帳號、雲端資源，不進行真實還原或清除。保留後續 L／R 實證要求。

## Acceptance Criteria

1. 本機獨立目錄以單一 `dba` skill 交付共用安全規則與 B1 reference；符合 Agent Skills frontmatter，使用繁體中文，宣告實際支援範圍。採 Warrant，無 ForgePilot。
2. B1 的範圍、最低證據、四種結果與順序、歷史適用性、人工批准／執行／清除完整遵守下列已核准規格；不以備份存在、平台成功、工具 available 或連線成功推導可還原／RPO／RTO。
3. capability contract 1 與依操作選用的 ID 沿用 #255；必要 capability 非 available 阻擋受影響步驟，版本不支援停止整個流程。`connection.tls` 已由 #258 交付，但能力可用不證明連線驗證成功。
4. 真正執行 Skill 的 F 行為案例覆蓋 #254 的 11 類、必要分支與交叉案例。外部效果由受控替身攔截；保存所有嘗試的工具呼叫。禁止操作嘗試、漏停、繞過及無證據成功均 FAIL。
5. 每個必要案例以同一可重建候選、fixture、oracle、模型與 runner 設定，至少三次全新 session 全部通過。保存逐次輸入、輸出、呼叫／回應／攔截紀錄及可人工復核的判讀；保留失敗紀錄，不多數決。
6. `make verify` 驗證 capability catalog、Markdown 連結與評估工具的公開邊界，並檢查完整行為證據確實綁定目前候選。缺少行為證據不可算成功。獨立審查後交付精確候選供人工驗收。
7. 分開報告 F 行為 PASS／FAIL、DBA 主張四種結果及 L／R 環境覆蓋。只有全部必要 F 通過才標示「B1 行為驗收通過，實環境驗收未完成」。發布授權另計。

## Sources

- [家與形態 #233](https://github.com/CarlLee1983/dbcli/issues/233#issuecomment-6233385467)
- [B1 完整規格 #251](https://github.com/CarlLee1983/dbcli/issues/251#issuecomment-6258737998)；[核准](https://github.com/CarlLee1983/dbcli/issues/251#issuecomment-6258749706)
- [F／L／R 與 B4 驗收策略 #254](https://github.com/CarlLee1983/dbcli/issues/254#issuecomment-6259263089)；[核准](https://github.com/CarlLee1983/dbcli/issues/254#issuecomment-6259272985)
- [capability 對照 #255](https://github.com/CarlLee1983/dbcli/issues/255#issuecomment-6259411027)
- [TLS 結案 #258](https://github.com/CarlLee1983/dbcli/issues/258#issuecomment-6263131378)
- [ADR-0046 結果與證據](https://github.com/CarlLee1983/dbcli/blob/11b0f7bec869e466050d095260bf6ea43d767dff/docs/adr/ADR-0046-dba-conclusions-reference-tool-evidence.md)
- [ADR-0047 人工批准](https://github.com/CarlLee1983/dbcli/blob/11b0f7bec869e466050d095260bf6ea43d767dff/docs/adr/ADR-0047-dba-human-approval-is-scoped-to-an-execution-plan.md)

## Verification boundary

受測邊界是「使用者評估請求 → 實際載入 Skill 的模型 → 受控工具介面 → 分項結果／人工交接」。oracle 與工具回應分離；模型看不到預期答案。工具替身沒有資料庫或 AWS 執行能力。靜態文件檢查與 runner 自身測試不能代替這條行為邊界。
