import { rootRoute } from "@/app/app-routes";
import type { FigureName } from "@/features/blog/blog-figures";

/** One block of a post's body, in reading order. */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string }
  | {
      type: "figure";
      figure: FigureName;
      /** Shown over the graphic. */
      title: string;
      /** Shown under the graphic, if the source has one. */
      caption?: string;
    }
  | {
      type: "comparison";
      /** Shown over the table. */
      title?: string;
      caption?: string;
      /** The two columns being compared, left then right. */
      columns: [string, string];
      rows: { label: string; cells: [string, string] }[];
    };

export type Post = {
  slug: string;
  title: string;
  /** A line under the title, if the source has one. */
  dek?: string;
  /** One or two sentences: the index, the page description and link previews. */
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** The argument in a few sentences, at the top of the post, if wanted. */
  shortVersion?: string;
  author: { name: string; role: string };
  body: PostBlock[];
};

/**
 * From the Business Overview, pages 4 to 6, word for word and in its order:
 * "Shared File Drive vs. Structured Database", then "An Example" and "With
 * Rengo". Don't add to it here; change the source first.
 */
const FILES_VS_DATABASE: Post = {
  slug: "shared-file-drive-vs-structured-database",
  title: "Shared File Drive vs. Structured Database",
  dek: "AI is only as reliable as the information it works from.",
  summary: "AI is only as reliable as the information it works from.",
  date: "2026-11-15",
  author: { name: "Erik Ronning", role: "Co-founder & CEO" },
  body: [
    {
      type: "paragraph",
      text: "Most organizations keep their information in a shared file drive such as SharePoint or Google Drive. Connecting AI to that drive gives it access to the files, but it still needs to find the right documents, interpret the figures, and reconcile information each time a question is asked. This works well when searching within a particular file, but becomes less reliable when questions require information from multiple documents.",
    },
    {
      type: "paragraph",
      text: "Files are a fragile system of record: answers can vary depending on which documents are retrieved, which versions are used, and how the question is phrased. Rengo takes a different approach, extracting information from those documents and maintaining it in a structured database where it can be verified, updated, and reused.",
    },
    {
      type: "comparison",
      title: "Two Ways to Connect AI to Your Data",
      columns: ["A shared file drive", "A structured database"],
      rows: [
        {
          label: "Finding answers",
          cells: [
            "AI searches and interprets files each time a question is asked",
            "AI works with information that’s already been extracted, organized, and checked",
          ],
        },
        {
          label: "Versions",
          cells: [
            "Drafts, final copies, and restatements can make it difficult to know which figures are current",
            "Historical versions are preserved, with the latest figures clearly identified",
          ],
        },
        {
          label: "Definitions",
          cells: [
            "The same metric can be defined differently across files, leading to inconsistent answers",
            "Common definitions are maintained and applied consistently",
          ],
        },
        {
          label: "Sources",
          cells: [
            "Verifying a figure requires going back through the original files",
            "Figures link directly to their original sources",
          ],
        },
        {
          label: "Questions across files",
          cells: [
            "Answering questions across multiple assets or periods requires searching through many documents",
            "Information can be compared across assets and periods in one place",
          ],
        },
        {
          label: "Maintenance",
          cells: [
            "Teams manage folders, naming conventions, and instructions for AI",
            "Rengo handles the organization and processing of files without changing how teams work",
          ],
        },
      ],
    },

    { type: "heading", text: "An Example" },
    {
      type: "paragraph",
      text: "Consider a simple question: “What did we originally forecast for [Company] this year?” Finding the answer means going back through the original financial model, annual budgets, and subsequent reporting, often with multiple versions of each. Even after finding the right documents, it can be difficult to determine which figures reflect the original forecast and how they were calculated.",
    },
    {
      type: "figure",
      figure: "files-flow",
      title: "Answering From Files",
    },
    {
      type: "paragraph",
      text: "Even after finding the right files, someone still needs to reconcile the numbers and determine which figures to use. Different people may arrive at different answers depending on the documents they reference. Much of this work then has to be repeated whenever the same information is needed again.",
    },

    { type: "heading", text: "With Rengo" },
    {
      type: "paragraph",
      text: "Rengo brings information from documents, spreadsheets, and business systems into a structured database. As new information comes in, we track changes, reconcile figures, and maintain consistent definitions. Rather than searching through the same files each time a question comes up, your team can work from information that’s already been organized and checked.",
    },
    {
      type: "figure",
      figure: "database-flow",
      title: "Answering With Rengo",
    },
    {
      type: "paragraph",
      text: "Rengo can still search the underlying documents when a question calls for it. The difference is that information found through those searches can be verified, organized and retained, making it available for future questions without having to go back through the same documents. This gives the team the flexibility to explore the original files while building a reliable record of the information they use most often.",
    },
    {
      type: "paragraph",
      text: "Answers remain consistent and traceable, with figures linked back to their original sources so the team can see where the information came from, which version was used and how the answer was reached.",
    },
  ],
};

/**
 * From the Business Overview, page 3, "The Opportunity", word for word: its
 * first, second, fourth and fifth paragraphs, in order. The dek is the
 * section's line in the Overview's contents. Don't add to it here; change
 * the source first.
 */
const THE_OPPORTUNITY: Post = {
  slug: "the-opportunity",
  title: "The Opportunity",
  dek: "Rethinking what\u2019s possible",
  summary: "Rethinking what\u2019s possible",
  date: "2026-11-12",
  author: { name: "Erik Ronning", role: "Co-founder & CEO" },
  body: [
    {
      type: "paragraph",
      text: "AI is fundamentally changing how people work and how software is built. For the first time, organizations can build systems that adapt to the way their teams operate, rather than forcing people to work around the limitations of software. The opportunity is not simply to make existing processes faster, but to rethink how work gets done.",
    },
    {
      type: "paragraph",
      text: "Your data is your alpha. Over time, organizations have built relationships, made decisions, developed financial models, and tracked performance, accumulating institutional knowledge unique to each firm. Much of this knowledge remains connected through people, with decisions relying on past experience and reporting requiring information to be manually assembled from files and systems. Making this knowledge accessible to AI creates an opportunity to make far greater use of it.",
    },
    {
      type: "paragraph",
      text: "Advances in AI have changed the economics of building this infrastructure. Work that once required large engineering teams can now be done with far fewer resources. Rengo uses AI throughout its engineering work to build and maintain these systems, combining its own software platform with the engineering needed to adapt them to each organization\u2019s data and operations.",
    },
    {
      type: "paragraph",
      text: "Rather than continuing to rely on information scattered across files, systems, and individual teams, organizations can invest in infrastructure that makes existing knowledge accessible throughout the business. With that foundation in place, organizations can capture the opportunity to fundamentally change the economics of how they operate.",
    },
  ],
};

/** Newest first. */
export const POSTS: Post[] = [FILES_VS_DATABASE, THE_OPPORTUNITY].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postPath = (slug: string) =>
  rootRoute({}).blog({}).post({ slug }).$;

export const getPostBySlug = (slug: string) =>
  POSTS.find((post) => post.slug === slug);

/** "Nov 15, 2026", for the index tiles. */
export const formatPostDateShort = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/** "November 15, 2026", read as a calendar date wherever the reader is. */
export const formatPostDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const WORDS_PER_MINUTE = 230;

/** Whole minutes to read the body, at least one. */
export const readMinutes = (post: Post) => {
  const words = post.body
    .flatMap((block) => {
      switch (block.type) {
        case "list":
          return block.items;
        case "comparison":
          return [
            ...block.columns,
            ...block.rows.flatMap((row) => [row.label, ...row.cells]),
          ];
        case "figure":
          return [];
        default:
          return [block.text];
      }
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export { headingId } from "@/components/site/article";
