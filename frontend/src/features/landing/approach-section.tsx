import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { FEATURE_BAND_MIN_H } from "@/components/site/site-constants";
import {
  isDarkLight,
  LightField,
  type LightFieldVariant,
} from "@/components/site/light-field";
import { usePrefersReducedMotion } from "@/shared/utils/motion";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export type ApproachStep = { title: string; body: string };

const HOW_WE_WORK: ApproachStep[] = [
  {
    title: "Understand your business",
    body: "We work with your team to understand how decisions are made, where work slows down, and what’s missing from the data.",
  },
  {
    title: "Set priorities",
    body: "We identify where better data and tools can make the biggest difference, then build a roadmap around your business priorities and existing systems.",
  },
  {
    title: "Build and implement",
    body: "We connect your systems, organize your data, and build the tools your team needs to put it to work.",
  },
  {
    title: "Support and grow",
    body: "We maintain the systems we build and work with your team to bring new departments, data sources, and workflows onto the platform.",
  },
];

/**
 * Light panels separate the steps from the section's wash. Narrow beams
 * leave most of each panel clear, including the copy at its foot.
 */
const STRIP_BG = "#F7F8FA";

/**
 * Each step's light, in the Business Overview's mid-ramp and deepening a
 * little from first to last: haze with steel, steel, its bluer
 * slate-light, then steel over a slate core.
 */
const STEP_LIGHT: LightFieldVariant[] = [
  "ovHazeDeep",
  "ovSteel",
  "ovSteelBlue",
  "ovSteelDeep",
];

/** The section's head: the partnership line, unless a page passes its own. */
const ApproachHead: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" gap="14px">
    <Text
      as="h2"
      textStyle="h4"
      fontWeight={400}
      lineHeight="1.1"
      color="site.fg.heading"
      maxW="640px"
      textWrap="balance"
    >
      {children ?? (
        <>
          We partner with your team to turn your data into{" "}
          <Box as="span" color="site.highlight">
            measurable business outcomes
          </Box>
        </>
      )}
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
const ApproachAccordion: React.FC<{
  heading?: React.ReactNode;
  steps?: ApproachStep[];
}> = ({ heading, steps = HOW_WE_WORK }) => {
  const [open, setOpen] = React.useState(0);
  const [picked, setPicked] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (picked || reduced) return;
    const id = window.setInterval(
      () => setOpen((i) => (i + 1) % steps.length),
      ACCORDION_ADVANCE,
    );
    return () => window.clearInterval(id);
  }, [picked, reduced, steps.length]);

  const pick = (i: number) => {
    setPicked(true);
    setOpen(i);
  };

  return (
    // Plain, so the strips carry the light: one gradient at a time. The
    // big moments' height, the strips growing to fill it under the heading.
    <Section
      grid
      bg="site.bg.surface"
      minH={FEATURE_BAND_MIN_H}
      display="flex"
      gridProps={{ w: "full", gridTemplateRows: { md: "auto 1fr" } }}
    >
      <GridCol span={{ base: 16, lg: 9 }} pb={{ base: "40px", lg: "56px" }}>
        <ApproachHead>{heading}</ApproachHead>
      </GridCol>
      <GridCol
        as="ol"
        span={16}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap="8px"
        // Short enough that the section fits one laptop screen.
        minH={{ md: "300px" }}
      >
        {steps.map((step, i) => {
          const isOpen = open === i;
          // Light type on a dark strip (the Overview's slate and navy).
          const dark = isDarkLight(STEP_LIGHT[i]);
          const ink = dark ? "site.fg.onDark" : "site.fg.strong";
          const inkSoft = dark ? "overview.onDark2" : "soot.600";
          return (
            <Box
              as="li"
              key={step.title}
              position="relative"
              flexGrow={{ md: isOpen ? 5 : 1 }}
              flexBasis={{ md: 0 }}
              minW={{ md: "72px" }}
              bg={STRIP_BG}
              // On the plain page, border.subtle reads as a soft grey edge.
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
              {/* The step's light, stronger when open. */}
              <LightField
                variant={STEP_LIGHT[i]}
                position="absolute"
                inset={0}
                // Dark strips stay near full when closed, or they turn muddy.
                // Phones show every strip open, so every light at full.
                opacity={{ base: 1, md: isOpen ? 1 : dark ? 0.9 : 0.55 }}
                transition="opacity 500ms ease"
                _motionReduce={{ transition: "none" }}
              />
              {/* Closed: the title on end, reading up from the bottom. */}
              <Text
                display={{ base: "none", md: "block" }}
                position="absolute"
                left="16px"
                bottom="16px"
                textStyle="h6"
                fontSize="1.125rem"
                fontWeight={400}
                color={ink}
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
                strip's foot. Always shown on phones, where it sits in the
                flow: positioned (relative) so it paints above the light. */}
              <Box
                position={{ base: "relative", md: "absolute" }}
                left={{ md: "24px" }}
                right={{ md: "24px" }}
                bottom={{ md: "24px" }}
                p={{ base: "18px 16px", md: 0 }}
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
                  color={ink}
                  whiteSpace={{ md: "nowrap" }}
                >
                  {step.title}
                </Text>
                <Text textStyle="body.sm" color={inkSoft}>
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
