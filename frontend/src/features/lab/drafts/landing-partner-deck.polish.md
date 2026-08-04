# Landing Partner Deck — Polish plan (Baseten-inspired)

Notes on what Baseten does well and how to bring the same discipline to `landing-partner-deck` without losing our deck-bloom identity.

## Observations from baseten.co

- **Type system**: single grotesk family (Neue Alte Grotesk) for display + body, one mono (Chivo Mono) for eyebrows/data. Two families, no serif — feels engineering-first.
- **Palette**: predominantly white with a near-black `#0E0E0E`, deep slate text `#425366`, muted slate-blue `#8999AC`, hairline `#E5E7EB`, and one saturated accent `#19E76E`. Restraint is the point — the accent is used sparingly and always earns attention.
- **Hero**: no background image. Copy carries the weight. Display sits ~112px on desktop. CTA + secondary link (not two equal buttons).
- **Sectioning by hairline**, not by alternating background color. Baseten uses thin `#E5E7EB` rules between sections. Where they *do* switch background it's a full dark band that houses meaningful content (logos, testimonials), not just for variety.
- **Ticker + fade edges**: horizontal marquees are masked with `linear-gradient(90deg, transparent 0, #fff 7.5%, #fff 90%, transparent 97.5%)`. Both ends fade so the strip never terminates in a hard edge.
- **Dashed dividers**: 4px-on / 4px-off segmented hairlines used as section markers. A subtle but distinctive motif.
- **Micro-copy in Chivo Mono**: labels, metric denominators, "01 / 06" pagination — the mono voice does the work of an icon system.

## Polish list

### Tier 1 — highest-impact structural moves

- [ ] **Introduce a hairline dashed rule as a recurring divider.** Replace some of our solid `1px solid #E4E4EC` section borders with the Baseten-style dashed pattern (`linear-gradient(90deg, #CCCCCC 0, #CCCCCC 4px, transparent 4px, transparent 8px)`, no-repeat, `background-size: 100% 1px`). Use it above eyebrows and between hairline-framed grids to signal system, not decoration.
- [ ] **Adopt Chivo Mono for the mono register.** Space Mono works but reads more zine-y than institutional. Chivo Mono is tighter, more engineered, and matches the deck's technical voice better. Swap `MONO` token to `"Chivo Mono", ui-monospace, monospace`. Keep Source Serif 4 for display — that's our differentiator, not a place to imitate.
- [ ] **Push the hero headline larger.** Baseten runs ~112px. We're at `clamp(56px, 7vw, 104px)`. Try `clamp(64px, 8vw, 128px)` for "Your data is your alpha." — 5 short words earn the extra room and the bloom has more field to breathe.
- [ ] **Kill the "Read the thesis →" secondary link, or convert it to Baseten's dashed-underline style.** Right now it competes with the "See a demo" CTA. Baseten either uses a single primary + a subtle text link, or two equally-weighted ghost buttons. Pick one pattern and stick to it.
- [ ] **Add a fade-masked marquee to the firm-type strip.** Ours is a static wrapped flex row. Baseten's marquees loop and fade at both edges — feels alive without being animated in a distracting way. Wrap the strip with `mask-image: linear-gradient(90deg, transparent, black 7.5%, black 92.5%, transparent)` and re-add the horizontal scroll (which the *previous* production landing had — worth borrowing back for this draft).

### Tier 2 — palette and rhythm refinement

- [ ] **Restrain accent color usage.** Right now `#9BDBFB` (sky highlight) appears in the headline gradient span, eyebrows, stack section num labels, and closing CTA span. Baseten uses `#19E76E` for accent maybe 3 times per page: one hero moment, one status/live indicator, one CTA hover. Pull the sky highlight back to just the headline span and one other place (probably the eyebrow above the closing CTA).
- [ ] **Tighten the text color scale.** Our body uses `color: C.text` with `opacity: 0.72` / `0.7` — muddies the intent. Baseten defines discrete colors: `#0E0E0E` for headline, `#425366` for body, `#8999AC` for secondary. Replace opacity-modulated text with three explicit slate values (e.g., `#0F1729`, `#425366`, `#8999AC`) and drop the opacity trick.
- [ ] **Use hairline-only section breaks instead of background swaps.** Every one of our light sections is `background: #FFFFFF`, which is correct — but the section-to-section transition currently reads as "wall of white broken by border." Baseten uses the same all-white pattern but stages content so the *content itself* creates rhythm: dense grid, then breathing hero-scale headline, then a mono-labeled table. Look at our capability curve section — the mono column headers already do this well; extend that pattern to functions and security.

### Tier 3 — content and micro-details

- [ ] **Add a small pagination / section-index in mono.** Baseten uses `01 / 06` style labels above section headlines. On our landing we could label sections `§ 01 — Context`, `§ 02 — Functions`, etc. in Chivo Mono at ~11px. Reinforces the "system" feel and helps readers orient during a long scroll.
- [ ] **Give the stack section (Applications / Agents / Ontology) numbered corner marks.** Right now the `01 / 02 / 03` sits inline above the title. Move it to a fixed corner (top-left of each tile), mono, muted — feels more like a schematic.
- [ ] **Consider a subtle "live" indicator on the closing CTA.** A single 6×6 `#19E76E`-equivalent dot next to "See a demo" (or a small "Booking Q1 pilots" mono label) borrows Baseten's "all systems normal" trust move. Adds motion cheaply and signals the company is active.
- [ ] **Replace the paragraph text-align on subhead lines with balanced wrap.** Baseten headlines use `text-wrap: balance` — we already do this for the hero but not for section headings. Apply it to every `h2` so multi-line headings never orphan a word.
- [ ] **Trim the closing CTA subtext.** Currently "Put your firm's knowledge to work. Let's talk about deploying AI on your infrastructure." — two sentences. Baseten pattern is a single tight line. Try just "Put your firm's knowledge to work." and let the "See a demo" button do the ask.

### Tier 4 — micro-interactions (if time)

- [ ] **Hover state on function/security tiles.** Currently static. Baseten tiles get a very subtle `#FAFBFC` background on hover — nothing dramatic, just enough to signal interactivity. Even if our tiles aren't links, the hover implies "there's more here if you want it."
- [ ] **Slow scroll-triggered fade for section eyebrows.** Baseten opts out of hero-level animation but does use quiet on-enter fades for content. A 300ms opacity/translate on eyebrow + heading (IntersectionObserver, no library) would add polish without the "animated landing page" feel we're avoiding.

## Things NOT to copy from Baseten

- **No green accent.** Their `#19E76E` is a signature — copying it would blur our identity. Our accent is the azure `#4FA3E3` / sky `#9BDBFB` from the deck bloom, and it should stay that way.
- **No sans-only type system.** Baseten's grotesk-only setup is right for them; our Source Serif 4 display is a real differentiator against the sea of Inter-based SaaS sites. Keep the serif for display.
- **No customer-logo grid yet.** Baseten leans hard on Notion / HubSpot / Cursor logos as social proof. We don't have that shape of logo wall yet — better to keep the firm-type marquee than fake a logo grid.

## Suggested implementation order

1. Chivo Mono swap + text-color scale (Tier 1 + Tier 2) — biggest visual delta, ~10-line change.
2. Hero size bump + dashed dividers + marquee — hero and structural polish.
3. Content trims (closing CTA copy, secondary link, accent restraint).
4. Section-index labels and tile hover — micro-details last.
