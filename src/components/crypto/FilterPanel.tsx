import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  SegmentedButtons,
} from "react-native-paper";

// Export types for use in other components
export type SortOption =
  | "rank"
  | "name"
  | "priceUsd"
  | "marketCapUsd"
  | "percentChange24h";
export type SortDirection = "asc" | "desc";

interface FilterPanelProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, sortDirection: SortDirection) => void;
  minPrice: number | null;
  maxPrice: number | null;
  onPriceFilterChange: (
    minPrice: number | null,
    maxPrice: number | null,
  ) => void;
  onResetFilters: () => void;
  style?: object;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  sortBy,
  sortDirection,
  onSortChange,
  minPrice,
  maxPrice,
  onPriceFilterChange,
  onResetFilters,
  style,
}) => {
  // Local state for input fields
  const [minPriceInput, setMinPriceInput] = useState(
    minPrice?.toString() || "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    maxPrice?.toString() || "",
  );

  // Handle applying price filter
  const handleApplyPriceFilter = () => {
    const min = minPriceInput ? parseFloat(minPriceInput) : null;
    const max = maxPriceInput ? parseFloat(maxPriceInput) : null;
    onPriceFilterChange(min, max);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    onResetFilters();
  };

  return (
    <Card style={[styles.container, style]}>
      <Card.Content>
        {/* Sort Options */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Sort By
        </Text>
        <SegmentedButtons
          value={sortBy}
          onValueChange={(value) =>
            onSortChange(value as SortOption, sortDirection)
          }
          buttons={[
            { value: "rank", label: "Rank" },
            { value: "name", label: "Name" },
            { value: "priceUsd", label: "Price" },
            { value: "marketCapUsd", label: "Market Cap" },
            { value: "percentChange24h", label: "Change" },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Sort Direction */}
        <SegmentedButtons
          value={sortDirection}
          onValueChange={(value) =>
            onSortChange(sortBy, value as SortDirection)
          }
          buttons={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
          style={styles.segmentedButtons}
        />

        {/* Price Filter */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Price Range (USD)
        </Text>
        <View style={styles.priceInputContainer}>
          <TextInput
            label="Min Price"
            value={minPriceInput}
            onChangeText={setMinPriceInput}
            keyboardType="numeric"
            style={styles.priceInput}
            mode="outlined"
          />
          <TextInput
            label="Max Price"
            value={maxPriceInput}
            onChangeText={setMaxPriceInput}
            keyboardType="numeric"
            style={styles.priceInput}
            mode="outlined"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleApplyPriceFilter}
            style={styles.button}
          >
            Apply Filters
          </Button>
          <Button
            mode="outlined"
            onPress={handleResetFilters}
            style={styles.button}
          >
            Reset
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  priceInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
