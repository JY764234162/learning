import { Button, Menu, Modal, MenuItemProps, Checkbox } from "antd";
import { useEffect, useMemo, useState } from "react";
import type { CheckboxProps, MenuProps } from "antd";
import styles from "./modalButton.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

export default function ModalButton() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const items: MenuItem[] = [
    { key: "1", label: "Option 1" },
    { key: "2", label: "Option 2" },
    { key: "3", label: "Option 3" },
  ];

  useEffect(() => {
    setActiveKey("1");
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          showModal();
        }}
      >
        弹窗
      </Button>
      <Modal
        title={<span>展示指标（自适应高度）</span>}
        className={styles["modalButton"]}
        width={800}
        open={open}
        destroyOnHidden
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ margin: 4, paddingLeft: 16 }}>一级标题</div>
            <Menu
              style={{ height: "100%" }}
              items={items}
              selectedKeys={[activeKey]}
              onSelect={({ key }) => {
                setActiveKey(key);
              }}
            ></Menu>
          </div>
          <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ margin: 4, paddingLeft: 16 }}>二级标题</div>
            <Two></Two>
          </span>
          <span style={{ flex: 2, display: "flex", flexDirection: "column" }}>
            <div style={{ margin: 4, paddingLeft: 16 }}>三级标题</div>
            <Two></Two>
          </span>
        </div>
      </Modal>
    </>
  );
}

const plainOptions = [
  "Apple",
  "Pear",
  "Orange",
  "Banana",
  "Kiwi",
  "Lemon",
  "Pineapple",
  "Mango",
  "Watermelon",
  "Grape",
  "Cherry",
  "Strawberry",
  "Peach",
  "Apricot",
];

const Two = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string>("");

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const items = useMemo(() => {
    return plainOptions.map((key) => {
      return {
        label: <Checkbox value={key}>{key}</Checkbox>,
        key,
      };
    });
  }, [checkedList]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <Checkbox.Group style={{ width: "100%", overflowY: "auto" }} value={checkedList} onChange={onChange}>
        <Menu
          items={items}
          style={{ width: "100%" }}
          selectedKeys={[activeKey]}
          onSelect={({ key }) => {
            setActiveKey(key);
          }}
        ></Menu>
      </Checkbox.Group>
      <span style={{ padding: "8px 20px", border: "1px solid rgba(5, 5, 5, 0.06)", borderLeft: "none" }}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
      </span>
    </div>
  );
};
