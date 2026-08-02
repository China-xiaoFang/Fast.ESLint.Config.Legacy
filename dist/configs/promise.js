const require_constants_index = require("../constants/index.js");
//#region src/configs/promise.ts
/**
* 创建 Promise 控制流与异常处理推荐配置。
*
* 该配置应用 `plugin:promise/recommended`，不启动类型服务；需要类型信息的 Promise
* 检查由 `/type-aware` 中的 typescript-eslint 预置提供。
*
* @param files - 应用 Promise 规则的代码文件 glob。
* @returns 单个推荐规则 override；文件集合为空时返回空数组。
* @internal
*/
const createPromiseConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["plugin:promise/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
}] : [];
/** 可直接用于 Legacy `extends` 的 Promise 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createPromiseConfigs(require_constants_index.GLOBS_CODE)
};
//#endregion
exports.createPromiseConfigs = createPromiseConfigs;
exports.default = config;

//# sourceMappingURL=promise.js.map