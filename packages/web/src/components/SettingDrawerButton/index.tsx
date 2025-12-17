import { layoutSlice } from "@/store/slice/layout";
import { initialSetting, settingSlice } from "@/store/slice/setting";
import { MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Divider, Drawer, Form, Input, Radio, Segmented, Switch, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LayoutSelect } from "./LayoutSelectItem";

const swatches: { color: string; name: string }[] = [
  { color: "#3b82f6", name: "海洋蓝" },
  { color: "#6366f1", name: "紫罗兰" },
  { color: "#8b5cf6", name: "梦幻紫" },
  { color: "#a855f7", name: "迷人紫" },
  { color: "#0ea5e9", name: "清澈海洋" },
  { color: "#06b6d4", name: "天空蓝" },
  { color: "#f43f5e", name: "樱桃红" },
  { color: "#ef4444", name: "火焰红" },
  { color: "#ec4899", name: "玫瑰粉" },
  { color: "#d946ef", name: "紫色魅影" },
  { color: "#f97316", name: "橙色阳光" },
  { color: "#f59e0b", name: "金色晨曦" },
  { color: "#eab308", name: "柠檬黄" },
  { color: "#84cc16", name: "草地绿" },
  { color: "#22c55e", name: "清新绿" },
  { color: "#10b981", name: "热带绿" },
];

export function SettingButton() {
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(layoutSlice.actions.setSettingDrawerVisible(true));
  };

  return (
    <Tooltip title={"主题配置"}>
      <Button type="text" onClick={showDrawer} icon={<SettingOutlined />}></Button>
    </Tooltip>
  );
}

export const SettingDrawer = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const isMobile = useSelector(layoutSlice.selectors.getIsMobile);
  const dispatch = useDispatch();
  const layoutSetting = useSelector(layoutSlice.selectors.getLayoutSetting);
  const [form] = Form.useForm();
  const onClose = () => {
    dispatch(layoutSlice.actions.setSettingDrawerVisible(false));
  };
  const resetSettings = () => {
    dispatch(settingSlice.actions.resetSetting());
    form.setFieldsValue(initialSetting);
    return false;
  };

  return (
    <Drawer
      width={isMobile ? 250 : undefined}
      title="设置"
      open={layoutSetting.settingDrawerVisible}
      onClose={onClose}
      styles={{ body: { padding: "8px 24px" } }}
      extra={
        <Button type="primary" onClick={resetSettings}>
          重置样式
        </Button>
      }
    >
      <Form initialValues={settings} form={form}>
        <Divider>主题模式</Divider>

        <Form.Item name={["themeMode"]}>
          <Segmented
            block
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            onChange={(value) => {
              dispatch(settingSlice.actions.setThemeMode(value as App.ThemeMode));
            }}
          />
        </Form.Item>
        <Divider>布局</Divider>
        <LayoutSelect />

        <Divider>颜色</Divider>
        <Form.Item label="主题色" name={["color", "primary"]}>
          <ColorPicker
            presets={[
              {
                label: "推荐色",
                colors: swatches.map((item) => item.color),
              },
            ]}
            onChange={(value) => {
              dispatch(
                settingSlice.actions.updateColor({
                  key: "primary",
                  color: value.toHexString(),
                })
              );
            }}
          />
        </Form.Item>
        <Form.Item label="是否灰度" name={"colourWeakness"}>
          <Switch
            onChange={(value) => {
              dispatch(settingSlice.actions.setColourWeakness(value));
            }}
          />
        </Form.Item>
        <Form.Item label="是否色盲" name={"grayscale"}>
          <Switch
            onChange={(value) => {
              dispatch(settingSlice.actions.setGrayscale(value));
            }}
          />
        </Form.Item>
        <Form.Item label="是否只展示当前父级菜单" name={"isOnlyExpandCurrentParentMenu"}>
          <Switch
            onChange={(value) => {
              dispatch(settingSlice.actions.changeOnlyExpandCurrentParentMenu(value));
            }}
          />
        </Form.Item>

        <Form.Item label="是否开启水印" name={["watermark", "visible"]}>
          <Switch
            onChange={(value) => {
              dispatch(settingSlice.actions.setWaterMarkIsVisible(value));
            }}
          />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.watermark.visible !== curValues.watermark.visible}>
          {({ getFieldValue }) => {
            const watermarkIsVisible = getFieldValue(["watermark", "visible"]);
            if (!watermarkIsVisible) return null;
            return (
              <Form.Item name={["watermark", "text"]} label={"水印文案"}>
                <Input
                  placeholder="请输入水印文案"
                  onChange={(e) => {
                    dispatch(settingSlice.actions.setWaterMarkText(e.target.value));
                  }}
                />
              </Form.Item>
            );
          }}
        </Form.Item>
      </Form>
    </Drawer>
  );
};
