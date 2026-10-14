import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { dottedRule } from "@/components/site/split-card";
import { GridCircleDots } from "@/features/solutions/grid-circle-dots";
import { SOLUTION_CAPABILITIES } from "@/features/solutions/solutions";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const INTRO =
  "We build and run your firm's data infrastructure, then develop the applications and agents that work on top of it.";

/** Each approach card's gloss, as set in the design. */
const APPROACH_BODY =
  "We help you consolidate existing tools for portfolio monitoring, unify that data, and ingest native files without templates or manual review.";

/**
 * One step of the approach: index on top, title and gloss under it, off a
 * dotted rule on the left like the /v3 metric cards.
 */
const ApproachCard: React.FC<{
  index: number;
  title: string;
  body: string;
}> = ({ index, title, body }) => (
  <Box
    flex="1 0 0"
    minW={0}
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    gap="16px"
    p="20px"
    {...dottedRule("site.border.dashed")}
  >
    <Text textStyle="label" lineHeight="1" letterSpacing="0" color="slate.100">
      {index}
    </Text>
    <Box display="flex" flexDirection="column" gap="12px" w="330px" maxW="full">
      <Text
        fontSize="20px"
        lineHeight="1"
        letterSpacing="-0.6px"
        color="site.fg"
      >
        {title}
      </Text>
      <Text fontSize="14px" lineHeight="1.4" color="site.fg.muted">
        {body}
      </Text>
    </Box>
  </Box>
);

/**
 * The Solutions overview, on the rebrand chrome: the promise on the page
 * surface, then the approach — the two capabilities — on the same surface.
 */
export const SolutionsPage: React.FC = () => {
  const introRef = React.useRef<HTMLHeadingElement>(null);
  return (
    <Box bg="site.bg.page">
      <SiteNav />

      {/* --- Intro --------------------------------------------------------- */}
      {/* Taller than the design's 633px band, to hold the figure under the copy.
        Under it, right of centre, the hero's marks move between a grid and a
        circle, the circle's top meeting the copy. */}
      <Section
        rhythm="none"
        position="relative"
        overflow="hidden"
        bg="site.bg.surface"
        pt="67px"
        pb="80px"
        // Room for the copy, the circle right under it, and a bottom margin.
        minH={{ base: "660px", lg: "780px" }}
      >
        <GridCircleDots below={introRef} />
        <Grid position="relative">
          <GridCol span={{ base: 16, md: 12, lg: 8 }}>
            <Text
              ref={introRef}
              as="h1"
              textStyle="h4"
              fontWeight={400}
              lineHeight="1.1"
              letterSpacing="-0.04em"
              color="site.fg.strong"
              maxW="682px"
            >
              {INTRO}
            </Text>
          </GridCol>
        </Grid>
      </Section>

      {/* --- Our approach -------------------------------------------------- */}
      <Section rhythm="none" bg="site.bg.surface" py="60px">
        <Grid rowGap="16px">
          <GridCol span={16} minH={{ lg: "138px" }}>
            <Text textStyle="h3" color="site.fg.strong">
              Our approach
            </Text>
          </GridCol>
          <GridCol
            span={16}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            minH={{ md: "301px" }}
            borderRadius="4px"
            overflow="clip"
          >
            {SOLUTION_CAPABILITIES.map((c, i) => (
              <ApproachCard
                key={c.slug}
                index={i + 1}
                title={c.title}
                body={APPROACH_BODY}
              />
            ))}
          </GridCol>
        </Grid>
      </Section>

      <SiteFooter />
    </Box>
  );
};
