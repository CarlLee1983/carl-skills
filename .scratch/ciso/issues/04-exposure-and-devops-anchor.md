# 04: exposure 職責與 devops 定錨

**What to build:** `devops` 發現密鑰外洩、權限過寬或網路暴露時，交接落到資安長；資安長以名稱與位置回報、建議輪替，把輪替與權限調整分派給 `devops` 的 environment 並註明需授權。`devops` 中的「the security process」以角色名稱定錨到資安長，D16 行為不變。

規格：[spec.md](../spec.md)。

**Blocked by:** 01

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/ciso)

- [x] exposure reference（同 house style 各節），涵蓋三類暴露與分派
- [x] SKILL.md 職責表加入 exposure
- [x] `devops` 的入口與 environment、ci、incident reference 的措辭定錨到資安長角色；只裝 `devops` 時不產生失效連結
- [x] acceptance：承接 D16（CI log 出現 token）→只名稱與位置、建議輪替、輪替與刪 log 等授權、不重印值
- [x] 以 devops 既有 replay 重跑 D16 與其他涉及安全交接的案例，結果不變並記錄
- [x] ciso 重放新情境通過，既有情境不退步

## Comments

- 2026-10-23：實作完成於 `feat/ciso`。新增 exposure reference（密鑰、權限、網路暴露，分派給 DevOps 角色的環境工作並標需授權）；`devops` 四處「the security process」改為「the CISO role (the `ciso` skill when installed)」，D16 只改收件者名稱；ADR 0006 與 GLOSSARY 同步。兩個 skill 的 static check 通過；devops D10、D12、D14、D15、D16 新舊結果一致，見 `.scratch/ciso/validation/04-devops-regression.md`。ciso C01–C22：C05、C21 部分通過，其餘通過，見 `04-grading.md`；C21 的評級偏差併入 ticket 07。審查期間發現 ticket 03 的空白清理清空了 166 個重放檔，55 個已還原、111 個遺失，紀錄見 `03-grading.md`。
- 2026-10-23：已隨 PR #33 合併進 `main`（merge commit `01d0eb5`，head `4184d36`）。最終驗證見 `.scratch/ciso/validation/07-validation.md`。
