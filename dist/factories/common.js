const require_constants_index = require("../constants/index.js");
const require_common = require("../rules/common.js");
//#region src/factories/common.ts
/**
* 创建跨 JavaScript、TypeScript、Vue、React 与 Angular 源码生效的基础配置。
*
* `eslint:recommended` 提供语言级正确性检查，本仓库只在其后补充经过说明的公共规则。
*
* @param files - 应用基础正确性规则的 glob 集合。
* @returns 单个限定文件范围的 override；文件集合为空时返回空数组。
* @internal
*/
const createCommonConfigs = (files = require_constants_index.GLOBS_CODE) => files.length > 0 ? [{
	files: [...files],
	extends: ["eslint:recommended"],
	rules: require_common.commonRules
}] : [];
//#endregion
exports.createCommonConfigs = createCommonConfigs;

//# sourceMappingURL=common.js.map