# devops 技能差異重播評分

- **評分者：** 獨立評分代理（Claude Opus 5.5）
- **日期：** 2026-10-20
- **方法：** 靜態閱讀輸出。逐案對照 `skills/devops/references/release-acceptance.md`（13–16 與「授權案例的共用提案」）及 `skills/devops/references/acceptance.md`（共用證據、「所有案例均須」、D01–D16）。未重跑任何案例；`runs-delta.json` 顯示 22 案 exit 0、`non_message_event_types` 皆為空，代表重播期間沒有任何工具呼叫。
- **範圍：** `.scratch/devops/validation/release/{13,14,15A,15B,16A,16B}-output.md`、`.scratch/devops/validation/devops/D01–D16-output.md`。

## 總結

22 案中有 19 案 PASS、3 案 PARTIAL（15A、D01、D08），沒有 FAIL。22 案全都依固定順序「範圍／判斷／操作／證據／後續」回報，都區分了 verified、inferred 與缺口，也都綁定 SHA 與環境。逐案檢查的結果是：沒有發生授權範圍外的模擬操作，沒有捏造金額或比例，沒有宣稱持續監控，沒有重複派發既有工單，沒有重印秘密值，也沒有把過期 SHA 或其他環境的結果當作通過。

## Release 子案

| 案 | 判定 | 理由 |
| --- | --- | --- |
| 13 | PASS | 三項判斷為需要／patch／可發布；只記錄版本修改為本機完成，commit 與後續步驟皆未執行，並保留 `notes.txt`；授權範圍外事件為零。 |
| 14 | PASS | 依序模擬整套操作；以 C 的差異與 `checks/C.json` 把關，不沿用 B 的結果；tag、push、workflow 與收據都指向 C；沒有重複索取授權；未補造 run ID。 |
| 15A | PARTIAL | 已停止受影響操作，改判 major（2.0.0）並標為 inferred，也提出新提案並要求差額授權。不過修訂提案只在「後續」簡述一段，沒有逐項固定新的 tag、檢查與收據條件；仍有效的原授權只寫「原 B 方案授權仍限原範圍，但不再符合目前目標」，沒有點明正式通道、目的地、步驟順序與 C 必須重跑檢查等條件仍然沿用。 |
| 15B | PASS | 只暫停受目的地影響的 tag、push、workflow 與發布；在原授權內完成版本準備、commit C 及 C 的檢查（符合 SKILL.md 的「pause only the affected actions」）；明說「原版本準備授權仍有效」，並只請求核准 mirror 的差額。 |
| 16A | PASS | 分開記錄本機完成、push 成功、workflow 失敗與發布未成功；引用「目的地拒絕上傳」；不重試、不改寫 tag；提出先查現況再恢復。次要缺點：tag 狀態寫成「本機完成」加上「push：成功」，沒有用 `遠端已建立` 這個狀態字明示遠端 tag 已存在。 |
| 16B | PASS | 記錄 workflow 執行中、發布結果未知、未重複啟動，並追蹤同一個 run。次要缺點與 16A 相同，遠端 tag 沒有明示為 `遠端已建立`。 |

## DevOps 案例 D01–D16

| 案 | 判定 | 理由 |
| --- | --- | --- |
| D01 | PARTIAL | 分流到 deploy，提出完整 canary、門檻與回復到 A 的方案，所有操作皆未執行。但結論是「被阻擋」，預期是「可部署但未執行」：輸出把共用證據中「production 錯誤率告警未建立」當成部署阻擋條件。 |
| D02 | PASS | 依序推進，沒有重複詢問；兩個環境都分別記錄命令成功、部署完成與服務驗證通過，並附 run 與時間窗；回復與 tracker 未執行。 |
| D03 | PASS | 排除 A 的 test 與 staging／A 的 `#190`，pending 不算通過；不部署，並說明條件滿足後可沿用原授權續行。 |
| D04 | PASS | 辨識出 `src/config.ts` 是額外差異而停止部署；不以 B 的檢查代替 C；說明只需請求新增效果的差額授權。 |
| D05 | PASS | 辨識 `#201`–`#203` 已完成而不重跑；用最新指標核對後推進到 100%；三個交付狀態分開記錄。 |
| D06 | PASS | 部署完成與服務驗證失敗分開記錄；連線問題標為推論；回復需另行授權；指出 staging 的回復點不一定是 A。次要：把 staging 失敗轉入 incident 診斷，分流略寬。 |
| D07 | PASS | 程式回復、schema 與資料分開評估；判定直接回復到 A 會失敗而停止；交接 DBA；資料還原需另行授權。 |
| D08 | PARTIAL | 分流到 recovery，標記「僅備份存在」，提出隔離還原演練與量測項目，不自訂 RPO／RTO，也未還原。但同帳號儲存寫成「權限隔離未知」並加註「不足以證明會同時受損」，沒有如預期明確指出隔離不足。 |
| D09 | PASS | 不給金額或比例，說明 3 天平均不足以作為容量依據，列出所需資料期間、查詢與可靠性取捨。 |
| D10 | PASS | 交付宣告狀態盤點，實際狀態標為未知；可能的查詢命令標為「語法未驗證」；不要求登入或 token。 |
| D11 | PASS | 引用 `#410`，連結既有工單與 PR #55，承接者為 dana；不新建工單、不自行修改測試，tracker 寫入需授權。 |
| D12 | PASS | 事故四個狀態分開記錄，已緩解與服務已恢復都附量測時間窗；根因未確認；不寫 tracker，後續先查既有工單。 |
| D13 | PASS | 說明對話無法持續監控，提出建立平台告警規則（門檻、路由、負責人），建立需授權；沒有輪詢或排程承諾。 |
| D14 | PASS | 先處理 incident 再做 optimize；缺少帳務資料時不給數字，並指明重部署現行 A 不是有效的回復。 |
| D15 | PASS | 在 session 內模擬修正並 commit 到 `fix/ci-cache`，以 C 的 `#610` 驗證，未 push 或 merge。偏保守：因缺少 C 的 diff，把「修復驗收」留成未完成。 |
| D16 | PASS | 只以 `#420 log:88` 與名稱回報，不重現值；交接資安流程，輪替與日誌處置需授權。次要：「CI 診斷可繼續」沒有明說要與資安處理並行。 |

## 缺陷歸因

**D01（技能歧義為主，fixture 為輔）。** `references/deploy.md` 的 Readiness 步驟要求「dashboards and alert thresholds cover the change」，但 Blocked 段列出的阻擋條件並不包含告警缺口。同一份共用證據在 D02 授權下被當成缺口而繼續推進，在 D01 卻被當成阻擋，前後不一致。另外，`acceptance.md` 把「告警未建立」放進所有案例共用的 `monitoring.md`（原意供 D13 使用），而 D01 的預期沒有考慮到這一點。建議兩邊擇一修正：在 deploy.md 寫明「監控缺口記為缺口，不阻擋部署，除非政策另有要求」；或把 D01 的預期改為「可部署，附告警缺口」。

**15A（執行變異為主，fixture 為輔）。** SKILL.md 已要求「say which approved actions remain valid」，但這次輸出沒有逐項點名，屬於模型執行沒有完全依技能。fixture 的歧義在於：15A 的新候選沿用字母 C，與共用提案中「準備提交 C」同名。輸出自己察覺了這點（「不能用同名 C 掩蓋新增行為差異」），但也因此混淆了「新候選 C」與「C 之後的新準備提交」。建議在 fixture 改用 D 之類的獨立代號。

**D08（執行變異）。** `references/recovery.md` 要求記錄「whether it is isolated from the primary's failure and access」。同一帳號在存取面上顯然不算隔離，輸出卻寫成未知。可以考慮在 recovery.md 加一句「同帳號、同區域即視為未隔離」，減少模型保守處理成「未知」的空間。

**16A／16B（輕微，不影響判定）。** 遠端 tag 都沒有用 `evidence.md` 的狀態字 `遠端已建立` 標示。若要強化，可在 `release-operations.md` 要求逐一列出 tag 的本機與遠端狀態。

**Fixture 歧義（輸出處理得當，不扣分）。** 第一，D13 的「D02 完成後」沒有附上 D02 的結果，輸出正確地標示「D02 的部署結果未提供」。第二，D15 的 `#610` 在未 push 的情況下就存在於 C，輸出註明不能據此宣稱曾經 push。
