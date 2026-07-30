---
name: make-web-design
description: Generate a web design from visual references. Use when asked to design, redesign, or generate a new version of a website or UI based on references, inspiration, or a visual direction. Invoked by /make-web-design or when the user asks for a new web design with references.
---

# Goal
Synthesize visual references, summarize your findings into a design direction with visual elements and principles outlined, then generate a website design based on those design principles.

# Approach
Serve as a seasoned web designer with strong art direction experience. Reference these designers and agencies' design approach:

**Technology & product focused (Focus on this):**
- https://basement.studio/
- https://www.sanctuary.computer/
- https://www.eleken.co/

# Process

## Step 1: Observe the references
For each reference, document takeaways about the visual elements, brand, vibe, motion, typography, content, storytelling or any other brand identification that's most prominent and unique. If the prompt request suggested certain keywords for the visual direction or vibe, correlate your observation and scoring with what those keywords are.

1. **What it is** — the subject matter of the reference, the goal or use case of the site or image (for marketing, sales, contact, product demo, etc)
2. **Design takeaways** — 4 visual design or artistic elements that make this reference unique. Not "nice typography." Something like: condensed caps in one weight only, with all hierarchy carried by size; or two inks overprinting so the overlap becomes a third color; or a grid that breaks exactly once per spread.
3. **Categorize the design** takeaways into one of the three layers:

| Layer | Your notes should be about |
| --- | --- |
| Structure | The composition, grid, hierarchy, patterns, layout, and uses of motion |
| Surface | The color palette, texture, images, graphics or type treatment |
| Attitude | The design genre, register, voice, imageries, analogies, abstract references, adjectives that describe what the design evokes |

## Step 2: Generate direction thesis
Outline the design direction based on a combination of your findings (Structure, Surface, Attitude) from Step 1.

- **Thesis** — one sentence on the design direction.
- **Palette** — 4–6 named hexes.
- **Type** — display + body, and why this pairing and not a safer one.
- **Layout** — one sentence, or a quick ASCII wireframe.

**Divergence test:** the directions must differ on structure or concept, not just palette. Three color variants of one layout is one direction wearing three shirts. If they'd all be built from the same markup, go back.

## Step 3: Generate the design
Translate the Step 2 thesis into actual interface decisions. Every component below needs a deliberate call sourced from your Structure / Surface / Attitude notes — not a framework default. If you can't trace a decision back to a reference or the thesis, it's a placeholder, not a choice. Work through components in this order; later ones (motion, states) should reinforce the same attitude established by structure and type, not introduce a new one.

**Navigation**
- Placement and behavior on scroll: fixed vs. static, transparent-to-solid, hide-on-scroll-down/reveal-on-scroll-up, or an unconventional position (side rail, bottom bar, in-flow rather than chrome).
- Item count and grouping — a 6-item mega-menu and a 2-item minimal list are different attitudes, not just different densities.
- Mobile treatment: don't default to a hamburger if the direction calls for something the brand would actually do (e.g. nav collapses into the logo, or becomes a full-bleed takeover with its own typographic moment).

**Hero / first scroll**
- Is the first screen a *moment* (kinetic type, a generative or animated centerpiece, a scroll cue as design element) or a plainer headline + subhead + CTA? This should follow directly from Attitude.
- What loads first, what's staged in (see Motion below), and what's static from frame one.

**Scrolling behavior**
- Native smooth scroll vs. custom (e.g. Lenis-style) — decide based on whether the direction is "snappy/utilitarian" or "cinematic/languid."
- Section snapping vs. free scroll; horizontal-scroll sections if content calls for it (galleries, timelines, case studies).
- Scroll-linked reveals/parallax: what triggers on enter-viewport, what pins, what's purely scroll-driven vs. time-driven.
- Scrollbar: hidden, custom-styled, or left native — a decision, not an oversight.

**Motion & transitions**
- Micro-interactions: what responds to hover/click and how (color shift, underline draw, scale, magnetic pull toward cursor, morph).
- Page/section transitions: hard cut, cross-fade, shared-element/FLIP-style continuity, or masked wipe.
- Entrance animations: stagger pattern, direction, and easing — tie the curve itself to Attitude (linear/sharp = utilitarian; long ease-out = editorial/calm).
- Loading state or preloader — only include one if the thesis earns it; skip if it's just decoration.
- Cursor: default, custom dot/ring, or contextual (grows over links, shows text over media) — only if it supports Structure or Attitude, not by default.

**Selection & interactive states**
- Hover state per element type (links, buttons, cards, nav items) — must be visually distinct from each other, not one hover treatment applied everywhere.
- Focus states (keyboard navigation) — visible and on-brand, not a browser default outline left in or stripped with nothing to replace it.
- Active/pressed state — brief, physical feedback (compress, darken, invert).
- Text selection highlight color — small detail, easy signal of attention to craft.
- Disabled state for any form or CTA that can be disabled.

**Links & buttons**
- Primary vs. secondary hierarchy: shape (pill, sharp corner, ghost/outline, underline-only text link), and whether shape itself carries meaning (e.g. only primary CTAs get a filled shape, everything else stays as text).
- Hover treatment consistent with the motion language chosen above.
- Icon usage: arrow on hover, external-link indicator, directional cues — decide once and apply consistently.

**Typography in layout**
- Type scale across breakpoints — not just "smaller on mobile," but whether hierarchy compresses (fewer size steps) or stays proportional.
- Line-length control for body copy (measure/max-width), treatment of eyebrows/labels/captions as a distinct type role.
- Where display type is allowed to break grid or bleed vs. where it stays contained.

**Grid & spacing system**
- Margin/gutter values and section vertical rhythm — pick actual numbers or a scale (e.g. 8px base, 4/8/16/24/40/64/96), not "generous whitespace."
- Whether the grid is meant to break intentionally (per the Divergence Test from Step 2) and where that break happens.
- Breakpoint behavior: does the layout reflow, or does structure hold and only spacing/type scale changes.

**Imagery & media**
- Treatment: duotone/color-mapped, grain/noise overlay, mask shapes (not just rectangles), consistent aspect ratios.
- How media enters on scroll (reveal/mask, scale-in, plain fade) — tie back to Motion.
- Video usage if any: autoplay muted loops as texture vs. deliberate, user-initiated playback.

**Content sections / recurring blocks**
- What repeatable section types the page needs (feature grid, stats, testimonial, logo wall, case study, FAQ) and how each is styled to feel like the same site without feeling identical (vary rhythm/density, not just color).

**Forms & inputs**
- Input style: underline, boxed, borderless-with-background — consistent with button shape logic above.
- Validation/error and success states, and microcopy tone on buttons/labels (matches Attitude — terse vs. conversational).

**Footer**
- Density: minimal sign-off vs. full sitemap — and whether it echoes the hero's attitude or deliberately resets to neutral/utilitarian as a contrast beat.

**Responsive behavior**
- What rearranges, stacks, or gets cut entirely at mobile widths.
- Whether motion/parallax reduces or simplifies on smaller or lower-power devices, and what replaces it.

**Accessibility & performance guardrails**
- `prefers-reduced-motion` fallback for anything built in the Motion section.
- Contrast ratios checked against the actual palette from Step 2, not assumed.
- Focus-visible states present on every interactive element listed above.
- Images/media lazy-loaded; heavy scroll effects degrade gracefully rather than jank.

# Do-nots

### Avoid the monoculture
These recur regardless of subject, which is what makes them defaults rather than choices:
- Cream background, high-contrast serif, terracotta accent
- Near-black with one acid-green or vermilion accent
- Broadsheet hairlines, zero radius, dense columns
- Gradient mesh, glassmorphism, oversized outlined sans
- Any of the above arrived at without a reference behind it
