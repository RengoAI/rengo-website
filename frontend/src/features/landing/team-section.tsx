import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { PostItem } from "@/features/blog/blog-index-page";
import { POSTS } from "@/features/blog/posts";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/** The founders, word for word from the sales deck's team slide. */
const FOUNDERS = [
  {
    name: "Erik Ronning",
    role: "Co-founder & CEO",
    bio: "Founding Engineer at Maybern, where he built a performance book of record automating fund finance workflows for alternative asset managers. Previously an engineer at Microsoft and at Blend through its NYSE IPO.",
  },
  {
    name: "Grant Gustafson",
    role: "Co-founder & CTO",
    bio: "Former Head of Quantamental Engineering at Marshall Wace, where he built and owned data and AI infrastructure for institutional research and systematic investing at a $70B investment manager.",
  },
];

const LABEL = {
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "site.fg.muted",
} as const;

/**
 * Who's behind it, after Wonderful's team section: the heading and the
 * Business Overview's line on the team, the founders side by side, then the
 * latest articles and a way to the open roles.
 */
export const TeamSection: React.FC = () => (
  <Section
    bg="site.bg.surface"
    minH={FEATURE_BAND_MIN_H}
    display="flex"
    flexDirection="column"
    gap={{ base: "48px", lg: "72px" }}
  >
    <Box display="flex" flexDirection="column" gap="14px" maxW="640px">
      <Text
        as="h2"
        textStyle="h4"
        fontWeight={400}
        lineHeight="1.1"
        color="site.fg.heading"
      >
        We{" "}
        <Box as="span" color="site.highlight">
          know the work
        </Box>
      </Text>
      <Text textStyle="body.md" color="site.fg" textWrap="balance">
        Our team has experience building data and AI systems at some of the
        world&rsquo;s largest financial institutions, as well as developing
        enterprise software for complex business workflows.
      </Text>
    </Box>

    <Box
      as="ul"
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      columnGap={{ base: "32px", lg: "64px" }}
      rowGap="40px"
    >
      {FOUNDERS.map((f) => (
        <Box
          as="li"
          key={f.name}
          display="flex"
          flexDirection="column"
          gap="8px"
          pt="20px"
          borderTop="1px solid"
          borderColor="border.subtle"
        >
          <Text
            as="h3"
            textStyle="h6"
            fontSize="1.25rem"
            fontWeight={400}
            lineHeight="1.2"
            letterSpacing="-0.5px"
            color="site.fg"
          >
            {f.name}
          </Text>
          <Text {...LABEL}>{f.role}</Text>
          <Text textStyle="body.sm" color="site.fg" maxW="460px" mt="4px">
            {f.bio}
          </Text>
        </Box>
      ))}
    </Box>

    <Box display="flex" flexDirection="column" gap="24px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        gap="16px"
      >
        <Text {...LABEL}>Articles</Text>
        <ArrowLink href="/careers#open-roles" color="site.fg">
          Open roles
        </ArrowLink>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        columnGap="40px"
        rowGap="32px"
      >
        {POSTS.slice(0, 2).map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </Box>
    </Box>
  </Section>
);
