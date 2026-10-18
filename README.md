# carl-skills

集中維護 Carl 自有的 agent skills。每個 skill 保持完整、可攜的目錄，按需安裝；共用 repo 不代表全部 skills 必須一起安裝或升版。

## Skills

| Skill | 用途 | 規格 |
| --- | --- | --- |
| [release-assessment](skills/release-assessment/SKILL.md) | 分開判斷變更納入、版本調整與發布時機，取得具體授權後協助操作。 | [規格](docs/release-assessment/SPEC.md) |

## 目錄

```text
skills/<skill-name>/
  SKILL.md                 技能入口
  references/              該技能按需讀取的文件
  scripts/                 僅在需要可執行工具時加入
  assets/                  僅在需要輸出範本或素材時加入
docs/<skill-name>/          規格與維護文件
docs/agents/               本 repo 的協作設定
.scratch/<feature>/        本機 tickets 與驗證紀錄
```

後續新增 skill 時，在 `skills/` 下建立自己的目錄並更新上表；不預先建立空的 scripts 或 assets 目錄。第三方 skills 保留其上游來源，不自動收進本集合。

## 按需安裝

選擇需要的 `skills/<skill-name>/`，將整個目錄複製到所用 agent 的 skill 目錄。以目前使用的共用位置為例，`skills/release-assessment/` 對應 `~/.agents/skills/release-assessment/`。請先確認目標不存在；若已安裝，先比較來源與本機修改，再更新，避免覆寫自訂內容。

保留 `SKILL.md` 與其 references 的相對位置。每個 skill 只保留一份啟用來源，避免同時安裝多個副本。此 repo 的整理不會自動安裝或更新任何本機 skill。

安裝內容不需要包含本 repo 的 `docs/`、`.scratch/` 或 `AGENTS.md`。例如 release-assessment 所需的專案發布政策仍保留在被評估專案中，不搬進此集合。

## 維護與驗證

先讀 [Repository Guidelines](AGENTS.md)。一般變更使用 `git diff --check` 檢查格式，再依該 skill 的驗收案例驗證行為。

若已安裝 Codex skill-creator 的驗證工具，可檢查技能 metadata：

```sh
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/release-assessment
```

這項檢查不代替行為驗收。release-assessment 的 [驗收案例](skills/release-assessment/references/acceptance.md) 與 [既有驗證紀錄](.scratch/release-assessment/validation/SUMMARY.md) 可作為維護依據。

目前沒有統一版本或自動發布流程。集中管理原始碼，不預設所有 skills 共用相容性承諾與發布節奏。
