import { Pressable, useWindowDimensions, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { router } from "expo-router";
import Animated, {
  PinwheelIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../constants/Colors";

const ICON_SIZE = 60;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SettingsBar: React.FC<{
  start: () => void;
  stop: () => void;
  restart: () => void;
  isRunning: boolean;
  turn?: "w" | "b";
}> = ({ start, stop, restart, isRunning, turn }) => {
  const { width } = useWindowDimensions();

  const timerRotation = useSharedValue(0);

  useEffect(() => {
    if (turn === "w") {
      timerRotation.value = withTiming(0, { duration: 300 });
    }

    if (turn === "b") {
      timerRotation.value = withTiming(180, { duration: 300 });
    }
  }, [turn, isRunning]);

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${timerRotation.value}deg` }],
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 0,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        // borderWidth: 1,
        // borderColor: "yellow",
      }}
    >
      {isRunning && (
        <AnimatedPressable
          entering={PinwheelIn.duration(30)}
          style={rotationStyle}
          onPress={stop}
        >
          <MaterialCommunityIcons
            name={"timer-sand-complete"}
            size={ICON_SIZE}
            color={Colors.default.lightColor}
          />
        </AnimatedPressable>
      )}
      {!isRunning && (
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "red",
          }}
        >
          <Pressable onPress={restart}>
            <MaterialCommunityIcons
              name="restart"
              size={ICON_SIZE}
              color={Colors.default.tint}
            />
          </Pressable>

          <Pressable onPress={start}>
            <MaterialCommunityIcons
              name="timer-sand-paused"
              size={ICON_SIZE}
              color={Colors.default.tint}
            />
          </Pressable>

          <Pressable onPress={() => router.push("/settings")}>
            <MaterialCommunityIcons
              name="timer-cog-outline"
              size={ICON_SIZE}
              color={Colors.default.tint}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};
