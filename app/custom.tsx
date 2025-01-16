import { style } from "@/app/constants/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { router, Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTimerSettings } from "./hooks/TimerContext";
import TimerSettings from "./types/TimerSetting";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./constants/Colors";

const Custom: React.FC = () => {
  const { timeSettings, updateSettings } = useTimerSettings();

  const [customTime, setCustomTime] = useState<TimerSettings>(timeSettings);

  const onTimeChange = (time: number) => {
    setCustomTime((timeSettings) => ({
      ...timeSettings,
      time,
    }));
  };

  const onIncrementChange = (increment: number) => {
    setCustomTime((timeSettings) => ({
      ...timeSettings,
      increment,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        name="index"
        options={{
          presentation: "modal",
          headerShown: true,
          headerStyle: { backgroundColor: Colors.default.background },
          title: "",
          headerTintColor: Colors.default.text,
          headerBackVisible: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={Colors.default.text}
            />
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WheelPicker
            data={Array.from({ length: 120 }, (_, i) => ({
              value: i + 1,
              label: `${i + 1} min`,
            }))}
            value={timeSettings.time / 60000}
            onValueChanged={({ item: { value } }) =>
              onTimeChange(value * 60000)
            }
            style={{ flex: 1 }}
          />

          <Text
            style={{ marginHorizontal: 10, fontWeight: "bold", fontSize: 30 }}
          >
            |
          </Text>

          <WheelPicker
            data={Array.from({ length: 30 }, (_, i) => ({
              value: i,
              label: `${i} sec`,
            }))}
            value={timeSettings.increment / 1000}
            onValueChanged={({ item: { value } }) =>
              onIncrementChange(value * 1000)
            }
            style={{ flex: 1 }}
          />
        </View>

        <Pressable
          style={style.button}
          onPress={() => {
            updateSettings(customTime);
            router.back();
          }}
        >
          <MaterialCommunityIcons
            name="check"
            size={40}
            color={Colors.default.textLight}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Custom;
