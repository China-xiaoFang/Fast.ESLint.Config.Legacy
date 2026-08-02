//#region src/configs/angular/index.ts
/**
* Angular 应用的完整 ESLint 8 Legacy Config 配置。
*
* 该配置检查 Angular TypeScript 组件源码、外部 `.html` 模板和
* `@Component()` 内联模板，并启用 angular-eslint 的推荐与模板无障碍规则。
* 如需依赖类型信息的规则，请在该配置之后叠加 `/type-aware`。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/angular"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/angular/factory.js").createAngularConfigs()
};
//#endregion
module.exports = config;

//# sourceMappingURL=angular.js.map