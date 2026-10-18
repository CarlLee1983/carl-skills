# 技能收納驗證

日期：2026-10-18。基準：`fb5dbb4`；工作分支：`feat/writing-calibration-skills`。對應 [工作票](../issues/01-import-skills.md)。

## 來源與差異

| 技能 | 來源 | 實際變更 |
| --- | --- | --- |
| humanize-writing | `~/.codex/skills/humanize-writing/` | 移除 25 行固定模型路由與診斷 JSON。兩份語言參考及 UI metadata 與來源完全相同。 |
| calibrate-codex | `~/.codex/skills/calibrate-codex/` | 明確 Codex 範圍；依 active Codex home 定位；驗證依工具能力執行並保留未完成項；將團隊品質檢查與不可繞過的執行約束分開。UI metadata 與來源相同。 |

兩者均新增與 repo 根目錄相同的 MIT License。README 增加平台、個別安裝、使用範例與唯一維護來源。本次沒有新增執行腳本或套件相依。

來源 SKILL.md SHA-256：

- humanize-writing：`d3d6e0a87bf8f45e5ebcb314592fa21389aaec3164ee4b8a4d3365c193d27d3d`
- calibrate-codex：`62bd3df5ee7fcde79803a17964e5f128b1603dc517148ce147b531f8498051e8`

完成時比對兩個安裝來源目錄的全部檔案 SHA-256，均未改動。

## 靜態與安裝檢查

- 三個 skills 都通過 skill-creator `quick_validate.py`，輸出 `Skill is valid!`。
- 新技能的相對資源均在自身目錄內，兩份 LICENSE 相符；UI prompt 的技能名稱一致。
- README 本機連結、shell 區塊 `sh -n`、tracked diff 與新增檔案 whitespace 檢查通過。
- Skills CLI `1.7.2` 在暫存 Git 專案使用單一技能目錄作為 local source，分別安裝 humanize-writing 至 Codex／Claude Code、calibrate-codex 至 Codex。未提供整個集合做為來源，驗證各目錄可獨立安裝。
- 安裝後所有檔案與來源逐位元組相同，`skills-lock.json` 存在，`skills list` 能列出指定技能。測試設定 `DISABLE_TELEMETRY=1`，未執行全域安裝。
- 本機 `codex-cli 0.163.0` 的 `codex execpolicy check --help` 可用；未更動或執行使用者的 rules/hooks。

## 行為證據

獨立 evaluator 僅讀技能與 [原始輸入](inputs.md)，[完整實際輸出](results.md)另存。主代理按工作票的驗收條件比對：

| 案例 | 結果 |
| --- | --- |
| H1 繁中 | 移除空泛開場，保留 gpt-5.5、20 次、3.2／2.7 秒、cache 推測、網路波動與 staging 限制。 |
| H2 英文 | 保留 Model-X 2.1、12 次、median／p99 數字、推測與未驗證條件，以及 production retries 狀態。 |
| H3 混合語言 | 保留識別字、客戶要求原樣引用的對比句、15% rollout 與不確定性，未強行翻譯術語。 |
| H4 自然文字 | 原文完全保留，未製造額外修改。 |
| C1 本輪偏好 | 不持久化、不新增設定。 |
| C2 Repo 問題 | 修訂既有根 AGENTS.md 條目，保留 pnpm 規則，不寫全域 ledger；標明 fresh-session 未驗證。 |
| C3 自訂 home | 所有假設全域路徑都在 `/fixture/codex-home`，ledger 同步定位；未宣稱規則已啟用。 |
| C4 能力不足 | 區分基本靜態檢查、缺少 validator 與行為驗證；不建立不受支援的 hook，不安裝或啟用功能。 |
| C5 非 Codex 工作 | 不套用調校流程，指出一般文件更新所缺的目標路徑。 |

九個案例均符合觀察範圍內的驗收條件。這是模型行為抽樣，不是對所有模型及輸入的確定性保證。

## 獨立審查與官方依據

Architect 比較原樣複製、最小可攜性修正與跨平台重寫，建議第二種；實作採用此範圍。Reviewer 對兩個技能與 README 的固定檢查點完成唯讀審查，無重大問題。審查後 README 開頭另以一句話明確「適用工具依下表列示」，避免把 Codex 專用技能泛稱為跨平台。

Codex 路徑與能力依據：[設定與狀態位置](https://learn.chatgpt.com/docs/config-file/config-advanced)、[設定層級與信任](https://learn.chatgpt.com/docs/config-file/config-basic)、[hooks 與信任流程](https://learn.chatgpt.com/docs/hooks)。技能仍要求實際使用時核對當前版本能力。

## 限制

未修改真實 Codex 設定、建立或信任 hook、執行全域安裝、重啟使用者 session、提交或推送。本機安裝副本仍是原版，需另行更新才會使用本次整理。calibrate 案例只測試方案與判斷，沒有宣稱任何設定已生效。既有 release-assessment 行為未變，沿用其歷史驗收。
