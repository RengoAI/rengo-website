import { chakra, Dialog, Flex, Text } from "@chakra-ui/react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";

// Create Command component without using chakra factory
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ ...props }, ref) => <CommandPrimitive ref={ref} {...props} />);
Command.displayName = CommandPrimitive.displayName;

// Rest of the components can still use chakra factory
const ChakraCommandInput = chakra(CommandPrimitive.Input);
const ChakraCommandList = chakra(CommandPrimitive.List);
const ChakraCommandEmpty = chakra(CommandPrimitive.Empty);
const ChakraCommandGroup = chakra(CommandPrimitive.Group);
const ChakraCommandSeparator = chakra(CommandPrimitive.Separator);
const ChakraCommandItem = chakra(CommandPrimitive.Item);

const CommandDialog = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Root>
    <Dialog.Content p={0} overflow="hidden">
      <Command>{children}</Command>
    </Dialog.Content>
  </Dialog.Root>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ ...props }, ref) => (
  <Flex align="center" borderBottom="1px" borderColor="border.default" px={3}>
    <Search size={16} style={{ marginRight: 8, opacity: 0.5 }} />
    <ChakraCommandInput
      ref={ref}
      h="10"
      w="full"
      py={3}
      bg="transparent"
      fontSize="sm"
      outline="none"
      _placeholder={{ color: "fg.subtle" }}
      _disabled={{ cursor: "not-allowed", opacity: 0.5 }}
      {...props}
    />
  </Flex>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ ...props }, ref) => (
  <ChakraCommandList
    ref={ref}
    maxH="300px"
    overflowY="auto"
    overflowX="hidden"
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <ChakraCommandEmpty
    ref={ref}
    py={6}
    textAlign="center"
    fontSize="sm"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ ...props }, ref) => (
  <ChakraCommandGroup
    ref={ref}
    overflow="hidden"
    p={1}
    color="fg.default"
    css={{
      "[cmdk-group-heading]": {
        paddingLeft: "8px",
        paddingRight: "8px",
        paddingTop: "6px",
        paddingBottom: "6px",
        fontSize: "12px",
        fontWeight: 500,
        color: "var(--chakra-colors-fg-subtle)",
      },
    }}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ ...props }, ref) => (
  <ChakraCommandSeparator
    ref={ref}
    mx={-1}
    h="1px"
    bg="border.default"
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ ...props }, ref) => (
  <ChakraCommandItem
    ref={ref}
    position="relative"
    display="flex"
    cursor="default"
    gap={2}
    alignItems="center"
    rounded="sm"
    px={2}
    py={1.5}
    fontSize="sm"
    outline="none"
    _selected={{ bg: "bg.subtle", color: "fg.default" }}
    _disabled={{ pointerEvents: "none", opacity: 0.5 }}
    css={{
      svg: {
        pointerEvents: "none",
        width: "16px",
        height: "16px",
        flexShrink: 0,
      },
    }}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <Text
    as="span"
    ml="auto"
    fontSize="xs"
    letterSpacing="wider"
    color="fg.subtle"
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
