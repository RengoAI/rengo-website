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

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const MissionSection: React.FC = () => (
  <Box
    as="section"
    bg="slate.10"
    py={24}
    borderBottom="1px solid"
    borderColor="slate.30"
  >
    <PageContainer>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
        gap={{ base: 14, lg: 20 }}
        alignItems="start"
      >
        <Box>
          <Box
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "36px", md: "52px" }}
            fontWeight="normal"
            lineHeight={1.04}
            letterSpacing="-0.035em"
            color="indigo.900"
            maxW="620px"
            m={0}
          >
            Building managed data warehouses
          </Box>
        </Box>

        <Text fontSize="lg" lineHeight={1.75} color="ink.body" maxW="720px">
          Private markets have expanded into a mainstream part of global capital
          allocation, but the infrastructure supporting them has not kept pace.
          Rengo AI deploys AI agents that continuously transform raw investment
          data into a structured system of record.
        </Text>
      </Box>
    </PageContainer>
  </Box>
);

const BuiltBySection: React.FC = () => (
  <Box
    as="section"
    bg="slate.10"
    py={24}
    borderBottom="1px solid"
    borderColor="slate.30"
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
          color="indigo.900"
          m={0}
          mb={4}
        >
          From people behind leading products
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="slate.50" maxW="560px">
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
    bg="slate.10"
    py={24}
    borderBottom="1px solid"
    borderColor="slate.30"
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
          color="indigo.900"
          m={0}
          mb={4}
        >
          Backed by investors
        </Box>
        <Text fontSize="md" lineHeight={1.65} color="slate.50" maxW="560px">
          Supported by venture investors and angels with experience across
          public markets, private markets, and financial data infrastructure.
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderColor="slate.30"
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
            borderColor="slate.30"
            p={8}
          >
            <Text
              fontFamily={EDICT}
              fontSize="xs"
              color="slate.40"
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
                  color="indigo.700"
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
    <Box fontFamily='"Inter Tight", Inter, sans-serif' bg="slate.10">
      <PageHero
        headline="Private markets need a new infrastructure layer"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      <MissionSection />

      <BuiltBySection />

      <InvestorsSection />

      <PageHero
        headline="Join us."
        subtext="We're hiring across engineering and product."
        ctaLabel="View careers"
        onCtaClick={() => navigate(rootRoute({}).careers({}).$)}
        minH="auto"
        contentPt={24}
        contentPb={24}
      />
    </Box>
  );
};
