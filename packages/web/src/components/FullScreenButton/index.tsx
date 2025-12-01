import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useState } from "react";

export function FullScreenButton() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(false);
      document.exitFullscreen();
    } else {
      setIsFullScreen(true);
      document.body.requestFullscreen();
    }
  };

  return (
    <Tooltip title={"全屏"}>
      <Button type="text" onClick={toggleFullScreen} icon={isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}></Button>
    </Tooltip>
  );
}
