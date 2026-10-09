import { Grid, GridCol } from "@/components/layout/grid";
import { DataMeshDiagram } from "@/components/site/data-mesh-diagram";
import { Box, Text } from "@chakra-ui/react";
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
 * The use-case list. Every row is the same three-part grid — label (5),
 * title (10), art — and opening a row simply narrows the title column to 7
 * to make room for the 4-column art rather than changing the layout. Below
 * `lg` the three parts stack instead, label over title over art.
 *
 * Rows are separated by a dashed rule on their top edge, so the list reads as
 * one ruled block rather than as a stack of separate cards.
 */
export const UseCaseAccordion: React.FC<{
  items: UseCase[];
  /**
   * Start with every row open, and let each row toggle on its own. By default
   * only the first row is open and opening another closes it.
   */
  defaultAllOpen?: boolean;
}> = ({ items, defaultAllOpen = false }) => {
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
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      w="full"
      borderRadius="4px"
      overflow="clip"
    >
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <Grid
            key={item.title}
            as="button"
            onClick={() => toggle(i)}
            aria-expanded={isOpen}
            textAlign="left"
            rowGap="12px"
            py="20px"
            borderTopWidth="1px"
            borderTopStyle="dotted"
            borderTopColor="site.border.dashed"
            cursor="pointer"
            transition="background 150ms ease"
            _hover={{ bg: "site.bg.tintSubtle" }}
          >
            <GridCol span={{ base: 16, lg: 5 }}>
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
              span={{ base: 16, md: 12, lg: isOpen && item.art ? 7 : 10 }}
              display="flex"
              flexDirection="column"
              gap="10px"
            >
              <Text textStyle="h6" color="site.fg" w="full">
                {item.title}
              </Text>
              {isOpen && item.body && (
                // A step lighter than body copy (soot.700), so the description
                // sits back from the title above it.
                <Text textStyle="body.sm" color="soot.600" w="full">
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
          </Grid>
        );
      })}
    </Box>
  );
};
