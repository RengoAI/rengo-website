import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";

interface LogoProps {
  color: "white" | "primary.700";
  isCollapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ color, isCollapsed = false }) => (
  <Flex alignItems="center" justify="flex-start" gap={isCollapsed ? 0 : 0.5}>
    <ColorModeButton
      mt="2"
      size="sm"
      variant="ghost"
      color={color}
      onClick={noop}
      tabIndex={-1}
      _hover={{ bg: "transparent" }}
    />
    {!isCollapsed && (
      <Text fontSize="xl" fontWeight="medium" color={color}>
        rengo ai
      </Text>
    )}
  </Flex>
);
