(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react/jsx-runtime'), require('lodash'), require('react')) :
  typeof define === 'function' && define.amd ? define(['react/jsx-runtime', 'lodash', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jiangyi = factory(global.jsxRuntime, global.lodash, global.react));
})(this, (function (jsxRuntime, lodash, react) { 'use strict';

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

}));
