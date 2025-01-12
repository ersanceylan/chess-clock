import { useState, useRef, useCallback, useEffect } from "react";
import { useTimerSettings } from "./TimerContext";

export type Countdown = {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  resume: () => void;
};

/**
 * useCountdown Hook
 * A countdown timer for one player that can be started, stopped, and continued.
 *
 * @param {number} initialTime - The initial countdown time in seconds.
 * @returns {object} - An object containing the current time, start, stop, and continue functions.
 */
export const useCountdown = (): Countdown => {
  const { timeSettings } = useTimerSettings();

  const [timeLeft, setTimeLeft] = useState<number>(timeSettings.time);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (isRunning || timeLeft <= 0) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  }, [isRunning, timeLeft]);

  const stop = useCallback(() => {
    if (!isRunning) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);

    setTimeLeft((prevTime) => prevTime + timeSettings.increment);
  }, [isRunning]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(timeSettings.time);
    setIsRunning(false);
  }, [timeSettings.time]);

  const resume = useCallback(() => {
    if (isRunning || timeLeft <= 0) return;
    start();
  }, [isRunning, timeLeft, start]);

  return {
    timeLeft,
    isRunning,
    start,
    stop,
    reset,
    resume,
  };
};

// Usage example:
// const { timeLeft, start, stop, reset, resume } = useCountdown(300);

/**
 * Converts time in milliseconds to a time object.
 *
 * @param {number} ms - Time in milliseconds.
 * @returns {object} - Time object with hours, minutes, seconds, and milliseconds.
 */
export const convertToTimeObject = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
    .toString()
    .padStart(1, "0");
  const minutes = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (ms % 1000).toString().padStart(3, "0");

  return {
    h: hours,
    m: minutes,
    s: seconds,
    ms: milliseconds,
  };
};
