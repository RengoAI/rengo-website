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

/**
 * What the page argues, in order: we do the work, we build to your operations,
 * we run it afterwards. The first three pillars are the offer itself — service,
 * custom development, managed infrastructure — and the last two are the
 * conditions that make it credible.
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
    title: "Built for your operations, not configured",
    body: "Every firm's close, reporting cycle, and approval chain is its own. We write the applications and agents against how yours actually runs rather than asking you to fit a template — and we keep extending them as the work changes.",
  },
  {
    n: "03",
    title: "We run the infrastructure",
    body: "The warehouse, the pipelines, the integrations, and the permissions are ours to operate and monitor. Your team gets the outputs and the access controls; nobody there is on call for the plumbing.",
  },
  {
    n: "04",
    title: "Institutional rigor by default",
    body: "Strong data isolation with boundaries enforced at the storage layer, end-to-end encryption, and SOC 2 Type II with ongoing independent testing. Your data is never used to train models.",
  },
  {
    n: "05",
    title: "Weeks to value",
    body: "Migrate, unify, automate, deploy, operate. For one asset manager that sequence ran in a month and delivered more than their previous vendor had in over a year.",
  },
];
