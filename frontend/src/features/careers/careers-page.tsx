import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { RULED_ROW_RULE, RuledRow } from "@/components/site/ruled-row";
import { NAV_H } from "@/components/site/site-constants";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteOutro } from "@/components/site/site-outro";
import { TypedText } from "@/components/site/typed-text";
import { dottedTop } from "@/components/site/site-styles";
import { OPEN_ROLES } from "@/features/careers/open-roles";
import { LogoMarquee } from "@/features/landing-v3/logo-marquee";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const rolePath = (roleId: string) =>
  rootRoute({}).careers({}).role({ roleId }).$;

/**
 * Careers, on the rebrand chrome: the landing's closing band as the hero,
 * then the team line with the scrolling logo strip, then the open roles as
 * ruled rows — department on the left, title and terms beside it — each
 * linking to the role's own page.
 */
export const CareersPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav overlay />

    <Box as="main" minH={`calc(100svh - ${NAV_H}px)`}>
      <SiteOutro
        heading={<TypedText text="Join us" />}
        headingAs="h1"
        cta="See open roles"
        ctaHref="#open-roles"
        fill
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
              From world class engineering teams
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
        <Grid rowGap="40px">
          <GridCol span={16} textAlign="center">
            <Text as="h2" textStyle="h2" color="site.fg.strong">
              Open roles
            </Text>
          </GridCol>
          <GridCol span={16}>
            <Box as="ul">
              {OPEN_ROLES.map((role) => (
                <li key={role.id}>
                  <Link
                    to={rolePath(role.id)}
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    {/* Ruled like the use-case accordion's rows. */}
                    <RuledRow>
                      <GridCol span={{ base: 16, lg: 5 }}>
                        <Text textStyle="label" color="slate.100">
                          {role.department}
                        </Text>
                      </GridCol>
                      <GridCol
                        span={{ base: 16, lg: 8 }}
                        display="flex"
                        flexDirection="column"
                        gap="12px"
                      >
                        <Text as="h3" textStyle="h6" color="site.fg">
                          {role.title}
                        </Text>
                        <Text textStyle="body.sm" color="site.fg.muted">
                          {role.location} • {role.employmentType}
                        </Text>
                      </GridCol>
                    </RuledRow>
                  </Link>
                </li>
              ))}
            </Box>
            {/* Closes the list with the same dotted rule as the rows'. */}
            <Box {...dottedTop(RULED_ROW_RULE)} />
          </GridCol>
        </Grid>
      </Section>
    </Box>

    <SiteFooter />
  </Box>
);
