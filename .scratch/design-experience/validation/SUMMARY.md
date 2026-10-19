# design-experience 移入驗證

日期：2026-10-19。範圍：將已完成試跑與回溯修正的本機技能納入 `carl-skills` 維護，更新手動安裝副本；未提交、推送或發布。

## 本次結果

- 從更新後的 `origin/main`（`3c36f24`）建立 `feat/design-experience-skill`；開始時工作樹乾淨。
- 原始來源為 `~/.agents/skills/design-experience/`。四個既有檔案原樣移入 `skills/design-experience/`，另補上與 repo 相同的 MIT LICENSE。
- README 加入清單、安裝／使用入口與 metadata 檢查；`docs/design-experience/acceptance.md` 保存維護驗收情境。
- 移入前重新執行 metadata 與相對引用檢查，均通過。
- 僅複製技能目錄到獨立暫存位置：5 個檔案齊全，`quick_validate.py` 通過；3 份 Markdown 的 3 處本機相對引用全部存在於技能內。
- 更新本機副本後，來源與安裝目錄的檔案集合及 SHA-256 全部一致。安裝仍採手動副本方式，沒有新增 symlink、CLI lock 或 hook。
- repo 共 33 份 Markdown、36 處相對引用通過；tracked diff 與 7 個新增檔案的 whitespace 檢查通過。第一次檢查 wrapper 誤將 `git diff --no-index` 的正常差異退出碼 1 當成失敗；修正 wrapper 判準後通過，並無檔案格式錯誤。
- 獨立 reviewer 確認四個原檔未變、來源／安裝五檔一致、引用與授權完整且無必要外部依賴。指出一處歷史試跑證據歸因問題，修正後複審無其他實質發現。

metadata 使用已安裝的 skill-creator `quick_validate.py`，透過 `uv run --offline --no-project --with pyyaml python -B` 執行。引用檢查使用本機 `~/.agents/scripts/check_skill_links.py --references <skill-directory>`；它是本次驗證工具，不是技能執行依賴，也未複製其中的本機安裝／路由檢查到此 repo。

移入前四個檔案的 SHA-256（來源與更新後副本均相同）：

| 檔案 | SHA-256 |
| --- | --- |
| `SKILL.md` | `42ade4db2e76d595c24d98efe849abbdbe4b4856063feffa7f7c103a2994bc6b` |
| `agents/openai.yaml` | `7a0d17e7b8b4f5a96c3e797bfcde1b9ad86dde0f58dbc888420669d97e8585eb` |
| `references/artifacts.md` | `c9dac7ae0bbced49f1c530efcf3cd271af64a3f9e940b136c7a83c9b505fa411` |
| `references/collaboration.md` | `6e7c8325fe504d5cca3ae6353f87db5ffd3d1c4bc7bc92ecfcfea9e897f8f353` |

## 沿用證據與限制

以下是本次移入前的既有紀錄，未聲稱本次重跑：

- 使用者曾報告完成 ShapeShelf 原型試跑及早期 ForgePilot 接續測試；這些歷史試跑缺少可查驗的 SESSION，不納入本次沿用的通過證據。
- 本輪有 SESSION 的 ForgePilot 試跑使用維護者流程比較 A／B／C，選 A，模擬解除 Gate → PASS → 核准，之後使用者定稿。
- ForgePilot 原型有 14 項 Node VM 邏輯檢查與獨立審查；曾發現並修正自訂表單有效性殘留、過期／Gate 狀態隱藏拒絕入口兩項問題。
- 回溯後技能補強「選載體前確認交付／檢查入口」及「接受狀態由 SESSION 維護」。四項獨立合成情境檢查已通過：瀏覽器不可用、單字母方向選擇、未驗證時定稿、試跑後返回技能開發。它們是 agent 行為評估，不是真人可用性測試。
- 本次工作流程內容未變，依 repo 規則重用上述結果，未再製造新的產品原型或重跑同樣情境。

瀏覽器曾拒絕原型入口；畫面、鍵盤、響應式與真人操作仍無驗證證據。這項缺口保留在產品 SESSION，不能從 metadata、引用或邏輯檢查推論通過。也未在本次驗證 Claude Code 實際載入或對遠端執行 Skills CLI 安裝。

ForgePilot 產物保留在原本的 `~/Documents/design-experience/ForgePilot/decision-flow/`。本次確認已接受的 `prototypes/decision-desk-v2.html` SHA-256 仍為 `a3ac2176f44b016f6fa7065a8507bfbc3419a3519b8266b75d8be4351bafeb9f`，未修改原型或將其加入此技能。

## 維護與復原

後續維護來源為本 repo 的 `skills/design-experience/`，先修改驗證再同步安裝；本機 `.agents` 的引用 hook 繼續檢查使用副本。發布尚未進行，README 的遠端安裝指令需待來源進入遠端可取得的版本後才適用。

本次安裝前備份：`~/.codex/backups/design-experience-migration-20261019-bx8x219v/design-experience/`，旁有原檔雜湊 manifest。復原時先比較後續修改，再以該完整目錄替換手動安裝副本；repo 的移入內容可按本次 diff 逐檔回退。不要一併重設其他未提交工作。
