import { sheetPitch } from "@/components/site/mesh-field";
import { Box } from "@chakra-ui/react";
import React from "react";

/**
 * Single links on the glyph clusters from hero-mesh.png. Each link is one
 * step straight down between two cells of a cluster, and no two links meet,
 * so the marks stay where those clusters were without drawing the shapes.
 * Cells are that image's 22px grid. They snap onto the outro's dot sheet.
 * Below xl the sheet is wider than the viewport and left-aligned, so the
 * clusters would land on the headline.
 */
/** Cells of clearance around a link, so two links cannot meet. */
const SEPARATION = 1;
const COPY_PAD = 36;

type Cell = readonly [number, number];

type Link = { c: number; r: number; c2: number; r2: number };

type Clear = { l: number; t: number; r: number; b: number };

const CLUSTERS: readonly (readonly Cell[])[] = [
  [
    [86, 4],
    [86, 6],
    [86, 7],
    [86, 10],
    [86, 11],
    [86, 19],
    [86, 22],
    [86, 24],
    [86, 25],
    [86, 26],
    [86, 27],
    [86, 29],
    [86, 31],
    [86, 32],
    [87, 4],
    [87, 10],
    [87, 13],
    [87, 17],
    [87, 19],
    [87, 22],
    [87, 25],
    [87, 26],
    [88, 4],
    [88, 9],
    [88, 10],
    [88, 12],
    [88, 14],
    [88, 16],
    [88, 17],
    [88, 19],
    [88, 22],
    [88, 25],
    [88, 27],
    [88, 28],
    [88, 29],
    [88, 32],
    [89, 4],
    [89, 7],
    [89, 8],
    [89, 9],
    [89, 11],
    [89, 12],
    [89, 16],
    [89, 19],
    [89, 24],
    [89, 27],
    [89, 29],
    [89, 31],
    [89, 32],
    [90, 4],
    [90, 6],
    [90, 7],
    [90, 9],
    [90, 12],
    [90, 15],
    [90, 17],
    [90, 18],
    [90, 22],
    [90, 23],
    [90, 24],
    [90, 26],
    [90, 27],
    [90, 30],
    [91, 5],
    [91, 14],
    [91, 15],
    [91, 17],
    [91, 19],
    [91, 24],
    [91, 31],
    [91, 32],
    [92, 4],
    [92, 5],
    [92, 6],
    [92, 7],
    [92, 8],
    [92, 9],
    [92, 11],
    [92, 12],
    [92, 13],
    [92, 14],
    [92, 17],
    [92, 20],
    [92, 21],
    [92, 22],
    [92, 24],
    [92, 27],
    [92, 28],
    [92, 29],
    [92, 30],
    [92, 31],
    [92, 32],
    [93, 5],
    [93, 7],
    [93, 27],
  ],
  [
    [5, 8],
    [5, 13],
    [5, 14],
    [5, 16],
    [5, 18],
    [5, 26],
    [6, 8],
    [6, 11],
    [6, 12],
    [6, 13],
    [6, 15],
    [6, 16],
    [6, 19],
    [6, 20],
    [6, 23],
    [7, 8],
    [7, 10],
    [7, 11],
    [7, 16],
    [7, 22],
    [7, 23],
    [7, 26],
    [8, 9],
    [8, 10],
    [8, 13],
    [8, 18],
    [8, 19],
    [8, 21],
    [8, 23],
    [8, 25],
    [8, 26],
    [9, 9],
    [9, 12],
    [9, 13],
    [9, 17],
    [9, 18],
    [9, 20],
    [9, 21],
    [9, 24],
    [9, 25],
    [10, 8],
    [10, 13],
    [10, 15],
    [10, 16],
    [10, 18],
    [10, 21],
    [10, 24],
    [10, 26],
    [11, 8],
    [11, 10],
    [11, 11],
    [11, 14],
    [11, 15],
    [11, 18],
    [11, 23],
    [11, 24],
    [12, 8],
    [12, 11],
    [12, 14],
    [12, 17],
    [12, 18],
    [12, 21],
    [12, 23],
    [12, 25],
    [12, 26],
  ],
  [
    [18, 14],
    [19, 14],
    [20, 12],
    [20, 14],
    [21, 12],
    [21, 13],
    [22, 10],
    [22, 11],
    [22, 13],
    [23, 9],
    [23, 11],
    [23, 13],
    [24, 9],
    [24, 11],
    [24, 12],
    [25, 7],
    [25, 9],
    [25, 10],
    [26, 7],
    [26, 8],
    [26, 10],
    [27, 5],
    [27, 6],
    [28, 4],
    [28, 6],
    [28, 8],
    [29, 4],
    [29, 6],
    [29, 7],
    [30, 4],
    [30, 5],
    [31, 3],
    [31, 5],
    [32, 3],
    [32, 4],
    [33, 3],
  ],
  [
    [92, 38],
    [93, 36],
    [93, 37],
    [93, 39],
    [94, 35],
    [94, 36],
    [94, 38],
    [94, 39],
    [94, 40],
    [95, 35],
    [95, 36],
    [95, 40],
    [96, 35],
    [96, 36],
    [96, 37],
    [96, 38],
    [96, 39],
    [96, 40],
    [97, 36],
    [97, 37],
    [97, 38],
  ],
  [
    [60, 49],
    [60, 50],
    [60, 51],
    [61, 49],
    [61, 50],
    [61, 52],
    [62, 48],
    [62, 49],
  ],
  [
    [56, 50],
    [56, 51],
    [56, 52],
    [57, 50],
    [57, 51],
  ],
];

const roll = (col: number, row: number) => {
  let n = Math.imul(col, 374761393) + Math.imul(row, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return n >>> 0;
};

const LINKS: readonly Link[] = CLUSTERS.flatMap((cells) => {
  const have = new Set(cells.map(([c, r]) => `${c},${r}`));
  const taken = new Set<string>();
  const blocked = (col: number, row: number) => {
    for (let dr = -SEPARATION; dr <= SEPARATION; dr++) {
      for (let dc = -SEPARATION; dc <= SEPARATION; dc++) {
        if (taken.has(`${col + dc},${row + dr}`)) return true;
      }
    }
    return false;
  };
  const edges = cells.flatMap(([c, r]) =>
    have.has(`${c},${r + 1}`) ? [[c, r, c, r + 1] as const] : [],
  );
  edges.sort(
    (a, b) => roll(a[0] + a[2], a[1] + a[3]) - roll(b[0] + b[2], b[1] + b[3]),
  );
  const links: Link[] = [];
  for (const [c, r, c2, r2] of edges) {
    if (blocked(c, r) || blocked(c2, r2)) continue;
    taken.add(`${c},${r}`);
    taken.add(`${c2},${r2}`);
    links.push({ c, r, c2, r2 });
  }
  return links;
});

/** Screen position of a source grid cell, snapped to the sheet's dots. */
const place = (col: number, row: number, pitch: number) => {
  const snap = (screen: number) =>
    pitch / 2 + Math.round((screen - pitch / 2) / pitch) * pitch;
  return [snap(-10 + col * pitch), snap(1 + row * pitch)] as const;
};

const crosses = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  box: Clear,
) => {
  const left = Math.min(x1, x2);
  const right = Math.max(x1, x2);
  const top = Math.min(y1, y2);
  const bottom = Math.max(y1, y2);
  return right >= box.l && left <= box.r && bottom >= box.t && top <= box.b;
};

export const OutroFigures: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0, clear: [] as Clear[] });

  React.useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const measure = () => {
      const section = el.getBoundingClientRect();
      const heading = el.querySelector("#outro-heading");
      const nodes = [
        heading,
        heading?.nextElementSibling ?? null,
        el.querySelector("button"),
      ];
      const clear = nodes.flatMap((node) => {
        if (!(node instanceof Element)) return [];
        const box = node.getBoundingClientRect();
        return [
          {
            l: box.left - section.left - COPY_PAD,
            t: box.top - section.top - COPY_PAD,
            r: box.right - section.left + COPY_PAD,
            b: box.bottom - section.top + COPY_PAD,
          },
        ];
      });
      setSize({ w: el.clientWidth, h: el.clientHeight, clear });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pitch = sheetPitch(size.w);
  const links =
    size.w === 0
      ? []
      : LINKS.flatMap((link) => {
          const [x1, y1] = place(link.c, link.r, pitch);
          const [x2, y2] = place(link.c2, link.r2, pitch);
          if (size.clear.some((box) => crosses(x1, y1, x2, y2, box))) return [];
          return [{ key: `${link.c},${link.r}`, x1, y1, x2, y2 }];
        });

  return (
    <Box
      ref={ref}
      position="absolute"
      inset={0}
      display={{ base: "none", xl: "block" }}
      pointerEvents="none"
      aria-hidden
      color="soot.600"
    >
      <svg viewBox={`0 0 ${size.w} ${size.h}`} width="100%" height="100%">
        {links.map((link) => (
          <line
            key={link.key}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </Box>
  );
};
