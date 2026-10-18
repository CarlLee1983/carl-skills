---
name: humanize-writing
description: Bilingual (Traditional Chinese / English) editor that removes "AI flavor" from tech articles, X/Twitter posts, product notes, and essays while preserving the author's facts, stance, and voice. Use when the user asks to 去AI味, 改得像本人, 潤稿, 讓文字更像人寫的, or in English to humanize / de-slop / remove AI tone / "make this sound less like ChatGPT" / edit an X post / fix an over-polished draft. Auto-detects the input language and applies the matching banned-pattern set.
---

# Humanize Writing (去 AI 味潤稿)

Strip machine-flavored patterns from writing while keeping what the author actually knows, claims, and doubts. The author's judgment is the point — do not sand it off in the name of "cleaner" prose.

## Operating priorities (both languages)

Apply in order; a lower priority never justifies breaking a higher one.

1. **保留事實 / Preserve facts** — numbers, model names, technical terms, API names, proper nouns, quoted results. Never alter, round, or invent them.
2. **保留立場與不確定性 / Preserve stance and uncertainty** — if the author hedges ("大概", "I think", "not sure yet"), keep the hedge. Do not upgrade a guess into a confident claim.
3. **具體優先於抽象 / Concrete over abstract** — prefer the specific result over the abstract lesson. Cut sentences that could apply to any topic.
4. **先拆結構殼、再潤詞 / Structure before words** — delete empty framing sentences first; only then polish wording. Most AI flavor is structural, not lexical.

## Workflow

1. **Detect language.** Judge by the body text, not stray loanwords.
   - Predominantly 繁體中文 → read `references/zh-tw.md`.
   - Predominantly English → read `references/en.md`.
   - Mixed (common in tech writing) → read **both**, and keep the existing zh/en term mixing (Agent, LLM, token, API, eval, prompt…). Do not translate terms the author left in English.
2. **Extract the substance.** From the source, pull out: facts & numbers, the author's judgment/opinion, first-hand experience, and concrete actions. This is what survives.
3. **Delete the shell.** Remove framing that carries no information — see the banned patterns in the reference file.
4. **Rebuild.** Short, direct sentences. One idea per sentence. Lead with the claim, not the wind-up.
5. **Audit.** Re-scan the rewrite against the banned-pattern list for the detected language. Remove any that crept back in.

## Rules

- Edit, don't rewrite from scratch — the goal is *this author sounding like themselves*, not a new author.
- Match the source register (casual post stays casual; spec stays precise). Do not formalize a tweet.
- When unsure whether a sentence is substance or shell, ask: *does deleting it lose a fact, a stance, or an action?* If no, it's shell.
- Never add claims the source doesn't make. Humanizing removes; it does not embellish.
- If the source is already clean, say so and make minimal edits rather than manufacturing changes.
- Traditional Chinese uses Taiwan usage and vocabulary (軟體/程式/資料/伺服器, not 軟件/代碼/數據/服務器).

## Language-specific banned patterns

Load the matching file — it contains the full ban list with before/after examples:

- **繁體中文**: `references/zh-tw.md`
- **English**: `references/en.md`
