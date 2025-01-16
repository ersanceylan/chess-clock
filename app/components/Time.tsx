import { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { MIN, SEC } from "../constants/Timer";
import { convertToTimeObject } from "../hooks/countdown";
import { useTimerSettings } from "../hooks/TimerContext";
import { Colors } from "../constants/Colors";

const TIMER_FONT_SIZE = 60;

export const Time: React.FC<{ timeLeft: number; isRunning?: boolean }> = ({
  timeLeft,
  isRunning,
}) => {
  const { timeSettings } = useTimerSettings();

  const timeObj = useMemo(() => convertToTimeObject(timeLeft), [timeLeft]);

  const dangerProgress = useSharedValue(10 * SEC);
  const opacityProgress = useSharedValue(1);

  useEffect(() => {
    if (!isRunning) {
      dangerProgress.value = 10 * SEC;
      return;
    }

    opacityProgress.value = withRepeat(
      withTiming(0.1, { duration: 1000 }),
      -1,
      false
    );

    if (timeLeft < 10 * SEC && dangerProgress.value === 10 * SEC) {
      dangerProgress.value = withRepeat(
        withTiming(0, { duration: timeLeft }),
        -1,
        false
      );
    }

    return () => {
      opacityProgress.value = 1;
      dangerProgress.value = timeLeft;
    };
  }, [timeLeft, isRunning]);

  const blinkStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityProgress.value,
    };
  }, [timeLeft, isRunning]);

  const runningColorStyle = useAnimatedStyle(() => {
    let color = Colors.default.text;

    if (isRunning) {
      color =
        dangerProgress.value < 10 * SEC
          ? interpolateColor(
              dangerProgress.value,
              [-1, 5 * SEC, 10 * SEC],
              [
                Colors.default.error,
                Colors.default.warning,
                Colors.default.success,
              ],
              "RGB"
            )
          : Colors.default.success;
    }

    return {
      color,
    };
  }, [timeLeft, isRunning]);

  if (timeLeft > MIN * 60) {
    return (
      <Text
        style={{
          fontSize: 80,
          fontFamily: "e1234",
          width: "100%",
          textAlign: "center",
          color: isRunning ? Colors.default.textActive : Colors.default.text,
        }}
      >
        {timeObj.h}:{timeObj.m}
      </Text>
    );
  }

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: "100%",
          backgroundColor: isRunning
            ? Colors.default.timerBackgroundActive
            : Colors.default.timerBackground,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <View style={style.timerBackground}>
        <Text
          style={[
            style.timerText,
            {
              color: isRunning
                ? `${Colors.default.textActive}11`
                : `${Colors.default.text}11`,
            },
          ]}
        >
          88:88
        </Text>
      </View>
      <View style={style.timerForeground}>
        <Animated.Text style={[style.timerText, runningColorStyle]}>
          {timeObj.m}
        </Animated.Text>
        <Animated.Text style={[style.timerText, runningColorStyle, blinkStyle]}>
          :
        </Animated.Text>
        <Animated.Text style={[style.timerText, runningColorStyle]}>
          {timeObj.s}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  timerBackground: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 0,
  },
  timerForeground: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  timerText: {
    fontSize: TIMER_FONT_SIZE,
    fontFamily: "e1234",
    textAlign: "center",
    color: Colors.default.text,
  },
});
