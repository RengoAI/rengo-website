import { Box } from "@chakra-ui/react";
import React from "react";

/** Dot pitch and width of `hero-mesh.png`, so a drawn grid can match it. */
export const MESH_PITCH = 22;
export const MESH_WIDTH = 2616;

/**
 * Pitch of the sheet drawn for a band of `clientWidth`. The source image was
 * never narrower than 1443px and hung 10px past the band's left edge.
 */
export const sheetPitch = (clientWidth: number) =>
  (MESH_PITCH * Math.max(clientWidth + 10, 1443)) / MESH_WIDTH;

/**
 * Centres of the sheet's dots along one axis, from `start` through `end`.
 * A radial-gradient tile paints its dot in the middle, so the first centre
 * is half a pitch in.
 */
export const sheetCenters = (pitch: number, start: number, end: number) => {
  const origin = pitch / 2;
  const centers: number[] = [];
  const first = Math.max(0, Math.ceil((start - origin) / pitch - 1e-9));
  for (let i = first; ; i++) {
    const at = origin + i * pitch;
    if (at > end + 1e-6) break;
    centers.push(at);
  }
  return centers;
};

/**
 * The sheet's paper, and the dot ink. Hard-light of `#BABCC2` over
 * `silver.200` is `silver.100` (`#E8EDF4`).
 */
const MESH_FIELD = "#F2F1ED";
const MESH_DOT = "#BABCC2";
/** Source-pixel radius of one dot (about 3px across). */
const MESH_DOT_R = 1.5;

/**
 * The rebrand dot grid, drawn to fill its parent, without the character
 * clusters baked into `hero-mesh.png`. Pitch follows that image: it was
 * sized to the band's width (never under 1443px), and this uses that scale.
 * It has to sit on `site.bg.tint` — hard-light washes that silver toward
 * the sheet's off-white and leaves the dots.
 *
 * With `dot`, it draws just the dots, in that colour, straight over
 * whatever band it's in — no paper, no blend.
 */
export const DotSheet: React.FC<{ dot?: string }> = ({ dot }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pitch, setPitch] = React.useState(() => sheetPitch(0));

  React.useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const measure = () => {
      setPitch(sheetPitch(el.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = pitch * (MESH_DOT_R / MESH_PITCH);
  return (
    <Box
      ref={ref}
      position="absolute"
      inset={0}
      bg={dot ? undefined : MESH_FIELD}
      mixBlendMode={dot ? undefined : "hard-light"}
      pointerEvents="none"
      aria-hidden
      style={{
        backgroundImage: `radial-gradient(circle, ${dot ?? MESH_DOT} ${radius}px, transparent ${radius + 0.6}px)`,
        backgroundSize: `${pitch}px ${pitch}px`,
      }}
    />
  );
};
