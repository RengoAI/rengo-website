import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { SectionShell } from "@/features/landing/sections/section-shell";
import {
  SOLUTIONS_PATH,
  SOLUTION_CAPABILITIES,
  SOLUTION_PILLARS,
} from "@/features/solutions/solutions";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

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
      onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      background={<HeroGridCanvas />}
    />

    <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))" }}
        gap={{ base: 4, md: 5 }}
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
                      fontSize={{ base: "24px", md: "28px" }}
                      lineHeight={1.15}
                      letterSpacing="-0.6px"
                      color="indigo.900"
                      m={0}
                    >
                      {c.title}
                    </Text>
                    <Text
                      fontFamily="body"
                      fontSize={{ base: "15px", md: "16px" }}
                      lineHeight={1.6}
                      color="slate.100"
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
    </SectionShell>

    <SectionShell borderTop bg="slate.20" py={{ base: 16, md: "80px" }}>
      <Flex direction="column" gap={{ base: 12, md: "56px" }}>
        {SOLUTION_PILLARS.map((p) => (
          <Flex
            key={p.n}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 3, md: 12 }}
            align="flex-start"
          >
            <Text
              fontFamily="mono"
              fontSize="12px"
              letterSpacing="1px"
              color="accent.link"
              flexShrink={0}
              minW={{ md: "48px" }}
              pt={{ md: 1 }}
              m={0}
            >
              {p.n}
            </Text>
            <Flex direction="column" gap={4} maxW="640px">
              <Text
                fontFamily="heading"
                fontSize={{ base: "22px", md: "26px" }}
                lineHeight={1.15}
                letterSpacing="-0.5px"
                color="indigo.900"
                m={0}
              >
                {p.title}
              </Text>
              <Text
                fontFamily="body"
                fontSize={{ base: "15px", md: "16px" }}
                lineHeight={1.6}
                color="slate.100"
                m={0}
              >
                {p.body}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </SectionShell>
  </Box>
);
