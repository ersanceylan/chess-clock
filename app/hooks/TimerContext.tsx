import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import TimerSettings, { presets } from "../types/TimerSetting";

/**
 * TimerContext and TimerProvider
 * Provides timer settings and update functionality via React Context.
 */

type TimerContextType = {
  timeSettings: TimerSettings;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  presets: Record<string, TimerSettings>;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timeSettings, setTimeSettings] = useState<TimerSettings>(
    presets["15/10"]
    // { time: 12 * 1000, increment: 0 * 1000 }
  );

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setTimeSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  }, []);

  return (
    <TimerContext.Provider value={{ timeSettings, updateSettings, presets }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerSettings = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerSettings must be used within a TimerProvider");
  }
  return context;
};
