import { Layers, Users, type LucideIcon } from "lucide-react";

export const SOLUTION_CATEGORIES = {
  infrastructure: { id: "infrastructure", label: "Infrastructure" },
  delivery: { id: "delivery", label: "Delivery" },
} as const;

export type SolutionCategoryId = keyof typeof SOLUTION_CATEGORIES;

export const SOLUTIONS: readonly {
  id: string;
  category: SolutionCategoryId;
  title: string;
  description: string;
  tags: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    id: "ai-data-platform",
    category: "infrastructure",
    title: "Enterprise",
    description: "Unify, permission, and activate your company’s data for AI.",
    tags: "Data warehouse/lake · Integrations · Permissions · APIs · AI-ready context",
    path: "/solutions/ai-data-platform",
    icon: Layers,
  },
  {
    id: "custom-ai-applications",
    category: "delivery",
    title: "Private Equity",
    description: "Custom software and workflows built alongside your team.",
    tags: "CRM · AI note-taking · Agents · Workflows · AI transformation",
    path: "/solutions/custom-ai-applications",
    icon: Users,
  },
];
