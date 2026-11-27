import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import { PostItem } from "@/features/blog/blog-index-page";
import { POSTS } from "@/features/blog/posts";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const LABEL = {
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "site.fg.muted",
} as const;

/**
 * After Wonderful's team section: the careers page's line on the team with a
 * way to the open roles, then the latest articles.
 */
export const TeamSection: React.FC = () => (
  <Section
    bg="site.bg.surface"
    minH={FEATURE_BAND_MIN_H}
    display="flex"
    flexDirection="column"
    gap={{ base: "48px", lg: "72px" }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "baseline" }}
      flexDirection={{ base: "column", md: "row" }}
      gap="16px"
    >
      <Text
        as="h2"
        textStyle="h4"
        fontWeight={400}
        lineHeight="1.1"
        color="site.fg.heading"
      >
        We&rsquo;re a team of{" "}
        <Box as="span" color="site.highlight">
          builders
        </Box>
      </Text>
      <ArrowLink href="/careers#open-roles" color="site.fg">
        Open roles
      </ArrowLink>
    </Box>

    <Box display="flex" flexDirection="column" gap="24px">
      <Text {...LABEL}>Articles</Text>
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
