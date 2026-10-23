# 夾具：毛毛日和寵物美容（功能起手）

既有 Next.js 官網，已上線一年：首頁、服務與價格、交通資訊三頁。品牌有正式的設計 token（`styles/tokens.css`）與品牌指南：

```css
:root {
  --color-surface: #ffffff;
  --color-surface-alt: #eef7f5;
  --color-text: #1f2d2b;
  --color-primary: #1f8a7a;   /* 品牌青綠，主要按鈕 */
  --color-accent: #f2b544;    /* 暖黃，小面積點綴 */
  --font-sans: "Noto Sans TC", system-ui, sans-serif;
  --radius-card: 16px;
  --radius-button: 999px;
  --space: 8px;
}
```

品牌指南：logo 為青綠色圓角字標「毛毛日和」，主色與 logo 不可更改；整體明亮、乾淨、親切。

新功能：後端剛完成預約 API，目前網站沒有任何預約畫面。

- `GET /services`：服務項目（名稱、時長、價格）
- `GET /slots?date=`：某日可預約時段
- `POST /bookings`：建立預約（飼主姓名、電話、毛孩名字、體型、服務、時段），回傳預約編號
- `POST /bookings/{id}/cancel`：以簡訊連結取消

不存在：會員、登入、點數、付款、評價、美容師定位、任何 AI 分析。
