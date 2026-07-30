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
    slug: "landing-broadsheet",
    title: "The Broadsheet",
    description:
      "Stark white editorial. Space Mono headings at 9vw act as the grid. Slash-notated data band. Asymmetric label/body columns. Ghost capability figures. Reads like a private markets briefing document, not a SaaS page.",
    refs: [
      { label: "Raw Materials", url: "https://www.therawmaterials.com/approach" },
      { label: "Arena Physica", url: "https://www.arenaphysica.com/" },
      { label: "Aaru",          url: "https://aaru.com/" },
    ],
    notes: {
      thesis:
        "Stark white editorial where Space Mono headlines ARE the grid. Slash-notated data. Reads like a private markets briefing document designed by an art director.",
      palette: [
        { hex: "#0A0A0A", name: "Near-black" },
        { hex: "#FFFFFF", name: "White" },
        { hex: "#F0EDE8", name: "Parchment" },
        { hex: "#E0DDD8", name: "Hairline" },
        { hex: "#1A4F8A", name: "Rengo blue" },
      ],
      type: "Space Mono for ALL headings — reads as terminal / financial ticker. Inter Tight body. No weight variation; hierarchy is scale only.",
      layout:
        "Statement (9vw mono, no hero) → slash data band → sticky label col + 2-col body → numbered ghost-figure capabilities → black closing",
      stats: { time: "~2 min", tokens: "~7,200" },
    },
    load: async () => {
      const { LandingBroadsheet } = await import(
        "@/features/lab/drafts/landing-broadsheet"
      );
      return { Component: LandingBroadsheet };
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
