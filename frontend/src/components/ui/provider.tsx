import { system } from "@/theme/system";
import { ChakraProvider } from "@chakra-ui/react";

export const Provider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={system}>{children}</ChakraProvider>
);
