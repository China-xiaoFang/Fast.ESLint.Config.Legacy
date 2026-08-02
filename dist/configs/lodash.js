const require_constants_index = require("../constants/index.js");
const require_lodash = require("../rules/lodash.js");
//#region src/configs/lodash.ts
/**
* 创建 Lodash 静态导入来源约束。
*
* @param preference - 唯一允许使用的 Lodash 包入口。
* @param files - 应用该组织策略的代码文件 glob。
* @returns 单个规则 override；文件集合为空时返回空数组。
* @internal
*/
const createLodashConfigs = (preference, files) => files.length > 0 ? [{
	files: [...files],
	rules: preference === "lodash" ? require_lodash.preferLodashRules : require_lodash.preferLodashUnifiedRules
}] : [];
/** 可直接用于 Legacy `extends` 的 Lodash 导入策略配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createLodashConfigs("lodash", require_constants_index.GLOBS_CODE)
};
//#endregion
exports.createLodashConfigs = createLodashConfigs;
exports.default = config;

//# sourceMappingURL=lodash.js.map