import React from "react";

/**
 * Registry of design-lab drafts. Add one entry per exploratory idea; the index
 * page and the route tree are both generated from this list, so a new draft is
 * a single edit here plus its page component under `drafts/`.
 *
 * The lab is mounted only outside the production build (see `app-router.tsx`),
 * so anything registered here never reaches rengoai.com until it is promoted
 * into a real feature.
 */
export interface LabDraftRef {
  label: string;
  url: string;
}

export interface LabDraftNotes {
  thesis: string;
  palette: { hex: string; name: string }[];
  type: string;
  layout: string;
  stats?: {
    time: string;
    tokens: string;
  };
}

export interface LabDraft {
  /** URL segment under /lab and the basis for the route id. */
  slug: string;
  /** Human label shown on the lab index. */
  title: string;
  /** One-line note describing what this draft explores. */
  description: string;
  /** Optional reference sites shown as link buttons on the index card and notes panel. */
  refs?: LabDraftRef[];
  /** Design notes shown in the floating panel on the draft page. */
  notes?: LabDraftNotes;
  /** Explicit destructured lazy import of the draft's page component. */
  load: () => Promise<{ Component: React.ComponentType }>;
}

export const LAB_DRAFTS: LabDraft[] = [
  {
    slug: "landing-partner-deck",
    title: "The Partner Deck",
    description:
      "The sales-deck visual language, ported to web. Deep navy ink with the azure bloom from the deck cover, Source Serif 4 headlines, capability curve, function grid, and a transparent nav that dissolves into the hero.",
    refs: [
      { label: "Partner Deck PDF", url: "https://rengoai.com/" },
    ],
    notes: {
      thesis:
        "Bring the sales deck to the web. The cover bloom (rasterized JPEG in the deck) becomes live layered radial-gradients here; the nav dissolves into the hero so the bloom continues uninterrupted. Copy is deck-derived: the punchline 'AI deployment company for investment firms' opens the story, then reframes AI capability as the unblocked variable and data readiness as the constraint.",
      palette: [
        { hex: "#0A1728", name: "Deck ink" },
        { hex: "#0C1D34", name: "Navy" },
        { hex: "#163F6E", name: "Mid navy" },
        { hex: "#4FA3E3", name: "Azure" },
        { hex: "#9BDBFB", name: "Sky highlight" },
        { hex: "#FFFFFF", name: "Paper" },
        { hex: "#E4E4EC", name: "Hairline" },
      ],
      type: "Source Serif 4 display for every headline (matches the deck's serif register). Inter Tight body. Chivo Mono for eyebrows and small labels (Baseten-inspired — tighter, more engineered than Space Mono). Weight = 400 everywhere; hierarchy comes from scale and color, not weight.",
      layout:
        "Transparent-over-hero fixed nav → bloom hero (left-aligned 'Your data is your alpha' punchline) → firm-type marquee → today-vs-Rengo context reframe → four-function leverage grid → capability curve table (Restricted/Assistive/Operationalized) → dark stack section (Applications/Agents/Ontology) → security tiles → dark closing CTA.",
      stats: { time: "~4 min", tokens: "~12,000" },
    },
    load: async () => {
      const { LandingPartnerDeck } = await import(
        "@/features/lab/drafts/landing-partner-deck"
      );
      return { Component: LandingPartnerDeck };
    },
  },
  {
    slug: "landing-partner-deck-product",
    title: "Partner Deck · Product",
    description:
      "Product subpage in the deck-bloom system. Shorter bloom hero, three application cards with hairline bullets, agent kinds as a serif/body two-column table, portfolio-monitoring case study strip.",
    notes: {
      thesis:
        "The Product page in the sibling series. Same tokens, same bloom, but a shorter hero to leave room for the actual product content. Applications sit in a hairline grid with three bullets each; agents render as an editorial two-column table so they read as capabilities rather than tiles.",
      palette: [
        { hex: "#0A1728", name: "Deck ink" },
        { hex: "#163F6E", name: "Mid navy" },
        { hex: "#4FA3E3", name: "Azure" },
        { hex: "#9BDBFB", name: "Sky highlight" },
        { hex: "#FFFFFF", name: "Paper" },
        { hex: "#E4E4EC", name: "Hairline" },
      ],
      type: "Shares Source Serif 4 / Inter Tight / Chivo Mono with the parent draft.",
      layout:
        "Bloom subpage hero (72vh) → applications grid (3 cards with hairline bullets) → agents table (kind + description) → case-study strip → shared closing CTA.",
    },
    load: async () => {
      const { LandingPartnerDeckProduct } = await import(
        "@/features/lab/drafts/landing-partner-deck-product"
      );
      return { Component: LandingPartnerDeckProduct };
    },
  },
  {
    slug: "landing-partner-deck-security",
    title: "Partner Deck · Security",
    description:
      "Security subpage in the deck-bloom system. Four numbered pillars, an editorial controls table, and a compliance band above a compliance-team-focused closing CTA.",
    notes: {
      thesis:
        "Security page that survives LP diligence. Every headline is declarative; every pillar leads with a number/tag so a compliance reader can index directly to what matters. Closing CTA is written for a compliance team, not a founder.",
      palette: [
        { hex: "#0A1728", name: "Deck ink" },
        { hex: "#163F6E", name: "Mid navy" },
        { hex: "#4FA3E3", name: "Azure" },
        { hex: "#9BDBFB", name: "Sky highlight" },
        { hex: "#FFFFFF", name: "Paper" },
        { hex: "#E4E4EC", name: "Hairline" },
      ],
      type: "Shares the parent draft's type system.",
      layout:
        "Bloom subpage hero → four numbered pillars (auto-fit grid) → controls table (kind + body) → compliance band (SOC 2 · GDPR · pen-test) → compliance-team-focused closing CTA.",
    },
    load: async () => {
      const { LandingPartnerDeckSecurity } = await import(
        "@/features/lab/drafts/landing-partner-deck-security"
      );
      return { Component: LandingPartnerDeckSecurity };
    },
  },
  {
    slug: "landing-partner-deck-company",
    title: "Partner Deck · Company",
    description:
      "Company subpage in the deck-bloom system. Mission two-col, founder bios with deck-derived credentials, team pedigree logos, investors/angels grid, hiring-focused closing CTA.",
    notes: {
      thesis:
        "The company page from the deck, ported to web. Founder bios lead with the specific credential ('Founding Engineer at Maybern', '$70B investment manager') because those are the highest-credibility signals we have and they weren't anywhere on the previous site.",
      palette: [
        { hex: "#0A1728", name: "Deck ink" },
        { hex: "#163F6E", name: "Mid navy" },
        { hex: "#4FA3E3", name: "Azure" },
        { hex: "#9BDBFB", name: "Sky highlight" },
        { hex: "#FFFFFF", name: "Paper" },
        { hex: "#E4E4EC", name: "Hairline" },
      ],
      type: "Shares the parent draft's type system.",
      layout:
        "Bloom subpage hero → mission two-col (deck's 'Your data is your alpha' eyebrow) → founder bios in a two-tile hairline grid → team-pedigree logo band → investors/angels grid → hiring-focused closing CTA.",
    },
    load: async () => {
      const { LandingPartnerDeckCompany } = await import(
        "@/features/lab/drafts/landing-partner-deck-company"
      );
      return { Component: LandingPartnerDeckCompany };
    },
  },
  {
    slug: "landing-hero-v2",
    title: "The Atlas",
    description:
      "Warm chalk ground, dot-coordinate grid, giant italic Cormorant Garamond headline. Scientific classification notation, figure-numbered capabilities, dark editorial process section. Chic and research-grade at once.",
    refs: [
      { label: "Patrik Hübner", url: "https://www.patrik-huebner.com/creative-coding/" },
      { label: "BFL",           url: "https://bfl.ai/" },
    ],
    notes: {
      thesis:
        "Warm chalk ground with a faint dot-coordinate grid behind an italic Cormorant Garamond headline — editorial meets research brief. Capabilities are numbered figures, not cards.",
      palette: [
        { hex: "#F8F6F1", name: "Warm chalk" },
        { hex: "#141414", name: "Near-black" },
        { hex: "#2B4A8F", name: "Slate blue" },
        { hex: "#8C8880", name: "Warm stone" },
        { hex: "#B8A898", name: "Earth tan" },
        { hex: "#D9D4CE", name: "Parchment" },
        { hex: "#1A1A1A", name: "Dark section" },
      ],
      type: "Cormorant Garamond display — high contrast strokes, italic for chic. DM Sans body — neutral geometric. Barlow Condensed labels — condensed industrial. All three new to the lab.",
      layout:
        "§-notation header → giant italic serif headline → firm taxonomy strip → 3-up metrics (italic Cormorant numbers) → fig-numbered capability grid → dark editorial 2-col → tabular pedigree → dot-grid chalk closing",
      stats: { time: "~3 min", tokens: "~9,400" },
    },
    load: async () => {
      const { LandingHeroV2 } = await import(
        "@/features/lab/drafts/landing-hero-v2"
      );
      return { Component: LandingHeroV2 };
    },
  },
  {
    slug: "landing-signal",
    title: "The Signal",
    description:
      "Deep navy intelligence terminal. Geist Light at 72px, Geist Mono for every data register. Stacked context cards in the hero make the product metaphor tangible before you read a word. One accent color, no gradients.",
    refs: [
      { label: "ref.digital", url: "https://ref.digital/" },
      { label: "Figma mockup", url: "https://www.figma.com/design/gOsCo1pbNrmwZxSzRq7xBb/Rengo-Marketing-Site----cookin?node-id=4-107" },
    ],
    notes: {
      thesis:
        "A deep-navy intelligence terminal — Geist Light at scale carries the editorial gravity, Geist Mono grounds every data register, and stacked context cards in the hero make the product metaphor tangible before you read a word.",
      palette: [
        { hex: "#151B2D", name: "Abyss" },
        { hex: "#232A41", name: "Navy card" },
        { hex: "#2A3354", name: "Border" },
        { hex: "#92A7EA", name: "Periwinkle" },
        { hex: "#FBFBF6", name: "Off-white" },
        { hex: "#8892AB", name: "Muted slate" },
      ],
      type: "Geist 200 display — airy, precise, modern. Geist Mono 400 for all labels, data, and nav — terminal register. One family, two roles: no serif, no condensed.",
      layout:
        "Fixed nav → hero 2-col (headline left, stacked cards right) → ticker strip → problem 2-col → platform capability rows → metrics grid → context/backers → footer CTA. All sections at 1440px max.",
      stats: { time: "~3 min", tokens: "~8,800" },
    },
    load: async () => {
      const { LandingSignal } = await import("@/features/lab/drafts/landing-signal");
      return { Component: LandingSignal };
    },
  },
  {
    slug: "landing-v3",
    title: "The Dossier",
    description:
      "Dark navy opens with the problem, not the pitch. Hairline metrics, editorial serif at the extremes, capability tiles you earn through scrolling. The CTA waits at the bottom because it has to.",
    refs: [
      { label: "Harvey",    url: "https://www.harvey.ai/" },
      { label: "Vercel",    url: "https://vercel.com/" },
      { label: "Sanctuary", url: "https://www.sanctuary.computer/" },
    ],
    notes: {
      thesis:
        "Dark navy opens with the problem, not the pitch. Earn the CTA through proof — metrics, then capabilities, then context.",
      palette: [
        { hex: "#0C1D34", name: "Navy" },
        { hex: "#163F6E", name: "Mid navy" },
        { hex: "#3B8BE0", name: "Brand blue" },
        { hex: "#F5F4F0", name: "Off-white" },
        { hex: "#676685", name: "Muted" },
        { hex: "#E4E4EC", name: "Hairline" },
      ],
      type: "Source Serif 4 display at 88px / 1.02 lh. Inter Tight body + Space Mono labels. Hierarchy by scale alone — no weight variation.",
      layout:
        "Dark hero → hairline metrics strip → 2-col editorial → capability tile wall → editorial quote + backers → dark footer CTA",
      stats: { time: "~4 min", tokens: "~11,500" },
    },
    load: async () => {
      const { LandingV3 } = await import("@/features/lab/drafts/landing-v3");
      return { Component: LandingV3 };
    },
  },
];
