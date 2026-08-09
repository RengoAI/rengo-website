import { MarketingNavMenu } from "@/components/nav/marketing-nav-menu";
import {
  SOLUTIONS_PATH,
  SOLUTION_CAPABILITIES,
} from "@/features/solutions/solutions";
import React from "react";

interface SolutionsNavMenuProps {
  navColor: string;
  navHoverColor: string;
}

/**
 * The Solutions dropdown. Each capability has its own page under /solutions.
 */
export const SolutionsNavMenu: React.FC<SolutionsNavMenuProps> = (props) => (
  <MarketingNavMenu
    label="Solutions"
    items={SOLUTION_CAPABILITIES.map((c) => ({
      id: c.slug,
      title: c.title,
      path: `${SOLUTIONS_PATH}/${c.slug}`,
    }))}
    {...props}
  />
);
