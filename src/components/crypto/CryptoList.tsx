import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Text as PaperText, useTheme, Button } from "react-native-paper";
import { Cryptocurrency } from "@/src/store/slices/cryptocurrencySlice";
import { CryptoCard } from "./CryptoCard";

interface CryptoListProps {
  data: Cryptocurrency[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  onCryptoPress: (crypto: Cryptocurrency) => void;
  onRefresh: () => void;
  style?: object;
}

export const CryptoList: React.FC<CryptoListProps> = ({
  data,
  loading,
  refreshing,
  error,
  onCryptoPress,
  onRefresh,
  style,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <PaperText
          variant="bodyLarge"
          style={[styles.loadingText, { color: theme.colors.onBackground }]}
        >
          Loading cryptocurrencies...
        </PaperText>
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
        <PaperText
          variant="bodyLarge"
          style={[styles.errorText, { color: theme.colors.error }]}
        >
          {error}
        </PaperText>
        <Button
          mode="contained"
          onPress={onRefresh}
          style={styles.retryButton}
          buttonColor={theme.colors.primary}
        >
          Retry
        </Button>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Cryptocurrency }) => (
    <CryptoCard crypto={item} onPress={() => onCryptoPress(item)} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.listContainer,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "transparent" }} />
      )}
      ListEmptyComponent={
        <View
          style={[
            styles.centerContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <PaperText
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            No cryptocurrencies found
          </PaperText>
          <Button mode="outlined" onPress={onRefresh} style={{ marginTop: 16 }}>
            Refresh
          </Button>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 16,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 16,
  },
});
