import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import {
  Card,
  Text,
  useTheme,
  ActivityIndicator,
  Button,
  Divider,
} from "react-native-paper";
import { Stack } from "expo-router";
import { useGetGlobalDataQuery } from "@/src/store/api/cryptoApi";
import { formatLargeNumber } from "@/src/utils";

export default function MarketOverviewScreen() {
  const theme = useTheme();
  const {
    data: globalData,
    isLoading,
    error,
    refetch,
  } = useGetGlobalDataQuery();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "Market Overview" }} />
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
            Loading market data...
          </Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ title: "Market Overview" }} />
        <View
          style={[
            styles.centerContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.error,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Failed to load market data
          </Text>
          <Button
            mode="contained"
            onPress={refetch}
            buttonColor={theme.colors.primary}
          >
            Retry
          </Button>
        </View>
      </>
    );
  }

  if (!globalData) {
    return (
      <>
        <Stack.Screen options={{ title: "Market Overview" }} />
        <View
          style={[
            styles.centerContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.onBackground,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            No market data available
          </Text>
          <Button mode="outlined" onPress={refetch}>
            Refresh
          </Button>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Market Overview" }} />
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
        {/* Market Summary Card */}
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          mode="elevated"
          elevation={1}
        >
          <Card.Title
            title="Market Summary"
            titleStyle={{
              color: theme.colors.onSurface,
              fontWeight: "bold",
              fontSize: 18,
            }}
          />
          <Card.Content>
            <View style={styles.marketDataGrid}>
              {/* Total Market Cap */}
              <View style={styles.marketDataItem}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 4,
                  }}
                >
                  Total Market Cap
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  ${formatLargeNumber(globalData.totalMarketCap)}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{
                    color:
                      parseFloat(globalData.marketCapChange) >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    marginTop: 4,
                  }}
                >
                  {parseFloat(globalData.marketCapChange) >= 0 ? "+" : ""}
                  {globalData.marketCapChange}%
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
                  ${formatLargeNumber(globalData.totalVolume)}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{
                    color:
                      parseFloat(globalData.volumeChange) >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    marginTop: 4,
                  }}
                >
                  {parseFloat(globalData.volumeChange) >= 0 ? "+" : ""}
                  {globalData.volumeChange}%
                </Text>
              </View>

              {/* Active Markets */}
              <View style={styles.marketDataItem}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 4,
                  }}
                >
                  Active Markets
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  {globalData.activeMarkets.toLocaleString()}
                </Text>
              </View>

              {/* Total Coins */}
              <View style={styles.marketDataItem}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginBottom: 4,
                  }}
                >
                  Total Coins
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  {globalData.coinsCount.toLocaleString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Market Dominance Card */}
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          mode="elevated"
          elevation={1}
        >
          <Card.Title
            title="Market Dominance"
            titleStyle={{
              color: theme.colors.onSurface,
              fontWeight: "bold",
              fontSize: 18,
            }}
          />
          <Card.Content>
            <View style={styles.dominanceContainer}>
              {/* BTC Dominance */}
              <View style={styles.dominanceItem}>
                <View style={styles.dominanceHeader}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    BTC
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    {globalData.btcDominance}%
                  </Text>
                </View>
                <View
                  style={[
                    styles.dominanceBar,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                >
                  <View
                    style={[
                      styles.dominanceFill,
                      {
                        backgroundColor: theme.colors.primary,
                        width: `${parseFloat(globalData.btcDominance)}%`,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* ETH Dominance */}
              <View style={styles.dominanceItem}>
                <View style={styles.dominanceHeader}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    ETH
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    {globalData.ethDominance}%
                  </Text>
                </View>
                <View
                  style={[
                    styles.dominanceBar,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                >
                  <View
                    style={[
                      styles.dominanceFill,
                      {
                        backgroundColor: theme.colors.secondary,
                        width: `${parseFloat(globalData.ethDominance)}%`,
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Others Dominance */}
              <View style={styles.dominanceItem}>
                <View style={styles.dominanceHeader}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    Others
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: "bold",
                    }}
                  >
                    {(
                      100 -
                      parseFloat(globalData.btcDominance) -
                      parseFloat(globalData.ethDominance)
                    ).toFixed(2)}
                    %
                  </Text>
                </View>
                <View
                  style={[
                    styles.dominanceBar,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                >
                  <View
                    style={[
                      styles.dominanceFill,
                      {
                        backgroundColor: theme.colors.tertiary,
                        width: `${100 - parseFloat(globalData.btcDominance) - parseFloat(globalData.ethDominance)}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Market Stats Card */}
        <Card
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
          mode="elevated"
          elevation={1}
        >
          <Card.Title
            title="Market Statistics"
            titleStyle={{
              color: theme.colors.onSurface,
              fontWeight: "bold",
              fontSize: 18,
            }}
          />
          <Card.Content>
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  Average Change (24h)
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    color:
                      parseFloat(globalData.avgChangePercent) >= 0
                        ? theme.colors.tertiary
                        : theme.colors.error,
                    fontWeight: "bold",
                  }}
                >
                  {parseFloat(globalData.avgChangePercent) >= 0 ? "+" : ""}
                  {globalData.avgChangePercent}%
                </Text>
              </View>
              <Divider style={{ marginVertical: 8 }} />

              <View style={styles.statRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  Market Cap ATH
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  ${formatLargeNumber(globalData.marketCapAth)}
                </Text>
              </View>
              <Divider style={{ marginVertical: 8 }} />

              <View style={styles.statRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  Volume ATH
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                >
                  ${formatLargeNumber(globalData.volumeAth)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

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
  // Market Data Grid
  marketDataGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  marketDataItem: {
    width: "48%",
    marginBottom: 16,
  },
  // Dominance Section
  dominanceContainer: {
    marginTop: 8,
  },
  dominanceItem: {
    marginBottom: 16,
  },
  dominanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dominanceBar: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  dominanceFill: {
    height: "100%",
  },
  // Stats Section
  statsContainer: {
    marginTop: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
