const require_constants_index = require("../../constants/index.js");
const require_sort_tsconfig = require("../../rules/sort-tsconfig.js");
const require_factory = require("../json/factory.js");
//#region src/configs/sort-tsconfig/factory.ts
/**
* 创建显式启用的 `tsconfig*.json` 排序 override。
*
* 当调用方没有加载 JSON 基础配置时，该函数会补充 JSONC parser 与推荐规则，确保注释
* 合法且被保留。排序只改变字段顺序，不改变编译器选项、文件列表或项目引用值。
*
* @param options - JSON 基础配置存在性及 Prettier 兼容层开关。
* @returns 匹配根和派生 tsconfig 文件的单个 override。
* @internal
*/
const createTsconfigSortConfigs = ({ json = true, prettier = true } = {}) => [{
	files: [...require_constants_index.GLOBS_TSCONFIG],
	...json ? {} : { extends: require_factory.createJsonExtends("jsonc", prettier) },
	rules: require_sort_tsconfig.tsconfigJsonSortRules
}];
//#endregion
exports.createTsconfigSortConfigs = createTsconfigSortConfigs;

//# sourceMappingURL=factory.js.map