import { rootRoute } from "@/app/app-routes";
import { GridCol } from "@/components/layout/grid";
import { ARTICLE_MEASURE } from "@/components/site/article";
import { Section } from "@/components/layout/section";
import { NAV_H } from "@/components/site/site-constants";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import { TypedText } from "@/components/site/typed-text";
import { OPEN_ROLES, type OpenRole } from "@/features/careers/open-roles";
import { LogoMarquee } from "@/features/landing/logo-marquee";
import { Box, chakra, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const RouterLink = chakra(Link);

const rolePath = (roleId: string) =>
  rootRoute({}).careers({}).role({ roleId }).$;

/** The rows' rules: the soft solid hairline the article bylines use. */
const ROW_RULE = "1px solid rgba(21, 23, 24, 0.08)";

/**
 * One open role: the title with its department under it on the left, and
 * the location and terms with an arrow on the right. The arrow nudges on
 * hover; on phones the right side drops under the title.
 */
const RoleRow: React.FC<{ role: OpenRole }> = ({ role }) => (
  <RouterLink
    to={rolePath(role.id)}
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="space-between"
    columnGap="24px"
    rowGap="6px"
    py={{ base: "18px", md: "22px" }}
    textDecoration="none"
    css={{
      "& h3": { transition: "opacity 150ms ease" },
      "&:hover h3": { opacity: 0.6 },
      "& svg": { transition: "transform 150ms ease" },
      "&:hover svg": { transform: "translateX(3px)" },
    }}
  >
    <Box minW={0}>
      <Text
        as="h3"
        fontFamily="body"
        fontSize={{ base: "1.0625rem", md: "1.25rem" }}
        fontWeight={400}
        lineHeight="1.3"
        letterSpacing="-0.01em"
        color="site.fg.strong"
      >
        {role.title}
      </Text>
      <Text
        fontFamily="body"
        fontSize="0.875rem"
        color="site.fg.muted"
        mt="4px"
      >
        {role.department}
      </Text>
    </Box>
    <Box
      display="flex"
      alignItems="center"
      gap="12px"
      fontFamily="body"
      fontSize="0.875rem"
      color="site.fg.muted"
    >
      <span>
        {role.location} - {role.employmentType}
      </span>
      <Box as={ArrowRight} boxSize="16px" color="site.fg.strong" aria-hidden />
    </Box>
  </RouterLink>
);

/**
 * Careers, on the rebrand chrome: the landing's closing band as the hero,
 * then the team line with the scrolling logo strip, then the open roles as
 * ruled rows — department on the left, title and terms beside it — each
 * linking to the role's own page.
 */
export const CareersPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay edge />

    <Box as="main" id="main" minH={`calc(100svh - ${NAV_H}px)`}>
      <SiteOutro
        heading={<TypedText text="Join us" />}
        headingAs="h1"
        cta="See open roles"
        ctaHref="#open-roles"
        fill
        backdrop="wash"
      />

      {/* The landing's logo strip, on the same dark band, with the team line
          in place of its label. The strip's white logos are built for that
          band: plus-lighter over site.bg.dark. */}
      <Section
        grid
        rhythm="compact"
        bg="site.bg.dark"
        gridProps={{
          alignItems: "center",
          rowGap: { base: "32px", lg: "40px" },
        }}
      >
        <GridCol span={{ base: 16, lg: 8 }}>
          <Text as="h2" textStyle="h3" color="site.fg.onDark">
            We&rsquo;re a team of builders
            <Box
              as="span"
              display="block"
              fontWeight={300}
              color="site.fg.onDarkMuted"
            >
              From world-class engineering teams
            </Box>
          </Text>
        </GridCol>
        <GridCol span={16}>
          <LogoMarquee />
        </GridCol>
      </Section>

      <Section
        id="open-roles"
        rhythm="none"
        bg="site.bg.surface"
        minH="100svh"
        pt="96px"
        pb="60px"
        scrollMarginTop={`${NAV_H}px`}
      >
        {/* The article column, as on the blog index: a left-aligned
            heading, then one row per role. */}
        <Box maxW={`${ARTICLE_MEASURE}px`} mx="auto">
          <Text
            as="h2"
            fontFamily="body"
            fontSize={{ base: "2rem", md: "2.75rem" }}
            fontWeight={300}
            lineHeight="1.15"
            letterSpacing="-0.025em"
            color="site.fg.strong"
            mb={{ base: "28px", md: "40px" }}
          >
            Open roles
          </Text>
          <Box as="ul" borderTop={ROW_RULE}>
            {OPEN_ROLES.map((role) => (
              <Box as="li" key={role.id} borderBottom={ROW_RULE}>
                <RoleRow role={role} />
              </Box>
            ))}
          </Box>
        </Box>
      </Section>
    </Box>

    <SiteFooter />
  </Box>
);
