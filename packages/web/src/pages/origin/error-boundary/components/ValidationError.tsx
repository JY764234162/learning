import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { ValidationError } from "../errors";

interface FormValues {
  email: string;
  password: string;
}

const ValidationErrorDemo = () => {
  const [form] = Form.useForm<FormValues>();
  const [errorValue, setErrorValue] = useState<string | null>(null);

  // 在渲染过程中抛出错误
  useEffect(() => {
    if (errorValue !== null) {
      throw new ValidationError("密码长度不符合要求", "password", errorValue);
    }
  }, [errorValue]);

  const handleSubmit = (values: FormValues) => {
    if (values.password.length < 6) {
      setErrorValue(values.password);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入有效的邮箱地址" },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交（密码小于6位触发验证错误）
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ValidationErrorDemo;
