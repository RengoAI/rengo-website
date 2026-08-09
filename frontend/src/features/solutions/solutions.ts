/**
 * Solutions is a single page rather than a set of child pages.
 *
 * It previously held two entries whose title, URL and category each named a
 * different taxonomy — "Enterprise" at /solutions/ai-data-platform filed under
 * Infrastructure, and "Private Equity" at /solutions/custom-ai-applications
 * filed under Delivery. Audience, capability and delivery-model cannot all be
 * the axis at once, and both pages were a bare hero with no body, so the tree
 * was collapsed into one page carrying the pillars below.
 */

export const SOLUTIONS_PATH = "/solutions";

export const SOLUTION_PILLARS: readonly {
  n: string;
  title: string;
  body: string;
}[] = [
  {
    n: "01",
    title: "One foundation, not another silo",
    body: "Your meetings, documents, spreadsheets, and ledgers land in a single governed store — permissioned, lineage-tracked, and queryable. Nothing is copied into a system your team has to maintain separately.",
  },
  {
    n: "02",
    title: "Production, not pilots",
    body: "We deploy against live data and keep it running. The measure is whether recurring work moves off your team's desk, not whether a demo impressed a committee.",
  },
  {
    n: "03",
    title: "Institutional rigor by default",
    body: "Isolation is enforced at the storage layer, permissions follow the firm's existing structure, and your data is never used to train models. SOC 2 Type II with ongoing independent testing.",
  },
  {
    n: "04",
    title: "Built around how your firm works",
    body: "Waterfalls, management fees, portfolio monitoring, and investor reporting are workflows we have already built. You should not have to explain your own operations before the work can start.",
  },
  {
    n: "05",
    title: "Weeks to value",
    body: "Migrate, unify, automate, deploy, operate. For one firm that sequence ran in a month and delivered more than its previous vendor had in over a year.",
  },
];
