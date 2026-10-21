# 06 既有條文缺口

Status: needs-triage
State: open

來源：[改善模式驗證](../validation/improve.md) 的評估代理回報；與改善模式無關，依工單 05 的拷問決定另開。

## 缺口

1. **SESSION 何時建立**：「record it in SESSION once records are kept」「Before first persistence」與「For discussion only, propose in conversation first」沒有說明第一份紀錄何時開始、是否需要另行授權。
2. **功能起手的提問格式**：主題起手與改善模式有輪次格式，功能起手只寫「a few design-changing questions」，代理會不一致地借用輪次格式。
3. **「cover」的定義**：「Judge each interface separately when the project adds one that its existing interface and visual source do not cover」可被讀成同一 app 的每個新畫面都要重新判定。
4. **隔離原型的載體**：有既有前端技術棧（例如 Vue + Element Plus）但不可碰正式路由時，原型該用什麼形式，只寫了無前端宿主時的單一 HTML。

## 驗收條件

每項定案後補對應的行為情境並重跑；不影響的既有情境沿用先前結果。
