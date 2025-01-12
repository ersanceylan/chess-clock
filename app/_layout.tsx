import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { TimerProvider } from "./hooks/TimerContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import React from "react";
import { Colors } from "./constants/Colors";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    e1234: require("../assets/fonts/e1234.regular.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.default.background,
      }}
    >
      <StatusBar hidden />
      <TimerProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="settings" />
          <Stack.Screen name="custom" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </TimerProvider>
    </SafeAreaView>
  );
}
