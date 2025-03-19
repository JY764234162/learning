import { BrowserRouter } from "react-router-dom";
import Routes from "./routers";
import { Suspense } from "react";
import Loading from "../components/Loading";

const env = import.meta.env.MODE;
export default function Router() {
  return (
    <BrowserRouter basename={env === "development" ? undefined : "/learning"}>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}
