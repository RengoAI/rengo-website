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

/** What the platform does. The number stands in the label slot. */
const CAPABILITIES: UseCase[] = [
  {
    audience: "1",
    title: "Agent-managed data ontology at scale",
    body: "Agents map every file, record, and meeting into a typed model of entities and relationships, and keep it current as new data arrives, so the structure grows with your firm instead of being rebuilt by hand.",
  },
  {
    audience: "2",
    title: "Efficient automation pipelines for connection to any of your tools",
    body: "Automated pipelines pull from your CRM, data rooms, shared drives, and ledgers on a schedule, so data lands clean and current without anyone running manual exports.",
  },
  {
    audience: "3",
    title: "Access and permissions control",
    body: "Permissions mirror how your firm is organized, by fund, deal, and team, and are enforced at the storage layer, so every person and agent sees only what they should.",
  },
  {
    audience: "4",
    title: "Efficient interface to all your knowledge",
    body: "Ask questions in plain language, or reach the same context from the AI tools your team already uses, with every answer citing the document or record it came from.",
  },
  {
    audience: "5",
    title: "Full ownership of your data repository",
    body: "Your data lives in a repository you control, with lineage on every value back to its source. It is never used to train models.",
  },
];

export const PlatformPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    <SolutionHero
      title="Platform"
      accent="_"
      lede={
        <>
          We&rsquo;re the embedded partner that builds the data intelligence
          layer for AI systems to learn and act from your firm&rsquo;s
          knowledge.
        </>
      }
    />

    <SolutionSteps
      title="What our system achieves"
      items={CAPABILITIES}
      bg="site.bg.inset"
    />

    <SiteOutro />

    <SiteFooter />
  </Box>
);
