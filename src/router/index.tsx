import { BrowserRouter } from "react-router-dom";
import Routes from "./routers";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
