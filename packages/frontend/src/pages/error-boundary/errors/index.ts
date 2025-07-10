// 基础自定义错误类
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // 修复 TypeScript 中继承 Error 的原型链问题
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 异步操作错误
export class AsyncOperationError extends CustomError {
  constructor(
    message: string,
    public readonly operationType: "fetch" | "timeout" | "parse" = "fetch"
  ) {
    super(message);
  }
}

// 表单验证错误
export class ValidationError extends CustomError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown
  ) {
    super(message);
  }
}

// 渲染错误
export class RenderError extends CustomError {
  constructor(
    message: string,
    public readonly componentName?: string
  ) {
    super(message);
  }
}

// 网络错误
export class NetworkError extends CustomError {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string
  ) {
    super(message);
  }
}
