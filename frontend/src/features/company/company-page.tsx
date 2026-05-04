import { PageHero } from "@/components/layout/page-hero";
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

const InvestorsSection: React.FC = () => (
  <Box
    as="section"
    bg="white"
    px={20}
    py={14}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <Text
      fontFamily={EDICT}
      fontSize="11px"
      color="gray.500"
      letterSpacing="0.08em"
      textTransform="uppercase"
      mb={8}
    >
      Backed by investors
    </Text>
    <Flex wrap="wrap" gapX={20} gapY={8}>
      {[
        ["Investors", INVESTORS],
        ["Angels from", ANGELS],
      ].map(([label, names]) => (
        <Box key={label as string} minW={{ base: "100%", md: "260px" }}>
          <Text
            fontFamily={EDICT}
            fontSize="10px"
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
                fontSize="18px"
                color="primary.700"
                opacity={0.58}
                fontWeight={400}
                letterSpacing="-0.01em"
              >
                {name}
              </Text>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  </Box>
);

export const CompanyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box fontFamily='"Inter Tight", Inter, sans-serif'>
      <PageHero
        headline={
          <>
            Build the future
            <br />
            of private markets
          </>
        }
        subtext="Purpose built AI for private markets giving asset managers a single, searchable source of truth for their portfolio data"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      <InvestorsSection />

      <PageHero
        headline="Join us."
        subtext="We're hiring across engineering and product."
        ctaLabel="View careers"
        onCtaClick={() => navigate("/careers")}
        tone="light"
      />
    </Box>
  );
};
