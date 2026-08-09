import { MarketingNavMenu } from "@/components/nav/marketing-nav-menu";
import { COMPANY_LINKS } from "@/features/company/company-links";
import React from "react";

interface ResourcesNavMenuProps {
  navColor: string;
  navHoverColor: string;
}

export const ResourcesNavMenu: React.FC<ResourcesNavMenuProps> = (props) => (
  <MarketingNavMenu
    label="Resources"
    items={COMPANY_LINKS.map((link) => ({
      id: link.id,
      title: link.title,
      path: link.path,
    }))}
    {...props}
  />
);
