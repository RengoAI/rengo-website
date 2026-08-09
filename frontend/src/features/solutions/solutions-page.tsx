import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { SectionShell } from "@/features/landing/sections/section-shell";
import { SOLUTION_PILLARS } from "@/features/solutions/solutions";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const PILLARS_SECTION_ID = "how-we-work";

/**
 * The single Solutions page: a hero and the pillars, numbered.
 *
 * Replaces two child pages that were each a bare hero and whose titles, URLs
 * and categories disagreed about whether the axis was audience or capability.
 * One page states how the firm works and can be sent as a link; segmenting by
 * audience needs more case studies than there are today.
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

    <Box id={PILLARS_SECTION_ID}>
      <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
        <Flex direction="column" gap={{ base: 12, md: "64px" }}>
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
                  fontSize={{ base: "24px", md: "30px" }}
                  lineHeight={1.15}
                  letterSpacing="-0.6px"
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
  </Box>
);
