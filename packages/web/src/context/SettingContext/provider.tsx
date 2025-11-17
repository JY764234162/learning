import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { SettingContext, SettingMode } from ".";

export const SettingContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SettingContext.Provider value={}>{children}</SettingContext.Provider>;
};
