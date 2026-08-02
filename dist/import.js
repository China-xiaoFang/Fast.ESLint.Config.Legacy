const require_constants_index = require("./constants/index.js");
//#region src/configs/import/index.ts
/**
* 模块导入的 ESLint 8 Legacy Config 规则配置。
*
* 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 文件启用 import-x 推荐规则，
* 并检查重复导入、导入位置与排序。依赖项目 resolver 的高误报规则默认关闭。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/import"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/import/factory.js").createImportConfigs(require_constants_index.GLOBS_CODE)
};
//#endregion
module.exports = config;

//# sourceMappingURL=import.js.map