## 一些想法

這一節比較三種分頁做法：offset、cursor 和 keyset。offset 在第 1,000 頁之後每次查詢都要掃過前面所有資料列；cursor 與 keyset 只看上一頁最後一筆的位置。
