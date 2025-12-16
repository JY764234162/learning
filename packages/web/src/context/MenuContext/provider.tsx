import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { MenuContext } from ".";
import { routesSlice } from "@/store/slice/route";
import { transformToMenuItems, findFullPathByKey } from "@/store/slice/route/shared";
import { settingSlice } from "@/store/slice/setting";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { router } from "@/router/routers";

export const MenuContextProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
  const navigate = useNavigate();
  const settings = useSelector(settingSlice.selectors.getSettings);
  const isOnlyExpandCurrentParentMenu = settings.isOnlyExpandCurrentParentMenu;

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const allRoutes = useSelector(routesSlice.selectors.getAllRoute);


  const selectedKeys = useMemo(() => {
    return router.state.matches[router.state.matches.length - 1].pathname.split("/").filter(Boolean);
  }, [router.state.matches]);



  const items = useMemo(() => {
    return transformToMenuItems(allRoutes);
  }, [allRoutes]);

  const handleMenuClick = ({ key, keyPath }: { key: string; keyPath: string[] }) => {
    // 对于水平菜单的省略号菜单，keyPath 可能不完整
    // 需要从路由数据中查找完整路径
    const fullPath = findFullPathByKey(allRoutes, key);

    if (fullPath) {
      // 如果找到了完整路径，直接使用
      navigate(fullPath);
    } else {
      // 如果没找到，尝试使用 keyPath 构建路径
      // 过滤掉空字符串，并确保路径正确
      const validPath = keyPath.filter(Boolean).reverse();
      if (validPath.length > 0) {
        const path = "/" + validPath.join("/");
        navigate(path);
      } else {
        // 如果 keyPath 也为空，直接使用 key
        navigate(`/${key}`);
      }
    }
  };

  const onMenuOpenChange = useCallback(
    (openKeys: string[]) => {
      if (isOnlyExpandCurrentParentMenu) {
        setOpenKeys([openKeys[openKeys.length - 1]]);
      } else {
        setOpenKeys(openKeys);
      }
    },
    [isOnlyExpandCurrentParentMenu]
  );

  useUpdateEffect(() => {
    if (settings.layout.mode === "horizontal") {
      setOpenKeys([]);
    }
  }, [settings.layout.mode]);

  return (
    <MenuContext.Provider value={{ openKeys,selectedKeys, setOpenKeys, items, handleMenuClick, onMenuOpenChange }}>{children}</MenuContext.Provider>
  );
});
