import { GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { GRAIN_TILE } from "@/components/site/site-styles";
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

/**
 * The section's ground and how the strips sit on it. Three takes to choose
 * between; keep one.
 */
const TONES = {
  /** The Business Overview's navy, the strips lit on it. */
  navy: {
    section: { bg: "overview.navy", bgImage: "none" },
    heading: "site.fg.onDark",
    point: "sky",
    closedBg: "rgba(255, 255, 255, 0.06)",
    closedBorder: "rgba(255, 255, 255, 0.14)",
    closedInk: "site.fg.onDark",
    openBg: "site.bg.raised",
    openTitle: "site.fg.strong",
    openBody: "soot.600",
  },
  /** The bluest testimonial wash, with the site's grain over it. */
  deep: {
    section: {
      ...TESTIMONIAL_WASHES.deep,
      bgImage: `${GRAIN_TILE}, ${TESTIMONIAL_WASHES.deep.bgImage}`,
    },
    heading: "site.fg.heading",
    point: "site.highlight",
    closedBg: "rgba(255, 255, 255, 0.35)",
    closedBorder: "border.subtle",
    closedInk: "site.fg.strong",
    openBg: "site.bg.raised",
    openTitle: "site.fg.strong",
    openBody: "soot.600",
  },
  /** The plain page, with the open strip in solid blue. */
  blue: {
    section: { bg: "site.bg.surface", bgImage: "none" },
    heading: "site.fg.heading",
    point: "site.highlight",
    closedBg: "site.bg.inset",
    closedBorder: "border.subtle",
    closedInk: "site.fg.strong",
    openBg: "site.highlight",
    openTitle: "site.fg.onDark",
    openBody: "site.fg.onDark",
  },
} as const;

type Tone = keyof typeof TONES;

/** The section's head: the partnership line. */
const ApproachHead: React.FC<{ tone: Tone }> = ({ tone }) => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" gap="14px">
    <Text
      as="h2"
      textStyle="h4"
      fontWeight={400}
      lineHeight="1.1"
      color={TONES[tone].heading}
      maxW="640px"
      textWrap="balance"
    >
      We partner with your team to turn your data into{" "}
      <Box as="span" color={TONES[tone].point}>
        measurable business outcomes
      </Box>
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
const ApproachAccordion: React.FC<{ tone: Tone }> = ({ tone }) => {
  const t = TONES[tone];
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
    <Section grid {...t.section}>
      <GridCol span={{ base: 16, lg: 9 }} pb={{ base: "40px", lg: "56px" }}>
        <ApproachHead tone={tone} />
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
              bg={isOpen ? t.openBg : t.closedBg}
              border="1px solid"
              borderColor={isOpen ? "transparent" : t.closedBorder}
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
              {/* Closed: the title on end, reading up from the bottom. */}
              <Text
                display={{ base: "none", md: "block" }}
                position="absolute"
                left="16px"
                bottom="16px"
                textStyle="h6"
                fontSize="1rem"
                fontWeight={400}
                color={t.closedInk}
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
                  color={{ base: t.closedInk, md: t.openTitle }}
                  whiteSpace={{ md: "nowrap" }}
                >
                  {step.title}
                </Text>
                <Text
                  textStyle="body.sm"
                  color={{ base: t.closedInk, md: t.openBody }}
                >
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
export type { Tone as ApproachTone };
