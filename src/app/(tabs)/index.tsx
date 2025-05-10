import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { FAB, useTheme } from "react-native-paper";
import { CryptoList } from "@/src/components/crypto";
import { useGetCryptocurrenciesQuery } from "@/src/store/api/cryptoApi";
import { Cryptocurrency } from "@/src/store/slices/cryptocurrencySlice";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  // Fetch cryptocurrencies data
  const {
    data: cryptocurrencies = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetCryptocurrenciesQuery({ start: 0, limit: 100 });

  // Handle cryptocurrency selection
  const handleCryptoPress = useCallback(
    (crypto: Cryptocurrency) => {
      router.push(`/detail?id=${crypto.id}`);
    },
    [router],
  );

  // Navigate to search screen
  const handleSearchPress = useCallback(() => {
    router.push("/search");
  }, [router]);

  // Navigate to settings screen
  const handleSettingsPress = useCallback(() => {
    router.push("/settings");
  }, [router]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <CryptoList
        data={cryptocurrencies}
        loading={isLoading}
        refreshing={isFetching && !isLoading}
        error={error ? "Failed to load cryptocurrencies" : null}
        onCryptoPress={handleCryptoPress}
        onRefresh={refetch}
      />

      {/* Search FAB */}
      <FAB
        icon="magnify"
        style={[
          styles.fab,
          styles.searchFab,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={handleSearchPress}
      />

      {/* Settings FAB */}
      <FAB
        icon="cog"
        style={[
          styles.fab,
          styles.settingsFab,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={handleSettingsPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Using theme.colors.background in the component instead of hardcoding
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
  },
  searchFab: {
    bottom: 80,
  },
  settingsFab: {
    bottom: 16,
  },
});
