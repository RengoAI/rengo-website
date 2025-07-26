export type ChangelogEntryType = "Release" | "Improvement" | "Retired";
export type ChangelogEntryTag =
  | "Data Connectors"
  | "Portfolio Monitoring"
  | "Security"
  | "Analytics"
  | "AI"
  | "Performance"
  | "Dashboards"
  | "Risk Management"
  | "Authentication"
  | "API"
  | "Deprecation";

export interface ChangelogEntrySection {
  id: string;
  title: string;
  content: string[];
}

export interface ChangelogEntry {
  id: string;
  title: string;
  content: string[];
}

export interface ChangelogEntryDate {
  day: string;
  month: string;
  year: string;
}

export interface ChangelogEntryData {
  id: string;
  title: string;
  date: ChangelogEntryDate;
  type: ChangelogEntryType;
  tags: ChangelogEntryTag[];
  sections: ChangelogEntrySection[];
  readTime: string;
}
