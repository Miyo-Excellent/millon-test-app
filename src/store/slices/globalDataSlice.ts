import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the type for global market data
export interface GlobalData {
  coinsCount: number;
  activeMarkets: number;
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: string;
  ethDominance: string;
  marketCapChange: string;
  volumeChange: string;
  avgChangePercent: string;
  volumeAth: number;
  marketCapAth: number;
}

// Define the state structure for the global data slice
interface GlobalDataState {
  data: GlobalData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null; // Timestamp of last update
}

// Initial state
const initialState: GlobalDataState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

/**
 * Global data slice for managing global cryptocurrency market data in the Redux store
 */
export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    // Set global market data
    setGlobalData: (state, action: PayloadAction<GlobalData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.lastUpdated = Date.now();
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear global data
    clearGlobalData: (state) => {
      state.data = null;
      state.lastUpdated = null;
    },
  },
});

// Export actions
export const { setGlobalData, setLoading, setError, clearGlobalData } =
  globalDataSlice.actions;

// Export selectors
export const selectGlobalData = (state: RootState) => state.globalData.data;
export const selectGlobalDataLoading = (state: RootState) =>
  state.globalData.loading;
export const selectGlobalDataError = (state: RootState) =>
  state.globalData.error;
export const selectGlobalDataLastUpdated = (state: RootState) =>
  state.globalData.lastUpdated;

// Selector to check if global data needs refresh (older than 5 minutes)
export const selectGlobalDataNeedsRefresh = (state: RootState) => {
  const lastUpdated = state.globalData.lastUpdated;
  if (!lastUpdated) return true;

  const fiveMinutesInMs = 5 * 60 * 1000;
  return Date.now() - lastUpdated > fiveMinutesInMs;
};

export default globalDataSlice.reducer;
