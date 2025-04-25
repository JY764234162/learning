const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve(__dirname, "1.txt");

//查看文件状态，传入文件路径和回调函数，回调函数有两个参数：第一个错误，第二个文件状态对象
fs.stat(filePath, (err, stat) => {
  console.log(stat);
});
