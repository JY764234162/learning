import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Button, Space, Select } from 'antd';
import { Node } from '@xyflow/react';

interface NodeEditorDrawerProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
  onSave: (nodeId: string, updatedData: any) => void;
}

export const NodeEditorDrawer: React.FC<NodeEditorDrawerProps> = ({
  open,
  node,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (node) {
      form.setFieldsValue({
        label: node.data.label || '',
        description: node.data.description || '',
        status: node.data.status || 'pending',
        notes: node.data.notes || '',
      });
    }
  }, [node, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (node) {
        onSave(node.id, values);
        onClose();
      }
    });
  };

  return (
    <Drawer
      title="编辑节点"
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        </Space>
      }
    >
      {node && (
        <Form form={form} layout="vertical">
          <Form.Item
            label="节点名称"
            name="label"
            rules={[{ required: true, message: '请输入节点名称' }]}
          >
            <Input placeholder="请输入节点名称" />
          </Form.Item>

          <Form.Item label="节点描述" name="description">
            <Input.TextArea
              rows={4}
              placeholder="请输入节点描述"
            />
          </Form.Item>

          <Form.Item label="状态" name="status">
            <Select>
              <Select.Option value="pending">待处理</Select.Option>
              <Select.Option value="processing">处理中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="failed">失败</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="备注" name="notes">
            <Input.TextArea
              rows={3}
              placeholder="请输入备注信息"
            />
          </Form.Item>

          <Form.Item label="节点类型">
            <Input value={String(node.data.nodeType ?? '')} disabled />
          </Form.Item>

          <Form.Item label="节点 ID">
            <Input value={node.id} disabled />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

