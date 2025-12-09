import { settingSlice } from "@/store/slice/setting";
import { Form, theme } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LayoutSelectItem = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();
  const layoutMode = settings.layout.mode;
  const onChange = (value: App.LayoutMode) => {
    dispatch(settingSlice.actions.changeLayoutMode(value));
  };
  return (
    <Form.Item name={["layout", "mode"]}>
      <LayoutSelect value={layoutMode} onChange={onChange} />
    </Form.Item>
  );
};

interface LayoutSelectProps {
  value?: App.LayoutMode;
  onChange?: (value: App.LayoutMode) => void;
}

const LayoutSelect: FC<LayoutSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-4 justify-center">
      <div
        onClick={() => onChange?.("horizontal")}
        className="w-25 h-18 flex flex-col  p-1.5 rounded-md cursor-pointer border-2 border-solid gap-1.5"
        style={{
          borderColor: value === "horizontal" ? "var(--ant-color-primary)" : "transparent",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <div className="flex-1 bg-red-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary)" }}></div>
        <div className="flex-2 bg-blue-500 rounded-sm" style={{ backgroundColor: "var(--ant-color-primary-border)" }}></div>
      </div>
      <div
        onClick={() => onChange?.("vertical")}
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
    </div>
  );
};
