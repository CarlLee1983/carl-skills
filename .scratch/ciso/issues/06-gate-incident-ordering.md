# 06: gate、incident 與多職責排序

**What to build:** 發布前資安長給出放行、有條件放行或阻擋的判斷與依據，有利判斷不觸發任何執行；安全事件時資安長負責判斷與指揮，圍堵與輪替交 `devops`；同一請求涉及多項職責時 incident 優先。治理合規與滲透測試請求被說明不在範圍。

規格：[spec.md](../spec.md)。

**Blocked by:** 03, 04

**Status:** ready-for-agent
State: open

- [ ] gate reference：判斷依完成狀態（未驗證的 Critical／High 如何影響判斷）並附依據；不觸發發布
- [ ] incident reference：判斷、指揮、分派圍堵給 `devops`；範圍擴大只就差額要授權
- [ ] SKILL.md 職責表補齊六項與多職責排序規則
- [ ] acceptance：gate 三種判斷至少涵蓋阻擋與放行；incident 分派圍堵；多職責時 incident 先處理；治理合規與滲透測試→不在範圍
- [ ] 重放新情境通過，既有情境不退步
