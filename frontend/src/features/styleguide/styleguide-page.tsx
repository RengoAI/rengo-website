import { Grid, GridCol } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { GRID_COLUMNS } from "@/theme/tokens/layout";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Living specimen for the rebrand primitives. Renders every token and layout
 * primitive so the scale can be read at its real size rather than inferred
 * from the token file.
 */

const TYPE_SPECIMENS: {
  style: string;
  label: string;
  sample: string;
}[] = [
  {
    style: "h1",
    label: "60 / -0.06em / 1.0",
    sample: "Ready to make your data your alpha?",
  },
  {
    style: "h2",
    label: "44 / -0.05em / 1.05",
    sample: "How our system performs",
  },
  {
    style: "h3",
    label: "32 / -0.02em / 1.1",
    sample: "Building your intelligent data layer",
  },
  {
    style: "h4",
    label: "32 / -0.05em / 1.1",
    sample: "How your workflows could be agent-driven",
  },
  {
    style: "h5",
    label: "24 / -0.04em / 1.15",
    sample: "An agent-ready data foundation",
  },
  {
    style: "d1",
    label: "Serrif 60 / -0.04em / 1.0",
    sample: "Ready to make your data your alpha?",
  },
  {
    style: "d2",
    label: "Serrif 44 / -0.04em / 1.0",
    sample: "26 % time saved",
  },
  {
    style: "d3",
    label: "Serrif 36 / -0.035em / 1.0",
    sample: "Building your intelligent data layer",
  },
  {
    style: "d4",
    label: "Serrif 26 / -0.03em / 1.0",
    sample: "Compare new deals without rebuilding context",
  },
  {
    style: "d5",
    label: "Serrif 20 / -0.02em / 1.25",
    sample: "“The platform does the heavy lifting.”",
  },
  {
    style: "body.md",
    label: "16 / -0.04em / 1.4",
    sample:
      "We're the embedded partner that builds the data intelligence layer for AI systems to learn and act from your firm's knowledge.",
  },
  {
    style: "body.sm",
    label: "14 / -0.02em / 1.4",
    sample:
      "We connect your source systems, structure them into a permissioned ontology, and build applications and agents for your work.",
  },
  { style: "label", label: "12 / +0.02em / 1.2", sample: "Investor relations" },
  { style: "caption", label: "10 / +0.02em / 1.0", sample: "Your systems" },
  { style: "mono", label: "Geist Mono 11 / 1.5", sample: "© 2026 Rengo AI" },
];

const STEPS = [100, 200, 300, 400, 500, 600, 700, 800];

const RAMPS: { name: string; steps: (string | number)[]; note?: string }[] = [
  { name: "canvas", steps: [0, 50, 100, 200, 300, 400, 500] },
  { name: "rengo", steps: STEPS, note: "500 = Rengo blue" },
  { name: "silver", steps: STEPS, note: "200 = Silver" },
  { name: "soot", steps: STEPS, note: "700 = Soot Black, 800 = Soot" },
];

/** Brand colours used as themselves rather than as a scale. */
const FLAT_COLORS: { token: string; name: string }[] = [
  { token: "sky", name: "sky — Sky #B0C7EB" },
  { token: "crimson", name: "crimson — Maroon #7F364D" },
];

const SEMANTIC_GROUPS: { group: string; tokens: string[] }[] = [
  {
    group: "site.bg",
    tokens: [
      "page",
      "surface",
      "raised",
      "footer",
      "inset",
      "dark",
      "darkRaised",
      "tint",
      "tintSky",
      "brand",
    ],
  },
  {
    group: "site.fg",
    tokens: [
      "DEFAULT",
      "strong",
      "muted",
      "subtle",
      "onDark",
      "onDarkMuted",
      "onDarkSubtle",
      "onBrand",
    ],
  },
  {
    group: "site.border",
    tokens: ["DEFAULT", "dashed", "dashedOnTint", "dashedOnDark", "onDark"],
  },
];

const Heading: React.FC<{ children: React.ReactNode; note?: string }> = ({
  children,
  note,
}) => (
  <Box mb={10}>
    <Text
      textStyle="label"
      textTransform="uppercase"
      color="site.accent"
      mb={3}
    >
      {children}
    </Text>
    {note && (
      <Text textStyle="body.sm" color="site.fg.muted" maxW="52ch">
        {note}
      </Text>
    )}
  </Box>
);

const Swatch: React.FC<{ token: string; name: string }> = ({ token, name }) => (
  <Box>
    <Box
      h="56px"
      bg={token}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="site.border"
      borderRadius="2px"
    />
    <Text textStyle="caption" color="site.fg.muted" mt={2}>
      {name}
    </Text>
  </Box>
);

export const StyleguidePage: React.FC = () => (
  <Box bg="site.bg.page" minH="100vh" py="80px">
    {/* ---------------------------------------------------------------- */}
    <Section mb="100px">
      <Text textStyle="h3" color="site.fg.strong">
        Design system primitives
        <Box as="span" color="site.accent">
          _
        </Box>
      </Text>
      <Text textStyle="body.md" color="site.fg.muted" maxW="60ch" mt={5}>
        Tokens and layout primitives only. Every value traces back to the
        marketing site Figma; nothing here is a finished component.
      </Text>
    </Section>

    {/* --- Typography -------------------------------------------------- */}
    <Section mb="100px">
      <Heading note="Two scales at matching sizes: h1–h5 in Geist Regular for structural headings, d1–d5 in Serrif Light for the display voice. Serrif runs looser at every step — it carries more weight, so the same tracking would close its counters up.">
        Type scale
      </Heading>
      <Box
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="site.border"
      >
        {TYPE_SPECIMENS.map(({ style, label, sample }) => (
          <Grid
            key={style}
            py={7}
            borderBottomWidth="1px"
            borderBottomStyle="dashed"
            borderBottomColor="site.border.dashed"
            alignItems="baseline"
          >
            <GridCol span={{ base: 16, md: 3 }}>
              <Text textStyle="label" color="site.fg.strong">
                {style}
              </Text>
              <Text textStyle="caption" color="site.fg.subtle" mt={1}>
                {label}
              </Text>
            </GridCol>
            <GridCol span={{ base: 16, md: 13 }}>
              <Text textStyle={style} color="site.fg.strong">
                {sample}
              </Text>
            </GridCol>
          </Grid>
        ))}
      </Box>
    </Section>

    {/* --- Colour primitives ------------------------------------------- */}
    <Section mb="100px">
      <Heading note="Three ramps of a flat 8 steps, 100 → 800, no half-steps. Sky and Maroon are single brand colours used as themselves, so they stay flat. Canvas is the light-surface neutral set.">
        Colour primitives
      </Heading>
      {RAMPS.map(({ name, steps, note }) => (
        <Box key={name} mb={10}>
          <Text textStyle="body.sm" color="site.fg.strong" mb={1}>
            {name}
          </Text>
          <Text textStyle="caption" color="site.fg.subtle" mb={4}>
            {note ?? " "}
          </Text>
          <Grid>
            {steps.map((step) => (
              <GridCol key={step} span={{ base: 4, md: 2 }}>
                <Swatch token={`${name}.${step}`} name={`${name}.${step}`} />
              </GridCol>
            ))}
          </Grid>
        </Box>
      ))}
      <Box mb={10}>
        <Text textStyle="body.sm" color="site.fg.strong" mb={1}>
          flat
        </Text>
        <Text textStyle="caption" color="site.fg.subtle" mb={4}>
          no ramp — used as themselves
        </Text>
        <Grid>
          {FLAT_COLORS.map(({ token, name }) => (
            <GridCol key={token} span={{ base: 8, md: 4 }}>
              <Swatch token={token} name={name} />
            </GridCol>
          ))}
        </Grid>
      </Box>
    </Section>

    {/* --- Semantic tokens --------------------------------------------- */}
    <Section mb="100px">
      <Heading note="What the rest of the site should actually reference. Deliberately mode-flat — the dark bands are a compositional choice, not a colour mode, so onDark variants are explicit.">
        Semantic tokens
      </Heading>
      {SEMANTIC_GROUPS.map(({ group, tokens }) => (
        <Box key={group} mb={10}>
          <Text textStyle="body.sm" color="site.fg.strong" mb={4}>
            {group}
          </Text>
          <Grid>
            {tokens.map((t) => {
              const full = t === "DEFAULT" ? group : `${group}.${t}`;
              return (
                <GridCol key={t} span={{ base: 4, md: 2 }}>
                  <Swatch token={full} name={t} />
                </GridCol>
              );
            })}
          </Grid>
        </Box>
      ))}
      <Box mb={10}>
        <Text textStyle="body.sm" color="site.fg.strong" mb={4}>
          site.accent / site.brand
        </Text>
        <Grid>
          <GridCol span={{ base: 8, md: 4 }}>
            <Swatch token="site.accent" name="site.accent — Maroon" />
          </GridCol>
          <GridCol span={{ base: 8, md: 4 }}>
            <Swatch token="site.brand" name="site.brand — Rengo blue" />
          </GridCol>
        </Grid>
      </Box>
    </Section>

    {/* --- Grid --------------------------------------------------------- */}
    <Section mb="100px">
      <Heading note="16 columns, 16px gap, inside the global 40px section gutter. Anything that needs to line up claims its width with GridCol span, never its own width.">
        Layout grid
      </Heading>
      <Grid mb={8}>
        {Array.from({ length: GRID_COLUMNS }, (_, i) => (
          <GridCol key={i} span={1}>
            <Box bg="rengo.200" h="64px" borderRadius="2px" />
            <Text
              textStyle="caption"
              color="site.fg.subtle"
              mt={2}
              textAlign="center"
            >
              {i + 1}
            </Text>
          </GridCol>
        ))}
      </Grid>
      <Grid>
        {[12, 4, 6, 10, 4, 4, 4, 4].map((span, i) => (
          <GridCol key={i} span={span}>
            <Box
              bg="site.bg.inset"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="site.border.dashed"
              h="56px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text textStyle="label" color="site.fg.muted">
                span {span}
              </Text>
            </Box>
          </GridCol>
        ))}
      </Grid>
    </Section>

    {/* --- Section gutter ----------------------------------------------- */}
    <Section mb="100px">
      <Heading note="Every content band, the nav, and the footer sit in a Section so their left and right edges agree. Sections are full-bleed so background colour runs edge to edge while content stays inset.">
        Section gutter
      </Heading>
    </Section>
    <Box bg="site.bg.dark" py="60px" mb="100px">
      <Section>
        <Text textStyle="h5" color="site.fg.onDark">
          A dark band
        </Text>
        <Text
          textStyle="body.sm"
          color="site.fg.onDarkMuted"
          mt={3}
          maxW="48ch"
        >
          Full-bleed background, content inset by the same 40px gutter as every
          light section above it.
        </Text>
        <Text textStyle="d2" color="site.fg.onDark" mt={8}>
          1 month
        </Text>
      </Section>
    </Box>
  </Box>
);
