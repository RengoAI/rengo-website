import { colSpanWidth, GridCol } from "@/components/layout/grid";
import { DataMeshDiagram } from "@/components/site/data-mesh-diagram";
import { RULED_ROW_RULE, RuledRow } from "@/components/site/ruled-row";
import { colorVar, dottedBottom } from "@/components/site/site-styles";
import { Box, chakra, Text } from "@chakra-ui/react";
import React from "react";

export type UseCase = {
  /** Who the row is about — the small capitalised label on the left. */
  audience: string;
  title: string;
  /** Only the open row carries body copy and art. */
  body?: string;
  art?: boolean;
};

/**
 * The use-case list. Every row is the same three-part grid — label (4),
 * title (10), art — and opening a row simply narrows the title column to 7
 * to make room for the 4-column art rather than changing the layout. Below
 * `lg` the three parts stack instead, label over title over art.
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
   * only the first row is open and opening another closes it.
   */
  defaultAllOpen?: boolean;
}> = ({ items, defaultAllOpen = false }) => {
  const idPrefix = React.useId();
  const [openIndices, setOpenIndices] = React.useState<ReadonlySet<number>>(
    () => new Set(defaultAllOpen ? items.map((_, i) => i) : [0]),
  );

  const toggle = (i: number) =>
    setOpenIndices((prev) => {
      if (!defaultAllOpen) return new Set([i]);
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
            {/* From lg, where they share a row, the label is centred on the
                title's first line: one h6 line box, 20px × 1.2. */}
            <GridCol
              span={{ base: 16, lg: 4 }}
              display={{ lg: "flex" }}
              alignItems="center"
              h={{ lg: "24px" }}
            >
              <Text
                textStyle="label"
                fontWeight={300}
                letterSpacing="0"
                textTransform="capitalize"
                color="site.fg.muted"
                lineHeight="1.1"
              >
                {item.audience}
              </Text>
            </GridCol>

            <GridCol
              span={titleSpan}
              display="flex"
              flexDirection="column"
              gap="10px"
            >
              <Text as="h3" textStyle="h6" color="site.fg" w="full">
                <chakra.button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen && item.body ? panelId : undefined}
                  textAlign="left"
                  // Buttons don't inherit tracking; the h3's h6 style sets it.
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
                  {item.title}
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
