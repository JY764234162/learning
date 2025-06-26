## 7.0.0-beta.2 (2025-06-17)

* 功能: 在 `configurePreviewServer` 钩子之前应用一些中间件 (#20224) ([b989c42](https://github.com/vitejs/vite/commit/b989c42cf84378e6cb93970de739941f0d56d6f6)), closes [#20224](https://github.com/vitejs/vite/issues/20224)
* 功能: 在 `configureServer` 钩子之前应用一些中间件 (#20222) ([f5cc4c0](https://github.com/vitejs/vite/commit/f5cc4c0ded337670b439e51bc95f173e2b5cf9ad)), closes [#20222](https://github.com/vitejs/vite/issues/20222)
* 杂项(依赖): 更新 rolldown 相关依赖 (#20182) ([6172f41](https://github.com/vitejs/vite/commit/6172f410b44cbae8d052997bb1819a6197a4d397)), closes [#20182](https://github.com/vitejs/vite/issues/20182)
* 杂项(依赖): 更新 rolldown 相关依赖 (#20211) ([b13b7f5](https://github.com/vitejs/vite/commit/b13b7f5e21fe05c3214766b3de584a026fbfe144)), closes [#20211](https://github.com/vitejs/vite/issues/20211)
* 修复(依赖): 更新所有非主要依赖 (#20181) ([d91d4f7](https://github.com/vitejs/vite/commit/d91d4f7ad55edbcb4a51fc23376cbff89f776d30)), closes [#20181](https://github.com/vitejs/vite/issues/20181)
* 修复(依赖): 更新所有非主要依赖 (#20212) ([a80339b](https://github.com/vitejs/vite/commit/a80339b1798607dd7389f42964272181cf9eb453)), closes [#20212](https://github.com/vitejs/vite/issues/20212)



## 7.0.0-beta.1 (2025-06-10)

* 功能: 为 import.meta.glob 添加 base 选项 (#20163) ([253d6c6](https://github.com/vitejs/vite/commit/253d6c6df2ebe3c4a88dabb6cec000128681561f)), closes [#20163](https://github.com/vitejs/vite/issues/20163)
* 修复(ssr)!: 在 ssr 转换后的代码中不要访问 `Object` 变量 (#19996) ([fceff60](https://github.com/vitejs/vite/commit/fceff60dc81730f7768b57f14e7a112facff387d)), closes [#19996](https://github.com/vitejs/vite/issues/19996)
* 修复: 对齐动态导入检测 (#20115) ([1ea2222](https://github.com/vitejs/vite/commit/1ea2222302f128c4000289683480d8311ea34223)), closes [#20115](https://github.com/vitejs/vite/issues/20115)
* 修复: 在 configResolved 后应用 applyToEnvironment (#20170) ([a330b80](https://github.com/vitejs/vite/commit/a330b805b0733fadd1f7d586218c2aafcbb41a7f)), closes [#20170](https://github.com/vitejs/vite/issues/20170)
* 修复: 处理带有 `.then(m => m.a)` 的动态导入 (#20117) ([7b7410a](https://github.com/vitejs/vite/commit/7b7410abab7c95880d943e46bd1a16dcb1a893fc)), closes [#20117](https://github.com/vitejs/vite/issues/20117)
* 修复: 虚拟 svg 模块 (#20144) ([7dfcb31](https://github.com/vitejs/vite/commit/7dfcb316ee64aca0a98a1d2905deb1dfd113ae6d)), closes [#20144](https://github.com/vitejs/vite/issues/20144)
* 修复(依赖): 更新所有非主要依赖 (#20141) ([89ca65b](https://github.com/vitejs/vite/commit/89ca65ba1d849046dccdea52e9eca980f331be26)), closes [#20141](https://github.com/vitejs/vite/issues/20141)
* 修复(hmr): 为时间戳使用 monotonicDateNow (#20158) ([8d26785](https://github.com/vitejs/vite/commit/8d26785b8c3f5295ca0c1519dda1ddae9096fc73)), closes [#20158](https://github.com/vitejs/vite/issues/20158)
* 修复(optimizer): 使 `build.rollupOptions.input` 的相对路径解析与 rollup 保持一致 (#20080) ([9759c29](https://github.com/vitejs/vite/commit/9759c29a8985da1a51de452d741850f0bf2ef7ef)), closes [#20080](https://github.com/vitejs/vite/issues/20080)
* 修复(types): `preprocessorOptions.sass` 优先使用 sass-embedded 类型而非 sass 类型 (修复 #20150) ( ([7db56be](https://github.com/vitejs/vite/commit/7db56be237dd1e1e875518475421d5c90cf950da)), closes [#20150](https://github.com/vitejs/vite/issues/20150) [#20166](https://github.com/vitejs/vite/issues/20166)
* 杂项: 添加在开发 Vite 时禁用 source map 的方法 (#20168) ([3a30c0a](https://github.com/vitejs/vite/commit/3a30c0a084a1b92a6265f8900df89e5102418e5e)), closes [#20168](https://github.com/vitejs/vite/issues/20168)
* 杂项: 修复开发 Vite 时对 source map 的支持 (#20167) ([279ab0d](https://github.com/vitejs/vite/commit/279ab0dc954c5e986810b78efa7fe898945f8f21)), closes [#20167](https://github.com/vitejs/vite/issues/20167)
* 杂项: 在 buildEnvironment 函数中使用解构别名 (#19472) ([501572a](https://github.com/vitejs/vite/commit/501572a9a3e1e22ab7e19afb5b13d3f54da67c37)), closes [#19472](https://github.com/vitejs/vite/issues/19472)
* 杂项(依赖): 更新 rolldown 相关依赖 (#20140) ([0387447](https://github.com/vitejs/vite/commit/03874471e3de14e7d2f474ecb354499e7f5eb418)), closes [#20140](https://github.com/vitejs/vite/issues/20140)
* 重构(worker): 在 load 钩子中设置虚拟文件内容 (#20160) ([0d60667](https://github.com/vitejs/vite/commit/0d60667e03d91cc0d48dd2cdbd8154d94e0aba74)), closes [#20160](https://github.com/vitejs/vite/issues/20160)
* 测试: 修正 esbuild `useDefineForClassFields` 测试 (#20143) ([d90796e](https://github.com/vitejs/vite/commit/d90796ece7d30d1879d74c422628be30d1c90a7f)), closes [#20143](https://github.com/vitejs/vite/issues/20143)



## 7.0.0-beta.0 (2025-06-02)

* 杂项: 为对等依赖声明版本范围 (#19979) ([c9bfd57](https://github.com/vitejs/vite/commit/c9bfd578f4c56314c6c6d6f34e49fe494ae11072)), closes [#19979](https://github.com/vitejs/vite/issues/19979)
* 杂项: 弃用 `ResolvedConfig.createResolver` 并推荐 `createIdResolver` (#20031) ([d101d64](https://github.com/vitejs/vite/commit/d101d64722f82ed681b833bfd3fb394eeb496e21)), closes [#20031](https://github.com/vitejs/vite/issues/20031)
* 杂项: 修复 `devEnvironmentOptions.moduleRunnerTransform` 的注释 (#20035) ([338081d](https://github.com/vitejs/vite/commit/338081df9649f68484416d199113fc67abbb6cd5)), closes [#20035](https://github.com/vitejs/vite/issues/20035)
* 杂项: 通过 rolldown-plugin-dts 内部生成 dts (#20093) ([a66afa3](https://github.com/vitejs/vite/commit/a66afa33bd92e2be6ee1d52b8fffa49da266adab)), closes [#20093](https://github.com/vitejs/vite/issues/20093)
* 杂项: 删除注释中多余的词 (#20139) ([9b2964d](https://github.com/vitejs/vite/commit/9b2964df79d31b17e6b387e7fc082753f8ee5774)), closes [#20139](https://github.com/vitejs/vite/issues/20139)
* 杂项: 删除未使用的依赖 (#20097) ([d11ae6b](https://github.com/vitejs/vite/commit/d11ae6bca808407a9f0fb4f9c1cb8496a705c2d7)), closes [#20097](https://github.com/vitejs/vite/issues/20097)
* 杂项: 在适当的地方将 rollup 重命名为 rolldown (#20096) ([306e250](https://github.com/vitejs/vite/commit/306e250a94e12584b4182db8ec531750b3d9e3ba)), closes [#20096](https://github.com/vitejs/vite/issues/20096)
* 杂项: 加速类型检查 (#20131) ([a357c19](https://github.com/vitejs/vite/commit/a357c1987f332519d7bacafebc5620c7ab534d8f)), closes [#20131](https://github.com/vitejs/vite/issues/20131)
* 杂项: 为 `patch-types` 插件使用插件钩子过滤器来打包 vite (#20089) ([c127955](https://github.com/vitejs/vite/commit/c12795522fd95d3535100293f4cf53c53c3f301f)), closes [#20089](https://github.com/vitejs/vite/issues/20089)
* 杂项: 使用 rolldown 来打包 Vite 本身 (#19925) ([7753b02](https://github.com/vitejs/vite/commit/7753b028848d9e23bcea5f00565207f2d1de8291)), closes [#19925](https://github.com/vitejs/vite/issues/19925)
* 杂项: 使用 rolldown-plugin-dts 进行 dts 打包 (#19990) ([449d7f3](https://github.com/vitejs/vite/commit/449d7f30a85ae70eb0037fdab0b1ebf2e4927a24)), closes [#19990](https://github.com/vitejs/vite/issues/19990)
* 修复: 导入可选的对等依赖应该抛出运行时错误 (#20029) ([d0221cd](https://github.com/vitejs/vite/commit/d0221cd7383c18d67a5ef594da52e6aa5fc4d87b)), closes [#20029](https://github.com/vitejs/vite/issues/20029)
* 修复: 正确合并 `environments.*.resolve.noExternal` (#20077) ([daf4a25](https://github.com/vitejs/vite/commit/daf4a25a1c0a37c992606e6ae159e13190c2e101)), closes [#20077](https://github.com/vitejs/vite/issues/20077)
* 修复: 正确合并 `server.allowedHosts: true` (#20138) ([2ade756](https://github.com/vitejs/vite/commit/2ade756c9549a52d804797d45da37c8429a51fd3)), closes [#20138](https://github.com/vitejs/vite/issues/20138)
* 修复: 将所有 `optimizeDeps.entries` 值视为 glob (#20045) ([1422395](https://github.com/vitejs/vite/commit/142239588d6752c5b91d435aee9b4a6c00b7f924)), closes [#20045](https://github.com/vitejs/vite/issues/20045)
* 修复(cli): 使 `cleanGlobalCLIOptions()` 清理 `--force` (#19999) ([d4a171a](https://github.com/vitejs/vite/commit/d4a171afd387000789172a94c94a1c33c0856f85)), closes [#19999](https://github.com/vitejs/vite/issues/19999)
* 修复(client): 渲染堆栈跟踪的最后一部分 (#20039) ([c7c1743](https://github.com/vitejs/vite/commit/c7c17434968848f1471179c10a5fc9d2804add8b)), closes [#20039](https://github.com/vitejs/vite/issues/20039)
* 修复(css): 从 rebaseUrl 中删除别名排除逻辑 (#20100) ([44c6d01](https://github.com/vitejs/vite/commit/44c6d0111f95c8aa44d6a09a768e8cf02232ed29)), closes [#20100](https://github.com/vitejs/vite/issues/20100)
* 修复(css): 在相对导入的模块中 sass rebase url (#20067) ([261fad9](https://github.com/vitejs/vite/commit/261fad9b8e6380c84b8692b3fbe18d6f37d367bd)), closes [#20067](https://github.com/vitejs/vite/issues/20067)
* 修复(css): 当 url rebase 功能失败时不应该用双引号包裹 (#20068) ([a33d0c7](https://github.com/vitejs/vite/commit/a33d0c7d65d9fff9acd5de0cf3c4d371297b3990)), closes [#20068](https://github.com/vitejs/vite/issues/20068)
* 修复(依赖): 更新所有非主要依赖 (#19953) ([ac8e1fb](https://github.com/vitejs/vite/commit/ac8e1fb289a06fc0671dab1f4ef68e508e34360e)), closes [#19953](https://github.com/vitejs/vite/issues/19953)
* 修复(依赖): 更新所有非主要依赖 (#20061) ([7b58856](https://github.com/vitejs/vite/commit/7b588563636a6f735a6e25832f33fc08572b25d9)), closes [#20061](https://github.com/vitejs/vite/issues/20061)
* 修复(optimizer): CJS 外部化外观中 Node 内置模块的非对象 module.exports (#20048) ([00ac6e4](https://github.com/vitejs/vite/commit/00ac6e410eeb15719fe020fd497f0336e7fd1aa8)), closes [#20048](https://github.com/vitejs/vite/issues/20048)
* 修复(optimizer): 当 `computeEntries` 失败时显示错误 (#20079) ([b742b46](https://github.com/vitejs/vite/commit/b742b46f8308a71c1d2aa426eade0c50cbf1480f)), closes [#20079](https://github.com/vitejs/vite/issues/20079)
* 修复(types): 暴露额外的 PluginContext 类型 (#20129) ([b6df9aa](https://github.com/vitejs/vite/commit/b6df9aac3320cd953f6d45ad9245a7b564f67cc1)), closes [#20129](https://github.com/vitejs/vite/issues/20129)
* 功能: 添加 `this.meta.viteVersion` (#20088) ([f55bf41](https://github.com/vitejs/vite/commit/f55bf41e91f8dfe829a46e58f0035b19c8ab6a25)), closes [#20088](https://github.com/vitejs/vite/issues/20088)
* 功能: 允许将解析后的配置传递给 vite 的 `createServer` (#19894) ([c1ae9bd](https://github.com/vitejs/vite/commit/c1ae9bd4a0542b4703ae7766ad61d072e8b833bd)), closes [#19894](https://github.com/vitejs/vite/issues/19894)
* 功能: buildApp 钩子 (#19971) ([5da659d](https://github.com/vitejs/vite/commit/5da659de902f0a2d6d8beefbf269128383b63887)), closes [#19971](https://github.com/vitejs/vite/issues/19971)
* 功能: 使 PluginContext 对 Vite 特定的钩子可用 (#19936) ([7063839](https://github.com/vitejs/vite/commit/7063839d47dfd4ac6be1247ba68e414ffe287b00)), closes [#19936](https://github.com/vitejs/vite/issues/19936)
* 功能: 在配置时解析环境插件 (#20120) ([f6a28d5](https://github.com/vitejs/vite/commit/f6a28d5f792ba5cc4dc236e3e6edd05199cabcc8)), closes [#20120](https://github.com/vitejs/vite/issues/20120)
* 功能: 稳定 `css.preprocessorMaxWorkers` 并默认为 `true` (#19992) ([70aee13](https://github.com/vitejs/vite/commit/70aee139ea802478bad56e5e441f187140bcf0cc)), closes [#19992](https://github.com/vitejs/vite/issues/19992)
* 功能: 稳定 `optimizeDeps.noDiscovery` (#19984) ([6d2dcb4](https://github.com/vitejs/vite/commit/6d2dcb494db9f40565f11b50bdbb8c1b7245697d)), closes [#19984](https://github.com/vitejs/vite/issues/19984)
* 功能(build): 为资源入口点提供名称 (#19912) ([c4e01dc](https://github.com/vitejs/vite/commit/c4e01dc5ab0f1708383c39d28ce62e12b8f374fc)), closes [#19912](https://github.com/vitejs/vite/issues/19912)
* 功能(client): 支持在编辑器中打开 fileURL (#20040) ([1bde4d2](https://github.com/vitejs/vite/commit/1bde4d25243cd9beaadb01413e896fef562626ef)), closes [#20040](https://github.com/vitejs/vite/issues/20040)
* 杂项!: 删除已弃用的 splitVendorChunkPlugin (#19255) ([91a92c7](https://github.com/vitejs/vite/commit/91a92c7e1eaf55cd5d5cfa49c546e130045e7dee)), closes [#19255](https://github.com/vitejs/vite/issues/19255)
* 杂项!: 移除 node 18 支持 (#19972) ([00b8a98](https://github.com/vitejs/vite/commit/00b8a98f36376804437e1342265453915ae613de)), closes [#19972](https://github.com/vitejs/vite/issues/19972)
* 功能!: 提升 `build.target` 并将其命名为 `baseline-widely-available` (#20007) ([4a8aa82](https://github.com/vitejs/vite/commit/4a8aa82556eb2b9e54673a6aac77873e0eb27fa9)), closes [#20007](https://github.com/vitejs/vite/issues/20007)
* 重构!: 将所需的 node 版本提升至 20.19+, 22.12+ 并移除 cjs 构建 (#20032) ([2b80243](https://github.com/vitejs/vite/commit/2b80243fada75378e80475028fdcc78f4432bd6f)), closes [#20032](https://github.com/vitejs/vite/issues/20032)
* 重构!: 移除 `experimental.skipSsrTransform` 选项 (#20038) ([6c3dd8e](https://github.com/vitejs/vite/commit/6c3dd8e46fa77060603679cda91a4c8d01d095ab)), closes [#20038](https://github.com/vitejs/vite/issues/20038)
* 重构!: 移除 `HotBroadcaster` (#19988) ([cda8c94](https://github.com/vitejs/vite/commit/cda8c947934466da27e874b6c064451cf73f03e5)), closes [#19988](https://github.com/vitejs/vite/issues/19988)
* 重构!: 移除已弃用的 `HotBroadcaster` 相关类型 (#19987) ([86b5e00](https://github.com/vitejs/vite/commit/86b5e0030bf204f8f2db0cf8ee895ab3ecf154b8)), closes [#19987](https://github.com/vitejs/vite/issues/19987)
* 重构!: 移除 `transformIndexHtml` 钩子中已弃用的钩子级 `enforce`/`transform` (#19349 ([6198b9d](https://github.com/vitejs/vite/commit/6198b9d2a32f7bd17b3332525a98c06d9a425fb1)), closes [#19349](https://github.com/vitejs/vite/issues/19349)
* 重构!: 移除已弃用的仅类型无操作属性 (#19985) ([9151c24](https://github.com/vitejs/vite/commit/9151c2400f6ab494f73d78aea4435b7c1ef5fc30)), closes [#19985](https://github.com/vitejs/vite/issues/19985)
* 重构(css)!: 始终使用 sass 编译器 API (#19978) ([3bfe5c5](https://github.com/vitejs/vite/commit/3bfe5c5ff96af0a0624c8f14503ef87a0c0850ed)), closes [#19978](https://github.com/vitejs/vite/issues/19978)
* 重构(css)!: 移除 sass 旧版 API 支持 (#19977) ([6eaccc9](https://github.com/vitejs/vite/commit/6eaccc9009d718a1afcff2af587e81eb959f5b60)), closes [#19977](https://github.com/vitejs/vite/issues/19977)
* 重构: 将 `src/node/publicUtils.ts` 合并到 `src/node/index.ts` (#20086) ([999a1ed](https://github.com/vitejs/vite/commit/999a1ed8dff5117b2fd205c4e5384b6ac2ede80e)), closes [#20086](https://github.com/vitejs/vite/issues/20086)
* 重构: 移除 clientInjectionsPlugin 中对 `options?.ssr` 的支持 (#19589) ([88e0076](https://github.com/vitejs/vite/commit/88e00765dbd3de4cb073c722dce3e8ef60c3a50e)), closes [#19589](https://github.com/vitejs/vite/issues/19589)
* 重构: 移除对直接调用内部插件的向后兼容性 (#20001) ([9072a72](https://github.com/vitejs/vite/commit/9072a726731eccee32d38f04747fda8793ccc82a)), closes [#20001](https://github.com/vitejs/vite/issues/20001)
* 重构: 移除已弃用的 env api 属性 (#19986) ([52e5a1b](https://github.com/vitejs/vite/commit/52e5a1b32d0ce7604b633f001a352124e3ec623a)), closes [#19986](https://github.com/vitejs/vite/issues/19986)
* 重构: 移除无操作的 `legacy.proxySsrExternalModules` (#20013) ([a37ac83](https://github.com/vitejs/vite/commit/a37ac836ac4da8e854d98c65450f12acb921aa98)), closes [#20013](https://github.com/vitejs/vite/issues/20013)
* 重构: 使用 `hostValidationMiddleware` (#20019) ([83bf90e](https://github.com/vitejs/vite/commit/83bf90edd5856ed6e27051e3e9a6032e02242b18)), closes [#20019](https://github.com/vitejs/vite/issues/20019)
* 重构: 对实验性选项使用 `mergeWithDefaults` (#20012) ([98c5741](https://github.com/vitejs/vite/commit/98c57419426201596a962746436e5ad1aeef4eac)), closes [#20012](https://github.com/vitejs/vite/issues/20012)
* 重构: 使用 rollup 的钩子过滤器 (#19755) ([0d18fc1](https://github.com/vitejs/vite/commit/0d18fc1dc65f5c8d855808f23754c0c4902f07d9)), closes [#19755](https://github.com/vitejs/vite/issues/19755)
* 重构(ssr): 移除 ssrTransform 行偏移保留 (#19829) ([61b6b96](https://github.com/vitejs/vite/commit/61b6b96b191c6071b9c574ad4c795f97f2646f18)), closes [#19829](https://github.com/vitejs/vite/issues/19829)
* 文档: 小拼写错误 (#20110) ([d20fc2c](https://github.com/vitejs/vite/commit/d20fc2cdc9700513425b18b625e01224f61e4eab)), closes [#20110](https://github.com/vitejs/vite/issues/20110)
* 测试: 在构建钩子过滤器测试中跳过写入文件 (#20076) ([bf8b07d](https://github.com/vitejs/vite/commit/bf8b07da3e64dc4de446a9b24a33d5822a7736b9)), closes [#20076](https://github.com/vitejs/vite/issues/20076)
* ci: 也在 Node 24 上运行测试 (#20049) ([1fe07d3](https://github.com/vitejs/vite/commit/1fe07d3716012992dd7b2e78d8380add0b606a97)), closes [#20049](https://github.com/vitejs/vite/issues/20049)



## <small>6.3.5 (2025-05-05)</small>

* 修复(ssr): 将未初始化的导出访问处理为 undefined (#19959) ([fd38d07](https://github.com/vitejs/vite/commit/fd38d076fe2455aac1e00a7b15cd51159bf12bb5)), closes [#19959](https://github.com/vitejs/vite/issues/19959)



## <small>6.3.4 (2025-04-30)</small>

* 修复: 在 sirv 内部检查静态服务文件 (#19965) ([c22c43d](https://github.com/vitejs/vite/commit/c22c43de612eebb6c182dd67850c24e4fab8cacb)), closes [#19965](https://github.com/vitejs/vite/issues/19965)
* 修复(optimizer): 在优化的依赖项中使用 `require` 导入外部依赖时返回普通对象 ([efc5eab](https://github.com/vitejs/vite/commit/efc5eab253419fde0a6a48b8d2f233063d6a9643)), closes [#19940](https://github.com/vitejs/vite/issues/19940)
* 重构: 删除重复的插件上下文类型 (#19935) ([d6d01c2](https://github.com/vitejs/vite/commit/d6d01c2292fa4f9603e05b95d81c8724314c20e0)), closes [#19935](https://github.com/vitejs/vite/issues/19935)



## <small>6.3.3 (2025-04-24)</small>

* 修复: 在 transform 中间件中忽略格式错误的 uri (#19853) ([e4d5201](https://github.com/vitejs/vite/commit/e4d520141bcd83ad61f16767348b4a813bf9340a)), closes [#19853](https://github.com/vitejs/vite/issues/19853)
* 修复(assets): 确保 ?no-inline 不包含在生产环境的资源 url 中 (#1949 ([16a73c0](https://github.com/vitejs/vite/commit/16a73c05d35daa34117a173784895546212db5f4)), closes [#19496](https://github.com/vitejs/vite/issues/19496)
* 修复(css): 在 Windows 上正确解析 sass 中的相对导入 (#19920) ([ffab442](https://github.com/vitejs/vite/commit/ffab44270488f54ae344801024474b597249071b)), closes [#19920](https://github.com/vitejs/vite/issues/19920)
* 修复(依赖): 更新所有非主要依赖 (#19899) ([a4b500e](https://github.com/vitejs/vite/commit/a4b500ef9ccc9b19a2882156a9ba8397e69bc6b2)), closes [#19899](https://github.com/vitejs/vite/issues/19899)
* 修复(ssr): 修复 re-export 的执行顺序 (#19841) ([ed29dee](https://github.com/vitejs/vite/commit/ed29dee2eb2e3573b2bc337e1a9124c65222a1e5)), closes [#19841](https://github.com/vitejs/vite/issues/19841)
* 修复(ssr): 修复默认导出声明的实时绑定并提升 exports getter (#19842) ([80a91ff](https://github.com/vitejs/vite/commit/80a91ff82426a4c88d54b9f5ec9a4205cb13899b)), closes [#19842](https://github.com/vitejs/vite/issues/19842)
* 性能: 跳过 import-analysis-build 插件的 renderChunk 钩子的 sourcemap 生成 (#19921) ([55cfd04](https://github.com/vitejs/vite/commit/55cfd04b10f98cde7a96814a69b9813543ea79c2)), closes [#19921](https://github.com/vitejs/vite/issues/19921)
* 测试(ssr): 测试 `ssrTransform` re-export deps 和带第一行的堆栈跟踪测试 (#19629) ([9399cda](https://github.com/vitejs/vite/commit/9399cdaf8c3b2efd5f4015d57dc3b0e4e5b91a9d)), closes [#19629](https://github.com/vitejs/vite/issues/19629)



## <small>6.3.2 (2025-04-18)</small>

* 修复: 不区分大小写匹配默认断言 (#19852) ([cbdab1d](https://github.com/vitejs/vite/commit/cbdab1d6a30e07263ec51b2ca042369e736adec6)), closes [#19852](https://github.com/vitejs/vite/issues/19852)
* 修复: 如果主机不匹配任何 url，则打开第一个 url (#19886) ([6abbdce](https://github.com/vitejs/vite/commit/6abbdce3d77990409e12380e72c7ec9dd3f8bec5)), closes [#19886](https://github.com/vitejs/vite/issues/19886)
* 修复(css): 在 css 压缩过程中尊重 `css.lightningcss` 选项 (#19879) ([b5055e0](https://github.com/vitejs/vite/commit/b5055e0dd4c0e084115c3dbfead5736a54807e0c)), closes [#19879](https://github.com/vitejs/vite/issues/19879)
* 修复(依赖): 更新所有非主要依赖 (#19698) ([bab4cb9](https://github.com/vitejs/vite/commit/bab4cb92248adf6b9b18df12b2bf03889b0bd1eb)), closes [#19698](https://github.com/vitejs/vite/issues/19698)
* 功能(css): 改进 lightningcss 消息 (#19880) ([c713f79](https://github.com/vitejs/vite/commit/c713f79b5a4bd98542d8dbe4c85ba4cce9b1f358)), closes [#19880](https://github.com/vitejs/vite/issues/19880)



## <small>6.3.1 (2025-04-17)</small>

* 修复: 避免在预加载函数中使用 `Promise.allSettled` (#19805) ([35c7f35](https://github.com/vitejs/vite/commit/35c7f35e2b67f2158ededf2af58ecec53b3f16c5)), closes [#19805](https://github.com/vitejs/vite/issues/19805)
* 修复: 内部插件 `transform` 调用的向后兼容性 (#19878) ([a152b7c](https://github.com/vitejs/vite/commit/a152b7cbac72e05668f8fc23074d531ecebb77a5)), closes [#19878](https://github.com/vitejs/vite/issues/19878)



## 6.3.0 (2025-04-16)

* 修复(hmr): 避免在循环依赖中使用 `hot.invalidate` 时发生无限循环 (#19870) ([d4ee5e8](https://github.com/vitejs/vite/commit/d4ee5e8655a85f4d6bebc695b063d69406ab53ac)), closes [#19870](https://github.com/vitejs/vite/issues/19870)
* 修复(preview): 使用主机 url 打开浏览器 (#19836) ([5003434](https://github.com/vitejs/vite/commit/50034340401b4043bb0b158f18ffb7ae1b7f5c86)), closes [#19836](https://github.com/vitejs/vite/issues/19836)



## 6.3.0-beta.2 (2025-04-11)

* 修复: 如果指定了 base，addWatchFile 将不起作用 (修复 #19792) (#19794) ([8bed1de](https://github.com/vitejs/vite/commit/8bed1de5710f2a097af0e22a196545446d98f988)), closes [#19792](https://github.com/vitejs/vite/issues/19792) [#19794](https://github.com/vitejs/vite/issues/19794)
* 修复: 修正指定多个 transform 过滤器选项时的行为 (#19818) ([7200dee](https://github.com/vitejs/vite/commit/7200deec91a501fb84734e23906f80808734540c)), closes [#19818](https://github.com/vitejs/vite/issues/19818)
* 修复: fs 检查 svg 和相对路径 (#19782) ([62d7e81](https://github.com/vitejs/vite/commit/62d7e81ee189d65899bb65f3263ddbd85247b647)), closes [#19782](https://github.com/vitejs/vite/issues/19782)
* 修复: 保留由其他文件导入的入口资源文件 (#19779) ([2fa1495](https://github.com/vitejs/vite/commit/2fa149580118a6b7988593dea9e2bf2ee679506c)), closes [#19779](https://github.com/vitejs/vite/issues/19779)
* 修复: 拒绝在 request-target 中带有 `#` 的请求 (#19830) ([175a839](https://github.com/vitejs/vite/commit/175a83909f02d3b554452a7bd02b9f340cdfef70)), closes [#19830](https://github.com/vitejs/vite/issues/19830)
* 修复: 解绑 `fdir` 以修复 `commonjsOptions.dynamicRequireTargets` (#19791) ([71227be](https://github.com/vitejs/vite/commit/71227be9aab52c1c5df59afba4539646204eff74)), closes [#19791](https://github.com/vitejs/vite/issues/19791)
* 修复(css): 当 chunk 文件名包含特殊字符时，正确删除空的 chunk 导入 (#1 ([b125172](https://github.com/vitejs/vite/commit/b1251720d47f15615ea354991cdaa90d9a94aae5)), closes [#19814](https://github.com/vitejs/vite/issues/19814)
* 修复(dev): 使查询选择器正则表达式更具包容性 (修复 #19213) (#19767) ([f530a72](https://github.com/vitejs/vite/commit/f530a72246ec8e73b1f2ba767f6c108e9ac9712a)), closes [#19213](https://github.com/vitejs/vite/issues/19213) [#19767](https://github.com/vitejs/vite/issues/19767)
* 修复(hmr): 按顺序运行 HMR 处理程序 (#19793) ([380c10e](https://github.com/vitejs/vite/commit/380c10e665e78ef732a8d7b6c8f60a1226fc4c3b)), closes [#19793](https://github.com/vitejs/vite/issues/19793)
* 修复(module-runner): 允许已解析的 id 作为入口 (#19768) ([e2e11b1](https://github.com/vitejs/vite/commit/e2e11b15a6083777ee521e26a3f79c3859abd411)), closes [#19768](https://github.com/vitejs/vite/issues/19768)
* 修复(types): 从 `DefaultEnvironmentOptions` 类型中移除 `keepProcessEnv` (#19796) ([36935b5](https://github.com/vitejs/vite/commit/36935b58eabde46ab845e121e21525df5ad65ff1)), closes [#19796](https://github.com/vitejs/vite/issues/19796)
* 重构: 简化 pluginFilter 实现 (#19828) ([0a0c50a](https://github.com/vitejs/vite/commit/0a0c50a7ed38017469ed6dcec941c2d8d0efd0d0)), closes [#19828](https://github.com/vitejs/vite/issues/19828)
* 性能(css): 避免构造 `renderedModules` (#19775) ([59d0b35](https://github.com/vitejs/vite/commit/59d0b35b30f3a38be33c0a9bdc177945b6f7eb1b)), closes [#19775](https://github.com/vitejs/vite/issues/19775)
* 测试: 调整 generateCodeFrame 测试 (#19812) ([8fe3538](https://github.com/vitejs/vite/commit/8fe3538d9095384c670815dc42ef67e051f3246f)), closes [#19812](https://github.com/vitejs/vite/issues/19812)
* 文档(vite): 修复 `transformIndexHtml` 钩子的描述 (#19799) ([a0e1a04](https://github.com/vitejs/vite/commit/a0e1a0402648e0df60fb928ffd97b0230999990d)), closes [#19799](https://github.com/vitejs/vite/issues/19799)
* 杂项: 删除未使用的 eslint 指令 (#19781) ([cb4f5b4](https://github.com/vitejs/vite/commit/cb4f5b4b6bb7dc96812b126ccc475d1e2c3f7f92)), closes [#19781](https://github.com/vitejs/vite/issues/19781)



## 6.3.0-beta.1 (2025-04-03)

* 修复: 使插件钩子过滤器行为与 pluginutils 对齐 (#19736) ([0bbdd2c](https://github.com/vitejs/vite/commit/0bbdd2c1338624fa0e76c81648989f8f9a5b36d7)), closes [#19736](https://github.com/vitejs/vite/issues/19736)
* 修复: transform 中间件中的 fs 检查 (#19761) ([5967313](https://github.com/vitejs/vite/commit/59673137c45ac2bcfad1170d954347c1a17ab949)), closes [#19761](https://github.com/vitejs/vite/issues/19761)
* 修复(hmr): 抛出非标准错误信息导致逻辑错误 (#19776) ([6b648c7](https://github.com/vitejs/vite/commit/6b648c73ae33a57f648af87204a325335afffca8)), closes [#19776](https://github.com/vitejs/vite/issues/19776)
* 性能: 仅打包 node 版本的 `debug` (#19715) ([e435aae](https://github.com/vitejs/vite/commit/e435aae22ffda441a24332cd79226bfca55326aa)), closes [#19715](https://github.com/vitejs/vite/issues/19715)
* 功能(env): 为 envDir 添加 false 选项以禁用 env 加载 (#19503) ([bca89e1](https://github.com/vitejs/vite/commit/bca89e153e58edd2b506807958557a21edacfaf8)), closes [#19503](https://github.com/vitejs/vite/issues/19503)
* 功能(types): 使 CustomPluginOptionsVite 向后兼容 (#19760) ([821edf1](https://github.com/vitejs/vite/commit/821edf196f281b90af0742647a3feaf3226be439)), closes [#19760](https://github.com/vitejs/vite/issues/19760)
* 杂项: 修复注释中的一些拼写错误 (#19728) ([35ee848](https://github.com/vitejs/vite/commit/35ee84808af3a5443019e36cba351af859113695)), closes [#19728](https://github.com/vitejs/vite/issues/19728)



## 6.3.0-beta.0 (2025-03-26)

* 功能: 实现钩子过滤器 (#19602) ([04d58b4](https://github.com/vitejs/vite/commit/04d58b42ae69547f04ef8fcd574b1ee1b654dc32)), closes [#19602](https://github.com/vitejs/vite/issues/19602)
* 功能: 如果 `define['process.env']` 包含带有值的 `path` 键，则发出警告 (#19517) ([832b2c4](https://github.com/vitejs/vite/commit/832b2c409ebbb2ba1480e6ae4630c7f047c160d4)), closes [#19517](https://github.com/vitejs/vite/issues/19517)
* 功能(config): 改进错误字符警告 (#19683) ([998303b](https://github.com/vitejs/vite/commit/998303b438734e8219715fe6883b97fb10404c16)), closes [#19683](https://github.com/vitejs/vite/issues/19683)
* 功能(css): 支持带 lightningcss 的预处理器 (#19071) ([d3450ca](https://github.com/vitejs/vite/commit/d3450cae614af4c2b866903411b6d765df3e5a48)), closes [#19071](https://github.com/vitejs/vite/issues/19071)
* 功能(experimental): 添加可获取的环境接口 (#19664) ([c5b7191](https://github.com/vitejs/vite/commit/c5b71915099cfbc15447a166f35620fa0e05c023)), closes [#19664](https://github.com/vitejs/vite/issues/19664)
* 功能(types): 暴露 `CustomPluginOptionsVite` 类型 (#19557) ([15abc01](https://github.com/vitejs/vite/commit/15abc01241b0da5c4af6aa59b0bc936ccab0f0b4)), closes [#19557](https://github.com/vitejs/vite/issues/19557)
* 功能(types): 使 ImportMetaEnv 严格可用 (#19077) ([6cf5141](https://github.com/vitejs/vite/commit/6cf51417cdfc26f100c00c910e00829e48dec79c)), closes [#19077](https://github.com/vitejs/vite/issues/19077)
* 功能(types): hmr 事件的类型提示 (#19579) ([95424b2](https://github.com/vitejs/vite/commit/95424b26892b005f438169d0ea426cb1a3176bf2)), closes [#19579](https://github.com/vitejs/vite/issues/19579)
* 修复: 将 `.mts` 添加回默认的 `resolve.extensions` (#19701) ([ae91bd0](https://github.com/vitejs/vite/commit/ae91bd0ad10942898c3d7aa8181249fb9682a4fe)), closes [#19701](https://github.com/vitejs/vite/issues/19701)
* 修复: fs 原始查询与查询分隔符 (#19702) ([262b5ec](https://github.com/vitejs/vite/commit/262b5ec7ae4981208339b7b87fefbd3dd8465851)), closes [#19702](https://github.com/vitejs/vite/issues/19702)
* 修复(css): 正确解析逗号后没有空格的 image-set (#19661) ([d0d4c66](https://github.com/vitejs/vite/commit/d0d4c66bd539a5232005ac7ad63ec19f0794f2a5)), closes [#19661](https://github.com/vitejs/vite/issues/19661)
* 修复(css): 带非作用域 css 的作用域 css 顺序 (#19678) ([a3a94ab](https://github.com/vitejs/vite/commit/a3a94abb200c0bb1ed8bc4abb539a9ea27ce1a84)), closes [#19678](https://github.com/vitejs/vite/issues/19678)
* 修复(依赖): 更新所有非主要依赖 (#19649) ([f4e712f](https://github.com/vitejs/vite/commit/f4e712ff861f8a9504594a4a5e6d35a7547e5a7e)), closes [#19649](https://github.com/vitejs/vite/issues/19649)
* 修复(optimizer): 修复 filter() 中不正确的 picomatch 用法 (#19646) ([300280d](https://github.com/vitejs/vite/commit/300280d52203b6c1d8867d956f7d5c991e2e9dfb)), closes [#19646](https://github.com/vitejs/vite/issues/19646)
* 修复(ssr): 提升导出以更好地处理循环导入 (#18983) ([8c04c69](https://github.com/vitejs/vite/commit/8c04c69a52c7b66d551d384ac34bb10ab1522f68)), closes [#18983](https://github.com/vitejs/vite/issues/18983)
* 重构: 插件中的 `[hookName].handler` (#19586) ([9827df2](https://github.com/vitejs/vite/commit/9827df2195905e5eb04b46dce357d12c3dff4876)), closes [#19586](https://github.com/vitejs/vite/issues/19586)
* 重构(reporter): 仅当 logLevel 为 info 时调用 modulesReporter (#19708) ([7249553](https://github.com/vitejs/vite/commit/7249553625b667b6affb448d5acb7d6f457640f6)), closes [#19708](https://github.com/vitejs/vite/issues/19708)
* 杂项(依赖): 解绑 tinyglobby (#19487) ([a5ea6f0](https://github.com/vitejs/vite/commit/a5ea6f09ba79f4a5b72117899bccaa43613a777f)), closes [#19487](https://github.com/vitejs/vite/issues/19487)



## <small>6.2.2 (2025-03-14)</small>

* 修复: 在顶层 buildStart 上等待客户端 buildStart (#19624) ([b31faab](https://github.com/vitejs/vite/commit/b31faab2a81b839e4b747baeb9c7a7cbb724f8d2)), closes [#19624](https://github.com/vitejs/vite/issues/19624)
* 修复(css): 正确内联双引号 use strict 的 css (#19590) ([d0aa833](https://github.com/vitejs/vite/commit/d0aa833296668fc420a27a1ea88ecdbdeacdbce7)), closes [#19590](https://github.com/vitejs/vite/issues/19590)
* 修复(依赖): 更新所有非主要依赖 (#19613) ([363d691](https://github.com/vitejs/vite/commit/363d691b4995d72f26a14eb59ed88a9483b1f931)), closes [#19613](https://github.com/vitejs/vite/issues/19613)
* 修复(indexHtml): 查询模块图时确保 URL 正确 (#19601) ([dc5395a](https://github.com/vitejs/vite/commit/dc5395a27e44066ef7725278c4057d9f1071a53f)), closes [#19601](https://github.com/vitejs/vite/issues/19601)
* 修复(preview): 使用 preview https 配置，而不是 server (#19633) ([98b3160](https://github.com/vitejs/vite/commit/98b3160fa5916189e756cd7c5aae87e0d8f1978e)), closes [#19633](https://github.com/vitejs/vite/issues/19633)
* 修复(ssr): 使用可选链来防止 `ssrRewriteStac` 中发生“undefined is not an object” ([4309755](https://github.com/vitejs/vite/commit/43097550a1aa8ff633c39fb197b5f9ac1222119b)), closes [#19612](https://github.com/vitejs/vite/issues/19612)
* 功能: 为格式错误的 `base` 显示友好的错误 (#19616) ([2476391](https://github.com/vitejs/vite/commit/2476391b2854aaa67d0ed317b6d0c462e68028f7)), closes [#19616](https://github.com/vitejs/vite/issues/19616)
* 功能(worker): 显示资源文件名冲突警告 (#19591) ([367d968](https://github.com/vitejs/vite/commit/367d968fbf584e9f0e17192b816e92e8045c6217)), closes [#19591](https://github.com/vitejs/vite/issues/19591)
* 杂项: 当与非提交对象产生歧义时，正确扩展提交哈希 (#19600) ([89a6287](https://github.com/vitejs/vite/commit/89a62873243805518b672212db7e317989c5c197)), closes [#19600](https://github.com/vitejs/vite/issues/19600)



## <small>6.2.1 (2025-03-07)</small>

* 重构: 从 preAliasPlugin 中删除 `isBuild` 检查 (#19587) ([c9e086d](https://github.com/vitejs/vite/commit/c9e086d35ac35ee1c6d85d48369e8a67a2ba6bfe)), closes [#19587](https://github.com/vitejs/vite/issues/19587)
* 重构: 恢复 endsWith 的使用 (#19554) ([6113a96](https://github.com/vitejs/vite/commit/6113a9670cc9b7d29fe0bffe033f7823e36ded00)), closes [#19554](https://github.com/vitejs/vite/issues/19554)
* 重构: 在内部插件中使用 `applyToEnvironment` (#19588) ([f678442](https://github.com/vitejs/vite/commit/f678442d5701a00648a745956f9d884247e4e710)), closes [#19588](https://github.com/vitejs/vite/issues/19588)
* 修复(css): 在开发模式下使用 lightningcss 稳定 css 模块哈希 (#19481) ([92125b4](https://github.com/vitejs/vite/commit/92125b41e4caa3e862bf5fd9b1941546f25d9bf2)), closes [#19481](https://github.com/vitejs/vite/issues/19481)
* 修复(依赖): 更新所有非主要依赖 (#19555) ([f612e0f](https://github.com/vitejs/vite/commit/f612e0fdf6810317b61fcca1ded125755f261d78)), closes [#19555](https://github.com/vitejs/vite/issues/19555)
* 修复(reporter): 修复非 ASCII 字符导致的不正确的包大小计算 (#19561) ([437c0ed](https://github.com/vitejs/vite/commit/437c0ed8baa6739bbe944779b9e7515f9035046a)), closes [#19561](https://github.com/vitejs/vite/issues/19561)
* 修复(sourcemap): 合并具有多个源但没有匹配源的 sourcemap (#18971) ([e3f6ae1](https://github.com/vitejs/vite/commit/e3f6ae14f7a93118d7341de7379967f815725c4b)), closes [#18971](https://github.com/vitejs/vite/issues/18971)
* 修复(ssr): 命名导出应覆盖全部导出 (#19534) ([2fd2fc1](https://github.com/vitejs/vite/commit/2fd2fc110738622651d361488767734cc23c34dd)), closes [#19534](https://github.com/vitejs/vite/issues/19534)
* 功能: 添加 `*?url&no-inline` 类型和对 `.json?inline` / `.json?no-inline` 的警告 (#19566) ([c0d3667](https://github.com/vitejs/vite/commit/c0d36677cd305e8fa89153ed6305f0e0df43d289)), closes [#19566](https://github.com/vitejs/vite/issues/19566)
* 测试: 添加 glob 导入测试用例 (#19516) ([aa1d807](https://github.com/vitejs/vite/commit/aa1d8075cc7ce7fbba62fea9e37ccb9b304fc039)), closes [#19516](https://github.com/vitejs/vite/issues/19516)
* 测试: 将 config playground 转换为单元测试 (#19568) ([c0e68da](https://github.com/vitejs/vite/commit/c0e68da4774f3487e9ba0c4d4d2c5e76bdc890ea)), closes [#19568](https://github.com/vitejs/vite/issues/19568)
* 测试: 将 resolve-config playground 转换为单元测试 (#19567) ([db5fb48](https://github.com/vitejs/vite/commit/db5fb48f5d4c1ee411e59c1e9b70d62fdb9d53d2)), closes [#19567](https://github.com/vitejs/vite/issues/19567)
* 性能: 10 秒后刷新编译缓存 (#19537) ([6c8a5a2](https://github.com/vitejs/vite/commit/6c8a5a27e645a182f5b03a4ed6aa726eab85993f)), closes [#19537](https://github.com/vitejs/vite/issues/19537)
* 杂项(css): 在条件检查后移动环境解构 (#19492) ([c9eda23](https://github.com/vitejs/vite/commit/c9eda2348c244d591d23f131c6ddf262b256cbf0)), closes [#19492](https://github.com/vitejs/vite/issues/19492)
* 杂项(html): 删除不必要的值检查 (#19491) ([797959f](https://github.com/vitejs/vite/commit/797959f01da583b85a0be1dc89f762fd01d138db)), closes [#19491](https://github.com/vitejs/vite/issues/19491)



## 6.2.0 (2025-02-25)

* 修复(依赖): 更新所有非主要依赖 (#19501) ([c94c9e0](https://github.com/vitejs/vite/commit/c94c9e052127cf4796374de1d698ec60b2973dfa)), closes [#19501](https://github.com/vitejs/vite/issues/19501)
* 修复(worker): 动态 worker 选项中的字符串插值 (#19476) ([07091a1](https://github.com/vitejs/vite/commit/07091a1e804e5934208ef0b6324a04317dd0d815)), closes [#19476](https://github.com/vitejs/vite/issues/19476)
* 杂项: 使用 unicode 交叉图标代替 x (#19497) ([5c70296](https://github.com/vitejs/vite/commit/5c70296ffb22fe5a0f4039835aa14feb096b4a97)), closes [#19497](https://github.com/vitejs/vite/issues/19497)



## 6.2.0-beta.1 (2025-02-21)

* 修复(css): 在 `vite:css-post` 中临时添加 `?.` 在 `this.getModuleInfo` 之后 (#19478) ([12b0b8a](https://github.com/vitejs/vite/commit/12b0b8a953ad7d08ba0540cb4f5cb26a7fa69da2)), closes [#19478](https://github.com/vitejs/vite/issues/19478)



## 6.2.0-beta.0 (2025-02-21)

* 功能: 在服务器启动时显示 `mode` 并添加环境调试器 (#18808) ([c575b82](https://github.com/vitejs/vite/commit/c575b825596ccaedfac1cfecbb9a464e5e584a60)), closes [#18808](https://github.com/vitejs/vite/issues/18808)
* 功能: 使用主机 url 打开浏览器 (#19414) ([f6926ca](https://github.com/vitejs/vite/commit/f6926caa1f2c9433ca544172378412795722d8e1)), closes [#19414](https://github.com/vitejs/vite/issues/19414)
* 功能(css): 允许将 css 作用域限定为导入者的导出 (#19418) ([3ebd838](https://github.com/vitejs/vite/commit/3ebd83833f723dde64098bc617c61b37adb3ad01)), closes [#19418](https://github.com/vitejs/vite/issues/19418)
* 杂项: 将 esbuild 升级到 0.25.0 (#19389) ([73987f2](https://github.com/vitejs/vite/commit/73987f22ec3f2df0d36154f1766ca7a7dc4c2460)), closes [#19389](https://github.com/vitejs/vite/issues/19389)



## <small>6.1.1 (2025-02-19)</small>

* 修复: 确保 `.[cm]?[tj]sx?` 静态资源是 JS mime 类型 (#19453) ([e7ba55e](https://github.com/vitejs/vite/commit/e7ba55e7d57ad97ab43682b152159e29fa4b3753)), closes [#19453](https://github.com/vitejs/vite/issues/19453)
* 修复: 在证书中忽略 `*.ipv4` 地址 (#19416) ([973283b](https://github.com/vitejs/vite/commit/973283bf84c3dca42e2e20a9f9b8761011878b8b)), closes [#19416](https://github.com/vitejs/vite/issues/19416)
* 修复(css): 如果存在 postcss 插件则运行重写插件 (#19371) ([bcdb51a](https://github.com/vitejs/vite/commit/bcdb51a1ac082f4e8ed6f820787d6745dfaa972d)), closes [#19371](https://github.com/vitejs/vite/issues/19371)
* 修复(依赖): 升级 tsconfck (#19375) ([746a583](https://github.com/vitejs/vite/commit/746a583d42592a31e1e8e80cc790a7c9e6acf58e)), closes [#19375](https://github.com/vitejs/vite/issues/19375)
* 修复(依赖): 更新所有非主要依赖 (#19392) ([60456a5](https://github.com/vitejs/vite/commit/60456a54fe90872dbd4bed332ecbd85bc88deb92)), closes [#19392](https://github.com/vitejs/vite/issues/19392)
* 修复(依赖): 更新所有非主要依赖 (#19440) ([ccac73d](https://github.com/vitejs/vite/commit/ccac73d9d0e92c7232f09207d1d6b893e823ed8e)), closes [#19440](https://github.com/vitejs/vite/issues/19440)
* 修复(html): 忽略格式错误的 src 属性 (#19397) ([aff7812](https://github.com/vitejs/vite/commit/aff7812f0aed059c05ca36c86bf907d25964119a)), closes [#19397](https://github.com/vitejs/vite/issues/19397)
* 修复(worker): 修复 web worker 类型检测 (#19462) ([edc65ea](https://github.com/vitejs/vite/commit/edc65eafa332b57ce44835deb7d7707e2d036c24)), closes [#19462](https://github.com/vitejs/vite/issues/19462)
* 重构: 删除自定义 .jxl mime 类型 (#19457) ([0c85464](https://github.com/vitejs/vite/commit/0c854645bd17960abbe8f01b602d1a1da1a2b9fd)), closes [#19457](https://github.com/vitejs/vite/issues/19457)
* 功能: 添加对注入调试 ID 的支持 (#18763) ([0ff556a](https://github.com/vitejs/vite/commit/0ff556a6d9b55bff7cac17396ce7d4397becacaa)), closes [#18763](https://github.com/vitejs/vite/issues/18763)
* 杂项: 更新 6.1.0 更新日志 (#19363) ([fa7c211](https://github.com/vitejs/vite/commit/fa7c211bf3e51269f8a8601e5994fb3ebb6859f9)), closes [#19363](https://github.com/vitejs/vite/issues/19363)



## 6.1.0 (2025-02-05)


### 功能

* 功能: 在 CLI 中显示证书中的主机 (#19317) ([a5e306f](https://github.com/vitejs/vite/commit/a5e306f2fc34fc70d543028c319367ff9b232ea0)), closes [#19317](https://github.com/vitejs/vite/issues/19317)
* 功能: 支持使用环境变量定义允许的主机 (#19325) ([4d88f6c](https://github.com/vitejs/vite/commit/4d88f6c9391f96275b1359f1343ee2ec3e1adb7b)), closes [#19325](https://github.com/vitejs/vite/issues/19325)
* 功能: 使用原生运行时导入配置 (#19178) ([7c2a794](https://github.com/vitejs/vite/commit/7c2a7942cc8494a98fbc2b0235d91faf25242d30)), closes [#19178](https://github.com/vitejs/vite/issues/19178)
* 功能: 在 `EADDRINUSE` 导致 WS 连接失败后，在日志错误消息中打印 `port` (#19212) ([14027b0](https://github.com/vitejs/vite/commit/14027b0f2a9b01c14815c38aab22baf5b29594bb)), closes [#19212](https://github.com/vitejs/vite/issues/19212)
* 性能(css): 仅在需要时运行 postcss (#19061) ([30194fa](https://github.com/vitejs/vite/commit/30194fa1e41dda6470aa20f2bb34655c4bfd9cd1)), closes [#19061](https://github.com/vitejs/vite/issues/19061)
* 功能: 添加对 `.jxl` 的支持 (#18855) ([57b397c](https://github.com/vitejs/vite/commit/57b397c4aa3d3c657e0117c2468800d627049c8d)), closes [#18855](https://github.com/vitejs/vite/issues/18855)
* 功能: 添加 `builtins` 环境 `resolve` (#18584) ([2c2d521](https://github.com/vitejs/vite/commit/2c2d521abfd7a3263b5082f9420738ad0ef67c71)), closes [#18584](https://github.com/vitejs/vite/issues/18584)
* 功能: 在构建中为插件日志调用 Logger (#13757) ([bf3e410](https://github.com/vitejs/vite/commit/bf3e41082932f4bf7d828e18ab0346b2ac8b59c9)), closes [#13757](https://github.com/vitejs/vite/issues/13757)
* 功能: 导出 `defaultAllowedOrigins` 供用户级配置和第三方插件使用 (#19259) ([dc8946b](https://github.com/vitejs/vite/commit/dc8946b9f6483ca7d63df3a5cbba307f1c21041e)), closes [#19259](https://github.com/vitejs/vite/issues/19259)
* 功能: 暴露 createServerModuleRunnerTransport (#18730) ([8c24ee4](https://github.com/vitejs/vite/commit/8c24ee4b4fcfa16fdd8bb699643a92ee81f9c92b)), closes [#18730](https://github.com/vitejs/vite/issues/18730)
* 功能: 支持 proxy.bypass 的异步操作 (#18940) ([a6b9587](https://github.com/vitejs/vite/commit/a6b958741bd97d631aba21aa5925bbf2bca65dac)), closes [#18940](https://github.com/vitejs/vite/issues/18940)
* 功能: 支持开发环境中的日志相关功能 (#18922) ([3766004](https://github.com/vitejs/vite/commit/3766004289fde3300d1278fcf35f3bb980d9785f)), closes [#18922](https://github.com/vitejs/vite/issues/18922)
* 功能: 使用模块运行器导入配置 (#18637) ([b7e0e42](https://github.com/vitejs/vite/commit/b7e0e42098dd2d42285a9d3c4f39c48a580367e7)), closes [#18637](https://github.com/vitejs/vite/issues/18637)
* 功能(css): 为 lightningcss 不支持的 IE hack 添加友好错误 (#19072) ([caad985](https://github.com/vitejs/vite/commit/caad985abca6450d56ca3d4e27e1e859fe8909b9)), closes [#19072](https://github.com/vitejs/vite/issues/19072)
* 功能(optimizer): 支持 bun text lockfile (#18403) ([05b005f](https://github.com/vitejs/vite/commit/05b005fc25a1e8dda749fb14149aa2f3c988b6a1)), closes [#18403](https://github.com/vitejs/vite/issues/18403)
* 功能(reporter): 将 `wasm` 添加到可压缩资源正则表达式中 (#19085) ([ce84142](https://github.com/vitejs/vite/commit/ce84142110584eadfccbd6ce9319573358af31a6)), closes [#19085](https://github.com/vitejs/vite/issues/19085)
* 功能(worker): 支持动态 worker 选项字段 (#19010) ([d0c3523](https://github.com/vitejs/vite/commit/d0c35232c6ccbcf448941328df34d15e9f73919b)), closes [#19010](https://github.com/vitejs/vite/issues/19010)


### 修复

* 修复: 避免在 vite optimize 期间执行 buildStart (#19356) ([fdb36e0](https://github.com/vitejs/vite/commit/fdb36e076969c763d4249f6db890f8bf26e9f5d1)), closes [#19356](https://github.com/vitejs/vite/issues/19356)
* 修复(build): 修复 watch 重建时过期的构建清单 (#19361) ([fcd5785](https://github.com/vitejs/vite/commit/fcd578587b2fbdef0ff8de8a0d97c9fc6da19ce1)), closes [#19361](https://github.com/vitejs/vite/issues/19361)
* 修复: 允许按相反顺序扩展环境变量 (#19352) ([3f5f2bd](https://github.com/vitejs/vite/commit/3f5f2bddf142b2d1b162d4553d26f1ff0758b10d)), closes [#19352](https://github.com/vitejs/vite/issues/19352)
* 修复: 在 `resolveLibCssFilename` 中避免没有名称的 packageJson (#19324) ([f183bdf](https://github.com/vitejs/vite/commit/f183bdf2a799e703672ab1887d707ce120053eb2)), closes [#19324](https://github.com/vitejs/vite/issues/19324)
* 修复(html): 修复构建多个入口 html 时 css 顺序混乱的问题 (#19143) ([e7b4ba3](https://github.com/vitejs/vite/commit/e7b4ba37f90a033036326b45023a1753584dd259)), closes [#19143](https://github.com/vitejs/vite/issues/19143)
* 修复: 不要为 `vite optimize` 调用 buildStart 钩子 (#19347) ([19ffad0](https://github.com/vitejs/vite/commit/19ffad0a5aaf8c0ff55409e746048431b8b6640d)), closes [#19347](https://github.com/vitejs/vite/issues/19347)
* 修复: 如果用户在 proxy.bypass 中发送了响应，则不要调用下一个中间件 (#19318) ([7e6364d](https://github.com/vitejs/vite/commit/7e6364de2b0f3bf65aefaf451646ca500bad8239)), closes [#19318](https://github.com/vitejs/vite/issues/19318)
* 修复: 遵守顶层的 `server.preTransformRequests` (#19272) ([12aaa58](https://github.com/vitejs/vite/commit/12aaa585bc3fac403bf93f48ea117482cc7f43b1)), closes [#19272](https://github.com/vitejs/vite/issues/19272)
* 修复: 对没有 `noExternal: true` 的 `ssr.target: 'webworker'` 使用 `nodeLikeBuiltins` (#19313) ([9fc31b6](https://github.com/vitejs/vite/commit/9fc31b6e4d4f2a5bd9711d4f84dcb55061ebead0)), closes [#19313](https://github.com/vitejs/vite/issues/19313)
* 修复(css): less `@plugin` 导入的 JS 文件被视为 CSS 并重新定位 (修复 #19268) (#19269) ([602b373](https://github.com/vitejs/vite/commit/602b373dcdc755816ce28913873f70550347e936)), closes [#19268](https://github.com/vitejs/vite/issues/19268) [#19269](https://github.com/vitejs/vite/issues/19269)
* 修复(依赖): 更新所有非主要依赖 (#19296) ([2bea7ce](https://github.com/vitejs/vite/commit/2bea7cec4b7fddbd5f2fb6090a7eaf5ae7ca0f1b)), closes [#19296](https://github.com/vitejs/vite/issues/19296)
* 修复(resolve): 保留文件 url 的哈希/搜索 (#19300) ([d1e1b24](https://github.com/vitejs/vite/commit/d1e1b24c57328b5a808b981829503caa6ffadb56)), closes [#19300](https://github.com/vitejs/vite/issues/19300)
* 修复(resolve): 如果 `resolve.builtin` 为空，则在导入类节点内置模块时发出警告 (#19312) ([b7aba0b](https://github.com/vitejs/vite/commit/b7aba0bc925f6d672bbb6a1e6c8c5c123a3bef55)), closes [#19312](https://github.com/vitejs/vite/issues/19312)
* 修复(ssr): 修复由于导出所有 id 作用域导致的转换错误 (#19331) ([e28bce2](https://github.com/vitejs/vite/commit/e28bce244918dac27b26d4e428f86b323a1c51ba)), closes [#19331](https://github.com/vitejs/vite/issues/19331)
* 修复(ssr): 在 `ssrLoadModule` 中漂亮地打印插件错误 (#19290) ([353c467](https://github.com/vitejs/vite/commit/353c467610e2d92c0929fa4abd03f2cbd26e34ed)), closes [#19290](https://github.com/vitejs/vite/issues/19290)
* 修复: 将 ResolvedConfig 类型更改为接口以允许扩展它 (#19210) ([bc851e3](https://github.com/vitejs/vite/commit/bc851e31d88cb26a2cba3fa46763bcd368e8df36)), closes [#19210](https://github.com/vitejs/vite/issues/19210)
* 修复: 正确解析 hmr 依赖 id 并回退到 url (#18840) ([b84498b](https://github.com/vitejs/vite/commit/b84498b6def7d57ff6719da2d2baf6e29f0bb819)), closes [#18840](https://github.com/vitejs/vite/issues/18840)
* 修复: 使 `--force` 对所有环境都有效 (#18901) ([51a42c6](https://github.com/vitejs/vite/commit/51a42c6b6a285fb1f092be5bbd2e18cd1fe2b214)), closes [#18901](https://github.com/vitejs/vite/issues/18901)
* 修复: 如果 rollup 错误中存在 loc.file，则使用它 (#19222) ([ce3fe23](https://github.com/vitejs/vite/commit/ce3fe236de625de745643e127e27f2a5b52c6d2e)), closes [#19222](https://github.com/vitejs/vite/issues/19222)
* 修复(依赖): 更新所有非主要依赖 (#19190) ([f2c07db](https://github.com/vitejs/vite/commit/f2c07dbfc874b46f6e09bb04996d0514663e4544)), closes [#19190](https://github.com/vitejs/vite/issues/19190)
* 修复(hmr): 将内联资源注册为 CSS 文件的依赖项 (#18979) ([eb22a74](https://github.com/vitejs/vite/commit/eb22a74d29813d30be48d4413d785eedb0064b2c)), closes [#18979](https://github.com/vitejs/vite/issues/18979)
* 修复(resolve): 支持在 JS 文件中通过 JS 扩展说明符解析 TS 文件 (#18889) ([612332b](https://github.com/vitejs/vite/commit/612332b9bbe8d489265aea31c9c9a712319abc51)), closes [#18889](https://github.com/vitejs/vite/issues/18889)
* 修复(ssr): 合并空的源映射 (#19226) ([ba03da2](https://github.com/vitejs/vite/commit/ba03da2a8c9ea6b26533cbcc4e50d58dc36499e2)), closes [#19226](https://github.com/vitejs/vite/issues/19226)
* 修复(utils): 使用 `new RegExp` 而不是 `structuredClone` 克隆 `RegExp` 值 (修复 #19245, 修复 #1 ([56ad2be](https://github.com/vitejs/vite/commit/56ad2bef0353a4d00cd18789de7f4e7e5329d663)), closes [#19245](https://github.com/vitejs/vite/issues/19245) [#18875](https://github.com/vitejs/vite/issues/18875) [#19247](https://github.com/vitejs/vite/issues/19247)


### 杂项

* 重构: 弃用 `vite optimize` 命令 (#19348) ([6e0e3c0](https://github.com/vitejs/vite/commit/6e0e3c0b990f1132db923e4599e18b270baa3a93)), closes [#19348](https://github.com/vitejs/vite/issues/19348)
* 杂项: 更新弃用链接域 (#19353) ([2b2299c](https://github.com/vitejs/vite/commit/2b2299cbac37548a163f0523c0cb92eb70a9aacf)), closes [#19353](https://github.com/vitejs/vite/issues/19353)
* 文档: 重新表述浏览器范围和功能关系 (#19286) ([97569ef](https://github.com/vitejs/vite/commit/97569efd9d26b5c24d3a702d3171426f97c403cc)), closes [#19286](https://github.com/vitejs/vite/issues/19286)
* 文档: 更新 `build.manifest` jsdocs (#19332) ([4583781](https://github.com/vitejs/vite/commit/45837817dea1fd76fbc3dcf05ca7fcd46daa7b23)), closes [#19332](https://github.com/vitejs/vite/issues/19332)
* 杂项: 删除关于 `scanImports` 在 ssr 中未使用的过时代码注释 (#19285) ([fbbc6da](https://github.com/vitejs/vite/commit/fbbc6da186d72b7c2ad1efce22d42d302f673516)), closes [#19285](https://github.com/vitejs/vite/issues/19285)
* 杂项: lockfileFormats 中不必要的名称 (#19275) ([96092cb](https://github.com/vitejs/vite/commit/96092cb566ee50881edb391187d33f71af8f47b1)), closes [#19275](https://github.com/vitejs/vite/issues/19275)
* 杂项(依赖): 更新依赖 strip-literal 至 v3 (#19231) ([1172d65](https://github.com/vitejs/vite/commit/1172d655c19e689e03e6a6346eefe3ac7cc5baad)), closes [#19231](https://github.com/vitejs/vite/issues/19231)



### Beta 版更新日志


#### [6.1.0-beta.2](https://github.com/vitejs/vite/compare/v6.1.0-beta.1...v6.1.0-beta.2) (2025-02-04)

查看 [6.1.0-beta.2 更新日志](https://github.com/vitejs/vite/blob/v6.1.0-beta.2/packages/vite/CHANGELOG.md)


#### [6.1.0-beta.1](https://github.com/vitejs/vite/compare/v6.1.0-beta.0...v6.1.0-beta.1) (2025-02-04)

查看 [6.1.0-beta.1 更新日志](https://github.com/vitejs/vite/blob/v6.1.0-beta.1/packages/vite/CHANGELOG.md)


#### [6.1.0-beta.0](https://github.com/vitejs/vite/compare/v6.0.11...v6.1.0-beta.0) (2025-01-24)

查看 [6.1.0-beta.0 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.10/packages/vite/CHANGELOG.md)



## <small>6.0.11 (2025-01-21)</small>

* 修复: `preview.allowedHosts` 的特定值未被遵守 (#19246) ([aeb3ec8](https://github.com/vitejs/vite/commit/aeb3ec84a288d6be227a1284607f13428a4f14a1)), closes [#19246](https://github.com/vitejs/vite/issues/19246)
* 修复: 默认允许来自回环地址的 CORS (#19249) ([3d03899](https://github.com/vitejs/vite/commit/3d038997377a30022b6a6b7916e0b4b5d8b9a363)), closes [#19249](https://github.com/vitejs/vite/issues/19249)



## <small>6.0.10 (2025-01-20)</small>

* 修复: 尝试解析 `server.origin` URL (#19241) ([2495022](https://github.com/vitejs/vite/commit/2495022420fda05ee389c2dcf26921b21e2aed3b)), closes [#19241](https://github.com/vitejs/vite/issues/19241)



## <small>6.0.9 (2025-01-20)</small>

* 修复!: 检查主机头以防止 DNS 重新绑定攻击并引入 `server.allowedHosts` ([bd896fb](https://github.com/vitejs/vite/commit/bd896fb5f312fc0ff1730166d1d142fc0d34ba6d))
* 修复!: 默认 `server.cors: false` 以禁止来自不受信任来源的抓取 ([b09572a](https://github.com/vitejs/vite/commit/b09572acc939351f4e4c50ddf793017a92c678b1))
* 修复: 验证 HMR WebSocket 连接的令牌 ([029dcd6](https://github.com/vitejs/vite/commit/029dcd6d77d3e3ef10bc38e9a0829784d9760fdb))



## <small>6.0.8 (2025-01-20)</small>

* 修复: 避免 HTML 文件的 SSR HMR (#19193) ([3bd55bc](https://github.com/vitejs/vite/commit/3bd55bcb7e831d2c4f66c90d7bbb3e1fbf7a02b6)), closes [#19193](https://github.com/vitejs/vite/issues/19193)
* 修复: 构建时间显示 7m 60s (#19108) ([cf0d2c8](https://github.com/vitejs/vite/commit/cf0d2c8e232a1af716c71cdd2218d180f7ecc02b)), closes [#19108](https://github.com/vitejs/vite/issues/19108)
* 修复: 不要解析以双斜杠开头的 URL (#19059) ([35942cd](https://github.com/vitejs/vite/commit/35942cde11fd8a68fa89bf25f7aa1ddb87d775b2)), closes [#19059](https://github.com/vitejs/vite/issues/19059)
* 修复: 确保 `server.close()` 只被调用一次 (#19204) ([db81c2d](https://github.com/vitejs/vite/commit/db81c2dada961f40c0882b5182adf2f34bb5c178)), closes [#19204](https://github.com/vitejs/vite/issues/19204)
* 修复: ResolvedConfig 中的 resolve.conditions 是 `defaultServerConditions` (#19174) ([ad75c56](https://github.com/vitejs/vite/commit/ad75c56dce5618a3a416e18f9a5c3880d437a107)), closes [#19174](https://github.com/vitejs/vite/issues/19174)
* 修复: tree shake 字符串化的 JSON 导入 (#19189) ([f2aed62](https://github.com/vitejs/vite/commit/f2aed62d0bf1b66e870ee6b4aab80cd1702793ab)), closes [#19189](https://github.com/vitejs/vite/issues/19189)
* 修复: 使用共享的 sigterm 回调 (#19203) ([47039f4](https://github.com/vitejs/vite/commit/47039f4643179be31a8d7c7fbff83c5c13deb787)), closes [#19203](https://github.com/vitejs/vite/issues/19203)
* 修复(依赖): 更新所有非主要依赖 (#19098) ([8639538](https://github.com/vitejs/vite/commit/8639538e6498d1109da583ad942c1472098b5919)), closes [#19098](https://github.com/vitejs/vite/issues/19098)
* 修复(optimizer): 为 yarn PnP 使用正确的默认安装状态路径 (#19119) ([e690d8b](https://github.com/vitejs/vite/commit/e690d8bb1e5741e81df5b7a6a5c8c3c1c971fa41)), closes [#19119](https://github.com/vitejs/vite/issues/19119)
* 修复(types): 改进 `ESBuildOptions.include / exclude` 类型以允许 `readonly (string | RegExp)[]` ([ea53e70](https://github.com/vitejs/vite/commit/ea53e7095297ea4192490fd58556414cc59a8975)), closes [#19146](https://github.com/vitejs/vite/issues/19146)
* 杂项(依赖): 更新依赖 pathe 到 v2 (#19139) ([71506f0](https://github.com/vitejs/vite/commit/71506f0a8deda5254cb49c743cd439dfe42859ce)), closes [#19139](https://github.com/vitejs/vite/issues/19139)



## <small>6.0.7 (2025-01-02)</small>

* 修复: 当 `builder.sharedPlugins: true` 时修复 `minify` (#19025) ([f7b1964](https://github.com/vitejs/vite/commit/f7b1964d3a93a21f80b61638fa6ae9606d0a6f4f)), closes [#19025](https://github.com/vitejs/vite/issues/19025)
* 修复: 如果插件之前已经用相同的 id 和 importer 调用过，则跳过该插件 (#19016) ([b178c90](https://github.com/vitejs/vite/commit/b178c90c7d175ea31f8b67dccad3918f820357a4)), closes [#19016](https://github.com/vitejs/vite/issues/19016)
* 修复(html): 删除内联脚本的 `vite-ignore` 属性时出错 (#19062) ([a492253](https://github.com/vitejs/vite/commit/a4922537a8d705da7769d30626a0d846511fc124)), closes [#19062](https://github.com/vitejs/vite/issues/19062)
* 修复(ssr): 修复 ssr transform 注入的分号 (#19097) ([1c102d5](https://github.com/vitejs/vite/commit/1c102d517de52531faf5765632703977a17de65a)), closes [#19097](https://github.com/vitejs/vite/issues/19097)
* 性能: 在 warmup 中跳过静态路径的 globbing (#19107) ([677508b](https://github.com/vitejs/vite/commit/677508bf8268a7b8661e5557a3d0a2a76cab8bd1)), closes [#19107](https://github.com/vitejs/vite/issues/19107)
* 功能(css): 显示 lightningcss 警告 (#19076) ([b07c036](https://github.com/vitejs/vite/commit/b07c036faf6849fe5ffd03125f25dc00f460f8ba)), closes [#19076](https://github.com/vitejs/vite/issues/19076)



## <small>6.0.6 (2024-12-26)</small>

* 修复: 将 runner 端的路径规范化替换为 `fetchModule` 端的解析 (#18361) ([9f10261](https://github.com/vitejs/vite/commit/9f10261e7609098b832fd0fb23a64840b3a0d1a0)), closes [#18361](https://github.com/vitejs/vite/issues/18361)
* 修复(css): 为 lightningcss 正确解析 HTML 文件中的样式标签 (#19001) ([afff05c](https://github.com/vitejs/vite/commit/afff05c03266fc76d5ab8928215c89f5992f40f8)), closes [#19001](https://github.com/vitejs/vite/issues/19001)
* 修复(css): 当在 lightningcs 中为 CSS 模块模式使用未知占位符时显示正确的错误 ([9290d85](https://github.com/vitejs/vite/commit/9290d85b5d2ad64991bd296157cb3bcb959c341d)), closes [#19070](https://github.com/vitejs/vite/issues/19070)
* 修复(resolve): 处理带 UTF-8 BOM 的 package.json (#19000) ([902567a](https://github.com/vitejs/vite/commit/902567ac5327e915ce65d090045fa4922ef9f2b5)), closes [#19000](https://github.com/vitejs/vite/issues/19000)
* 修复(ssrTransform): 转换导入时保留行偏移 (#19004) ([1aa434e](https://github.com/vitejs/vite/commit/1aa434e8017012bf0939b2ff1a3a66b4bd12b76d)), closes [#19004](https://github.com/vitejs/vite/issues/19004)
* 杂项: 修复评论中的拼写错误 (#19067) ([eb06ec3](https://github.com/vitejs/vite/commit/eb06ec30bb02ced66274f0fc6e90aff2bb20c632)), closes [#19067](https://github.com/vitejs/vite/issues/19067)
* 杂项: 更新关于 `build.target` 的评论 (#19047) ([0e9e81f](https://github.com/vitejs/vite/commit/0e9e81f622f13d78ee238c0fa72ba920e23419f4)), closes [#19047](https://github.com/vitejs/vite/issues/19047)
* 回滚: 取消固定 esbuild 版本 (#19043) ([8bfe247](https://github.com/vitejs/vite/commit/8bfe247511517c631a26f3931bb3c93a7b0b7446)), closes [#19043](https://github.com/vitejs/vite/issues/19043)
* 测试(ssr): 测试带查询的虚拟模块 (#19044) ([a1f4b46](https://github.com/vitejs/vite/commit/a1f4b46896cb4b442b54a8336db8eca6df9ee02d)), closes [#19044](https://github.com/vitejs/vite/issues/19044)



## <small>6.0.5 (2024-12-20)</small>

* 修复: esbuild 回归 (固定到 0.24.0) (#19027) ([4359e0d](https://github.com/vitejs/vite/commit/4359e0d5b33afd6259a4dcef787cc2670e963126)), closes [#19027](https://github.com/vitejs/vite/issues/19027)



## <small>6.0.4 (2024-12-19)</small>

* 修复: `this.resolve` skipSelf 不应为不同的 `id` 或 `import` 跳过 (#18903) ([4727320](https://github.com/vitejs/vite/commit/472732057cb2273908e1fca8aa7dc18a7e1f7c74)), closes [#18903](https://github.com/vitejs/vite/issues/18903)
* 修复: 当使用函数选项时，回退 terser 到主线程 (#18987) ([12b612d](https://github.com/vitejs/vite/commit/12b612d8be2a18456fd94a2f0291d32d1ffb29d4)), closes [#18987](https://github.com/vitejs/vite/issues/18987)
* 修复: 合并 `pluginContainer.getModuleInfo` 的客户端和 ssr 值 (#18895) ([258cdd6](https://github.com/vitejs/vite/commit/258cdd637d1ee80a3c4571685135e89fe283f3a6)), closes [#18895](https://github.com/vitejs/vite/issues/18895)
* 修复(css): 当使用 lightningcss 时，转义 `url()` 中的双引号 (#18997) ([3734f80](https://github.com/vitejs/vite/commit/3734f8099e3922c189497ce404fe7ff2f8929ae1)), closes [#18997](https://github.com/vitejs/vite/issues/18997)
* 修复(css): 在 Windows 上的 sass 现代 API 中的根相对导入 (#18945) ([c4b532c](https://github.com/vitejs/vite/commit/c4b532cc900bf988073583511f57bd581755d5e3)), closes [#18945](https://github.com/vitejs/vite/issues/18945)
* 修复(css): 在自定义 sass 导入器中跳过非 css (#18970) ([21680bd](https://github.com/vitejs/vite/commit/21680bdf9ca7c12f677136b56e47f46469db8be2)), closes [#18970](https://github.com/vitejs/vite/issues/18970)
* 修复(依赖): 更新所有非主要依赖 (#18967) ([d88d000](https://github.com/vitejs/vite/commit/d88d0004a8e891ca6026d356695e0b319caa7fce)), closes [#18967](https://github.com/vitejs/vite/issues/18967)
* 修复(依赖): 更新所有非主要依赖 (#18996) ([2b4f115](https://github.com/vitejs/vite/commit/2b4f115129fb3fbd730a92078acb724f8527b7f7)), closes [#18996](https://github.com/vitejs/vite/issues/18996)
* 修复(optimizer): 当 keepProcessEnv 为 `true` 时保持 NODE_ENV 不变 (#18899) ([8a6bb4e](https://github.com/vitejs/vite/commit/8a6bb4e11d5c1b61511ae1e5ed3ae3c65a33b2dc)), closes [#18899](https://github.com/vitejs/vite/issues/18899)
* 修复(ssr): 在重启时重新创建 ssrCompatModuleRunner (#18973) ([7d6dd5d](https://github.com/vitejs/vite/commit/7d6dd5d1d655d173668192509f63ac4ebf7af299)), closes [#18973](https://github.com/vitejs/vite/issues/18973)
* 杂项: 为 dts 构建提供更好的验证错误消息 (#18948) ([63b82f1](https://github.com/vitejs/vite/commit/63b82f1e29a00d06a82144fd03ea8d6eff114290)), closes [#18948](https://github.com/vitejs/vite/issues/18948)
* 杂项(依赖): 更新所有非主要依赖 (#18916) ([ef7a6a3](https://github.com/vitejs/vite/commit/ef7a6a35e6827b92445e5a0c2c0022616efc80dd)), closes [#18916](https://github.com/vitejs/vite/issues/18916)
* 杂项(依赖): 更新依赖 @rollup/plugin-node-resolve 到 v16 (#18968) ([62fad6d](https://github.com/vitejs/vite/commit/62fad6d79f83daf916dde866909a2a3dd0c79583)), closes [#18968](https://github.com/vitejs/vite/issues/18968)
* 重构: 使内部调用事件使用与 `handleInvoke` 相同的接口 (#18902) ([27f691b](https://github.com/vitejs/vite/commit/27f691b0c7dca2259108fe6b79583b459429bf7f)), closes [#18902](https://github.com/vitejs/vite/issues/18902)
* 重构: 简化清单插件代码 (#18890) ([1bfe21b](https://github.com/vitejs/vite/commit/1bfe21b9440f318c940f90e425a18588595225fd)), closes [#18890](https://github.com/vitejs/vite/issues/18890)
* 测试: 测试 `ModuleRunnerTransport` `invoke` API (#18865) ([e5f5301](https://github.com/vitejs/vite/commit/e5f5301924b775837b2a1253c37f76555bce3e3e)), closes [#18865](https://github.com/vitejs/vite/issues/18865)
* 测试: 测试输出哈希变化 (#18898) ([bfbb130](https://github.com/vitejs/vite/commit/bfbb130fccefbe7e3880f09defb4fceacce39481)), closes [#18898](https://github.com/vitejs/vite/issues/18898)



## <small>6.0.3 (2024-12-05)</small>

* 修复: 处理 postcss 加载未处理的拒绝 (#18886) ([d5fb653](https://github.com/vitejs/vite/commit/d5fb653c15903ccf84a093f212da86f0327a9a6f)), closes [#18886](https://github.com/vitejs/vite/issues/18886)
* 修复: 使 handleInvoke 接口与 invoke 兼容 (#18876) ([a1dd396](https://github.com/vitejs/vite/commit/a1dd396da856401a12c921d0cd2c4e97cb63f1b5)), closes [#18876](https://github.com/vitejs/vite/issues/18876)
* 修复: 使 `ModuleRunnerTransport#invoke` 的结果接口更明确 (#18851) ([a75fc31](https://github.com/vitejs/vite/commit/a75fc3193d5e8d8756dfb3a046873e9c222bb6c8)), closes [#18851](https://github.com/vitejs/vite/issues/18851)
* 修复: 将 `environments.ssr.resolve` 与根 `ssr` 配置合并 (#18857) ([3104331](https://github.com/vitejs/vite/commit/310433106e1e8a0c39dc397e3eace8a71a2416c2)), closes [#18857](https://github.com/vitejs/vite/issues/18857)
* 修复: 没有创建 vite 配置文件的权限 (#18844) ([ff47778](https://github.com/vitejs/vite/commit/ff47778004d609dbeef7f192783e6f253dd66237)), closes [#18844](https://github.com/vitejs/vite/issues/18844)
* 修复: 在某些情况下正确删除 CJS 中的 CSS 导入 (#18885) ([690a36f](https://github.com/vitejs/vite/commit/690a36ffdb7d6f6568f35a304b4904e7aa475f17)), closes [#18885](https://github.com/vitejs/vite/issues/18885)
* 修复(config): 打包通过 imports 字段引用的文件 (#18887) ([2b5926a](https://github.com/vitejs/vite/commit/2b5926a0e79ce47d22536d38eed2629d326caca0)), closes [#18887](https://github.com/vitejs/vite/issues/18887)
* 修复(config): 启用 sourcemap 时使堆栈跟踪路径正确 (#18833) ([20fdf21](https://github.com/vitejs/vite/commit/20fdf210ee0ac0824b2db74876527cb7f378a9e8)), closes [#18833](https://github.com/vitejs/vite/issues/18833)
* 修复(css): 当 image-set 和 url 同时存在时重写 url (#18868) ([d59efd8](https://github.com/vitejs/vite/commit/d59efd8dfd1c5bf2e7c45c7cdb1c0abc2a05ba02)), closes [#18868](https://github.com/vitejs/vite/issues/18868)
* 修复(依赖): 更新所有非主要依赖 (#18853) ([5c02236](https://github.com/vitejs/vite/commit/5c0223636fa277d5daeb4d93c3f32d9f3cd69fc5)), closes [#18853](https://github.com/vitejs/vite/issues/18853)
* 修复(html): 允许标签名中出现意外的问号 (#18852) ([1b54e50](https://github.com/vitejs/vite/commit/1b54e506a44420d0c8a9e000cf45b1c4f5e33026)), closes [#18852](https://github.com/vitejs/vite/issues/18852)
* 修复(module-runner): 解码传递给 import 的文件 url 的 uri (#18837) ([88e49aa](https://github.com/vitejs/vite/commit/88e49aa0418cb3f6b579b744ba59daeda68432f3)), closes [#18837](https://github.com/vitejs/vite/issues/18837)
* 重构: 修复 no-unnecessary-condition 规则发现的逻辑错误 (#18891) ([ea802f8](https://github.com/vitejs/vite/commit/ea802f8f8bcf3771a35c1eaf687378613fbabb24)), closes [#18891](https://github.com/vitejs/vite/issues/18891)
* 杂项: 修复注释中重复属性的问题编号 (#18860) ([ffee618](https://github.com/vitejs/vite/commit/ffee61893cfe9f2b0db4aecf9ddb62ca79c80458)), closes [#18860](https://github.com/vitejs/vite/issues/18860)



## <small>6.0.2 (2024-12-02)</small>

* 杂项: 在单元测试中运行类型检查 (#18858) ([49f20bb](https://github.com/vitejs/vite/commit/49f20bb77749ec7b44344fd9c42d593ae20c78f0)), closes [#18858](https://github.com/vitejs/vite/issues/18858)
* 杂项: 更新更新日志中的损坏链接 (#18802) ([cb754f8](https://github.com/vitejs/vite/commit/cb754f8acc1b579dae9fe70a08e3ef53984402cc)), closes [#18802](https://github.com/vitejs/vite/issues/18802)
* 杂项: 更新更新日志中的损坏链接 (#18804) ([47ec49f](https://github.com/vitejs/vite/commit/47ec49ffa170cac5d04cf2eef01f45e0b5ccde03)), closes [#18804](https://github.com/vitejs/vite/issues/18804)
* 修复: 如果是 deno，则不要将临时 vite 配置文件存储在 `node_modules` 中 (#18823) ([a20267b](https://github.com/vitejs/vite/commit/a20267bb93118468a2e20f0f77b77ed7bfa94165)), closes [#18823](https://github.com/vitejs/vite/issues/18823)
* 修复(css): 启用 lightningcss 后引用别名 svg 资源时出错 (#18819) ([ae68958](https://github.com/vitejs/vite/commit/ae6895869157e48b32088f0a1f85d2fddb2d713f)), closes [#18819](https://github.com/vitejs/vite/issues/18819)
* 修复(manifest): 对 `cssCodesplit: false` 时，样式文件的键使用 `style.css` (#18820) ([ec51115](https://github.com/vitejs/vite/commit/ec511152558cb573acf55e88e5244bdead1b5a17)), closes [#18820](https://github.com/vitejs/vite/issues/18820)
* 修复(optimizer): 取消时解析所有 promise (#18826) ([d6e6194](https://github.com/vitejs/vite/commit/d6e6194706f0e3a889caa9303de2293cc0f131b2)), closes [#18826](https://github.com/vitejs/vite/issues/18826)
* 修复(resolve): 默认情况下不将 builtinModules 设置为 `external` (#18821) ([2250ffa](https://github.com/vitejs/vite/commit/2250ffac62e55c89232d745d2f99ece539be9195)), closes [#18821](https://github.com/vitejs/vite/issues/18821)
* 修复(ssr): 将 `ssr.target: 'webworker'` 默认值作为后备 (#18827) ([b39e696](https://github.com/vitejs/vite/commit/b39e69638b3e2e658ff6712be83b549b28103c3d)), closes [#18827](https://github.com/vitejs/vite/issues/18827)
* 功能(css): 格式化 lightningcss 错误 (#18818) ([dac7992](https://github.com/vitejs/vite/commit/dac7992e8725234007c7515f86f543992874c7b8)), closes [#18818](https://github.com/vitejs/vite/issues/18818)
* 重构: 使 ResolvedServerOptions 和 ResolvedPreviewOptions 的属性为必需 (#18796) ([51a5569](https://github.com/vitejs/vite/commit/51a5569e66bd7f0de79ac14b9e902d1382ccd0aa)), closes [#18796](https://github.com/vitejs/vite/issues/18796)



## <small>6.0.1 (2024-11-27)</small>

* 修复: 默认空的服务器 `proxy` 会阻止启动 http2 服务器 (#18788) ([bbaf514](https://github.com/vitejs/vite/commit/bbaf514fb718952e0f17a15545c593125f1d1b9c)), closes [#18788](https://github.com/vitejs/vite/issues/18788)
* 修复(manifest): 不要覆盖现有的 js 清单条目 (#18776) ([3b0837e](https://github.com/vitejs/vite/commit/3b0837e0b997e14dacc347719353b8b0cea35bda)), closes [#18776](https://github.com/vitejs/vite/issues/18776)
* 修复(server): 在服务器关闭时关闭 _ssrCompatModuleRunner (#18784) ([9b4c410](https://github.com/vitejs/vite/commit/9b4c410dddb80c8858549355e175735976a82134)), closes [#18784](https://github.com/vitejs/vite/issues/18784)
* 修复(server): 为 wsServer 跳过热通道客户端规范化 (#18782) ([cc7670a](https://github.com/vitejs/vite/commit/cc7670abaffeda1338cf3acfef2bc41a38c223a0)), closes [#18782](https://github.com/vitejs/vite/issues/18782)
* 修复(worker): 修复 worker 构建时的 `applyToEnvironment` 钩子 (#18793) ([0c6cdb0](https://github.com/vitejs/vite/commit/0c6cdb0f88d32ce041272977e786006008223f44)), closes [#18793](https://github.com/vitejs/vite/issues/18793)
* 杂项: 扁平化 v6 配置文件 (#18777) ([c7b3308](https://github.com/vitejs/vite/commit/c7b330832675ee6385ee1a8750762e496c8e18e6)), closes [#18777](https://github.com/vitejs/vite/issues/18777)
* 杂项: 拆分更新日志 (#18787) ([8542632](https://github.com/vitejs/vite/commit/8542632b3b205b61999b6d998928d5fb17ba90c4)), closes [#18787](https://github.com/vitejs/vite/issues/18787)
* 杂项: 更新 v6 的更新日志 (#18773) ([b254fac](https://github.com/vitejs/vite/commit/b254fac4aa35a3522aeafb3259e60acd050aeb51)), closes [#18773](https://github.com/vitejs/vite/issues/18773)
* 回滚: 更新 moduleResolution 值的大小写 (#18409) (#18774) ([b0fc6e3](https://github.com/vitejs/vite/commit/b0fc6e3c2591a30360d3714263cf7cc0e2acbfdf)), closes [#18409](https://github.com/vitejs/vite/issues/18409) [#18774](https://github.com/vitejs/vite/issues/18774)



## 6.0.0 (2024-11-26)

![Vite 6 来了!](../../docs/public/og-image-announcing-vite6.png)

今天，我们在 Vite 的故事中又迈出了一大步。Vite [团队](https://vite.dev/team)、[贡献者](https://github.com/vitejs/vite/graphs/contributors)和生态系统合作伙伴激动地宣布发布下一个 Vite 主要版本：

- **[Vite 6.0 公告博文](https://vite.dev/blog/announcing-vite6.html)**
- [文档](https://vite.dev/)
- 翻译: [简体中文](https://cn.vite.dev/), [日本語](https://ja.vite.dev/), [Español](https://es.vite.dev/), [Português](https://pt.vite.dev/), [한국어](https://ko.vite.dev/), [Deutsch](https://de.vite.dev/)
- [迁移指南](https://vite.dev/guide/migration.html)

我们要感谢超过 [1K 的 Vite Core 贡献者](https://github.com/vitejs/vite/graphs/contributors)以及 Vite 插件、集成、工具和翻译的维护者和贡献者，他们帮助我们打造了这个新的主要版本。我们邀请您参与进来，帮助我们为整个生态系统改进 Vite。在我们的[贡献指南](https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md)中了解更多信息。



### 重大变更

* 功能!: 在版本范围中放弃对 node 21 的支持 (#18729) ([a384d8f](https://github.com/vitejs/vite/commit/a384d8fd39162190675abcfea31ba657383a3d03)), closes [#18729](https://github.com/vitejs/vite/issues/18729)
* 修复(依赖)!: 更新依赖 dotenv-expand 到 v12 (#18697) ([0c658de](https://github.com/vitejs/vite/commit/0c658de41f4c1576c526a8c48a8ea0a019c6311c)), closes [#18697](https://github.com/vitejs/vite/issues/18697)
* 功能(html)!: 支持更多资源来源 (#11138) ([8a7af50](https://github.com/vitejs/vite/commit/8a7af50b5ddf72f21098406e9668bc609b323899)), closes [#11138](https://github.com/vitejs/vite/issues/11138)
* 功能(resolve)!: 允许删除条件 (#18395) ([d002e7d](https://github.com/vitejs/vite/commit/d002e7d05a0f23110f9185b39222819bcdfffc16)), closes [#18395](https://github.com/vitejs/vite/issues/18395)
* 重构!: 移除 fs.cachedChecks 选项 (#18493) ([94b0857](https://github.com/vitejs/vite/commit/94b085735372588d5f92c7f4a8cf68e8291f2db0)), closes [#18493](https://github.com/vitejs/vite/issues/18493)
* 功能!: 使用 WebSocket 的代理绕过 (#18070) ([3c9836d](https://github.com/vitejs/vite/commit/3c9836d96f118ff5748916241bc3871a54247ad1)), closes [#18070](https://github.com/vitejs/vite/issues/18070)
* 功能!: 支持 `file://` 解析 (#18422) ([6a7e313](https://github.com/vitejs/vite/commit/6a7e313754dce5faa5cd7c1e2343448cd7f3a2a2)), closes [#18422](https://github.com/vitejs/vite/issues/18422)
* 功能!: 更新到 chokidar v4 (#18453) ([192d555](https://github.com/vitejs/vite/commit/192d555f88bba7576e8a40cc027e8a11e006079c)), closes [#18453](https://github.com/vitejs/vite/issues/18453)
* 功能(lib)!: 使用包名作为 css 输出文件名 (#18488) ([61cbf6f](https://github.com/vitejs/vite/commit/61cbf6f2cfcd5afc91fe0a0ad56abfc36a32f1ab)), closes [#18488](https://github.com/vitejs/vite/issues/18488)
* 修复(css)!: 在 ssr 开发中移除默认导入 (#17922) ([eccf663](https://github.com/vitejs/vite/commit/eccf663e35a17458425860895bb30b3b0613ea96)), closes [#17922](https://github.com/vitejs/vite/issues/17922)
* 杂项(依赖)!: 更新 postcss-load-config 到 v6 (#15235) ([3a27f62](https://github.com/vitejs/vite/commit/3a27f627df278f6c9778a55f44cb347665b65204)), closes [#15235](https://github.com/vitejs/vite/issues/15235)
* 功能(css)!: 将默认 sass api 更改为 modern/modern-compiler (#17937) ([d4e0442](https://github.com/vitejs/vite/commit/d4e0442f9d6adc70b72ea0713dc8abb4b1f75ae4)), closes [#17937](https://github.com/vitejs/vite/issues/17937)
* 功能(css)!: 仅在工作区根目录内加载 postcss 配置 (#18440) ([d23a493](https://github.com/vitejs/vite/commit/d23a493cc4b54a2e2b2c1337b3b1f0c9b1be311e)), closes [#18440](https://github.com/vitejs/vite/issues/18440)
* 功能(json)!: 添加 `json.stringify: 'auto'` 并使其成为默认值 (#18303) ([b80daa7](https://github.com/vitejs/vite/commit/b80daa7c0970645dca569d572892648f66c6799c)), closes [#18303](https://github.com/vitejs/vite/issues/18303)
* 修复!: 默认 `build.cssMinify` 为 SSR 的 `'esbuild'` (#15637) ([f1d3bf7](https://github.com/vitejs/vite/commit/f1d3bf74cc7f12e759442fd7111d07e2c0262a67)), closes [#15637](https://github.com/vitejs/vite/issues/15637)
* 杂项(依赖)!: 将 `fast-glob` 迁移到 `tinyglobby` (#18243) ([6f74a3a](https://github.com/vitejs/vite/commit/6f74a3a1b2469a24a86743d16267b0cc3653bc4a)), closes [#18243](https://github.com/vitejs/vite/issues/18243)
* 重构!: 将最低 terser 版本提升到 5.16.0 (#18209) ([19ce525](https://github.com/vitejs/vite/commit/19ce525b974328e4668ad8c6540c2a5ea652795b)), closes [#18209](https://github.com/vitejs/vite/issues/18209)
* 功能!: 环境 API (#16471) ([242f550](https://github.com/vitejs/vite/commit/242f550eb46c93896fca6b55495578921e29a8af)), closes [#16471](https://github.com/vitejs/vite/issues/16471)


### 功能

* 功能: 添加对 .cur 类型的支持 (#18680) ([5ec9eed](https://github.com/vitejs/vite/commit/5ec9eedc80bbf39a33b498198ba07ed1bd9cacc7)), closes [#18680](https://github.com/vitejs/vite/issues/18680)
* 功能: 在 ModuleRunner 端默认启用 HMR (#18749) ([4d2abc7](https://github.com/vitejs/vite/commit/4d2abc7bba95cf516ce7341d5d8f349d61b75224)), closes [#18749](https://github.com/vitejs/vite/issues/18749)
* 功能: 如果启用，则在加载配置时支持 `module-sync` 条件 (#18650) ([cf5028d](https://github.com/vitejs/vite/commit/cf5028d4bf0a0d59b4a98323beaadc268204056b)), closes [#18650](https://github.com/vitejs/vite/issues/18650)
* 功能: 将 `isSsrTargetWebWorker` 标志添加到 `configEnvironment` 钩子 (#18620) ([3f5fab0](https://github.com/vitejs/vite/commit/3f5fab04aa64c0e9b45068e842f033583b365de0)), closes [#18620](https://github.com/vitejs/vite/issues/18620)
* 功能: 添加 `ssr.resolve.mainFields` 选项 (#18646) ([a6f5f5b](https://github.com/vitejs/vite/commit/a6f5f5baca7a5d2064f5f4cb689764ad939fab4b)), closes [#18646](https://github.com/vitejs/vite/issues/18646)
* 功能: 暴露默认的 mainFields/conditions (#18648) ([c12c653](https://github.com/vitejs/vite/commit/c12c653ca5fab354e0f71394e2fbe636dccf6b2f)), closes [#18648](https://github.com/vitejs/vite/issues/18648)
* 功能: 扩展的 applyToEnvironment 和 perEnvironmentPlugin (#18544) ([8fa70cd](https://github.com/vitejs/vite/commit/8fa70cdfa65ce8254ab8da8be0d92614126764c0)), closes [#18544](https://github.com/vitejs/vite/issues/18544)
* 功能: 在 CJS 构建中访问未暴露的变量时显示错误 (#18649) ([87c5502](https://github.com/vitejs/vite/commit/87c55022490d4710934c482abf5fbd4fcda9c3c9)), closes [#18649](https://github.com/vitejs/vite/issues/18649)
* 功能(optimizer): 允许用户指定他们的 esbuild `platform` 选项 (#18611) ([0924879](https://github.com/vitejs/vite/commit/09248795ca79a7053b803af8977c3422f5cd5824)), closes [#18611](https://github.com/vitejs/vite/issues/18611)
* 重构: 引入 `mergeWithDefaults` 并组织配置选项默认值的设置方式 ( ([0e1f437](https://github.com/vitejs/vite/commit/0e1f437d53683b57f0157ce3ff0b0f02acabb408)), closes [#18550](https://github.com/vitejs/vite/issues/18550)
* 构建: 忽略 cjs 警告 (#18660) ([33b0d5a](https://github.com/vitejs/vite/commit/33b0d5a6ca18e9f7c27b0159decd84fee3859e09)), closes [#18660](https://github.com/vitejs/vite/issues/18660)
* 功能: 使用单一传输支持 fetchModule 和 HMR (#18362) ([78dc490](https://github.com/vitejs/vite/commit/78dc4902ffef7f316e84d21648b04dc62dd0ae0a)), closes [#18362](https://github.com/vitejs/vite/issues/18362)
* 功能(asset): 添加 `?inline` 和 `?no-inline` 查询来控制内联 (#15454) ([9162172](https://github.com/vitejs/vite/commit/9162172e039ae67ad4ee8dce18f04b7444f7d9de)), closes [#15454](https://github.com/vitejs/vite/issues/15454)
* 功能(asset): 如果在限制范围内，则在开发中内联 svg (#18581) ([f08b146](https://github.com/vitejs/vite/commit/f08b1463db50f39b571faa871d05c92b10f3434c)), closes [#18581](https://github.com/vitejs/vite/issues/18581)
* 功能: 在调试模式下记录完整配置 (#18289) ([04f6736](https://github.com/vitejs/vite/commit/04f6736fd7ac3da22141929c01a151f5a6fe4e45)), closes [#18289](https://github.com/vitejs/vite/issues/18289)
* 功能(html): 支持 `vite-ignore` 属性以选择退出处理 (#18494) ([d951310](https://github.com/vitejs/vite/commit/d9513104e21175e1d23e0f614df55cd53291ab4e)), closes [#18494](https://github.com/vitejs/vite/issues/18494)
* 功能: 允许在 `createLogger` 中自定义 `console` (#18379) ([0c497d9](https://github.com/vitejs/vite/commit/0c497d9cb63bd4a6bb8e01c0e3b843890a239d23)), closes [#18379](https://github.com/vitejs/vite/issues/18379)
* 功能: 读取 `sec-fetch-dest` 头以在转换中检测 JS (#9981) ([e51dc40](https://github.com/vitejs/vite/commit/e51dc40b5907cf14d7aefaaf01fb8865a852ef15)), closes [#9981](https://github.com/vitejs/vite/issues/9981)
* 功能(css): 添加更严格的 lightningcss 类型 (#18460) ([b9b925e](https://github.com/vitejs/vite/commit/b9b925eb3f911ab63972124dc8ab0455449b925d)), closes [#18460](https://github.com/vitejs/vite/issues/18460)
* 功能: 默认将 .git 添加到拒绝列表 (#18382) ([105ca12](https://github.com/vitejs/vite/commit/105ca12b34e466dc9de838643954a873ac1ce804)), closes [#18382](https://github.com/vitejs/vite/issues/18382)
* 功能: 添加 `environment::listen` (#18263) ([4d5f51d](https://github.com/vitejs/vite/commit/4d5f51d13f92cc8224a028c27df12834a0667659)), closes [#18263](https://github.com/vitejs/vite/issues/18263)
* 功能: 在 ssr 环境中启用依赖发现和预打包 (#18358) ([9b21f69](https://github.com/vitejs/vite/commit/9b21f69405271f1b864fa934a96adcb0e1a2bc4d)), closes [#18358](https://github.com/vitejs/vite/issues/18358)
* 功能: 限制可用于环境名称的字符 (#18255) ([9ab6180](https://github.com/vitejs/vite/commit/9ab6180d3a20be71eb7aedef000f8c4ae3591c40)), closes [#18255](https://github.com/vitejs/vite/issues/18255)
* 功能: 支持从 cjs 依赖中导入任意模块命名空间标识符 (#18236) ([4389a91](https://github.com/vitejs/vite/commit/4389a917f8f5e8e67222809fb7b166bb97f6d02c)), closes [#18236](https://github.com/vitejs/vite/issues/18236)
* 功能: 引入 RunnableDevEnvironment (#18190) ([fb292f2](https://github.com/vitejs/vite/commit/fb292f226f988e80fee4f4aea878eb3d5d229022)), closes [#18190](https://github.com/vitejs/vite/issues/18190)
* 功能: 在 `options` 和 `onLog` 钩子中支持 `this.environment` (#18142) ([7722c06](https://github.com/vitejs/vite/commit/7722c061646bc8587f55f560bfe06b2a9643639a)), closes [#18142](https://github.com/vitejs/vite/issues/18142)
* 功能: 暴露 `EnvironmentOptions` 类型 (#18080) ([35cf59c](https://github.com/vitejs/vite/commit/35cf59c9d53ef544eb5f2fe2f9ff4d6cb225e63b)), closes [#18080](https://github.com/vitejs/vite/issues/18080)
* 功能(css): 支持 lightningcss 的 es2023 构建目标 (#17998) ([1a76300](https://github.com/vitejs/vite/commit/1a76300cd16827f0640924fdc21747ce140c35fb)), closes [#17998](https://github.com/vitejs/vite/issues/17998)


### 性能

* 性能: 为 `Object.keys(import.meta.glob(...))` / `Object.values(import.meta.glob( ([ed99a2c](https://github.com/vitejs/vite/commit/ed99a2cd31e8d3c2b791885bcc4b188570539e45)), closes [#18666](https://github.com/vitejs/vite/issues/18666)
* 性能(worker): 无需 base64 内联 worker (#18752) ([90c66c9](https://github.com/vitejs/vite/commit/90c66c95aba3d2edd86637a77adc699f3fd6c1ff)), closes [#18752](https://github.com/vitejs/vite/issues/18752)
* 性能: 为 node 内置模块移除 strip-ansi (#18630) ([5182272](https://github.com/vitejs/vite/commit/5182272d52fc092a6219c8efe73ecb3f8e65a0b5)), closes [#18630](https://github.com/vitejs/vite/issues/18630)
* 性能(css): 如果是代码分割 css，则跳过 style.css 的提取 (#18470) ([34fdb6b](https://github.com/vitejs/vite/commit/34fdb6bef558724330d2411b9666facef669b3a0)), closes [#18470](https://github.com/vitejs/vite/issues/18470)
* 性能: 调用 `module.enableCompileCache()` (#18323) ([18f1dad](https://github.com/vitejs/vite/commit/18f1daddd125b07dcb8c32056ee0cec61bd65971)), closes [#18323](https://github.com/vitejs/vite/issues/18323)
* 性能: 当可用时使用 `crypto.hash` (#18317) ([2a14884](https://github.com/vitejs/vite/commit/2a148844cf2382a5377b75066351f00207843352)), closes [#18317](https://github.com/vitejs/vite/issues/18317)
* 构建: 减小包大小 (#18517) ([b83f60b](https://github.com/vitejs/vite/commit/b83f60b159f3b6f4a61db180fa03cc5b20bd110f)), closes [#18517](https://github.com/vitejs/vite/issues/18517)

### 修复

* 修复: `createRunnableDevEnvironment` 返回 `RunnableDevEnvironment`，而不是 `DevEnvironment` (#18673) ([74221c3](https://github.com/vitejs/vite/commit/74221c391bffd61b9ef39b7c0f9ea2e405913a6f)), closes [#18673](https://github.com/vitejs/vite/issues/18673)
* 修复: `getModulesByFile` 应该返回一个 `serverModule` (#18715) ([b80d5ec](https://github.com/vitejs/vite/commit/b80d5ecbbcc374bd8f32b2ed5ceb3cbfffaae77b)), closes [#18715](https://github.com/vitejs/vite/issues/18715)
* 修复: 捕获全量重载处理程序中的错误 (#18713) ([a10e741](https://github.com/vitejs/vite/commit/a10e7410656d3614cbfd07ba772776ff334a8d60)), closes [#18713](https://github.com/vitejs/vite/issues/18713)
* 修复: 显示预转换错误详情 (#18764) ([554f45f](https://github.com/vitejs/vite/commit/554f45f4d820c57c0874ebe48ef2fddfafdd0750)), closes [#18764](https://github.com/vitejs/vite/issues/18764)
* 修复: `SIGTERM` 的退出码 (#18741) ([cc55e36](https://github.com/vitejs/vite/commit/cc55e36dd39fef134568f53acc66514cbb7175ea)), closes [#18741](https://github.com/vitejs/vite/issues/18741)
* 修复: 暴露缺失的 `InterceptorOptions` 类型 (#18766) ([6252c60](https://github.com/vitejs/vite/commit/6252c6035695365c93773fbe06a4b2a307e86368)), closes [#18766](https://github.com/vitejs/vite/issues/18766)
* 修复: 在模块运行器中发送失败时记录错误 (#18753) ([ba821bb](https://github.com/vitejs/vite/commit/ba821bb63eca6d8a9199ee2253ef2607375f5702)), closes [#18753](https://github.com/vitejs/vite/issues/18753)
* 修复(client): 加载多个 vite 客户端时覆盖层不出现 (#18647) ([27d70b5](https://github.com/vitejs/vite/commit/27d70b5fa61f1c1a836d52809549cb57569f42a4)), closes [#18647](https://github.com/vitejs/vite/issues/18647)
* 修复(依赖): 更新所有非主要依赖 (#18691) ([f005461](https://github.com/vitejs/vite/commit/f005461ecce89ada21cb0c021f7af460b5479736)), closes [#18691](https://github.com/vitejs/vite/issues/18691)
* 修复(html): 修复内联代理模块的失效问题 (#18696) ([8ab04b7](https://github.com/vitejs/vite/commit/8ab04b70ada119fbca2fc5a53c36f233423febbe)), closes [#18696](https://github.com/vitejs/vite/issues/18696)
* 修复(module-runner): 使 evaluator 可选 (#18672) ([fd1283f](https://github.com/vitejs/vite/commit/fd1283fe27cc1a19b5c7d9d72664832e4daa1bbf)), closes [#18672](https://github.com/vitejs/vite/issues/18672)
* 修复(optimizer): 正确检测 npm / yarn / pnpm 依赖变化 (#17336) (#18560) ([818cf3e](https://github.com/vitejs/vite/commit/818cf3e7bf1b6c2dc56e7cd8f056bc1d185c2cd7)), closes [#17336](https://github.com/vitejs/vite/issues/17336) [#18560](https://github.com/vitejs/vite/issues/18560)
* 修复(optimizer): 手动包含的依赖注册后触发 onCrawlEnd (#18733) ([dc60410](https://github.com/vitejs/vite/commit/dc6041099ccd5767764fb8c99a169869bbd13f16)), closes [#18733](https://github.com/vitejs/vite/issues/18733)
* 修复(optimizer): 解决 firefox 对无源 source map 的错误警告 (#18665) ([473424e](https://github.com/vitejs/vite/commit/473424ee8d6b743c1565bf0749deb5d9fbedcea7)), closes [#18665](https://github.com/vitejs/vite/issues/18665)
* 修复(ssr): 用 `(0, ...)` 替换 `__vite_ssr_identity__` 并在语句之间注入 `;` (#18748) ([94546be](https://github.com/vitejs/vite/commit/94546be18354a457bced5107aa31533b09e304ec)), closes [#18748](https://github.com/vitejs/vite/issues/18748)
* 重构: 第一个字符判断替换 regexp (#18658) ([58f1df3](https://github.com/vitejs/vite/commit/58f1df3288b0f9584bb413dd34b8d65671258f6f)), closes [#18658](https://github.com/vitejs/vite/issues/18658)
* 重构(resolve): 从 `tryNodeResolve` 中移除 `allowLinkedExternal` 参数 (#18670) ([b74d363](https://github.com/vitejs/vite/commit/b74d3632693b6a829b4d1cdc2a9d4ba8234c093b)), closes [#18670](https://github.com/vitejs/vite/issues/18670)
* 回滚: 使用 chokidar v3 (#18659) ([49783da](https://github.com/vitejs/vite/commit/49783da298bc45f3f3c5ad4ce2fb1260ee8856bb)), closes [#18659](https://github.com/vitejs/vite/issues/18659)
* 修复: perEnvironmentState 等的 cjs 构建 (#18656) ([95c4b3c](https://github.com/vitejs/vite/commit/95c4b3c371dc7fb12c28cb1307f6f389887eb1e1)), closes [#18656](https://github.com/vitejs/vite/issues/18656)
* 修复: 在仅前缀模块列表中包含更多模块 (#18667) ([5a2103f](https://github.com/vitejs/vite/commit/5a2103f0d486a7725c23c70710b11559c00e9b93)), closes [#18667](https://github.com/vitejs/vite/issues/18667)
* 修复(html): 正确地外部化 `rollup.external` 脚本 (#18618) ([55461b4](https://github.com/vitejs/vite/commit/55461b43329db6a5e737eab591163a8681ba9230)), closes [#18618](https://github.com/vitejs/vite/issues/18618)
* 修复(ssr): 格式化 `ssrTransform` 解析错误 (#18644) ([d9be921](https://github.com/vitejs/vite/commit/d9be92187cb17d740856af27d0ab60c84e04d58c)), closes [#18644](https://github.com/vitejs/vite/issues/18644)
* 修复(ssr): 保留 fetchModule 错误详情 (#18626) ([866a433](https://github.com/vitejs/vite/commit/866a433a34ab2f6d2910506e781b346091de1b9e)), closes [#18626](https://github.com/vitejs/vite/issues/18626)
* 修复: 对于 `consumer: 'server'`，默认不应包含 browser 字段 (#18575) ([87b2347](https://github.com/vitejs/vite/commit/87b2347a13ea8ae8282f0f1e2233212c040bfed8)), closes [#18575](https://github.com/vitejs/vite/issues/18575)
* 修复: 使用 `server.perEnvironmentStartEndDuringDev` (#18549) ([fe30349](https://github.com/vitejs/vite/commit/fe30349d350ef08bccd56404ccc3e6d6e0a2e156)), closes [#18549](https://github.com/vitejs/vite/issues/18549)
* 修复(client): 正确检测 ws 关闭 (#18548) ([637d31b](https://github.com/vitejs/vite/commit/637d31bcc59d964e51f7969093cc369deee88ca1)), closes [#18548](https://github.com/vitejs/vite/issues/18548)
* 修复(resolve): 为 SSR 运行 ensureVersionQuery (#18591) ([63207e5](https://github.com/vitejs/vite/commit/63207e5d0fbedc8ddddb7d1faaa8ea9a45a118d4)), closes [#18591](https://github.com/vitejs/vite/issues/18591)
* 重构(resolve): 移除 `environmentsOptions` 参数 (#18590) ([3ef0bf1](https://github.com/vitejs/vite/commit/3ef0bf19a3457c46395bdcb2201bbf32807d7231)), closes [#18590](https://github.com/vitejs/vite/issues/18590)
* 修复: 允许为 `optimizeDeps.include` 使用嵌套的依赖选择器 (#18506) ([826c81a](https://github.com/vitejs/vite/commit/826c81a40bb25914d55cd2e96b548f1a2c384a19)), closes [#18506](https://github.com/vitejs/vite/issues/18506)
* 修复: asset `new URL(,import.meta.url)` 匹配 (#18194) ([5286a90](https://github.com/vitejs/vite/commit/5286a90a3c1b693384f99903582a1f70b7b44945)), closes [#18194](https://github.com/vitejs/vite/issues/18194)
* 修复: 如果禁用则关闭 watcher (#18521) ([85bd0e9](https://github.com/vitejs/vite/commit/85bd0e9b0dc637c7645f2b56f93071d6e1ec149c)), closes [#18521](https://github.com/vitejs/vite/issues/18521)
* 修复(config): 将临时 vite 配置写入 node_modules (#18509) ([72eaef5](https://github.com/vitejs/vite/commit/72eaef5300d20b7163050461733c3208a4013e1e)), closes [#18509](https://github.com/vitejs/vite/issues/18509)
* 修复(css): `cssCodeSplit` 使用当前环境配置 (#18486) ([eefe895](https://github.com/vitejs/vite/commit/eefe8957167681b85f0e1b07bc5feefa307cccb0)), closes [#18486](https://github.com/vitejs/vite/issues/18486)
* 修复(json): 不要 `json.stringify` 数组 (#18541) ([fa50b03](https://github.com/vitejs/vite/commit/fa50b03390dae280293174f65f850522599b9ab7)), closes [#18541](https://github.com/vitejs/vite/issues/18541)
* 修复(less): 阻止重新定位 `@import url(...)` (#17857) ([aec5fdd](https://github.com/vitejs/vite/commit/aec5fdd72e3aeb2aa26796001b98f3f330be86d1)), closes [#17857](https://github.com/vitejs/vite/issues/17857)
* 修复(lib): 仅在有样式时解析 css 包名 (#18530) ([5d6dc49](https://github.com/vitejs/vite/commit/5d6dc491b6bb78613694eaf686e2e305b71af5e1)), closes [#18530](https://github.com/vitejs/vite/issues/18530)
* 修复(scss): 改进错误日志 (#18522) ([3194a6a](https://github.com/vitejs/vite/commit/3194a6a60714a3978f5e4b39d6223f32a8dc01ef)), closes [#18522](https://github.com/vitejs/vite/issues/18522)
* 重构: 仅客户端的顶层 warmup (#18524) ([a50ff60](https://github.com/vitejs/vite/commit/a50ff6000bca46a6fe429f2c3a98c486ea5ebc8e)), closes [#18524](https://github.com/vitejs/vite/issues/18524)
* 修复: 环境配置中的 `define` 不起作用 (#18515) ([052799e](https://github.com/vitejs/vite/commit/052799e8939cfcdd7a7ff48daf45a766bf6cc546)), closes [#18515](https://github.com/vitejs/vite/issues/18515)
* 修复: 将任何协议的 URL 视为外部 (#17369) ([a0336bd](https://github.com/vitejs/vite/commit/a0336bd5197bb4427251be4c975e30fb596c658f)), closes [#17369](https://github.com/vitejs/vite/issues/17369)
* 修复: 使用 picomatch 与 tinyglobby 对齐 (#18503) ([437795d](https://github.com/vitejs/vite/commit/437795db8307ce4491d066bcaaa5bd9432193773)), closes [#18503](https://github.com/vitejs/vite/issues/18503)
* 修复(build): 将 resolve.external/noExternal 应用于服务器环境 (#18495) ([5a967cb](https://github.com/vitejs/vite/commit/5a967cb596c7c4b0548be1d9025bc1e34b36169a)), closes [#18495](https://github.com/vitejs/vite/issues/18495)
* 修复(config): 如果 require 解析为 esm，则删除错误 (#18437) ([f886f75](https://github.com/vitejs/vite/commit/f886f75396cdb5a43ec5377bbbaaffc0e8ae03e9)), closes [#18437](https://github.com/vitejs/vite/issues/18437)
* 重构: 每个配置在 weakmap 中分离 tsconfck 缓存 (#17317) ([b9b01d5](https://github.com/vitejs/vite/commit/b9b01d57fdaf5d291c78a8156e17b534c8c51eb4)), closes [#17317](https://github.com/vitejs/vite/issues/17317)
* 修复: 处理 warmup glob 挂起 (#18462) ([409fa5c](https://github.com/vitejs/vite/commit/409fa5c9dee0e394bcdc3b111f5b2e4261131ca0)), closes [#18462](https://github.com/vitejs/vite/issues/18462)
* 修复: 为同一个 EnvironmentModuleNode 返回相同的 ModuleNode 实例 (#18455) ([5ead461](https://github.com/vitejs/vite/commit/5ead461b374d76ceb134063477eaf3f97fe3da97)), closes [#18455](https://github.com/vitejs/vite/issues/18455)
* 修复: 将 HTML 导入的脚本设置为 moduleSideEffects=true (#18411) ([2ebe4b4](https://github.com/vitejs/vite/commit/2ebe4b44430dd311028f72520ac977bb202ce50b)), closes [#18411](https://github.com/vitejs/vite/issues/18411)
* 修复: 在客户端重载前使用 websocket 测试服务器活跃度 (#17891) ([7f9f8c6](https://github.com/vitejs/vite/commit/7f9f8c6851d1eb49a72dcb6c134873148a2e81eb)), closes [#17891](https://github.com/vitejs/vite/issues/17891)
* 修复(css): `environments.xxx.build` 中的 `cssCodeSplit` 无效 (#18464) ([993e71c](https://github.com/vitejs/vite/commit/993e71c4cb227bd8c347b918f52ccd83f85a645a)), closes [#18464](https://github.com/vitejs/vite/issues/18464)
* 修复(css): 使 sass 类型与 sass-embedded 兼容 (#18459) ([89f8303](https://github.com/vitejs/vite/commit/89f8303e727791aa7be6f35833a708b6a50e9120)), closes [#18459](https://github.com/vitejs/vite/issues/18459)
* 修复(依赖): 更新所有非主要依赖 (#18484) ([2ec12df](https://github.com/vitejs/vite/commit/2ec12df98d07eb4c986737e86a4a9f8066724658)), closes [#18484](https://github.com/vitejs/vite/issues/18484)
* 修复(manifest): 非入口 CSS 块的 src 错误 (#18133) ([c148676](https://github.com/vitejs/vite/commit/c148676c90dc4823bc6bdeb8ba1e36386c5d9654)), closes [#18133](https://github.com/vitejs/vite/issues/18133)
* 修复(module-runner): 延迟函数评估直到模块运行器实例化 (#18480) ([472afbd](https://github.com/vitejs/vite/commit/472afbd010db3f1c7a59826c7bf4067191b7f48a)), closes [#18480](https://github.com/vitejs/vite/issues/18480)
* 修复(plugins): 如果 config 钩子返回相同的配置引用，则无操作 (#18467) ([bd540d5](https://github.com/vitejs/vite/commit/bd540d52eb609ca12dad8e2f3fe8011821bda878)), closes [#18467](https://github.com/vitejs/vite/issues/18467)
* 修复: 为 `CSSOptions.preprocessorOptions` 添加类型 (#18001) ([7eeb6f2](https://github.com/vitejs/vite/commit/7eeb6f2f97abf5dfc71c225b9cff9779baf2ed2f)), closes [#18001](https://github.com/vitejs/vite/issues/18001)
* 修复(dev): 防止 macOS 上 server.open 中出现双重 URL 编码 (#18443) ([56b7176](https://github.com/vitejs/vite/commit/56b71768f3ee498962fba898804086299382bb59)), closes [#18443](https://github.com/vitejs/vite/issues/18443)
* 修复(preview): 关闭后将 resolvedUrls 设置为 null (#18445) ([65014a3](https://github.com/vitejs/vite/commit/65014a32ef618619c5a34b729d67340d9253bdd5)), closes [#18445](https://github.com/vitejs/vite/issues/18445)
* 修复(ssr): 在顶部注入标识函数 (#18449) ([0ab20a3](https://github.com/vitejs/vite/commit/0ab20a3ee26eacf302415b3087732497d0a2f358)), closes [#18449](https://github.com/vitejs/vite/issues/18449)
* 修复(ssr): 修复 hoisted imports 的 source maps (修复 #16355) (#16356) ([8e382a6](https://github.com/vitejs/vite/commit/8e382a6a1fed2cd41051b81f9cd9c94b484352a5)), closes [#16355](https://github.com/vitejs/vite/issues/16355) [#16356](https://github.com/vitejs/vite/issues/16356)
* 修复: 为 CSS 文件增加哈希以防止 chromium 因加载先前文件而出错 (#18367) ([a569f42](https://github.com/vitejs/vite/commit/a569f42ee93229308be7a327b7a71e79f3d58b01)), closes [#18367](https://github.com/vitejs/vite/issues/18367)
* 修复: 更健壮的 plugin.sharedDuringBuild (#18351) ([47b1270](https://github.com/vitejs/vite/commit/47b12706ce2d0c009d6078a61e16e81a04c9f49c)), closes [#18351](https://github.com/vitejs/vite/issues/18351)
* 修复(cli): `--watch` 不应覆盖 `build.watch` 选项 (#18390) ([b2965c8](https://github.com/vitejs/vite/commit/b2965c8e9f74410bc8047a05528c74b68a3856d7)), closes [#18390](https://github.com/vitejs/vite/issues/18390)
* 修复(css): 不要转换带命名空间的 sass 函数调用 (#18414) ([dbb2604](https://github.com/vitejs/vite/commit/dbb260499f894d495bcff3dcdf5635d015a2f563)), closes [#18414](https://github.com/vitejs/vite/issues/18414)
* 修复(依赖): 更新 `open` 依赖到 10.1.0 (#18349) ([5cca4bf](https://github.com/vitejs/vite/commit/5cca4bfd3202c7aea690acf63f60bfe57fa165de)), closes [#18349](https://github.com/vitejs/vite/issues/18349)
* 修复(依赖): 更新所有非主要依赖 (#18345) ([5552583](https://github.com/vitejs/vite/commit/5552583a2272cd4208b30ad60e99d984e34645f0)), closes [#18345](https://github.com/vitejs/vite/issues/18345)
* 修复(ssr): 导出函数中的 `this` 应该是 `undefined` (#18329) ([bae6a37](https://github.com/vitejs/vite/commit/bae6a37628c4870f3db92351e8af2a7b4a07e248)), closes [#18329](https://github.com/vitejs/vite/issues/18329)
* 修复(worker): 在 worker 构建错误时用 `worker.format` 重写 rollup `output.format` (#18165) ([dc82334](https://github.com/vitejs/vite/commit/dc823347bb857a9f63eee7e027a52236d7e331e0)), closes [#18165](https://github.com/vitejs/vite/issues/18165)
* 修复: `injectQuery` 双重编码 (#18246) ([2c5f948](https://github.com/vitejs/vite/commit/2c5f948d0646f6a0237570ab5d36b06d31cb94c9)), closes [#18246](https://github.com/vitejs/vite/issues/18246)
* 修复: 将位置添加到导入分析解析异常 (#18344) ([0fe95d4](https://github.com/vitejs/vite/commit/0fe95d4a71930cf55acd628efef59e6eae0f77f7)), closes [#18344](https://github.com/vitejs/vite/issues/18344)
* 修复: 当可运行环境关闭时销毁运行器 (#18282) ([5212d09](https://github.com/vitejs/vite/commit/5212d09579a82bc09b149c77e996d0e5c3972455)), closes [#18282](https://github.com/vitejs/vite/issues/18282)
* 修复: 当根目录不存在时处理 yarn 命令失败 (#18141) ([460aaff](https://github.com/vitejs/vite/commit/460aaffbf134a9eda6e092a564afc2eeebf8f935)), closes [#18141](https://github.com/vitejs/vite/issues/18141)
* 修复: 使配置环境运行器更容易 (#18273) ([fb35a78](https://github.com/vitejs/vite/commit/fb35a7800e21ed2c6f9d0f843898afa1fcc87795)), closes [#18273](https://github.com/vitejs/vite/issues/18273)
* 修复(assets): 使 srcset 解析符合 HTML 规范 (#16323) (#18242) ([0e6d4a5](https://github.com/vitejs/vite/commit/0e6d4a5e23cdfb2ec433f687e455b9827269527c)), closes [#16323](https://github.com/vitejs/vite/issues/16323) [#18242](https://github.com/vitejs/vite/issues/18242)
* 修复(css): 当导出被使用时，不要为纯 CSS 块删除 JS 块 (#18307) ([889bfc0](https://github.com/vitejs/vite/commit/889bfc0ada6d6cd356bb7a92efdce96298f82fef)), closes [#18307](https://github.com/vitejs/vite/issues/18307)
* 修复(deps): 升级 tsconfck (#18322) ([67783b2](https://github.com/vitejs/vite/commit/67783b2d5513e013bf74844186eb9b2b70d17d5c)), closes [#18322](https://github.com/vitejs/vite/issues/18322)
* 修复(依赖): 更新所有非主要依赖 (#18292) ([5cac054](https://github.com/vitejs/vite/commit/5cac0544dca2764f0114aac38e9922a0c13d7ef4)), closes [#18292](https://github.com/vitejs/vite/issues/18292)
* 修复(hmr): 对于直接的 CSS 软失效，不要尝试重写导入 (#18252) ([a03bb0e](https://github.com/vitejs/vite/commit/a03bb0e2ba35af314c57fc98600bb76566592239)), closes [#18252](https://github.com/vitejs/vite/issues/18252)
* 修复(middleware-mode): 服务器重启时调用所有 hot.listen (#18261) ([007773b](https://github.com/vitejs/vite/commit/007773b550e7c6bcaeb8d88970fd6dfe999d5a4a)), closes [#18261](https://github.com/vitejs/vite/issues/18261)
* 修复(optimizer): 不要将带有资源扩展名的传递性依赖包名外部化 (#18152) ([fafc7e2](https://github.com/vitejs/vite/commit/fafc7e28d3395292fbc2f2355417dcc15871ab1e)), closes [#18152](https://github.com/vitejs/vite/issues/18152)
* 修复(resolve): 修复外部条件的解析缓存键 (#18332) ([93d286c](https://github.com/vitejs/vite/commit/93d286c4c1af0b379002a6ff495e82bb87acd65c)), closes [#18332](https://github.com/vitejs/vite/issues/18332)
* 修复(resolve): 修复解析缓存以考虑 `conditions` 等 (#18302) ([2017a33](https://github.com/vitejs/vite/commit/2017a330f5576dfc9db1538e0b899a1776cd100a)), closes [#18302](https://github.com/vitejs/vite/issues/18302)
* 修复(types): 为 `defineConfig` 添加更多重载 (#18299) ([94e34cf](https://github.com/vitejs/vite/commit/94e34cf1dfe6fdb331b6508e830b2cc446000aac)), closes [#18299](https://github.com/vitejs/vite/issues/18299)
* 修复: 资源导入应跳过处理数据 URI (#18163) ([70813c7](https://github.com/vitejs/vite/commit/70813c7f05fc9a45d102a53514ecac23831e6d6b)), closes [#18163](https://github.com/vitejs/vite/issues/18163)
* 修复: 缓存可运行的环境模块运行器 (#18215) ([95020ab](https://github.com/vitejs/vite/commit/95020ab49e12d143262859e095025cf02423c1d9)), closes [#18215](https://github.com/vitejs/vite/issues/18215)
* 修复: 为非 ws HotChannel 调用 `this.hot.close` (#18212) ([bad0ccc](https://github.com/vitejs/vite/commit/bad0cccee80c02fa309f274220f6d324d03c3b19)), closes [#18212](https://github.com/vitejs/vite/issues/18212)
* 修复: 在环境关闭时关闭 HotChannel (#18206) ([2d148e3](https://github.com/vitejs/vite/commit/2d148e347e8fbcc6f0e4e627a20acc81d9ced3e0)), closes [#18206](https://github.com/vitejs/vite/issues/18206)
* 修复: 在实现端需要对 `HMRConnection.send` 进行序列化 (#18186) ([9470011](https://github.com/vitejs/vite/commit/9470011570503a917021915c47e6a2f36aae16b5)), closes [#18186](https://github.com/vitejs/vite/issues/18186)
* 修复: 使用 `config.consumer` 而不是 `options?.ssr` / `config.build.ssr` (#18140) ([21ec1ce](https://github.com/vitejs/vite/commit/21ec1ce7f041efa5cd781924f7bc536ab406a197)), closes [#18140](https://github.com/vitejs/vite/issues/18140)
* 修复(config): 在 deno 上将所有文件视为 ESM (#18081) ([c1ed8a5](https://github.com/vitejs/vite/commit/c1ed8a595a02ec7f8f5a8d23f97b2f21d3834ab1)), closes [#18081](https://github.com/vitejs/vite/issues/18081)
* 修复(css): 确保 sass 编译器只初始化一次 (#18128) ([4cc5322](https://github.com/vitejs/vite/commit/4cc53224e9b207aa6a5a111e40ed0a0464cf37f4)), closes [#18128](https://github.com/vitejs/vite/issues/18128)
* 修复(css): 修复 lightningcss 依赖 url 解析与自定义根目录 (#18125) ([eb08f60](https://github.com/vitejs/vite/commit/eb08f605ddadef99a5d68f55de143e3e47c91618)), closes [#18125](https://github.com/vitejs/vite/issues/18125)
* 修复(css): 修复 sass 现代 api 自定义导入器中缺少的源文件警告 (#18113) ([d7763a5](https://github.com/vitejs/vite/commit/d7763a5615a238cb1b5dceb7bdfc4aac7678fb0a)), closes [#18113](https://github.com/vitejs/vite/issues/18113)
* 修复(data-uri): 仅匹配以 `data:` 开头的 id (#18241) ([ec0efe8](https://github.com/vitejs/vite/commit/ec0efe8a06d0271ef0154f38fb9beabcd4b1bd89)), closes [#18241](https://github.com/vitejs/vite/issues/18241)
* 修复(依赖): 更新所有非主要依赖 (#18170) ([c8aea5a](https://github.com/vitejs/vite/commit/c8aea5ae0af90dc6796ef3bdd612d1eb819f157b)), closes [#18170](https://github.com/vitejs/vite/issues/18170)
* 修复(依赖): 升级 rollup 4.22.4+ 以确保避免 XSS (#18180) ([ea1d0b9](https://github.com/vitejs/vite/commit/ea1d0b9af9b28b57166d4ca67bece21650221a04)), closes [#18180](https://github.com/vitejs/vite/issues/18180)
* 修复(html): 使 build-html 插件与 `sharedPlugins` 兼容 (#18214) ([34041b9](https://github.com/vitejs/vite/commit/34041b9d8ea39aa9138d0c2417bfbe39cc9aabdc)), closes [#18214](https://github.com/vitejs/vite/issues/18214)
* 修复(mixedModuleGraph): 处理 getModulesByFile 中未定义的 id (#18201) ([768a50f](https://github.com/vitejs/vite/commit/768a50f7ac668dbf876feef557d8c0f8ff32b8ff)), closes [#18201](https://github.com/vitejs/vite/issues/18201)
* 修复(optimizer): 更改配置 `webCompatible` 时重新优化 (#18221) ([a44b0a2](https://github.com/vitejs/vite/commit/a44b0a2690812788aaaba00fd3acd2c6fa36669b)), closes [#18221](https://github.com/vitejs/vite/issues/18221)
* 修复(ssr): 修复多个源的源映射重映射 (#18150) ([e003a2c](https://github.com/vitejs/vite/commit/e003a2ca73b04648e14ebf40f3616838e2da3d6d)), closes [#18150](https://github.com/vitejs/vite/issues/18150)
* 修复(vite): 重构“模块缓存”为“已评估模块”，将模块传递给“runInlinedModule” (# ([e83beff](https://github.com/vitejs/vite/commit/e83beff596072f9c7a42f6e2410f154668981d71)), closes [#18092](https://github.com/vitejs/vite/issues/18092)
* 修复: 避免 `getRelativeUrlFromDocument` 中的 DOM Clobbering 小工具 (#18115) ([ade1d89](https://github.com/vitejs/vite/commit/ade1d89660e17eedfd35652165b0c26905259fad)), closes [#18115](https://github.com/vitejs/vite/issues/18115)
* 修复: fs 原始查询 (#18112) ([9d2413c](https://github.com/vitejs/vite/commit/9d2413c8b64bfb1dfd953340b4e1b5972d5440aa)), closes [#18112](https://github.com/vitejs/vite/issues/18112)
* 修复(preload): 同时抛出预加载模块的错误 (#18098) ([ba56cf4](https://github.com/vitejs/vite/commit/ba56cf43b5480f8519349f7d7fe60718e9af5f1a)), closes [#18098](https://github.com/vitejs/vite/issues/18098)
* 修复: 允许在 svelte 中扫描 `script module` 的导出 (#18063) ([7d699aa](https://github.com/vitejs/vite/commit/7d699aa98155cbf281e3f7f6a8796dcb3b4b0fd6)), closes [#18063](https://github.com/vitejs/vite/issues/18063)
* 修复: 确保 req.url 与 moduleByEtag URL 匹配以避免不正确的 304 (#17997) ([abf04c3](https://github.com/vitejs/vite/commit/abf04c3a84f4d9962a6f9697ca26cd639fa76e87)), closes [#17997](https://github.com/vitejs/vite/issues/17997)
* 修复: 不正确的环境消费者选项解析 (#18079) ([0e3467e](https://github.com/vitejs/vite/commit/0e3467e503aef45119260fe75b399b26f7a80b66)), closes [#18079](https://github.com/vitejs/vite/issues/18079)
* 修复: 存储向后兼容的 `ssrModule` 和 `ssrError` (#18031) ([cf8ced5](https://github.com/vitejs/vite/commit/cf8ced56ea4932e917e2c4ef3d04a87f0ab4f20b)), closes [#18031](https://github.com/vitejs/vite/issues/18031)
* 修复(build): 声明 `preload-helper` 没有副作用 (#18057) ([587ad7b](https://github.com/vitejs/vite/commit/587ad7b17beba50279eaf46b06c5bf5559c4f36e)), closes [#18057](https://github.com/vitejs/vite/issues/18057)
* 修复(css): 如果为 sass 设置了 logger 或 pkgImporter 选项，则回退到主线程 (#18071) ([d81dc59](https://github.com/vitejs/vite/commit/d81dc59473b1053bf48c45a9d45f87ee6ecf2c02)), closes [#18071](https://github.com/vitejs/vite/issues/18071)
* 修复(dynamicImportVars): 修正带括号路径的 glob 模式 (#17940) ([2a391a7](https://github.com/vitejs/vite/commit/2a391a7df6e5b4a8d9e8313fba7ddf003df41e12)), closes [#17940](https://github.com/vitejs/vite/issues/17940)
* 修复(html): 转义 html 属性 (#18067) ([5983f36](https://github.com/vitejs/vite/commit/5983f366d499f74d473097154bbbcc8e51476dc4)), closes [#18067](https://github.com/vitejs/vite/issues/18067)
* 修复(preload): 允许忽略依赖错误 (#18046) ([3fb2889](https://github.com/vitejs/vite/commit/3fb28896d916e03cef1b5bd6877ac184c7ec8003)), closes [#18046](https://github.com/vitejs/vite/issues/18046)


### 杂项

* 杂项: 添加 5.4.x 更新日志 (#18768) ([26b58c8](https://github.com/vitejs/vite/commit/26b58c8130f232dcd4e839a337bbe478352f23ab)), closes [#18768](https://github.com/vitejs/vite/issues/18768)
* 杂项: 添加一些关于 mimes 的注释 (#18705) ([f07e9b9](https://github.com/vitejs/vite/commit/f07e9b9d01d790c727edc2497304f07b1ef5d28f)), closes [#18705](https://github.com/vitejs/vite/issues/18705)
* 杂项(依赖): 更新所有非主要依赖 (#18746) ([0ad16e9](https://github.com/vitejs/vite/commit/0ad16e92d57453d9e5392c90fd06bda947be9de6)), closes [#18746](https://github.com/vitejs/vite/issues/18746)
* 文档: 重命名 `HotUpdateContext` 为 `HotUpdateOptions` (#18718) ([824c347](https://github.com/vitejs/vite/commit/824c347fa21aaf5bbf811994385b790db4287ab0)), closes [#18718](https://github.com/vitejs/vite/issues/18718)
* 测试: 简化 `playground/json/__tests__/ssr` (#18701) ([f731ca2](https://github.com/vitejs/vite/commit/f731ca21ea4cfe38418880f15f6064e156a43a5e)), closes [#18701](https://github.com/vitejs/vite/issues/18701)
* 杂项: 调整构建配置 (#18622) ([2a88f71](https://github.com/vitejs/vite/commit/2a88f71aef87ed23b155af26f8aca6bb7f65e899)), closes [#18622](https://github.com/vitejs/vite/issues/18622)
* 杂项(依赖): 更新所有非主要依赖 (#18634) ([e2231a9](https://github.com/vitejs/vite/commit/e2231a92af46db144b9c94fb57918ac683dc93cb)), closes [#18634](https://github.com/vitejs/vite/issues/18634)
* 杂项(依赖): 更新传递性依赖 (#18602) ([0c8b152](https://github.com/vitejs/vite/commit/0c8b15238b669b8ab0a3f90bcf2f690d4450e18f)), closes [#18602](https://github.com/vitejs/vite/issues/18602)
* 杂项: 为 `resolve.alias` 中的 `/` 映射添加警告 (#18588) ([a51c254](https://github.com/vitejs/vite/commit/a51c254265bbfe3d77f834fe81a503ce27c05b32)), closes [#18588](https://github.com/vitejs/vite/issues/18588)
* 杂项: 删除未使用的 `ssr` 变量 (#18594) ([23c39fc](https://github.com/vitejs/vite/commit/23c39fc994a6164bc68d69e56f39735a6bb7a7d1d)), closes [#18594](https://github.com/vitejs/vite/issues/18594)
* 杂项(依赖): 更新所有非主要依赖 (#18562) ([fb227ec](https://github.com/vitejs/vite/commit/fb227ec4402246b5a13e274c881d9de6dd8082dd)), closes [#18562](https://github.com/vitejs/vite/issues/18562)
* 测试: 更新文件名正则表达式 (#18593) ([dd25c1a](https://github.com/vitejs/vite/commit/dd25c1ab5d5510b955fa24830bc223cacc855560)), closes [#18593](https://github.com/vitejs/vite/issues/18593)
* 杂项: 修复 Windows 上构建脚本中的 moduleSideEffects (#18518) ([25fe9e3](https://github.com/vitejs/vite/commit/25fe9e3b48e29d49e90d6aed5ec3825dceafec18)), closes [#18518](https://github.com/vitejs/vite/issues/18518)
* 杂项: 使用 premove 代替 rimraf (#18499) ([f97a578](https://github.com/vitejs/vite/commit/f97a57893b3a7ddf11ca4c126b6be33cd2d9283b)), closes [#18499](https://github.com/vitejs/vite/issues/18499)
* 文档: 为 BuilderOptions 中的标志添加 jsdocs (#18516) ([1507068](https://github.com/vitejs/vite/commit/1507068b6d460cf54336fe7e8d3539fdb4564bfb)), closes [#18516](https://github.com/vitejs/vite/issues/18516)
* 文档: 缺失的变更指南 (#18491) ([5da78a6](https://github.com/vitejs/vite/commit/5da78a6859f3b5c677d896144b915381e4497432)), closes [#18491](https://github.com/vitejs/vite/issues/18491)
* 文档: 更新 JSDoc 中的 fs.deny 默认值 (#18514) ([1fcc83d](https://github.com/vitejs/vite/commit/1fcc83dd7ade429f889e4ce19d5c67b3e5b46419)), closes [#18514](https://github.com/vitejs/vite/issues/18514)
* 重构: 将 optimizeDeps 移回顶层 (#18465) ([1ac22de](https://github.com/vitejs/vite/commit/1ac22de41cf5a8647847070eadeac3231c94c3ed)), closes [#18465](https://github.com/vitejs/vite/issues/18465)
* 重构: 顶层 createEnvironment 仅限客户端 (#18475) ([6022fc2](https://github.com/vitejs/vite/commit/6022fc2c87e0f59c3e6ccfa307a352a378d8273a)), closes [#18475](https://github.com/vitejs/vite/issues/18475)
* 重构(css): 隐藏内部预处理器类型并暴露用于选项的类型 (#18458) ([c32837c](https://github.com/vitejs/vite/commit/c32837cf868f0fdb97a22a0be8c95c433f4069c8)), closes [#18458](https://github.com/vitejs/vite/issues/18458)
* 重构: 使用 `originalFileNames`/`names` (#18240) ([f2957c8](https://github.com/vitejs/vite/commit/f2957c84f69c14c882809889fbd0fc66b97ca3e9)), closes [#18240](https://github.com/vitejs/vite/issues/18240)
* 测试: 修复测试冲突 (#18446) ([94cd1e6](https://github.com/vitejs/vite/commit/94cd1e6f95e2434d2b52b5c16d50fe0472214634)), closes [#18446](https://github.com/vitejs/vite/issues/18446)
* 杂项(依赖): 更新依赖 picomatch 到 v4 (#15876) ([3774881](https://github.com/vitejs/vite/commit/377488178a7ef372d9b76526bb01fd60b97f51df)), closes [#15876](https://github.com/vitejs/vite/issues/15876)
* 重构: 在 `build` 中使用 builder (#18432) ([cc61d16](https://github.com/vitejs/vite/commit/cc61d169a4826996f7b2289618c383f8c5c6d470)), closes [#18432](https://github.com/vitejs/vite/issues/18432)
* 重构(resolve): 移除 `tryEsmOnly` 标志 (#18394) ([7cebe38](https://github.com/vitejs/vite/commit/7cebe3847f934ff4875ff3ecc6a96a82bac5f8f4)), closes [#18394](https://github.com/vitejs/vite/issues/18394)
* 杂项: 合并具有相同文本的依赖许可证 (#18356) ([b5d1a05](https://github.com/vitejs/vite/commit/b5d1a058f9dab6a6b1243c2a0b11d2c421dd3291)), closes [#18356](https://github.com/vitejs/vite/issues/18356)
* 杂项: 修复语法 (#18385) ([8030231](https://github.com/vitejs/vite/commit/8030231596edcd688e324ea507dc1ba80564f75c)), closes [#18385](https://github.com/vitejs/vite/issues/18385)
* 杂项: 将 builder api 标记为实验性 (#18436) ([b57321c](https://github.com/vitejs/vite/commit/b57321cc198ee7b9012f1be632cfd4bea006cd89)), closes [#18436](https://github.com/vitejs/vite/issues/18436)
* 杂项: 小拼写错误 (#18374) ([7d97a9b](https://github.com/vitejs/vite/commit/7d97a9b2ba11ab566865dcf9ee0350a9e479dfca)), closes [#18374](https://github.com/vitejs/vite/issues/18374)
* 杂项: 更新 moduleResolution 值的大小写 (#18409) ([ff018dc](https://github.com/vitejs/vite/commit/ff018dca959c73481ae5f8328cd77d3b02f02134)), closes [#18409](https://github.com/vitejs/vite/issues/18409)
* 杂项(create-vite): 将模板文件标记为 CC0 (#18366) ([f6b9074](https://github.com/vitejs/vite/commit/f6b90747eb2b1ad863e5f147a80c75b15e38a51b)), closes [#18366](https://github.com/vitejs/vite/issues/18366)
* 杂项(依赖): 将 TypeScript 升级到 5.6 (#18254) ([57a0e85](https://github.com/vitejs/vite/commit/57a0e85186b88118bf5f79dd53391676fb91afec)), closes [#18254](https://github.com/vitejs/vite/issues/18254)
* 杂项(依赖): 更新所有非主要依赖 (#18404) ([802839d](https://github.com/vitejs/vite/commit/802839d48335a69eb15f71f2cd816d0b6e4d3556)), closes [#18404](https://github.com/vitejs/vite/issues/18404)
* 杂项(依赖): 更新依赖 sirv 到 v3 (#18346) ([5ea4b00](https://github.com/vitejs/vite/commit/5ea4b00a984bc76d0d000f621ab72763a4c9a48b)), closes [#18346](https://github.com/vitejs/vite/issues/18346)
* 测试: 从输出中删除不必要的日志 (#18368) ([f50d358](https://github.com/vitejs/vite/commit/f50d3583e2c460bb02c118371a79b5ceac9877f3)), closes [#18368](https://github.com/vitejs/vite/issues/18368)
* 测试: 在 css 模块 compose 测试中替换 fs 模拟 (#18413) ([ddee0ad](https://github.com/vitejs/vite/commit/ddee0ad38fd53993155fc11174d5ee194d6648d8)), closes [#18413](https://github.com/vitejs/vite/issues/18413)
* 测试: ssr external / resolveId 测试 (#18327) ([4c5cf91](https://github.com/vitejs/vite/commit/4c5cf91d124d423fe028beecda952125698c1d5d)), closes [#18327](https://github.com/vitejs/vite/issues/18327)
* 测试: 测试优化的依赖作为 ssr 入口 (#18301) ([466f94a](https://github.com/vitejs/vite/commit/466f94aa6465f0a3b932f55e93660f7cf6cd936e)), closes [#18301](https://github.com/vitejs/vite/issues/18301)
* 杂项: 将弃用错误 URL 指向主分支文档 (#18321) ([11c0fb1](https://github.com/vitejs/vite/commit/11c0fb1388744624dac40cc267ad21dc7f85cb4e)), closes [#18321](https://github.com/vitejs/vite/issues/18321)
* 杂项: 将所有 vitejs.dev 的 url 引用更新为 vite.dev (#18276) ([7052c8f](https://github.com/vitejs/vite/commit/7052c8f6fc253f0a88ff04a4c18c108f3bfdaa78)), closes [#18276](https://github.com/vitejs/vite/issues/18276)
* 杂项: 更新构建的 LICENSE ([69b6764](https://github.com/vitejs/vite/commit/69b6764d49dd0d04819a8aa9b4061974e0e00f62))
* 杂项: 更新许可证版权 (#18278) ([56eb869](https://github.com/vitejs/vite/commit/56eb869a67551a257d20cba00016ea59b1e1a2c4)), closes [#18278](https://github.com/vitejs/vite/issues/18278)
* 杂项(依赖): 更新依赖 @rollup/plugin-commonjs 到 v28 (#18231) ([78e749e](https://github.com/vitejs/vite/commit/78e749ea9a42e7f82dbca37c26e8ab2a5e6e0c16)), closes [#18231](https://github.com/vitejs/vite/issues/18231)
* 重构: 重命名 runner.destroy() 为 runner.close() (#18304) ([cd368f9](https://github.com/vitejs/vite/commit/cd368f9fed393a8649597f0e5d873504a9ac62e2)), closes [#18304](https://github.com/vitejs/vite/issues/18304)
* 文档: 更新主页 (#18274) ([a99a0aa](https://github.com/vitejs/vite/commit/a99a0aab7c600301a5c314b6071afa46915ce248)), closes [#18274](https://github.com/vitejs/vite/issues/18274)
* 测试: 修复 server-worker-runner 不稳定的测试 (#18247) ([8f82730](https://github.com/vitejs/vite/commit/8f82730b86abed953800ade6e726f70ee55ab7fe)), closes [#18247](https://github.com/vitejs/vite/issues/18247)
* 重构: 打破循环依赖以修复 test-unit (#18237) ([a577828](https://github.com/vitejs/vite/commit/a577828d826805c5693d773eea4c4179e21f1a16)), closes [#18237](https://github.com/vitejs/vite/issues/18237)
* 重构: 移除 `_onCrawlEnd` (#18207) ([bea0272](https://github.com/vitejs/vite/commit/bea0272decd908cd04ac0a2c87dd0a676f218a1a)), closes [#18207](https://github.com/vitejs/vite/issues/18207)
* 重构: 移除对“processSourceMap”的需求 (#18187) ([08ff233](https://github.com/vitejs/vite/commit/08ff23319964903b9f380859c216b10e577ddb6f)), closes [#18187](https://github.com/vitejs/vite/issues/18187)
* 重构: 用 `splitFileAndPostfix` 替换 `parse` (#18185) ([6f030ec](https://github.com/vitejs/vite/commit/6f030ec15f25a2a1d7d912f1b84d83ebb28a3515)), closes [#18185](https://github.com/vitejs/vite/issues/18185)
* 重构: 使用 `resolvePackageData` 获取 rollup 版本 (#18208) ([220d6ec](https://github.com/vitejs/vite/commit/220d6ec2bf3fc7063eac7c625d4ccda9a4204cb7)), closes [#18208](https://github.com/vitejs/vite/issues/18208)
* 杂项: 在 CHANGELOG.md 中转义模板标签 (#18126) ([caaa683](https://github.com/vitejs/vite/commit/caaa6836e9a104cc9d63b68ad850149687ad104c)), closes [#18126](https://github.com/vitejs/vite/issues/18126)
* 杂项(依赖): 更新所有非主要依赖 (#18108) ([a73bbaa](https://github.com/vitejs/vite/commit/a73bbaadb512a884924cc884060e50ea6d809d74)), closes [#18108](https://github.com/vitejs/vite/issues/18108)
* 杂项(依赖): 更新所有非主要依赖 (#18230) ([c0edd26](https://github.com/vitejs/vite/commit/c0edd26bbfeb9a8d80ebaa420e54fbb7f165bd9b)), closes [#18230](https://github.com/vitejs/vite/issues/18230)
* 杂项(依赖): 更新 esbuild (#18173) ([e59e2ca](https://github.com/vitejs/vite/commit/e59e2cacab476305c3cdfb31732c27b174fb8fe2)), closes [#18173](https://github.com/vitejs/vite/issues/18173)
* 杂项(optimizer): 修复评论中的拼写错误 (#18239) ([b916ab6](https://github.com/vitejs/vite/commit/b916ab601d2ec1c842ea0c6139bf216166010e56)), closes [#18239](https://github.com/vitejs/vite/issues/18239)
* 文档: 修复 proxy.ts 中的拼写错误 (#18162) ([49087bd](https://github.com/vitejs/vite/commit/49087bd5738a2cf69ee46b10a74cfd61c18e9959)), closes [#18162](https://github.com/vitejs/vite/issues/18162)
* 杂项: 启用一些 eslint 规则 (#18084) ([e9a2746](https://github.com/vitejs/vite/commit/e9a2746ca77473b1814fd05db3d299c074135fe5)), closes [#18084](https://github.com/vitejs/vite/issues/18084)
* 杂项: 移除 npm-run-all2 (#18083) ([41180d0](https://github.com/vitejs/vite/commit/41180d02730a7ce7c9b6ec7ac71fc6e750dd22c6)), closes [#18083](https://github.com/vitejs/vite/issues/18083)
* 杂项: 在测试期间静默不必要的日志 (#18052) ([a3ef052](https://github.com/vitejs/vite/commit/a3ef052d408edbec71081fd2f7b3e4b1d4ea0174)), closes [#18052](https://github.com/vitejs/vite/issues/18052)
* 杂项(依赖): 更新所有非主要依赖 (#18050) ([7cac03f](https://github.com/vitejs/vite/commit/7cac03fa5197a72d2e2422bd0243a85a9a18abfc)), closes [#18050](https://github.com/vitejs/vite/issues/18050)
* 重构: 从 pre-alias 插件中移除自定义 resolveOptions (#18041) ([6f60adc](https://github.com/vitejs/vite/commit/6f60adc15283c6b25218d2392738671b6ab4b392)), closes [#18041](https://github.com/vitejs/vite/issues/18041)
* 重构: 移除不必要的转义 (#18044) ([8062d36](https://github.com/vitejs/vite/commit/8062d36773cafaec98196965d33d79887e58f437)), closes [#18044](https://github.com/vitejs/vite/issues/18044)
* 重构(create-vite): 使用 picocolors (#18085) ([ba37df0](https://github.com/vitejs/vite/commit/ba37df0813ad3864fc4b8c6c0b289a1f2bc00c36)), closes [#18085](https://github.com/vitejs/vite/issues/18085)
* 测试: 移动 glob 测试根目录以减少快照更改 (#18053) ([04d7e77](https://github.com/vitejs/vite/commit/04d7e7749496f5d1972338c7de1502c7f6f65cb6)), closes [#18053](https://github.com/vitejs/vite/issues/18053)



### Beta 版更新日志


#### [6.0.0-beta.10](https://github.com/vitejs/vite/compare/v6.0.0-beta.9...v6.0.0-beta.10) (2024-11-14)

查看 [6.0.0-beta.10 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.10/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.9](https://github.com/vitejs/vite/compare/v6.0.0-beta.8...v6.0.0-beta.9) (2024-11-07)

查看 [6.0.0-beta.9 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.9/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.8](https://github.com/vitejs/vite/compare/v6.0.0-beta.7...v6.0.0-beta.8) (2024-11-01)

查看 [6.0.0-beta.8 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.8/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.7](https://github.com/vitejs/vite/compare/v6.0.0-beta.6...v6.0.0-beta.7) (2024-10-30)

查看 [6.0.0-beta.7 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.7/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.6](https://github.com/vitejs/vite/compare/v6.0.0-beta.5...v6.0.0-beta.6) (2024-10-28)

查看 [6.0.0-beta.6 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.6/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.5](https://github.com/vitejs/vite/compare/v6.0.0-beta.4...v6.0.0-beta.5) (2024-10-24)

查看 [6.0.0-beta.5 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.5/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.4](https://github.com/vitejs/vite/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2024-10-23)

查看 [6.0.0-beta.4 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.4/packages/vite/CHANGELOG.md)


#### [6.0.0-beta.3](https://github.com/vitejs/vite/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2024-10-15)

查看 [6.0.0-beta.3 更新日志](https://github.com/vitejs/vite/blob/v6.0.0-beta.