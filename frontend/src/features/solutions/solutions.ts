import { Boxes, Bot, ServerCog, type LucideIcon } from "lucide-react";

/**
 * Solutions is one page with three capability sections, and the nav dropdown
 * links to those sections rather than to child pages.
 *
 * An earlier version had two child pages whose title, URL and category each
 * named a different taxonomy — "Enterprise" at /solutions/ai-data-platform
 * filed under Infrastructure, "Private Equity" at /custom-ai-applications
 * under Delivery — and both were a bare hero with no body. Anchors keep the
 * dropdown affordance without recreating pages there is nothing to put on.
 */

export const SOLUTIONS_PATH = "/solutions";

/**
 * The three capabilities, in the order the page argues them: the foundation,
 * what gets built on it, and who operates it afterwards. Descriptions follow
 * the consulting-capability pattern — what we do, for whom, by what mechanism —
 * rather than listing features.
 */
export const SOLUTION_CAPABILITIES: readonly {
  id: string;
  title: string;
  /** Shown in the nav dropdown, so it has to read in one line. */
  summary: string;
  body: string;
  detail: readonly string[];
  icon: LucideIcon;
}[] = [
  {
    id: "data-infrastructure",
    title: "Data Infrastructure",
    summary: "One governed foundation for the firm's data",
    body: "We help firms put their meetings, documents, spreadsheets, and ledgers on a single governed foundation — permissioned, lineage-tracked, and ready to be queried — so that every downstream workflow draws on the same source rather than another copy.",
    detail: [
      "Warehouse or lakehouse foundation",
      "Native-file ingestion without templates",
      "Ontology and structured context",
      "Permissions and lineage",
    ],
    icon: Boxes,
  },
  {
    id: "applied-ai",
    title: "Applied AI",
    summary: "Applications and agents built for your operations",
    body: "We help firms turn that foundation into working software by developing the applications and agents against how the firm actually runs — its close, its reporting cycle, its approval chains — and extending them as the work changes.",
    detail: [
      "Custom applications for your workflows",
      "Agents that execute across systems",
      "Access from the AI tools you already use",
      "Source-backed answers with citations",
    ],
    icon: Bot,
  },
  {
    id: "managed-operations",
    title: "Managed Operations",
    summary: "We run and monitor the whole stack",
    body: "We help firms adopt all of this without hiring for it. The pipelines, integrations, permissions, and monitoring are ours to operate, so nobody on the client side is on call for the infrastructure underneath.",
    detail: [
      "Pipelines and integrations operated for you",
      "Monitoring, alerting, and incident response",
      "Ongoing development as needs change",
      "SOC 2 Type II with independent testing",
    ],
    icon: ServerCog,
  },
];

/**
 * Framing pillars, below the capabilities: the conditions that make the offer
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
