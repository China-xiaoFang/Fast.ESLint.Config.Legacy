const require_constants_index = require("./constants/index.js");
const require_factory = require("./configs/environment/factory.js");
//#region src/configs/node/index.ts
/**
* Node.js 项目的 ESLint 8 Legacy Config 运行环境配置。
*
* 该配置为 JavaScript、JSX、TypeScript、TSX、Vue 及常见工程脚本启用 Node.js 和
* ES2022 globals，不包含浏览器 globals，也不引入专用 Node.js 规则插件。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/node"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: [...require_factory.createEnvironmentConfigs({
		environment: "node",
		files: require_constants_index.GLOBS_CODE
	}), ...require_factory.createNodeToolingConfigs()]
};
//#endregion
module.exports = config;

//# sourceMappingURL=node.js.map