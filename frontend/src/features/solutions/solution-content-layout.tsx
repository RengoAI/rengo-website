import { SectionShell } from "@/features/landing/sections/section-shell";
import { Box } from "@chakra-ui/react";
import React from "react";

type SolutionContentSectionProps = {
  bg?: string;
  children: React.ReactNode;
  py?: Record<string, number | string> | number | string;
  /** Hairline between hero and first content block (matches landing sections). */
  borderTop?: boolean;
};

/** Matches landing sections: ruled shell + 60px gap between heading block and body. */
export const SolutionContentSection: React.FC<SolutionContentSectionProps> = ({
  bg = "slate.10",
  py = { base: 16, md: "80px" },
  borderTop = false,
  children,
}) => (
  <SectionShell borderTop={borderTop} bg={bg} py={py}>
    <Box
      display="flex"
      flexDirection="column"
      gap={{ base: 10, md: "60px" }}
      w="full"
    >
      {children}
    </Box>
  </SectionShell>
);
