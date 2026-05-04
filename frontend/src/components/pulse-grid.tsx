import React from "react";

interface PulseGridProps {
  id?: string;
  tone?: "light" | "dark" | "navy";
  density?: "quiet" | "dense";
  width?: number;
  height?: number;
  cols?: number;
  rows?: number;
  showHeaderRow?: boolean;
  tintColor?: string;
  greenColor?: string;
  fadeBottom?: boolean;
}

export const PulseGrid: React.FC<PulseGridProps> = ({
  id = "pg",
  tone = "light",
  density = "quiet",
  width = 600,
  height = 700,
  cols = 10,
  rows = 25,
  showHeaderRow = true,
  tintColor = "var(--rengo-colors-primary-50)",
  greenColor = "var(--rengo-colors-green-400)",
  fadeBottom = true,
}) => {
  const cellW = width / cols;
  const cellH = height / rows;

  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const makeRng = () => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  const rng = makeRng();

  const pulseCount = density === "dense" ? 8 : 4;
  const pulseCycle = 5;
  const pulseDelayStep = 0.45;
  const clampCell = (col: number, row: number) => ({
    col: Math.min(cols - 1, Math.max(0, col)),
    row: Math.min(rows - 1, Math.max(0, row)),
  });
  const highlightLocations = [
    clampCell(Math.round(cols * 0.5), Math.round(rows * 0.18)),
    clampCell(Math.round(cols * 0.82), Math.round(rows * 0.58)),
    clampCell(Math.round(cols * 0.56), Math.round(rows * 0.82)),
    clampCell(Math.round(cols * 0.9), Math.round(rows * 0.76)),
    clampCell(Math.round(cols * 0.72), Math.round(rows * 0.32)),
    clampCell(Math.round(cols * 0.38), Math.round(rows * 0.68)),
    clampCell(Math.round(cols * 0.88), Math.round(rows * 0.44)),
    clampCell(Math.round(cols * 0.62), Math.round(rows * 0.9)),
  ];
  const [pulseCycleIndex, setPulseCycleIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPulseCycleIndex((index) => index + 1);
    }, pulseCycle * 1000);

    return () => window.clearInterval(intervalId);
  }, [pulseCycle]);

  const highlights = Array.from({ length: pulseCount }).map((_, index) => ({
    delay: index * pulseDelayStep,
    location:
      highlightLocations[
        (pulseCycleIndex * pulseCount + index) % highlightLocations.length
      ],
  }));

  const tintRows: number[] = [];
  const used = new Set([0]);
  while (tintRows.length < 6) {
    const r = 2 + Math.floor(rng() * (rows - 4));
    if (!used.has(r)) {
      used.add(r);
      tintRows.push(r);
    }
  }

  const tintCycle = 16;
  const stepPct = 100 / tintRows.length;

  const fadeId = `${id}-fade`;
  const cellsId = `${id}-cells`;
  const isDark = tone === "dark" || tone === "navy";
  const strokeColor =
    tone === "navy"
      ? "var(--rengo-colors-white-alpha-300)"
      : isDark
        ? "var(--rengo-colors-white-alpha-150)"
        : "var(--rengo-colors-gray-275)";
  const headerFill = isDark ? "var(--rengo-colors-white-alpha-50)" : "var(--rengo-colors-gray-115)";
  const fadeColor =
    tone === "navy" ? "var(--rengo-colors-primary-800)" : isDark ? "var(--rengo-colors-primary-800)" : "var(--rengo-colors-white)";

  const pulseOpacity = tone === "navy" ? 0.68 : isDark ? 0.85 : 0.55;
  const tintOpacity = isDark ? 0.22 : 0.45;

  const tintKeyframes = tintRows
    .map((r, i) => {
      const top = i * stepPct;
      const settle = top + stepPct * 0.15;
      const hold = top + stepPct * 0.85;
      return `${top.toFixed(2)}% { transform: translateY(${r * cellH}px); opacity: 0; }
              ${settle.toFixed(2)}% { transform: translateY(${r * cellH}px); opacity: ${tintOpacity}; }
              ${hold.toFixed(2)}% { transform: translateY(${r * cellH}px); opacity: ${tintOpacity}; }`;
    })
    .join("\n");

  return (
    <>
      <style>{`
        @keyframes ${id}-cellPulse {
          0%, 100% { opacity: 0; }
          18%, 38% { opacity: ${pulseOpacity}; }
        }
        @keyframes ${id}-tintCycle {
          ${tintKeyframes}
          100% { transform: translateY(${tintRows[0] * cellH}px); opacity: 0; }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id={fadeId} x1="0" x2="1" y1="0.2" y2="1">
            <stop offset="0%" stopColor={fadeColor} stopOpacity={0} />
            <stop offset="55%" stopColor={fadeColor} stopOpacity={isDark ? 0.5 : 0.7} />
            <stop offset="100%" stopColor={fadeColor} stopOpacity={isDark ? 0.85 : 0.95} />
          </linearGradient>
          <pattern id={cellsId} width={cellW} height={cellH} patternUnits="userSpaceOnUse">
            <rect width={cellW} height={cellH} fill="none" stroke={strokeColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill={`url(#${cellsId})`} />
        {showHeaderRow && (
          <rect x="0" y="0" width={width} height={cellH} fill={headerFill} opacity="0.6" />
        )}
        <rect
          x="0"
          y="0"
          width={width}
          height={cellH}
          fill={tintColor}
          style={{
            animation: `${id}-tintCycle ${tintCycle}s ease-in-out infinite`,
            opacity: 0,
          }}
        />
        {highlights.map((h, i) => (
          <rect
            key={`${pulseCycleIndex}-${i}`}
            x={h.location.col * cellW + 0.5}
            y={h.location.row * cellH + 0.5}
            width={cellW - 1}
            height={cellH - 1}
            fill={greenColor}
            style={{
              animation: `${id}-cellPulse ${pulseCycle}s ease-in-out ${h.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
        {fadeBottom && <rect width={width} height={height} fill={`url(#${fadeId})`} />}
      </svg>
    </>
  );
};
