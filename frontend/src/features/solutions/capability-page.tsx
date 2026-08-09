import { PageHero } from "@/components/layout/page-hero";
import { HeroGridCanvas } from "@/features/landing/sections/hero-grid-canvas";
import { CtaSection } from "@/features/landing/sections/cta-section";
import { SectionShell } from "@/features/landing/sections/section-shell";
import {
  type SolutionCapability,
} from "@/features/solutions/solutions";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import React from "react";

const openSalesMail = () =>
  window.open("mailto:sales@rengoai.com", "_blank", "noopener,noreferrer");

/**
 * Shared template for the capability pages under /solutions.
 *
 * Both capabilities have the same shape — hero, the "what we do" paragraph with
 * its checklist, then the numbered sections — so they are one component driven
 * by data rather than two near-identical files that drift apart.
 */
export const CapabilityPage: React.FC<{ capability: SolutionCapability }> = ({
  capability: c,
}) => {
  const Icon = c.icon;

  return (
    <Box fontFamily="body" bg="slate.10">
      <PageHero
        headline={c.title}
        subtext={c.lede}
        ctaLabel="Get started"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
        background={<HeroGridCanvas />}
      />

      <SectionShell bg="slate.10" py={{ base: 14, md: "72px" }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 16 }}
          align="flex-start"
        >
          <Flex direction="column" gap={4} flex="1" minW={0}>
            <Box color="accent.link" display="flex">
              <Icon size={22} strokeWidth={1.75} />
            </Box>
            <Text
              fontFamily="body"
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight={1.6}
              color="indigo.900"
              maxW="54ch"
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
      </SectionShell>

      <SectionShell bg="slate.20" py={{ base: 16, md: "80px" }}>
        <Flex direction="column" gap={{ base: 12, md: "64px" }}>
          {c.sections.map((s, i) => (
            <Flex
              key={s.title}
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
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Flex direction="column" gap={4} maxW="640px">
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "22px", md: "28px" }}
                  lineHeight={1.15}
                  letterSpacing="-0.5px"
                  color="indigo.900"
                  m={0}
                >
                  {s.title}
                </Text>
                <Text
                  fontFamily="body"
                  fontSize={{ base: "15px", md: "16px" }}
                  lineHeight={1.6}
                  color="slate.100"
                  m={0}
                >
                  {s.body}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </SectionShell>

      <CtaSection onTalkToSales={openSalesMail} borderTop={false} />
    </Box>
  );
};
