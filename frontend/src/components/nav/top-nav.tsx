import { Logo } from "@/components/logo/logo";
import { Button, Flex, HStack } from "@chakra-ui/react";

export const AppTopNav: React.FC = () => (
  <Flex
    alignItems="center"
    h="16"
    borderBottomWidth="1px"
    borderColor="bg.surface.50"
    bg="white"
    position="sticky"
    justifyContent="space-between"
    top={0}
    zIndex={1000}
  >
    {/* Header */}
    <Logo color="primary.500" ml={6} />
    {/* CTA Buttons */}
    <HStack gap={3} mr={8}>
      <Button
        variant="ghost"
        size="sm"
        display={{ base: "none", sm: "inline-flex" }}
      >
        Sign in
      </Button>
      <Button
        colorScheme="primary"
        variant="solid"
        size="sm"
        onClick={() => window.open("mailto:sales@getrengo.com", "_blank")}
      >
        Join waitlist
      </Button>
    </HStack>
  </Flex>
);
