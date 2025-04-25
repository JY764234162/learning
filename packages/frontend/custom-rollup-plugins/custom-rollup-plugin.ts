// @filename: rollup-plugin-my-example.js
export default function myExample() {
  return {
    name: "my-example", // this name will show up in logs and errors
    resolveId(source) {
      console.log("source", source);
      if (source === "virtual-module") {
        // this signals that Rollup should not ask other plugins or check
        // the file system to find this id
        return source;
      }
      return null; // other ids should be handled as usually
    },
    buildStart(...args) {
      console.log("buildStart", args);
    },

    buildEnd(...args) {
      console.log("buildEnd", args);
    },
    load(id) {
      console.log("load", id);
      return null; // other ids should be handled as usually
    },
  };
}
