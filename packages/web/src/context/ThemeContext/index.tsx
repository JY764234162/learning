import { createContext, FC, ReactNode, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeMode: "light",
  isDarkMode: false,
  setThemeMode: () => {},
  toggleThemeMode: () => {},
});

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>((localStorage.getItem("themeMode") as ThemeMode) || "light");
  const isDarkMode = themeMode === "dark";

  const changeThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
  };
  const toggleThemeMode = () => {
    const mode = isDarkMode ? "light" : "dark";
    console.log(isDarkMode);
    changeThemeMode(mode);
  };

  useEffect(() => {
    const htmlElementClassList = document.documentElement.classList;

    if (isDarkMode) {
      htmlElementClassList.add("dark");
    } else {
      htmlElementClassList.remove("dark");
    }
  }, [isDarkMode]);

  
  return (
    <ThemeContext.Provider value={{ themeMode, isDarkMode, setThemeMode: changeThemeMode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
