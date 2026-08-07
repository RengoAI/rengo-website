import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface ValueCardProps {
  number: string;
  title: string;
  body: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  number,
  title,
  body,
}) => (
  <Box borderTop="1px solid" borderColor="slate.30" pt={5}>
    <Text
      as="span"
      fontFamily="mono"
      fontSize="xs"
      color="slate.50"
      letterSpacing="0.08em"
    >
      {number}
    </Text>
    <Box
      as="h3"
      mt={2.5}
      mb={3}
      fontFamily="heading"
      fontSize="2xl"
      fontWeight={350}
      color="indigo.900"
    >
      {title}
    </Box>
    <Text fontSize="sm" lineHeight={1.6} color="ink.body">
      {body}
    </Text>
  </Box>
);
