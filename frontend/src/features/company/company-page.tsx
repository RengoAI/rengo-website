import { rootRoute } from "@/app/app-routes";
import React from "react";
import { Navigate } from "react-router";

/** About content now lives on the careers page. */
export const CompanyPage: React.FC = () => (
  <Navigate to={rootRoute({}).careers({}).$} replace />
);
