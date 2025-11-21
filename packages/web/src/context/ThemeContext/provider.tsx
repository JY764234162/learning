import { createContext, FC, ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from ".";
import { localStg } from "@/utils/storage";

export const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<App.ThemeMode>((localStg.get("themeMode") as App.ThemeMode) || "light");
  const isDarkMode = themeMode === "dark";

  const changeThemeMode = (mode: App.ThemeMode) => {
    setThemeMode(mode);
    localStg.set("themeMode", mode);
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
