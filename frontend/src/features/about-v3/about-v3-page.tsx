import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Box, Image, Text, VisuallyHidden } from "@chakra-ui/react";
import React from "react";

const ART = "/img/rebrand/";

type Founder = {
  name: string;
  role: string;
  bio: string;
  photoSrc: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Erik Ronning",
    role: "Co-founder & CEO",
    bio: "Previously a Founding Engineer at Maybern, where he led engineering and pioneered automations across fund-level waterfalls, management fees, and back-office workflows.",
    photoSrc: `${ART}team-erik.png`,
  },
  {
    name: "Grant Gustafson",
    role: "Co-founder & CTO",
    bio: "Former Head of Quantamental Engineering at Marshall Wace, where he built and owned data and AI infrastructure for institutional research and systematic investing at a $70B investment manager.",
    photoSrc: `${ART}team-grant.png`,
  },
];

const STORY = [
  "In Grant’s first weeks at Marshall-Wace, a quant researcher told him about the German tank-counting problem. In WWII, German tanks used incrementing serial numbers, so given a small sample of captured tanks, the Allies could estimate total tank production. The same concept applies to data strategies in evaluations - if you could get a glimpse of a few recent Etsy.com order numbers from email data, you could estimate the company's revenue.",
  "But where does all that data come from? How much time is spent chasing down emails, reformatting cuts of data,__ ? All of this creates a tank-counting level of problem when you should never have to sink hours just to hunt down the data you own.",
  "Rengo was founded by two engineers to solve this exact problem. That is a big promise, and they joke that we have been living in the gap between what AI can do and what podcasters say AI can do. That gap is finally closing: data work that use to require months of engineering effort to wrangle can increasingly be automated reliably by AI.",
];

/**
 * A founder row: portrait in columns 8–10, bio in 11–15. Both rows share one
 * grid, so they line up column for column. Tablet moves the pair to the left
 * edge; mobile stacks the bio under the portrait.
 */
const FounderRow: React.FC<Founder & { isFirst: boolean }> = ({
  name,
  role,
  bio,
  photoSrc,
  isFirst,
}) => (
  <>
    <GridCol
      span={{ base: 16, md: 5, lg: 3 }}
      start={{ base: "auto", lg: 8 }}
      display="flex"
      justifyContent="flex-start"
      // Once stacked, the grid's row gap sits between portrait and bio too;
      // this keeps the founders themselves further apart.
      mt={{ base: isFirst ? 0 : "28px", md: 0 }}
    >
      {/* Fixed at the design size — the source portraits are only ~200px.
          Held to the column's left edge, the column-8 line the story text
          below starts on. */}
      <Image
        src={photoSrc}
        alt={`Portrait of ${name}`}
        w="200px"
        h="206px"
        objectFit="cover"
        borderRadius="2px"
      />
    </GridCol>
    <GridCol
      span={{ base: 16, md: 11, lg: 5 }}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="8px"
      pt="2px"
    >
      <Text
        textStyle="body.md"
        fontSize="xl"
        fontWeight={500}
        letterSpacing="-0.02em"
        color="site.fg.strong"
      >
        {name}
      </Text>
      <Text textStyle="body.sm" color="site.fg">
        {role}
      </Text>
      <Text textStyle="body.sm" color="site.fg" maxW="359px">
        {bio}
      </Text>
    </GridCol>
  </>
);

/** Typing: ms before the first letter, per letter, and random extra. */
const TYPE_START = 300;
const TYPE_STEP = 45;
const TYPE_JITTER = 40;

/**
 * Text typed in one character at a time, the maroon underscore leading each
 * one in and coming to rest at the end. The untyped rest is laid out but
 * hidden, so the line holds its final width from the start. Screen readers
 * get the whole text at once; reduced motion gets it already typed.
 */
const TypedText: React.FC<{ text: string }> = ({ text }) => {
  const [typed, setTyped] = React.useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 0,
  );

  React.useEffect(() => {
    if (typed >= text.length) return;
    const delay =
      typed === 0 ? TYPE_START : TYPE_STEP + Math.random() * TYPE_JITTER;
    const id = window.setTimeout(() => setTyped((n) => n + 1), delay);
    return () => window.clearTimeout(id);
  }, [typed, text.length]);

  return (
    <>
      <VisuallyHidden>{text}</VisuallyHidden>
      <span aria-hidden>
        {text.slice(0, typed)}
        <Box as="span" color="site.accent">
          _
        </Box>
        <span style={{ visibility: "hidden" }}>{text.slice(typed)}</span>
      </span>
    </>
  );
};

export const AboutV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    {/*
      The title is sticky, and a sticky element is held inside its parent. So
      the parent here spans both the team and the story, with no bottom
      padding: the title stays pinned for the whole page and lets go only
      where the footer begins.
    */}
    <Section rhythm="none" pt={{ base: "48px", lg: "80px" }}>
      <Text
        as="h1"
        textStyle="h3"
        color="site.fg.strong"
        // Only pinned on desktop: on narrower screens the portraits scroll
        // right under it, where it would sit on top of them.
        position={{ base: "static", lg: "sticky" }}
        // Nav (52px) plus the band's 80px top inset — the title pins where it
        // already sits, rather than jumping up under the nav.
        top="132px"
        w="fit-content"
      >
        <TypedText text="Our team and vision" />
      </Text>

      {/* --- Team ---------------------------------------------------------- */}
      <Grid
        rowGap={{ base: "20px", md: "36px" }}
        mt={{ base: "16px", lg: "22px" }}
        pb={{ base: "64px", lg: "100px" }}
      >
        {FOUNDERS.map((founder, i) => (
          <FounderRow key={founder.name} {...founder} isFirst={i === 0} />
        ))}
      </Grid>

      {/* --- Story --------------------------------------------------------- */}
      <Grid py={{ base: "80px", md: "120px", lg: "160px" }}>
        {/* From column 8 on desktop, under the portraits: the pinned title
            keeps the left columns, so nothing may scroll beneath it. */}
        <GridCol
          span={{ base: 16, md: 12, lg: 6 }}
          start={{ base: "auto", lg: 8 }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="25px"
            maxW="452px"
            color="site.fg.strong"
          >
            {STORY.map((paragraph) => (
              <Text
                key={paragraph.slice(0, 24)}
                textStyle="body.md"
                fontSize="lg"
              >
                {paragraph}
              </Text>
            ))}
          </Box>
        </GridCol>
      </Grid>
    </Section>

    <SiteFooter />
  </Box>
);
