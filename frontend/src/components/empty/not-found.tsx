import { rootRoute } from "@/app/app-routes";
import { hoverFade } from "@/components/site/site-styles";
import { Box, Center, chakra, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router";

const RouterLink = chakra(Link);

const LINK = {
  display: "inline-flex",
  alignItems: "center",
  minH: "44px",
  textStyle: "body.sm",
  color: "site.fg.strong",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  ...hoverFade,
} as const;

export const NotFound = () => (
  <Center w="100%" flex="1" px="gutter" py="96px">
    <VStack alignItems="flex-start" gap={6} w="100%" maxW="450px">
      <Text as="h1" textStyle="h3" color="site.fg.heading">
        Page not found
      </Text>
      <Text textStyle="body.md" color="site.fg">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </Text>
      <Box as="ul" display="flex" gap="24px">
        <li>
          <RouterLink to={rootRoute({}).$} {...LINK}>
            Go to the homepage
          </RouterLink>
        </li>
        <li>
          <RouterLink to={rootRoute({}).careers({}).$} {...LINK}>
            See open roles
          </RouterLink>
        </li>
      </Box>
    </VStack>
  </Center>
);
