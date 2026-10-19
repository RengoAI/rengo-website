import { colSpanWidth, GridCol } from "@/components/layout/grid";
import { DataMeshDiagram } from "@/components/site/data-mesh-diagram";
import { RULED_ROW_RULE, RuledRow } from "@/components/site/ruled-row";
import { colorVar, dottedBottom } from "@/components/site/site-styles";
import { Box, chakra, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React from "react";

export type UseCase = {
  title: string;
  /** Only the open row carries body copy and art. */
  body?: string;
  art?: boolean;
};

/**
 * The use-case list. Each row is the title and, when open, its description,
 * starting at the left of the grid. Opening a row with art narrows the title
 * column to leave room for it.
 *
 * Rows are separated by a dashed rule on their top edge, so the list reads as
 * one ruled block rather than as a stack of separate cards.
 *
 * Each title is an `h3` holding the row's toggle button. The button's
 * `::before` stretches over the whole row, so the row stays clickable while
 * the button's name is just the title.
 */
export const UseCaseAccordion: React.FC<{
  items: UseCase[];
  /**
   * Start with every row open, and let each row toggle on its own. By default
   * every row starts closed, and opening one closes the others.
   */
  defaultAllOpen?: boolean;
  /** Show a two-digit sequence number before every title. */
  showStepNumbers?: boolean;
}> = ({ items, defaultAllOpen = false, showStepNumbers = false }) => {
  const idPrefix = React.useId();
  const [openIndices, setOpenIndices] = React.useState<ReadonlySet<number>>(
    () => new Set(defaultAllOpen ? items.map((_, i) => i) : []),
  );

  const toggle = (i: number) =>
    setOpenIndices((prev) => {
      if (!defaultAllOpen) return prev.has(i) ? new Set() : new Set([i]);
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Box
      as="ul"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      w="full"
      borderRadius="4px"
      overflow="clip"
    >
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        // The title's column, and the description one column narrower.
        const titleSpan = { base: 16, md: 12, lg: isOpen && item.art ? 7 : 10 };
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          // Its hover tint, silver 200, reads against the grey band.
          <RuledRow
            key={item.title}
            as="li"
            // Containing block for the button's row-wide hit area.
            position="relative"
            // The last row closes the list with the same rule underneath.
            {...(i === items.length - 1 ? dottedBottom(RULED_ROW_RULE) : {})}
            cursor="pointer"
          >
            <GridCol
              span={titleSpan}
              start={1}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap="10px"
              textAlign="left"
            >
              <Text
                as="h3"
                textStyle="h5"
                // h5's size at h6's weight.
                fontWeight={350}
                color="site.fg"
                w="full"
                textAlign="left"
              >
                <chakra.button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen && item.body ? panelId : undefined}
                  textAlign="left"
                  // Buttons don't inherit tracking; the h3's h5 style sets it.
                  letterSpacing="inherit"
                  cursor="pointer"
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    // Over the art's absolutely placed tiles too.
                    zIndex: 1,
                  }}
                  css={{
                    "&:focus-visible": { outline: "none" },
                    "&:focus-visible::before": {
                      outline: `2px solid ${colorVar("site.highlight")}`,
                      outlineOffset: "-2px",
                    },
                  }}
                >
                  {showStepNumbers ? (
                    <Box
                      as="span"
                      display="inline-flex"
                      alignItems="center"
                      gap="16px"
                    >
                      <Box
                        as="span"
                        color="site.highlight"
                        fontSize="0.75rem"
                        fontWeight={500}
                        letterSpacing="0.08em"
                        lineHeight="1"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </Box>
                      <Box as="span">{item.title}</Box>
                    </Box>
                  ) : (
                    item.title
                  )}
                  {/* Sits on the row's right edge, level with the title. */}
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 28,
                      transform: isOpen ? "rotate(180deg)" : undefined,
                      transition: "transform 150ms ease",
                    }}
                  />
                </chakra.button>
              </Text>
              {isOpen && item.body && (
                // A step lighter than body copy (soot.700), so the description
                // sits back from the title above it.
                <Text
                  id={panelId}
                  textStyle="body.sm"
                  color="soot.600"
                  w="full"
                  maxW={{
                    base: colSpanWidth(titleSpan.base - 1, titleSpan.base),
                    md: colSpanWidth(titleSpan.md - 1, titleSpan.md),
                    lg: colSpanWidth(titleSpan.lg - 1, titleSpan.lg),
                  }}
                >
                  {item.body}
                </Text>
              )}
            </GridCol>

            {isOpen && item.art && (
              <GridCol
                span={{ base: 16, lg: 4 }}
                display="flex"
                flexDirection="column"
                alignItems={{ base: "flex-start", lg: "flex-end" }}
                h={{ base: "auto", lg: "290px" }}
                pt={{ base: "8px", lg: 0 }}
              >
                <DataMeshDiagram />
              </GridCol>
            )}
          </RuledRow>
        );
      })}
    </Box>
  );
};
