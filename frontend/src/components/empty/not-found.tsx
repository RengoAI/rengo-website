import { rootRoute } from "@/app/app-routes";
import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Center w="100%" minH="100vh">
      <VStack alignItems="flex-start" gap="48px" w="100%" maxW="450px">
        <VStack alignItems="flex-start" gap="16px">
          <Text fontSize="44px" color="gray.700">
            Not Found
          </Text>
          <Text fontSize="16px" color="gray.500">
            Looks like the page you are looking for does not exist. If you need
            help, please contact support.
          </Text>
          <Button
            variant="outline"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            _hover={{
              borderColor: "gray.300",
              bg: "gray.50",
            }}
            onClick={() =>
              navigate(rootRoute({}).$, {
                replace: true,
              })
            }
          >
            <Home size={16} />
            <Text>Home</Text>
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
};
