declare namespace App {
  type LayoutMode = "vertical" | "horizontal";
  type ThemeMode = "light" | "dark";
  interface Setting {
    layout: {
      mode: LayoutMode;
      reverseHorizontalMix: boolean;
      scrollMode: "content" | "wrapper";
    };
    showSettingDrawer: boolean;
    colourWeakness: boolean;
    grayscale: boolean;
    isInfoFollowPrimary: boolean;
    isOnlyExpandCurrentParentMenu: boolean;
    color: {
      primary: string;
      error: string;
      info: string;
      success: string;
      warning: string;
    };
    page: {
      animate: boolean;
      animateMode: "fade" | "fade-bottom" | "fade-scale" | "fade-slide" | "none" | "zoom-fade" | "zoom-out";
    };
    watermark: {
      text: string;
      visible: boolean;
    };
  }
}
