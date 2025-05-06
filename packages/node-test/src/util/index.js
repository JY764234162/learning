const util = require("node:util");

// 创建调试日志函数 需要修改环境变量 NODE_DEBUG=dev 来启用调试日志
const devLog = util.debuglog("dev");

devLog("你好");

const fn = () => {
  console.log("fn");
};

// 废弃函数警告
const deprecateFn = util.deprecate(fn, "该函数已作废");
fn();
//执行时会弹出警告，已弃用警告
deprecateFn();
