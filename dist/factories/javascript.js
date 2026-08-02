const require_constants_index = require("../constants/index.js");
const require_javascript = require("../rules/javascript.js");
//#region src/factories/javascript.ts
/**
* 创建 JavaScript 与 JSX 配置。
*
* JSX 解析在这里显式开启；基础正确性和公共规则由更早的 `createCommonConfigs()` 提供。
*
* @param files - 由该 override 接管的 JavaScript 文件 glob。
* @returns 包含 parserOptions 与本地 JavaScript 规则的单个 override。
* @internal
*/
const createJavaScriptConfig = (files = require_constants_index.GLOBS_JAVASCRIPT) => ({
	files: [...files],
	parserOptions: {
		ecmaVersion: "latest",
		ecmaFeatures: { jsx: true },
		sourceType: "module"
	},
	rules: require_javascript.javascriptRules
});
/**
* 将 {@link createJavaScriptConfig} 包装为组合器使用的 override 数组。
*
* @param files - 由 JavaScript 配置接管的文件 glob。
* @returns 始终包含一个 JavaScript override 的数组。
* @internal
*/
const createJavaScriptConfigs = (files = require_constants_index.GLOBS_JAVASCRIPT) => [createJavaScriptConfig(files)];
//#endregion
exports.createJavaScriptConfig = createJavaScriptConfig;
exports.createJavaScriptConfigs = createJavaScriptConfigs;

//# sourceMappingURL=javascript.js.map