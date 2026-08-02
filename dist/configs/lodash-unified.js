const require_constants_index = require("../constants/index.js");
//#region src/configs/lodash-unified.ts
/** 可直接用于 Legacy `extends` 的 lodash-unified 导入策略配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./lodash.js").createLodashConfigs("lodash-unified", require_constants_index.GLOBS_CODE)
};
//#endregion
exports.default = config;

//# sourceMappingURL=lodash-unified.js.map