import React, { Component, ErrorInfo } from "react";
import { Alert, Button, Result } from "antd";
import {
  AsyncOperationError,
  ValidationError,
  RenderError,
  NetworkError,
} from "../errors";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 可以在这里将错误上报给错误监控服务
    console.error("Error caught by boundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private renderAsyncError(error: AsyncOperationError) {
    return (
      <Result
        status="warning"
        title="异步操作失败"
        subTitle={`${error.message} (${error.operationType})`}
        extra={
          <Button type="primary" onClick={this.handleReset}>
            重试
          </Button>
        }
      />
    );
  }

  private renderValidationError(error: ValidationError) {
    return (
      <Alert
        type="error"
        message={`表单验证错误${error.field ? `: ${error.field}` : ""}`}
        description={error.message}
        action={
          <Button size="small" danger onClick={this.handleReset}>
            重试
          </Button>
        }
      />
    );
  }

  private renderRenderError(error: RenderError) {
    return (
      <Result
        status="500"
        title={`组件渲染错误${
          error.componentName ? `: ${error.componentName}` : ""
        }`}
        subTitle={error.message}
        extra={
          <Button type="primary" danger onClick={this.handleReset}>
            重置组件
          </Button>
        }
      />
    );
  }

  private renderNetworkError(error: NetworkError) {
    return (
      <Result
        status="error"
        title={`网络请求失败 ${error.status ? `(${error.status})` : ""}`}
        subTitle={`${error.message}${error.code ? ` [${error.code}]` : ""}`}
        extra={[
          <Button key="retry" type="primary" onClick={this.handleReset}>
            重试
          </Button>,
          <Button key="report" onClick={() => console.log("报告问题", error)}>
            报告问题
          </Button>,
        ]}
      />
    );
  }

  private renderUnknownError(error: Error) {
    return (
      <Alert
        type="error"
        message="未知错误"
        description={error.message}
        action={
          <Button size="small" danger onClick={this.handleReset}>
            重试
          </Button>
        }
      />
    );
  }

  renderErrorUI() {
    const { error } = this.state;
    if (!error) return null;

    // 根据错误类型渲染不同的 UI
    if (error instanceof AsyncOperationError) {
      return this.renderAsyncError(error);
    }

    if (error instanceof ValidationError) {
      return this.renderValidationError(error);
    }

    if (error instanceof RenderError) {
      return this.renderRenderError(error);
    }

    if (error instanceof NetworkError) {
      return this.renderNetworkError(error);
    }

    return this.renderUnknownError(error);
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
