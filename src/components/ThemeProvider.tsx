import React from "react";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import {
  CombinedDarkTheme,
  CombinedLightTheme,
} from "@/src/constants/theme/paperTheme";
import { useAppSelector } from "@/src/store/hooks";
import {
  selectUseSystemTheme,
  selectDarkMode,
} from "@/src/store/slices/themeSlice";

/**
 * ThemeConsumer component that uses Redux hooks to determine the theme
 * This component must be rendered inside the Redux Provider
 */
export function ThemeConsumer({ children }: { children: React.ReactNode }) {
  const useSystemTheme = useAppSelector(selectUseSystemTheme);
  const darkMode = useAppSelector(selectDarkMode);
  const deviceColorScheme = useDeviceColorScheme();

  // Determine the color scheme based on user preferences and system settings
  const colorScheme = useSystemTheme
    ? deviceColorScheme || "light"
    : darkMode
      ? "dark"
      : "light";

  // Get the appropriate theme based on the color scheme
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={theme}>
        {children}
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

/**
 * ThemeProvider component that provides the theme to the application
 * This component is a placeholder that renders the ThemeConsumer
 * which must be rendered inside the Redux Provider
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return children;
}
