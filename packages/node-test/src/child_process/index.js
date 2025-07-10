var child_process = require("child_process");
const path = require("path");
const fs = require("fs");
process.title = "主进程";

const childPath = path.resolve(__dirname, "count.js");

//  用于启动一个子shell
child_process.exec(`node ${childPath}`, function (error, stdout, stderr) {
  if (error) {
    console.error("error: " + error);
    return;
  }
  console.log("stdout: " + stdout);
  console.log("stderr: " + stderr);
});

const ws = fs.createWriteStream("log.txt");
const logger = child_process.spawn("node", [path.resolve(__dirname, "count.js")], {
  stdio: ["ignore", "pipe", process.stderr],
});
logger.stdout.pipe(ws);

console.log(__filename);
console.log(__dirname);

// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
console.log(__dirname === path.dirname(__filename));
// console.log(process.cwd());
