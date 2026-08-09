import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { SectionShell } from "@/features/landing/sections/section-shell";
import {
  SOLUTION_CAPABILITIES,
  SOLUTION_PILLARS,
} from "@/features/solutions/solutions";
import { useHashScroll } from "@/features/solutions/use-hash-scroll";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import React from "react";

/**
 * The single Solutions page: the three capabilities, then the framing pillars.
 *
 * Each capability carries an id so the nav dropdown can link straight to it.
 * Child pages were tried first and were each a bare hero; anchors give the same
 * navigation without pages there is nothing to put on.
 */
export const SolutionsPage: React.FC = () => {
  useHashScroll();

  return (
    <Box fontFamily="body" bg="slate.10">
      <PageHero
        headline="We build it. We run it."
        subtext="We build and run your firm's data infrastructure, then develop the applications and agents that work on top of it."
        ctaLabel="Get started"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
        background={<HeroGridCanvas />}
      />

      <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
        <Flex direction="column" gap={{ base: 14, md: "88px" }}>
          {SOLUTION_CAPABILITIES.map((c) => {
            const Icon = c.icon;
            return (
              /* scrollMarginTop keeps the fixed header from covering the
                 heading when the hash lands here. */
              <Box key={c.id} id={c.id} scrollMarginTop="96px">
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 6, md: 16 }}
                  align="flex-start"
                >
                  <Flex direction="column" gap={4} flex="1" minW={0}>
                    <Flex align="center" gap={2.5}>
                      <Box color="accent.link" display="flex">
                        <Icon size={18} strokeWidth={1.75} />
                      </Box>
                      <Text
                        fontFamily="mono"
                        fontSize="11px"
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        color="slate.50"
                        m={0}
                      >
                        {c.summary}
                      </Text>
                    </Flex>

                    <Text
                      fontFamily="heading"
                      fontSize={{ base: "26px", md: "34px" }}
                      lineHeight={1.12}
                      letterSpacing="-0.8px"
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
                      maxW="52ch"
                      m={0}
                    >
                      {c.body}
                    </Text>
                  </Flex>

                  <Flex
                    direction="column"
                    gap={2.5}
                    flexShrink={0}
                    w={{ base: "full", md: "300px" }}
                    pt={{ md: 9 }}
                  >
                    {c.detail.map((d) => (
                      <Flex key={d} align="flex-start" gap={2.5}>
                        <Box color="accent.link" pt="2px" display="flex">
                          <Check size={13} strokeWidth={2.5} />
                        </Box>
                        <Text
                          fontFamily="body"
                          fontSize="14px"
                          lineHeight={1.45}
                          color="slate.100"
                          m={0}
                        >
                          {d}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Flex>
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
};
