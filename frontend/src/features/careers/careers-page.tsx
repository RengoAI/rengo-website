import { rootRoute } from "@/app/app-routes";
import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
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
      rhythm="none"
      bg="site.bg.surface"
      py="60px"
      minH="calc(100svh - 52px)"
    >
      <Grid rowGap="16px">
        <GridCol span={16} minH={{ lg: "138px" }}>
          <Text
            as="h1"
            textStyle="h2"
            fontSize={{ base: "32px", md: "36px" }}
            fontWeight={400}
            letterSpacing="-0.05em"
            color="site.fg.strong"
          >
            {/* Typed in like the about page's title. */}
            <TypedText text="Join us" />
          </Text>
        </GridCol>

        <GridCol span={16}>
          <Text textStyle="label" color="slate.100" py="16px">
            Open roles
          </Text>
          {OPEN_ROLES.map((role) => (
            <Link
              key={role.id}
              to={rolePath(role.id)}
              style={{ display: "block", textDecoration: "none" }}
            >
              {/* Ruled like the use-case accordion's rows. */}
              <Grid
                rowGap="12px"
                py="24px"
                borderTopWidth="1px"
                borderTopStyle="dotted"
                borderTopColor="site.border.dashed"
                transition="background 150ms ease"
                _hover={{ bg: "site.bg.tint" }}
              >
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
                  <Text textStyle="h6" color="site.fg">
                    {role.title}
                  </Text>
                  <Text textStyle="body.sm" color="site.fg.muted">
                    {role.location} • {role.employmentType}
                  </Text>
                </GridCol>
              </Grid>
            </Link>
          ))}
        </GridCol>
      </Grid>
    </Section>

    <SiteFooter />
  </Box>
);
