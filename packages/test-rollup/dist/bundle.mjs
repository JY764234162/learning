import { jsx } from 'react/jsx-runtime';
import { debounce } from 'lodash';
import { useEffect } from 'react';

var $schema = 123;
var assets = {
	$schema: $schema
};

var a = 1;
console.log(a);
console.log(assets.$schema);
var f = debounce(function () {
  console.log("function");
}, 100);
//你好世界
var App = function App() {
  useEffect(function () {
    console.log("123");
  }, []);
  return jsx("div", {
    children: "4561"
  });
};
var main = {
  f: f,
  App: App
};

export { main as default };
//# sourceMappingURL=bundle.mjs.map
