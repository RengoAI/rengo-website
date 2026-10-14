import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { RuledRow } from "@/components/site/ruled-row";
import { NAV_H } from "@/components/site/site-constants";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { dottedTop } from "@/components/site/site-styles";
import { TypedText } from "@/components/site/typed-text";
import { OPEN_ROLES } from "@/features/careers/open-roles";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const rolePath = (roleId: string) =>
  rootRoute({}).careers({}).role({ roleId }).$;

/**
 * Careers, on the rebrand chrome: "Join us", then the open roles as ruled
 * rows — department on the left, title and terms beside it — each linking
 * to the role's own page. Held open to at least the viewport, so the footer
 * starts below the fold.
 */
export const CareersPage: React.FC = () => (
  <Box bg="site.bg.page">
    <SiteNav />

    <Section
      as="main"
      rhythm="none"
      bg="site.bg.surface"
      py="60px"
      minH={`calc(100svh - ${NAV_H}px)`}
    >
      <Grid rowGap="16px">
        <GridCol span={16} minH={{ lg: "138px" }}>
          <Text as="h1" textStyle="h3" color="site.fg.strong">
            {/* Typed in like the about page's title. */}
            <TypedText text="Join us" />
          </Text>
        </GridCol>

        <GridCol span={16}>
          <Text as="h2" textStyle="label" color="slate.100" py="16px">
            Open roles
          </Text>
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
          <Box {...dottedTop()} />
        </GridCol>
      </Grid>
    </Section>

    <SiteFooter />
  </Box>
);
