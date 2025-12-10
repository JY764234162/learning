import React, { useState } from "react";
import { Modal, Input } from "antd";

interface SourceEditorProps {
  visible: boolean;
  html: string;
  onSave: (html: string) => void;
  onCancel: () => void;
}

export const SourceEditor: React.FC<SourceEditorProps> = ({
  visible,
  html,
  onSave,
  onCancel,
}) => {
  const [source, setSource] = useState(html);

  React.useEffect(() => {
    if (visible) {
      setSource(html);
    }
  }, [visible, html]);

  const handleOk = () => {
    onSave(source);
  };

  return (
    <Modal
      title="源码编辑"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={800}
      okText="保存"
      cancelText="取消"
    >
      <Input.TextArea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        rows={20}
        style={{ fontFamily: "monospace", fontSize: "12px" }}
        placeholder="请输入 HTML 源码"
      />
    </Modal>
  );
};

