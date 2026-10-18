# 收納 humanize-writing 與 calibrate-codex

Status: ready-for-agent
State: closed
Owner: Primary
Blocked by: none

## Scope

依使用者確認收納兩個既有自製技能。`humanize-writing` 移除固定模型路由；`calibrate-codex` 保留 Codex 定位，僅修正可攜性與能力驗證假設。更新 README、授權及驗證證據。

來源為本機 `~/.codex/skills/humanize-writing/` 與 `~/.codex/skills/calibrate-codex/`。保留安裝副本；本 repo 成為這兩個技能後續的維護來源。本次不包含提交、推送、安裝至使用者目錄或修改全域設定。

## Acceptance

- 每個技能可從單獨目錄安裝；必要參考文件、UI metadata 與 MIT License 齊全。
- humanize-writing 不要求特定模型或模型切換，保留事實、數字、模型名稱、立場與不確定性；繁中、英文、混合語言及已自然原文均有行為證據。
- calibrate-codex 的作用範圍明確，依 active Codex home 定位全域檔案；驗證工具不可用時保留缺口，區分已寫入、已驗證與已啟用。
- README 列出用途、平台限制、個別安裝及使用範例，指定唯一維護來源。
- Metadata、格式、資源連結、隔離安裝及獨立行為／差異審查通過；未改動現有安裝。

## Verification

執行 skill-creator metadata validator、檔案／連結檢查與 Skills CLI 本機來源隔離安裝。獨立 evaluator 僅讀技能與 [模擬輸入](../validation/inputs.md)，回報實際結果；驗收對照見 [驗證紀錄](../validation/SUMMARY.md)。calibrate 情境只產出方案，不寫入真實設定。

## Comments

開始時檢查點：`fb5dbb4`，工作分支 `feat/writing-calibration-skills`。來源安裝副本於驗證前記錄 SHA-256，完成後再次比對。

Resolved: 兩個技能、授權與 README 已整合。三個技能 metadata、資源／格式檢查、兩個新增技能的隔離安裝、九個獨立行為案例及獨立審查通過。來源安裝未變；完整證據與限制見 [驗證紀錄](../validation/SUMMARY.md)。工作目錄尚未提交或推送。
