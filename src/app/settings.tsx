import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import {
  List,
  Switch,
  Divider,
  Text,
  RadioButton,
  Button,
  Dialog,
  Portal,
  useTheme,
} from "react-native-paper";
import {
  StorageService,
  StorageKeys,
} from "@/src/services/storage/StorageService";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import {
  selectUseSystemTheme,
  selectDarkMode,
  setUseSystemTheme,
  setDarkMode,
} from "@/src/store/slices/themeSlice";

export default function SettingsScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Theme settings from Redux
  const useSystemTheme = useAppSelector(selectUseSystemTheme);
  const darkMode = useAppSelector(selectDarkMode);

  // Currency settings
  const [currencyDialogVisible, setCurrencyDialogVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Cache settings
  const [cacheDialogVisible, setCacheDialogVisible] = useState(false);

  // Handle theme toggle
  const handleSystemThemeToggle = (value: boolean) => {
    dispatch(setUseSystemTheme(value));
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  // Handle currency selection
  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setCurrencyDialogVisible(false);
    // This would typically update the app's currency preference via context or Redux
  };

  // Handle cache clearing
  const handleClearCache = async () => {
    try {
      // Clear cryptocurrency data cache
      await StorageService.removeData(StorageKeys.CRYPTOCURRENCIES);
      await StorageService.removeData(StorageKeys.GLOBAL_DATA);
      await StorageService.removeData(StorageKeys.MARKETS);

      // Clear last updated timestamps
      await StorageService.removeData(
        `${StorageKeys.LAST_UPDATED}_cryptocurrencies`,
      );
      await StorageService.removeData(`${StorageKeys.LAST_UPDATED}_globalData`);
      await StorageService.removeData(`${StorageKeys.LAST_UPDATED}_markets`);

      setCacheDialogVisible(false);
    } catch (error) {
      console.error("Error clearing cache:", error);
      // Show error message to user
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {/* Theme Settings */}
        <List.Section>
          <List.Subheader>Theme</List.Subheader>
          <List.Item
            title="Use System Theme"
            description="Automatically switch between light and dark themes based on system settings"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={(props) => (
              <Switch
                value={useSystemTheme}
                onValueChange={handleSystemThemeToggle}
              />
            )}
          />

          {!useSystemTheme && (
            <List.Item
              title="Dark Mode"
              description="Enable dark theme"
              left={(props) => <List.Icon {...props} icon="weather-night" />}
              right={(props) => (
                <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
              )}
            />
          )}
        </List.Section>

        <Divider />

        {/* Currency Settings */}
        <List.Section>
          <List.Subheader>Currency</List.Subheader>
          <List.Item
            title="Display Currency"
            description={`Show prices in ${selectedCurrency}`}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
            onPress={() => setCurrencyDialogVisible(true)}
          />
        </List.Section>

        <Divider />

        {/* Cache Settings */}
        <List.Section>
          <List.Subheader>Cache</List.Subheader>
          <List.Item
            title="Clear Cache"
            description="Delete all locally stored data"
            left={(props) => <List.Icon {...props} icon="cached" />}
            onPress={() => setCacheDialogVisible(true)}
          />
        </List.Section>

        {/* Currency Selection Dialog */}
        <Portal>
          <Dialog
            visible={currencyDialogVisible}
            onDismiss={() => setCurrencyDialogVisible(false)}
          >
            <Dialog.Title>Select Currency</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={handleCurrencySelect}
                value={selectedCurrency}
              >
                <RadioButton.Item label="US Dollar (USD)" value="USD" />
                <RadioButton.Item label="Euro (EUR)" value="EUR" />
                <RadioButton.Item label="British Pound (GBP)" value="GBP" />
                <RadioButton.Item label="Japanese Yen (JPY)" value="JPY" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setCurrencyDialogVisible(false)}>
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Clear Cache Confirmation Dialog */}
        <Portal>
          <Dialog
            visible={cacheDialogVisible}
            onDismiss={() => setCacheDialogVisible(false)}
          >
            <Dialog.Title>Clear Cache</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                This will delete all locally stored data. You will need to
                reload data from the server.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setCacheDialogVisible(false)}>
                Cancel
              </Button>
              <Button onPress={handleClearCache}>Clear</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Using theme.colors.background in the component instead of hardcoding
  },
});
