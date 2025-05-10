import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cryptocurrencyReducer from "./slices/cryptocurrencySlice";
import marketReducer from "./slices/marketSlice";
import globalDataReducer from "./slices/globalDataSlice";
import themeReducer from "./slices/themeSlice";
import { cryptoApi } from "./api/cryptoApi";

/**
 * The main Redux store configuration
 * This store combines all reducers and middleware for the application
 */
export const store = configureStore({
  reducer: {
    cryptocurrency: cryptocurrencyReducer,
    market: marketReducer,
    globalData: globalDataReducer,
    theme: themeReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          // RTK Query action types
          "cryptoApi/executeQuery/fulfilled",
          "cryptoApi/executeQuery/pending",
          "cryptoApi/executeQuery/rejected",
          "cryptoApi/executeMutation/fulfilled",
          "cryptoApi/executeMutation/pending",
          "cryptoApi/executeMutation/rejected",
          "cryptoApi/invalidateTags",
          "cryptoApi/subscriptions/unsubscribeQueryResult",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["cryptoApi.queries"],
      },
    }).concat(cryptoApi.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
