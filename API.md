# API Documentation

## Overview
This document outlines the API integration for the Crypto Tracker App, focusing on the CoinLore API endpoints used and how they are implemented in the application.

## CoinLore API
The application uses the [CoinLore API](https://www.coinlore.com/cryptocurrency-data-api), a free and public cryptocurrency API that provides data for over 12,000 cryptocurrencies and 300+ exchanges.

### Base URL
```
https://api.coinlore.net/api/
```

### Rate Limiting
While the API doesn't impose strict rate limits, it's recommended to make no more than one request per second for optimal performance.

## Endpoints Used

### 1. Global Crypto Data
**Endpoint:** `/global/`  
**Method:** GET  
**Description:** Fetches global cryptocurrency market statistics.  
**Response Example:**
```json
[
  {
    "coins_count": 12189,
    "active_markets": 30608,
    "total_mcap": 1670518625657.5752,
    "total_volume": 66208624211.89846,
    "btc_d": "50.55",
    "eth_d": "16.88",
    "mcap_change": "0.47",
    "volume_change": "-25.82",
    "avg_change_percent": "0.21",
    "volume_ath": 344187126292427800,
    "mcap_ath": 8237181118976.519
  }
]
```
**Usage in App:** Displayed on the dashboard to show overall market statistics.

### 2. Cryptocurrency Tickers
**Endpoint:** `/tickers/`  
**Method:** GET  
**Parameters:**
- `start` (optional): Starting index for pagination
- `limit` (optional): Number of results to return (max 100)

**Description:** Fetches data for multiple cryptocurrencies, sorted by market cap.  
**Response Example:**
```json
{
  "data": [
    {
      "id": "90",
      "symbol": "BTC",
      "name": "Bitcoin",
      "nameid": "bitcoin",
      "rank": 1,
      "price_usd": "6456.52",
      "percent_change_24h": "-1.47",
      "percent_change_1h": "0.05",
      "percent_change_7d": "-1.07",
      "price_btc": "1.00",
      "market_cap_usd": "111586042785.56",
      "volume24": 3997655362.9586277,
      "volume24a": 3657294860.710187,
      "csupply": "17282687.00",
      "tsupply": "17282687",
      "msupply": "21000000"
    }
  ],
  "info": {
    "coins_num": 1969,
    "time": 1538560355
  }
}
```
**Usage in App:** Used to populate the main cryptocurrency list.

### 3. Specific Cryptocurrency Data
**Endpoint:** `/ticker/`  
**Method:** GET  
**Parameters:**
- `id` (required): ID of the cryptocurrency

**Description:** Fetches detailed data for a specific cryptocurrency.  
**Response Example:**
```json
[
  {
    "id": "90",
    "symbol": "BTC",
    "name": "Bitcoin",
    "nameid": "bitcoin",
    "rank": 1,
    "price_usd": "6465.26",
    "percent_change_24h": "-1.27",
    "percent_change_1h": "0.19",
    "percent_change_7d": "-0.93",
    "market_cap_usd": "111737012373.28",
    "volume24": "3982512765.23",
    "volume24_native": "615986.77",
    "csupply": "17282687.00",
    "price_btc": "1.00",
    "tsupply": "17282687",
    "msupply": "21000000"
  }
]
```
**Usage in App:** Used to display detailed information about a specific cryptocurrency.

### 4. Cryptocurrency Markets
**Endpoint:** `/coin/markets/`  
**Method:** GET  
**Parameters:**
- `id` (required): ID of the cryptocurrency

**Description:** Fetches market data for a specific cryptocurrency.  
**Response Example:**
```json
[
  {
    "name": "Binance",
    "base": "BTC",
    "quote": "USDT",
    "price": 43042.31,
    "price_usd": 43042.31,
    "volume": 18102.07625,
    "volume_usd": 779155177.59614,
    "time": 1706972454
  }
]
```
**Usage in App:** Used to display market information in the cryptocurrency detail view.

## Implementation in the App

### RTK Query API
The application implements RTK Query for API integration, which provides automatic caching, loading states, and error handling. The implementation follows OOP principles with proper encapsulation and serialization:

```typescript
// src/store/api/cryptoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cryptocurrency, Market, GlobalData } from '@/src/models';

// Define types for the plain objects returned by toPlainObject() methods
type GlobalDataPlain = ReturnType<GlobalData['toPlainObject']>;
type CryptocurrencyPlain = ReturnType<Cryptocurrency['toPlainObject']>;
type MarketPlain = ReturnType<Market['toPlainObject']>;

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
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coinlore.net/api/',
    // Add a small delay to respect rate limiting (1 request per second)
    fetchFn: async (...args) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetch(...args);
    }
  }),
  endpoints: (builder) => ({
    // Get global cryptocurrency market data
    getGlobalData: builder.query<GlobalDataPlain, void>({
      query: () => 'global/',
      transformResponse: (response: any[]) => {
        const globalData = GlobalData.fromApiData(response[0]);
        return globalData.toPlainObject();
      },
    }),

    // Get cryptocurrency list with pagination
    getCryptocurrencies: builder.query<CryptocurrencyPlain[], { start?: number; limit?: number }>({
      query: ({ start = 0, limit = 100 }) => `tickers/?start=${start}&limit=${limit}`,
      transformResponse: (response: CryptocurrencyResponse) => {
        return response.data.map(crypto => {
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
        return response.map(market => {
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
```

### Redux Serialization
To ensure compatibility with Redux's requirement for serializable state, the application converts class instances to plain objects before storing them in Redux:

1. Each model class implements a `toPlainObject()` method that returns a plain JavaScript object representation of the instance.
2. The RTK Query `transformResponse` functions use these methods to convert class instances to plain objects.
3. The Redux store is configured to ignore certain paths in the state and actions to prevent serialization checks on RTK Query internal state.

```typescript
// src/store/store.ts (partial)
export const store = configureStore({
  reducer: {
    // ... reducers
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'cryptoApi/executeQuery/fulfilled',
          'cryptoApi/executeQuery/pending',
          'cryptoApi/executeQuery/rejected',
          'cryptoApi/executeMutation/fulfilled',
          'cryptoApi/executeMutation/pending',
          'cryptoApi/executeMutation/rejected',
          'cryptoApi/invalidateTags',
          'cryptoApi/subscriptions/unsubscribeQueryResult',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['cryptoApi.queries'],
      },
    }).concat(cryptoApi.middleware),
});
```

### Error Handling
The API service implements error handling to gracefully handle API failures:
- Network errors are caught and logged
- Appropriate error messages are displayed to the user
- Retry logic is implemented for transient failures

### Caching
To improve performance and reduce API calls, the application implements caching:
- Frequently accessed data is cached in memory
- Less frequently accessed data is cached in local storage
- Cache expiration is set based on data volatility

### Rate Limiting
To respect the API's rate limit recommendation, the application implements a request queue:
- Requests are queued and processed at a rate of one per second
- Priority is given to user-initiated requests
- Background refresh requests are given lower priority

## Models
The API responses are mapped to TypeScript models following OOP principles with proper encapsulation and validation:

```typescript
// src/models/Cryptocurrency.ts
export class Cryptocurrency {
  private _id: string;
  private _symbol: string;
  private _name: string;
  private _rank: number;
  private _priceUsd: number;
  private _percentChange1h: number;
  private _percentChange24h: number;
  private _percentChange7d: number;
  private _marketCapUsd: number;
  private _volume24: number;
  private _circulatingSupply: number;
  private _totalSupply: number;
  private _maxSupply: number;

  /**
   * Constructor for the Cryptocurrency class
   * @param data The data to initialize the cryptocurrency with
   */
  constructor(data: {
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
  }) {
    this._id = data.id;
    this._symbol = data.symbol;
    this._name = data.name;
    this._rank = data.rank;
    this._priceUsd = data.priceUsd;
    this._percentChange1h = data.percentChange1h;
    this._percentChange24h = data.percentChange24h;
    this._percentChange7d = data.percentChange7d;
    this._marketCapUsd = data.marketCapUsd;
    this._volume24 = data.volume24;
    this._circulatingSupply = data.circulatingSupply;
    this._totalSupply = data.totalSupply;
    this._maxSupply = data.maxSupply;
  }

  /**
   * Static factory method to create a Cryptocurrency from API data
   * @param apiData The data from the API
   * @returns A new Cryptocurrency instance
   */
  static fromApiData(apiData: any): Cryptocurrency {
    return new Cryptocurrency({
      id: apiData.id,
      symbol: apiData.symbol,
      name: apiData.name,
      rank: parseInt(apiData.rank),
      priceUsd: parseFloat(apiData.price_usd),
      percentChange1h: parseFloat(apiData.percent_change_1h),
      percentChange24h: parseFloat(apiData.percent_change_24h),
      percentChange7d: parseFloat(apiData.percent_change_7d),
      marketCapUsd: parseFloat(apiData.market_cap_usd),
      volume24: parseFloat(apiData.volume24),
      circulatingSupply: parseFloat(apiData.csupply),
      totalSupply: parseFloat(apiData.tsupply),
      maxSupply: parseFloat(apiData.msupply),
    });
  }

  /**
   * Convert the Cryptocurrency to a plain object for Redux
   * @returns A plain object representation of the cryptocurrency
   */
  toPlainObject(): {
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
  } {
    return {
      id: this._id,
      symbol: this._symbol,
      name: this._name,
      rank: this._rank,
      priceUsd: this._priceUsd,
      percentChange1h: this._percentChange1h,
      percentChange24h: this._percentChange24h,
      percentChange7d: this._percentChange7d,
      marketCapUsd: this._marketCapUsd,
      volume24: this._volume24,
      circulatingSupply: this._circulatingSupply,
      totalSupply: this._totalSupply,
      maxSupply: this._maxSupply,
    };
  }

  // Getters and methods are also implemented
  get id(): string { return this._id; }
  get symbol(): string { return this._symbol; }
  get name(): string { return this._name; }
  // ... other getters

  // Methods for business logic
  calculateFullyDilutedMarketCap(): number | null {
    if (!this._maxSupply) return null;
    return this._priceUsd * this._maxSupply;
  }

  calculateCirculatingSupplyPercentage(): number | null {
    if (!this._maxSupply) return null;
    return (this._circulatingSupply / this._maxSupply) * 100;
  }
}
```
