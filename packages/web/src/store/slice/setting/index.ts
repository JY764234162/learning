import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleAuxiliaryColorModes, toggleGrayscaleMode } from "./shared";

const initialState: App.Setting = {
  //是否弱视
  colourWeakness: false,
  //是否灰度
  grayscale: false,
  //是否消息色跟随主色
  isInfoFollowPrimary: true,
  //是否只展开当前菜单父级
  isOnlyExpandCurrentParentMenu: true,
  //布局
  layout: {
    mode: "vertical",
    reverseHorizontalMix: false,
    scrollMode: "content",
  },

  //颜色
  color: {
    primary: "#646cff",
    error: "#f5222d",
    info: "#2080f0",
    success: "#52c41a",
    warning: "#faad14",
  },
  // tokens: {
  //   dark: {
  //     colors: {
  //       "base-text": "rgb(224, 224, 224)",
  //       container: "rgb(28, 28, 28)",
  //       layout: "rgb(18, 18, 18)",
  //     },
  //   },
  //   light: {
  //     boxShadow: {
  //       header: "0 1px 2px rgb(0, 21, 41, 0.08)",
  //       sider: "2px 0 8px 0 rgb(29, 35, 41, 0.05)",
  //       tab: "0 1px 2px rgb(0, 21, 41, 0.08)",
  //     },
  //     colors: {
  //       "base-text": "rgb(31, 31, 31)",
  //       container: "rgb(255, 255, 255)",
  //       inverted: "rgb(0, 20, 40)",
  //       layout: "rgb(247, 250, 252)",
  //     },
  //   },
  // },
  //页面切换是否有动画以及动画类型
  page: {
    animate: true,
    animateMode: "fade",
  },
  //水印设置
  watermark: {
    text: "SoybeanAdmin",
    visible: false,
  },
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    //设置弱视
    setColourWeakness(state, { payload }: PayloadAction<boolean>) {
      toggleAuxiliaryColorModes(payload);
      state.colourWeakness = payload;
    },
    //设置灰度
    setGrayscale(state, { payload }: PayloadAction<boolean>) {
      toggleGrayscaleMode(payload);
      state.grayscale = payload;
    },
    //设置跟随主题色
    setInfoFollowPrimary(state, { payload }: PayloadAction<boolean>) {
      state.isInfoFollowPrimary = payload;
    },
    //设置布局模式
    changeLayoutMode(state, { payload }: PayloadAction<App.LayoutMode>) {
      state.layout.mode = payload;
    },
    //设置只展开当前父级
    changeOnlyExpandCurrentParentMenu(state, { payload }: PayloadAction<boolean>) {
      state.isOnlyExpandCurrentParentMenu = payload;
    },
    //修改主题色
    updateColor(state, { payload: { key, color } }: PayloadAction<{ key: keyof App.Setting["color"]; color: string }>) {
      state.color[key] = color;
    },

    resetSetting: () => {
      return initialState;
    },
  },
  selectors: {
    getColors: (state) => state.color,
    getSettings: (state) => state,
  },
});
