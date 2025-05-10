"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * Redux provider component that wraps the application
 * This makes the Redux store available to all components in the app
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
