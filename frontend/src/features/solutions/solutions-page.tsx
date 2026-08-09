import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import {
  SolutionContentSection,
  SolutionPhilosophyColumns,
  SolutionWideSection,
} from "@/features/solutions/solution-content-layout";
import {
  SOLUTIONS_PATH,
  SOLUTION_CAPABILITIES,
  SOLUTION_PILLARS,
} from "@/features/solutions/solutions";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

/**
 * The Solutions overview: the two capabilities as cards linking to their own
 * pages, then the framing pillars.
 */
export const SolutionsPage: React.FC = () => (
  <Box fontFamily="body" bg="slate.10">
    <PageHero
      headline="We build it. We run it."
      subtext="We build and run your firm's data infrastructure, then develop the applications and agents that work on top of it."
      ctaLabel="Get started"
      onCtaClick={openSalesMail}
      background={<HeroGridCanvas />}
    />

    <SolutionContentSection bg="slate.10" borderTop>
      <SectionHeading maxW="720px">
        What we build
        <br />
        <Box as="span" color="slate.50" fontWeight={300}>
          Applied AI and data infrastructure
        </Box>
      </SectionHeading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
        gap={{ base: 4, md: 5 }}
        w="full"
      >
        {SOLUTION_CAPABILITIES.map((c) => {
          const Icon = c.icon;
          return (
            <GridItem key={c.slug}>
              <Link
                to={`${SOLUTIONS_PATH}/${c.slug}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                }}
              >
                <Flex
                  role="group"
                  direction="column"
                  gap={5}
                  h="full"
                  bg="slate.20"
                  border="1px solid"
                  borderColor="slate.30"
                  borderRadius="3px"
                  p={{ base: 6, md: 8 }}
                  transition="border-color 150ms ease"
                  _hover={{ borderColor: "accent.link" }}
                >
                  <Box color="accent.link" display="flex">
                    <Icon size={22} strokeWidth={1.75} />
                  </Box>

                  <Flex direction="column" gap={3} flex="1">
                    <Text
                      fontFamily="heading"
                      fontWeight={350}
                      fontSize={{ base: "18px", md: "22px" }}
                      lineHeight={1.2}
                      letterSpacing="-0.72px"
                      color="indigo.900"
                      m={0}
                    >
                      {c.title}
                    </Text>
                    <Text
                      fontFamily="body"
                      fontSize="16px"
                      lineHeight="24px"
                      color="slate.50"
                      m={0}
                    >
                      {c.body}
                    </Text>
                  </Flex>

                  <Flex
                    align="center"
                    gap={2}
                    color="indigo.700"
                    _groupHover={{ color: "accent.link" }}
                    transition="color 150ms ease"
                  >
                    <Text fontFamily="body" fontSize="14px" m={0}>
                      Learn more
                    </Text>
                    <Box display="flex">
                      <ArrowRight size={15} strokeWidth={2} />
                    </Box>
                  </Flex>
                </Flex>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </SolutionContentSection>

    <SolutionWideSection bg="slate.20" borderTop>
      <SolutionPhilosophyColumns
        items={SOLUTION_PILLARS.map((p) => ({
          title: p.title,
          body: p.body,
        }))}
      />
    </SolutionWideSection>
  </Box>
);
