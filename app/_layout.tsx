import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "./constants/Colors";
import { TimerProvider } from "./hooks/TimerContext";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    e1234: require("../assets/fonts/e1234.regular.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: Colors.default.background,
      }}
    >
      <StatusBar style="dark" backgroundColor="#000" />
      <TimerProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="settings" />
          <Stack.Screen name="custom" options={{ presentation: "modal" }} />
        </Stack>
      </TimerProvider>
    </SafeAreaProvider>
  );
}
