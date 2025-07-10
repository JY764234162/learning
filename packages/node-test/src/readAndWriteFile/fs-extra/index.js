const fsExtra = require("fs-extra");
const path = require("path");

const f = async () => {
  try {
    await fsExtra.copy(path.resolve(__dirname, "test copy"), path.resolve(__dirname, "test"), {
      overwrite: true,
    });
    // await fsExtra.ensureDir(path.resolve(__dirname, "test"));
    // await fsExtra.ensureFile(path.resolve(__dirname, "test", "1.txt"));
    // await fsExtra.writeFile(path.resolve(__dirname, "test", "1.txt"), "Hello");

    // await fsExtra.remove(path.resolve(__dirname, "1.txt"));
  } catch (err) {
    console.log(err);
  }
};

f();
