import React from "react";
import { StyleSheet, View, ViewStyle, TouchableOpacity } from "react-native";
import { Card, Text, useTheme, IconButton } from "react-native-paper";
import { Cryptocurrency } from "@/src/store/slices/cryptocurrencySlice";
import { formatCurrency, formatPercentage } from "@/src/utils";

interface CryptoCardProps {
  /**
   * The cryptocurrency data to display
   */
  crypto: Cryptocurrency;

  /**
   * Callback function when the card is pressed
   */
  onPress?: () => void;

  /**
   * Callback function when the favorite button is pressed
   */
  onFavoritePress?: () => void;

  /**
   * Whether the cryptocurrency is favorited
   * @default false
   */
  isFavorite?: boolean;

  /**
   * Custom style for the card
   */
  style?: ViewStyle;
}

/**
 * A card component that displays cryptocurrency information
 */
export const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  onPress,
  onFavoritePress,
  isFavorite = false,
  style,
}) => {
  const theme = useTheme();

  // Determine the color for the price change (green for positive, red for negative)
  const priceChangeColor =
    crypto.percentChange24h >= 0
      ? theme.colors.tertiary // Green for positive changes (Binance style)
      : theme.colors.error;

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }, style]}
      onPress={onPress}
      mode="elevated"
      elevation={1}
    >
      <Card.Content style={styles.content}>
        {/* Rank indicator (Binance style) */}
        <View
          style={[
            styles.rankIndicator,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            #{crypto.rank}
          </Text>
        </View>

        <View style={styles.leftContent}>
          <Text variant="titleMedium" style={styles.symbol}>
            {crypto.symbol}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {crypto.name}
          </Text>
        </View>

        <View style={styles.rightContent}>
          <Text variant="titleMedium" style={styles.price}>
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
              variant="labelMedium"
              style={[styles.priceChange, { color: priceChangeColor }]}
            >
              {crypto.percentChange24h >= 0 ? "+" : ""}
              {formatPercentage(crypto.percentChange24h)}
            </Text>
          </View>
        </View>

        {onFavoritePress && (
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            iconColor={
              isFavorite ? theme.colors.primary : theme.colors.onSurfaceVariant
            }
            size={20}
            onPress={onFavoritePress}
            style={styles.favoriteButton}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  rankIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  rightContent: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  symbol: {
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceChangeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priceChange: {
    fontWeight: "bold",
  },
  favoriteButton: {
    margin: 0,
    marginLeft: 4,
  },
});
