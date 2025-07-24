import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  Command,
  PanelLeftCloseIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ALL_ROUTES } from "@/app/app-router";
import { SidebarNavItem } from "@/components/nav/sidebar";
import { Tooltip } from "@/components/ui/tooltip";
import { getRouteInfo } from "@/shared/utils/route-utils";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Input,
  Text,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface QuickActionsCommandMenuProps {
  items: SidebarNavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface EnrichedNavItem {
  url?: string;
  title: string;
  icon?: React.ElementType;
  items?: EnrichedNavItem[];
}

interface FlattenedNavItem extends EnrichedNavItem {
  parent?: EnrichedNavItem;
}

export const QuickActionsCommandMenu = ({
  items,
  isCollapsed,
  setIsCollapsed,
}: QuickActionsCommandMenuProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Enrich navigation items with route information, same as sidebar
  const enrichedNavItems = useMemo(
    (): EnrichedNavItem[] =>
      items
        .filter((item) => !item.comingSoon)
        .map((item): EnrichedNavItem | null => {
          const routeInfo = getRouteInfo(ALL_ROUTES, item.url);
          return {
            url: routeInfo.disableLink ? undefined : item.url,
            title: routeInfo.pageTitle!,
            icon: routeInfo.icon,
            items: item.items
              ?.filter((subItem) => !subItem.comingSoon)
              .map((subItem): EnrichedNavItem => {
                const subRouteInfo = getRouteInfo(ALL_ROUTES, subItem.url);
                return {
                  url: subRouteInfo.disableLink ? undefined : subItem.url,
                  title: subRouteInfo.pageTitle!,
                  icon: subRouteInfo.icon,
                };
              }),
          };
        })
        .filter((item) => item !== null),
    [items],
  );

  const flattenedItems: FlattenedNavItem[] = enrichedNavItems
    .flatMap((item) =>
      item.items
        ? [item, ...item.items.map((subItem) => ({ ...subItem, parent: item }))]
        : [item],
    )
    .filter((item) => item.url);

  // Filter items based on search query
  const filteredItems = flattenedItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const parentMatch = item.parent?.title.toLowerCase().includes(searchLower);
    return titleMatch || parentMatch;
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(0);
      setSearchQuery("");
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        const selectedItem = filteredItems[selectedIndex];
        if (selectedItem) {
          handleNavigation(selectedItem);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(0); // Reset selection to first item when searching
  };

  const handleNavigation = (item: FlattenedNavItem) => {
    if (item.parent) {
      // setOpenMenu(item.parent.url!);
    }
    navigate(item.url!);
    setIsOpen(false);
  };

  const CommandItem = ({
    children,
    onSelect,
    isSelected,
  }: {
    children: React.ReactNode;
    onSelect: () => void;
    isSelected: boolean;
  }) => (
    <Box
      w="full"
      px="1"
      py="2"
      borderRadius="lg"
      textAlign="left"
      cursor="pointer"
      bg={isSelected ? "bg.subtle" : "transparent"}
      _hover={{ bg: "bg.muted" }}
      onClick={onSelect}
      aria-selected={isSelected}
      role="option"
    >
      {children}
    </Box>
  );

  const renderCommandItems = (
    items: EnrichedNavItem[],
    parent?: EnrichedNavItem,
  ): React.ReactNode[] =>
    items.flatMap((item) => [
      item.url && (
        <CommandItem
          key={`${item.title}-${parent?.title}`}
          onSelect={() => handleNavigation({ ...item, parent })}
          isSelected={
            filteredItems[selectedIndex]?.title === item.title &&
            filteredItems[selectedIndex]?.parent?.title === parent?.title
          }
        >
          <Flex alignItems="center" gap="2">
            {parent ? (
              <Flex alignItems="center" gap="2">
                {parent.icon && (
                  <Box bg="bg.muted" borderRadius="sm" p="0.5">
                    {parent.icon && <parent.icon size={16} />}
                  </Box>
                )}
                {parent.title}
                <ChevronRight size={12} />
                {item.icon && (
                  <Box bg="bg.muted" borderRadius="sm" p="0.5">
                    {item.icon && <item.icon size={16} />}
                  </Box>
                )}
                {item.title}
              </Flex>
            ) : (
              <>
                {item.icon && (
                  <Box bg="bg.muted" borderRadius="sm" p="0.5">
                    {item.icon && <item.icon size={16} />}
                  </Box>
                )}
                <Text>{item.title}</Text>
              </>
            )}
          </Flex>
        </CommandItem>
      ),
      ...(item.items ? renderCommandItems(item.items, item) : []),
    ]);

  return (
    <>
      {!isCollapsed && (
        <VStack align="stretch" w="full" pl="2">
          <Flex py="1" gap="1" alignItems="center">
            <Tooltip content="Quick actions (⌘K)">
              <Box flex="4">
                <Box w="full">
                  <Button
                    variant="outline"
                    w="full"
                    bg="bg.subtle"
                    borderWidth="0.5px"
                    borderColor="subtle"
                    borderRadius="md"
                    alignItems="center"
                    px="3"
                    py={0}
                    gap="2"
                    cursor="pointer"
                    onClick={() => setIsOpen(true)}
                    _hover={{ bg: "bg.muted" }}
                  >
                    <Flex
                      justify="space-between"
                      flex="1"
                      fontSize="sm"
                      alignItems="center"
                    >
                      <Text color="fg.muted">Quick actions</Text>
                      <Flex gap="2" alignItems="center">
                        <Box
                          borderWidth="1px"
                          borderColor="border.muted"
                          borderRadius="sm"
                          px={1}
                          py={0}
                          h="auto"
                          minH="unset"
                          display="flex"
                          alignItems="center"
                          bg="bg.surface"
                        >
                          <Command style={{ width: "12px", height: "12px" }} />
                          <Text fontSize="xs" color="fg.muted">
                            K
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Button>
                </Box>
              </Box>
            </Tooltip>

            <Tooltip content="Toggle Sidebar">
              <Button
                variant="ghost"
                size="sm"
                p={0}
                m={0}
                display="flex"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <PanelLeftCloseIcon size={14} />
              </Button>
            </Tooltip>
          </Flex>
        </VStack>
      )}

      <Dialog.Root open={isOpen} onOpenChange={(open) => setIsOpen(open.open)}>
        <Dialog.Backdrop backdropFilter="blur(5px)" />
        <Dialog.Positioner>
          <Dialog.Content
            w="40rem"
            mt="20vh"
            bg="bg.surface"
            shadow="lg"
            role="listbox"
            aria-label="Quick actions menu"
          >
            <Box borderWidth="3px" borderColor="border.muted" borderRadius="lg">
              <VStack align="stretch">
                <VisuallyHidden as="h2">Quick Actions</VisuallyHidden>
                <VisuallyHidden>
                  Perform actions and navigate to pages.
                </VisuallyHidden>

                <Input
                  placeholder="Type a command or search..."
                  autoFocus
                  mt={0}
                  border="0px"
                  borderBottom="1px solid"
                  borderBottomColor="border.muted"
                  focusRingColor="none"
                  focusVisibleRing="none"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                />

                <Box
                  role="presentation"
                  h="250px"
                  overflow="auto"
                  borderRadius="md"
                  px="2"
                >
                  <Text
                    variant="labelSmall"
                    color="fg.muted"
                    marginBottom="2"
                    px="1"
                  >
                    Navigation
                  </Text>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <CommandItem
                        key={`${item.title}-${item.parent?.title}`}
                        onSelect={() => handleNavigation(item)}
                        isSelected={index === selectedIndex}
                      >
                        <Flex alignItems="center" gap="2">
                          {item.parent ? (
                            <Flex alignItems="center" gap="2">
                              {item.parent.icon && (
                                <Box bg="bg.muted" borderRadius="sm" p="0.5">
                                  <item.parent.icon size={16} />
                                </Box>
                              )}
                              {item.parent.title}
                              <ChevronRight size={12} />
                              {item.icon && (
                                <Box bg="bg.muted" borderRadius="sm" p="0.5">
                                  <item.icon size={16} />
                                </Box>
                              )}
                              {item.title}
                            </Flex>
                          ) : (
                            <>
                              {item.icon && (
                                <Box bg="bg.muted" borderRadius="sm" p="0.5">
                                  <item.icon size={16} />
                                </Box>
                              )}
                              <Text>{item.title}</Text>
                            </>
                          )}
                        </Flex>
                      </CommandItem>
                    ))
                  ) : searchQuery.trim() ? (
                    <Text p="2" color="fg.muted" textAlign="center">
                      No results found for "{searchQuery}"
                    </Text>
                  ) : (
                    renderCommandItems(enrichedNavItems)
                  )}
                </Box>
                <Box>
                  <Flex
                    border="0px"
                    borderTop="1px solid"
                    borderTopColor="border.muted"
                    bg="bg.subtle"
                    px="2"
                    py="2"
                    alignItems="center"
                  >
                    <Flex gap="1" alignItems="flex-start">
                      <Box bg="bg.muted" borderRadius="md" p="1">
                        <ArrowUp size={10} />
                      </Box>
                      <Box bg="bg.muted" borderRadius="md" p="1">
                        <ArrowDown size={10} />
                      </Box>
                      <Text variant="labelSmall" color="fg.muted">
                        Navigate
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </VStack>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};
