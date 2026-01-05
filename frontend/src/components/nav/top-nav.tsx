import { Logo } from "@/components/logo/logo";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TOP_NAV_HEIGHT = 48;

export const AppTopNav: React.FC = () => (
  <Box
    bg="bg.surface"
    borderBottom="1px solid"
    borderColor="border.muted"
    p={2}
    width="100%"
    position="sticky"
    top={0}
    zIndex={1000}
  >
    <Flex alignItems="center" justifyContent="space-between">
      <Link to="/">
        <Logo color="primary.700" size="default" />
      </Link>
      <HStack gap={3}>
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
  </Box>
);
