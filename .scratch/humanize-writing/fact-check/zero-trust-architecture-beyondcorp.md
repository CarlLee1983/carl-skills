# 事實查核：zero-trust-architecture-beyondcorp.mdx

- 文章：`/Users/carl/Dev/Carl/CarlStack/src/content/blog/zero-trust-architecture-beyondcorp.mdx`（沒有 import `src/components/*.astro`，圖解都是內嵌 SVG）
- 公司：Google（BeyondCorp）
- 批次：C 批（局部）。只查前言「2014 年發布」這段，以及 §2「Google BeyondCorp 零信任架構組件拓撲」，包含 SVG 圖解文字和「關鍵核心組件職責」。§1、§3、§4、§5 屬於通用技術解說，不查。
- 查核日期：2026-10-22
- 方法：證據只採 USENIX ;login: 上的 BeyondCorp 系列論文（從 research.google 下載 PDF）、cloud.google.com 上的 BeyondCorp／BeyondProd 官方頁面，年代脈絡另外參照 NIST SP 800-207。

一手來源：

- [P1] Ward & Beyer, “BeyondCorp: A New Approach to Enterprise Security”, ;login: Vol. 39 No. 6, December 2014. https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/ （PDF：https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43231.pdf；USENIX 頁：https://www.usenix.org/publications/login/dec14/ward）
- [P2] Osborn et al., “BeyondCorp: Design to Deployment at Google”, ;login: Vol. 41 No. 1, Spring 2016. https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44860.pdf
- [P3] Cittadini et al., “BeyondCorp Part III: The Access Proxy”, ;login: Vol. 41 No. 4, Winter 2016. https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45728.pdf
- [G1] https://cloud.google.com/beyondcorp
- [G2] BeyondProd：https://cloud.google.com/docs/security/beyondprod
- [N1] NIST SP 800-207 §1.1：https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf

## 總評：局部修正

§2 的骨架大致和 Google 論文對得上，包括面向網際網路的存取代理、裝置清冊、裝置憑證、SSO 加第二因子，以及依裝置狀態降級存取。「2014 年發布」也成立，指的是 ;login: 2014 年 12 月號的論文。問題出在作者把後來或別處的技術貼上 BeyondCorp 的標籤。

第一，Access Proxy 標成「Envoy」。Google 論文寫的是擴充版的 GFE。第二，圖右側寫「服務間強制 mTLS 微隔離」，但服務對服務的零信任是 Google 另一套 BeyondProd（ALTS），BeyondCorp 論文只講代理到後端的雙向認證，用的是自家的 LOAS。第三，授權機制被寫成「ABAC 動態計算風險分值」。Google 實際的做法是 Trust Inferer 指派信任層級（trust tier），再由 Access Control Engine 依 first-match 的 ACL 判斷，論文沒有提到風險分數。

另外，「率先」「開創了零信任範式」的說法和 NIST 的記載衝突：Jericho Forum 2004 年就提出去邊界化，「zero trust」一詞由 Forrester 的 John Kindervag 提出。FIDO2、EDR 在 BeyondCorp 系列論文裡都找不到。

統計：SUPPORTED 7、CONTRADICTED 4、NOT FOUND 3。

## 主張逐項查核

### A. 年份與定位（前言）

| # | 主張（文章位置） | 判定 | 一手來源與引文 |
|---|---|---|---|
| A1 | 「2014 年，Google 發布了名為 BeyondCorp 的安全架構」 | SUPPORTED（有但書） | P1 刊在 “DECEMBER 2014 VOL. 39, NO. 6”，文中說 “Google’s BeyondCorp initiative is moving to a new model that dispenses with a privileged corporate network.” 但書有兩點。第一，2014 年發布的是一篇描述架構的論文，不是產品。第二，計畫本身在 2011 年就開始：G1 寫 “Google's BeyondCorp mission (2011–present)”。 |
| A2 | Google「率先」發布 BeyondCorp，「開創了現代零信任架構（ZTA）的黃金範式」 | CONTRADICTED | N1 §1.1：“The concept of zero trust has been present in cybersecurity since before the term ‘zero trust’ was coined… The work of the Jericho Forum in 2004 publicized the idea of deperimeterization… which was later coined by John Kindervag while at Forrester.” Google 自己的說法也比較保守，G1：“It builds upon a decade of experience at Google, combined with ideas and best practices from the community.” 可以說 BeyondCorp 是影響很大的早期大規模實踐，但「率先」「開創」不成立。 |

### B. §2 拓撲圖（SVG 文字）

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| B1 | 員工設備可以從「公網／家用 WiFi／咖啡廳」發出請求，經存取代理統一攔截 | SUPPORTED | P1：“access depends solely on device and user credentials, regardless of a user’s network location—be it an enterprise location, a home network, or a hotel or coffee shop.” |
| B2 | 存取代理標示為「(Access Proxy / Envoy)」 | CONTRADICTED | P3：“The main components of Google’s front-end infrastructure are a fleet of HTTP/HTTPS reverse proxies called Google Front Ends (GFEs)… The resulting extended GFE is called the Access Proxy (AP).” BeyondCorp 系列論文都沒有提到 Envoy。 |
| B3 | 「IdP 身分 & FIDO2 MFA」 | NOT FOUND（FIDO2 部分） | 身分加第二因子成立，見 C5。BeyondCorp 系列（P1–P3）只寫 “primary and second-factor credentials”，沒有指明 FIDO2／WebAuthn。FIDO2 是 2014 年之後才定案的標準（屬一般知識，這次沒有另外查證），套在 2014 年的 BeyondCorp 圖上有時代錯置的問題。 |
| B4 | 「TPM 晶片 & EDR 健康度」 | NOT FOUND（EDR 部分） | TPM 見 C3。論文的裝置狀態來源是 OS 修補層級、裝置型號、清冊資料等（P1 “a device that has not been updated with a recent OS patch level might be relegated to a reduced level of trust”；P2 meta-inventory 整合 “over 15 sources”），沒有提到 EDR。 |
| B5 | 「ABAC 動態策略決策引擎」 | NOT FOUND（ABAC 這個名稱） | 論文的元件叫 Access Control Engine，P1：“An Access Control Engine within the access proxy provides service-level authorization to enterprise applications on a per-request basis. The authorization decision makes assertions about the user, the groups to which the user belongs, the device certificate, and artifacts of the device from the Device Inventory Database.” 判斷依據確實是屬性，但 Google 沒有用「ABAC」稱呼它，實際機制見 C6。 |
| B6 | 後端是「企業內部微服務 / SaaS」，並且「服務間強制 mTLS 微隔離」（文章 description 也把「微隔離、雙向 mTLS」歸在 BeyondCorp 落地之下） | CONTRADICTED | BeyondCorp 處理的是使用者和裝置存取內部應用。代理到後端這一段，P3 寫的是：“you might implement mutual TLS authentication and a corporate public key infrastructure. Our solution is an internally developed authentication and encryption framework called LOAS… that bi-directionally authenticates and encrypts all communication from the proxy to the back ends.” 服務對服務是另一套 BeyondProd，G2：“BeyondProd addresses the same concern for production services as Chrome Enterprise Premium does for users.”、“ALTS is a mutual authentication and transport encryption system for services in Google infrastructure.” 所以服務間的微隔離不屬於 BeyondCorp，Google 用的也是 ALTS，不是標準 mTLS。論文也沒有提到 SaaS。 |

### C. §2「關鍵核心組件職責」

| # | 主張 | 判定 | 一手來源與引文 |
|---|---|---|---|
| C1 | 存取代理是「所有企業內部應用的唯一入口（不再需要 VPN）」 | SUPPORTED（有但書） | P1：“All enterprise applications at Google are exposed to external and internal clients via an Internet-facing access proxy”；“without the need for a traditional VPN connection into the privileged network.” 但書有兩點。第一，VPN 是逐步收斂掉的（P1 “Cutting Back on the Usage of VPN… We restricted VPN access to users with a proven need”），而且有 “a long tail of workflows”。第二，非 HTTP 協定另外走 SSH proxy 等閘道（P3 “multiple front-end gateways (e.g., the SSH proxies)”）。所以「唯一入口」是簡化的說法。 |
| C2 | 代理對外暴露公網位址，負責 TLS 卸載與請求攔截 | SUPPORTED | P1：“registered in public DNS with a CNAME pointing the applications at the Internet-facing access proxy”；P3：“the AP terminates the TLS handshake”；P1：“This proxy delegates requests… to the back-end application after the access control checks… complete.” |
| C3 | 裝置清冊記錄每台授權設備唯一的「硬體證書（安裝於 TPM 晶片中）」 | SUPPORTED（有但書） | P1：“use a device certificate that is specific to each device. To receive a certificate, a device must be both present and correct in the Device Inventory Database. The certificate is stored on a hardware or software Trusted Platform Module (TPM) or a qualified certificate store.” 但書：論文也允許軟體 TPM 或合格的憑證儲存區，並不限於硬體 TPM 晶片。另外，憑證由 CA 簽發，清冊只是發證的前提，P2 提到 CA 儲存的是 “a certificate fingerprint”，不是清冊本身存放憑證。 |
| C4 | 非公司受管或沒有更新安全修補的設備，只能存取低權限系統 | SUPPORTED | P1：“unrecognized and unmanaged devices on the corporate network are assigned to a remediation or guest network”；“a device that has not been updated with a recent OS patch level might be relegated to a reduced level of trust.” P2：“a device’s trust tier assignment must be equal to or greater than the resource’s minimum trust tier requirement.” |
| C5 | IdP 管理員工帳號、群組與 MFA | SUPPORTED | P1：“An externalized, single sign-on (SSO) system is a centralized user authentication portal that validates primary and second-factor credentials… After validating against the User Database and Group Database, the SSO system generates short-lived tokens.”（FIDO2／WebAuthn 見 B3。） |
| C6 | PDP／PEP「依據 ABAC 動態計算風險分值」；圖說「依風險等級動態授權放行」 | CONTRADICTED | Google 的機制是信任層級加 ACL 規則，沒有計算風險分數。P2：“Trust levels are organized into tiers and assigned to each device by the Trust Inferer. Each resource is associated with a minimum trust tier required for access.” P1：“We use both static rules and heuristics to ascertain these levels of trust.” P3：“The ACL language works using first-match semantics, which is similar to traditional firewall rules.” 「PEP」一詞 P3 用過（“the ideal place to deploy policy enforcement points”），「PDP」與「風險分值」都沒有出現。 |

## 參考連結檢查

文章沒有參考連結區，正文也沒有外部連結，只有 frontmatter 的 `repositoryUrl`。

| 連結 | 存在？ | 首頁或具體文章 | 能撐起正文哪些主張 |
|---|---|---|---|
| https://github.com/ByteByteGoHq/system-design-101 | 存在（HTTP 200） | repo 首頁 | 都撐不起。repo 的 430 個檔案路徑中，沒有 zero trust 或 BeyondCorp 條目，相關的只有 `data/guides/how-does-a-vpn-work.md`、`types-of-vpns.md`。而且它是二手整理，不能當作 Google 主張的證據。 |

## 修正建議（供作者參考，本次不改文）

1. 前言改成「Google 2011 年啟動 BeyondCorp，2014 年在 USENIX ;login: 發表第一篇論文，是零信任最早的大規模企業實踐之一」，拿掉「率先」「開創」。若要交代脈絡，可以補上 Jericho Forum（2004）和 Forrester 的 Kindervag。
2. 拓撲圖的「(Access Proxy / Envoy)」改成「(Access Proxy，Google 內部是擴充版 GFE)」。如果想表達開源界的對應實作，就另外註明「開源對應可用 Envoy 等」，不要放在 Google 圖裡。
3. 圖右側的「服務間強制 mTLS 微隔離」移出 BeyondCorp 圖，或改成「代理 → 後端雙向認證（Google 用 LOAS）」。服務間零信任留在 §4 討論，並註明 Google 對應的是 BeyondProd／ALTS。description 裡把微隔離、mTLS 歸給 BeyondCorp 的部分也一起調整。
4. 「ABAC 動態策略決策引擎」「動態計算風險分值」改成 Google 實際的術語：Trust Inferer 指派信任層級、Access Control Engine 依 first-match 的 ACL 判斷。如果要保留 ABAC／PDP／PEP，就明講這是 NIST 的通用術語，不是 BeyondCorp 的原文。
5. 「FIDO2 MFA」「EDR 健康度」改成論文用語「第二因子驗證」「OS 修補層級等裝置狀態」，或註明是現代的對應實作。「硬體證書（TPM 晶片）」改成「裝置憑證（存在硬體或軟體 TPM，或合格的憑證儲存區）」。
6. 補一個參考連結區，放 P1、P2、P3 與 G1。
