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
        color="site.fg.onDarkMuted"
        maxW="215px"
      >
        {description}
      </Text>
    </Box>
  </Box>
);

/**
 * The security band's tiles as one dashed container: a frame around the
 * whole group, split into four-column tiles by single shared dividers, with
 * no gutters between them.
 */
export type ComplianceCardGroupProps = GridProps & {
  items: ComplianceCardProps[];
};

export const ComplianceCardGroup: React.FC<ComplianceCardGroupProps> = ({
  items,
  ...rest
}) => (
  <Grid
    gap={0}
    borderWidth="1px"
    borderStyle="dotted"
    borderColor="site.border.onDark"
    {...rest}
  >
    {items.map((item, i) => (
      <GridCol
        key={item.title}
        span={4}
        borderLeftWidth={i === 0 ? 0 : "1px"}
        borderLeftStyle="dotted"
        borderLeftColor="site.border.onDark"
      >
        <ComplianceCard {...item} />
      </GridCol>
    ))}
  </Grid>
);
