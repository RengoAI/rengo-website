import { rootRoute } from "@/app/app-routes";
import { GridCol } from "@/components/layout/grid";
import { ARTICLE_MEASURE } from "@/components/site/article";
import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H, NAV_H } from "@/components/site/site-constants";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import { TypedText } from "@/components/site/typed-text";
import {
  OPEN_ROLES,
  STAFF_GROUPS,
  type OpenRole,
} from "@/features/careers/open-roles";
import { LightField } from "@/components/site/light-field";
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
 * One open role, under its group's heading: the team ("Applied AI") on
 * the left, as the heading already says the rest of the title; the
 * location with an arrow on the right. The row fills softly on hover and
 * the arrow nudges; on phones the right side drops under the team.
 */
const RoleRow: React.FC<{ role: OpenRole }> = ({ role }) => (
  <RouterLink
    to={rolePath(role.id)}
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="space-between"
    columnGap="24px"
    rowGap="4px"
    px="12px"
    mx="-12px"
    py={{ base: "16px", md: "18px" }}
    borderRadius="6px"
    textDecoration="none"
    transition="background 150ms ease"
    _hover={{ bg: "site.bg.inset" }}
    css={{
      "& svg": { transition: "transform 150ms ease" },
      "&:hover svg": { transform: "translateX(3px)" },
    }}
  >
    <Text
      as="h3"
      fontFamily="body"
      fontSize={{ base: "1.0625rem", md: "1.125rem" }}
      fontWeight={400}
      lineHeight="1.35"
      color="site.fg.strong"
      minW={0}
    >
      {role.team}
    </Text>
    <Box
      display="flex"
      alignItems="center"
      gap="12px"
      fontFamily="body"
      fontSize="0.875rem"
      color="site.fg.muted"
    >
      <span>{role.location}</span>
      <Box as={ArrowRight} boxSize="16px" color="site.fg.strong" aria-hidden />
    </Box>
  </RouterLink>
);

/** The open roles by staff group, Technical Staff first; a group with no
 * open roles isn't shown. */
const GROUPS = STAFF_GROUPS.map((group) => ({
  group,
  roles: OPEN_ROLES.filter((role) => role.group === group),
})).filter(({ roles }) => roles.length > 0);

/**
 * Careers, on the rebrand chrome: the landing's closing band as the hero,
 * then the team line with the scrolling logo strip, then the open roles
 * by staff group (Technical Staff, Operating Staff), each row linking to
 * the role's own page.
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
        // A full screen, like the landing hero.
        fill
        backdrop="wash"
      />

      {/* The logo strip with the team line, on the Business Overview's
          navy-deep with the landing security band's dim steel beam. The
          strip's white logos blend plus-lighter over any dark ground. */}
      <Section
        grid
        bg="overview.navyDeep"
        position="relative"
        overflow="hidden"
        // As tall as its content, with the site's section padding: the
        // heading top left, the logos under it, the beam behind.
        gridProps={{
          alignItems: "center",
          rowGap: { base: "40px", lg: "64px" },
        }}
      >
        <LightField
          variant="beamSteelDark"
          position="absolute"
          inset={0}
          zIndex={0}
        />
        <GridCol span={{ base: 16, lg: 8 }} position="relative">
          <Text
            as="h2"
            // The section headings' size, as on the landing.
            textStyle="h4"
            fontWeight={400}
            lineHeight="1.1"
            color="site.fg.onDark"
          >
            We&rsquo;re a team of builders
            <Box as="span" display="block" color="overview.onDark2">
              From world-class engineering teams
            </Box>
          </Text>
        </GridCol>
        <GridCol span={16} position="relative">
          <LogoMarquee />
        </GridCol>
      </Section>

      <Section
        id="open-roles"
        // At least the landing's big moments' height, with the site's
        // section padding.
        bg="site.bg.surface"
        minH={FEATURE_BAND_MIN_H}
        scrollMarginTop={`${NAV_H}px`}
      >
        {/* The article column, as on the blog index: a left-aligned
            heading, then one row per role. */}
        <Box maxW={`${ARTICLE_MEASURE}px`} mx="auto">
          <Text
            as="h2"
            // The section headings' size, as on the landing.
            textStyle="h4"
            fontWeight={400}
            lineHeight="1.1"
            color="site.fg.heading"
            mb={{ base: "28px", md: "40px" }}
          >
            Open roles
          </Text>
          {/* Each staff group once, as a small grey heading over its roles. */}
          <Box
            display="flex"
            flexDirection="column"
            gap={{ base: "36px", md: "48px" }}
          >
            {GROUPS.map(({ group, roles }) => (
              <Box as="section" key={group} aria-label={group}>
                <Text
                  as="h3"
                  fontFamily="body"
                  fontSize="0.875rem"
                  color="site.fg.muted"
                  pb="10px"
                  borderBottom={ROW_RULE}
                >
                  {group}
                </Text>
                <Box as="ul">
                  {roles.map((role) => (
                    <Box as="li" key={role.id} borderBottom={ROW_RULE}>
                      <RoleRow role={role} />
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>
    </Box>

    <SiteFooter />
  </Box>
);
