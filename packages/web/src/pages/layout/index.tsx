import React from "react";
import { useOutlet } from "react-router-dom";

export default function Menu() {
  const outlet = useOutlet();
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-40 flex justify-center items-center">header</div>
      <div className=" flex-1 flex ">
        <div className="h-full w-20 justify-center items-center">left</div>
        <div className="flex-1 flex justify-center items-center">{outlet}</div>
      </div>
    </div>
  );
}
