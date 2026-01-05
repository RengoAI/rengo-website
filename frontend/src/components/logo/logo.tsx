import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";

interface LogoProps {
  color: "white" | "primary.700";
  size: "default" | "large";
  isCollapsed?: boolean;
}

const sizeStyles = {
  default: {
    iconSize: "sm" as const,
    iconMt: "2",
    iconGap: 1,
    fontSize: "2xl",
  },
  large: {
    iconSize: "2xl" as const,
    iconMt: "3",
    iconGap: 2,
    fontSize: "5xl",
  },
};

export const Logo: React.FC<LogoProps> = ({
  color,
  size = "default",
  isCollapsed = false,
}) => {
  const styles = sizeStyles[size];

  return (
    <Flex
      alignItems="center"
      justify="flex-start"
      gap={isCollapsed ? 0 : styles.iconGap}
    >
      <ColorModeButton
        mt={styles.iconMt}
        size={styles.iconSize}
        variant="ghost"
        color={color}
        onClick={noop}
        tabIndex={-1}
        _hover={{ bg: "transparent" }}
      />
      {!isCollapsed && (
        <Text fontSize={styles.fontSize} fontWeight="bold" color={color}>
          rengo ai
        </Text>
      )}
    </Flex>
  );
};
