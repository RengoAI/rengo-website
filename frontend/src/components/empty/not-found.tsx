import { rootRoute } from "@/app/app-routes";
import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Center w="100%" minH="100vh">
      <VStack alignItems="flex-start" gap={12} w="100%" maxW="450px">
        <VStack alignItems="flex-start" gap={4}>
          <Text fontSize="5xl" color="ink.body">
            Not Found
          </Text>
          <Text fontSize="md" color="slate.50">
            Looks like the page you are looking for does not exist. If you need
            help, please contact support.
          </Text>
          <Button
            variant="outline"
            border="1px solid"
            borderColor="slate.30"
            borderRadius="md"
            _hover={{
              borderColor: "slate.30",
              bg: "slate.10",
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
