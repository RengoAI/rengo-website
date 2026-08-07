import { PageContainer } from "@/components/layout/page-container";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface SectionBlockProps {
  eyebrow?: string;
  heading: React.ReactNode;
  children: React.ReactNode;
  bg?: string;
  headingOffset?: string;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({
  eyebrow,
  heading,
  children,
  bg = "slate.10",
  headingOffset = "3.25rem",
}) => (
  <Box bg={bg} py={{ base: 16, md: 28 }}>
    <PageContainer>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}
        gap={16}
        alignItems="start"
      >
        <Box>
          {eyebrow && (
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="slate.50"
              mb={6}
            >
              {eyebrow}
            </Text>
          )}
          <Box
            as="h2"
            fontFamily="heading"
            fontSize="clamp(1.75rem, 3.5vw, 2.5rem)"
            fontWeight={350}
            letterSpacing="-0.025em"
            lineHeight={1.1}
            color="indigo.900"
            m={0}
          >
            {heading}
          </Box>
        </Box>
        <Box pt={{ base: 0, md: headingOffset }}>{children}</Box>
      </Box>
    </PageContainer>
  </Box>
);
