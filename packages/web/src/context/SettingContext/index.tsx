import { createContext } from "react";

export interface SettingContextValue {
  layoutMode: App.LayoutMode;
  setLayoutMode: (layoutMode: App.LayoutMode) => void;
}

export const SettingContext = createContext<SettingContextValue>({
  layoutMode: "vertical",
  setLayoutMode: () => {},
});
