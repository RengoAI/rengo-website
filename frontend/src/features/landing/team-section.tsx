import { Section } from "@/components/layout/section";
import { ArrowLink } from "@/components/site/arrow-link";
import { PostItem } from "@/features/blog/blog-index-page";
import { POSTS } from "@/features/blog/posts";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The two latest articles, under the customer stories, as Wonderful sets
 * its two Perspectives pieces under its customer cases.
 */
export const LatestArticles: React.FC = () => (
  <Box display="flex" flexDirection="column" gap="24px">
    <Text
      fontSize="12px"
      fontWeight={500}
      letterSpacing="0.06em"
      textTransform="uppercase"
      color="site.fg.muted"
    >
      Articles
    </Text>
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
);

/**
 * The team, as Wonderful's: a heading, a line under it, and a link to the
 * careers page. The heading and line are the careers page's own.
 */
export const TeamBand: React.FC = () => (
  <Section bg="site.bg.surface" py={{ base: "64px", lg: "96px" }}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="24px"
    >
      <Text
        as="h2"
        textStyle="h4"
        fontWeight={400}
        lineHeight="1.1"
        color="site.fg.heading"
      >
        We&rsquo;re a team of builders
        <Box as="span" display="block" color="site.highlight">
          From world-class engineering teams
        </Box>
      </Text>
      <ArrowLink href="/careers" color="site.fg">
        Careers
      </ArrowLink>
    </Box>
  </Section>
);
