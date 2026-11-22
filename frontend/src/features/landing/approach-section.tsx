import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
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

/** The section's head: label, the partnership line and its subline. */
const ApproachHead: React.FC = () => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" gap="14px">
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
  </Box>
);

/** ms each step stays open before the next opens, until someone picks one. */
const ACCORDION_ADVANCE = 5000;

/**
 * How we work, as an accordion (after metic.'s services row): the head on top,
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
        <ApproachHead />
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
              borderColor="border.subtle"
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

export const ApproachSection = ApproachAccordion;
