import React from "react";

import microApp from "@micro-zoe/micro-app";

microApp.start();
export default function index() {
  return (
    <div>
      <micro-app name='my-app' url='http://localhost:5175/' iframe></micro-app>
    </div>
  );
}
