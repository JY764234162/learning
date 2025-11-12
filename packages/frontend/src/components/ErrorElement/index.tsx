import { useNavigate, useRouteError } from "react-router-dom";
import { Alert, Button, Empty, Space } from "antd";

const ErrorElement = () => {
  const error = useRouteError() as Error;

  const reFresh = () => {
    location.reload();
  };

  //    动态导入失败
  if (error.message.includes("Failed to fetch dynamically imported module"))
    return (
      <div
        id="error-page"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <Alert
          message="版本已更新"
          description="版本已更新请刷新页面"
          type="warning"
          action={
            <Button size="small" type="primary" onClick={reFresh}>
              刷新
            </Button>
          }
        />
      </div>
    );
};

export default ErrorElement;
