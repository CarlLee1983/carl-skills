本文由 AI 協助整理，內容經作者審閱。

本文含合作推廣內容，Orbit 提供試用額度。

本文內容僅供參考，不構成任何投資或法律建議。

部署前先執行：

```bash
kubectl rollout status deploy/api --timeout=120s
```

設定檔放在 `/etc/app/config.yaml`，文件見 https://example.com/docs/rollout?ref=v2 。

當時值班的同事說：「這不是 bug——這是我們沒寫進文件的行為。」

整體來說，這次部署算是相當順利地完成了。
