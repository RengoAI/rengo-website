import { rootRoute } from "@/app/app-routes";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";
import { useNavigate } from "react-router-dom";

interface LogoProps extends FlexProps {
  color?: "primary.500" | "white";
}

export const Logo: React.FC<LogoProps> = ({
  color = "primary.500",
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <Flex
      height="16"
      alignItems="center"
      justify="flex-start"
      gap="0"
      {...props}
    >
      <Flex
        alignItems="center"
        cursor="pointer"
        _hover={{ color: "gray.900" }}
        onClick={() => navigate(rootRoute({}).landingIndex({}).$)}
      >
        <Text fontSize="2xl" fontWeight="bold" color={color}>
          rengo ai
        </Text>
        <ColorModeButton
          size="sm"
          variant="ghost"
          color={color}
          pointerEvents="none"
          tabIndex={-1}
          onClick={noop}
        />
      </Flex>
    </Flex>
  );
};
