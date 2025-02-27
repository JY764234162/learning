import { count } from "console";
import { useStore, create } from "zustand";
import { persist } from "zustand/middleware";
interface CountStore {
  count: number;
  loading: boolean;
  increment: () => void;
}

export const useCountStore = create<CountStore>((set, get) => ({
  count: 0, // initial state
  loading: false,
  increment: async () => {
    const loading = get().loading;
    if (loading) return;
    const randomNumber = Math.random() * 5 * 1000;
    set({ loading: true });
    const number: number = await new Promise((resolve) =>
      setTimeout(() => resolve(randomNumber), randomNumber)
    );
    set({ count: number, loading: false });
  },
}));
