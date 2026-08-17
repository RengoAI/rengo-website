import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ArrowRight, Sparkle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

/**
 * "Unlock collective intelligence" — a question put to what the firm knows.
 *
 * A search field over source-backed results: the way you reach collective
 * knowledge is by asking it something, so the tile shows the asking. Replaces a
 * growing-stack figure that read as one dataset getting bigger over time —
 * which said nothing about the knowledge being shared, and duplicated what
 * "Structure knowledge" already shows.
 *
 * Presentational only. The field is a styled Box rather than an <input>: a real
 * input inside decorative bento art would take keyboard focus and read as
 * interactive to a screen reader, so the whole figure is aria-hidden instead.
 */

const QUERY = "Our perspective on…";
const SPARKLE = "#0071E3";
const ARROW_STROKE = "#425366"; // slate.100
const INK = "#124476"; // indigo.700
const CHAR_MS = 70;
const HOLD_MS = 2200;

const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

const useTypedChars = (text: string, active: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !active) {
      setCount(reduce ? text.length : 0);
      return;
    }

    let i = 0;
    let timer = 0;
    const type = () => {
      i += 1;
      if (i <= text.length) {
        setCount(i);
        timer = window.setTimeout(type, CHAR_MS);
      } else {
        timer = window.setTimeout(() => {
          i = 0;
          setCount(0);
          timer = window.setTimeout(type, 320);
        }, HOLD_MS);
      }
    };
    timer = window.setTimeout(type, 280);
    return () => window.clearTimeout(timer);
  }, [text, active]);

  return count;
};

/** Same vendor chips as connect-systems-art — search spans model providers. */
const PROVIDER_TILES = [
  { id: "claude", label: "Claude", src: "/logos/claude.png", maxH: "16px" },
  {
    id: "copilot",
    label: "Copilot",
    src: "/logos/copilot.png",
    maxH: "16px",
  },
  { id: "openai", label: "OpenAI", src: "/logos/open-ai.png", maxH: "18px" },
] as const;

type CollectiveSearchArtProps = {
  variant?: "tile" | "compact";
};

export const CollectiveSearchArt: React.FC<CollectiveSearchArtProps> = ({
  variant = "tile",
}) => {
  const isCompact = variant === "compact";
  const tileSize = isCompact ? "32px" : "40px";
  const vendorGap = isCompact ? 1.5 : 2;
  const { ref, inView } = useInView();
  const visibleCount = useTypedChars(QUERY, inView);

  return (
    <Box ref={ref} w="full" maxW="100%" mx="auto" aria-hidden>
      <Flex
        align="center"
        gap={2}
        bg="white"
        border="1px solid"
        borderColor="slate.30"
        borderRadius="8px"
        pl={isCompact ? 2.5 : 3}
        pr={isCompact ? 3 : 4}
        py={isCompact ? 2 : 2.5}
        minH={isCompact ? "36px" : "44px"}
        minW={0}
        boxShadow="0 8px 24px rgba(33, 48, 68, 0.08)"
        w="full"
        css={{
          "@keyframes rengo-sparkle-spin": {
            to: { transform: "rotate(360deg)" },
          },
          "@keyframes rengo-sparkle-glow": {
            "0%, 100%": {
              filter: "drop-shadow(0 0 2px rgba(0, 113, 227, 0.4))",
            },
            "50%": {
              filter: "drop-shadow(0 0 7px rgba(0, 113, 227, 0.95))",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "& [data-sparkle]": { animation: "none" },
          },
        }}
      >
        <Flex align="center" gap={isCompact ? 2.5 : 3} flex="1" minW={0}>
          <Box
            data-sparkle
            color={SPARKLE}
            display="flex"
            flexShrink={0}
            animation="rengo-sparkle-spin 5.5s linear infinite, rengo-sparkle-glow 2.2s ease-in-out infinite"
            style={{ animationPlayState: inView ? "running" : "paused" }}
          >
            <Sparkle size={13} strokeWidth={2.25} />
          </Box>
          <Text
            fontFamily="body"
            fontSize={isCompact ? "9px" : "10px"}
            lineHeight="12px"
            letterSpacing="-0.2px"
            color={INK}
            flex="1"
            minW={0}
            whiteSpace="nowrap"
            overflow="hidden"
            m={0}
          >
            {QUERY.split("").map((char, i) => (
              <Box
                as="span"
                key={`${char}-${i}`}
                display="inline"
                opacity={i < visibleCount ? 1 : 0}
                transition="opacity 280ms ease"
              >
                {char === " " ? "\u00a0" : char}
              </Box>
            ))}
          </Text>
        </Flex>
        <Flex
          w={isCompact ? "12px" : "16px"}
          h={isCompact ? "12px" : "16px"}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <ArrowRight
            size={isCompact ? 12 : 13}
            strokeWidth={1.75}
            color={ARROW_STROKE}
            aria-hidden
          />
        </Flex>
      </Flex>

      <Flex align="center" justify="center" gap={vendorGap} mt={2.5}>
        {PROVIDER_TILES.map((vendor) => (
          <Box
            key={vendor.id}
            w={tileSize}
            h={tileSize}
            flexShrink={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="slate.10"
            border="1px solid"
            borderColor="slate.30"
            borderRadius="6px"
            boxShadow="0 6px 18px rgba(33, 48, 68, 0.08)"
          >
            <Image
              src={vendor.src}
              alt=""
              maxH={vendor.maxH}
              maxW="28px"
              w="auto"
              h="auto"
              objectFit="contain"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
