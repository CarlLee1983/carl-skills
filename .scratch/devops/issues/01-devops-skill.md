# 01 devops 主技能整併並取代 release-assessment

Status: ready-for-agent
State: closed
Blocked by: none
Owner: claude-code (feat/devops)

規格：[docs/devops/SPEC.md](../../../docs/devops/SPEC.md)；決策：[ADR 0002](../../../docs/adr/0002-devops-single-entry-replaces-release-assessment.md)；遷移對照：[migration.md](../../../docs/devops/migration.md)。

## 任務

新增 `skills/devops/` 作為軟體交付與維運的統一入口，完成 environment、ci、release、deploy、observe、incident、recovery、optimize 八組能力；完整遷移 release-assessment 的技能、操作、政策範本與 16 案驗收；驗收後更新 README、使用範例、技能清單與相關引用，移除 release-assessment 獨立入口。不新增 CLI、常駐服務、排程器、資料庫或進度帳本；驗收不發布真實套件、不修改正式環境。

## 驗收條件

1. `skills/devops/` 單獨複製後 `quick_validate.py` 通過，相對連結都在副本內解析，沒有個人絕對路徑。
2. 八組能力各自具備觸發、輸入、步驟、產出、完成、受阻、交接。
3. release-assessment 四個檔案逐段遷移，`git diff -M` 只含連結與新增段落。
4. release 驗收 16 案 22 子案的離線重播結果與預期相符。
5. 新增 D01–D16 的離線重播結果與預期相符。
6. README、AGENTS.md、tracker 規範改指 devops，舊技能目錄已移除。
7. 外部來源以實際 commit 讀取，`sources.md` 記錄 SHA 與授權。
8. `git diff --check` 通過；沒有真實發布或正式環境變更。

## Comments

### 2026-10-20 實作與驗證（claude-code）

在 `feat/devops` 工作樹完成，尚未 commit。驗證摘要見 [validation/SUMMARY.md](../validation/SUMMARY.md)：

1. 靜態封裝：獨立副本 `quick_validate.py` 通過，60 個相對連結解析成功，無個人路徑，八組能力七項齊全。
2. 遷移：`git diff -M` 只含連結與新增段落；對照見 `docs/devops/migration.md`。
3. release 22 子案：21 PASS，15A PARTIAL（無禁止效果，修訂提案措辭不完整）。
4. D01–D16：全部 PASS；D01、D05 最後一輪由主代理自評。
5. README、AGENTS.md、tracker 規範、GLOSSARY 改指 devops；`skills/release-assessment/` 已移除。
6. 外部來源依 commit 讀取，記錄於 `skills/devops/references/sources.md`。
7. `git diff --check` 通過；無真實發布或環境變更。

維持 `State: open`：等待使用者審閱、commit 授權，以及是否接受 15A 的 PARTIAL。

### 2026-10-20 合併

[PR #6](https://github.com/CarlLee1983/carl-skills/pull/6) 於 2026-10-20T04:43:33Z 合併至 `main`（merge commit `2664e1a`，head `a9bb6e9`）。驗證證據同上一則與 [validation/SUMMARY.md](../validation/SUMMARY.md)；release 15A 仍為 PARTIAL，以已知限制記錄。關閉本工單。
