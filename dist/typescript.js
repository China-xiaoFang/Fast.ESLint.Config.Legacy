//#region src/configs/typescript/index.ts
/**
* TypeScript 与 TSX 文件的 ESLint 8 Legacy Config 基础配置。
*
* 该配置启用 typescript-eslint 的 recommended 与 stylistic 规则，并关闭由
* TypeScript 版本替代的 ESLint 核心规则。默认不读取类型信息，速度适合日常检查；
* 需要类型感知规则时，应在该配置之后叠加 `/type-aware`。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/typescript"],
* };
* ```
*
* @public
*/
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./configs/typescript/factory.js").createTypeScriptConfigs()
};
//#endregion
module.exports = config;

//# sourceMappingURL=typescript.js.map