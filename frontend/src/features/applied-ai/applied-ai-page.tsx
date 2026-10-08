import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import {
  SolutionHero,
  SolutionSteps,
} from "@/components/site/solution-sections";
import { type UseCase } from "@/components/site/use-case-accordion";
import { Box } from "@chakra-ui/react";
import React from "react";

/** The engagement, step by step. The step number stands in the label slot. */
const PROCESS: UseCase[] = [
  {
    audience: "1",
    title: "Unify your data and systems",
    body: "We help you consolidate existing tools for portfolio monitoring, unify that data, and ingest native files without templates or manual review.",
  },
  {
    audience: "2",
    title: "Automate unnecessary and manual work",
    body: "Agents take on the recurring work across your systems — the reconciliations, the reporting cuts, the reviews that live in a spreadsheet and someone's inbox.",
  },
  {
    audience: "3",
    title: "Deploy and steward the transition",
    body: "We roll out alongside your team rather than handing over a template, so the new workflows land inside your close, reporting cycle, and approval chains.",
  },
  {
    audience: "4",
    title: "Build and maintain apps specific to how your teams work",
    body: "We stay on to extend the applications as your needs change, with every answer traced back to the document or record it came from.",
  },
];

export const AppliedAiPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    <SolutionHero
      title="Applied "
      accent="AI_"
      lede={
        <>
          We&rsquo;re the embedded partner that builds the data intelligence
          layer for AI systems to learn and act from your firm&rsquo;s
          knowledge.
        </>
      }
    />

    <SolutionSteps title="Our process and approach" items={PROCESS} />

    <SiteOutro />

    <SiteFooter />
  </Box>
);
