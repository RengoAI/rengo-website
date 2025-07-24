import { ALL_ROUTES } from "@/app/app-router";
import { QuickActionsCommandMenu } from "@/components/command/quick-actions-command-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { getRouteInfo } from "@/shared/utils/route-utils";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ChevronRight, PanelLeftOpenIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";

export interface SidebarNavItem {
  url: string;
  items?: SidebarNavItem[];
  comingSoon?: boolean;
}

interface EnrichedSidebarNavItem {
  url: string;
  title: string;
  icon?: React.ElementType;
  items?: EnrichedSidebarNavItem[];
  comingSoon?: boolean;
}

export interface SidebarProps {
  title?: string;
  navItems: SidebarNavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sidebarFooter?: React.ReactElement;
}

interface EnrichedSidebarProps extends SidebarProps {
  enrichedNavItems: EnrichedSidebarNavItem[];
  toggleExpand: (title: string) => void;
  expandedItems: string[];
  isActive: (url: string) => boolean;
  navigate: (url: string, options?: NavigateOptions) => void;
}

interface SidebarItemProps {
  item: EnrichedSidebarNavItem;
  index: number;
  isActive: (url: string) => boolean;
  onClick: () => void;
  expandedItems?: string[];
  showExpandIcon?: boolean;
  isSubItem?: boolean;
}

const ComingSoonBadge = () => (
  <Box as="span" ml={2}>
    <Box
      as="span"
      bg="green.50"
      color="black"
      px={2}
      py={0.5}
      borderRadius="md"
      fontSize="xs"
      fontWeight="bold"
    >
      Coming Soon
    </Box>
  </Box>
);

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  index,
  isActive,
  onClick,
  expandedItems,
  showExpandIcon = false,
  isSubItem = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Flex
      height="auto"
      w="full"
      borderRadius="md"
      cursor={item.comingSoon ? "not-allowed" : "pointer"}
      _hover={{ bg: item.comingSoon ? undefined : "bg.subtle" }}
      _focus={{
        bg: "bg.subtle",
        boxShadow: "0 0 0 2px var(--chakra-colors-primary-500)",
        outline: "none",
      }}
      _focusVisible={{
        bg: "bg.subtle",
        boxShadow: "0 0 0 2px var(--chakra-colors-primary-500)",
        outline: "none",
      }}
      bg={isActive(item.url) ? "bg.subtle" : undefined}
      alignItems="center"
      position="relative"
      opacity={item.comingSoon ? 0.5 : 1}
      py={1}
      pl={2}
      tabIndex={item.comingSoon ? -1 : 0}
      role="button"
      aria-label={`${item.title}${item.comingSoon ? " (Coming Soon)" : ""}`}
      aria-disabled={item.comingSoon}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <Tooltip
        content={`${item.title} ${item.comingSoon ? " (Coming Soon)" : ""}`}
      >
        <>
          <Box
            as="span"
            display="inline-flex"
            alignItems="baseline"
            transform="translateY(1px)"
            width="24px"
            flexShrink={0}
          >
            {item.icon && !isSubItem && (
              <Button
                variant="ghost"
                size="xxs"
                m={0}
                p={0}
                pr={2}
                _hover={{ bg: "transparent" }}
                disabled={item.comingSoon}
                color={isActive(item.url) ? "primary.700" : undefined}
                pointerEvents="none"
                tabIndex={-1}
                display="flex"
                alignItems="center"
              >
                <item.icon size={16} viewBox="0 0 32 32" />
              </Button>
            )}
          </Box>
          <Box display="inline-block">
            <Text
              fontSize="sm"
              display="inline-block"
              color={isActive(item.url) ? "primary.900" : undefined}
              fontWeight={isActive(item.url) ? "medium" : "normal"}
              position="relative"
              pb={1}
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0.75,
                left: 0,
                right: 0,
                height: "1px",
                bg: isActive(item.url) ? "primary.700" : "transparent",
              }}
            >
              {item.title}
            </Text>
            {item.comingSoon && <ComingSoonBadge />}
          </Box>
        </>
      </Tooltip>
      {showExpandIcon && item.items?.length && (
        <Box
          ml="auto"
          mr={2}
          transform={
            expandedItems?.includes(item.title || item.url || `item-${index}`)
              ? "rotate(90deg)"
              : "none"
          }
          transition="transform 0.2s"
        >
          <ChevronRight size={14} strokeWidth={1.5} />
        </Box>
      )}
    </Flex>
  );
};

const OpenSidebar: React.FC<EnrichedSidebarProps> = ({
  toggleExpand,
  expandedItems,
  isActive,
  navigate,
  enrichedNavItems,
}) => (
  <>
    {/* Navigation Items */}
    <VStack align="stretch" w="full" gap="1px">
      {enrichedNavItems.map((item, index) => (
        <Box w="full" key={item.title || index}>
          <SidebarItem
            item={item}
            index={index}
            isActive={isActive}
            onClick={() => {
              if (item.comingSoon) return;
              if (item.items?.length) {
                toggleExpand(item.title || `item-${index}`);
              } else if (item.url) {
                navigate(item.url);
              }
            }}
            expandedItems={expandedItems}
            showExpandIcon={true}
            isSubItem={false}
          />

          {/* Nested Items */}
          {item.items?.length &&
            expandedItems.includes(
              item.title || item.url || `item-${index}`,
            ) && (
              <VStack gap="1px">
                {item.items.map((subItem, subIndex) => (
                  <SidebarItem
                    key={subItem.title || subItem.url || subIndex}
                    item={subItem}
                    index={subIndex}
                    isActive={isActive}
                    onClick={() => {
                      if (subItem.comingSoon) return;
                      subItem.url && navigate(subItem.url);
                    }}
                    isSubItem={true}
                  />
                ))}
              </VStack>
            )}
        </Box>
      ))}
    </VStack>
  </>
);

const ClosedSidebar: React.FC<EnrichedSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isActive,
  enrichedNavItems,
  toggleExpand,
  navigate,
}) => (
  <Box
    w="full"
    display="flex"
    flexDirection="column"
    gap="1px"
    alignItems="center"
  >
    <Tooltip content="Toggle Sidebar">
      <Button
        variant="ghost"
        size="sm"
        mt={0}
        mb={0}
        onClick={() => setIsCollapsed(!isCollapsed)}
        _hover={{ bg: "bg.subtle" }}
        _active={{ boxShadow: "none", outline: "none" }}
      >
        <PanelLeftOpenIcon size={14} />
      </Button>
    </Tooltip>
    {enrichedNavItems.map((item, index) => (
      <Tooltip
        key={`${item.title}-${index}`}
        content={`${item.title} ${item.comingSoon ? " (Coming Soon)" : ""}`}
      >
        {item.icon && (
          <Button
            variant={isActive(item.url) ? "outline" : "ghost"}
            color={isActive(item.url) ? "primary.700" : "fg.muted"}
            borderColor={isActive(item.url) ? "primary.700" : "transparent"}
            _hover={{ bg: "bg.subtle" }}
            _active={{ boxShadow: "none", outline: "none" }}
            size="sm"
            mt={0}
            mb={0}
            disabled={item.comingSoon}
            opacity={item.comingSoon ? 0.5 : 1}
            onClick={() => {
              if (item.comingSoon) return;
              if (item.items?.length) {
                toggleExpand(item.title || `item-${index}`);
                setIsCollapsed(!isCollapsed);
              } else if (item.url) {
                navigate(item.url);
              }
            }}
          >
            <item.icon size={14} />
          </Button>
        )}
      </Tooltip>
    ))}
  </Box>
);

export const Sidebar = ({
  navItems,
  isCollapsed,
  setIsCollapsed,
  sidebarFooter,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const enrichedNavItems = useMemo(
    (): EnrichedSidebarNavItem[] =>
      navItems.map((item): EnrichedSidebarNavItem => {
        const routeInfo = getRouteInfo(ALL_ROUTES, item.url);
        return {
          url: item.url,
          title: routeInfo.pageTitle!,
          icon: routeInfo.icon,
          comingSoon: item.comingSoon,
          items: item.items?.map((subItem): EnrichedSidebarNavItem => {
            const subRouteInfo = getRouteInfo(ALL_ROUTES, subItem.url);
            return {
              url: subItem.url,
              title: subRouteInfo.pageTitle!,
              icon: subRouteInfo.icon,
              comingSoon: subItem.comingSoon,
            };
          }),
        };
      }),
    [navItems],
  );

  // Auto-expand parent items when their child routes are active
  useEffect(() => {
    const itemsToExpand: string[] = [];

    enrichedNavItems.forEach((item) => {
      // If this item has children and any child matches the current path
      if (item.items?.length) {
        const hasActiveChild = item.items.some((child) =>
          location.pathname.startsWith(child.url),
        );

        if (hasActiveChild) {
          itemsToExpand.push(item.title);
        }
      }
    });

    // Only update if there are changes to avoid unnecessary re-renders
    if (itemsToExpand.length > 0) {
      setExpandedItems((prev) => {
        const newExpanded = [...new Set([...prev, ...itemsToExpand])];
        // Only update if the arrays are different
        if (
          newExpanded.length !== prev.length ||
          !newExpanded.every((item) => prev.includes(item))
        ) {
          return newExpanded;
        }
        return prev;
      });
    }
  }, [location.pathname, enrichedNavItems]);

  const isActive = (url?: string) => {
    if (!url) return false;

    const parentItem = enrichedNavItems.find((item) => item.url === url);

    if (parentItem?.items?.length) {
      // For closed sidebar, highlight parent if any child is active
      if (isCollapsed) {
        // Check if current path starts with parent URL or matches any child URL
        if (location.pathname.startsWith(url)) {
          return true;
        }
        // Check if any child URL matches current path
        return parentItem.items.some((child) =>
          location.pathname.startsWith(child.url),
        );
      } else {
        // For open sidebar, only highlight parent if on exact path
        return location.pathname === url;
      }
    }

    return location.pathname.startsWith(url);
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <Flex
      direction="column"
      h="calc(100vh - 64px)"
      bg="bg.surface"
      borderRightWidth="1px"
      borderColor="bg.surface.50"
      w={isCollapsed ? "16" : "64"}
      transition="width 0.2s"
      position="relative"
    >
      {/* Main content area with scroll */}
      <Box flex="1" overflowY="auto">
        <VStack px="2" py="2">
          <QuickActionsCommandMenu
            items={navItems}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          {isCollapsed ? (
            <ClosedSidebar
              navItems={navItems}
              enrichedNavItems={enrichedNavItems}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
              isActive={isActive}
              navigate={navigate}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              sidebarFooter={sidebarFooter}
            />
          ) : (
            <OpenSidebar
              navItems={navItems}
              enrichedNavItems={enrichedNavItems}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
              isActive={isActive}
              navigate={navigate}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              sidebarFooter={sidebarFooter}
            />
          )}
        </VStack>
      </Box>
    </Flex>
  );
};
