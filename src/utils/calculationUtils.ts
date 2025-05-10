/**
 * calculationUtils.ts
 *
 * Utility functions for performing calculations on cryptocurrency data.
 * These functions handle calculations like price changes, market cap changes, etc.
 */

import { Cryptocurrency } from "../store/slices/cryptocurrencySlice";
import { Market } from "../store/slices/marketSlice";

/**
 * Calculate the price change amount
 * @param currentPrice The current price
 * @param percentChange The percentage change
 * @returns The price change amount
 */
export const calculatePriceChange = (
  currentPrice: number,
  percentChange: number,
): number => {
  return (currentPrice * percentChange) / (100 + percentChange);
};

/**
 * Calculate the previous price based on current price and percentage change
 * @param currentPrice The current price
 * @param percentChange The percentage change
 * @returns The previous price
 */
export const calculatePreviousPrice = (
  currentPrice: number,
  percentChange: number,
): number => {
  return currentPrice - calculatePriceChange(currentPrice, percentChange);
};

/**
 * Calculate the market cap based on price and circulating supply
 * @param price The price of the cryptocurrency
 * @param circulatingSupply The circulating supply of the cryptocurrency
 * @returns The market cap
 */
export const calculateMarketCap = (
  price: number,
  circulatingSupply: number,
): number => {
  return price * circulatingSupply;
};

/**
 * Calculate the fully diluted market cap based on price and max supply
 * @param price The price of the cryptocurrency
 * @param maxSupply The maximum supply of the cryptocurrency
 * @returns The fully diluted market cap, or null if max supply is not available
 */
export const calculateFullyDilutedMarketCap = (
  price: number,
  maxSupply: number | null,
): number | null => {
  if (!maxSupply) return null;
  return price * maxSupply;
};

/**
 * Calculate the percentage of circulating supply
 * @param circulatingSupply The circulating supply of the cryptocurrency
 * @param maxSupply The maximum supply of the cryptocurrency
 * @returns The percentage of circulating supply, or null if max supply is not available
 */
export const calculateCirculatingSupplyPercentage = (
  circulatingSupply: number,
  maxSupply: number | null,
): number | null => {
  if (!maxSupply) return null;
  return (circulatingSupply / maxSupply) * 100;
};

/**
 * Calculate the average price from a list of markets
 * @param markets The list of markets
 * @returns The average price
 */
export const calculateAveragePrice = (markets: Market[]): number => {
  if (!markets.length) return 0;

  const sum = markets.reduce((acc, market) => acc + market.priceUsd, 0);
  return sum / markets.length;
};

/**
 * Calculate the price difference from average
 * @param price The price to compare
 * @param averagePrice The average price
 * @returns The percentage difference from average
 */
export const calculatePriceDifferenceFromAverage = (
  price: number,
  averagePrice: number,
): number => {
  if (!averagePrice) return 0;
  return ((price - averagePrice) / averagePrice) * 100;
};

/**
 * Calculate the total volume from a list of markets
 * @param markets The list of markets
 * @returns The total volume
 */
export const calculateTotalVolume = (markets: Market[]): number => {
  return markets.reduce((acc, market) => acc + market.volumeUsd, 0);
};

/**
 * Sort cryptocurrencies by a specific property
 * @param cryptocurrencies The list of cryptocurrencies
 * @param sortBy The property to sort by
 * @param sortDirection The direction to sort (asc or desc)
 * @returns The sorted list of cryptocurrencies
 */
export const sortCryptocurrencies = (
  cryptocurrencies: Cryptocurrency[],
  sortBy: keyof Cryptocurrency | "marketCap" | "change24h",
  sortDirection: "asc" | "desc" = "desc",
): Cryptocurrency[] => {
  const sortMultiplier = sortDirection === "asc" ? 1 : -1;

  return [...cryptocurrencies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortMultiplier * a.name.localeCompare(b.name);
      case "priceUsd":
        return sortMultiplier * (a.priceUsd - b.priceUsd);
      case "marketCap":
      case "marketCapUsd":
        return sortMultiplier * (a.marketCapUsd - b.marketCapUsd);
      case "change24h":
      case "percentChange24h":
        return sortMultiplier * (a.percentChange24h - b.percentChange24h);
      case "rank":
        return sortMultiplier * (a.rank - b.rank);
      default:
        return 0;
    }
  });
};

/**
 * Filter cryptocurrencies by search term
 * @param cryptocurrencies The list of cryptocurrencies
 * @param searchTerm The search term
 * @returns The filtered list of cryptocurrencies
 */
export const filterCryptocurrenciesBySearchTerm = (
  cryptocurrencies: Cryptocurrency[],
  searchTerm: string,
): Cryptocurrency[] => {
  if (!searchTerm) return cryptocurrencies;

  const term = searchTerm.toLowerCase();
  return cryptocurrencies.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(term) ||
      crypto.symbol.toLowerCase().includes(term),
  );
};

/**
 * Filter cryptocurrencies by price range
 * @param cryptocurrencies The list of cryptocurrencies
 * @param minPrice The minimum price
 * @param maxPrice The maximum price
 * @returns The filtered list of cryptocurrencies
 */
export const filterCryptocurrenciesByPriceRange = (
  cryptocurrencies: Cryptocurrency[],
  minPrice: number | null,
  maxPrice: number | null,
): Cryptocurrency[] => {
  let filtered = [...cryptocurrencies];

  if (minPrice !== null) {
    filtered = filtered.filter((crypto) => crypto.priceUsd >= minPrice);
  }

  if (maxPrice !== null) {
    filtered = filtered.filter((crypto) => crypto.priceUsd <= maxPrice);
  }

  return filtered;
};
