import { Box, type BoxProps, Image, Text } from "@chakra-ui/react";
import React from "react";

/**
 * Security band tile. Fully dashed rather than rule-on-one-edge like
 * `SplitCard`, and bottom-aligned so the four titles sit on a shared
 * baseline regardless of how long the copy above them runs.
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
    borderWidth="1px"
    borderStyle="dotted"
    borderColor="site.border.onDark"
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
