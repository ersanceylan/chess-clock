/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const DARK_COLOR = "#020301";
const DARK_VARIANT_COLOR = "#11181C";
const LIGHT_COLOR = "#f3f5f9";

const PRIMARY = "#008545";
const SECONDARY = "#D17818";
const TERTIARY = "#f96262";

export const BG_COLOR_ACTIVE = DARK_VARIANT_COLOR;
export const BG_COLOR_DEFAULT = LIGHT_COLOR;
export const TEXT_COLOR_DEFAULT = DARK_COLOR;
export const TEXT_COLOR_LIGHT = "#eee";
export const TEXT_COLOR_ACTIVE = PRIMARY;

export const SUCCESS_COLOR = PRIMARY;
export const WARNING_COLOR = SECONDARY;
export const ERROR_COLOR = TERTIARY;

export const Colors = {
  default: {
    lightColor: LIGHT_COLOR,
    darkColor: DARK_COLOR,
    success: SUCCESS_COLOR,
    warning: WARNING_COLOR,
    error: ERROR_COLOR,
    text: TEXT_COLOR_DEFAULT,
    textActive: TEXT_COLOR_ACTIVE,
    textLight: TEXT_COLOR_LIGHT,
    background: "#020301",
    tint: WARNING_COLOR,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    timerBackground: BG_COLOR_DEFAULT,
    timerBackgroundActive: BG_COLOR_ACTIVE,
  },
};

// light: {
//   text: "#11181C",
//   background: "#fff",
//   tint: tintColorLight,
//   icon: "#687076",
//   tabIconDefault: "#687076",
//   tabIconSelected: tintColorLight,
// },
// dark: {
//   text: "#ECEDEE",
//   background: "#151718",
//   tint: tintColorDark,
//   icon: "#9BA1A6",
//   tabIconDefault: "#9BA1A6",
//   tabIconSelected: tintColorDark,
// },
