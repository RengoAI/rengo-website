import { rootRoute } from "@/app/app-routes";
import { Briefcase, type LucideIcon } from "lucide-react";

/** Entries in the top-nav "Resources" dropdown. */
export const COMPANY_LINKS: readonly {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    id: "careers",
    title: "Careers",
    description: "Open roles across engineering and product.",
    path: rootRoute({}).careers({}).$,
    icon: Briefcase,
  },
];
