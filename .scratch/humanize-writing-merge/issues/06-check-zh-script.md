# 06: `check_zh.py` 併入

Status: ready-for-agent
State: closed
Blocked by: 03

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

把全域副本的 `check_zh.py` 併入技能目錄的 scripts。對岸用語改為執行時讀中文規則檔的台灣用語表，不再內建詞表；冒號、破折號、「不只…更」的偵測依 02 的裁決調整；其餘偵測項對齊 03 併入後的規則。命令列介面維持：一或多個路徑、每檔一段、每筆命中含行號、規則與上下文、最後分類統計；退出碼 0／1／2。只用標準函式庫，以 `python3` 執行。

## 驗收

- [x] 用固定測試稿驗證：命中行號與規則名稱正確
- [x] frontmatter、程式碼區塊、行內程式碼、URL 被略過；HTML 剝除後行號對齊
- [x] 退出碼 0、1、2 各有案例
- [x] 在用語表新增一列後，腳本不改程式即可抓到該詞
- [x] 放行的冒號不被報出；規則檔引用的反例會被報出
- [x] 驗證結果記到驗證資料夾

## Comments

2026-10-22：新增 `skills/humanize-writing/scripts/check_zh.py`，由全域副本移植。對岸用語改在執行時讀 `references/zh-tw.md` 的台灣用語表（左欄可用「、」分多詞，括號註解略過），規則名稱改用 zh-tw.md 的章節標題；冒號只報鋪梗後揭曉的用法（標籤、時間、條列引言含行內「、」列舉、引語放行），破折號與冒號不看引號內原話，「不只…更」只報「不只是…更是」的翻案句式；同一規則重疊的命中只報一次。命令列介面與退出碼照舊，非 UTF-8 等讀檔錯誤也回 2。黑箱測試 `.scratch/humanize-writing/validation/test_check_zh.py`（23 項）全過，S01–S08 實跑輸出見 `.scratch/humanize-writing/validation/check-zh-06-run.txt`。code-review 後修了非 UTF-8 traceback、HTML 未收尾標籤與跨行屬性、沒有結尾的 frontmatter、SVG 文字未受檢，補回全域腳本原有的 11 個詞，並補強短的提示性冒號（「結果呢：」「真相只有一個：」）。已知限制：句中說明用的冒號、`閉環`、「不只是…更是」的正常遞進與用語表常見詞會有誤報，這是審閱輔助的定位，逐筆判斷。
