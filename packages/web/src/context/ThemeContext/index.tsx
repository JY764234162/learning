import { createContext } from "react";

export interface ThemeContextValue {
  themeMode: App.ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (themeMode: App.ThemeMode) => void;
  toggleThemeMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeMode: "light",
  isDarkMode: false,
  setThemeMode: () => {},
  toggleThemeMode: () => {},
});
