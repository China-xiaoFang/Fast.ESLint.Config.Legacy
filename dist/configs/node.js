const require_constants_index = require("../constants/index.js");
const require_environment = require("./environment.js");
//#region src/configs/node.ts
/** 可直接用于 Legacy `extends` 的 Node.js 环境配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: [...require_environment.createEnvironmentConfigs({
		environment: "node",
		files: require_constants_index.GLOBS_CODE
	}), ...require_environment.createNodeToolingConfigs()]
};
//#endregion
exports.default = config;

//# sourceMappingURL=node.js.map