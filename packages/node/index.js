const path = require("node:path");

const pathName = path.resolve(__dirname, "src", "child_process", "index.js");

require(pathName);
