var child_process = require("child_process");
const path = require("path");
process.title = "主进程";

const childPath = path.resolve(__dirname, "count.js");

// 用于启动一个子shell
child_process.exec(`node ${childPath}`, function (error, stdout, stderr) {
  if (error) {
    console.error("error: " + error);
    return;
  }
  console.log("stdout: " + stdout);
  console.log("stderr: " + stderr);
});
