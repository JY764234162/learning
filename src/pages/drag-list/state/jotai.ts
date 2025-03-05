import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

// 定义类型
export interface DropPosition {
  listId: string | null;
  index: number | null;
  position: "top" | "bottom" | null;
}

// 异步数据原子
export const dropPositionAtom = atom<DropPosition>({
  listId: null,
  index: null,
  position: null,
});
