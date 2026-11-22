import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { CONTACT_HREF } from "@/components/site/site-constants";
import { dottedTop } from "@/components/site/site-styles";
import { SolidCta } from "@/components/site/solid-cta";
import { TESTIMONIAL_WASHES } from "@/components/site/split-card";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
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

/** ms each step stays open before the next opens, until someone picks one. */
const ACCORDION_ADVANCE = 5000;

/**
 * Option 3, the accordion (after metic.'s services row): the head on top,
 * then the four steps as tall strips side by side. One is open, wide, with
 * its number, title in the serif and description; the others are narrow,
 * their titles turned on end. Hovering, focusing or clicking a strip opens
 * it; until then they open in turn. Phones list the steps open, stacked.
 */
const ApproachAccordion: React.FC = () => {
  const [open, setOpen] = React.useState(0);
  const [picked, setPicked] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (picked || reduced) return;
    const id = window.setInterval(
      () => setOpen((i) => (i + 1) % HOW_WE_WORK.length),
      ACCORDION_ADVANCE,
    );
    return () => window.clearInterval(id);
  }, [picked, reduced]);

  const pick = (i: number) => {
    setPicked(true);
    setOpen(i);
  };

  return (
    <Section grid {...TESTIMONIAL_WASHES.midReversed}>
      <GridCol span={{ base: 16, lg: 9 }} pb={{ base: "40px", lg: "56px" }}>
        <ApproachHead align="start" />
      </GridCol>
      <GridCol
        as="ol"
        span={16}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap="8px"
        h={{ md: "380px" }}
      >
        {HOW_WE_WORK.map((step, i) => {
          const isOpen = open === i;
          return (
            <Box
              as="li"
              key={step.title}
              position="relative"
              flexGrow={{ md: isOpen ? 5 : 1 }}
              flexBasis={{ md: 0 }}
              minW={{ md: "72px" }}
              bg={isOpen ? "site.bg.raised" : "rgba(255, 255, 255, 0.45)"}
              border="1px solid"
              borderColor="site.border.dashedOnTint"
              borderRadius="4px"
              overflow="hidden"
              cursor={{ md: "pointer" }}
              transition="flex-grow 500ms ease, background-color 300ms ease"
              _motionReduce={{ transition: "none" }}
              onMouseEnter={() => pick(i)}
              onClick={() => pick(i)}
            >
              {/* The whole strip is the control, for keyboards too. */}
              <Box
                as="button"
                aria-expanded={isOpen}
                onFocus={() => pick(i)}
                position="absolute"
                inset={0}
                display={{ base: "none", md: "block" }}
                aria-label={step.title}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "site.highlight",
                  outlineOffset: "-2px",
                  borderRadius: "4px",
                }}
              />
              <Text
                position={{ md: "absolute" }}
                top="16px"
                left="16px"
                p={{ base: "16px 16px 0", md: 0 }}
                textStyle="label"
                fontWeight={500}
                color="site.highlight"
                aria-hidden
              >
                {stepNumber(i)}
              </Text>
              {/* Open: the number again, large and faint in the serif,
                filling the strip's top where metic. has a picture. */}
              <Text
                display={{ base: "none", md: "block" }}
                position="absolute"
                top="8px"
                right="24px"
                textStyle="d1"
                fontSize="9rem"
                lineHeight="1"
                color="site.highlight"
                opacity={isOpen ? 0.14 : 0}
                transition="opacity 300ms ease"
                _motionReduce={{ transition: "none" }}
                aria-hidden
              >
                {stepNumber(i)}
              </Text>
              {/* Closed: the title on end, reading up from the bottom. */}
              <Text
                display={{ base: "none", md: "block" }}
                position="absolute"
                left="16px"
                bottom="16px"
                textStyle="h6"
                fontSize="1rem"
                fontWeight={400}
                color="site.fg.strong"
                whiteSpace="nowrap"
                css={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
                opacity={isOpen ? 0 : 1}
                transition="opacity 200ms ease"
                aria-hidden
              >
                {step.title}
              </Text>
              {/* Open: the title in the serif and the description, at the
                strip's foot. Always shown on phones. */}
              <Box
                position={{ md: "absolute" }}
                left={{ md: "24px" }}
                right={{ md: "24px" }}
                bottom={{ md: "24px" }}
                p={{ base: "8px 16px 18px", md: 0 }}
                maxW={{ md: "420px" }}
                display="flex"
                flexDirection="column"
                gap="8px"
                opacity={{ base: 1, md: isOpen ? 1 : 0 }}
                transition={
                  isOpen ? "opacity 300ms ease 250ms" : "opacity 150ms ease"
                }
                _motionReduce={{ transition: "none" }}
                pointerEvents="none"
              >
                <Text
                  as="h3"
                  textStyle="d4"
                  fontSize={{ base: "1.375rem", md: "1.75rem" }}
                  lineHeight="1.1"
                  color="site.fg.strong"
                  whiteSpace={{ md: "nowrap" }}
                >
                  {step.title}
                </Text>
                <Text textStyle="body.sm" color="soot.600">
                  {step.body}
                </Text>
              </Box>
            </Box>
          );
        })}
      </GridCol>
    </Section>
  );
};

/**
 * How we work: the partnership line and the four steps in one section.
 * Three takes to choose between; keep one.
 */
export const ApproachSection: React.FC<{
  variant: "table" | "index" | "accordion";
}> = ({ variant }) =>
  variant === "table" ? (
    <ApproachTable />
  ) : variant === "index" ? (
    <ApproachIndex />
  ) : (
    <ApproachAccordion />
  );
