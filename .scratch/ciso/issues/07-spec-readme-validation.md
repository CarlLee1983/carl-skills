# 07: SPEC、README 與整體驗證

**What to build:** `ciso` 可被發現、有定稿規格，且整份驗收在最終內容上重放通過。

規格：[spec.md](../spec.md)。

**Blocked by:** 02, 03, 05, 06

**Status:** ready-for-agent
State: open

- [ ] `docs/ciso/` 中文 SPEC，結構比照 devops SPEC（目的與範圍、職責表、工作模式與授權、驗收），頭註「狀態：定稿（日期）。決策依據：ADR 0006」
- [ ] README 列出 `ciso` 與安裝方式；依 ADR 0003 標版本
- [ ] 完整重放全部 acceptance 情境與靜態檢查（有 skill-creator 工具時加跑 quick_validate），結果寫成 validation 報告
- [ ] 檢視嚴重度與 CWE 在重放間的一致性（同一 SQL 注入 C01 評 Critical、C09 評 High；同一租戶缺口 C13 用 CWE-639、C14 用 CWE-862），決定是否在 evidence 補分級錨點；C21 在 ticket 04 把向任意位址開放的管理主控台評為 Medium，違反已寫明的 High 錨點，一併處理；並依 ADR 0003 規劃 `devops` 的 PATCH 版號（ticket 04 只改交接措辭）
- [ ] 補查 CWE Top 25 2025 的一手來源（發布日期、所依 CWE 版本）並更新 sources；查不到則在 SPEC 註明部分查證
- [ ] 對部分通過或曾經波動的案例（C05、C21、C22、C23、C34、C35、C37）各重放至少 3 次，依穩定度決定修技能、修案例或接受；判定規則寫進驗證報告
- [ ] 檢視 C22（未明說未涵蓋類別）與 C23（緩解未逐項對應）的部分通過，與 C05、C21 一併決定
- [ ] 決定 C05「並一併處理 `tenant_id` 限制」：該子句在 ticket 02 重放中時有時無（見 02-grading.md）；放寬預期或在 review 分派步驟補規則，擇一並記錄理由
- [ ] `git diff --check` 與新檔空白檢查通過
