import { settingSlice } from "@/store/slice/setting";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function SettingDrawerButton() {
  const [open, setOpen] = useState(false);

  const settings = useSelector(settingSlice.selectors.getSettings);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={showDrawer} icon={<SettingOutlined />}></Button>
      <Drawer title="设置" open={open} onClose={onClose}>
        <Form
          initialValues={{
            colourWeakness: settings.colourWeakness,
            grayscale: settings.grayscale,
            layoutMode: settings.layout.mode,
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
                console.log(e);
                dispatch(settingSlice.actions.changeLayoutMode(e.target.value));
              }}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
