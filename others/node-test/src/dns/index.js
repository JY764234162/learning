var dns = require("dns");
const querystring = require("node:querystring");
dns.resolve4(
  "www.baidu.com",
  {
    all: true,
  },
  function (err, address) {
    if (err) throw err;
    console.log("例子A: " + address);
  }
);
