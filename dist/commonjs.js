//#region src/configs/commonjs/index.ts
/**
* CommonJS 文件的 ESLint 8 Legacy Config 兼容配置。
*
* 该配置仅作用于 `.cjs` 与 `.cts` 文件，允许这些文件使用 `require()` 和
* `module.exports`，避免 TypeScript 的 ESM 导入限制误报 CommonJS 工程文件。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/commonjs"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/commonjs/factory.js").createCommonJsConfigs()
};
//#endregion
module.exports = config;

//# sourceMappingURL=commonjs.js.map