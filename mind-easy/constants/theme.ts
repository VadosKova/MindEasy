export const Colors = {
  Light: {
    background: "#F5F5DC",
    card: "#FFFFFF",
    text: "#37474F",
  },
  Dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#ECECEC",
  },
};

export type ThemeType = keyof typeof Colors;