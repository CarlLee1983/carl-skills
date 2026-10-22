# 04: 併入全域英文 §10–17

Status: ready-for-agent
State: closed
Blocked by: 01

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

把全域副本英文 §10–17（意義膨脹、模糊歸因、宣傳腔、繫詞迴避、挑戰與展望段、聊天殘留、疊加保留／假範圍／同義詞輪替、格式化）接在來源目錄英文 §15 之後續編，與中文對應概念互相對齊；與既有英文規則重疊的部分併入既有節。

## 驗收

- [x] 八條全域英文規則逐條有去處，對照記在驗證紀錄
- [x] 英文新規則的驗收案例重放通過
- [x] 既有英文案例未退步

## Comments

2026-10-22：全域副本英文 §10–17 逐條去處見 `.scratch/humanize-writing/validation/merge-04-en-mapping.md`：新增 §16 到 §25（§16 的疊加保留、假範圍、同義詞輪替拆成 §22、§23、§24），§9 的 "a testament to" 改指 §16。重放見 `.scratch/humanize-writing/validation/acceptance-04-drafts.md` 與 `.scratch/humanize-writing/validation/acceptance-04.md`：H11 通過。限制：既有英文規則 §1–15 沒有獨立 fixture，「未退步」只以 h11 成稿沒出現既有禁用模式為據，屬部分驗證；補英文既有規則案例留給 08 決定。code-review 時修正 §22 的 ✅ 範例（原本留了三層保留詞）。
