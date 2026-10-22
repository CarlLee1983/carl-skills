# 06: `check_zh.py` 併入

Status: ready-for-agent
State: open
Blocked by: 03

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

把全域副本的 `check_zh.py` 併入技能目錄的 scripts。對岸用語改為執行時讀中文規則檔的台灣用語表，不再內建詞表；冒號、破折號、「不只…更」的偵測依 02 的裁決調整；其餘偵測項對齊 03 併入後的規則。命令列介面維持：一或多個路徑、每檔一段、每筆命中含行號、規則與上下文、最後分類統計；退出碼 0／1／2。只用標準函式庫，以 `python3` 執行。

## 驗收

- [ ] 用固定測試稿驗證：命中行號與規則名稱正確
- [ ] frontmatter、程式碼區塊、行內程式碼、URL 被略過；HTML 剝除後行號對齊
- [ ] 退出碼 0、1、2 各有案例
- [ ] 在用語表新增一列後，腳本不改程式即可抓到該詞
- [ ] 放行的冒號不被報出；規則檔引用的反例會被報出
- [ ] 驗證結果記到驗證資料夾
