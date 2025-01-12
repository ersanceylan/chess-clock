import { style } from "@/app/constants/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { router, Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTimerSettings } from "./hooks/TimerContext";
import TimerSettings from "./types/TimerSetting";
import {
  BG_COLOR_ACTIVE,
  TEXT_COLOR_ACTIVE,
  TEXT_COLOR_DEFAULT,
  TEXT_COLOR_LIGHT,
  WARNING_COLOR,
} from "./constants/Timer";

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
    <>
      <Stack.Screen
        name="index"
        options={{
          presentation: "modal",
          headerShown: true,
          headerStyle: { backgroundColor: BG_COLOR_ACTIVE },
          title: "",
          headerTintColor: "#f3f5f9",
          headerBackVisible: true,
          headerBackButtonDisplayMode: "minimal",
          headerLeft: () => (
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={TEXT_COLOR_LIGHT}
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
            color={TEXT_COLOR_LIGHT}
          />
        </Pressable>
      </View>
    </>
  );
};

export default Custom;
