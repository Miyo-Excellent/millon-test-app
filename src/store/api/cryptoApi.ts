import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cryptocurrency, Market, GlobalData } from "@/src/models";

// Define types for the plain objects returned by toPlainObject() methods
type GlobalDataPlain = ReturnType<GlobalData["toPlainObject"]>;
type CryptocurrencyPlain = ReturnType<Cryptocurrency["toPlainObject"]>;
type MarketPlain = ReturnType<Market["toPlainObject"]>;

// Define response types from the API
interface CryptocurrencyResponse {
  data: any[];
  info: {
    coins_num: number;
    time: number;
  };
}

/**
 * RTK Query API for CoinLore cryptocurrency data
 */
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coinlore.net/api/",
    // Add a small delay to respect rate limiting (1 request per second)
    fetchFn: async (...args) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    // Get global cryptocurrency market data
    getGlobalData: builder.query<GlobalDataPlain, void>({
      query: () => "global/",
      transformResponse: (response: any[]) => {
        const globalData = GlobalData.fromApiData(response[0]);
        return globalData.toPlainObject();
      },
    }),

    // Get cryptocurrency list with pagination
    getCryptocurrencies: builder.query<
      CryptocurrencyPlain[],
      { start?: number; limit?: number }
    >({
      query: ({ start = 0, limit = 100 }) =>
        `tickers/?start=${start}&limit=${limit}`,
      transformResponse: (response: CryptocurrencyResponse) => {
        return response.data.map((crypto) => {
          const cryptocurrency = Cryptocurrency.fromApiData(crypto);
          return cryptocurrency.toPlainObject();
        });
      },
    }),

    // Get specific cryptocurrency details
    getCryptocurrencyById: builder.query<CryptocurrencyPlain, string>({
      query: (id) => `ticker/?id=${id}`,
      transformResponse: (response: any[]) => {
        const cryptocurrency = Cryptocurrency.fromApiData(response[0]);
        return cryptocurrency.toPlainObject();
      },
    }),

    // Get markets for a specific cryptocurrency
    getCryptocurrencyMarkets: builder.query<MarketPlain[], string>({
      query: (id) => `coin/markets/?id=${id}`,
      transformResponse: (response: any[]) => {
        return response.map((market) => {
          const marketInstance = Market.fromApiData(market);
          return marketInstance.toPlainObject();
        });
      },
    }),
  }),
});

// Export hooks for using the API endpoints
export const {
  useGetGlobalDataQuery,
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyByIdQuery,
  useGetCryptocurrencyMarketsQuery,
} = cryptoApi;
