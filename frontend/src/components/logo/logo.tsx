import { rootRoute } from "@/app/app-routes";
import { Flex, Text } from "@chakra-ui/react";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

type LogoColor = "white" | "indigo.700" | "indigo.900" | "slate.30";

/** CSS custom property backing each supported wordmark color. */
const LOGO_ICON_COLOR: Record<LogoColor, string> = {
  white: "white",
  "indigo.700": "var(--rengo-colors-indigo-700)",
  "indigo.900": "var(--rengo-colors-indigo-900)",
  "slate.30": "var(--rengo-colors-slate-30)",
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
    <Text fontSize="md" fontFamily="heading" letterSpacing="tight" color={color}>
      rengo
    </Text>
  );

  return (
    <Flex alignItems="center" justify="flex-start" gap={1}>
      <Sun size={14} color={LOGO_ICON_COLOR[color]} />
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
