import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { useGetCryptocurrenciesQuery } from "@/src/store/api/cryptoApi";
import { SearchBar, CryptoList, FilterPanel } from "@/src/components/crypto";
import {
  filterCryptocurrenciesBySearchTerm,
  filterCryptocurrenciesByPriceRange,
} from "@/src/utils";
import { SortOption, SortDirection } from "@/src/components/crypto/FilterPanel";
import { sortCryptocurrencies } from "@/src/utils/calculationUtils";
import { Cryptocurrency } from "@/src/store/slices/cryptocurrencySlice";

export default function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Fetch cryptocurrencies data
  const {
    data: cryptocurrencies = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetCryptocurrenciesQuery({ start: 0, limit: 100 });

  // Handle search term change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback(
    (newSortBy: SortOption, newSortDirection: SortDirection) => {
      setSortBy(newSortBy);
      setSortDirection(newSortDirection);
    },
    [],
  );

  // Handle price filter change
  const handlePriceFilterChange = useCallback(
    (newMinPrice: number | null, newMaxPrice: number | null) => {
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
    },
    [],
  );

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setSortBy("rank");
    setSortDirection("asc");
    setMinPrice(null);
    setMaxPrice(null);
    setSearchTerm("");
  }, []);

  // Handle cryptocurrency selection
  const handleCryptoPress = useCallback(
    (crypto: Cryptocurrency) => {
      router.push(`/detail?id=${crypto.id}`);
    },
    [router],
  );

  // Apply filters and sorting to the cryptocurrencies
  const filteredCryptocurrencies = React.useMemo(() => {
    let filtered = cryptocurrencies;

    // Apply search filter
    if (searchTerm) {
      filtered = filterCryptocurrenciesBySearchTerm(filtered, searchTerm);
    }

    // Apply price filter
    filtered = filterCryptocurrenciesByPriceRange(filtered, minPrice, maxPrice);

    // Apply sorting
    return sortCryptocurrencies(filtered, sortBy, sortDirection);
  }, [cryptocurrencies, searchTerm, minPrice, maxPrice, sortBy, sortDirection]);

  return (
    <>
      <Stack.Screen options={{ title: "Search Cryptocurrencies" }} />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <SearchBar
          value={searchTerm}
          onChangeText={handleSearchChange}
          placeholder="Search by name or symbol..."
          style={styles.searchBar}
        />

        <FilterPanel
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceFilterChange={handlePriceFilterChange}
          onResetFilters={handleResetFilters}
          style={styles.filterPanel}
        />

        <CryptoList
          data={filteredCryptocurrencies}
          loading={isLoading}
          refreshing={isFetching && !isLoading}
          error={error ? "Failed to load cryptocurrencies" : null}
          onCryptoPress={handleCryptoPress}
          onRefresh={refetch}
          style={styles.cryptoList}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Using theme.colors.background in the component instead of hardcoding
  },
  searchBar: {
    marginTop: 8,
  },
  filterPanel: {
    marginTop: 8,
  },
  cryptoList: {
    flex: 1,
  },
});
