//#region src/configs/vue/index.ts
/**
* Vue 3 单文件组件的完整 ESLint 8 Legacy Config 配置。
*
* 该配置通过 vue-eslint-parser 检查 `.vue` 模板及 JavaScript、TypeScript script，
* 启用 `plugin:vue/recommended` 和 Vue 3 专属组件规则。Vue 2 项目应改用 `/vue2`；
* 需要类型感知规则时，应在该配置之后叠加 `/type-aware`。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/vue"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/vue/factory.js").createVueConfigs({ version: 3 })
};
//#endregion
module.exports = config;

//# sourceMappingURL=vue.js.map