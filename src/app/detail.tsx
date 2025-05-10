import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import { DetailView, ErrorDisplay } from "@/src/components/crypto";
import {
  useGetCryptocurrencyByIdQuery,
  useGetCryptocurrencyMarketsQuery,
} from "@/src/store/api/cryptoApi";

export default function DetailScreen() {
  // Get the id parameter from the URL
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  // Fetch cryptocurrency data
  const {
    data: crypto,
    isLoading: cryptoLoading,
    error: cryptoError,
    refetch: refetchCrypto,
  } = useGetCryptocurrencyByIdQuery(id || "");

  // Fetch markets data
  const {
    data: markets,
    isLoading: marketsLoading,
    error: marketsError,
    refetch: refetchMarkets,
  } = useGetCryptocurrencyMarketsQuery(id || "");

  // Handle refetch for both queries
  const handleRefetch = () => {
    refetchCrypto();
    refetchMarkets();
  };

  // If no id is provided, show an error
  if (!id) {
    return (
      <>
        <Stack.Screen options={{ title: "Error" }} />
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ErrorDisplay
            message="No cryptocurrency ID provided"
            onRetry={() => {}}
          />
        </View>
      </>
    );
  }

  // Set the screen title based on the cryptocurrency data
  const screenTitle = crypto
    ? `${crypto.name} (${crypto.symbol})`
    : "Cryptocurrency Details";

  return (
    <>
      <Stack.Screen options={{ title: screenTitle }} />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <DetailView
          crypto={crypto || null}
          markets={markets || []}
          loading={cryptoLoading}
          marketsLoading={marketsLoading}
          error={cryptoError ? "Failed to load cryptocurrency data" : null}
          marketsError={marketsError ? "Failed to load market data" : null}
          onRefresh={handleRefetch}
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
});
