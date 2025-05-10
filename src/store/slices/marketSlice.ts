import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the type for a market
export interface Market {
  name: string;
  base: string;
  quote: string;
  price: number;
  priceUsd: number;
  volume: number;
  volumeUsd: number;
  time: number;
}

// Define the state structure for the market slice
interface MarketState {
  markets: Record<string, Market[]>; // Keyed by cryptocurrency ID
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MarketState = {
  markets: {},
  loading: false,
  error: null,
};

/**
 * Market slice for managing cryptocurrency market data in the Redux store
 */
export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    // Set markets for a specific cryptocurrency
    setMarkets: (
      state,
      action: PayloadAction<{ cryptoId: string; markets: Market[] }>,
    ) => {
      const { cryptoId, markets } = action.payload;
      state.markets[cryptoId] = markets;
      state.loading = false;
      state.error = null;
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

    // Clear markets for a specific cryptocurrency
    clearMarkets: (state, action: PayloadAction<string>) => {
      const cryptoId = action.payload;
      delete state.markets[cryptoId];
    },

    // Clear all markets
    clearAllMarkets: (state) => {
      state.markets = {};
    },
  },
});

// Export actions
export const {
  setMarkets,
  setLoading,
  setError,
  clearMarkets,
  clearAllMarkets,
} = marketSlice.actions;

// Export selectors
export const selectAllMarkets = (state: RootState) => state.market.markets;
export const selectMarketsForCrypto =
  (cryptoId: string) => (state: RootState) =>
    state.market.markets[cryptoId] || [];
export const selectMarketLoading = (state: RootState) => state.market.loading;
export const selectMarketError = (state: RootState) => state.market.error;

export default marketSlice.reducer;
