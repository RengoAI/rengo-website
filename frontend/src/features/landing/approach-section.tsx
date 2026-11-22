import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { dottedTop } from "@/components/site/site-styles";
import { SolidCta } from "@/components/site/solid-cta";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const HOW_WE_WORK = [
  {
    title: "Scope the work",
    body: "We learn how your team works today, what information they need, and where the process breaks down.",
  },
  {
    title: "Set the roadmap",
    body: "Together, we choose what to build first, the data needed to support it, and what comes next.",
  },
  {
    title: "Build with your team",
    body: "We connect the relevant systems, organize the data, and build the tools your team will use.",
  },
  {
    title: "Support and expand",
    body: "We maintain the system, support your team, and add new workflows as priorities change.",
  },
];

/** A step's number, two digits: "01". */
const stepNumber = (i: number) => String(i + 1).padStart(2, "0");

/** The section's head: label, the partnership line, its subline and the
 * call, left-aligned or centred. */
const ApproachHead: React.FC<{ align: "start" | "center" }> = ({ align }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems={align === "center" ? "center" : "flex-start"}
    textAlign={align === "center" ? "center" : "left"}
    gap="14px"
  >
    <Text textStyle="label" fontWeight={500} color="site.highlight">
      Our approach
    </Text>
    <Text
      as="h2"
      textStyle="h4"
      fontWeight={400}
      lineHeight="1.1"
      color="site.fg.heading"
      maxW="640px"
      textWrap="balance"
    >
      We partner with your team to turn your data into{" "}
      <Box as="span" color="site.highlight">
        measurable business outcomes
      </Box>
    </Text>
    <Text textStyle="body.sm" color="site.fg">
      We map how your team works today, then build with you.
    </Text>
    <SolidCta h="27px" mt="6px" href={CONTACT_HREF} labelProps={{ gap: "8px" }}>
      Book a call
    </SolidCta>
  </Box>
);

/**
 * Option 1, the table: the head on the left, then the steps as full-width
 * rows under dotted rules, each a small number, its title in the serif and
 * its description, in three columns. Quiet and precise, all type.
 */
const ApproachTable: React.FC = () => (
  <Section grid {...TESTIMONIAL_WASHES.midReversed}>
    <GridCol span={{ base: 16, lg: 9 }} pb={{ base: "40px", lg: "64px" }}>
      <ApproachHead align="start" />
    </GridCol>
    <GridCol as="ol" span={16}>
      {HOW_WE_WORK.map((step, i) => (
        <Grid
          as="li"
          key={step.title}
          {...dottedTop("site.border.dashedOnTint")}
          {...(i === HOW_WE_WORK.length - 1
            ? {
                borderBottomWidth: "1px",
                borderBottomStyle: "dotted",
                borderBottomColor: "site.border.dashedOnTint",
              }
            : {})}
          py={{ base: "20px", md: "28px" }}
          rowGap="6px"
          alignItems="baseline"
        >
          <GridCol span={{ base: 16, md: 2 }}>
            <Text
              textStyle="label"
              fontWeight={500}
              color="site.highlight"
              aria-hidden
            >
              {stepNumber(i)}
            </Text>
          </GridCol>
          <GridCol span={{ base: 16, md: 6, lg: 5 }}>
            <Text as="h3" textStyle="d5" color="site.fg.strong">
              {step.title}
            </Text>
          </GridCol>
          <GridCol span={{ base: 16, md: 8, lg: 6 }} start={{ lg: 10 }}>
            <Text textStyle="body.sm" color="soot.600">
              {step.body}
            </Text>
          </GridCol>
        </Grid>
      ))}
    </GridCol>
  </Section>
);

/**
 * Option 2, the index: the head centred, then the steps as a large-type
 * index, each title set big in the serif with its number raised beside it
 * and its description to the right, under solid hairlines. The last step's
 * title in blue, where the sequence lands.
 */
const ApproachIndex: React.FC = () => (
  <Section grid {...TESTIMONIAL_WASHES.midReversed}>
    <GridCol span={16} pb={{ base: "40px", lg: "72px" }}>
      <ApproachHead align="center" />
    </GridCol>
    <GridCol as="ol" span={16}>
      {HOW_WE_WORK.map((step, i) => {
        const last = i === HOW_WE_WORK.length - 1;
        return (
          <Grid
            as="li"
            key={step.title}
            borderTop="1px solid"
            borderBottom={last ? "1px solid" : undefined}
            borderColor="site.border.dashedOnTint"
            py={{ base: "22px", md: "32px" }}
            rowGap="10px"
            alignItems="center"
          >
            <GridCol span={{ base: 16, lg: 9 }}>
              <Text
                as="h3"
                textStyle="d1"
                fontSize={{ base: "2rem", md: "2.75rem", lg: "3.25rem" }}
                lineHeight="1"
                color={last ? "site.highlight" : "site.fg.strong"}
              >
                <Box
                  as="sup"
                  aria-hidden
                  fontFamily="body"
                  fontSize="0.75rem"
                  letterSpacing="0.02em"
                  fontWeight={500}
                  color="site.highlight"
                  verticalAlign="top"
                  position="relative"
                  top="0.3em"
                  mr="12px"
                >
                  {stepNumber(i)}
                </Box>
                {step.title}
              </Text>
            </GridCol>
            <GridCol span={{ base: 16, md: 10, lg: 5 }} start={{ lg: 12 }}>
              <Text textStyle="body.sm" color="soot.600">
                {step.body}
              </Text>
            </GridCol>
          </Grid>
        );
      })}
    </GridCol>
  </Section>
);

/**
 * How we work: the partnership line and the four steps in one section.
 * Two takes to choose between; keep one.
 */
export const ApproachSection: React.FC<{ variant: "table" | "index" }> = ({
  variant,
}) => (variant === "table" ? <ApproachTable /> : <ApproachIndex />);
