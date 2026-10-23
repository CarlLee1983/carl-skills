# 07: SPEC、README 與整體驗證

**What to build:** `ciso` 可被發現、有定稿規格，且整份驗收在最終內容上重放通過。

規格：[spec.md](../spec.md)。

**Blocked by:** 02, 03, 05, 06

**Status:** ready-for-agent
State: open

- [ ] `docs/ciso/` 中文 SPEC，結構比照 devops SPEC（目的與範圍、職責表、工作模式與授權、驗收），頭註「狀態：定稿（日期）。決策依據：ADR 0006」
- [ ] README 列出 `ciso` 與安裝方式；依 ADR 0003 標版本
- [ ] 完整重放全部 acceptance 情境與靜態檢查（有 skill-creator 工具時加跑 quick_validate），結果寫成 validation 報告
- [ ] `git diff --check` 與新檔空白檢查通過
