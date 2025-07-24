import { ErrorComponent } from "@/components/error/error";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const AppRootRouteErrorPage: React.FC = () => {
  const error = useRouteError();

  // Handle React Router errors specifically
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent
        error={
          new Error(
            `${error.status} ${error.statusText}: ${error.data?.message || error.data || "Route error"}`,
          )
        }
        reset={() => window.location.reload()}
      />
    );
  }

  // Handle regular errors
  if (error instanceof Error) {
    return (
      <ErrorComponent error={error} reset={() => window.location.reload()} />
    );
  }

  // Fallback for unknown error types
  return (
    <ErrorComponent
      error={new Error(`Unknown error: ${String(error)}`)}
      reset={() => window.location.reload()}
    />
  );
};
