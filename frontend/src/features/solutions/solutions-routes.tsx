import { SolutionsLayout } from "@/features/solutions/solutions-layout";
import { RouteObject } from "react-router-dom";

export const solutionsRoutes: RouteObject = {
  id: "solutions",
  path: "solutions",
  handle: {
    pageTitle: "Solutions",
  },
  element: <SolutionsLayout />,
  children: [
    {
      id: "dataConnectors",
      path: "data-connectors",
      handle: {
        pageTitle: "Data Connectors",
      },
      lazy: async () => {
        const { DataConnectorsPage } = await import(
          "@/features/solutions/data-connectors-page"
        );
        return { Component: DataConnectorsPage };
      },
    },
    {
      id: "portfolioMonitoring",
      path: "portfolio-monitoring",
      handle: {
        pageTitle: "Portfolio Monitoring",
      },
      lazy: async () => {
        const { PortfolioMonitoringPage } = await import(
          "@/features/solutions/portfolio-monitoring-page"
        );
        return { Component: PortfolioMonitoringPage };
      },
    },
  ],
};
