# 事實查核：omarchy-dhh-omakase-linux-desktop.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/omarchy-dhh-omakase-linux-desktop.mdx`（publishDate 2026-09-02，updatedDate 2026-09-05；import 的 `ProcessPipeline.astro` 只是版型，圖解文字寫在 mdx 的 props 裡，已一併查）
- 對象：DHH／Omarchy（C 批，局部）
- 範圍：只查歸給 DHH／Omarchy 的部分，包括 DHH 理念與引語、Omakub 沿革，以及 Omarchy 的元件、預設工具、安裝與版本。Wayland、Waybar／Eww 比較、Quickshell 本身的技術特性等通用解說不查。
- 查核日期：2026-10-22
- 方法：以 `basecamp/omarchy` repo 為主要證據。manual 自 2026-08-13 起收進 repo 的 `manual/`，README 稱之為 “authoritative source”。文章發布前最近的 tag 是 v4.0.2（2026-08-30），所以用 `git show v4.0.2:manual/...` 對照文章寫成當時的狀態，再和 HEAD（2026-10-21，v4.5.0-rc1 之後）比較，看有沒有時期差異。其他來源還有 v4.0.0 GitHub release notes、`install/omarchy-base.packages`（v3.8.4 與 v4.0.2 對照）、omarchy.org/omakub、`basecamp/omakub` repo，以及 DHH 2012 年的 “Rails is omakase”。

## 總評：局部修正

歸給 DHH 的理念和沿革大致都有出處。手冊引語幾乎是逐字照抄，Omakub 是 2024 年的 Ubuntu＋GNOME 腳本，後來退役，改由 Arch＋Hyprland 的 Omarchy 接手。主架構 Arch＋Hyprland＋Quickshell、LUKS、Btrfs 快照、4.0 “Quattro”、lazy-loaded agent launcher 和 Omarchy skill 也都對得上。

問題出在細節：有幾處把舊版或根本不存在的東西寫成 4.0 的現況。

- 終端機：4.0 已把預設改成 Foot，文中卻寫 Alacritty／Kitty。Alacritty 是 3.x 的預設，Kitty 從來不是預設。
- Windows VM：文中寫「GPU 直通」，手冊明講沒有 GPU passthrough。
- Agents 面板：文中說它顯示 Claude 3.7 Sonnet／GPT-4.5／DeepSeek-V3、即時 Token 與階段成本。手冊寫的是 Claude Code、Codex、Fireworks 三家的方案用量，紀錄每 15 分鐘才重算一次，也沒有提到成本。
- 軟體生態圖裡的 Zellij、Yazi／Ranger、Spotify TUI／Cmus，在 manual 和 base packages 都找不到。
- 指令範例 `agent "..."`、`omarchy theme <name>` 都不是實際指令。

統計（共 43 項）：SUPPORTED 30、CONTRADICTED 6、NOT FOUND 7。

## 主張逐項查核

### A. DHH 理念與 Omakub → Omarchy 沿革

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | DHH「發表了全新的 Linux 作業系統發行版」Omarchy（前言） | SUPPORTED（有但書） | README：“Omarchy is a beautiful, fun & agentic Linux distribution by DHH.” https://github.com/basecamp/omarchy 。時期註記：repo 首個 commit 是 2025-06-01，文章發布時（2026-09）已經是 v4.0.x，說「全新」並不精確。 |
| A2 | 2024 年推出基於 Ubuntu 和 GNOME 的自動化設定腳本 Omakub（前言、流程圖 02） | SUPPORTED | `basecamp/omakub` 首個 commit 2024-05-25；README：“Turn a fresh Ubuntu installation into a fully-configured … system by running a single command.” omarchy.org/omakub：“Omakub was a layer of opinion on top of Ubuntu and GNOME” |
| A3 | Omakub 宣布退役，由 Omarchy 取代（前言） | SUPPORTED | https://omarchy.org/omakub ：“Omakub itself is now retired.”、“The repositories are archived on GitHub.”、“So the omakase moved from Ubuntu to Arch, from GNOME to Hyprland, and became Omarchy.”（GitHub API：`basecamp/omakub` archived = true） |
| A4 | Omakub「受限於 Ubuntu 底層套件版本與 GNOME 的強烈預設意志」「遇到客製化瓶頸」（流程圖 02） | SUPPORTED（有但書） | 同頁：“those come with strong opinions of their own”、“found the ceiling”、tiling 與鍵盤操作的想法 “kept fighting the platform instead of flowing from it.” 頁面沒有提到「Ubuntu 套件版本」這個原因。 |
| A5 | DHH 演進的第一階段是 macOS，「受限於封閉生態、資源佔用與難以深度定制的開發鏈」（流程圖 01） | NOT FOUND | manual、omakub 頁、README 都沒有這段敘述，是作者自己的歸納。 |
| A6 | DHH 一向擁護 Omakase，「正如 Ruby on Rails 預設整合的 Active Record、Stimulus、Turbo」（§一） | SUPPORTED（有但書） | DHH 2012-12-27 “Rails is omakase”：“A team of chefs picked out the ingredients, designed the APIs, and arranged the order of consumption on your behalf.” https://dhh.dk/2012/rails-is-omakase.html ；manual 也直接把 Omarchy 叫做 “an omakase Linux distribution”。Stimulus／Turbo 是 Rails 預設這點本次沒有另外查證。 |
| A7 | 「DHH 在其官方手冊中強調：A beautiful system is a motivating system, and productivity has always been downstream from motivation.」（§一） | SUPPORTED | `manual/01-welcome-to-omarchy.md`：“Because a _beautiful_ system is a _motivating_ system, and productivity has always been [downstream from motivation](https://world.hey.com/dhh/beautiful-motivations-6fef7c73).” 文章省略了 “Because”、把 “a” 改成大寫，語意沒變。原文的連結指向 DHH 部落格 “Beautiful motivations”。 |
| A8 | 定位為「零冗餘（Zero Bloat）…全鍵盤驅動且具備統一美學」的開發者工作站（§一） | SUPPORTED | 同檔：“There's zero bloat here: Just everything I use.”、“designed with both aesthetics and productivity in mind.” |
| A9 | DHH 對「樂趣（Joy of Computing）」的堅持（§五末） | NOT FOUND | 找不到 “Joy of Computing” 這個說法。最接近的是 README 的 “beautiful, fun & agentic”。 |

### B. 架構元件與版本

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 基礎系統是 Arch Linux，滾動更新（§二表格、SVG 第 5 層） | SUPPORTED | manual 01：“based on [Arch]”；`manual/48-security.md`：“Arch … is a rolling distribution.” |
| B2 | 「強大的 Pacman 與 AUR 生態」（§二表格） | SUPPORTED（有但書） | `48-security.md`：“Omarchy only relies on packages from Arch's own core/extra/multilib repositories and its own Omarchy Package Repository by default. You can install software directly from AUR, but the base install doesn't.” 也就是說 Omarchy 刻意不讓基礎安裝依賴 AUR。 |
| B3 | 安裝預設啟用 LUKS 全磁碟加密（§二表格、SVG） | SUPPORTED | `48-security.md`：“Full-disk encryption is mandatory … using standard LUKS”；`02-getting-started.md`：“the installation defaults to full encryption”（可以按 Ctrl+C 改成不加密安裝）。 |
| B4 | Btrfs 系統快照、「秒級回滾」（§二表格、SVG） | SUPPORTED（有但書） | `47-system-snapshots.md`：“We create snapshots automatically on every Omarchy update”，從 Limine 開機選單還原（需使用 Limine）；安裝腳本 `install/config/snapper.sh`。只還原 root，不還原 `/home`。「秒級」找不到出處。 |
| B5 | Hyprland 是基於 Wayland 的動態平鋪視窗管理器（§二表格、SVG） | SUPPORTED | manual 01：“the tiling window manager [Hyprland]”；`04-navigation.md`：“Omarchy's default layout is called dwindle.” |
| B6 | 桌面介面採 Quickshell，取代 Waybar（§二表格、§二小節） | SUPPORTED | v4.0.0 release notes（2026-08-14）：“The entire desktop shell has been reimagined in Quickshell … That means Waybar, Walker, Mako, SwayOSD, hyprlock, hypridle, swaybg, and polkit-gnome are all gone.” https://github.com/basecamp/omarchy/releases/tag/v4.0.0 。base packages：v3.8.4 有 `waybar`，v4.0.2 改成 `quickshell`。Omarchy 從來沒用過 Eww。 |
| B7 | 核心終端是「Alacritty / Kitty + LazyVim」，結合 Tmux（§二表格、SVG 第 4 層） | CONTRADICTED（時期） | v4.0.0 release notes：“Switch the default terminal to Foot for better resource utilization”；`manual/15-terminal.md`（v4.0.2 與 HEAD 相同）：“Foot is the default terminal for Omarchy … we fully support _Alacritty_, _Ghostty_, and _Kitty_ as options.” base packages：v3.8.4 有 `alacritty`，v4.0.2 改成 `foot`。所以 Alacritty 是 4.0 以前的預設，Kitty 只是選項。LazyVim（`16-neovim.md`：“It's built on LazyVim”）和 Tmux（“Omarchy ships with an ergonomically-optimized Tmux configuration”）這兩點正確。 |
| B8 | 自製 `omarchy` CLI 統一管理主題、升級、顯示器與診斷（§二表格） | SUPPORTED | `14-omarchy-cli.md`：`omarchy update`、`omarchy theme set <name>`、`omarchy debug`，另有 `bar`、`brightness` 等群組；顯示器相關見 `33-monitors.md`。 |
| B9 | 核心工具層含「Chromium 容器」（SVG 第 4 層） | NOT FOUND | `23-browsers.md`：“Omarchy ships with Chromium as the default browser. It's the plain open-source build”，沒有提到容器化。 |
| B10 | 4.0 版本代號 “Quattro”（§四） | SUPPORTED | v4.0.0 release notes：“# The Quattro Release … Omarchy 4 aka Quattro is the biggest release since the project started.” |

### C. 鍵盤互動與主題

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | `Super + 1~9` 切換工作區（§三） | SUPPORTED | `default/hypr/bindings/tiling.lua`（v4.0.2）：`for workspace = 1, 10` 綁 `SUPER + code:N` → “Switch to workspace”。 |
| C2 | 視窗「依二元樹或螺旋結構平鋪」（§三） | SUPPORTED（有但書） | 預設是 dwindle（`04-navigation.md`）；另一種選項是 `Super + L` 切換的 “scrolling layout”，manual 沒有提到「螺旋」。 |
| C3 | 統一剪貼簿與搜尋歷史，可搜文字、圖片（§三、SVG 第 2 層） | SUPPORTED | `08-unified-clipboard-history.md`：“The clipboard history is provided by the Omarchy shell and works for both text and images … You can also search the history just by starting to type.” |
| C4 | 一鍵選取螢幕區域 OCR，結果複製到剪貼簿（§三） | SUPPORTED | `11-text-extraction-dictation.md`：“Hit `Super + Ctrl + PrtScr` to select a region … The tesseract open source OCR model will then quickly convert that selection into text and place it on the clipboard.” |
| C5 | 內建語音聽寫，「整合本機/雲端 Whisper 模型進行全系統語音輸入」（§三、SVG） | NOT FOUND | manual 沒有提到 Whisper。v4.0.2 的寫法是：“Omarchy offers AI dictation via Voxtype. You install it via _Install > AI > Dictation_”，要另外安裝，不是內建。時期註記：到 HEAD（文章發布後）改成 “On fresh installs, Superwhisper is the default dictation backend, using cloud processing”，可以在 Superwhisper 和 Voxtype 之間選。 |
| C6 | 內建 Tokyo Night、Catppuccin、Gruvbox、Rose Pine、Everforest、Nordic 等配色（§三） | SUPPORTED（有但書） | `06-themes.md`：“Omarchy comes with twenty-two beautiful themes”，清單裡有 Tokyo Night、Catppuccin、Gruvbox、Rose Pine、Everforest、Nord。名稱是 “Nord”，不是 “Nordic”。 |
| C7 | 用 `omarchy theme <name>` 切換主題（§三） | CONTRADICTED（輕微） | `14-omarchy-cli.md`：“`omarchy theme set <name>`    Apply a theme”。 |
| C8 | 切主題會同步 Hyprland 邊框、狀態列、終端機、Neovim、桌布（§三） | SUPPORTED | `06-themes.md`：“Each theme styles the desktop, terminal, neovim, activity screen (btop), Chromium, and the entire Omarchy shell”；每個主題都附有一組背景圖。 |

### D. AI-Native 整合

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| D1 | 4.0 版「最引人注目的革新在於對 AI Coding Agent 的深度整合」（§四） | NOT FOUND | 這是評價性說法。v4.0.0 release notes 的開頭主打 Quickshell 重寫桌面 shell；AI 只是 Headline Features 裡的一項（“Add a configurable default coding agent with instant launch shortcuts and crash diagnosis.”），找不到「AI 是最大革新」的官方說法。 |
| D2 | 將 AI Agent 視為作業系統「一等公民」（§四標題） | SUPPORTED | `17-ai.md`（v4.0.2）：“Omarchy treats AI coding agents as first-class citizens, but it doesn't pick a favorite for you.” |
| D3 | 預裝 Claude Code、Codex、OpenCode、Copilot、Grok 等的輕量啟動 stub，第一次執行時才下載（§四-1） | SUPPORTED | 同檔：“every major coding-agent CLI comes pre-wired as a lazy-loaded launcher. The launchers are tiny mise-managed stubs in `~/.local/bin/`, so nothing is downloaded until the first time you actually run one.” 表中列出 claude、codex、opencode、gemini、copilot、crush、grok、pi、omp。到了 HEAD，清單又多了 agy、kimi、ori、hermes、muse、cursor-agent。 |
| D4 | 「當系統偵測到有 AI Agent 運行時」狀態列會自動浮現 Agent 指示燈（§四-2） | CONTRADICTED（輕微） | v4.0.2：“The top bar grows an agents icon the first time Omarchy finds AI coding usage on the machine (and stays out of the way until then).” 觸發條件是第一次發現使用紀錄，之後就常駐，不是偵測到 agent 正在執行才出現。到了 HEAD 改成常駐：“The top bar has an agents icon.” |
| D5 | 面板顯示當前模型「Claude 3.7 Sonnet、GPT-4.5、DeepSeek-V3 等」（§四-2） | NOT FOUND | v4.0.2 只寫 “token usage by day and by model. Claude Code, Codex, and Fireworks are covered out of the box.” 沒有列出這三個模型名稱。這三個名字是 2025 年初的模型，放在 2026 年 9 月的文章裡也已經過時。 |
| D6 | 「即時 Token 消耗量與階段成本」（§四-2） | CONTRADICTED（輕微） | 同檔：“The usage records behind it are regenerated every 15 minutes by `omarchy agent usage-update`”，所以不是即時。面板顯示的是方案、5 小時／每週額度百分比（或預付餘額）和 token 用量，沒有「成本」。 |
| D7 | 顯示 API 配額與剩餘速率限制（§四-2） | SUPPORTED | 同檔：“your plan, the percentage used of the 5-hour session and weekly limits (or the remaining prepaid balance)”。 |
| D8 | 系統級 Agent Skills：Agent 可呼叫 `omarchy` CLI，「安全地調整 Hyprland 規則、螢幕配置或系統音效」（§四-3） | SUPPORTED（有但書） | `17-ai.md`：“Omarchy ships with a default skill for tailoring the system. Like tweaking your Hyprland config, adjusting the bar, or even creating a new theme”；`14-omarchy-cli.md`：CLI “is particularly helpful when you're having an AI agent work with you”。但官方的語氣比文章保守：“you should treat this skill as experimental … be ready to rollback changes or even invoking `omarchy reinstall configs`”，和文中「安全地」的說法有落差。 |
| D9 | 範例指令 `agent "幫我把當前主題切換為 Gruvbox…"`（§四-3 程式碼區塊） | CONTRADICTED（輕微） | 沒有 `agent` 這個指令。官方寫法是 `omarchy agent prompt "Review this project"`，或在終端機輸入 `a` 執行預設 agent（`17-ai.md`）。 |
| D10 | 提醒注意 Agent 自動執行權限的風險（§四 NOTE） | SUPPORTED | `17-ai.md`：“Agents launched this way run unattended in their respective don't-stop-to-ask modes, so be ready for them to actually do things!” |

### E. 軟體生態

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| E1 | TUI 有 Neovim（LazyVim）、Tmux、Lazygit、Lazydocker（SVG 左欄） | SUPPORTED | `21-tuis.md`（Lazygit、Lazydocker、Btop、Herdr、Cliamp…）、`15-terminal.md`、`16-neovim.md`；v4.0.2 base packages 有 `lazygit`、`lazydocker`、`tmux`、`nvim`、`omarchy-nvim`。 |
| E2 | TUI 還有 Zellij、Yazi／Ranger、Spotify TUI／Cmus（SVG 左欄） | NOT FOUND | v4.0.2 的 manual 和 base packages 都沒有 zellij、yazi、ranger、cmus。Spotify 是 GUI 版，而且要按熱鍵時才安裝（`24-commercial-apps-services.md`：“the hotkey kicks off the installation first if Spotify isn't installed yet”）。Omarchy 自己的 TUI 音樂播放器是 Cliamp。分頁／工作區管理器內建的是 Herdr，不是 Zellij。 |
| E3 | GUI 有 Chromium／Brave、Obsidian、Kdenlive／OBS Studio、LibreOffice／PDF Editor（SVG 右欄） | SUPPORTED（有但書） | manual 01：“From Neovim (btw) to Chromium, Obsidian to LibreOffice, and Kdenlive to OBS Studio.” Brave 要從 _Install > Browser_ 選裝（`23-browsers.md`）。PDF 預設用 Document Viewer，要簽名或填寫非表單 PDF 時改用 Xournal++（`27-filling-out-pdfs.md`），沒有叫做 “PDF Editor” 的程式。 |
| E4 | 「Windows VM (QEMU/KVM GPU 直通)」（SVG 右欄） | CONTRADICTED | `28-windows-vm.md`（v4.0.2 與 HEAD 相同）：“There's no GPU passthrough with this setup, so it's not suitable for gaming or video editing.” 實作方式是 Docker VM（dockur/windows），需要 KVM，用 _Install > Windows_ 選裝。 |
| E5 | 內建一款致敬 Winamp 風格的復古音樂播放器（§五） | SUPPORTED | manual 01：“Hell, even a retro Winamp-style music player is there!”；`21-tuis.md`：“Cliamp is a retro terminal music player inspired by Winamp 2.x”。 |
| E6 | ASCII 藝術螢幕保護程式（§五） | SUPPORTED | `41-branding.md`：“You can change the logo used for the screensaver … It's an ASCII logo”。 |

## 參考連結檢查

| 連結 | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://omarchy.org/manual/ （前言、結語） | 200 | 手冊首頁（內容和 repo 的 `manual/` 同源） | A7、A8、B1–B5、C3–C8、D2–D8、E 節大多數項目。撐不起 B7（終端機）和 E4（GPU 直通）。 |
| https://github.com/basecamp/omakub （前言） | 200，但 repo 已 archived | repo 首頁 | A2（Ubuntu、一行指令）。退役的說明在 https://omarchy.org/omakub （omakub.org 會 301 轉到這裡），建議改連或加連這頁。 |
| https://quickshell.org/ （§二） | 200 | 官網首頁 | 只能證明 Quickshell 存在。「Omarchy 選用 Quickshell」要靠 v4.0.0 release notes 或 manual 01 才撐得起來。 |
| `/blog/dhh-agentic-engineering-podcast/`（文末內部連結） | 站內檔案存在 | — | 延伸閱讀，不撐正文主張。 |

文章沒有連到 v4.0.0 release notes，但「4.0 Quattro」「Quickshell 取代 Waybar」這兩項主張其實最需要這份資料當出處。

## 修正建議（供作者參考，本次不改文）

1. §二表格與 SVG 第 4 層：終端機改成「Foot（4.0 起預設；Alacritty、Ghostty、Kitty 可選裝）」，並註明 Alacritty 是 3.x 的預設。
2. SVG 右欄：「Windows VM (QEMU/KVM GPU 直通)」改成「Windows VM（Docker／KVM，無 GPU 直通）」；Brave 標成選裝；“PDF Editor” 改成 Document Viewer／Xournal++。
3. SVG 左欄：拿掉 Zellij、Yazi／Ranger、Spotify TUI／Cmus，改成 manual 實際列出的 Herdr、Btop、dua、Cliamp。
4. §四-2：拿掉 Claude 3.7 Sonnet／GPT-4.5／DeepSeek-V3 和「階段成本」，改成「方案、5 小時與每週額度用量、按日／按模型的 token 統計（每 15 分鐘更新；內建支援 Claude Code、Codex、Fireworks）」；觸發條件改成「首次發現 AI coding 使用紀錄後出現」。
5. §四-3：範例改用實際指令 `omarchy agent prompt "..."`，「安全地」改成官方的說法（實驗性，建議先用 plan mode，必要時 `omarchy reinstall configs` 回復）。
6. §三：`omarchy theme <name>` 改成 `omarchy theme set <name>`；“Nordic” 改成 “Nord”；聽寫寫成「選裝 Voxtype（本機模型）」，並註明文章發布後新安裝改用 Superwhisper（雲端）為預設；拿掉「Whisper」和「內建」。
7. 「最引人注目的革新在於 AI」改成「4.0 的主軸是以 Quickshell 重寫整個桌面 shell，AI agent 整合是另一項重點」，並附上 v4.0.0 release notes 連結。
8. 「Joy of Computing」、流程圖 01 的 macOS 描述沒有出處。要嘛標成作者的詮釋，要嘛改用 README 的 “beautiful, fun & agentic”。
9. 前言的「全新」建議改成「2025 年推出、2026 年 8 月發布 4.0」，交代清楚時間點。
