import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Box, Image, Text } from "@chakra-ui/react";
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
      justifyContent={{ base: "flex-start", lg: "flex-end" }}
      // Once stacked, the grid's row gap sits between portrait and bio too;
      // this keeps the founders themselves further apart.
      mt={{ base: isFirst ? 0 : "28px", md: 0 }}
    >
      {/* Fixed at the design size — the source portraits are only ~200px.
          Pushed to the column's right edge so it sits a gutter from the bio. */}
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

export const AboutV3Page: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    {/* --- Team ------------------------------------------------------------ */}
    {/*
      The title is sticky, and a sticky element is held inside its parent. So
      the parent here is the whole band, with no bottom padding: the title
      rides down past the portraits and lets go exactly where the story
      container below begins.
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
        Our team and vision
        <Box as="span" color="site.accent">
          _
        </Box>
      </Text>
      <Grid
        rowGap={{ base: "20px", md: "36px" }}
        mt={{ base: "32px", lg: "43px" }}
        pb={{ base: "64px", lg: "100px" }}
      >
        {FOUNDERS.map((founder, i) => (
          <FounderRow key={founder.name} {...founder} isFirst={i === 0} />
        ))}
      </Grid>
    </Section>

    {/* --- Story ----------------------------------------------------------- */}
    <Section grid rhythm="none" py={{ base: "80px", md: "120px", lg: "160px" }}>
      <GridCol span={{ base: 16, md: 12, lg: 6 }}>
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
    </Section>

    <SiteFooter />
  </Box>
);
