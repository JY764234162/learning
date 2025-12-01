import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleAuxiliaryColorModes, toggleGrayscaleMode } from "./shared";
import { localStg } from "@/utils/storage";

const initialState: App.Setting = {
  //是否弱视
  colourWeakness: false,
  //是否灰度
  grayscale: false,
  //是否消息色跟随主色
  isInfoFollowPrimary: true,
  //是否只展开当前菜单父级
  isOnlyExpandCurrentParentMenu: true,
  //是否展示设置抽屉
  showSettingDrawer: false,
  //布局
  layout: {
    mode: "horizontal",
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

  //页面切换是否有动画以及动画类型
  page: {
    animate: true,
    animateMode: "fade",
  },
  //水印设置
  watermark: {
    text: "JY-Admin",
    visible: true,
  },
};

export const settingSlice = createSlice({
  name: "setting",
  initialState: localStg.get("settings") || initialState,
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
    //设置水印是否开启
    setWaterMarkIsVisible(state, { payload }: PayloadAction<boolean>) {
      state.watermark.visible = payload;
    },
    //设置水印文案
    setWaterMarkText(state, { payload }: PayloadAction<string>) {
      state.watermark.text = payload;
    },
    //设置跟随主题色
    setInfoFollowPrimary(state, { payload }: PayloadAction<boolean>) {
      state.isInfoFollowPrimary = payload;
    },

    //设置抽屉
    setSettingDrawerShow(state, { payload }: PayloadAction<boolean>) {
      state.showSettingDrawer = payload;
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
    getPrimaryColor: (state) => state.color.primary,
    getSettings: (state) => state,
  },
});
