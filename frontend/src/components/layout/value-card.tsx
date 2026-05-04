import { Box, Text } from "@chakra-ui/react";
import React from "react";

const EDICT = '"Space Mono", SFMono-Regular, ui-monospace, monospace';

interface ValueCardProps {
  number: string;
  title: string;
  body: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({ number, title, body }) => (
  <Box borderTop="1px solid" borderColor="primary.700" pt={5}>
    <Text
      as="span"
      fontFamily={EDICT}
      fontSize="11px"
      color="primary.700"
      letterSpacing="0.08em"
    >
      {number}
    </Text>
    <Box
      as="h3"
      mt="10px"
      mb="12px"
      fontFamily="heading"
      fontSize="24px"
      fontWeight={400}
      color="primary.800"
    >
      {title}
    </Box>
    <Text fontSize="sm" lineHeight={1.6} color="gray.600">
      {body}
    </Text>
  </Box>
);
