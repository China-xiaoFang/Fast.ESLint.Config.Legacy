const require_constants_index = require("./constants/index.js");
//#region src/configs/regexp/index.ts
/**
* 正则表达式的 ESLint 8 Legacy Config 规则配置。
*
* 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 启用 eslint-plugin-regexp 推荐规则，
* 检查无效、冗余或容易产生错误匹配的正则表达式。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/regexp"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/regexp/factory.js").createRegexpConfigs(require_constants_index.GLOBS_CODE)
};
//#endregion
module.exports = config;

//# sourceMappingURL=regexp.js.map