import { RouteObject } from "react-router-dom";

/**
 * Recursively finds a route by its path in the route tree
 */
export const findRouteByPath = (
  routes: RouteObject[],
  targetPath: string,
  basePath = "",
): RouteObject | null => {
  // Normalize the target path to ensure it starts with /
  const normalizedTargetPath = targetPath.startsWith("/")
    ? targetPath
    : `/${targetPath}`;

  for (const route of routes) {
    // Handle the path construction more carefully
    let currentPath = basePath;
    if (route.path) {
      // If route.path starts with /, it's absolute, otherwise relative
      if (route.path.startsWith("/")) {
        currentPath = route.path;
      } else {
        currentPath = basePath + "/" + route.path;
      }
    }

    // Normalize paths by removing double slashes and ensuring leading slash
    currentPath = ("/" + currentPath).replace(/\/+/g, "/");

    // Check if this route matches the target path
    if (
      currentPath === normalizedTargetPath ||
      (route.index && basePath === normalizedTargetPath)
    ) {
      return route;
    }

    // Search in children
    if (route.children) {
      const found = findRouteByPath(route.children, targetPath, currentPath);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

/**
 * Gets the handle (including icon) for a specific route path
 */
export const getRouteHandle = (
  routes: RouteObject[],
  path: string,
): RouteObject["handle"] | null => {
  const route = findRouteByPath(routes, path);
  return route?.handle || null;
};

/**
 * Gets title and icon from route handle for a specific path
 */
export const getRouteInfo = (
  routes: RouteObject[],
  path: string,
): {
  pageTitle?: string;
  tabTitle?: string;
  icon?: React.ElementType;
  disableLink?: boolean;
} => {
  const handle = getRouteHandle(routes, path);
  return {
    pageTitle: handle?.pageTitle,
    tabTitle: handle?.tabTitle,
    icon: handle?.icon,
    disableLink: handle?.disableLink,
  };
};

/**
 * Creates a wrapper component for route icons to work with SidebarNavItem
 */
export const createRouteIconComponent = (
  routes: RouteObject[],
  path: string,
): React.ElementType | undefined => {
  const handle = getRouteHandle(routes, path);
  const iconElement = handle?.icon;

  if (!iconElement) return undefined;

  // Return a component that renders the icon element
  return () => iconElement as React.ReactElement;
};
