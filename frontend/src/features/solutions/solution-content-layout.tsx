import { PageContainer } from "@/components/layout/page-container";
import { SectionShell } from "@/features/landing/sections/section-shell";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type SolutionContentSectionProps = {
  bg?: string;
  children: React.ReactNode;
  py?: Record<string, number | string> | number | string;
  /** Hairline between hero and first content block (matches landing sections). */
  borderTop?: boolean;
};

/** Matches landing sections: ruled shell + 60px gap between heading block and body. */
export const SolutionContentSection: React.FC<SolutionContentSectionProps> = ({
  bg = "slate.10",
  py = { base: 16, md: "80px" },
  borderTop = false,
  children,
}) => (
  <SectionShell borderTop={borderTop} bg={bg} py={py}>
    <Box
      display="flex"
      flexDirection="column"
      gap={{ base: 10, md: "60px" }}
      w="full"
    >
      {children}
    </Box>
  </SectionShell>
);

type SolutionWideSectionProps = {
  bg?: string;
  borderTop?: boolean;
  children: React.ReactNode;
};

/** Full-width content band like landing “Our philosophy for applying AI”. */
export const SolutionWideSection: React.FC<SolutionWideSectionProps> = ({
  bg = "slate.10",
  borderTop = false,
  children,
}) => (
  <Box
    as="section"
    bg={bg}
    py={{ base: 16, md: 24 }}
    borderTop={borderTop ? "1px solid" : undefined}
    borderColor={borderTop ? "slate.30" : undefined}
  >
    <PageContainer>{children}</PageContainer>
  </Box>
);

type PhilosophyColumnItem = { title: string; body: string };

/** Three-column philosophy layout (title + body only, no field cards). */
export const SolutionPhilosophyColumns: React.FC<{
  items: readonly PhilosophyColumnItem[];
}> = ({ items }) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    gap={{ base: 8, md: 10 }}
    w="full"
    align="stretch"
  >
    {items.map((item) => (
      <Flex key={item.title} direction="column" gap={3} flex="1" minW={0}>
        <Text
          as="h3"
          fontFamily="heading"
          fontWeight={350}
          fontSize={{ base: "18px", md: "22px" }}
          lineHeight={1.2}
          letterSpacing="-0.72px"
          color="indigo.900"
          m={0}
        >
          {item.title}
        </Text>
        <Text
          fontFamily="body"
          fontSize="16px"
          lineHeight="24px"
          color="slate.50"
          m={0}
        >
          {item.body}
        </Text>
      </Flex>
    ))}
  </Flex>
);
