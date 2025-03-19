import { MemoryRouter } from "react-router-dom";
import Routes from "./routers";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function Router() {
  return (
    <MemoryRouter>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </MemoryRouter>
  );
}
