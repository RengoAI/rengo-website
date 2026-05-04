import { PageHero } from "@/components/layout/page-hero";
import { TeamLogoGrid } from "@/components/team-logo-grid";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const BuiltBySection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    px={20}
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <Box maxW="700px" mb={16}>
      <Box
        as="h2"
        fontFamily="heading"
        fontSize={{ base: "34px", md: "48px" }}
        fontWeight={400}
        lineHeight={1.06}
        letterSpacing="-0.03em"
        color={"primary.800"}
        m={0}
        mb={4}
      >
        Join a world class team
      </Box>
      <Text fontSize="md" lineHeight={1.65} color="gray.500" maxW="580px">
        We are a small team bringing together experience from enterprise
        software, lending infrastructure, hedge funds, and private markets
        systems.
      </Text>
    </Box>

    <TeamLogoGrid />
  </Box>
);

export const CareersPage: React.FC = () => (
  <Box fontFamily='"Inter Tight", Inter, sans-serif'>
    <PageHero
      headline="Help us reimagine private markets infrastructure"
      subtext="We're hiring across engineering and product"
      ctaLabel="Get in touch"
      onCtaClick={() => window.open("mailto:careers@rengoai.com", "_blank")}
    />
    <BuiltBySection />
  </Box>
);
