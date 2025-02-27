import React from "react";
import Router from "./router";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}
