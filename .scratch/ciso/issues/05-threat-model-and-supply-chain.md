# 05: threat-model 與 supply-chain 職責

**What to build:** 使用者規劃新功能時，資安長以 STRIDE 做威脅建模，列出信任邊界、威脅與緩解建議；使用者問相依套件風險時，資安長檢查已知 CVE、版本 pin、SBOM、簽章與 provenance，以 SLSA 為參照回報。

規格：[spec.md](../spec.md)。

**Blocked by:** 01

**Status:** ready-for-agent
State: open

- [ ] threat-model reference 與 supply-chain reference（同 house style 各節）
- [ ] SKILL.md 職責表加入兩項，生命週期順序 threat-model → review → supply-chain
- [ ] sources：STRIDE、OWASP ASVS、CWE Top 25、SLSA 現行版本經一手來源查證並記錄
- [ ] 規劃／準備模式的產出（威脅模型）預設只在回覆，使用者要求才寫入指定路徑
- [ ] acceptance：每項至少一個路由與產出情境
- [ ] 重放新情境通過，既有情境不退步
