import { style } from "@/app/constants/style";
import { Audio } from "expo-av";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SettingsBar } from "./components/SettingsBar";
import { Time } from "./components/Time";
import { useCountdown } from "./hooks/countdown";
import { useTimerSettings } from "./hooks/TimerContext";
import { channelSwitchSound } from "./constants/Timer";
import { Colors } from "./constants/Colors";

export default function Index() {
  const { timeSettings } = useTimerSettings();

  const whitePlayer = useCountdown();
  const blackPlayer = useCountdown();

  const [whiteMoves, setWhiteMoves] = useState(0);
  const [blackMoves, setBlackMoves] = useState(0);

  const [turn, setTurn] = useState<"w" | "b">();

  const isRunning = whitePlayer.isRunning || blackPlayer.isRunning;

  const start = useCallback(() => {
    if (isRunning) return;

    if (turn === "w") {
      whitePlayer.start();

      if (blackPlayer.isRunning) blackPlayer.stop();
    }

    if (turn === "b") {
      blackPlayer.start();

      if (whitePlayer.isRunning) whitePlayer.stop();
    }
  }, [isRunning]);

  const restart = useCallback(() => {
    whitePlayer.reset();
    blackPlayer.reset();
    setWhiteMoves(0);
    setBlackMoves(0);
    setTurn(undefined);
  }, [isRunning]);

  const stop = useCallback(() => {
    // console.log("pause");
    if (whitePlayer.isRunning) whitePlayer.stop();
    if (blackPlayer.isRunning) blackPlayer.stop();
  }, [isRunning, turn]);

  const stopWhite = useCallback(() => {
    // console.log("stop black");
    if (whitePlayer.isRunning) {
      whitePlayer.stop();
      setWhiteMoves((prev) => prev + 1);
    }

    setTurn("b");
    blackPlayer.resume();
  }, [whitePlayer, blackPlayer]);

  const stopBlack = useCallback(() => {
    // console.log("stop black");
    if (blackPlayer.isRunning) {
      blackPlayer.stop();
      setBlackMoves((prev) => prev + 1);
    }

    setTurn("w");
    whitePlayer.resume();
  }, [whitePlayer, blackPlayer]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(channelSwitchSound);

    await sound.playAsync();
  }

  useEffect(() => {
    if (!isRunning) return;
    playSound();
  }, [turn]);

  return (
    <View style={style.container}>
      <View style={timerStyle.container}>
        <Pressable
          disabled={
            (blackPlayer.isRunning && turn !== "w") ||
            whitePlayer.timeLeft === 0
          }
          onPress={stopWhite}
          style={[
            timerStyle.timerPlayer,
            turn === "w" && timerStyle.activePlayer,
            { transform: [{ rotate: "180deg" }] },
          ]}
        >
          <Time
            isRunning={whitePlayer.isRunning}
            timeLeft={whitePlayer.timeLeft}
          />
          <MoveCount moves={whiteMoves} />
        </Pressable>

        <SettingsBar
          start={start}
          stop={stop}
          restart={restart}
          isRunning={isRunning}
          turn={turn}
        />

        <Pressable
          disabled={
            (whitePlayer.isRunning && turn !== "b") ||
            blackPlayer.timeLeft === 0
          }
          onPress={stopBlack}
          style={[
            timerStyle.timerPlayer,
            turn === "b" && timerStyle.activePlayer,
          ]}
        >
          <Time
            isRunning={blackPlayer.isRunning}
            timeLeft={blackPlayer.timeLeft}
          />
          <MoveCount moves={blackMoves} />
        </Pressable>
      </View>
    </View>
  );
}

const MoveCount: React.FC<{ moves: number }> = ({ moves }) => {
  if (moves === 0) return null;
  return (
    <Text
      style={{
        fontSize: 15,
        opacity: 0.5,
        position: "absolute",
        bottom: 10,
      }}
    >
      moves: {moves}
    </Text>
  );
};

const timerStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.default.background,
  },
  timerPlayer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  activePlayer: {
    backgroundColor: Colors.default.timerBackgroundActive,
  },
});
