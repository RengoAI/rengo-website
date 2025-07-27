import { CHANGELOG_DATA } from "@/features/blog/changelog/entries";
import {
  ChangelogEntryData,
  ChangelogEntryType,
} from "@/features/blog/changelog/types";

interface Filters {
  type: ChangelogEntryType | null;
  year: string;
}

export const getChangelogEntriesByYearAndMonthAndId = (
  filters?: Filters,
): Record<string, Record<string, Record<string, ChangelogEntryData>>> =>
  CHANGELOG_DATA.reduce(
    (acc, entry) => {
      const year = entry.date.year;
      const month = entry.date.month;
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = {};
      }
      if (filters?.type && entry.type !== filters.type) {
        return acc;
      }
      if (filters?.year && entry.date.year !== filters.year) {
        return acc;
      }
      acc[year][month][entry.id] = entry;
      return acc;
    },
    {} as Record<string, Record<string, Record<string, ChangelogEntryData>>>,
  );
