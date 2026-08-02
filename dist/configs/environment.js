const require_constants_index = require("../constants/index.js");
//#region src/configs/environment.ts
/** 将运行时选择转换为 ESLint 8 Legacy Config 的 env 映射。 */
const createRuntimeEnvironment = (environment) => ({
	es2022: true,
	browser: environment !== "node",
	node: environment !== "browser"
});
/**
* 创建应用源码运行时环境配置。
*
* @param options - 运行环境和目标文件范围。
* @returns 一个限定文件范围的 env override；文件范围为空时返回空数组。
* @internal
*/
const createEnvironmentConfigs = ({ environment = "browser", files = [] } = {}) => files.length > 0 ? [{
	files: [...files],
	env: createRuntimeEnvironment(environment)
}] : [];
/**
* 创建 Node.js 工程文件环境配置。
*
* 配置仅匹配 config、setup、scripts、bin、CLI 和测试命名的工程文件，不会把 Node globals
* 泄漏到 browser 应用源码。它必须晚于语言规则应用，才能可靠关闭工具脚本中的 `no-console`。
*
* @returns Node.js 工程文件专用的单个 override。
* @internal
*/
const createNodeToolingConfigs = () => [{
	files: [...require_constants_index.GLOBS_NODE_TOOLING],
	env: {
		es2022: true,
		browser: false,
		node: true
	},
	rules: { "no-console": "off" }
}];
/** 可直接用于 Legacy `extends` 的浏览器运行环境配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createEnvironmentConfigs({
		environment: "browser",
		files: require_constants_index.GLOBS_CODE
	})
};
//#endregion
exports.createEnvironmentConfigs = createEnvironmentConfigs;
exports.createNodeToolingConfigs = createNodeToolingConfigs;
exports.default = config;

//# sourceMappingURL=environment.js.map