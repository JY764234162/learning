import { useNavigate } from "react-router-dom";
import { Button, Empty, Space } from "antd";

export const NotFound = () => {
  const navigate = useNavigate();

  const goIndex = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
      className="h-screen w-screen"
    >
      <div
        className="flex jc-c ai-c"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 200,
          height: 68,
        }}
      >
        {/* <Logo style={{ width: 168, height: 28 }} black /> */}
      </div>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ height: 60 }} description={<span>页面不存在或无权限</span>}>
        <Space>
          <a href="/" onClick={goIndex}>
            <Button type="primary">返回首页</Button>
          </a>
        </Space>
      </Empty>
    </div>
  );
};
