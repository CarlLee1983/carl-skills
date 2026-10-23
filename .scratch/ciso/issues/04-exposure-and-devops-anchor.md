# 04: exposure 職責與 devops 定錨

**What to build:** `devops` 發現密鑰外洩、權限過寬或網路暴露時，交接落到資安長；資安長以名稱與位置回報、建議輪替，把輪替與權限調整分派給 `devops` 的 environment 並註明需授權。`devops` 中的「the security process」以角色名稱定錨到資安長，D16 行為不變。

規格：[spec.md](../spec.md)。

**Blocked by:** 01

**Status:** ready-for-agent
State: open

- [ ] exposure reference（同 house style 各節），涵蓋三類暴露與分派
- [ ] SKILL.md 職責表加入 exposure
- [ ] `devops` 的入口與 environment、ci、incident reference 的措辭定錨到資安長角色；只裝 `devops` 時不產生失效連結
- [ ] acceptance：承接 D16（CI log 出現 token）→只名稱與位置、建議輪替、輪替與刪 log 等授權、不重印值
- [ ] 以 devops 既有 replay 重跑 D16 與其他涉及安全交接的案例，結果不變並記錄
- [ ] ciso 重放新情境通過，既有情境不退步
