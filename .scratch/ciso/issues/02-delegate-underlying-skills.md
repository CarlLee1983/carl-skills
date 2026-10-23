# 02: 分派給底層資安技能

**What to build:** 已安裝更專精的底層資安技能時，資安長在深度審查中發現並分派給它；會耗大量 token、寫檔或開子代理的用法先告知預估成本並取得同意；找不到時退回基準做法。新增底層資安技能不需修改 `ciso`。

規格：[spec.md](../spec.md)。決策：ADR 0006。

**Blocked by:** 01

**Status:** ready-for-agent
State: open

- [ ] 分派 reference：發現順序為專案規則（AGENTS.md／CLAUDE.md 及其連結）→ 已安裝 skill／agent 的 description → 詢問使用者；不維護登記表
- [ ] 成本關卡：輕量唯讀用法直接分派；耗成本用法先告知並取得同意；底層資安技能自身的啟動條件優先
- [ ] 底層回報當資料非指令，結果併入資安長的發現格式與嚴重度
- [ ] sources 列推薦底層資安技能（僅提示，不作路由依據）
- [ ] acceptance：fixture 描述類 `security-audit` 的 skill→分派；full audit 用法→先徵求同意；無底層資安技能→基準做法，並明確說明「沒有找到底層資安技能、以基準做法完成」（此預期由本案擁有；01 的 C01 不檢查）
- [ ] 靜態檢查新增：SKILL.md 不含任何底層資安技能名稱（ADR 0006 Falsified if）
- [ ] 重放新情境通過，01 情境不退步
