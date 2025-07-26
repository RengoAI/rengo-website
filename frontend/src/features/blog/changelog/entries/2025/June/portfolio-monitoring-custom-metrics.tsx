import { ChangelogEntryData } from "@/features/blog/changelog/entries/types";

export const PortfolioMonitoringCustomMetrics: ChangelogEntryData = {
  date: {
    day: "12",
    month: "January",
    year: "2025",
  },
  type: "Improvement",
  title: "Portfolio monitoring dashboard now supports custom metrics",
  tags: ["portfolio monitoring", "dashboards"],
  readTime: "3 minute read",
  sections: [
    {
      id: "whats-changed",
      title: "What's changed?",
      content: [
        "Portfolio managers can now create and track custom metrics tailored to their specific investment strategies and reporting requirements. This enhancement provides the flexibility to define proprietary performance indicators and risk measures beyond standard industry metrics.",
        "The new custom metrics builder supports complex calculations, time-weighted averages, and conditional logic. You can combine multiple data sources and apply custom formulas to create meaningful insights for your investment process.",
        "Custom metrics seamlessly integrate with existing dashboards and can be included in automated reports, alerts, and API responses.",
      ],
    },
    {
      id: "how-to-use",
      title: "How to use custom metrics",
      content: [
        "Navigate to the Portfolio Monitoring dashboard and select 'Custom Metrics' from the configuration menu",
        "Use the visual formula builder to define your metric calculation using available data fields",
        "Set up display preferences including chart types, time periods, and formatting options",
        "Configure alerts and thresholds for your custom metrics to receive notifications when values exceed defined ranges",
        "Add custom metrics to your existing dashboards and reports for comprehensive portfolio analysis",
      ],
    },
  ],
};
