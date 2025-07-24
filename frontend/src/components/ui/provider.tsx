import { system } from "@/theme/system";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export const Provider = (props: ColorModeProviderProps) => (
  <ChakraProvider value={system}>
    <ColorModeProvider {...props} defaultTheme="light" />
  </ChakraProvider>
);
