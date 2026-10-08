import { GridCol } from "@/components/layout/grid";
import { Section, type SectionProps } from "@/components/layout/section";
import {
  UseCaseAccordion,
  type UseCase,
} from "@/components/site/use-case-accordion";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * The bands shared by the rebrand solution pages (/solutions/applied-ai,
 * /solutions/platform). Each page is a hero and a numbered list; keeping them
 * here is what keeps the pages identical apart from their copy.
 */

/**
 * A tall pale-blue band, 90% of the viewport; the copy only fills the top.
 * `accent` is the trailing part of the title set in the accent colour.
 */
export const SolutionHero: React.FC<{
  title: string;
  accent: string;
  lede: React.ReactNode;
}> = ({ title, accent, lede }) => (
  <Section
    grid
    rhythm="none"
    bg="site.bg.tintSubtle"
    pt={{ base: "48px", lg: "64px" }}
    h="90vh"
  >
    <GridCol
      span={{ base: 16, md: 10, lg: 6 }}
      display="flex"
      flexDirection="column"
      gap="12px"
    >
      <Text as="h1" textStyle="h2" color="site.fg">
        {title}
        <Box as="span" color="site.accent">
          {accent}
        </Box>
      </Text>
      <Text textStyle="body.sm" color="site.fg" maxW="414px">
        {lede}
      </Text>
    </GridCol>
  </Section>
);

/**
 * A heading over the use-case accordion, every row open. The step number
 * stands in the accordion's label slot.
 */
export const SolutionSteps: React.FC<
  Omit<SectionProps, "title"> & {
    title: string;
    items: UseCase[];
  }
> = ({ title, items, ...rest }) => (
  <Section grid bg="site.bg.surface" {...rest}>
    <GridCol span={16} pb="60px">
      <Text
        as="h2"
        textStyle="h3"
        color="site.fg.strong"
        maxW={{ base: "160px", md: "240px" }}
      >
        {title}
      </Text>
    </GridCol>
    <GridCol span={16}>
      <UseCaseAccordion items={items} defaultAllOpen />
    </GridCol>
  </Section>
);
