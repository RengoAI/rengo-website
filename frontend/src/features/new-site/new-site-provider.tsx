// Load the new Google Fonts (Noto Serif + Geist) scoped to this build
import "@/theme2/fonts.css";

import { v2System } from "@/theme2";
import { ChakraProvider } from "@chakra-ui/react";

interface NewSiteProviderProps {
  children: React.ReactNode;
}

/**
 * Isolated Chakra provider for the new site build.
 * Uses the v2 design system — completely separate from the existing site's theme.
 */
export function NewSiteProvider({ children }: NewSiteProviderProps) {
  return (
    <ChakraProvider value={v2System}>
      <div className="v2-theme">{children}</div>
    </ChakraProvider>
  );
}
