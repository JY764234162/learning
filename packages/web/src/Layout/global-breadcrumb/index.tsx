import { Layout as AntdLayout, BreadcrumbItemProps, BreadcrumbProps, Flex } from "antd";
import { cloneElement, memo, useContext, useMemo } from "react";
import { Breadcrumb } from "antd";
import { MenuContext } from "@/context/MenuContext";
import { ItemType, MenuItemType } from "antd/lib/menu/interface";
import { getTreeItemByProperty } from "@/utils/tree";

export const GlobalBreadcrumb = memo(() => {
  const { items, selectedKeys, handleMenuClick } = useContext(MenuContext);

  const breadcrumb: { icon: React.ReactNode; label: string; children: { icon: React.ReactNode; label: string; key: string }[] }[] =
    useMemo(() => {
      return selectedKeys.map((key) => getTreeItemByProperty(items, "key", key));
    }, [selectedKeys]);

  const breadcrumbItems: BreadcrumbProps["items"] = breadcrumb.map((item, index) => {
    return {
      title: (
        <>
          <span>{item?.icon}</span>
          <span className="ml-1">{item?.label}</span>
        </>
      ),
      ...("children" in item &&
        item.children && {
          menu: {
            items: item.children.filter(Boolean) as MenuItemType[],
            onClick: handleMenuClick,
            selectedKeys: selectedKeys,
          },
        }),
    };
  });
  return <Breadcrumb items={breadcrumbItems}></Breadcrumb>;
});
