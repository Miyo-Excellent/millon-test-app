import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  StorageService,
  StorageKeys,
} from "@/src/services/storage/StorageService";

// Define the type for the theme state
export interface ThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
}

// Initial state
const initialState: ThemeState = {
  useSystemTheme: true,
  darkMode: false,
};

/**
 * Theme slice for managing theme preferences in the Redux store
 */
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Set whether to use system theme
    setUseSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
      // Persist the theme preference
      StorageService.storeData(StorageKeys.THEME_PREFERENCES, {
        useSystemTheme: action.payload,
        darkMode: state.darkMode,
      });
    },

    // Set dark mode
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      // Persist the theme preference
      StorageService.storeData(StorageKeys.THEME_PREFERENCES, {
        useSystemTheme: state.useSystemTheme,
        darkMode: action.payload,
      });
    },

    // Initialize theme from storage
    initializeTheme: (state, action: PayloadAction<ThemeState>) => {
      state.useSystemTheme = action.payload.useSystemTheme;
      state.darkMode = action.payload.darkMode;
    },
  },
});

// Export actions
export const { setUseSystemTheme, setDarkMode, initializeTheme } =
  themeSlice.actions;

// Export selectors
export const selectUseSystemTheme = (state: RootState) =>
  state.theme.useSystemTheme;
export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
