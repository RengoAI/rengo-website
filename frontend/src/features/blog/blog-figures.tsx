import { colorVar } from "@/components/site/site-styles";
import { Box } from "@chakra-ui/react";
import React from "react";

/**
 * The blog's flowcharts, drawn as SVG so they stay sharp and scale with the
 * column, in the Business Overview's colours (`site.figure.*`) so they
 * match the document they come from.
 */

const C = {
  line: colorVar("site.figure.line"),
  /** Rengo's own path through a chart, drawn darker. */
  lineStrong: colorVar("site.figure.lineStrong"),
  node: colorVar("site.bg.raised"),
  /** The steps' and questions' outline: the faintest rule, so the shapes
   * sit quietly and the connectors carry the flow. */
  nodeStroke: colorVar("border.subtle"),
  text: colorVar("site.fg.strong"),
  /** YES and NO. */
  branch: colorVar("site.figure.lineStrong"),
  /** Named marks, such as "Structured database". */
  label: colorVar("site.figure.label"),
  /** The step the chart arrives at: a navy pill with white type. */
  arrive: colorVar("site.figure.arrive"),
  arriveFg: colorVar("site.figure.arriveFg"),
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
const Lines: React.FC<{
  x: number;
  y: number;
  label: string | string[];
  fill?: string;
}> = ({ x, y, label, fill }) => {
  const lines = typeof label === "string" ? [label] : label;
  return (
    <>
      {lines.map((line, i) => (
        <Label
          key={line}
          x={x}
          y={y + (i - (lines.length - 1) / 2) * LINE}
          fill={fill}
        >
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
      <Lines
        x={cx}
        y={cy}
        label={label}
        fill={variant === "dark" ? C.arriveFg : undefined}
      />
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

/**
 * A connector through the given points, with an arrowhead at the end.
 * `strong` draws it in the darker ink of Rengo's own path.
 */
const Path: React.FC<{
  points: [number, number][];
  marker: string;
  dashed?: boolean;
  strong?: boolean;
}> = ({ points, marker, dashed, strong }) => (
  <polyline
    points={points.map((p) => p.join(",")).join(" ")}
    fill="none"
    stroke={strong ? C.lineStrong : C.line}
    strokeWidth={1}
    strokeDasharray={dashed ? "4 4" : undefined}
    markerEnd={`url(#${strong ? `${marker}-strong` : marker})`}
  />
);

/** The arrowheads: `id` in the connectors' grey, `id-strong` in the dark. */
const ArrowDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    {[
      [id, C.line],
      [`${id}-strong`, C.lineStrong],
    ].map(([markerId, fill]) => (
      <marker
        key={markerId}
        id={markerId}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 z" fill={fill} />
      </marker>
    ))}
  </defs>
);

/**
 * The database stack's slab width and height, and the step between slabs:
 * the Business Overview's proportions (a 2:1 slab, a quarter-slab step).
 */
const DB = { w: 112, h: 56, step: 14 };
/** From the stack's centre to the top of its top slab, or the bottom of its
 * bottom one. */
const DB_REACH = DB.step * 1.5 + DB.h / 2;

/**
 * Four stacked slabs, the structured database, as the Business Overview
 * draws it: pale to steel, under a navy top with a fine inner outline.
 * Centred on (cx, cy), between the second and third slabs.
 */
const DatabaseStack: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const { w, h, step } = DB;
  const slab = (y: number, scale = 1) =>
    `${cx},${y - (h / 2) * scale} ${cx + (w / 2) * scale},${y} ${cx},${y + (h / 2) * scale} ${cx - (w / 2) * scale},${y}`;
  const top = cy - step * 1.5;
  return (
    <g>
      {(["stack4", "stack3", "stack2"] as const).map((token, i) => (
        <polygon
          key={token}
          points={slab(cy + step * (1.5 - i))}
          fill={colorVar(`site.figure.${token}`)}
          stroke={colorVar("site.figure.stackEdge")}
          strokeWidth={0.7}
        />
      ))}
      <polygon
        points={slab(top)}
        fill={colorVar("site.figure.stackTop")}
        stroke={colorVar("site.figure.stackTop")}
      />
      <polygon
        points={slab(top, 0.6)}
        fill="none"
        stroke={colorVar("site.figure.stackTopInner")}
        strokeWidth={0.6}
        opacity={0.7}
      />
    </g>
  );
};

/**
 * Pixels per chart unit at full size, the same for every chart so their
 * labels match: about 14.6px type from 13-unit labels.
 */
const SCALE = 500 / 444;

/** The chart, at SCALE up to its full size, shrinking with the column. */
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
    maxW={`${Math.round(Number(viewBox.split(" ")[2]) * SCALE)}px`}
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
  // The three questions share one diamond, as in the Business Overview.
  const diamond = { w: 180, h: 56 };
  const tip = diamond.w / 2;
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
          [cx + tip, 176],
          [cx + 116, 176],
          [cx + 116, 104],
          [cx + half + into, 104],
        ]}
      />
      {/* Not the latest: search again. */}
      <Path
        marker={id}
        points={[
          [cx - tip, 262],
          [44, 262],
          [44, 96],
          [cx - half - into, 96],
        ]}
      />
      {/* Unclear definition: ask someone, then search again. */}
      <Path
        marker={id}
        points={[
          [cx + tip, 348],
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
      <Decision cx={cx} cy={176} {...diamond} label="Correct file?" />
      <Decision cx={cx} cy={262} {...diamond} label="Latest version?" />
      <Decision cx={cx} cy={348} {...diamond} label="Correct definition?" />
      <Node
        cx={colleague.cx}
        cy={348}
        w={colleague.w}
        label="Ask a colleague"
      />
      <Node cx={cx} cy={420} w={196} label="Reconcile the numbers" />
      <Node cx={cx} cy={478} w={half * 2} label="An answer" />

      <Branch x={cx + 103} y={166}>
        NO
      </Branch>
      <Branch x={59} y={252}>
        NO
      </Branch>
      <Branch x={cx + 110} y={338}>
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
  // As in the Business Overview: the question down the middle, the search
  // on the right and the database on the left, at the same distance. Every
  // label on one line.
  const cx = 266;
  const right = 419;
  const db = 2 * cx - right;
  const pill = 214;
  const diamond = { w: 240, h: 62 };
  const tip = diamond.w / 2;
  const answer = 230;
  // The search, the verify step and the database share their rows.
  const searchY = 180;
  const saveY = 240;
  const dbTop = saveY - DB_REACH;
  const dbBottom = saveY + DB_REACH;
  const answerY = 350;
  const into = 2;
  return (
    <Svg viewBox="0 0 532 372" title="Answering With Rengo">
      <ArrowDefs id={id} />

      {/* Rengo's path, in the dark ink. */}
      <Path
        strong
        marker={id}
        points={[
          [cx, 44],
          [cx, 116 - diamond.h / 2 - into],
        ]}
      />
      {/* Yes: straight from the database. */}
      <Path
        strong
        marker={id}
        points={[
          [cx - tip, 116],
          [db, 116],
          [db, dbTop - into],
        ]}
      />
      {/* No: search the files, then verify and save. */}
      <Path
        strong
        marker={id}
        points={[
          [cx + tip, 116],
          [right, 116],
          [right, searchY - NODE_H / 2 - into],
        ]}
      />
      <Path
        strong
        marker={id}
        points={[
          [right, searchY + NODE_H / 2],
          [right, saveY - NODE_H / 2 - into],
        ]}
      />
      <Path
        strong
        marker={id}
        points={[
          [db, dbBottom + 31],
          [db, answerY],
          [cx - answer / 2 - into, answerY],
        ]}
      />
      <Path
        strong
        marker={id}
        points={[
          [right, saveY + NODE_H / 2],
          [right, answerY],
          [cx + answer / 2 + into, answerY],
        ]}
      />
      {/* What's verified goes into the database, for next time. */}
      <Path
        dashed
        marker={id}
        points={[
          [right - pill / 2, saveY],
          [db + DB.w / 2 + into, saveY],
        ]}
      />

      <Node cx={cx} cy={28} w={130} label="A question" />
      <Decision
        cx={cx}
        cy={116}
        {...diamond}
        label="Is it already in the database?"
      />
      <Node
        cx={right}
        cy={searchY}
        w={pill}
        label="Search the original files"
        variant="dashed"
      />
      <Node
        cx={right}
        cy={saveY}
        w={pill}
        label="Verify and save the information"
      />
      <DatabaseStack cx={db} cy={saveY} />
      <Label x={db} y={dbBottom + 18} weight={500} fill={C.label}>
        Structured database
      </Label>
      <Node
        cx={cx}
        cy={answerY}
        w={answer}
        label="An answer with citations"
        variant="dark"
      />

      <Branch x={(cx - tip + db) / 2} y={104}>
        YES
      </Branch>
      <Branch x={(cx + tip + right) / 2} y={104}>
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
