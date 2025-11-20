import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import Loading from "../components/Loading";
import { Suspense } from "react";
export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </Suspense>
  );
}
