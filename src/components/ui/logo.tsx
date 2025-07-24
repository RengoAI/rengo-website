import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";

export const Logo = () => (
  <Flex alignItems="center" px="4" justify="center" gap="1">
    <Text fontSize="3xl" fontWeight="bold" color="primary.500">
      rengo ai
    </Text>
    <ColorModeButton
      mt={1}
      size="sm"
      variant="ghost"
      color="primary.500"
      cursor="none"
      onClick={noop}
      tabIndex={-1}
    />
  </Flex>
);
