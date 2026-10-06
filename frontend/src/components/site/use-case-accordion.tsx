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
 * to make room for the 4-column art rather than changing the layout.
 *
 * Rows are separated by a dashed rule on their top edge, so the list reads as
 * one ruled block rather than as a stack of separate cards.
 */
export const UseCaseAccordion: React.FC<{ items: UseCase[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = React.useState(0);

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
        const isOpen = i === openIndex;
        return (
          <Grid
            key={item.title}
            as="button"
            onClick={() => setOpenIndex(i)}
            aria-expanded={isOpen}
            textAlign="left"
            py="20px"
            borderTopWidth="1px"
            borderTopStyle="dotted"
            borderTopColor="site.border.dashed"
            cursor="pointer"
            transition="background 150ms ease"
            _hover={{ bg: "blackAlpha.50" }}
          >
            <GridCol span={5}>
              <Text
                textStyle="label"
                fontFamily="display"
                letterSpacing="0"
                textTransform="capitalize"
                color="site.fg.muted"
                lineHeight="1.1"
              >
                {item.audience}
              </Text>
            </GridCol>

            <GridCol
              span={isOpen && item.art ? 7 : 10}
              display="flex"
              flexDirection="column"
              gap="20px"
            >
              <Text textStyle="h5" color="site.fg" w="full">
                {item.title}
              </Text>
              {isOpen && item.body && (
                <Text textStyle="body.sm" color="site.fg" w="full">
                  {item.body}
                </Text>
              )}
            </GridCol>

            {isOpen && item.art && (
              <GridCol
                span={4}
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                h="290px"
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
