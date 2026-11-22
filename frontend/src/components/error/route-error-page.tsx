import { rootRoute } from "@/app/app-routes";
import { NotFound } from "@/components/empty/not-found";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { hoverFade } from "@/components/site/site-styles";
import {
  isChunkLoadError,
  reloadOnceForStaleChunk,
} from "@/shared/utils/stale-chunks";
import { Box, Center, chakra, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const RouterLink = chakra(Link);

const LINK = {
  display: "inline-flex",
  alignItems: "center",
  minH: "44px",
  textStyle: "body.sm",
  color: "site.fg.strong",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  cursor: "pointer",
  ...hoverFade,
} as const;

/**
 * What shows when a page fails, in place of the router's developer screen:
 * the site's nav and footer around a short note and a way on. A 404 gets
 * the not-found page. A stale build (a tab open across a deploy) reloads
 * itself once onto the new one, so most visitors never see this at all.
 * In development the error's message shows under the note.
 */
export const RouteErrorPage: React.FC = () => {
  const error = useRouteError();
  const stale = isChunkLoadError(error);
  // Reloading: show nothing rather than flash the error page.
  const [reloading] = React.useState(() => stale && reloadOnceForStaleChunk());

  if (reloading) return null;

  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="site.bg.page">
      <SiteNav />
      <Box as="main" id="main" flex="1" display="flex">
        {notFound ? (
          <NotFound />
        ) : (
          <Center w="100%" flex="1" px="gutter" py="96px">
            <VStack alignItems="flex-start" gap={6} w="100%" maxW="450px">
              <Text as="h1" textStyle="h3" color="site.fg.heading">
                Something went wrong
              </Text>
              <Text textStyle="body.md" color="site.fg">
                This page didn&rsquo;t load properly. Reloading usually fixes
                it.
              </Text>
              <Box as="ul" display="flex" gap="24px">
                <li>
                  <chakra.button
                    type="button"
                    onClick={() => window.location.reload()}
                    {...LINK}
                  >
                    Reload the page
                  </chakra.button>
                </li>
                <li>
                  <RouterLink to={rootRoute({}).$} {...LINK}>
                    Go to the homepage
                  </RouterLink>
                </li>
              </Box>
              {import.meta.env.DEV && (
                <Text
                  as="pre"
                  textStyle="label"
                  color="site.fg.muted"
                  whiteSpace="pre-wrap"
                >
                  {error instanceof Error ? error.message : String(error)}
                </Text>
              )}
            </VStack>
          </Center>
        )}
      </Box>
      <SiteFooter />
    </Box>
  );
};
