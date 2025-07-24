import { rootRoute } from "@/app/app-routes";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import { noop } from "lodash-es";
import { useNavigate } from "react-router-dom";

export const AppTopNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex
      alignItems="center"
      h="16"
      borderBottomWidth="1px"
      borderColor="bg.surface.50"
      bg="transparent"
    >
      {/* Header */}
      <Flex height="16" alignItems="center" px="4" justify="flex-start" gap="0">
        <Flex
          alignItems="center"
          ml="2"
          cursor="pointer"
          onClick={() => navigate(rootRoute({}).root({}).$)}
        >
          <Text fontSize="2xl" fontWeight="bold" color="primary.500">
            rengo ai
          </Text>
          <ColorModeButton
            size="sm"
            variant="ghost"
            color="primary.500"
            pointerEvents="none"
            tabIndex={-1}
            onClick={noop}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
