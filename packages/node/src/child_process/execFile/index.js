var child_process = require("child_process");
const path = require("path");
process.title = "主进程";
console.log(process.versions);
console.log(process.platform, process.arch);
console.log(process.title + "的版本是：" + process.version);

// 启动一个子文件，可以是node文件，也可以是某个node路径（需要其他版本node时）
// child_process.execFile("node", function (error, stdout, stderr) {
//   if (error) {
//     console.error("error: " + error);
//     return;
//   }
//   console.log("stdout: \n" + stdout);
//   console.log("stderr: \n" + typeof stderr);
// });
