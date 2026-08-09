import { Boxes, Bot, type LucideIcon } from "lucide-react";

/**
 * Two capabilities, each with its own page under /solutions.
 *
 * An earlier version had child pages whose title, URL and category each named a
 * different taxonomy — "Enterprise" at /solutions/ai-data-platform filed under
 * Infrastructure, "Private Equity" at /custom-ai-applications under Delivery —
 * and both were a bare hero. The axis here is capability throughout, and each
 * page carries its own sections, so the structure holds this time.
 */

export const SOLUTIONS_PATH = "/solutions";

export interface SolutionCapability {
  /** Also the URL segment: /solutions/<slug>. */
  slug: string;
  title: string;
  /** Shown in the nav dropdown, so it has to read in one line. */
  summary: string;
  /** Hero subtext on the capability's own page. */
  lede: string;
  /** What we do, for whom, by what mechanism — not a feature list. */
  body: string;
  sections: readonly { title: string; body: string }[];
  detail: readonly string[];
  icon: LucideIcon;
}

export const SOLUTION_CAPABILITIES: readonly SolutionCapability[] = [
  {
    slug: "applied-ai",
    title: "Applied AI",
    summary: "Applications and agents built for your operations",
    lede: "We help organizations operationalize AI by bringing together the people, processes, and technology required to scale.",
    body: "We help firms turn that foundation into working software by developing the applications and agents against their own close, reporting cycle, and approval chains — and by staying on to extend them rather than handing over a template.",
    sections: [
      {
        title: "Applications for your workflows",
        body: "Ready-to-deploy surfaces for the work your team repeats: portfolio monitoring, reporting, and the reviews that currently live in a spreadsheet and someone's inbox.",
      },
      {
        title: "Agents that carry context forward",
        body: "Agents execute and coordinate recurring work across systems. Because they run on the governed foundation, each decision becomes context for the next rather than starting from scratch.",
      },
      {
        title: "Answers you can check",
        body: "Every figure traces back to the document or record it came from, so an output can be verified rather than trusted. Your team also reaches the same context from the AI tools they already use.",
      },
    ],
    detail: [
      "Custom applications for your workflows",
      "Agents that execute across systems",
      "Access from the AI tools you already use",
      "Source-backed answers with citations",
      "Ongoing development as needs change",
    ],
    icon: Bot,
  },
  {
    slug: "data-infrastructure",
    title: "Data Infrastructure",
    summary: "One governed foundation for the firm's data",
    lede: "We help organizations turn data into lasting performance by improving the technology, processes, and capabilities behind how they operate.",
    body: "We help firms put their meetings, documents, spreadsheets, and ledgers on a single governed foundation, so every downstream workflow draws on the same source rather than another copy that somebody has to reconcile.",
    sections: [
      {
        title: "Ingest what you already have",
        body: "Native files land as they are — no templates to fill in and no manual review step before the data is usable. Meetings, PDFs, workbooks, ledger extracts, and market data all arrive through the same path.",
      },
      {
        title: "Structure it so it can be asked questions",
        body: "Raw files become typed, related records with an ontology over them. That is the difference between storing documents and being able to ask what changed in a position since last quarter.",
      },
      {
        title: "Govern it from the start",
        body: "Permissions follow the firm's own structure, every value keeps its lineage back to the document it came from, and boundaries are enforced at the storage layer rather than in application code.",
      },
    ],
    detail: [
      "Warehouse or lakehouse foundation",
      "Native-file ingestion without templates",
      "Ontology and structured context",
      "Permissions and lineage",
      "Migration off existing systems",
    ],
    icon: Boxes,
  },
];

/**
 * Framing pillars on the Solutions overview: the conditions that make the offer
 * credible rather than the offer itself.
 */
export const SOLUTION_PILLARS: readonly {
  n: string;
  title: string;
  body: string;
}[] = [
  {
    n: "01",
    title: "We do the work, not a handover",
    body: "You are not buying a licence and an implementation guide. We scope the workflows, migrate the data, build what is missing, and stay on after launch. There is no internal team you need to staff first.",
  },
  {
    n: "02",
    title: "Institutional rigor by default",
    body: "Strong data isolation with boundaries enforced at the storage layer, end-to-end encryption, and SOC 2 Type II with ongoing independent testing. Your data is never used to train models.",
  },
  {
    n: "03",
    title: "Weeks to value",
    body: "Migrate, unify, automate, deploy, operate. For one asset manager that sequence ran in a month and delivered more than their previous vendor had in over a year.",
  },
];
