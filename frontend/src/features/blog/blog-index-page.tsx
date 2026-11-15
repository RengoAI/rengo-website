import { Section } from "@/components/layout/section";
import { ARTICLE_MEASURE, ArticleHeader } from "@/components/site/article";
import { NAV_H } from "@/components/site/site-constants";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { PostTile } from "@/features/blog/blog-tile";
import {
  formatPostDateShort,
  postPath,
  POSTS,
  readMinutes,
  type Post,
} from "@/features/blog/posts";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

const RouterLink = chakra(Link);

/*
 * As in the app's settings cards: descriptions in ink, a size down; only
 * the smallest details (the date line) go grey, a darker, neutral one.
 */
const INK = "site.fg.strong";
const TEXT = "site.fg";
const MUTED = "soot.600";
const BODY = { fontFamily: "body", fontSize: "1rem", lineHeight: "1.6" };

/** The list's column: the header's reading measure, so the two align. */
const COLUMN = `${ARTICLE_MEASURE}px`;

/** The date and read time, as the app sets small details: the body face, a
 * size down, normal case, in grey. */
const META = {
  fontFamily: "body",
  fontSize: "0.8125rem",
  lineHeight: "1.5",
  color: MUTED,
} as const;

/**
 * One post: its tile on the left, and beside it, as tall as the tile, the
 * title and summary at the top and, along the bottom, the date on the left
 * and the read time on the right.
 */
const PostItem: React.FC<{ post: Post }> = ({ post }) => (
  <RouterLink
    to={postPath(post.slug)}
    display="grid"
    gridTemplateColumns={{ base: "80px 1fr", md: "120px 1fr" }}
    alignItems="stretch"
    columnGap={{ base: "16px", md: "24px" }}
    textDecoration="none"
    // The title fades on hover, like the site's text links; the tile lifts
    // its colour a touch.
    css={{
      "& h2, & [data-tile]": { transition: "opacity 150ms ease" },
      "&:hover h2": { opacity: 0.6 },
      "&:hover [data-tile]": { opacity: 0.85 },
    }}
  >
    <PostTile post={post} data-tile="" />
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="12px"
      minW={0}
    >
      <Box>
        <Text
          as="h2"
          fontFamily="body"
          fontSize={{ base: "1rem", md: "1.25rem" }}
          fontWeight={400}
          lineHeight="1.3"
          letterSpacing="-0.01em"
          color={INK}
          textWrap="balance"
        >
          {post.title}
        </Text>
        <Text
          {...BODY}
          fontSize="0.9375rem"
          color={TEXT}
          mt="10px"
          display={{ base: "none", md: "-webkit-box" }}
          css={{ WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
          overflow="hidden"
        >
          {post.summary}
        </Text>
      </Box>
      {/* Along the foot of the tile: the date left, the read time right. */}
      <Box display="flex" justifyContent="space-between" gap="16px">
        <chakra.time {...META} dateTime={post.date}>
          {formatPostDateShort(post.date)}
        </chakra.time>
        <Text {...META}>{readMinutes(post)} min read</Text>
      </Box>
    </Box>
  </RouterLink>
);

/**
 * The blog's index: the shared article header, then the posts in the same
 * centred column, each a tile with its title beside it, after Ode's press
 * page.
 */
export const BlogIndexPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav edge />

    {/* A full screen under the nav before the footer, however short the
        list, as the careers hero fills the first screen. */}
    <Box
      as="main"
      id="main"
      minH={`calc(100svh - ${NAV_H}px)`}
      bg="site.bg.surface"
    >
      {/* The same header as the posts it lists. */}
      {/* The sales deck's cover title; the nav, address and tab stay "Blog". */}
      <ArticleHeader title="Institutional Intelligence" typed />

      <Section
        rhythm="none"
        pt={{ base: "56px", md: "80px" }}
        pb={{ base: "76px", md: "100px" }}
        bg="site.bg.surface"
      >
        <Box
          as="ul"
          maxW={COLUMN}
          mx="auto"
          display="flex"
          flexDirection="column"
          gap={{ base: "32px", md: "48px" }}
        >
          {POSTS.map((post) => (
            <li key={post.slug}>
              <PostItem post={post} />
            </li>
          ))}
        </Box>
      </Section>
    </Box>

    <SiteFooter />
  </Box>
);
