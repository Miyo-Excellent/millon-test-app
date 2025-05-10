import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AppWrapper } from "@/src/components/AppWrapper";
import { ThemeProvider, ThemeConsumer } from "@/src/components/ThemeProvider";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AppWrapper>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppWrapper>
  );
}

/**
 * AppContent component that is rendered inside the Redux Provider
 * This component uses the ThemeConsumer which requires Redux
 */
function AppContent() {
  return (
    <ThemeConsumer>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="detail"
          options={{ title: "Cryptocurrency Details" }}
        />
        <Stack.Screen name="search" options={{ title: "Search" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeConsumer>
  );
}
