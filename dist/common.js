//#region src/configs/common/index.ts
/**
* 所有代码文件共用的 ESLint 8 Legacy Config 基础规则配置。
*
* 该配置启用适用于 JavaScript、TypeScript 及框架源码的通用正确性与代码质量规则，
* 不负责配置 parser、运行环境或框架插件，应与对应的语言和环境配置组合使用。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/common"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/common/factory.js").createCommonConfigs()
};
//#endregion
module.exports = config;

//# sourceMappingURL=common.js.map