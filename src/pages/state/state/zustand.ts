import { create } from "zustand";

// 定义状态类型
interface CountState {
  count: number;
  loading: boolean;
  error: string | null;
  increment: () => Promise<void>;
  reset: () => void;
}

export const useCountStore = create<CountState>((set) => ({
  count: 0,
  loading: false,
  error: null,
  increment: async () => {
    try {
      set({ loading: true, error: null });
      // 模拟异步请求
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      set({ count: Math.random() * 100, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "未知错误",
      });
    }
  },
  reset: () => set({ count: 0, error: null }),
}));
