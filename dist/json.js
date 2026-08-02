//#region src/configs/json/index.ts
/**
* JSON 系列文件的 ESLint 8 Legacy Config 配置。
*
* 该配置分别解析并检查 `.json`、`.jsonc` 与 `.json5` 文件，启用对应的
* eslint-plugin-jsonc 推荐规则及 Prettier 兼容配置，但不启用清单排序规则。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/json"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/json/factory.js").createJsonConfigs()
};
//#endregion
module.exports = config;

//# sourceMappingURL=json.js.map