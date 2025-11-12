import { HashRouter, RouterProvider } from "react-router-dom";
import { router } from "./routers";
import Loading from "../components/Loading";
import { Suspense } from "react";
import { Alert } from "antd";

export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Alert.ErrorBoundary>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </Alert.ErrorBoundary>
    </Suspense>
  );
}
