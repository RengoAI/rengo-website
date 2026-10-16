import { Grid, GridCol, type GridProps } from "@/components/layout/grid";
import { dottedLeft } from "@/components/site/site-styles";
import { Box, type BoxProps, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Security band tile, bottom-aligned so the titles sit on a shared baseline
 * regardless of how long the copy above them runs. It draws no border of its
 * own: `ComplianceCardGroup` frames the tiles as one container.
 */
export type ComplianceCardProps = BoxProps & {
  title: string;
  description: string;
};

export const ComplianceCard: React.FC<ComplianceCardProps> = ({
  title,
  description,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    justifyContent="flex-end"
    h="full"
    // Holds the tiles open below lg, where they lose the group's fixed
    // height.
    minH={{ base: "160px", md: "200px" }}
    // Phones: no vertical padding, 1rem either side.
    px={{ base: "1rem", md: "20px" }}
    py={{ base: 0, md: "20px" }}
    {...rest}
  >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="16px"
      w="full"
    >
      <Text
        as="h3"
        textStyle="d5"
        lineHeight="1.1"
        color="site.fg.onDark"
        w="full"
      >
        {title}
      </Text>
      <Text
        textStyle="label"
        fontWeight={300}
        color="site.fg.onDarkSubtle"
        maxW="215px"
      >
        {description}
      </Text>
    </Box>
  </Box>
);

/**
 * The security band's tiles, each hung off a dotted rule on its left edge —
 * like the metric cards — rather than framed. Four across on desktop, two by
 * two below that.
 */
export type ComplianceCardGroupProps = GridProps & {
  items: ComplianceCardProps[];
};

export const ComplianceCardGroup: React.FC<ComplianceCardGroupProps> = ({
  items,
  ...rest
}) => (
  <Grid as="ul" rowGap={{ base: "24px", lg: "gridGutter" }} {...rest}>
    {items.map((item) => (
      <GridCol
        as="li"
        key={item.title}
        span={{ base: 8, lg: 4 }}
        {...dottedLeft("site.border.onDark")}
      >
        <ComplianceCard {...item} />
      </GridCol>
    ))}
  </Grid>
);
