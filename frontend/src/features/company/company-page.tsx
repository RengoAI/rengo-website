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

const ALUMNI = [
  { name: "Microsoft", logo: "/logos/microsoft.png", framed: true },
  { name: "Blend", logo: "/logos/blend.png", width: 92 },
  { name: "Marshall Wace", logo: "/logos/marshall-wace.png", width: 158 },
  {
    name: "Maybern",
    logo: "/logos/maybern.png",
    framed: true,
    frameWidth: 150,
    frameHeight: 42,
    imageWidth: 220,
    objectPosition: "top left",
  },
] as const;
const NAVY = "#0C1D34";
const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const BuiltBySection: React.FC = () => (
  <Box
    as="section"
    bg="gray.25"
    px={20}
    py={24}
    borderBottom="1px solid"
    borderColor="border.muted"
  >
    <Box maxW="680px" mb={16}>
      <Box
        as="h2"
        fontFamily="heading"
        fontSize={{ base: "34px", md: "48px" }}
        fontWeight={400}
        lineHeight={1.06}
        letterSpacing="-0.03em"
        color={NAVY}
        m={0}
        mb={4}
      >
        Built by people from leading teams
      </Box>
      <Text fontSize="md" lineHeight={1.65} color="gray.500" maxW="560px">
        Experience from category-defining technology, financial services, and
        private markets companies.
      </Text>
    </Box>

    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      borderTop="1px solid"
      borderLeft="1px solid"
      borderColor="border.muted"
    >
      {ALUMNI.map(({ name, logo, ...display }) => (
        <Box
          key={name}
          minH="132px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRight="1px solid"
          borderBottom="1px solid"
          borderColor="border.muted"
          px={6}
        >
          {"framed" in display && display.framed ? (
            <Box
              w={`${"frameWidth" in display ? display.frameWidth : 170}px`}
              h={`${"frameHeight" in display ? display.frameHeight : 58}px`}
              overflow="hidden"
              position="relative"
              opacity={0.66}
            >
              <img
                src={logo}
                alt={name}
                loading="lazy"
                decoding="async"
                style={{
                  width: `${"imageWidth" in display ? display.imageWidth : 170}px`,
                  height: `${"imageWidth" in display ? display.imageWidth : 170}px`,
                  objectFit: "cover",
                  objectPosition:
                    "objectPosition" in display
                      ? display.objectPosition
                      : "top center",
                  display: "block",
                }}
              />
            </Box>
          ) : (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              decoding="async"
              width={"width" in display ? display.width : undefined}
              style={{
                width: "width" in display ? `${display.width}px` : "auto",
                height: "auto",
                opacity: 0.8,
                display: "block",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

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

      <BuiltBySection />

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
