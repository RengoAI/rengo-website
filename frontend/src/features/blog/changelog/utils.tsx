import { CHANGELOG_DATA } from "@/features/blog/changelog/entries";
import { ChangelogEntryData } from "@/features/blog/changelog/types";

export const getChangelogEntriesByYearAndMonthAndId = (): Record<
  string,
  Record<string, Record<string, ChangelogEntryData>>
> =>
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
      acc[year][month][entry.id] = entry;
      return acc;
    },
    {} as Record<string, Record<string, Record<string, ChangelogEntryData>>>,
  );
