const require_constants_index = require("./constants/index.js");
//#region src/configs/lodash/index.ts
/**
* lodash 导入来源策略的 ESLint 8 Legacy Config 叠加配置。
*
* 该配置要求 JavaScript、TypeScript 与 Vue 代码统一从 `lodash` 导入工具函数，
* 并限制 `lodash-unified` 等替代来源。
* 它不包含语言 parser 或基础规则，应在完整语言配置之后按需叠加。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy", "@fast-china/eslint-config-legacy/lodash"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/lodash/factory.js").createLodashConfigs("lodash", require_constants_index.GLOBS_CODE)
};
//#endregion
module.exports = config;

//# sourceMappingURL=lodash.js.map