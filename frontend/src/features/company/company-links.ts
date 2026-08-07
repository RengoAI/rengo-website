import { rootRoute } from "@/app/app-routes";
import { Briefcase, Building2, type LucideIcon } from "lucide-react";

/** Entries in the top-nav "Resources" dropdown. Mirrors the SOLUTIONS shape. */
export const COMPANY_LINKS: readonly {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}[] = [
  {
    id: "about-us",
    title: "About Us",
    description: "Who we are and why we build for private markets.",
    path: rootRoute({}).company({}).$,
    icon: Building2,
  },
  {
    id: "careers",
    title: "Careers",
    description: "Open roles across engineering and product.",
    path: rootRoute({}).careers({}).$,
    icon: Briefcase,
  },
];
