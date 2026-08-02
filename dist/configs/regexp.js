const require_constants_index = require("../constants/index.js");
//#region src/configs/regexp.ts
/**
* 创建正则表达式正确性、可读性和性能推荐配置。
*
* 部分上游规则支持自动修复；配置层只注册规则，不对修复后的真实匹配行为作保证。
*
* @param files - 应用 RegExp 规则的代码文件 glob。
* @returns 单个推荐规则 override；文件集合为空时返回空数组。
* @internal
*/
const createRegexpConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["plugin:regexp/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
}] : [];
/** 可直接用于 Legacy `extends` 的 RegExp 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createRegexpConfigs(require_constants_index.GLOBS_CODE)
};
//#endregion
exports.createRegexpConfigs = createRegexpConfigs;
exports.default = config;

//# sourceMappingURL=regexp.js.map