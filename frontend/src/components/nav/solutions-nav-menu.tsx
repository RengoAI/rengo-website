import { MarketingNavMenu } from "@/components/nav/marketing-nav-menu";
import { SOLUTIONS } from "@/features/solutions/solutions";
import React from "react";

interface SolutionsNavMenuProps {
  navColor: string;
  navHoverColor: string;
}

export const SolutionsNavMenu: React.FC<SolutionsNavMenuProps> = (props) => (
  <MarketingNavMenu
    label="Solutions"
    items={SOLUTIONS.map((solution) => ({
      id: solution.id,
      title: solution.title,
      path: solution.path,
    }))}
    {...props}
  />
);
