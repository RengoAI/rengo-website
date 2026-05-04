import { rootRoute } from "@/app/app-routes";
import { Flex, Text } from "@chakra-ui/react";
import { Sun } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  color: "white" | "primary.700";
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
      <Sun
        size={18}
        color={color === "white" ? "white" : "var(--rengo-colors-primary-700)"}
      />
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
