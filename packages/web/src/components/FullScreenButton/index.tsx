import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useFullscreen } from "ahooks";
import { Button, Tooltip } from "antd";

export function FullScreenButton() {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

  return (
    <Tooltip title={"全屏"}>
      <Button type="text" onClick={toggleFullscreen} icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}></Button>
    </Tooltip>
  );
}
