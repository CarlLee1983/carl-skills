# 夾具：dbcli（CLI 專案）

dbcli 是給 AI agent 與終端使用的資料庫 CLI，支援 MySQL、PostgreSQL、MariaDB、MongoDB、Redis、Elasticsearch，具權限分級（read-only／read-write／admin）、敏感資料黑名單、匯出。

README 的「Non-goals」節明寫：「No GUI. dbcli is designed for agents and terminals; a graphical client is out of scope.」

主要指令：`dbcli init`、`dbcli query "<sql>"`、`dbcli schema [table]`、`dbcli export --format csv|json`、`dbcli blacklist add <column>`。錯誤訊息目前為單行英文，例如 `Error: permission denied (read-only)`。使用者回報：新手常不知道自己在哪個連線、哪個權限等級下操作；匯出大量資料時沒有進度。
