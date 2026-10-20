# Notes 匯出功能

目標：讓 inkwell 筆記可匯出為 Markdown 檔。工單位於 `issues/`，依賴以 `Blocked by` 標示。

## 備註

- 匯出 JSON 結構已由 PR #11 的 schema 測試驗證通過。
- 02 預估單篇轉換小於 50ms（推論：依 beta 使用者平均 3KB 筆記估算，尚未量測）。
- 04 假設 mdlite 函式庫支援 GFM 表格語法（尚未驗證，函式庫文件沒有提到）。
