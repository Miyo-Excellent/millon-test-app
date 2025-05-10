import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { Stack } from "expo-router";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useGetCryptocurrenciesQuery } from "@/src/store/api/cryptoApi";
import {
  resetFilters,
  selectComparisonMetric,
  selectFilteredCryptocurrencies,
  selectFilters,
  selectSearchTerm,
  selectSelectedCryptoIds,
  setComparisonMetric,
  setFilters,
  setSearchTerm,
  toggleSelectedCryptoId,
} from "@/src/store/slices/cryptocurrencySlice";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "@/src/utils";
import { lineDataItem } from "gifted-charts-core";
import { SearchBar } from "@/src/components/crypto/SearchBar";

export default function CompareScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {
    data: cryptoData,
    isLoading,
    error,
    refetch,
  } = useGetCryptocurrenciesQuery({ limit: 100 }); // Increased limit to get more cryptocurrencies
  // Use Redux state instead of local state
  const selectedCryptos = useAppSelector(selectSelectedCryptoIds);
  const comparisonMetric = useAppSelector(selectComparisonMetric);
  const screenWidth = Dimensions.get("window").width - 32;

  // Filter state
  const searchTerm = useAppSelector(selectSearchTerm);
  const filters = useAppSelector(selectFilters);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState<number | null>(
    filters.minPrice,
  );
  const [tempMaxPrice, setTempMaxPrice] = useState<number | null>(
    filters.maxPrice,
  );
  const [tempSortBy, setTempSortBy] = useState<typeof filters.sortBy>(
    filters.sortBy,
  );
  const [tempSortDirection, setTempSortDirection] = useState<
    typeof filters.sortDirection
  >(filters.sortDirection);

  // Get filtered cryptocurrencies
  const filteredCryptos = useAppSelector(selectFilteredCryptocurrencies);

  // Handle crypto selection using Redux action
  const toggleCryptoSelection = (id: string) => {
    dispatch(toggleSelectedCryptoId(id));
  };

  // Get selected crypto data
  const selectedCryptosData = filteredCryptos.filter((crypto) =>
    selectedCryptos.includes(crypto.id),
  );

  // State to store the generated line chart data to avoid regenerating it on every render
  const [lineChartData, setLineChartData] = React.useState<lineDataItem[]>([]);

  // Reset chart data when selected cryptos or filtered cryptos change
  React.useEffect(() => {
    // This will force regeneration of chart data when selected cryptos or filtered cryptos change
    setLineChartData([]);
  }, [selectedCryptos, filteredCryptos]);

  // Generate line chart data for price comparison
  const generateLineChartData = (): lineDataItem[] => {
    // If we already have data for the selected cryptos, return it
    if (
      lineChartData.length === selectedCryptosData.length &&
      lineChartData.every(
        (item, index) => item.label === selectedCryptosData[index].symbol,
      )
    ) {
      return lineChartData;
    }

    const colors = [
      theme.colors.secondary, // Yellow
      theme.colors.primary, // Orange
      theme.colors.tertiary, // Green
      theme.colors.error, // Red
      "#8A2BE2", // Purple (keeping this one as it's not in the theme)
    ];

    // Generate more realistic price trends based on available percentage changes
    const newData = selectedCryptosData.map((crypto, index) => {
      const basePrice = crypto.priceUsd;
      // Use the 7d percentage change to calculate the starting price (7 days ago)
      const startPrice = crypto.percentChange7d
        ? basePrice / (1 + crypto.percentChange7d / 100)
        : basePrice * 0.95; // Fallback if no 7d data

      // Use 24h and 1h changes to create a more realistic trend
      const midPrice = crypto.percentChange24h
        ? basePrice / (1 + crypto.percentChange24h / 100)
        : (basePrice + startPrice) / 2; // Fallback

      // Create a smooth curve between start, mid, and current price
      const data = Array.from({ length: 7 }, (_, i) => {
        let value;

        if (i < 3) {
          // First half of the week: interpolate between start and mid price
          const progress = i / 3;
          value = startPrice + (midPrice - startPrice) * progress;
        } else {
          // Second half of the week: interpolate between mid and current price
          const progress = (i - 3) / 3;
          value = midPrice + (basePrice - midPrice) * progress;
        }

        // Add small variations to make it look more natural
        // Use a deterministic "random" based on crypto id and day to ensure consistency
        const seed = (crypto.id.charCodeAt(0) + i) / 100;
        const variation = Math.sin(seed * 10) * basePrice * 0.01;
        value += variation;

        return {
          value,
          dataPointColor: colors[index % colors.length],
          dataPointRadius: 4,
          hideDataPoint: i % 2 !== 0, // Only show every other point to reduce clutter
          onPress: () =>
            console.log(
              `Day ${i + 1} price for ${crypto.symbol}: ${formatCurrency(value)}`,
            ),
          showStrip: true,
          stripColor: colors[index % colors.length],
          stripOpacity: 0.1,
          label: `Day ${i + 1}`,
          dataPointText: formatCurrency(value),
        };
      });

      return {
        value: basePrice,
        data: data,
        label: crypto.symbol,
        color: colors[index % colors.length],
        hideDataPoint: false,
        dataPointRadius: 4,
        dataPointColor: colors[index % colors.length],
        showStrip: true,
        stripColor: colors[index % colors.length],
        stripOpacity: 0.1,
      };
    });

    // Store the generated data
    setLineChartData(newData);
    return newData;
  };

  // Generate bar chart data for comparison
  const generateBarChartData = () => {
    const colors = [
      theme.colors.secondary, // Yellow
      theme.colors.primary, // Orange
      theme.colors.tertiary, // Green
      theme.colors.error, // Red
      "#8A2BE2", // Purple (keeping this one as it's not in the theme)
    ];

    return selectedCryptosData.map((crypto, index) => {
      let value = 0;
      let label = "";

      switch (comparisonMetric) {
        case "price":
          value = crypto.priceUsd;
          label = `$${value < 1 ? value.toFixed(4) : value.toFixed(2)}`;
          break;
        case "change24h":
          value = crypto.percentChange24h;
          label = `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
          break;
        case "marketCap":
          value = crypto.marketCapUsd / 1e9; // Convert to billions
          label = `$${value.toFixed(2)}B`;
          break;
        case "volume":
          value = crypto.volume24 / 1e9; // Convert to billions
          label = `$${value.toFixed(2)}B`;
          break;
      }

      return {
        value: Math.abs(value), // Use absolute value for bar height
        label: crypto.symbol,
        topLabelComponent: () => (
          <Text
            style={{
              color: theme.colors.onSurface,
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            {label}
          </Text>
        ),
        frontColor: colors[index % colors.length],
      };
    });
  };

  // Memoize the line chart data to prevent unnecessary recalculations
  const memoizedLineChartData = useMemo(() => {
    return generateLineChartData();
  }, [selectedCryptosData, lineChartData]);

  // Memoize the bar chart data to prevent unnecessary recalculations
  const memoizedBarChartData = useMemo(() => {
    return generateBarChartData();
  }, [selectedCryptosData, comparisonMetric]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          variant="bodyLarge"
          style={{ marginTop: 16, color: theme.colors.onBackground }}
        >
          Loading cryptocurrencies...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.error, marginBottom: 16 }}
        >
          Error loading cryptocurrencies
        </Text>
        <Button
          mode="contained"
          onPress={() => refetch()}
          buttonColor={theme.colors.primary}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Stack.Screen
        options={{ title: "Compare Currencies", headerShown: true }}
      />

      <ScrollView>
        {/* Enhanced Selection Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title="Select Cryptocurrencies to Compare"
            titleStyle={{ color: theme.colors.onSurface, fontWeight: "bold" }}
            right={(props) => (
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  {...props}
                  icon="filter-variant"
                  onPress={() => setFilterMenuVisible(true)}
                  iconColor={theme.colors.primary}
                />
                <Menu
                  visible={filterMenuVisible}
                  onDismiss={() => setFilterMenuVisible(false)}
                  anchor={{ x: screenWidth, y: 50 }}
                >
                  <Menu.Item
                    onPress={() => {
                      setFilterModalVisible(true);
                      setFilterMenuVisible(false);
                    }}
                    title="Price Range"
                    leadingIcon="cash"
                  />
                  <Menu.Item
                    onPress={() => {
                      setTempSortBy("rank");
                      dispatch(setFilters({ sortBy: "rank" }));
                      setFilterMenuVisible(false);
                    }}
                    title="Sort by Rank"
                    leadingIcon="sort-numeric-ascending"
                  />
                  <Menu.Item
                    onPress={() => {
                      setTempSortBy("name");
                      dispatch(setFilters({ sortBy: "name" }));
                      setFilterMenuVisible(false);
                    }}
                    title="Sort by Name"
                    leadingIcon="sort-alphabetical-ascending"
                  />
                  <Menu.Item
                    onPress={() => {
                      setTempSortBy("price");
                      dispatch(setFilters({ sortBy: "price" }));
                      setFilterMenuVisible(false);
                    }}
                    title="Sort by Price"
                    leadingIcon="currency-usd"
                  />
                  <Menu.Item
                    onPress={() => {
                      setTempSortBy("marketCap");
                      dispatch(setFilters({ sortBy: "marketCap" }));
                      setFilterMenuVisible(false);
                    }}
                    title="Sort by Market Cap"
                    leadingIcon="chart-pie"
                  />
                  <Menu.Item
                    onPress={() => {
                      setTempSortBy("change24h");
                      dispatch(setFilters({ sortBy: "change24h" }));
                      setFilterMenuVisible(false);
                    }}
                    title="Sort by 24h Change"
                    leadingIcon="chart-line"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      const newDirection =
                        filters.sortDirection === "asc" ? "desc" : "asc";
                      setTempSortDirection(newDirection);
                      dispatch(setFilters({ sortDirection: newDirection }));
                      setFilterMenuVisible(false);
                    }}
                    title={`Order: ${filters.sortDirection === "asc" ? "Ascending ↑" : "Descending ↓"}`}
                    leadingIcon={
                      filters.sortDirection === "asc"
                        ? "sort-ascending"
                        : "sort-descending"
                    }
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      dispatch(resetFilters());
                      dispatch(setSearchTerm(""));
                      setTempMinPrice(null);
                      setTempMaxPrice(null);
                      setTempSortBy("rank");
                      setTempSortDirection("asc");
                      setFilterMenuVisible(false);
                    }}
                    title="Reset Filters"
                    leadingIcon="refresh"
                  />
                </Menu>
              </View>
            )}
          />
          <Card.Content>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant, marginBottom: 12 }}
            >
              Select up to 5 cryptocurrencies to compare
            </Text>

            {/* Search Bar */}
            <SearchBar
              value={searchTerm}
              onChangeText={(text) => dispatch(setSearchTerm(text))}
              placeholder="Search by name or symbol..."
              style={{ marginBottom: 12 }}
            />

            {/* Start Currencies list for selection */}
            {cryptoData && cryptoData.length === 0 ? (
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  width: "100%",
                  marginTop: 12,
                }}
              >
                No cryptocurrencies available
              </Text>
            ) : (
              <View style={styles.cryptoListContainer}>
                <Text
                  variant="titleSmall"
                  style={{
                    color: theme.colors.onSurface,
                    marginBottom: 8,
                    fontWeight: "bold",
                  }}
                >
                  All Cryptocurrencies
                </Text>
                {cryptoData && (
                  <FlatList
                    data={cryptoData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item: crypto }) => (
                      <TouchableOpacity
                        onPress={() => toggleCryptoSelection(crypto.id)}
                        style={[
                          styles.cryptoItem,
                          selectedCryptos.includes(crypto.id) && {
                            backgroundColor: `${theme.colors.surfaceVariant}80`, // 50% opacity
                            borderColor: theme.colors.primary,
                          },
                        ]}
                      >
                        <View style={styles.cryptoItemLeft}>
                          <Text
                            style={[
                              styles.cryptoSymbol,
                              { color: theme.colors.primary },
                            ]}
                          >
                            {crypto.symbol}
                          </Text>
                          <Text style={{ color: theme.colors.onSurface }}>
                            {crypto.name}
                          </Text>
                        </View>
                        <View style={styles.cryptoItemRight}>
                          <Text
                            style={{
                              color: theme.colors.onSurface,
                              fontWeight: "bold",
                            }}
                          >
                            {formatCurrency(crypto.priceUsd)}
                          </Text>
                          <Text
                            style={{
                              color:
                                crypto.percentChange24h >= 0
                                  ? theme.colors.tertiary
                                  : theme.colors.error,
                            }}
                          >
                            {crypto.percentChange24h >= 0 ? "+" : ""}
                            {formatPercentage(crypto.percentChange24h)}
                          </Text>
                        </View>
                        {selectedCryptos.includes(crypto.id) && (
                          <View style={styles.selectedIndicator}>
                            <IconButton
                              icon="check-circle"
                              size={20}
                              iconColor={theme.colors.primary}
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                    style={{ maxHeight: 260 }} // Height of approximately 2 items
                  />
                )}
              </View>
            )}
            {/* End Currencies list for selection */}

            {/* Filter Indicators */}
            {(filters.minPrice !== null ||
              filters.maxPrice !== null ||
              filters.sortBy !== "rank" ||
              filters.sortDirection !== "asc") && (
              <View style={styles.filterIndicators}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginRight: 8,
                  }}
                >
                  Active Filters:
                </Text>
                {filters.minPrice !== null && (
                  <Chip
                    style={styles.filterChip}
                    onClose={() => dispatch(setFilters({ minPrice: null }))}
                  >
                    Min: ${filters.minPrice}
                  </Chip>
                )}
                {filters.maxPrice !== null && (
                  <Chip
                    style={styles.filterChip}
                    onClose={() => dispatch(setFilters({ maxPrice: null }))}
                  >
                    Max: ${filters.maxPrice}
                  </Chip>
                )}
                {filters.sortBy !== "rank" && (
                  <Chip
                    style={styles.filterChip}
                    onClose={() => dispatch(setFilters({ sortBy: "rank" }))}
                  >
                    Sort: {filters.sortBy}
                  </Chip>
                )}
                {filters.sortDirection !== "asc" && (
                  <Chip
                    style={styles.filterChip}
                    onClose={() =>
                      dispatch(setFilters({ sortDirection: "asc" }))
                    }
                  >
                    Order: Desc
                  </Chip>
                )}
              </View>
            )}

            {/* Filtered Cryptocurrencies */}
            {filteredCryptos.length === 0 ? (
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  width: "100%",
                  marginTop: 12,
                }}
              >
                No cryptocurrencies match your filters
              </Text>
            ) : (
              <View style={styles.cryptoListContainer}>
                <Text
                  variant="titleSmall"
                  style={{
                    color: theme.colors.onSurface,
                    marginBottom: 8,
                    fontWeight: "bold",
                  }}
                >
                  Filtered Cryptocurrencies
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 8,
                  }}
                >
                  {filteredCryptos.length} cryptocurrencies match your filters
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Price Range Filter Modal */}
        <Portal>
          <Modal
            visible={filterModalVisible}
            onDismiss={() => setFilterModalVisible(false)}
            contentContainerStyle={[
              styles.modalContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface, marginBottom: 16 }}
            >
              Price Range Filter
            </Text>

            <View style={styles.priceInputContainer}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>
                Min Price: ${tempMinPrice !== null ? tempMinPrice : "None"}
              </Text>
              <Slider
                value={tempMinPrice !== null ? tempMinPrice : 0}
                onValueChange={(value) =>
                  setTempMinPrice(value === 0 ? null : value)
                }
                minimumValue={0}
                maximumValue={10000}
                step={100}
                style={{ width: "100%", height: 40 }}
              />
            </View>

            <View style={styles.priceInputContainer}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>
                Max Price: ${tempMaxPrice !== null ? tempMaxPrice : "None"}
              </Text>
              <Slider
                value={tempMaxPrice !== null ? tempMaxPrice : 100000}
                onValueChange={(value) =>
                  setTempMaxPrice(value === 100000 ? null : value)
                }
                minimumValue={0}
                maximumValue={100000}
                step={1000}
                style={{ width: "100%", height: 40 }}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <Button
                mode="outlined"
                onPress={() => {
                  setTempMinPrice(filters.minPrice);
                  setTempMaxPrice(filters.maxPrice);
                  setFilterModalVisible(false);
                }}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  dispatch(
                    setFilters({
                      minPrice: tempMinPrice,
                      maxPrice: tempMaxPrice,
                    }),
                  );
                  setFilterModalVisible(false);
                }}
              >
                Apply
              </Button>
            </View>
          </Modal>
        </Portal>

        {selectedCryptos.length > 0 ? (
          <>
            {/* Price Trend Card */}
            <Card
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <Card.Title
                title="Price Trend Comparison"
                titleStyle={{
                  color: theme.colors.onSurface,
                  fontWeight: "bold",
                }}
              />
              <Card.Content>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 12,
                  }}
                >
                  Estimated 7-day price trend based on available data
                </Text>
                <View style={styles.chartContainer}>
                  {memoizedLineChartData.map(
                    (dataset: lineDataItem, index: number) => (
                      <View key={index} style={styles.legendItem}>
                        <View
                          style={[
                            styles.legendColor,
                            {
                              backgroundColor:
                                dataset.stripColor || theme.colors.primary,
                            },
                          ]}
                        />
                        <Text style={{ color: theme.colors.onSurface }}>
                          {dataset.label}
                        </Text>
                      </View>
                    ),
                  )}
                </View>

                <LineChart
                  data={memoizedLineChartData}
                  height={200}
                  width={screenWidth}
                  noOfSections={4}
                  spacing={screenWidth / 7}
                  initialSpacing={0}
                  hideYAxisText
                  yAxisColor={theme.colors.outline}
                  xAxisColor={theme.colors.outline}
                  curved
                  thickness={2}
                  hideRules
                  rulesType="solid"
                  rulesColor={theme.colors.outline}
                  xAxisLabelTextStyle={{
                    color: theme.colors.onSurfaceVariant,
                  }}
                  yAxisTextStyle={{
                    color: theme.colors.onSurfaceVariant,
                  }}
                  animateOnDataChange
                  animationDuration={300}
                />
              </Card.Content>
            </Card>

            {/* Metrics Comparison Card */}
            <Card
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <Card.Title
                title="Metrics Comparison"
                titleStyle={{
                  color: theme.colors.onSurface,
                  fontWeight: "bold",
                }}
              />
              <Card.Content>
                <View style={styles.metricsButtonContainer}>
                  <Button
                    mode={
                      comparisonMetric === "price" ? "contained" : "outlined"
                    }
                    onPress={() => dispatch(setComparisonMetric("price"))}
                    style={styles.metricButton}
                  >
                    Price
                  </Button>
                  <Button
                    mode={
                      comparisonMetric === "change24h"
                        ? "contained"
                        : "outlined"
                    }
                    onPress={() => dispatch(setComparisonMetric("change24h"))}
                    style={styles.metricButton}
                  >
                    24h %
                  </Button>
                  <Button
                    mode={
                      comparisonMetric === "marketCap"
                        ? "contained"
                        : "outlined"
                    }
                    onPress={() => dispatch(setComparisonMetric("marketCap"))}
                    style={styles.metricButton}
                  >
                    Market Cap
                  </Button>
                  <Button
                    mode={
                      comparisonMetric === "volume" ? "contained" : "outlined"
                    }
                    onPress={() => dispatch(setComparisonMetric("volume"))}
                    style={styles.metricButton}
                  >
                    Volume
                  </Button>
                </View>

                <BarChart
                  data={memoizedBarChartData}
                  width={screenWidth}
                  height={200}
                  barWidth={30}
                  spacing={20}
                  hideRules
                  xAxisThickness={1}
                  yAxisThickness={1}
                  yAxisTextStyle={{ color: theme.colors.onSurfaceVariant }}
                  xAxisColor={theme.colors.outline}
                  yAxisColor={theme.colors.outline}
                  noOfSections={4}
                  barBorderRadius={4}
                  isAnimated
                />
              </Card.Content>
            </Card>

            {/* Data Table Card */}
            <Card
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <Card.Title
                title="Comparison Table"
                titleStyle={{
                  color: theme.colors.onSurface,
                  fontWeight: "bold",
                }}
              />
              <Card.Content>
                <View
                  style={[
                    styles.tableHeader,
                    { borderBottomColor: theme.colors.outline },
                  ]}
                >
                  <Text
                    style={[
                      styles.tableHeaderCell,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Currency
                  </Text>
                  <Text
                    style={[
                      styles.tableHeaderCell,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Price
                  </Text>
                  <Text
                    style={[
                      styles.tableHeaderCell,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    24h %
                  </Text>
                  <Text
                    style={[
                      styles.tableHeaderCell,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Market Cap
                  </Text>
                </View>

                {selectedCryptosData.map((crypto, index) => (
                  <React.Fragment key={crypto.id}>
                    <View style={styles.tableRow}>
                      <Text
                        style={[
                          styles.tableCell,
                          {
                            color: theme.colors.onSurface,
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        {crypto.symbol}
                      </Text>
                      <Text
                        style={[
                          styles.tableCell,
                          { color: theme.colors.onSurface },
                        ]}
                      >
                        {formatCurrency(crypto.priceUsd)}
                      </Text>
                      <Text
                        style={[
                          styles.tableCell,
                          {
                            color:
                              crypto.percentChange24h >= 0
                                ? theme.colors.tertiary
                                : theme.colors.error,
                          },
                        ]}
                      >
                        {crypto.percentChange24h >= 0 ? "+" : ""}
                        {formatPercentage(crypto.percentChange24h)}
                      </Text>
                      <Text
                        style={[
                          styles.tableCell,
                          { color: theme.colors.onSurface },
                        ]}
                      >
                        ${formatLargeNumber(crypto.marketCapUsd)}
                      </Text>
                    </View>
                    {index < selectedCryptosData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Card.Content>
            </Card>
          </>
        ) : (
          <Card
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content>
              <Text
                variant="bodyLarge"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                  padding: 20,
                }}
              >
                Select cryptocurrencies above to compare them
              </Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  cryptoListContainer: {
    marginVertical: 8,
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cryptoItemLeft: {
    flex: 1,
    justifyContent: "center",
  },
  cryptoItemRight: {
    alignItems: "flex-end",
  },
  cryptoSymbol: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  selectedIndicator: {
    marginLeft: 8,
  },
  chartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  metricsButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricButton: {
    marginBottom: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  tableCell: {
    flex: 1,
  },
  // New styles for enhanced currency selection
  filterIndicators: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  filterChip: {
    margin: 4,
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  priceInputContainer: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
});
