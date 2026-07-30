//#region src/presets/typescript.ts
/**
* JavaScript、JSX、TypeScript 与 TSX 项目的完整 ESLint 8 Legacy Config 预置。
*
* 该预置启用非类型感知的 typescript-eslint recommended/stylistic 规则，同时为
* TypeScript 关闭无法理解类型语法的 ESLint 核心规则。它不加载框架或数据文件配置；
* 需要类型信息时应在本预置之后叠加 `/type-aware`。
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
const config = (0, require("./core/index").createPreset)("typescript");
//#endregion
module.exports = config;

//# sourceMappingURL=typescript.js.map