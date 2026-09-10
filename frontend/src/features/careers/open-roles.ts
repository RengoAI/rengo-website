export type JobContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type JobSection = {
  heading: string;
  blocks: JobContentBlock[];
};

export type OpenRole = {
  id: string;
  title: string;
  location: string;
  department: string;
  employmentType: string;
  summary: string;
  sections: JobSection[];
};

const ABOUT_RENGO: JobSection = {
  heading: "About Rengo AI",
  blocks: [
    {
      type: "paragraph",
      text: "Rengo AI is an AI transformation and deployment company. We embed alongside investment, finance, and operations teams to turn fragmented knowledge into shared data infrastructure and deploy purpose-built agents and applications on top of it.",
    },
    {
      type: "paragraph",
      text: "Rengo gives teams access to their organization's collective intelligence, transforming institutional memory into an asset that compounds with every workflow, investment, and decision.",
    },
  ],
};

const THE_ROLE_OPENING: JobContentBlock = {
  type: "paragraph",
  text: "AI is fundamentally changing how engineering is performed. Engineers used to live on the factory line building the product. The job is now to be the one building the factory. This role is for people who own end-to-end technical outcomes and stay effective when the problem is still ambiguous.",
};

const BENEFITS: JobSection = {
  heading: "Benefits",
  blocks: [
    {
      type: "list",
      items: [
        "Competitive Compensation Package: Attractive salary aligned with your experience and skills.",
        "Unlimited PTO: Take the time you need to relax and rejuvenate.",
        "Exceptional Medical, Dental, and Vision Coverage: Comprehensive health benefits to keep you and your family healthy.",
        "Commuter Benefits: Make your travel to work easier and more affordable.",
        "Life Insurance: Providing peace of mind for you and your loved ones.",
      ],
    },
  ],
};

const HOW_RENGO_IS_DIFFERENT: JobSection = {
  heading: "How Rengo AI is different",
  blocks: [
    {
      type: "paragraph",
      text: "A typical engineer here owns a product surface area that would normally be covered by an entire team. You'll have outsized autonomy over the products and features you build, and you'll be working at the frontier of what it means to design a product entirely around AI.",
    },
    {
      type: "paragraph",
      text: "This is one of the most transformative moments in the history of technology. We're leaning into it fully. If you join us, you will too.",
    },
  ],
};

const engineeringRole = ({
  id,
  title,
  summary,
  roleFocus,
  whatYoullDo,
  specialty,
}: {
  id: string;
  title: string;
  summary: string;
  roleFocus: string;
  whatYoullDo: string[];
  specialty: string;
}): OpenRole => ({
  id,
  title,
  location: "New York",
  department: "Engineering",
  employmentType: "Full time",
  summary,
  sections: [
    ABOUT_RENGO,
    {
      heading: "The Role",
      blocks: [THE_ROLE_OPENING, { type: "paragraph", text: roleFocus }],
    },
    {
      heading: "What You'll Do",
      blocks: [{ type: "list", items: whatYoullDo }],
    },
    {
      heading: "What You Bring",
      blocks: [
        {
          type: "list",
          items: [
            "Engineering experience, with deep care for the craft. You've shipped complete products end-to-end and write production-ready code across multiple disciplines.",
            specialty,
            "Extreme ownership. You jump in without instruction, treat no job as too big or too small, and want to shape strategy and culture.",
          ],
        },
      ],
    },
    BENEFITS,
    HOW_RENGO_IS_DIFFERENT,
  ],
});

export const OPEN_ROLES: readonly OpenRole[] = [
  engineeringRole({
    id: "software-engineer-data-infrastructure",
    title: "Software Engineer - Data Infrastructure",
    summary:
      "Build the governed data foundation that turns fragmented knowledge into a source of truth applications and agents can run on.",
    roleFocus:
      "You'll work on a small, high-caliber team building Rengo's data foundation: ingestion, structured context, permissions, and lineage. You'll set technical direction, write code, and be the person the team looks to when something is hard.",
    whatYoullDo: [
      "Design and ship production systems for ingestion, structured context, and the governed foundation applications run on.",
      "Turn meetings, documents, spreadsheets, and ledgers into typed, related records with lineage and permissions from the start.",
      "Own problems end-to-end, from an ambiguous brief to something a business runs every day.",
      "Work close to the workflows we're automating when that's what it takes to get the product right.",
    ],
    specialty:
      "Specific interest in applying software engineering fundamentals to data systems. You care about structure, lineage, and design that holds up under real use.",
  }),
  engineeringRole({
    id: "software-engineer-applied-ai",
    title: "Software Engineer - Applied AI",
    summary:
      "Build the applications and agents that turn proprietary knowledge into operating leverage.",
    roleFocus:
      "You'll work on a small, high-caliber team building the applications and agents that run on Rengo's data foundation. You'll set technical direction, write code, and be the person the team looks to when something is hard.",
    whatYoullDo: [
      "Design and ship production applications and agents on top of the governed data foundation.",
      "Build AI that teams can actually use — source-backed, permissioned, and reliable enough to inform a decision.",
      "Own problems end-to-end, from an ambiguous brief to something a business runs every day.",
      "Work close to the workflows we're automating when that's what it takes to get the product right.",
    ],
    specialty:
      "Specific interest in applying software engineering fundamentals to AI systems. You care about balancing frontier model capabilities with good system design.",
  }),
] as const;

export const getOpenRoleById = (id: string): OpenRole | undefined =>
  OPEN_ROLES.find((role) => role.id === id);

export const roleMailto = (title: string) =>
  `mailto:careers@rengoai.com?subject=${encodeURIComponent(`Application: ${title}`)}`;
