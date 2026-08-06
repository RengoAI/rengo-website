# Section Layout Grid Lines — Implementation Plan

## What the Figma shows

Every light section uses an identical **3-column flex row** structure inside the outer full-bleed box:

```
┌──────────────────────────────────────── outer section (w=full, border-top) ─┐
│  ┌──────────────────── inner row (maxW, mx=auto, display=flex) ────────────┐ │
│  │  [left spacer w=80px | border-right]  [content]  [right spacer w=80px | border-left]  │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

Key observations from Figma nodes (file `gOsCo1pbNrmwZxSzRq7xBb`, node `75-3563`):

| Element | Border treatment |
|---|---|
| Outer section box | `borderTop` only — horizontal section divider, full-width |
| Left Spacer (`w-[80px]`, e.g. node `85:99`) | `borderRight` + `borderTop` (echoes outer, creates T-junction in gutter) |
| Right Spacer (`w-[80px]`) | `borderLeft` + `borderTop` |
| **Center content div** | **No border at all** |

The vertical rails are **purely the spacers' inner borders**. The content box is untouched.  
Figma color `#bcc6d9` → Rengo token `C.grey30` = `var(--v2-colors-grey30)` = `#D3DDE1`.

The "horizontal line at the top of a section's content" (visible on Mintlify with `#f2f1ed`)
comes from the outer section's `borderTop`, not from the content box — it appears scoped to
content-column-width because the spacers visually frame it.

---

## What changes vs. the current architecture

Currently each section is:
```tsx
// Outer: full-bleed
<Box as="section" w="full" bg={...}>
  // Inner: constrained, padding provides the gutter
  <Box maxW={PAGE_MAX_W} mx="auto" px={sectionPx} py={sectionPy}>
    {content}
  </Box>
</Box>
```

The proposed change replaces the single `px` inner box with a **3-column row**.
`sectionPx` shifts from being padding on the content box to being the **width of the spacers**.
Content width and `maxW` behavior stays identical:

```tsx
// Outer: full-bleed + horizontal divider
<Box as="section" w="full" bg={...} borderTopWidth="1px" borderTopColor={C.grey30}>
  // Inner row: constrained, centered
  <Box maxW={PAGE_MAX_W} mx="auto" display="flex" alignItems="stretch">
    // Left spacer → vertical rail
    <Box w={sectionPx} flexShrink={0} borderRightWidth="1px" borderRightColor={C.grey30} />
    // Center content — no border, no x-padding
    <Box flex="1 0 0" minW="0" py={sectionPy}>
      {content}
    </Box>
    // Right spacer → vertical rail
    <Box w={sectionPx} flexShrink={0} borderLeftWidth="1px" borderLeftColor={C.grey30} />
  </Box>
</Box>
```

---

## Implementation plan

### 1. New reusable component: `src/components2/section-layout.tsx`

Exports one component `SectionLayout` — a drop-in wrapper that encodes the 3-column pattern:

```tsx
interface SectionLayoutProps {
  children: React.ReactNode
  as?: "section" | "nav" | "footer" | "div"
  bg?: string
  py?: ResponsiveValue<string>       // default: sectionPy
  railColor?: string                 // default: C.grey30
  showTopBorder?: boolean            // default: true — the horizontal divider
  showRails?: boolean                // default: true — vertical left/right lines
  outerProps?: BoxProps              // escape hatch for the outer Box
  contentProps?: BoxProps            // escape hatch for center content Box
}
```

Rail borders are hidden at `base`, shown at `md+` — no visible 1px lines on a 20px-wide mobile spacer:

```tsx
borderRightWidth={{ base: "0", md: "1px" }}
```

### 2. No changes to `new-site-tokens.ts`

`sectionPx` stays as-is — it was always the gutter value, it now doubles as the spacer width.
Same numbers, different role.

### 3. Refactor `new-site-page.tsx`

Each of the 6 light sections becomes:
```tsx
<SectionLayout bg={C.grey10} as="section" py={sectionPy}>
  {/* existing content — remove px from anything inside */}
</SectionLayout>
```

`FinalCTASection` and `SiteFooter` opt out (`showRails={false}`, custom `railColor`) since
they are dark sections with their own border treatment.

### 4. Refactor `bento-box.tsx`

Same swap — `AgentCapabilitiesSection`'s outer+inner pattern replaced with `SectionLayout`.

### 5. Refactor `nav-bar.tsx` and `site-footer.tsx`

The nav bar already has `borderBottomWidth="1px" borderBottomColor={C.grey30}` on its outer box.
The inner `Flex` just needs the left/right spacers added.
The footer opts into rails if desired.

---

## Why this is the right structure

- **Modular** — one component encodes the whole pattern; sections just opt in/out
- **No double-borders** — `borderTop` is on the outer section, not the content box, so adjacent
  sections share a single 1px line at the boundary
- **Content unaffected** — the center `flex="1 0 0"` box has no `maxW`, no border; it fills
  between spacers exactly like the current behavior. Nothing changes for content sizing
- **Responsive** — rails disappear at mobile breakpoints by switching `borderWidth` to `"0"`,
  spacers remain to provide the gutter
- **At viewports > 1440px** — outer bg extends edge-to-edge; inner row caps at 1440px centered;
  rails appear at the content column edges; horizontal dividers also stop at 1440px (scoped to
  the inner row, not full-bleed) — matches the Mintlify pattern exactly

---

## Reference

- Figma file: `gOsCo1pbNrmwZxSzRq7xBb`
- Figma node: `75-3563` (full page layout showing spacer structure)
- Rail color token: `C.grey30` = `var(--v2-colors-grey30)` = `#D3DDE1`
- Gutter/spacer widths: `sectionPx = { base: "20px", md: "40px", lg: "100px" }`
- Page max width: `PAGE_MAX_W = "1440px"`
