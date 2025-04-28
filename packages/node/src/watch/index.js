const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve(__dirname, "1.txt");

//监听文件变化，传入文件路径和回调函数，回调函数有两个参数：当前状态和上一个状态
fs.watchFile(filePath, (currentState, {}, prevState) => {
  console.log("当前文件状态：", currentState);
  console.log("之前文件状态", prevState);
});

console.log(`文件监听中... 以下文件正在被监听`);
console.log(`${filePath}`);
