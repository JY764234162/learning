import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: App.LayoutSetting = {
  //是否移动端
  isMobile: false,
  //是否折叠
  isCollapsed: false,
  //是否显示设置抽屉
  settingDrawerVisible: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    //设置是否移动端
    setIsMobile(state, { payload }: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
    //设置是否折叠
    setIsCollapsed(state, { payload }: PayloadAction<boolean>) {
      state.isCollapsed = payload;
    },
    //设置是否显示设置抽屉
    setSettingDrawerVisible(state, { payload }: PayloadAction<boolean>) {
      state.settingDrawerVisible = payload;
    },
  },
  selectors: {
    getIsMobile: (state) => state.isMobile,
    getIsCollapsed: (state) => state.isCollapsed,
    getSettingDrawerVisible: (state) => state.settingDrawerVisible,
    getLayoutSetting: (state) => state,
  },
});
