import { createContext, FC, ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from ".";

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<App.ThemeMode>((localStorage.getItem("themeMode") as App.ThemeMode) || "light");
  const isDarkMode = themeMode === "dark";

  const changeThemeMode = (mode: App.ThemeMode) => {
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
