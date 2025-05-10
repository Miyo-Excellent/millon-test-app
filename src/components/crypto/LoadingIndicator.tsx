import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text variant="bodyLarge" style={styles.message}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginTop: 16,
    textAlign: "center",
  },
});
