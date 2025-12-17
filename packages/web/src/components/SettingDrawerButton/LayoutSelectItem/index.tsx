import { useDispatch, useSelector } from "react-redux";
import { layoutSlice } from "@/store/slice/layout";
import { settingSlice } from "@/store/slice/setting";
import { Tooltip } from "antd";

export const LayoutSelect = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const value = settings.layout.mode;
  const isMobile = useSelector(layoutSlice.selectors.getIsMobile);
  const dispatch = useDispatch();
  const onValueChange = (value: App.LayoutMode) => {
    if (isMobile && value === "horizontal") {
      return;
    }
    dispatch(settingSlice.actions.changeLayoutMode(value));
  };
  return (
    <div className="flex gap-4 justify-center">
      <Tooltip title="水平布局">
        <div
          onClick={() => onValueChange("horizontal")}
          className="w-25 h-18 flex flex-col  p-1.5 rounded-md cursor-pointer border-2 border-solid gap-1.5"
          style={{
            borderColor: value === "horizontal" ? "var(--ant-color-primary)" : "transparent",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            cursor: isMobile ? "not-allowed" : "pointer",
          }}
        >
          <div className="flex-1 bg-red-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary)" }}></div>
          <div className="flex-2 bg-blue-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary-border)" }}></div>
        </div>
      </Tooltip>
      <Tooltip title="垂直布局">
        <div
          onClick={() => onValueChange("vertical")}
          className="w-25 h-18 flex  p-1.5 rounded-md cursor-pointer border-2 border-solid gap-1.5"
          style={{
            borderColor: value === "vertical" ? "var(--ant-color-primary)" : "transparent",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <div className="flex-1  rounded-sm" style={{ backgroundColor: "var(--ant-color-primary)" }}></div>

          <div className="flex-3  rounded-sm flex flex-col gap-1.5">
            <div className="flex-1 bg-red-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary)" }}></div>
            <div className="flex-2 bg-blue-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary-border)" }}></div>
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
