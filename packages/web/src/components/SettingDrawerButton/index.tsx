import { settingSlice } from "@/store/slice/setting";
import { SettingOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Drawer, Form, Radio, Switch, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";

export function SettingButton() {
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(settingSlice.actions.setSettingDrawerShow(true));
  };

  return (
    <Tooltip title={"主题配置"}>
      <Button type="text" onClick={showDrawer} icon={<SettingOutlined />}></Button>
    </Tooltip>
  );
}

export const SettingDrawer = () => {
  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(settingSlice.actions.setSettingDrawerShow(false));
  };

  return (
    <Drawer title="设置" open={settings.showSettingDrawer} onClose={onClose}>
      <Form
        initialValues={{
          colourWeakness: settings.colourWeakness,
          grayscale: settings.grayscale,
          layoutMode: settings.layout.mode,
          primary: settings.color.primary,
        }}
      >
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
        <Form.Item label="是否水平布局" name={"layoutMode"}>
          <Radio.Group
            options={[
              { label: "水平布局", value: "horizontal" },
              { label: "垂直布局", value: "vertical" },
            ]}
            onChange={(e) => {
              dispatch(settingSlice.actions.changeLayoutMode(e.target.value));
            }}
          />
        </Form.Item>
        <Form.Item label="主题色" name={"primary"}>
          <ColorPicker
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
      </Form>
    </Drawer>
  );
};
