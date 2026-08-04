import { rootRoute } from "@/app/app-routes";
import { PageContainer } from "@/components/layout/page-container";
import { PageHero } from "@/components/layout/page-hero";
import { TeamLogoGrid } from "@/components/team-logo-grid";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const INVESTORS = ["Primary Ventures", "Inverted Capital"] as const;
const ANGELS = [
  "Tiger Global",
  "Marshall Wace",
  "S&P Global",
  "Maybern",
] as const;

const FOUNDERS = [
  {
    name: "Erik Ronning",
    role: "Co-founder & CEO",
    bio: "Previously a Founding Engineer at Maybern, where he led engineering and pioneered automations across fund-level waterfalls, management fees, and back-office workflows.",
  },
  {
    name: "Grant Gustafson",
    role: "Co-founder & CTO",
    bio: "Former Head of Quantamental Engineering at Marshall Wace, where he built and owned data and AI infrastructure for institutional research and systematic investing at a $70B investment manager.",
  },
] as const;

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const MissionSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
        gap={{ base: 14, lg: 20 }}
        alignItems="start"
      >
        <Box>
          <Text
            fontFamily={EDICT}
            fontSize="xs"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="primary.700"
            mb={6}
          >
            Your data is your alpha
          </Text>
          <Box
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "36px", md: "52px" }}
            fontWeight="normal"
            lineHeight={1.04}
            letterSpacing="-0.035em"
            color="primary.800"
            maxW="620px"
            m={0}
          >
            The AI deployment company for investment firms
          </Box>
        </Box>

        <Box>
          <Text fontSize="lg" lineHeight={1.75} color="gray.600" maxW="720px" mb={6}>
            Private markets have expanded into a mainstream part of global
            capital allocation, but the infrastructure supporting them has not
            kept pace.
          </Text>
          <Text fontSize="lg" lineHeight={1.75} color="gray.600" maxW="720px">
            Rengo AI deploys applications and agents that turn raw investment
            data — files, ledgers, portals, and decisions — into a structured
            system of record that both your team and your AI can act on.
          </Text>
        </Box>
      </Box>
    </PageContainer>
  </Box>
);

const FoundersSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="680px" mb={16}>
        <Text
          fontFamily={EDICT}
          fontSize="xs"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={5}
        >
          Founders
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "48px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={4}
        >
          We know the work
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="gray.500" maxW="560px">
          Our team brings experience across asset-management workflows and
          infrastructure.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
      >
        {FOUNDERS.map((founder) => (
          <Box
            key={founder.name}
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={{ base: 8, md: 10 }}
            minH="280px"
            display="flex"
            flexDirection="column"
          >
            <Box
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="normal"
              letterSpacing="-0.02em"
              color="primary.800"
              m={0}
              mb={2}
            >
              {founder.name}
            </Box>
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="primary.500"
              mb={6}
            >
              {founder.role}
            </Text>
            <Text fontSize="md" lineHeight={1.65} color="gray.600">
              {founder.bio}
            </Text>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

const BuiltBySection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="680px" mb={16}>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "48px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={4}
        >
          From people behind leading products
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="gray.500" maxW="560px">
          Experience from category-defining technology, financial services, and
          private markets companies.
        </Text>
      </Box>

      <TeamLogoGrid />
    </PageContainer>
  </Box>
);

const InvestorsSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <PageContainer>
      <Box maxW="680px" mb={16}>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "34px", md: "48px" }}
          fontWeight="normal"
          lineHeight={1.06}
          letterSpacing="-0.03em"
          color="primary.800"
          m={0}
          mb={4}
        >
          Backed by investors
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="gray.500" maxW="560px">
          Supported by venture investors and angels with experience across
          public markets, private markets, and financial data infrastructure.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="border.muted"
      >
        {[
          ["Investors", INVESTORS],
          ["Angels from", ANGELS],
        ].map(([label, names]) => (
          <Box
            key={label as string}
            minH="156px"
            borderRight="1px solid"
            borderBottom="1px solid"
            borderColor="border.muted"
            p={8}
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              color="gray.400"
              letterSpacing="0.12em"
              textTransform="uppercase"
              mb={3}
            >
              {label as string}
            </Text>
            <Flex wrap="wrap" gapX={10} gapY={3}>
              {(names as readonly string[]).map((name) => (
                <Text
                  key={name}
                  as="span"
                  fontSize="lg"
                  color="primary.700"
                  opacity={0.58}
                  fontWeight="normal"
                  letterSpacing="-0.01em"
                >
                  {name}
                </Text>
              ))}
            </Flex>
          </Box>
        ))}
      </Box>
    </PageContainer>
  </Box>
);

export const CompanyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box fontFamily='"Inter Tight", Inter, sans-serif'>
      <PageHero
        eyebrow="Company"
        headline="The AI deployment company for investment firms"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      <MissionSection />

      <FoundersSection />

      <BuiltBySection />

      <InvestorsSection />

      <PageHero
        headline="Join us."
        subtext="We're hiring across engineering and product."
        ctaLabel="View careers"
        onCtaClick={() => navigate(rootRoute({}).careers({}).$)}
        tone="light"
        minH="auto"
        contentPt={24}
        contentPb={24}
      />
    </Box>
  );
};
