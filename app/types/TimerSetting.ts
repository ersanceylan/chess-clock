type TimerSettings = {
  time: number;
  increment: number;
};

export function getTitle(timerSettings: TimerSettings): string {
  return (
    timerSettings.time / 60000 +
    " min" +
    " | " +
    timerSettings.increment / 1000 +
    " sec"
  );
}

export const presets: Record<string, TimerSettings> = {
  "90/30": { time: 90 * 60 * 1000, increment: 30 * 1000 }, // Classical: 90 minutes + 30 seconds increment
  "25/10": { time: 25 * 60 * 1000, increment: 10 * 1000 }, // Rapid: 25 minutes + 10 seconds increment
  "15/10": { time: 15 * 60 * 1000, increment: 10 * 1000 }, // Rapid: 15 minutes + 10 seconds increment
  "10/5": { time: 10 * 60 * 1000, increment: 5 * 1000 }, // Rapid: 10 minutes + 5 seconds increment
  "5/3": { time: 5 * 60 * 1000, increment: 3 * 1000 }, // Blitz: 5 minutes + 3 seconds increment
  "3/2": { time: 3 * 60 * 1000, increment: 2 * 1000 }, // Blitz: 3 minutes + 2 seconds increment
  "1/1": { time: 1 * 60 * 1000, increment: 1 * 1000 }, // Bullet: 1 minute + 1 second increment
  "3/0": { time: 3 * 60 * 1000, increment: 0 }, // Blitz: 3 minutes (no increment)
  "1/0": { time: 1 * 60 * 1000, increment: 0 }, // Bullet: 1 minute (no increment)
  "10/0": { time: 10 * 60 * 1000, increment: 0 }, // Rapid: 10 minutes (no increment)
};

export default TimerSettings;
