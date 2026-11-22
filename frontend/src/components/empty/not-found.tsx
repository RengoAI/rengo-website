import { rootRoute } from "@/app/app-routes";
import { SolidCta } from "@/components/site/solid-cta";
import { Center, Text, VStack } from "@chakra-ui/react";

export const NotFound = () => (
  <Center w="100%" flex="1" px="gutter" py="96px">
    <VStack alignItems="flex-start" gap={6} w="100%" maxW="450px">
      <Text as="h1" textStyle="h3" color="site.fg.heading">
        Page not found
      </Text>
      <Text textStyle="body.md" color="site.fg">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </Text>
      {/* The site's button: one way out. */}
      <SolidCta h="32px" href={rootRoute({}).$} labelProps={{ gap: "8px" }}>
        Go to the homepage
      </SolidCta>
    </VStack>
  </Center>
);
