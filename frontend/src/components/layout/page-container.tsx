import { MarketingPageWidth } from "@/components/layout/marketing-page-width";
import React from "react";

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <MarketingPageWidth variant="content">{children}</MarketingPageWidth>
);
