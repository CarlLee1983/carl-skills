# 10: 打版號 humanize-writing/v1.0.0 與 Release

Status: ready-for-human
State: closed
Blocked by: 09

規格：[spec](../spec.md)；裁決：[merge-decisions](../merge-decisions.md)；決策：[ADR 0004](../../../docs/adr/0004-skill-source-installed-and-vendored-copies.md)。

## 範圍

依 ADR 0003 打 annotated tag `humanize-writing/v1.0.0` 並建立 GitHub Release；notes 只寫「首次版本」、一句能力說明，以及驗收文件與驗證紀錄的連結。tag 與 Release 需使用者另外授權。

## 驗收

- [x] tag 與 Release 存在，指向合併後的 commit
- [x] notes 連到驗收文件與驗證紀錄

## Comments

2026-10-22：使用者授權後建立 annotated tag `humanize-writing/v1.0.0`，指向 PR #21 的合併 commit `43093e2`，並發布 GitHub Release（https://github.com/CarlLee1983/carl-skills/releases/tag/humanize-writing/v1.0.0）。notes 只寫「首次版本」、一句能力說明，連到 `docs/humanize-writing/acceptance.md` 與 `.scratch/humanize-writing/validation/acceptance-08.md`，兩個連結都確認回 200。
