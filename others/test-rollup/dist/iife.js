var jianger = (function (jsxRuntime, lodash, react) {
  'use strict';

  var $schema = 123;
  var assets = {
  	$schema: $schema
  };

  var a = 1;
  console.log(a);
  console.log(assets.$schema);
  var f = lodash.debounce(function () {
    console.log("function");
  }, 100);
  //你好世界
  var App = function App() {
    react.useEffect(function () {
      console.log("123");
    }, []);
    return jsxRuntime.jsx("div", {
      children: "4561"
    });
  };
  var main = {
    f: f,
    App: App
  };

  return main;

})(jsxRuntime, lodash, react);
