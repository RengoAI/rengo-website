import { Box } from "@chakra-ui/react";
import React from "react";
import { SectionShell } from "./section-shell";

export const ScaleStatsSection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" py={{ base: 16, md: "80px" }}>
    <Box
      as="h2"
      fontFamily="heading"
      fontWeight={350}
      fontSize={{ base: "26px", md: "36px" }}
      lineHeight={1.2}
      letterSpacing="-2px"
      color="indigo.900"
      maxW="640px"
      m={0}
    >
      Built to scale with your data
      <Box as="span" display="block" color="slate.50" fontWeight={300}>
        Enterprise-grade reliability and security
      </Box>
    </Box>
  </SectionShell>
);
