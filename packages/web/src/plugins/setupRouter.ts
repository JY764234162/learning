import { router } from "@/router/routers";
import { store } from "@/store";
import { initConstantRoute } from "@/store/slice/route";

export const setupRouter = async () => {
  await router.initialize();
  await store.dispatch(initConstantRoute());
};
