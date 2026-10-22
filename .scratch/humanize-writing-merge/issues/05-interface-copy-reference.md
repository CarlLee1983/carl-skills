# 05: 介面文案參考檔

Status: ready-for-agent
State: closed
Blocked by: 01

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

把全域副本 E 組（標題當招牌、按鈕講動作、好處要能被查證、HTML 內嵌文案）拆成中英共用的介面文案參考檔；SKILL.md 加上「潤飾介面文案時讀這份」的指標；文章小標「要講內容」與介面標題「可當招牌」各自標明適用範圍。

## 驗收

- [x] 介面文案參考檔存在，涵蓋 E 組全部判準
- [x] SKILL.md 有指向它的指標，指明觸發情境
- [x] 驗收案例：介面稿套用介面規則、文章稿不套用，兩者重放通過

## Comments

2026-10-22：新增 `references/interface-copy.md`（中英共用：介面標題可當招牌、按鈕講動作、好處要能查證、嵌入文案只改可見文字），SKILL.md 在語言判斷步驟與檔尾清單加上觸發指標；`zh-tw.md` §12、`en.md` §13 標明文章小標要講內容，口號式小標也改，作者口吻不是保留理由。重放見 `.scratch/humanize-writing/validation/acceptance-05-drafts.md` 與 `.scratch/humanize-writing/validation/acceptance-05.md`：H08、H08b 通過，H04、H09 未退步。code-review 後補上 E1 的「完整指南」式標題、§4 直接寫出嵌入文案規則、指向語言檔標題規則時寫明兩檔節號；修正在重放之後，未重跑，交由 08 確認。
