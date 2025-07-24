import { Box, Tabs } from "@chakra-ui/react";

import { last } from "lodash-es";
import React, { useContext } from "react";
import {
  Navigate,
  Outlet,
  resolvePath,
  RouteObject,
  UNSAFE_RouteContext,
  useMatches,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import invariant from "tiny-invariant";

export interface PageTabProps {
  id: string;
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface UsePageTabsResult {
  tabs: PageTabProps[];
  tabRoutes: RouteObject[];
  currentIndex: number;
}

const useRouteBasePath = () => {
  const routeContext = useContext(UNSAFE_RouteContext);
  const baseMatch = routeContext.matches[routeContext.matches.length - 1];
  return baseMatch.pathnameBase;
};

export const usePageTabs = (): UsePageTabsResult => {
  const { location: navLocation } = useNavigation();
  const basePath = useRouteBasePath();

  // FIXME: Find a safer way to do this.
  const { matches: matchesForTabsPage } = useContext(UNSAFE_RouteContext);

  // The last route here is the page containing the <PageTabs/> component and
  // its children are the tabs.
  const pageTabsRoute = last(matchesForTabsPage)!.route;
  const tabRoutes = (pageTabsRoute.children ?? []).filter(
    (tab) => !!tab.id && !!tab.handle?.tabTitle,
  );

  // The last route here is the child for the active tab, unless it's the
  // same as the pageTabsRoute, in which case there is no active tab.
  const matchesForChildRoutes = useMatches();
  const lastMatch = last(matchesForChildRoutes);
  const currentTab = lastMatch?.id !== pageTabsRoute.id ? lastMatch : undefined;

  const loadingTab = tabRoutes.find(
    (route) =>
      resolvePath(route.path!, basePath).pathname === navLocation?.pathname,
  );

  const currentIndex = tabRoutes.findIndex(
    (route) => route.id === (loadingTab?.id ?? currentTab?.id),
  );
  const tabs = tabRoutes.map(({ id, handle }, index): PageTabProps => {
    invariant(id, "Tab route must have an id");
    return {
      id,
      title: handle?.tabTitle || handle?.pageTitle || id,
      onClick: (event) => {
        if (event.altKey || event.metaKey) {
          event.preventDefault();
          const route = tabRoutes[index].path;
          window.open(route, "_blank");
          return;
        }
      },
    };
  });

  return {
    tabs,
    tabRoutes,
    currentIndex,
  };
};

export const PageTabs: React.FC = () => {
  const { tabs, tabRoutes, currentIndex } = usePageTabs();
  const navigate = useNavigate();

  // If no tab is active, redirect to first (non-hidden) tab.
  if (currentIndex === -1 && tabRoutes.length > 0) {
    return (
      <Navigate
        to={tabRoutes[0].path!}
        replace={true}
        state={{
          isPageTab: true,
        }}
      />
    );
  }

  return (
    <Box display="contents">
      <Tabs.Root
        defaultValue={tabs[currentIndex].id}
        onValueChange={(value) => {
          const tabRoute = tabRoutes.find((route) => route.id === value.value);
          if (tabRoute) {
            navigate(tabRoute.path!);
          }
        }}
      >
        <Tabs.List>
          {tabs.map(({ id, title, ...props }) => (
            <Tabs.Trigger key={id} value={id} data-testid={id} {...props}>
              {title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <Outlet />
    </Box>
  );
};
