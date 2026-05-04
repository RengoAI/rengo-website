import { PageContainer } from "@/components/layout/page-container";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

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
  bg = "white",
  headingOffset = "52px",
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
              fontFamily={EDICT}
              fontSize="11px"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="primary.700"
              mb={6}
            >
              {eyebrow}
            </Text>
          )}
          <Box
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "28px", md: "40px" }}
            fontWeight={400}
            letterSpacing="-0.025em"
            lineHeight={1.1}
            color="primary.800"
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
