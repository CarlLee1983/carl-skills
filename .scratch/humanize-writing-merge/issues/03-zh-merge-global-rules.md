# 03: 併入全域中文 A–F 規則（介面文案除外）

Status: ready-for-agent
State: closed
Blocked by: 02

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

重新讀全域副本的中文規則，把來源目錄完全沒有的條目新增為連續編號的新節，部分重疊的條目把多出的判準、詞表與例外補進既有對應節；不保留 A–F 分組。全域「禁的是修辭動作，不是字面」的方法論併入檔案開頭說明，自檢清單合成一份。介面文案（E 組）留給 05。

## 驗收

- [x] 全域副本中文規則逐條有去處：新增、併入或屬於 05，對照記在驗證紀錄
- [x] 不出現平行的重複規則或 A–F 分組
- [x] 代表性新規則的驗收案例重放通過，敘事模式與既有論證層案例未退步

## Comments

2026-10-22：全域副本中文規則逐條去處見 `.scratch/humanize-writing/validation/merge-03-zh-mapping.md`：部分重疊者補進 §1、§2、§3、§4、§5、§7、§8，新規則為 §17 到 §32，E 組屬 05，檢查腳本段屬 06，冒號、破折號、排比、疊加保留已由 02 裁決。開頭併入「禁的是修辭動作」的方法論，自檢清單合為一份。重放見 `.scratch/humanize-writing/validation/acceptance-03-drafts.md` 與 `.scratch/humanize-writing/validation/acceptance-03.md`：H12 通過（全為空殼，改稿者不交成稿並請作者補內容），H02、H03、H04、H05、H09、H13 未退步。code-review 後修正：§31 改成只管潤稿者自己加的口頭禪、作者原有口頭語保留；規則行文中自犯的假洞見、提示性冒號與對比殼改寫；結構殼名單加入第 9 到 14 條並記入對照紀錄。修正在重放之後，未重跑，交由 08 確認。
