// 递归获取tree的某个节点
export const getTreeItemByProperty = (tree: any[], property: string, value: any) => {
  for (const item of tree) {
    if (item[property] === value) {
      return item;
    }
    if (item.children) {
      const result: any = getTreeItemByProperty(item.children, property, value);
      if (result) return result;
    }
  }
  return null;
};


