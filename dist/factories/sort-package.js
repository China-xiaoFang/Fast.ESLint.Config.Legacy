const require_sort_package = require("../rules/sort-package.js");
const require_json = require("./json.js");
//#region src/factories/sort-package.ts
/**
* 创建显式启用的 `package.json` 排序 override。
*
* 当调用方没有加载 JSON 基础配置时，该函数会为 `package.json` 补充严格 JSON parser
* 与推荐规则。实际字段顺序由 `packageJsonSortRules` 定义，并刻意避开条件导出对象。
*
* @param options - JSON 基础配置存在性及 Prettier 兼容层开关。
* @returns 只匹配 `package.json` 的单个 override。
* @internal
*/
const createPackageJsonSortConfigs = ({ json = true, prettier = true } = {}) => [{
	files: ["**/package.json"],
	...json ? {} : { extends: require_json.createJsonExtends("json", prettier) },
	rules: require_sort_package.packageJsonSortRules
}];
//#endregion
exports.createPackageJsonSortConfigs = createPackageJsonSortConfigs;

//# sourceMappingURL=sort-package.js.map