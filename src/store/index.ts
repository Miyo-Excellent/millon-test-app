// Re-export everything from the store
export * from "./store";
export * from "./hooks";
export * from "./provider";

// Re-export slices with aliases for conflicting exports
// Cryptocurrency slice
export {
  cryptocurrencySlice,
  setCryptocurrencies,
  setSelectedCryptocurrency,
  setLoading as setCryptoLoading,
  setError as setCryptoError,
  setSearchTerm,
  setFilters,
  resetFilters,
  selectCryptocurrencies,
  selectSelectedCryptocurrency,
  selectCryptocurrencyLoading,
  selectCryptocurrencyError,
  selectSearchTerm,
  selectFilters,
  selectFilteredCryptocurrencies,
  default as cryptocurrencyReducer,
} from "./slices/cryptocurrencySlice";

// Market slice
export {
  marketSlice,
  setMarkets,
  setLoading as setMarketLoading,
  setError as setMarketError,
  clearMarkets,
  clearAllMarkets,
  selectAllMarkets,
  selectMarketsForCrypto,
  selectMarketLoading,
  selectMarketError,
  default as marketReducer,
} from "./slices/marketSlice";

// Global data slice
export {
  globalDataSlice,
  setGlobalData,
  setLoading as setGlobalDataLoading,
  setError as setGlobalDataError,
  clearGlobalData,
  selectGlobalData,
  selectGlobalDataLoading,
  selectGlobalDataError,
  selectGlobalDataLastUpdated,
  selectGlobalDataNeedsRefresh,
  default as globalDataReducer,
} from "./slices/globalDataSlice";

// Re-export API
export * from "./api/cryptoApi";
