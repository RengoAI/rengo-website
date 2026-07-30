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
export interface LabDraft {
  /** URL segment under /lab and the basis for the route id. */
  slug: string;
  /** Human label shown on the lab index. */
  title: string;
  /** One-line note describing what this draft explores. */
  description: string;
  /** Explicit destructured lazy import of the draft's page component. */
  load: () => Promise<{ Component: React.ComponentType }>;
}

export const LAB_DRAFTS: LabDraft[] = [
  {
    slug: "landing-hero-v2",
    title: "Landing — Hero v2",
    description:
      "Alternate landing hero: lighter tone, centered headline, and a metric strip in place of the firm-types marquee.",
    load: async () => {
      const { LandingHeroV2 } = await import(
        "@/features/lab/drafts/landing-hero-v2"
      );
      return { Component: LandingHeroV2 };
    },
  },
];
