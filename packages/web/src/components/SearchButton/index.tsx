import { routesSlice } from "@/store/slice/route";
import { transformToMenuItems } from "@/store/slice/route/shared";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export function SearchButton() {
  const allRoutes = useSelector(routesSlice.selectors.getAllRoute);

  const items = useMemo(() => {
    return transformToMenuItems(allRoutes);
  }, [allRoutes]);

  const onSearch = () => {};
  return (
    <Tooltip title={"搜索"}>
      <Button type="text" onClick={onSearch} icon={<SearchOutlined />}></Button>
    </Tooltip>
  );
}
