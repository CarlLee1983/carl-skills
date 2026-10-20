# Project release policy template

Use when creating or completing project policy. Copy the template to the project root as `RELEASE-POLICY.md`; link to relevant sections of existing authoritative documents instead of duplicating them. Blank fields require confirmation, not default assumptions. Record differences per release unit.

```markdown
# 發布政策

## 發布單位與交付內容
- 名稱、路徑、交付型態與產物：
- 文件是否隨產物交付：
- 發布目的地與通道：

## 版本策略
- SemVer／日期版本／沒有對外版本：
- 版本權威來源與更新方式：
- 基準 release 的識別方式與初始版本規則：
- 0.x、預發布與其他例外：

## 公開契約
- 承諾相容的 API、CLI 參數、設定與資料格式：
- 相容性判準、棄用與遷移規則：

## 發布節奏
- 逐次／累積／固定週期，以及觸發條件：
- 緊急修正或其他例外：

## Monorepo（適用時）
- 統一版本或獨立版本，以及發布群組：
- 相依套件的版本與發布連動規則：

## 發布流程與必要檢查
- 既有發布文件、workflow、版本工具與 changelog 規則：
- 必要檢查、適用提交及可接受的驗證結果來源：
- 升版、建立 tag、發布各自的既有步驟：
- 失敗恢復或撤回流程：
```

After filling it in, confirm that each unit's baseline maps to a delivered commit, required checks map to the candidate and environment, and existing bump, tag, and publication procedures are identifiable. Keep incomplete fields as evidence gaps; ask the user to resolve source conflicts that could change conclusions.

Policy records project rules only; use [release](release.md) for assessment and authorization. Completing policy or receiving a `可發布` recommendation does not authorize operations.
