const fs = require("node:fs");
const minimist = require("minimist");
const path = require("node:path");

//解析命令行参数
// -a, --appContent 测试内容  -c, --content 测试内容
const argv = minimist(process.argv.slice(2), {
  default: {
    h: false,
    c: "hello world",
    a: "appContent",
  },
  alias: {
    c: "content",
    a: "appContent",
  },
  string: ["c", "a"],
});

const content = argv?.c || argv?.content;
const appContent = argv?.a || argv?.appContent;

//创建测试文件夹名称
const createDirName = "testDir";
const fileName = "test.txt";

//创建文件夹路径
const dirPath = path.resolve(__dirname, createDirName);
//创建文件路径
const filePath = path.resolve(dirPath, fileName);

//判断文件夹是否存在
try {
  fs.accessSync(dirPath, fs.constants.F_OK);
  console.log(`文件夹已存在`);
  //删除文件夹
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log("删除文件夹成功");
  } catch (err) {
    console.log("删除文件夹失败", err);
  }
} catch (err) {
  console.log(`文件夹不存在，开始创建`);
  //创建文件夹，如果存在则报错
} finally {
  try {
    fs.mkdirSync(dirPath);
    console.log(`创建${createDirName}成功`);
  } catch (err) {
    console.log(`创建${createDirName}失败`);
    console.log(err);
  }
}

try {
  fs.writeFileSync(filePath, content);
  console.log("写入成功");
} catch (err) {
  console.log("写入失败");
  console.log(err);
}

//读取文件，文件不存在则报错
try {
  const data = fs.readFileSync(filePath);
  console.log("读取成功,文件内容为：", data.toString());
} catch (err) {
  console.log("读取失败");
  console.log(err);
}

//追加写入文件,文件不存在则报错
try {
  fs.appendFileSync(filePath, "\n" + appContent);
  console.log("追加写入成功");
} catch (err) {
  console.log("追加写入失败");
  console.log(err);
}

//读取文件，文件不存在则报错
try {
  const data = fs.readFileSync(filePath);
  console.log("读取成功,文件内容为：", data.toString());
} catch (err) {
  console.log("读取失败");
  console.log(err);
}
