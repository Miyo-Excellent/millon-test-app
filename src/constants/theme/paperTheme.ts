import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";

// Adapt navigation theme to use Material Design 3 colors
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Define custom colors for the light theme (Orange, White, Yellow)
const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FF8C00", // Orange
    secondary: "#F0B90B", // Yellow
    tertiary: "#0ECB81", // Green for positive values
    error: "#F6465D", // Red for negative values
    background: "#FFFFFF", // White
    surface: "#FAFAFA",
    surfaceVariant: "#F5F5F5",
    outline: "#E6E8EA",
  },
};

// Define custom colors for the dark theme (Orange, Black, Yellow)
const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FF8C00", // Orange
    secondary: "#F0B90B", // Yellow
    tertiary: "#0ECB81", // Green for positive values
    error: "#F6465D", // Red for negative values
    background: "#0B0E11", // Black
    surface: "#1E2026", // Dark surface
    surfaceVariant: "#2B3139", // Slightly lighter surface
    outline: "#474D57", // Outline color
    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",
    onSurfaceVariant: "#B7BDC6",
  },
};

// Merge the custom themes with the navigation themes
export const CombinedLightTheme = merge(customLightTheme, LightTheme);
export const CombinedDarkTheme = merge(customDarkTheme, DarkTheme);

// Export a function to get the appropriate theme based on the color scheme
export const getPaperTheme = (colorScheme: "light" | "dark") => {
  return colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
};
