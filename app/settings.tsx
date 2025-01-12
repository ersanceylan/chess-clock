import { style } from "@/app/constants/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTimerSettings } from "./hooks/TimerContext";
import { getTitle } from "./types/TimerSetting";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { Colors } from "./constants/Colors";
import { StatusBar } from "expo-status-bar";

const Settings: React.FC = () => {
  const { timeSettings, updateSettings, presets } = useTimerSettings();

  const title = useMemo(() => {
    return getTitle(timeSettings);
  }, [timeSettings]);

  return (
    <>
      <StatusBar style="auto" translucent={false} />
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.default.background },
          title: title,
          headerTintColor: Colors.default.tint,
          headerBackVisible: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={Colors.default.tint}
            />
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: Colors.default.background,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            flex: 1,
          }}
          contentContainerStyle={{
            marginBottom: 50,
            paddingBottom: 50,
          }}
        >
          {Object.values(presets)
            .sort((a, b) => a.time - b.time)
            .map((preset, index) => {
              const selected =
                timeSettings.time === preset.time &&
                timeSettings.increment === preset.increment;
              return (
                <Pressable
                  key={`preset-${index}`}
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: selected
                      ? Colors.default.tint
                      : Colors.default.lightColor,
                    marginVertical: 6,
                  }}
                  onPress={() => updateSettings(preset)}
                >
                  <Animated.Text
                    entering={SlideInLeft.delay(index * 50)}
                    style={{
                      color: selected
                        ? Colors.default.textLight
                        : Colors.default.text,
                    }}
                  >
                    {getTitle(preset)}
                  </Animated.Text>
                </Pressable>
              );
            })}
          <Pressable
            key={`preset-custom`}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: Colors.default.lightColor,
              marginVertical: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/custom")}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="clock-edit"
                size={20}
                color={Colors.default.text}
              />
              <Text style={{ color: Colors.default.text, marginLeft: 10 }}>
                Custom
              </Text>
            </View>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color={Colors.default.text}
            />
          </Pressable>
        </ScrollView>

        <Pressable style={style.button} onPress={() => router.replace("/")}>
          <MaterialCommunityIcons
            name="check"
            size={60}
            color={Colors.default.lightColor}
          />
        </Pressable>
      </View>
    </>
  );
};

export default Settings;
