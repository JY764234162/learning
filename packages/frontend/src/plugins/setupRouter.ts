import { router } from "@/router/routers";

export const setupRouter = async () => {
  await new Promise((resolve, reject) => {
    try {
      router.initialize();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
