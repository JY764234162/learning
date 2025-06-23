import { debounce } from "lodash";
import React, { useEffect } from "react";
import assets from "./assets.json";
import "./main.css";
const a: number = 1;
console.log(a);
console.log(assets.$schema);
const f = debounce(() => {
  console.log("function");
}, 100);

//你好世界
const App: React.FC = () => {
  useEffect(() => {
    console.log("123");
  }, []);
  return <div>4561</div>;
};

export default { f, App };
