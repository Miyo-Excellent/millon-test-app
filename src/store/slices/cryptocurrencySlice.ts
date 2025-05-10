import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the type for a cryptocurrency
export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  priceUsd: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCapUsd: number;
  volume24: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
}

// Define the state structure for the cryptocurrency slice
interface CryptocurrencyState {
  list: Cryptocurrency[];
  selectedCrypto: Cryptocurrency | null;
  selectedCryptoIds: string[];
  comparisonMetric: "price" | "change24h" | "marketCap" | "volume";
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: "rank" | "name" | "price" | "marketCap" | "change24h";
    sortDirection: "asc" | "desc";
  };
}

// Initial state
const initialState: CryptocurrencyState = {
  list: [],
  selectedCrypto: null,
  selectedCryptoIds: [],
  comparisonMetric: "price",
  loading: false,
  error: null,
  searchTerm: "",
  filters: {
    minPrice: null,
    maxPrice: null,
    sortBy: "rank",
    sortDirection: "asc",
  },
};

/**
 * Cryptocurrency slice for managing cryptocurrency data in the Redux store
 */
export const cryptocurrencySlice = createSlice({
  name: "cryptocurrency",
  initialState,
  reducers: {
    // Set the cryptocurrency list
    setCryptocurrencies: (state, action: PayloadAction<Cryptocurrency[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set the selected cryptocurrency
    setSelectedCryptocurrency: (
      state,
      action: PayloadAction<Cryptocurrency | null>,
    ) => {
      state.selectedCrypto = action.payload;
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

    // Set search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    // Set filters
    setFilters: (
      state,
      action: PayloadAction<Partial<CryptocurrencyState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Reset filters
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Set selected crypto IDs
    setSelectedCryptoIds: (state, action: PayloadAction<string[]>) => {
      state.selectedCryptoIds = action.payload;
    },

    // Add a crypto ID to selected
    addSelectedCryptoId: (state, action: PayloadAction<string>) => {
      if (!state.selectedCryptoIds.includes(action.payload) && state.selectedCryptoIds.length < 5) {
        state.selectedCryptoIds.push(action.payload);
      }
    },

    // Remove a crypto ID from selected
    removeSelectedCryptoId: (state, action: PayloadAction<string>) => {
      state.selectedCryptoIds = state.selectedCryptoIds.filter(id => id !== action.payload);
    },

    // Toggle a crypto ID selection
    toggleSelectedCryptoId: (state, action: PayloadAction<string>) => {
      if (state.selectedCryptoIds.includes(action.payload)) {
        state.selectedCryptoIds = state.selectedCryptoIds.filter(id => id !== action.payload);
      } else if (state.selectedCryptoIds.length < 5) {
        state.selectedCryptoIds.push(action.payload);
      }
    },

    // Set comparison metric
    setComparisonMetric: (
      state,
      action: PayloadAction<"price" | "change24h" | "marketCap" | "volume">
    ) => {
      state.comparisonMetric = action.payload;
    },
  },
});

// Export actions
export const {
  setCryptocurrencies,
  setSelectedCryptocurrency,
  setLoading,
  setError,
  setSearchTerm,
  setFilters,
  resetFilters,
  setSelectedCryptoIds,
  addSelectedCryptoId,
  removeSelectedCryptoId,
  toggleSelectedCryptoId,
  setComparisonMetric,
} = cryptocurrencySlice.actions;

// Export selectors
export const selectCryptocurrencies = (state: RootState) =>
  state.cryptocurrency.list;
export const selectSelectedCryptocurrency = (state: RootState) =>
  state.cryptocurrency.selectedCrypto;
export const selectCryptocurrencyLoading = (state: RootState) =>
  state.cryptocurrency.loading;
export const selectCryptocurrencyError = (state: RootState) =>
  state.cryptocurrency.error;
export const selectSearchTerm = (state: RootState) =>
  state.cryptocurrency.searchTerm;
export const selectFilters = (state: RootState) => state.cryptocurrency.filters;
export const selectSelectedCryptoIds = (state: RootState) => state.cryptocurrency.selectedCryptoIds;
export const selectComparisonMetric = (state: RootState) => state.cryptocurrency.comparisonMetric;

// Export filtered and sorted cryptocurrencies selector
export const selectFilteredCryptocurrencies = (state: RootState) => {
  const { list, searchTerm, filters } = state.cryptocurrency;

  // Filter by search term
  let filtered = list;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(term) ||
        crypto.symbol.toLowerCase().includes(term),
    );
  }

  // Filter by price range
  if (filters.minPrice !== null) {
    filtered = filtered.filter(
      (crypto) => crypto.priceUsd >= (filters.minPrice || 0),
    );
  }
  if (filters.maxPrice !== null) {
    filtered = filtered.filter(
      (crypto) => crypto.priceUsd <= (filters.maxPrice || Infinity),
    );
  }

  // Sort
  const { sortBy, sortDirection } = filters;
  const sortMultiplier = sortDirection === "asc" ? 1 : -1;

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortMultiplier * a.name.localeCompare(b.name);
      case "price":
        return sortMultiplier * (a.priceUsd - b.priceUsd);
      case "marketCap":
        return sortMultiplier * (a.marketCapUsd - b.marketCapUsd);
      case "change24h":
        return sortMultiplier * (a.percentChange24h - b.percentChange24h);
      case "rank":
      default:
        return sortMultiplier * (a.rank - b.rank);
    }
  });
};

export default cryptocurrencySlice.reducer;
