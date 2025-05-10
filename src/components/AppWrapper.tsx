import React from "react";
import { ReduxProvider } from "@/src/store/provider";

/**
 * AppWrapper component that wraps the entire application with the Redux Provider
 * This ensures that all components have access to the Redux store
 */
export function AppWrapper({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
