import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Result, Space } from "antd";

const ErrorElement = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  const reFresh = () => {
    location.reload();
  };
  const goIndex = () => {
    navigate("/");
  };
  //动态导入失败
  const isDynamicallyImportError = error.message.includes("Failed to fetch dynamically imported module");
  // 动态导入失败
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isDynamicallyImportError ? (
        <Result
          status="warning"
          title="版本已更新,请刷新页面"
          extra={
            <Button type="primary" onClick={reFresh}>
              刷新
            </Button>
          }
        />
      ) : (
        <Result
          status="error"
          title="页面访问错误"
          subTitle={error.message}
          extra={
            <Button type="primary" onClick={goIndex}>
              返回首页
            </Button>
          }
        />
      )}
    </div>
  );
};

export default ErrorElement;
