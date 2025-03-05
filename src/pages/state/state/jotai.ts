import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

// 定义类型
interface AsyncData {
  data: string | null;
  loading: boolean;
  error: string | null;
}

// 基本计数器原子
export const countAtom = atom<number>(0);

// 异步数据原子
export const asyncDataAtom = atom<AsyncData>({
  data: null,
  loading: false,
  error: null,
});

// 异步操作
export const fetchDataAtom = atom(
  (get) => get(asyncDataAtom),
  async (_get, set) => {
    set(asyncDataAtom, {
      data: null,
      loading: true,
      error: null,
    });

    try {
      // 模拟异步请求
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      const randomData = `异步数据 ${Math.floor(Math.random() * 1000)}`;

      set(asyncDataAtom, {
        data: randomData,
        loading: false,
        error: null,
      });
    } catch (error) {
      set(asyncDataAtom, {
        data: null,
        loading: false,
        error: "获取数据失败",
      });
    }
  }
);
