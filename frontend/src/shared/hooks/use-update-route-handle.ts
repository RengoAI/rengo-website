import { usePageHandleStore } from "@/components/layout/page";
import { useEffect } from "react";
import { useMatches } from "react-router-dom";

interface UseUpdateRouteHandleOptions {
  routeId: string;
  entity: { name: string } | null | undefined;
  enabled?: boolean;
}

/**
 * Custom hook to update a route's breadcrumb handle with entity data
 * @param routeId - The route ID to find and update (e.g., "fundFamily", "datastoreTable")
 * @param entity - The entity object containing a name property
 * @param enabled - Whether to enable the update (default: true)
 */
export const useUpdateRouteHandle = ({
  routeId,
  entity,
  enabled = true,
}: UseUpdateRouteHandleOptions) => {
  const matches = useMatches();
  const updateHandle = usePageHandleStore((state) => state.updateHandle);

  useEffect(() => {
    if (!enabled || !entity?.name) return;

    const routeMatch = matches.find((m) => m.id === routeId) as RouteMatch;

    if (routeMatch) {
      updateHandle(routeId, {
        pageTitle: entity.name,
        href: routeMatch.pathname,
        icon: routeMatch.handle?.icon,
        disableLink: routeMatch.handle?.disableLink,
      });
    }
  }, [entity, matches, updateHandle, routeId, enabled]);
};
