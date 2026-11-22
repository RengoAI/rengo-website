import { colorVar } from "@/components/site/site-styles";
import { chakra } from "@chakra-ui/react";
import React from "react";

/*
 * Line drawings for the four steps in Our approach, in the Business
 * Overview's figure colours (site.figure.*), the blog graphics' palette:
 * fine slate lines, navy for the one thing each step is about. Flat and
 * drawn, so they don't echo the data layer's 3D renders above.
 *
 * Each is drawn on a 480 × 300 board, its subject around the middle, so a
 * narrow, closed strip (which crops to the middle) still shows part of it.
 */

const LINE = colorVar("site.figure.line");
const STRONG = colorVar("site.figure.lineStrong");
const NAVY = colorVar("site.figure.arrive");
const PAPER = colorVar("site.bg.raised");

const stroke = {
  fill: "none",
  stroke: LINE,
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A page: a sheet with a heading bar and a few lines of text. */
const Page: React.FC<{ x: number; y: number; r?: number }> = ({
  x,
  y,
  r = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect width={70} height={90} rx={4} {...stroke} fill={PAPER} />
    <path d="M12 16 H44" {...stroke} stroke={STRONG} strokeWidth={2} />
    {[32, 44, 56, 68].map((ly, i) => (
      <path key={ly} d={`M12 ${ly} H${i % 2 ? 46 : 58}`} {...stroke} />
    ))}
  </g>
);

/** Scope the work: pages scattered, a lens over one of them. */
const Scope: React.FC = () => (
  <>
    <Page x={92} y={70} r={-8} />
    <Page x={300} y={56} r={6} />
    <Page x={330} y={160} r={-4} />
    <Page x={110} y={180} r={5} />
    <Page x={200} y={104} />
    {/* The lens, over the middle page. */}
    <circle cx={236} cy={150} r={46} fill={PAPER} fillOpacity={0.6} />
    <circle
      cx={236}
      cy={150}
      r={46}
      {...stroke}
      stroke={NAVY}
      strokeWidth={2}
    />
    <path d="M269 183 L304 218" {...stroke} stroke={NAVY} strokeWidth={5} />
    <path d="M214 140 H258 M214 154 H250" {...stroke} stroke={NAVY} />
  </>
);

/** Set the roadmap: a path through milestones, the first reached. */
const Roadmap: React.FC = () => {
  const stops: [number, number][] = [
    [70, 230],
    [170, 150],
    [300, 195],
    [410, 115],
  ];
  return (
    <>
      <path
        d="M70 230 C110 230 130 150 170 150 S260 195 300 195 S370 115 410 115"
        {...stroke}
        strokeDasharray="4 5"
      />
      {stops.map(([x, y], i) => (
        <g key={x}>
          <circle
            cx={x}
            cy={y}
            r={i === 0 ? 9 : 7}
            fill={i === 0 ? NAVY : PAPER}
            {...(i === 0 ? {} : stroke)}
          />
          {/* A flag on each milestone. */}
          <path d={`M${x} ${y - 12} V${y - 44}`} {...stroke} stroke={STRONG} />
          <path
            d={`M${x} ${y - 44} H${x + 26} L${x + 20} ${y - 36} L${x + 26} ${y - 28} H${x}`}
            fill={i === 0 ? NAVY : PAPER}
            {...(i === 0 ? {} : stroke)}
          />
        </g>
      ))}
    </>
  );
};

/** Build with your team: systems on the left, joined into one table. */
const Build: React.FC = () => {
  const sources = [70, 140, 210];
  return (
    <>
      {sources.map((y) => (
        <g key={y}>
          <rect
            x={60}
            y={y - 18}
            width={84}
            height={36}
            rx={5}
            {...stroke}
            fill={PAPER}
          />
          <path d={`M74 ${y} H118`} {...stroke} />
          <path
            d={`M144 ${y} C200 ${y} 200 140 250 140`}
            {...stroke}
            stroke={STRONG}
          />
        </g>
      ))}
      {/* The table they feed: a header row in navy, then rows. */}
      <rect
        x={250}
        y={70}
        width={170}
        height={140}
        rx={6}
        {...stroke}
        fill={PAPER}
      />
      <path d="M250 98 H420" {...stroke} />
      <rect x={250} y={70} width={170} height={28} rx={6} fill={NAVY} />
      {[126, 154, 182].map((y) => (
        <path key={y} d={`M250 ${y} H420`} {...stroke} />
      ))}
      <path d="M310 98 V210 M370 98 V210" {...stroke} />
    </>
  );
};

/** Support and expand: a loop that keeps turning, a new branch off it. */
const Support: React.FC = () => (
  <>
    {/* The loop, left open at the top right, where it turns. */}
    <path
      d="M300 150 A70 70 0 1 1 280 100"
      {...stroke}
      stroke={STRONG}
      strokeWidth={1.75}
    />
    {[
      [230, 80],
      [160, 150],
      [230, 220],
      [300, 150],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r={7} {...stroke} fill={PAPER} />
    ))}
    {/* Expand: a new workflow branching off, in navy. */}
    <path d="M307 150 H370" {...stroke} strokeDasharray="4 5" />
    <circle cx={384} cy={150} r={13} fill={NAVY} />
    <path
      d="M378 150 H390 M384 144 V156"
      fill="none"
      stroke={PAPER}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </>
);

const ART = [Scope, Roadmap, Build, Support];

/** Step `i`'s drawing, filling its box, cropped to the middle. */
export const StepArt: React.FC<{ i: number }> = ({ i }) => {
  const Art = ART[i];
  return (
    <chakra.svg
      viewBox="0 0 480 300"
      preserveAspectRatio="xMidYMid slice"
      w="full"
      h="full"
      display="block"
      aria-hidden
    >
      <Art />
    </chakra.svg>
  );
};
