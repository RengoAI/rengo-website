import { TeamLogoGrid } from "@/components/team-logo-grid";
import { SectionHeading } from "@/features/landing/sections/section-heading";
import { SectionShell } from "@/features/landing/sections/section-shell";
import { Box } from "@chakra-ui/react";
import React from "react";

export const FoundersSection: React.FC = () => (
  <SectionShell borderTop bg="slate.10" py={24}>
    <Box display="flex" flexDirection="column" gap={16}>
      <SectionHeading>
        We&apos;re a team of builders
        <br />
        <Box as="span" color="slate.50" fontWeight={300}>
          From world class engineering teams
        </Box>
      </SectionHeading>

      <TeamLogoGrid />
    </Box>
  </SectionShell>
);
