import { rootRoute } from "@/app/app-routes";
import { Flex, Text } from "@chakra-ui/react";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

type LogoColor = "white" | "indigo.700" | "indigo.900";

/** CSS custom property backing each supported wordmark color. */
const LOGO_ICON_COLOR: Record<LogoColor, string> = {
  white: "white",
  "indigo.700": "var(--rengo-colors-indigo-700)",
  "indigo.900": "var(--rengo-colors-indigo-900)",
};

interface LogoProps {
  color: LogoColor;
  isCollapsed?: boolean;
  homeLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  color,
  isCollapsed = false,
  homeLink = false,
}) => {
  const wordmark = (
    <Text fontSize="xl" fontFamily="heading" color={color}>
      rengo ai
    </Text>
  );

  return (
    <Flex alignItems="center" justify="flex-start" gap={2}>
      <Sun size={18} color={LOGO_ICON_COLOR[color]} />
      {!isCollapsed &&
        (homeLink ? (
          <Link to={rootRoute({}).$} style={{ textDecoration: "none" }}>
            {wordmark}
          </Link>
        ) : (
          wordmark
        ))}
    </Flex>
  );
};
