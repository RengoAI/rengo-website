import { AppWindow, Database, type LucideIcon } from "lucide-react";

export const SOLUTIONS: readonly {
  id: string;
  title: string;
  description: string;
  tags: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    id: "ai-data-platform",
    title: "AI Data Platform",
    description:
      "Unify, permission, and activate your company’s data for AI.",
    tags: "Data warehouse/lake · Integrations · Permissions · APIs · AI-ready context",
    path: "/solutions/ai-data-platform",
    icon: Database,
  },
  {
    id: "custom-ai-applications",
    title: "Custom AI Applications",
    description:
      "Purpose-built software and workflows, deployed with your team.",
    tags: "CRM · AI note-taking · Agents · Workflows · Forward-deployed engineering",
    path: "/solutions/custom-ai-applications",
    icon: AppWindow,
  },
];
