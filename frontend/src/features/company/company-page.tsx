import { PageHero } from "@/components/layout/page-hero";
import { SectionBlock } from "@/components/layout/section-block";
import { ValueCard } from "@/components/layout/value-card";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NAVY = "#0C1D34";
const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

const VALUES = [
  {
    n: "01",
    title: "Move fast",
    body: "We ship weekly. Speed is a feature. Private markets moves quickly and so do we.",
  },
  {
    n: "02",
    title: "Customer obsessed",
    body: "We sit in our customers' offices. Their problems are our problems. We don't build in a vacuum.",
  },
  {
    n: "03",
    title: "Trust by default",
    body: "We build for sensitive data. Security is never an afterthought — it's the foundation.",
  },
] as const;

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
        subtext="Rengo is purpose built AI for private markets giving asset managers a single, searchable source of truth for their portfolio data"
        ctaLabel="See a demo"
        onCtaClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      />

      {/* Mission */}
      <SectionBlock eyebrow="Our mission" heading="Why we exist.">
        <Text fontSize="lg" lineHeight={1.7} color="gray.600" mb={5}>
          Private markets firms are drowning in unstructured data — board
          decks, CIMs, financial statements, cap tables — scattered across
          inboxes and shared drives with no way to search or synthesize.
        </Text>
        <Text fontSize="lg" lineHeight={1.7} color="gray.600">
          Rengo changes that. We ingest everything, structure it
          automatically, and give every analyst and partner instant, cited
          answers across their entire portfolio. One platform. One source of
          truth.
        </Text>
      </SectionBlock>

      {/* Values */}
      <Box as="section" bg="gray.25" px={20} py={28}>
        <Text
          fontFamily={EDICT}
          fontSize="11px"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="primary.700"
          mb={6}
        >
          Our principles
        </Text>
        <Box
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "28px", md: "40px" }}
          fontWeight={400}
          letterSpacing="-0.025em"
          color={NAVY}
          m={0}
          mb={16}
        >
          How we work.
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={16}
        >
          {VALUES.map(({ n, title, body }) => (
            <ValueCard key={n} number={n} title={title} body={body} />
          ))}
        </Box>
      </Box>

      {/* CTA strip */}
      <Box bg={NAVY} px={20} py={20}>
        <Flex direction="column" align="center" textAlign="center" gap={6}>
          <Box
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "28px", md: "40px" }}
            fontWeight={400}
            letterSpacing="-0.02em"
            color="white"
            m={0}
          >
            Join us.
          </Box>
          <Text fontSize="md" color="whiteAlpha.700" maxW="400px">
            We're hiring across engineering, product, and GTM.
          </Text>
          <Flex gap={3} wrap="wrap" justify="center">
            <Button
              borderRadius="md"
              bg="transparent"
              color="white"
              h="42px"
              px={6}
              fontSize="15px"
              fontWeight="medium"
              border="1px solid"
              borderColor="whiteAlpha.400"
              _hover={{ borderColor: "white" }}
              onClick={() => navigate("/careers")}
            >
              View careers
            </Button>
            <Button
              borderRadius="md"
              bg="white"
              color={NAVY}
              h="42px"
              px={6}
              fontSize="15px"
              fontWeight="medium"
              _hover={{ bg: "gray.50" }}
              onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
            >
              Talk to our team
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
