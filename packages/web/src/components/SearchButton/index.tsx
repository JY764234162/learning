import { routesSlice } from "@/store/slice/route";
import { transformMenuToSearchMenus } from "@/store/slice/route/shared";
import { SearchOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Modal, Button, Tooltip, Empty, List } from "antd";
import { useMemo, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SearchOption {
  value: string;
  label: string;
  fullPath: string;
  route: any;
}

export function SearchButton() {
  const navigate = useNavigate();
  const allRoutes = useSelector(routesSlice.selectors.getAllRoute);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<any>(null);

  // 获取所有可搜索的菜单项
  const searchableMenus = useMemo(() => {
    return transformMenuToSearchMenus(allRoutes);
  }, [allRoutes]);

  // 搜索选项
  const options = useMemo(() => {
    if (!searchValue.trim()) {
      return [];
    }

    const keyword = searchValue.toLowerCase();
    const results: SearchOption[] = [];

    searchableMenus.forEach(({ route, fullPath }) => {
      const menuTitle = route.handle?.menuTitle || "";
      const keyWords = route.handle?.keyWords || [];
      
      // 搜索菜单标题
      const titleMatch = menuTitle.toLowerCase().includes(keyword);
      // 搜索关键词
      const keywordMatch = keyWords.some((kw: string) => 
        kw.toLowerCase().includes(keyword)
      );

      if (titleMatch || keywordMatch) {
        results.push({
          value: menuTitle,
          label: menuTitle,
          fullPath,
          route,
        });
      }
    });

    return results;
  }, [searchValue, searchableMenus]);

  // 处理选择
  const handleSelect = (value: string, option: any) => {
    const selectedOption = options.find((opt) => opt.value === value);
    if (selectedOption) {
      navigate(selectedOption.fullPath);
      setSearchValue("");
      setOpen(false);
      setSelectedIndex(0);
    }
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSelectedIndex(0);
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (options.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[selectedIndex]) {
        handleSelect(options[selectedIndex].value, options[selectedIndex]);
      }
    }
  };

  // 打开搜索框
  const handleOpen = () => {
    setOpen(true);
  };

  // 关闭搜索框
  const handleClose = () => {
    setOpen(false);
    setSearchValue("");
    setSelectedIndex(0);
  };

  // Modal 打开后自动聚焦输入框
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // ESC 关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  return (
    <>
      <Tooltip title="搜索菜单">
        <Button type="text" onClick={handleOpen} icon={<SearchOutlined />} />
      </Tooltip>

      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        width={600}
        destroyOnHidden
        closable={false}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div style={{ padding: "24px" }}>
          {/* 搜索输入框 */}
          <Input
            ref={inputRef}
            placeholder="请输入关键词搜索"
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            allowClear
            size="large"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              marginBottom: "16px",
              borderRadius: "8px",
            }}
          />

          {/* 搜索结果列表 */}
          <div style={{ minHeight: "300px", maxHeight: "400px", overflowY: "auto" }}>
            {searchValue.trim() && options.length === 0 ? (
              <Empty
                description="暂无数据"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: "60px" }}
              />
            ) : options.length > 0 ? (
              <List
                dataSource={options}
                renderItem={(item, index) => (
                  <List.Item
                    style={{
                      cursor: "pointer",
                      backgroundColor: index === selectedIndex ? "#f5f5f5" : "transparent",
                      borderRadius: "4px",
                      padding: "12px 16px",
                      marginBottom: "4px",
                    }}
                    onClick={() => handleSelect(item.value, item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {item.label}
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                description="请输入关键词搜索"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: "60px" }}
              />
            )}
          </div>

          {/* 底部操作提示 */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              fontSize: "12px",
              color: "#8c8c8c",
            }}
          >
            <span>
              <kbd style={{ padding: "2px 6px", background: "#f5f5f5", borderRadius: "3px" }}>
                Enter
              </kbd>{" "}
              确认
            </span>
            <span>
              <kbd style={{ padding: "2px 6px", background: "#f5f5f5", borderRadius: "3px" }}>
                <UpOutlined />
              </kbd>
              <kbd style={{ padding: "2px 6px", background: "#f5f5f5", borderRadius: "3px", marginLeft: "4px" }}>
                <DownOutlined />
              </kbd>{" "}
              切换
            </span>
            <span>
              <kbd style={{ padding: "2px 6px", background: "#f5f5f5", borderRadius: "3px" }}>
                ESC
              </kbd>{" "}
              关闭
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
}
