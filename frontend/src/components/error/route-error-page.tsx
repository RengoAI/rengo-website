import { rootRoute } from "@/app/app-routes";
import { NotFound } from "@/components/empty/not-found";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SolidCta } from "@/components/site/solid-cta";
import {
  isChunkLoadError,
  reloadOnceForStaleChunk,
} from "@/shared/utils/stale-chunks";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

/**
 * What shows when a page fails, in place of the router's developer screen:
 * the site's nav and footer around a short note and a way on. A 404 gets
 * the not-found page. A stale build (a tab open across a deploy) reloads
 * itself once onto the new one, so most visitors never see this at all.
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
                This page didn&rsquo;t load properly, and reloading usually
                fixes it.
              </Text>
              {/* The site's buttons: reload first, the way out second. */}
              <Box display="flex" flexWrap="wrap" gap="12px" mt="16px">
                <SolidCta
                  h="32px"
                  onClick={() => window.location.reload()}
                  // No arrow: reloading doesn't go anywhere.
                  labelProps={{ arrow: false }}
                >
                  Reload the page
                </SolidCta>
                <SolidCta
                  tone="secondary"
                  h="32px"
                  href={rootRoute({}).$}
                  labelProps={{ gap: "8px" }}
                >
                  Go to the homepage
                </SolidCta>
              </Box>
            </VStack>
          </Center>
        )}
      </Box>
      <SiteFooter />
    </Box>
  );
};
