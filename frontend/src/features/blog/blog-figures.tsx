import { colorVar } from "@/components/site/site-styles";
import { FIGURE_TINTS } from "@/features/blog/blog-styles";
import { Box } from "@chakra-ui/react";
import React from "react";

/**
 * The blog's flowcharts, drawn as SVG in the site's colours so they stay sharp and
 * scale with the column.
 */

const C = {
  line: colorVar("site.fg.subtle"),
  node: colorVar("site.bg.raised"),
  nodeStroke: colorVar("site.border"),
  text: colorVar("site.fg.strong"),
  muted: colorVar("site.fg.muted"),
  branch: colorVar("site.fg.heading"),
  /** The step the chart arrives at: sky, rather than a dark block. */
  arrive: FIGURE_TINTS.sky,
  highlight: colorVar("site.highlight"),
};

const FONT = "var(--rengo-fonts-body)";
const NODE_H = 32;

// --- Drawing primitives ------------------------------------------------------

const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  spacing?: string;
}> = ({
  x,
  y,
  children,
  fill = C.text,
  size = 13,
  weight = 450,
  anchor = "middle",
  spacing = "-0.005em",
}) => (
  <text
    x={x}
    y={y}
    fill={fill}
    textAnchor={anchor}
    dominantBaseline="central"
    // As a style, not attributes: the page's CSS outranks SVG presentation
    // attributes, and would set every label to the body's 16px.
    style={{
      fontFamily: FONT,
      // Scaled up on phones, where the chart is drawn smaller (see Svg).
      fontSize: `calc(${size}px * var(--chart-text, 1))`,
      fontWeight: weight,
      letterSpacing: spacing,
    }}
  >
    {children}
  </text>
);

/**
 * A branch's YES or NO, as in the sales materials: about 70% of the steps'
 * size, medium-weight capitals spaced wide, in the slate of the headings rather
 * than grey, so they read as labels on the line.
 */
const Branch: React.FC<{ x: number; y: number; children: string }> = (
  props,
) => (
  <Label {...props} size={9} weight={500} fill={C.branch} spacing="0.14em" />
);

/** Line height of a label's lines, in chart units. */
const LINE = 16;

/** One or more centred lines, stacked about (x, y). */
const Lines: React.FC<{ x: number; y: number; label: string | string[] }> = ({
  x,
  y,
  label,
}) => {
  const lines = typeof label === "string" ? [label] : label;
  return (
    <>
      {lines.map((line, i) => (
        <Label key={line} x={x} y={y + (i - (lines.length - 1) / 2) * LINE}>
          {line}
        </Label>
      ))}
    </>
  );
};

/** The height of a step with this many lines. */
const nodeHeight = (label: string | string[]) =>
  typeof label === "string" ? NODE_H : NODE_H + (label.length - 1) * LINE;

/** A rounded step, centred on (cx, cy). Two-line labels make it taller. */
const Node: React.FC<{
  cx: number;
  cy: number;
  w: number;
  label: string | string[];
  variant?: "plain" | "dashed" | "dark";
}> = ({ cx, cy, w, label, variant = "plain" }) => {
  const h = nodeHeight(label);
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={NODE_H / 2}
        fill={variant === "dark" ? C.arrive : C.node}
        stroke={variant === "dark" ? C.arrive : C.nodeStroke}
        strokeDasharray={variant === "dashed" ? "3 3" : undefined}
      />
      <Lines x={cx} y={cy} label={label} />
    </g>
  );
};

/** A yes-or-no question, as a diamond centred on (cx, cy). */
const Decision: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  label: string | string[];
}> = ({ cx, cy, w, h, label }) => (
  <g>
    <polygon
      points={`${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`}
      fill={C.node}
      stroke={C.nodeStroke}
    />
    <Lines x={cx} y={cy} label={label} />
  </g>
);

/** A connector through the given points, with an arrowhead at the end. */
const Path: React.FC<{
  points: [number, number][];
  marker: string;
  dashed?: boolean;
}> = ({ points, marker, dashed }) => (
  <polyline
    points={points.map((p) => p.join(",")).join(" ")}
    fill="none"
    stroke={C.line}
    strokeWidth={1}
    strokeDasharray={dashed ? "4 4" : undefined}
    markerEnd={`url(#${marker})`}
  />
);

const ArrowDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <marker
      id={id}
      viewBox="0 0 8 8"
      refX="7"
      refY="4"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path d="M0,0 L8,4 L0,8 z" fill={C.line} />
    </marker>
  </defs>
);

/** Three stacked slabs: the structured database. */
const DatabaseStack: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const w = 88;
  const h = 36;
  const slab = (y: number) =>
    `${cx},${y - h / 2} ${cx + w / 2},${y} ${cx},${y + h / 2} ${cx - w / 2},${y}`;
  return (
    <g>
      {/* Mist, then sky, then a deeper sky on top, each edged in white. */}
      <polygon points={slab(cy + 14)} fill={FIGURE_TINTS.mist} stroke="white" />
      <polygon
        points={slab(cy)}
        fill={FIGURE_TINTS.sky}
        opacity={0.7}
        stroke="white"
      />
      <polygon points={slab(cy - 14)} fill={C.highlight} opacity={0.55} />
      <polygon
        points={`${cx},${cy - 14 - h / 4} ${cx + w / 4},${cy - 14} ${cx},${cy - 14 + h / 4} ${cx - w / 4},${cy - 14}`}
        fill="none"
        stroke="white"
        opacity={0.8}
      />
    </g>
  );
};

const Svg: React.FC<{
  viewBox: string;
  title: string;
  children: React.ReactNode;
}> = ({ viewBox, title, children }) => (
  <Box
    as="svg"
    // @ts-expect-error -- Chakra's Box takes the SVG's own attributes.
    viewBox={viewBox}
    role="img"
    aria-label={title}
    display="block"
    w="full"
    maxW="500px"
    // On phones the chart shrinks with the column, so its text is set a
    // touch larger to stay readable.
    css={{ "--chart-text": { base: 1.15, md: 1 } }}
    h="auto"
    mx="auto"
    overflow="visible"
  >
    {children}
  </Box>
);

// --- The figures ---------------------------------------------------------------

/** Answering from files: every failed check goes back to searching. */
export const FilesFlow: React.FC = () => {
  const id = `arrow-${React.useId().replace(/:/g, "")}`;
  // The main column, and the half-width of its rounded steps.
  const cx = 164;
  const half = 65;
  // Arrows end just short of what they point at, for the arrowhead.
  const into = 2;
  const steps: [number, number][] = [
    [44, 78],
    [112, 146],
    [204, 232],
    [290, 318],
    [376, 402],
    [436, 460],
  ];
  const colleague = { cx: 364, w: 140 };
  return (
    <Svg viewBox="0 0 444 510" title="Answering From Files">
      <ArrowDefs id={id} />

      {/* Next time, it all starts again. */}
      <Path
        dashed
        marker={id}
        points={[
          [cx - half, 478],
          [12, 478],
          [12, 28],
          [cx - half - into, 28],
        ]}
      />
      {steps.map(([from, to]) => (
        <Path
          key={from}
          marker={id}
          points={[
            [cx, from],
            [cx, to],
          ]}
        />
      ))}

      {/* Wrong file: search again. */}
      <Path
        marker={id}
        points={[
          [cx + 80, 176],
          [cx + 108, 176],
          [cx + 108, 104],
          [cx + half + into, 104],
        ]}
      />
      {/* Not the latest: search again. */}
      <Path
        marker={id}
        points={[
          [cx - 90, 262],
          [44, 262],
          [44, 96],
          [cx - half - into, 96],
        ]}
      />
      {/* Unclear definition: ask someone, then search again. */}
      <Path
        marker={id}
        points={[
          [cx + 112, 348],
          [colleague.cx - colleague.w / 2 - into, 348],
        ]}
      />
      <Path
        marker={id}
        points={[
          [colleague.cx, 348 - NODE_H / 2],
          [colleague.cx, 88],
          [cx + half + into, 88],
        ]}
      />

      <Node cx={cx} cy={28} w={half * 2} label="A question" />
      <Node
        cx={cx}
        cy={96}
        w={half * 2}
        label="Search files"
        variant="dashed"
      />
      <Decision cx={cx} cy={176} w={160} h={56} label="Correct file?" />
      <Decision cx={cx} cy={262} w={180} h={56} label="Latest version?" />
      <Decision cx={cx} cy={348} w={224} h={56} label="Correct definition?" />
      <Node
        cx={colleague.cx}
        cy={348}
        w={colleague.w}
        label="Ask a colleague"
      />
      <Node cx={cx} cy={420} w={196} label="Reconcile the numbers" />
      <Node cx={cx} cy={478} w={half * 2} label="An answer" />

      <Branch x={cx + 94} y={166}>
        NO
      </Branch>
      <Branch x={59} y={252}>
        NO
      </Branch>
      <Branch x={cx + 120} y={338}>
        NO
      </Branch>
      <Branch x={cx + 20} y={390}>
        YES
      </Branch>
    </Svg>
  );
};

/** Answering from a structured database: search only what isn't there yet. */
export const DatabaseFlow: React.FC = () => {
  const id = `arrow-${React.useId().replace(/:/g, "")}`;
  // The main column, the right-hand column (search, then verify) and the
  // database on the left.
  const cx = 215;
  const right = 372;
  const db = 62;
  const search = ["Search the", "original files"];
  const verify = ["Verify and save", "the information"];
  return (
    <Svg viewBox="0 0 460 380" title="Answering With Rengo">
      <ArrowDefs id={id} />

      <Path
        marker={id}
        points={[
          [cx, 44],
          [cx, 76],
        ]}
      />
      {/* Yes: straight from the database. */}
      <Path
        marker={id}
        points={[
          [cx - 110, 116],
          [db, 116],
          [db, 222],
        ]}
      />
      {/* No: search the files, then verify and save. */}
      <Path
        marker={id}
        points={[
          [cx + 110, 116],
          [right, 116],
          [right, 158],
        ]}
      />
      <Path
        marker={id}
        points={[
          [right, 204],
          [right, 234],
        ]}
      />
      <Path
        dashed
        marker={id}
        points={[
          [right - 75, 258],
          [db + 46, 258],
        ]}
      />
      <Path
        marker={id}
        points={[
          [db, 328],
          [db, 352],
          [cx - 117, 352],
        ]}
      />
      <Path
        marker={id}
        points={[
          [right, 280],
          [right, 352],
          [cx + 117, 352],
        ]}
      />

      <Node cx={cx} cy={28} w={130} label="A question" />
      <Decision
        cx={cx}
        cy={116}
        w={220}
        h={76}
        label={["Is it already", "in the database?"]}
      />
      <Node cx={right} cy={182} w={150} label={search} variant="dashed" />
      <Node cx={right} cy={258} w={150} label={verify} />
      <DatabaseStack cx={db} cy={258} />
      <Lines x={db} y={308} label={["Structured", "database"]} />
      <Node
        cx={cx}
        cy={352}
        w={230}
        label="An answer with citations"
        variant="dark"
      />

      <Branch x={(cx - 110 + db) / 2} y={104}>
        YES
      </Branch>
      <Branch x={(cx + 110 + right) / 2} y={104}>
        NO
      </Branch>
    </Svg>
  );
};

export const FIGURES = {
  "files-flow": FilesFlow,
  "database-flow": DatabaseFlow,
} as const;

export type FigureName = keyof typeof FIGURES;
