import { rootRoute } from "@/app/app-routes";
import {
  ARTICLE_INK as INK,
  ARTICLE_MUTED as MUTED,
  ArticleBody,
  ArticleFlow,
  ArticleHeader,
  ArticleHeading,
  ArticleList,
  ArticleParagraph,
  PROSE,
  SMALL,
} from "@/components/site/article";
import { SiteFooter } from "@/components/site/site-footer";
import { colorVar } from "@/components/site/site-styles";
import { SiteNav } from "@/components/site/site-nav";
import { FIGURES } from "@/features/blog/blog-figures";
import { FIGURE_WELL } from "@/features/blog/blog-styles";
import {
  formatPostDate,
  getPostBySlug,
  readMinutes,
  type PostBlock,
} from "@/features/blog/posts";
import { useRequiredStringParams } from "@/shared/hooks/use-required-string-params";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router";

/** A graphic's or table's title, centred above it, as in the Business
 * Overview. */
const FigureTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text
    as="figcaption"
    fontFamily="body"
    fontSize="0.9375rem"
    fontWeight={400}
    lineHeight="1.4"
    color={INK}
    textAlign="center"
    mb="16px"
  >
    {children}
  </Text>
);

/** A graphic in a well, with its caption under it, led by its title. */
const Figure: React.FC<{
  block: Extract<PostBlock, { type: "figure" }>;
}> = ({ block }) => {
  const Graphic = FIGURES[block.figure];
  return (
    <Box as="figure" my="12px">
      <FigureTitle>{block.title}</FigureTitle>
      <Box
        {...FIGURE_WELL}
        // The same faint rule as the shapes inside it.
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="4px"
        px={{ base: "16px", md: "40px" }}
        py="40px"
      >
        <Graphic />
      </Box>
      {block.caption && (
        <Text {...SMALL} mt="12px">
          {block.caption}
        </Text>
      )}
    </Box>
  );
};

/*
 * The app's table chrome (@rengo/ui widget card and data table): a 1px
 * outline, 8px corners and its near-white surface, with solid hairline
 * dividers. The rules are border.subtle, the figures' faint rule.
 */
const TABLE_BORDER = colorVar("border.subtle");
const TABLE_SURFACE = "#FCFCFC"; // app bg.surface (gray.25)
const TABLE_HEADER = "canvas.300";
/** The database column's shading, as in the Business Overview. */
const DATABASE_TINT = "site.figure.highlight";

/**
 * Two ways of doing something, side by side, in the app's table card. From
 * tablets up it's a table: a header row, the row labels down the left and a
 * column for each way, the second tinted. On phones each row stacks, its
 * two cells named by their column.
 */
const Comparison: React.FC<{
  block: Extract<PostBlock, { type: "comparison" }>;
}> = ({ block }) => {
  const columns = { base: "1fr", md: "1fr 1.6fr 1.6fr" };
  const tint = (i: number) => (i === 1 ? DATABASE_TINT : undefined);
  const rule = `1px solid ${TABLE_BORDER}`;
  const COLUMN_LABEL = {
    ...SMALL,
    color: INK,
    fontWeight: 500,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  } as const;
  return (
    <Box as="figure" my="12px">
      {block.title && <FigureTitle>{block.title}</FigureTitle>}
      <Box
        role="table"
        aria-label={block.title ?? "Comparison"}
        border={rule}
        borderRadius="8px"
        bg={TABLE_SURFACE}
        overflow="hidden"
      >
        <Box
          role="row"
          display={{ base: "none", md: "grid" }}
          gridTemplateColumns={columns.md}
          bg={TABLE_HEADER}
          borderBottom={rule}
        >
          <Box role="columnheader" />
          {block.columns.map((column, i) => (
            <Text
              key={column}
              role="columnheader"
              {...COLUMN_LABEL}
              px="16px"
              py="12px"
              bg={tint(i)}
            >
              {column}
            </Text>
          ))}
        </Box>
        {block.rows.map((row, r) => (
          <Box
            key={row.label}
            role="row"
            display="grid"
            gridTemplateColumns={columns}
            rowGap={{ base: "10px", md: 0 }}
            p={{ base: "16px", md: 0 }}
            borderTop={r === 0 ? undefined : rule}
          >
            <Text
              role="rowheader"
              {...SMALL}
              color={INK}
              fontWeight={400}
              px={{ md: "16px" }}
              py={{ md: "14px" }}
            >
              {row.label}
            </Text>
            {row.cells.map((cell, i) => (
              <Box
                key={block.columns[i]}
                role="cell"
                px={{ base: i === 1 ? "12px" : 0, md: "16px" }}
                py={{ base: i === 1 ? "10px" : 0, md: "14px" }}
                bg={tint(i)}
                borderRadius={{ base: i === 1 ? "6px" : 0, md: 0 }}
              >
                <Text
                  display={{ md: "none" }}
                  {...COLUMN_LABEL}
                  color={MUTED}
                  mb="2px"
                >
                  {block.columns[i]}
                </Text>
                <Text {...SMALL} color={INK}>
                  {cell}
                </Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      {block.caption && (
        <Text {...SMALL} mt="12px">
          {block.caption}
        </Text>
      )}
    </Box>
  );
};

/**
 * Text with the given phrases in bold, as the source bolds them: an
 * explicit choice per post (see AGENTS.md).
 */
const emphasise = (text: string, phrases: string[] = []): React.ReactNode => {
  if (!phrases.length) return text;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, i) =>
    phrases.includes(part) ? (
      <chakra.strong key={i} fontWeight={700}>
        {part}
      </chakra.strong>
    ) : (
      part
    ),
  );
};

const Block: React.FC<{ block: PostBlock }> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <ArticleParagraph>
          {emphasise(block.text, block.emphasis)}
        </ArticleParagraph>
      );
    case "heading":
      return <ArticleHeading text={block.text} />;
    case "list":
      return <ArticleList items={block.items} ordered={block.ordered} />;
    case "quote":
      return (
        <Box
          as="blockquote"
          borderLeft="2px solid"
          borderColor="site.border"
          pl="20px"
          my="8px"
        >
          <Text
            fontFamily="body"
            fontSize={{ base: "1.125rem", md: "1.25rem" }}
            lineHeight="1.45"
            color={INK}
          >
            {block.text}
          </Text>
        </Box>
      );
    case "figure":
      return <Figure block={block} />;
    case "comparison":
      return <Comparison block={block} />;
  }
};

/**
 * One post, in the site's long-read layout (components/site/article): the
 * header on the colour wash, then the body in one reading column.
 */
export const BlogPostPage: React.FC = () => {
  const { slug } = useRequiredStringParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to={rootRoute({}).blog({}).$} replace />;
  }

  return (
    <Box bg="site.bg.page">
      <SiteNav edge />

      <Box as="main" id="main">
        <Box as="article">
          <ArticleHeader
            // The calmest band for reading: an even haze fading in from the left.
            light="bandHaze"
            back={{ to: rootRoute({}).blog({}).$, label: "Blog" }}
            title={post.title}
            dek={post.dek}
            properties={[
              `${post.author.name}, ${post.author.role}`,
              <chakra.time key="date" dateTime={post.date}>
                {formatPostDate(post.date)}
              </chakra.time>,
              `${readMinutes(post)} min read`,
            ]}
          />

          <ArticleBody
            contents={post.body.flatMap((block) =>
              block.type === "heading" ? [block.text] : [],
            )}
          >
            {/* The argument up front, for readers who only have a minute. */}
            {post.shortVersion && (
              <Box as="section" aria-label="The short version" mb="32px">
                <Text {...PROSE} mb="6px">
                  The short version
                </Text>
                <ArticleParagraph>{post.shortVersion}</ArticleParagraph>
              </Box>
            )}

            <Box
              mt={post.shortVersion ? { base: "36px", md: "44px" } : 0}
              // The body's paragraphs and lists in the Business Overview's
              // face, EB Garamond, set a size up for its smaller x-height.
              // Figures and tables keep the site's sans.
              css={{
                "& > div > p, & > div > ul, & > div > ol": {
                  fontFamily: "var(--rengo-fonts-garamond)",
                  fontSize: "1.1875rem",
                  lineHeight: "1.55",
                },
              }}
            >
              <ArticleFlow>
                {post.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </ArticleFlow>
            </Box>
          </ArticleBody>
        </Box>
      </Box>

      <SiteFooter />
    </Box>
  );
};
