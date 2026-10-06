import { SiteNav } from "@/components/site/site-nav";
import { CoreHero } from "@/features/hero-lab/heroes/core-hero";
import { LayerHero } from "@/features/hero-lab/heroes/layer-hero";
import { LedgerHero } from "@/features/hero-lab/heroes/ledger-hero";
import { SpecimenHero } from "@/features/hero-lab/heroes/specimen-hero";
import { Box, chakra, Text } from "@chakra-ui/react";
import { Layers } from "lucide-react";
import React from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Hero lab: procedural hero directions for the rebrand, one per
 * reference, toggled with the switcher top-right (or number keys). Each
 * variant's notes (source, concept, legend, layout) are kept below as the
 * design rationale; they are not rendered.
 */

type Variant = {
  id: string;
  name: string;
  reference: string;
  Hero: React.FC;
  /** What the reference is, in a line. */
  source: string;
  /** What the graphic stands for. */
  concept: string[];
  /** Mark → meaning. */
  legend: [string, string][];
  layout: string;
};

const StrataHero: React.FC = () => <LayerHero lines={4} lineGap={4} />;
const SedimentHero: React.FC = () => (
  <LayerHero lines={20} lineGap={4} dots={3000} layerGap={60} shift />
);

const VARIANTS: Variant[] = [
  {
    id: "1",
    name: "Specimen",
    reference: "cosmos_870326637.webp",
    Hero: SpecimenHero,
    source:
      "A plotter sheet on dot-grid paper, with registration marks, row numbers and mounted specimens: dense text, hatched blocks, a scatter, a dotted column and an ordered dot matrix.",
    concept: [
      "Each plate shows one kind of firm knowledge in its native form: memos as dense prose, models as a woven table, email as an unruly scatter, deal history as a long column, meeting notes as a scrawl.",
      "A single bus runs underneath them all. Marks travel from every plate along the bus into the ordered matrix (F): the same material, now structured. That matrix is the only place colour appears.",
    ],
    legend: [
      ["Plates A–E", "Sources in their native shape"],
      ["Dotted bus", "The pipeline: connect and ingest"],
      ["Blue matrix", "The data layer, filling as marks arrive"],
    ],
    layout:
      "The page is turned around: the raw material fills the left half, and the copy sits top-right on columns 9–15, set in the Serrif display voice (d1) with an editorial underlined link. The destination sits below the copy. Six paper dots fit each grid column.",
  },
  {
    id: "2",
    name: "Core",
    reference: "cosmos_647040218.webp",
    Hero: CoreHero,
    source:
      "Concentric arcs crossed by horizontal rules on a black ground. A bright disc sits at the right edge, and lit cells get denser toward it.",
    concept: [
      "The lit cells are pieces of knowledge (a memo, a thread, a meeting) scattered thinly at the edges of the firm. Each ring is a stage of the work: connect, structure, permission, act.",
      "Cells step inward one ring at a time and dwell longer as they get close, so they crowd near the centre. Then they are absorbed into the core, the data layer that agents read from, and it brightens slightly each time.",
    ],
    legend: [
      ["Lit cells", "Individual pieces of knowledge"],
      ["Rings", "Stages: connect → structure → permission → act"],
      ["Core", "The data layer"],
    ],
    layout:
      "A dark band, following the landing page's dark sections (Light weight on reversed type). Everything is anchored bottom-left: the headline on columns 1–8, the body on 1–4 and a light CTA on 6–8. The core is cropped by the right edge, and the arcs cross the horizon on the half-column seams.",
  },
  {
    id: "3",
    name: "Ledger",
    reference: "238eee66-21c0-486f-aeda-ef2a4b9c6dd0.webp",
    Hero: LedgerHero,
    source:
      "A sheet of tall pencil-shaded swatches in a strict grid, each one a single flat tone, with a dark band snaking diagonally through the whole sheet.",
    concept: [
      "The sheet is a table of the firm. Each row is a field of the ontology (sector, EBITDA, IC memo) and each column is a record: a deal, a company or a document. Tone shows how relevant each cell is to the question an agent is answering right now.",
      "Because every record is described by the same fields, relevance moves through the table as one continuous band instead of scattered noise. That smoothness is what a governed data layer looks like. The question changes every few seconds and the band redraws. Hovering adds your own pull.",
    ],
    legend: [
      ["Rows", "Ontology fields"],
      ["Columns", "Records: deals, companies, documents"],
      ["Tone", "Relevance to the current question"],
      ["The band", "What the agent reads to answer it"],
    ],
    layout:
      "The table is the whole hero, with swatches running three per grid column across all 16 columns and only a 1px gap between them, so the sheet reads as one mass. The copy sits top-left in a window cut out of the table (columns 1–7, as many rows deep as the copy needs). The palette stays in the silver ramp and never goes darker than silver.400.",
  },
  {
    id: "4",
    name: "Layer",
    reference: "p5.js sketch — dots coalescing into a layer",
    Hero: LayerHero,
    source:
      "600 dots drifting in a simplex-noise flow field. Staggered over 25 seconds, each one is eased out of the current and sprung into its own evenly spaced slot on one horizontal line, darkening as it arrives. Tuned here so the pull starts almost at once: ease-out instead of ease-in-out, and a tighter stagger (0.2, was 0.35). Here each dot takes its own light grey or light blue, coming up to full strength as it arrives.",
    concept: [
      "Each dot is one piece of the firm's knowledge, drifting in the currents of day-to-day work: the flow field. Over time every dot is drawn out of the current and into its own place on a single line, the data layer.",
      "Slots are handed out by where each dot starts, so knowledge settles where it already belongs instead of being reshuffled. Dots come up to full strength as they join, from loose to trusted. The line forms directly under the copy, as the baseline the headline stands on. Click the hero (or press R) to run it again.",
    ],
    legend: [
      ["Drifting dots", "Knowledge moving through day-to-day work"],
      ["Flow field", "The currents: email, meetings, drives"],
      ["The line", "The data layer, one slot per piece"],
      ["Strengthening", "Loose to trusted as each piece joins"],
    ],
    layout:
      "The sketch runs full-bleed across the light site surface. The copy is centred on columns 4–13 and set as on the /v3 hero (h3 title, in Light, then the body), with the dark CTA below. One change from the sketch: the layer forms 72px under the CTA instead of at the vertical centre, where it would strike through the headline.",
  },
  {
    id: "5",
    name: "Strata",
    reference: "p5.js sketch — dots coalescing into a layer (04, four lines)",
    Hero: StrataHero,
    source:
      "The Layer sketch (04) with one change: the 600 dots coalesce into four parallel horizontal lines spaced 4px apart instead of one, 150 dots to a line. Same flow field, timing, easing, stagger and palette.",
    concept: [
      "As in Layer, each dot is a piece of the firm's knowledge pulled out of the currents of day-to-day work. Here the data layer has depth: four strata stacked tight enough to read as one band, the way a governed layer holds several kinds of record (documents, entities, permissions, activity) in register.",
      "Slots are handed out by where each dot starts: its x picks the column, and within a column the dot that starts highest takes the top line, so dots travel the shortest way in. Click the hero (or press R) to run it again.",
    ],
    legend: [
      ["Drifting dots", "Knowledge moving through day-to-day work"],
      ["Flow field", "The currents: email, meetings, drives"],
      ["Four lines", "The data layer, in strata"],
      ["Strengthening", "Loose to trusted as each piece joins"],
    ],
    layout:
      "Identical to Layer: full-bleed on the light surface, copy centred on columns 4–13 with the dark CTA below. The top line forms 72px under the CTA and the band runs 12px deep (four lines, 4px centre to centre).",
  },
  {
    id: "6",
    name: "Sediment",
    reference: "p5.js sketch — dots coalescing into a layer (05, twenty lines)",
    Hero: SedimentHero,
    source:
      "Strata (05) taken further: 3,000 dots settle into twenty horizontal lines, 4px apart, forming a band just under the CTA. 150 dots to a line, so each line is as dense as one of Strata's four. Same flow field, timing, easing, stagger and palette.",
    concept: [
      "The knowledge drifts down out of the currents of day-to-day work and settles as sediment: line on line, a deep bed of structured material the copy stands on.",
      "Slots are handed out by where each dot starts: x picks the column, and within a column the dot that starts highest takes the top line. Each line is slid along by a golden-ratio step so the columns don't stack into vertical stripes. The bed fills unevenly at first and evens out as the last dots arrive. Click the hero (or press R) to run it again.",
    ],
    legend: [
      ["Drifting dots", "Knowledge moving through day-to-day work"],
      ["Flow field", "The currents: email, meetings, drives"],
      ["The bed", "The data layer, twenty lines deep"],
      ["Strengthening", "Loose to trusted as each piece joins"],
    ],
    layout:
      "Copy as in Layer and Strata, centred on columns 4–13 with the dark CTA below. The top line forms 60px under the CTA and the band runs 76px deep (twenty lines, 4px centre to centre).",
  },
];

/**
 * Variant switcher: a small circle pinned top-right, just under the sticky
 * nav so it never covers the nav CTA. Opens a list of variants; closes on
 * selection, an outside click or Escape.
 */
const VariantSwitcher: React.FC<{
  active: string;
  onSelect: (id: string) => void;
}> = ({ active, onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Box
      ref={ref}
      position="fixed"
      top="68px"
      right="16px"
      zIndex={20}
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      gap="8px"
    >
      <chakra.button
        aria-label="Switch hero variant"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="36px"
        h="36px"
        borderRadius="full"
        bg="site.bg.darkRaised"
        color="site.fg.onDark"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.18)"
        cursor="pointer"
        transition="opacity 150ms ease"
        _hover={{ opacity: 0.85 }}
      >
        <Layers size={16} strokeWidth={1.5} />
      </chakra.button>
      {open && (
        <Box
          role="menu"
          aria-label="Hero variants"
          display="flex"
          flexDirection="column"
          gap="2px"
          p="3px"
          bg="site.bg.darkRaised"
          borderRadius="4px"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.18)"
        >
          {VARIANTS.map((v) => {
            const on = v.id === active;
            return (
              <chakra.button
                key={v.id}
                role="menuitemradio"
                aria-checked={on}
                onClick={() => {
                  onSelect(v.id);
                  setOpen(false);
                }}
                display="flex"
                alignItems="baseline"
                gap="8px"
                h="28px"
                px="12px"
                borderRadius="2px"
                bg={on ? "site.bg.raised" : "transparent"}
                color={on ? "site.fg.strong" : "site.fg.onDarkMuted"}
                cursor="pointer"
                transition="background 150ms ease, color 150ms ease"
                _hover={on ? {} : { color: "site.fg.onDark" }}
              >
                <Text as="span" textStyle="mono" opacity={0.6}>
                  0{v.id}
                </Text>
                <Text as="span" textStyle="body.sm">
                  {v.name}
                </Text>
              </chakra.button>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export const HeroLabPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const active = VARIANTS.find((v) => v.id === params.get("v")) ?? VARIANTS[0];

  const select = React.useCallback(
    (id: string) => setParams({ v: id }, { replace: true }),
    [setParams],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (VARIANTS.some((v) => v.id === e.key)) select(e.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select]);

  const { Hero } = active;
  return (
    <Box bg="site.bg.page" minH="100vh">
      <SiteNav />
      {/* Keyed so each variant mounts fresh and only one canvas runs. */}
      <Hero key={active.id} />
      <VariantSwitcher active={active.id} onSelect={select} />
    </Box>
  );
};
