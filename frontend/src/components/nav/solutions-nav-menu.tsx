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
 * The Solutions dropdown. Items are section anchors on the single Solutions
 * page rather than child routes — see `solutions.ts` for why there are no
 * child pages.
 */
export const SolutionsNavMenu: React.FC<SolutionsNavMenuProps> = (props) => (
  <MarketingNavMenu
    label="Solutions"
    items={SOLUTION_CAPABILITIES.map((c) => ({
      id: c.id,
      title: c.title,
      path: `${SOLUTIONS_PATH}#${c.id}`,
    }))}
    {...props}
  />
);
