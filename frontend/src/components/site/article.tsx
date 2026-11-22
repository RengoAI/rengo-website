import { Section } from "@/components/layout/section";
import { NAV_H } from "@/components/site/site-constants";
import { colorVar, hoverFade } from "@/components/site/site-styles";
import { LightField } from "@/components/site/light-field";
import { TypedText } from "@/components/site/typed-text";
import { prefersReducedMotion } from "@/shared/utils/motion";
import { Box, chakra, Text } from "@chakra-ui/react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import React from "react";
import { Link } from "react-router";

/**
 * The site's long-read layout, shared by blog posts and careers roles: a
 * header on the colour wash (a link back, the title, an optional italic
 * line and one line of properties), then the body in a single reading
 * column, in a few sizes of one ink.
 */

const RouterLink = chakra(Link);

/** Text and headings. */
export const ARTICLE_INK = "site.fg.strong";
/** Secondary details: a darker, neutral grey, as in the app. */
export const ARTICLE_MUTED = "soot.600";

/** The reading measure, px. */
export const ARTICLE_MEASURE = 680;

/** How far a title may run on wide screens, px: past the column, so the
 * longest current titles (about 890px at 44px) hold one line. */
const TITLE_MEASURE = 920;

/** Body copy. */
export const PROSE = {
  fontFamily: "body",
  fontSize: "1rem",
  lineHeight: "1.6",
  color: ARTICLE_INK,
} as const;

/** Captions, the contents and other small print. */
export const SMALL = {
  fontFamily: "body",
  fontSize: "0.875rem",
  lineHeight: "1.5",
  color: ARTICLE_MUTED,
} as const;

/** Headings land under the sticky nav, with room above. */
const ANCHOR_OFFSET = `${NAV_H + 24}px`;

/** A heading's anchor: "What changes with…" → "what-changes-with". */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Scrolls to a section and puts its anchor in the address. The router takes
 * over in-page links, so the browser's own jump never happens; the site
 * outro's button does the same.
 */
const goToSection = (event: React.MouseEvent, id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.pushState(null, "", `#${id}`);
};

/** A plain link back to the section's index, over the title, at the byline's size. */
const BackLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <chakra.nav aria-label="Breadcrumb">
    <RouterLink
      to={to}
      display="inline-flex"
      alignItems="center"
      gap="6px"
      fontFamily="body"
      fontSize="0.9375rem"
      color={ARTICLE_INK}
      textDecoration="none"
      {...hoverFade}
      css={{
        "& svg": { transition: "transform 150ms ease" },
        "&:hover svg": { transform: "translateX(-2px)" },
      }}
    >
      <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
      {label}
    </RouterLink>
  </chakra.nav>
);

/**
 * The header, on the colour wash: the link back, the title, an optional
 * italic line, and one line of properties set apart by space, the first in
 * ink and the rest muted.
 */
export const ArticleHeader: React.FC<{
  /** The link back to the section's index, if it has one. */
  back?: { to: string; label: string };
  title: string;
  dek?: string;
  /** Who, when, how long; an index page has none. */
  properties?: React.ReactNode[];
  /** Type the title in, as the careers hero does: for index pages. */
  typed?: boolean;
}> = ({ back, title, dek, properties = [], typed = false }) => (
  <Section
    as="header"
    rhythm="none"
    pt={{ base: "56px", md: "88px" }}
    pb={{ base: "48px", md: "72px" }}
    position="relative"
    overflow="hidden"
  >
    {/* The page bands' light, in the Business Overview's colours. */}
    <LightField variant="washBand" position="absolute" inset={0} />
    <Box position="relative" maxW={`${ARTICLE_MEASURE}px`} mx="auto">
      {back && (
        <Box mb={{ base: "28px", md: "36px" }}>
          <BackLink {...back} />
        </Box>
      )}
      <Text
        as="h1"
        fontFamily="body"
        fontSize={{ base: "2rem", md: "2.75rem" }}
        fontWeight={300}
        lineHeight="1.15"
        letterSpacing="-0.025em"
        color={ARTICLE_INK}
        textWrap="balance"
        // From 1280px the title may run past the reading column to the
        // right, up to TITLE_MEASURE, so most titles hold one line; its left
        // edge stays with the text.
        mr={{ xl: `${ARTICLE_MEASURE - TITLE_MEASURE}px` }}
      >
        {typed ? <TypedText text={title} /> : title}
      </Text>
      {/* The italic line in EB Garamond, as the Business Overview sets its
          subtitles and the blog index its descriptions; a size up for
          Garamond's smaller letters. */}
      {dek && (
        <Text
          fontFamily="garamond"
          fontSize={{ base: "1.25rem", md: "1.4375rem" }}
          fontStyle="italic"
          fontWeight={400}
          lineHeight="1.35"
          color={ARTICLE_INK}
          mt="14px"
        >
          {dek}
        </Text>
      )}
      {/* A byline under a soft rule: the first property (the author, the
          group) on the left, the rest on the right with a hyphen
          between them, as on the blog index. Stacks on narrow screens. */}
      {properties.length > 0 && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="baseline"
          columnGap="24px"
          rowGap="4px"
          mt={{ base: "24px", md: "32px" }}
          pt="14px"
          // A soft solid hairline: the ink at low opacity, so it shows
          // faintly on the wash.
          borderTop="1px solid rgba(21, 23, 24, 0.08)"
          {...PROSE}
          fontSize="0.9375rem"
          color={ARTICLE_MUTED}
        >
          <chakra.span color={ARTICLE_INK}>{properties[0]}</chakra.span>
          {properties.length > 1 && (
            <span>
              {properties.slice(1).map((property, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <chakra.span aria-hidden mx="8px">
                      -
                    </chakra.span>
                  )}
                  {property}
                </React.Fragment>
              ))}
            </span>
          )}
        </Box>
      )}
    </Box>
  </Section>
);

/** Pages with at least this many sections list them. */
const CONTENTS_MIN = 3;

/** Where the reader is: the last heading scrolled past the nav. */
const useActiveHeading = (ids: string[]) => {
  const [active, setActive] = React.useState<string | undefined>(ids[0]);
  React.useEffect(() => {
    if (!ids.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // A third of the way down the screen, so a section counts once its
      // heading is comfortably in view.
      const line = Math.max(NAV_H + 48, window.innerHeight / 3);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the foot of the page the last sections can't scroll that high.
      // Only once the reader has scrolled: on load the page may not have
      // its full height yet, and would look as if it were at the foot.
      const atEnd =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;
      setActive(atEnd ? ids[ids.length - 1] : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
};

/**
 * The sections as links, in the Business Overview's ink: the one being read
 * in navy at medium weight, the rest in slate at regular weight.
 */
const ContentsLinks: React.FC<{
  headings: string[];
  active?: string;
}> = ({ headings, active }) => (
  <Box as="ol" display="flex" flexDirection="column" gap="6px">
    {headings.map((text) => {
      const id = headingId(text);
      const current = id === active;
      return (
        <li key={text}>
          <chakra.a
            href={`#${id}`}
            onClick={(event) => goToSection(event, id)}
            aria-current={current ? "location" : undefined}
            {...SMALL}
            display="block"
            // The Business Overview's ink: slate, the one being read navy.
            color={current ? "overview.navy" : "overview.slate"}
            fontWeight={current ? 500 : 400}
            textDecoration="none"
            transition="color 150ms ease"
            _hover={{ color: "overview.navy" }}
          >
            {text}
          </chakra.a>
        </li>
      );
    })}
  </Box>
);

/**
 * The sections of a longer page, from 1280px: a list in the left margin
 * that stays in view and marks the section being read.
 */
const MarginContents: React.FC<{ headings: string[] }> = ({ headings }) => {
  const ids = React.useMemo(() => headings.map(headingId), [headings]);
  const active = useActiveHeading(ids);
  return (
    <Box
      display={{ base: "none", xl: "block" }}
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      w="200px"
    >
      <chakra.nav
        aria-label="On this page"
        position="sticky"
        top={`${NAV_H + 32}px`}
      >
        {/* A label for the list, not an entry in it: smaller and grey. */}
        <Text {...SMALL} fontSize="0.75rem" color="overview.slate" mb="10px">
          On this page
        </Text>
        <ContentsLinks headings={headings} active={active} />
      </chakra.nav>
    </Box>
  );
};

/** The box, at the top of the column on narrower screens. */
const BoxContents: React.FC<{ headings: string[] }> = ({ headings }) => (
  <chakra.details
    display={{ base: "block", xl: "none" }}
    open
    // The Business Overview's panel tint, as the landing's customer quote
    // section: a quiet cool grey that sits with the page, with a fine edge.
    bg="overview.tint"
    border="1px solid"
    borderColor="border.subtle"
    borderRadius="4px"
    px="16px"
    py="14px"
    mb={{ base: "32px", md: "40px" }}
    css={{
      "& > summary::-webkit-details-marker": { display: "none" },
      "&[open] > summary svg": { transform: "rotate(180deg)" },
    }}
  >
    <chakra.summary
      listStyle="none"
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...SMALL}
      color="overview.navy"
    >
      On this page
      <ChevronDown size={14} style={{ transition: "transform 150ms" }} />
    </chakra.summary>
    <Box mt="10px">
      <ContentsLinks headings={headings} />
    </Box>
  </chakra.details>
);

/**
 * The body: one reading column on the page surface. Given its section
 * headings, a page with three or more lists them: in the margin from
 * 1280px, in a box at the top below that.
 */
export const ArticleBody: React.FC<{
  children: React.ReactNode;
  contents?: string[];
}> = ({ children, contents = [] }) => {
  const listed = contents.length >= CONTENTS_MIN;
  return (
    <Section
      rhythm="none"
      pt={{ base: "40px", md: "56px" }}
      pb={{ base: "76px", md: "100px" }}
      bg="site.bg.surface"
    >
      <Box position="relative">
        {listed && <MarginContents headings={contents} />}
        <Box maxW={`${ARTICLE_MEASURE}px`} mx="auto">
          {listed && <BoxContents headings={contents} />}
          {children}
        </Box>
      </Box>
    </Section>
  );
};

/** The body's blocks, evenly spaced. */
export const ArticleFlow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box display="flex" flexDirection="column" gap="20px">
    {children}
  </Box>
);

/** A section heading, with a # to link to it on hover. */
export const ArticleHeading: React.FC<{ text: string }> = ({ text }) => {
  const id = headingId(text);
  return (
    <Text
      as="h2"
      id={id}
      fontFamily="body"
      fontSize={{ base: "1.25rem", md: "1.375rem" }}
      // Regular: the headings lead by size, not weight.
      fontWeight={400}
      lineHeight="1.3"
      letterSpacing="-0.01em"
      color={ARTICLE_INK}
      mt="28px"
      position="relative"
      scrollMarginTop={ANCHOR_OFFSET}
      css={{ "&:hover > a": { opacity: 1 } }}
    >
      <chakra.a
        href={`#${id}`}
        onClick={(event) => goToSection(event, id)}
        aria-label={`Link to ${text}`}
        position="absolute"
        right="100%"
        pr="10px"
        fontWeight={400}
        color={ARTICLE_MUTED}
        textDecoration="none"
        opacity={0}
        transition="opacity 150ms ease"
        display={{ base: "none", lg: "block" }}
        _focusVisible={{ opacity: 1 }}
      >
        #
      </chakra.a>
      {text}
    </Text>
  );
};

/** A heading within a section, a step under ArticleHeading. */
export const ArticleSubheading: React.FC<{ text: string }> = ({ text }) => (
  <Text
    as="h3"
    fontFamily="body"
    fontSize="1.0625rem"
    fontWeight={400}
    lineHeight="1.4"
    color={ARTICLE_INK}
    mt="8px"
  >
    {text}
  </Text>
);

/** A paragraph of body copy. */
export const ArticleParagraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <chakra.p {...PROSE}>{children}</chakra.p>;

/** A bulleted or numbered list, in body copy with muted markers. */
export const ArticleList: React.FC<{ items: string[]; ordered?: boolean }> = ({
  items,
  ordered,
}) => (
  <Box
    as={ordered ? "ol" : "ul"}
    pl="1.5em"
    listStyleType={ordered ? "decimal" : "disc"}
    display="flex"
    flexDirection="column"
    gap="6px"
    {...PROSE}
    css={{ "& li::marker": { color: colorVar(ARTICLE_MUTED) } }}
  >
    {items.map((item) => (
      <Box as="li" key={item} pl="4px">
        {item}
      </Box>
    ))}
  </Box>
);
