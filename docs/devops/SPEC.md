# devops 規格

狀態：定稿（2026-10-20）。決策依據：[ADR 0002](../adr/0002-devops-single-entry-replaces-release-assessment.md)。

## 目的與範圍

`devops` 是軟體交付與維運的單一入口。使用者以自然語言提出需求，技能辨識工作意圖，確認專案、服務、環境、版本與目標，取得證據，再選擇能力流程與實際可用的平台技能。技能只交付 `skills/devops/` 內的 Markdown，不新增 CLI、常駐服務、排程器、資料庫或自有進度帳本。

## 能力

| 能力 | 範圍 | 文件 |
| --- | --- | --- |
| environment | 環境、設定、網路、權限、憑證注入與外部依賴的盤點、建立與調整 | `references/environment.md` |
| ci | 建置／測試流程的建立、審查與修復，快取、必要檢查、權限與可追溯產物 | `references/ci.md` |
| release | 發布評估、版本準備、changelog、tag、套件／CLI 發布、遠端核驗與中斷恢復（原 release-assessment） | `references/release.md` 及 `release-*.md` |
| deploy | 部署前檢查、部署、流量切換、服務驗證與回復 | `references/deploy.md` |
| observe | 日誌、指標、追蹤、健康檢查、服務目標、告警與處置手冊 | `references/observe.md` |
| incident | 影響確認、時間線、近期變更、假設驗證、恢復服務、根因與後續修復 | `references/incident.md` |
| recovery | 備份審查、還原演練、資料與環境復原，恢復點、耗時與結果驗證 | `references/recovery.md` |
| optimize | 容量、效能、配額與成本分析，有數據依據的改善 | `references/optimize.md` |

能力名稱是內部分流概念，不依賴 `devops:<名稱>` 指令語法。每份能力文件定義觸發情境、必要輸入、工作步驟、產出、完成證據、受阻處理與交接；共同規則（工作模式、授權、固定回報、整合）由 `SKILL.md` 擁有，證據標記與完成語義由 `references/evidence.md` 擁有。本規格不重述這些規則，以技能文件為單一來源。

## 工作模式與授權

區分檢查／評估、規劃／準備、執行／修復。評估報告本身可作為完成交付；有利結論不觸發執行；已明確授權的完整工作持續推進，不每步重問；目標或實質效果超出原授權時只釐清變動部分。

## 驗收

先以 [release 驗收](../../skills/devops/references/release-acceptance.md)（16 案 22 子案）驗證遷移行為不變，再以 [devops 驗收](../../skills/devops/references/acceptance.md)（D01–D16）驗證新增能力與跨流程情境。驗收以離線模擬進行，不發布真實套件、不修改正式環境；驗收紀錄區分靜態封裝檢查、模擬情境與實際行為驗證。
