# 05: threat-model 與 supply-chain 職責

**What to build:** 使用者規劃新功能時，資安長以 STRIDE 做威脅建模，列出信任邊界、威脅與緩解建議；使用者問相依套件風險時，資安長檢查已知 CVE、版本 pin、SBOM、簽章與 provenance，以 SLSA 為參照回報。

規格：[spec.md](../spec.md)。

**Blocked by:** 01

**Status:** ready-for-agent
State: closed
Owner: claude-code (feat/ciso)

- [x] threat-model reference 與 supply-chain reference（同 house style 各節）
- [x] SKILL.md 職責表加入兩項，生命週期順序 threat-model → review → supply-chain
- [ ] sources：STRIDE、OWASP ASVS、CWE Top 25、SLSA 現行版本經一手來源查證並記錄
- [x] 規劃／準備模式的產出（威脅模型）預設只在回覆，使用者要求才寫入指定路徑
- [x] acceptance：每項至少一個路由與產出情境
- [x] 重放新情境通過，既有情境不退步

## Comments

- 2026-10-23：實作完成於 `feat/ciso`。新增 threat-model（STRIDE，威脅為假設、不給嚴重度）與 supply-chain（advisory 只依手上證據或環境實際提供的查詢；依賴升級交實作入口、管線釘選與 provenance 交 DevOps 角色），三個職責補上 delegation 步驟，門檻與「定義即證據」集中到 evidence.md。sources 新增 STRIDE、ASVS 5.0.0、SLSA v1.2（Source track 等級未查證）。sources 勾選項未勾：CWE Top 25 仍為部分查證（cwe.mitre.org 當日無法連線），移交 ticket 07。C01–C30：C05、C21、C22、C23 部分通過，其餘通過，見 `.scratch/ciso/validation/05-grading.md`；C23 為模型未依「每項威脅附緩解」規則輸出。
- 2026-10-23：已隨 PR #33 合併進 `main`（merge commit `01d0eb5`，head `4184d36`）。最終驗證見 `.scratch/ciso/validation/07-validation.md`。
