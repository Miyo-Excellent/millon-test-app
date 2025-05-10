import React from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";
import { Cryptocurrency } from "@/src/store/slices/cryptocurrencySlice";
import { Market } from "@/src/store/slices/marketSlice";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "@/src/utils";
import { LineChart } from "react-native-gifted-charts";
import { lineDataItem } from "gifted-charts-core";

interface DetailViewProps {
  crypto: Cryptocurrency | null;
  markets: Market[];
  loading: boolean;
  marketsLoading: boolean;
  error: string | null;
  marketsError: string | null;
  onRefresh: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  crypto,
  markets,
  loading,
  marketsLoading,
  error,
  marketsError,
  onRefresh,
}) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  if (loading) {
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
          Loading cryptocurrency data...
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
          {error}
        </Text>
        <Button
          mode="contained"
          onPress={onRefresh}
          buttonColor={theme.colors.primary}
        >
          Retry
        </Button>
      </View>
    );
  }

  if (!crypto) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 16 }}
        >
          No cryptocurrency data available
        </Text>
        <Button mode="outlined" onPress={onRefresh}>
          Refresh
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
      {/* Price Card - Binance Style */}
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
        elevation={1}
      >
        <Card.Content>
          {/* Rank Badge */}
          <View
            style={[
              styles.rankBadge,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Rank #{crypto.rank}
            </Text>
          </View>

          <View style={styles.priceHeader}>
            <Text
              variant="headlineSmall"
              style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
            >
              {crypto.name} ({crypto.symbol})
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text
              variant="headlineMedium"
              style={[styles.price, { color: theme.colors.onSurface }]}
            >
              {formatCurrency(crypto.priceUsd)}
            </Text>

            <View
              style={[
                styles.priceChangeContainer,
                {
                  backgroundColor:
                    crypto.percentChange24h >= 0
                      ? "rgba(14, 203, 129, 0.1)"
                      : "rgba(246, 70, 93, 0.1)",
                },
              ]}
            >
              <Text
                variant="bodyLarge"
                style={[
                  styles.percentChange,
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
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Price Changes Card - Binance Style */}
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
        elevation={1}
      >
        <Card.Title
          title="Price Changes"
          titleStyle={{
            color: theme.colors.onSurface,
            fontWeight: "bold",
            fontSize: 18,
          }}
        />
        <Card.Content>
          <View style={styles.timeframeContainer}>
            {/* 1 Hour */}
            <View style={styles.timeframeItem}>
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                1H
              </Text>
              <View
                style={[
                  styles.changeIndicator,
                  {
                    backgroundColor:
                      crypto.percentChange1h >= 0
                        ? "rgba(14, 203, 129, 0.1)"
                        : "rgba(246, 70, 93, 0.1)",
                  },
                ]}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color:
                      crypto.percentChange1h >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    fontWeight: "bold",
                  }}
                >
                  {crypto.percentChange1h >= 0 ? "+" : ""}
                  {formatPercentage(crypto.percentChange1h)}
                </Text>
              </View>
            </View>

            {/* 24 Hours */}
            <View style={styles.timeframeItem}>
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                24H
              </Text>
              <View
                style={[
                  styles.changeIndicator,
                  {
                    backgroundColor:
                      crypto.percentChange24h >= 0
                        ? "rgba(14, 203, 129, 0.1)"
                        : "rgba(246, 70, 93, 0.1)",
                  },
                ]}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color:
                      crypto.percentChange24h >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    fontWeight: "bold",
                  }}
                >
                  {crypto.percentChange24h >= 0 ? "+" : ""}
                  {formatPercentage(crypto.percentChange24h)}
                </Text>
              </View>
            </View>

            {/* 7 Days */}
            <View style={styles.timeframeItem}>
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                7D
              </Text>
              <View
                style={[
                  styles.changeIndicator,
                  {
                    backgroundColor:
                      crypto.percentChange7d >= 0
                        ? "rgba(14, 203, 129, 0.1)"
                        : "rgba(246, 70, 93, 0.1)",
                  },
                ]}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color:
                      crypto.percentChange7d >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    fontWeight: "bold",
                  }}
                >
                  {crypto.percentChange7d >= 0 ? "+" : ""}
                  {formatPercentage(crypto.percentChange7d)}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Metrics Card - Binance Style */}
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
        elevation={1}
      >
        <Card.Title
          title="Price Metrics"
          titleStyle={{
            color: theme.colors.onSurface,
            fontWeight: "bold",
            fontSize: 18,
          }}
        />
        <Card.Content>
          <View style={styles.metricsContainer}>
            {/* Generate sample data based on current price */}
            {(() => {
              const screenWidth = Dimensions.get("window").width - 64; // Account for padding
              const basePrice = crypto.priceUsd;
              const volatility = basePrice * 0.05; // 5% volatility for sample data

              // Generate sample data points for the last 7 days
              const lineData: lineDataItem[] = Array.from(
                { length: 7 },
                (_, i): lineDataItem => {
                  const randomFactor = Math.random() * 2 - 1; // Between -1 and 1
                  const value = basePrice + randomFactor * volatility;
                  return {
                    value,
                    dataPointText: `$${value.toFixed(2)}`,
                    label: `Day ${i + 1}`,
                  };
                },
              );

              // Determine if trend is positive or negative
              const startPrice = lineData[0].value ?? 0;
              const endPrice = lineData[lineData.length - 1].value ?? 0;
              const isPositive = endPrice >= startPrice;

              return (
                <>
                  <View style={styles.metricsHeader}>
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      7-Day Price Trend
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{
                        color: isPositive
                          ? theme.colors.tertiary
                          : theme.colors.error,
                        fontWeight: "bold",
                      }}
                    >
                      {isPositive ? "+" : ""}
                      {(((endPrice - startPrice) / startPrice) * 100).toFixed(
                        2,
                      )}
                      %
                    </Text>
                  </View>

                  <LineChart
                    data={lineData.map((item) => ({
                      ...item,
                      thickness: 2,
                      startFillColor: isPositive
                        ? "rgba(14, 203, 129, 0.2)"
                        : "rgba(246, 70, 93, 0.2)",
                      endFillColor: isPositive
                        ? "rgba(14, 203, 129, 0.0)"
                        : "rgba(246, 70, 93, 0.0)",
                      hideDataPoints: true,
                      curved: true,
                    }))}
                    width={screenWidth}
                    height={200}
                    spacing={screenWidth / lineData.length}
                    initialSpacing={0}
                    noOfSections={4}
                    yAxisColor={theme.colors.outline}
                    xAxisColor={theme.colors.outline}
                    yAxisTextStyle={{ color: theme.colors.onSurfaceVariant }}
                  />

                  <View style={styles.metricsGrid}>
                    <View style={styles.metricItem}>
                      <Text
                        variant="bodySmall"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          marginBottom: 4,
                        }}
                      >
                        Volatility
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurface,
                          fontWeight: "bold",
                        }}
                      >
                        {((volatility / basePrice) * 100).toFixed(2)}%
                      </Text>
                    </View>

                    <View style={styles.metricItem}>
                      <Text
                        variant="bodySmall"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          marginBottom: 4,
                        }}
                      >
                        7-Day High
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurface,
                          fontWeight: "bold",
                        }}
                      >
                        $
                        {Math.max(...lineData.map((d) => d.value ?? 0)).toFixed(
                          2,
                        )}
                      </Text>
                    </View>

                    <View style={styles.metricItem}>
                      <Text
                        variant="bodySmall"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          marginBottom: 4,
                        }}
                      >
                        7-Day Low
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurface,
                          fontWeight: "bold",
                        }}
                      >
                        $
                        {Math.min(...lineData.map((d) => d.value ?? 0)).toFixed(
                          2,
                        )}
                      </Text>
                    </View>

                    <View style={styles.metricItem}>
                      <Text
                        variant="bodySmall"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          marginBottom: 4,
                        }}
                      >
                        7-Day Avg
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurface,
                          fontWeight: "bold",
                        }}
                      >
                        $
                        {(
                          lineData.reduce((sum, d) => sum + (d.value ?? 0), 0) /
                          lineData.length
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </>
              );
            })()}
          </View>
        </Card.Content>
      </Card>

      {/* Market Data Card - Binance Style */}
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
        elevation={1}
      >
        <Card.Title
          title="Market Data"
          titleStyle={{
            color: theme.colors.onSurface,
            fontWeight: "bold",
            fontSize: 18,
          }}
        />
        <Card.Content>
          <View style={styles.marketDataGrid}>
            {/* Market Cap */}
            <View style={styles.marketDataItem}>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                Market Cap
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
              >
                ${formatLargeNumber(crypto.marketCapUsd)}
              </Text>
            </View>

            {/* 24h Volume */}
            <View style={styles.marketDataItem}>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                24h Volume
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
              >
                ${formatLargeNumber(crypto.volume24)}
              </Text>
            </View>

            {/* Circulating Supply */}
            <View style={styles.marketDataItem}>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginBottom: 4,
                }}
              >
                Circulating Supply
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
              >
                {formatLargeNumber(crypto.circulatingSupply)} {crypto.symbol}
              </Text>
            </View>

            {/* Total Supply */}
            {crypto.totalSupply > 0 && (
              <View style={styles.marketDataItem}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 4,
                  }}
                >
                  Total Supply
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  {formatLargeNumber(crypto.totalSupply)} {crypto.symbol}
                </Text>
              </View>
            )}

            {/* Max Supply */}
            {crypto.maxSupply > 0 && (
              <View style={styles.marketDataItem}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 4,
                  }}
                >
                  Max Supply
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  {formatLargeNumber(crypto.maxSupply)} {crypto.symbol}
                </Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* Markets Card - Binance Style */}
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
        elevation={1}
      >
        <Card.Title
          title="Markets"
          titleStyle={{
            color: theme.colors.onSurface,
            fontWeight: "bold",
            fontSize: 18,
          }}
        />
        <Card.Content>
          {marketsLoading ? (
            <View style={styles.marketsLoadingContainer}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}
              >
                Loading markets data...
              </Text>
            </View>
          ) : marketsError ? (
            <View style={styles.marketsErrorContainer}>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.error, marginBottom: 8 }}
              >
                {marketsError}
              </Text>
              <Button
                mode="outlined"
                onPress={onRefresh}
                style={{ alignSelf: "center" }}
              >
                Retry
              </Button>
            </View>
          ) : markets.length === 0 ? (
            <View style={styles.marketsEmptyContainer}>
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onSurfaceVariant,
                  textAlign: "center",
                }}
              >
                No markets data available
              </Text>
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.marketHeader,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Text
                  variant="labelMedium"
                  style={[
                    styles.marketExchange,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Exchange
                </Text>
                <Text
                  variant="labelMedium"
                  style={[
                    styles.marketPair,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Pair
                </Text>
                <Text
                  variant="labelMedium"
                  style={[
                    styles.marketPrice,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Price
                </Text>
                <Text
                  variant="labelMedium"
                  style={[
                    styles.marketVolume,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Volume (24h)
                </Text>
              </View>

              {markets.slice(0, 10).map((market, index) => (
                <View key={index}>
                  <View style={styles.marketRow}>
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.marketExchange,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {market.name}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.marketPair,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      {market.base}/{market.quote}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.marketPrice,
                        { color: theme.colors.onSurface, fontWeight: "bold" },
                      ]}
                    >
                      ${market.price.toFixed(2)}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.marketVolume,
                        { color: theme.colors.onSurface },
                      ]}
                    >
                      ${formatLargeNumber(market.volumeUsd)}
                    </Text>
                  </View>
                  <Divider
                    style={{
                      backgroundColor: theme.colors.outline,
                      opacity: 0.5,
                    }}
                  />
                </View>
              ))}

              {markets.length > 10 && (
                <Button
                  mode="text"
                  style={styles.viewMoreButton}
                  textColor={theme.colors.primary}
                >
                  View {markets.length - 10} more markets
                </Button>
              )}
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 300,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  // Price Card
  rankBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    marginRight: 12,
    fontWeight: "bold",
  },
  priceChangeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  percentChange: {
    fontWeight: "bold",
  },
  // Price Changes Card
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  timeframeItem: {
    width: "30%",
    marginBottom: 12,
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: "center",
  },
  // Market Data Card
  marketDataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  marketDataItem: {
    width: "48%",
    marginBottom: 16,
  },
  // Markets Card
  marketsLoadingContainer: {
    alignItems: "center",
    padding: 20,
  },
  marketsErrorContainer: {
    alignItems: "center",
    padding: 20,
  },
  marketsEmptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  marketHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  marketRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  marketExchange: {
    flex: 1,
  },
  marketPair: {
    flex: 1,
  },
  marketPrice: {
    flex: 1,
    textAlign: "right",
  },
  marketVolume: {
    flex: 1,
    textAlign: "right",
  },
  viewMoreButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  // Metrics Card
  metricsContainer: {
    width: "100%",
  },
  metricsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  metricItem: {
    width: "48%",
    marginBottom: 16,
  },
});
