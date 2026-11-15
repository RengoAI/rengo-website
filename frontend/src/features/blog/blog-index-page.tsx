import { Section } from "@/components/layout/section";
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

/** The post page's type: one ink, with a muted tier. */
/*
 * As in the app's settings cards: descriptions in ink, a size down, with
 * the title in medium weight; only the smallest details (the date line) go
 * grey, and a darker, neutral one.
 */
const INK = "site.fg.strong";
const TEXT = "site.fg";
const MUTED = "soot.600";
const BODY = { fontFamily: "body", fontSize: "1rem", lineHeight: "1.6" };

/** The list's column, centred, as on Ode's press page. */
const COLUMN = "760px";

/** The date and read time: small, spaced and monospaced. */
const META = {
  fontFamily: "mono",
  fontSize: "11px",
  lineHeight: "1.4",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: MUTED,
} as const;

/**
 * One post: its tile on the left, and beside it, centred on the tile, the
 * title, summary, and the date and read time.
 */
const PostItem: React.FC<{ post: Post }> = ({ post }) => (
  <RouterLink
    to={postPath(post.slug)}
    display="grid"
    gridTemplateColumns={{ base: "80px 1fr", md: "120px 1fr" }}
    alignItems="center"
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
    <Box display="flex" flexDirection="column" minW={0}>
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
      {/* "Nov 15, 2026 – 2 min read": an en dash between the two. */}
      <Text {...META} mt="12px">
        <chakra.time dateTime={post.date}>
          {formatPostDateShort(post.date)}
        </chakra.time>
        <chakra.span aria-hidden mx="8px">
          –
        </chakra.span>
        {readMinutes(post)} min read
      </Text>
    </Box>
  </RouterLink>
);

/**
 * The blog's index: the heading, then the posts in one
 * centred column, each a tile with its title beside it, well spaced, after
 * Ode's press page.
 */
export const BlogIndexPage: React.FC = () => (
  // At least a screen tall, so the footer sits at the bottom while the
  // list is short.
  <Box bg="site.bg.page" minH="100svh" display="flex" flexDirection="column">
    <SiteNav />

    <Box as="main" id="main" flex="1" bg="site.bg.surface">
      <Section
        rhythm="none"
        pt={{ base: "48px", md: "72px" }}
        pb="0"
        bg="site.bg.surface"
      >
        <Box maxW={COLUMN} mx="auto">
          <Text
            as="h1"
            fontFamily="body"
            fontSize={{ base: "2rem", md: "2.75rem" }}
            fontWeight={300}
            lineHeight="1.2"
            letterSpacing="-0.02em"
            color={INK}
          >
            Blog
          </Text>
        </Box>
      </Section>

      <Section
        rhythm="none"
        pt={{ base: "36px", md: "48px" }}
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
