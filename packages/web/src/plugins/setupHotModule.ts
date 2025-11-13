export const setupHotModule = () => {
  if (import.meta.hot) {
    //用于热更新时通信，在模块热更新时触发事件
    import.meta.hot.accept((newModule) => {
      // newModule is undefined when SyntaxError happened
      console.log("updated: count is now ", newModule);
    });
  }
};
