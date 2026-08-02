const require_constants_index = require("./constants/index.js");
//#region src/configs/prettier/index.ts
/**
* Prettier 兼容的 ESLint 8 Legacy Config 叠加配置。
*
* 该配置关闭 JavaScript、JSX、TypeScript、TSX 与 Vue 中可能和 Prettier 冲突的
* ESLint 格式规则；它不会通过 ESLint 执行 Prettier，也不会修改文件。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/prettier"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/prettier/factory.js").createPrettierConfigs(require_constants_index.GLOBS_CODE)
};
//#endregion
module.exports = config;

//# sourceMappingURL=prettier.js.map