import { Grid, GridCol, type GridProps } from "@/components/layout/grid";
import { Box, type BoxProps, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Security band tile, bottom-aligned so the titles sit on a shared baseline
 * regardless of how long the copy above them runs. It draws no border of its
 * own: `ComplianceCardGroup` frames the tiles as one container.
 */
export type ComplianceCardProps = BoxProps & {
  title: string;
  description: string;
  /** Optional badge pinned to the top-left corner. */
  badgeSrc?: string;
};

export const ComplianceCard: React.FC<ComplianceCardProps> = ({
  title,
  description,
  badgeSrc,
  ...rest
}) => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    justifyContent="flex-end"
    h="full"
    // Holds room for the badge once the tiles stack and lose the group's
    // fixed height.
    minH={{ base: "160px", md: "200px" }}
    p="20px"
    {...rest}
  >
    {badgeSrc && (
      <Image
        src={badgeSrc}
        alt=""
        position="absolute"
        left="15px"
        top="17px"
        boxSize="40px"
        objectFit="cover"
      />
    )}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="16px"
      w="full"
    >
      <Text textStyle="d5" lineHeight="1.1" color="site.fg.onDark" w="full">
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
 * two on tablet, stacked on mobile.
 */
export type ComplianceCardGroupProps = GridProps & {
  items: ComplianceCardProps[];
};

export const ComplianceCardGroup: React.FC<ComplianceCardGroupProps> = ({
  items,
  ...rest
}) => (
  <Grid rowGap={{ base: "24px", lg: "gridGutter" }} {...rest}>
    {items.map((item) => (
      <GridCol
        key={item.title}
        span={{ base: 16, md: 8, lg: 4 }}
        borderLeftWidth="1px"
        borderLeftStyle="dotted"
        borderLeftColor="site.border.onDark"
      >
        <ComplianceCard {...item} />
      </GridCol>
    ))}
  </Grid>
);
