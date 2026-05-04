import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";
import { Link } from "react-router-dom";

interface LogoProps {
  color: "white" | "primary.700";
  isCollapsed?: boolean;
  /** Display mode makes the icon decorative only. Toggle mode uses the real color-mode action. */
  colorModeBehavior?: "display" | "toggle";
  layout?: "nav" | "footer";
  /** Wordmark links home (use with `colorModeBehavior="toggle"` so the button stays outside the link) */
  homeLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  color,
  isCollapsed = false,
  colorModeBehavior = "display",
  layout = "nav",
  homeLink = false,
}) => {
  const isFooter = layout === "footer";
  const displayOnly = colorModeBehavior === "display";

  const wordmark = (
    <Text fontSize="xl" fontFamily="heading" color={color}>
      rengo ai
    </Text>
  );

  return (
    <Flex
      alignItems="center"
      justify="flex-start"
      gap={isCollapsed ? 0 : isFooter ? 1.5 : 0.5}
    >
      <ColorModeButton
        size="sm"
        variant="ghost"
        color={color}
        {...(displayOnly
          ? {
              onClick: noop,
              tabIndex: -1,
              pointerEvents: "none" as const,
              _hover: { bg: "transparent", color },
              _active: { bg: "transparent", color },
              _focusVisible: { boxShadow: "none" },
            }
          : {})}
      />
      {!isCollapsed &&
        (homeLink ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            {wordmark}
          </Link>
        ) : (
          wordmark
        ))}
    </Flex>
  );
};
