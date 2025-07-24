import { NotFound } from "@/components/empty/not-found";
import { AppLayout } from "@/components/layout/app-layout";
import React from "react";

const AppNotFoundPage: React.FC = () => (
  <AppLayout>
    <NotFound />
  </AppLayout>
);

export default AppNotFoundPage;
