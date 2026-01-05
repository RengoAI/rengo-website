import { Logo } from "@/components/logo/logo";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
    <Link to="/" style={{ marginLeft: "0.5rem" }}>
      <Logo color="primary.700" size="default" />
    </Link>
    {/* CTA Buttons */}
    <HStack gap={3} mr={8}>
      <Button
        variant="ghost"
        size="sm"
        display={{ base: "none", sm: "inline-flex" }}
        onClick={() => window.open("https://app.rengoai.com/", "_blank")}
      >
        Sign in
      </Button>
      <Button
        colorScheme="primary"
        variant="solid"
        size="sm"
        onClick={() => window.open("mailto:sales@rengoai.com", "_blank")}
      >
        Join waitlist
      </Button>
    </HStack>
  </Flex>
);
