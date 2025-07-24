import { ErrorComponent } from "@/components/error/error";
import { ErrorBoundaryFallbackProps } from "@suspensive/react";
import React from "react";

export const IndexError: React.FC<ErrorBoundaryFallbackProps> = (props) => (
  <ErrorComponent {...props} />
);
