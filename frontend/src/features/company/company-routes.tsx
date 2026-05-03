import { RouteObject } from "react-router-dom";

export const companyRoute: RouteObject = {
  id: "company",
  path: "company",
  handle: {
    pageTitle: "Company",
  },
  lazy: async () => {
    const { CompanyPage } = await import("@/features/company/company-page");
    return { Component: CompanyPage };
  },
};
