# 夾具：安和家醫科診所櫃台後台（功能起手）

既有 Laravel 後台（Blade + Bootstrap 5 預設樣式，無品牌或設計系統，色彩、字級都是框架預設與零星手寫 CSS）。現有頁面只有「病患資料」，見 `patients.html`（已截圖時視同自己用瀏覽器擷取）。

新完成的掛號 API（全部能力）：

- `GET /appointments?date=&doctor=`：當日掛號清單（號碼、病患、醫師、時段、狀態：已預約／已報到／看診中／完成／未到／已取消、初診或複診）
- `POST /appointments/{id}/check-in`：報到
- `POST /appointments/{id}/reschedule`：改期（新時段）
- `POST /appointments/{id}/no-show`：標記未到
- `POST /appointments/{id}/cancel`：取消掛號
- `GET /slots?date=&doctor=`：可用時段

診所 3 位醫師，早診 9–12、午診 14–17、晚診 18–21。不存在：叫號看板、健保卡讀卡整合、簡訊通知、病歷。
