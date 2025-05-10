import { useColorScheme as useDeviceColorScheme } from "react-native";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import {
  selectUseSystemTheme,
  selectDarkMode,
  initializeTheme,
} from "@/src/store/slices/themeSlice";
import {
  StorageService,
  StorageKeys,
} from "@/src/services/storage/StorageService";

/**
 * Custom hook that returns the current color scheme based on user preferences and system settings
 * @returns 'dark' | 'light' - The current color scheme
 */
export const useColorScheme = (): "dark" | "light" => {
  const dispatch = useAppDispatch();
  const useSystemTheme = useAppSelector(selectUseSystemTheme);
  const darkMode = useAppSelector(selectDarkMode);
  const deviceColorScheme = useDeviceColorScheme();

  // Load theme preferences from storage on mount
  useEffect(() => {
    const loadThemePreferences = async () => {
      try {
        const preferences = await StorageService.getData<{
          useSystemTheme: boolean;
          darkMode: boolean;
        }>(StorageKeys.THEME_PREFERENCES);

        if (preferences) {
          dispatch(initializeTheme(preferences));
        }
      } catch (error) {
        console.error("Error loading theme preferences:", error);
      }
    };

    loadThemePreferences();
  }, [dispatch]);

  // Return the appropriate color scheme based on preferences
  if (useSystemTheme) {
    return deviceColorScheme || "light";
  }

  return darkMode ? "dark" : "light";
};
