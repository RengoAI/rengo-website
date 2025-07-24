import { Page } from "@/components/layout/page";
import { Text } from "@chakra-ui/react";
import React from "react";

export const LandingPage: React.FC = () => (
  <Page
    header={{
      title: "People",
      description: `Create, edit, and track people inside and outside your organization.`,
    }}
  >
    <Text>Landing Page</Text>
  </Page>
);
