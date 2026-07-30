//#region src/presets/react.ts
/**
* React 应用的完整 ESLint 8 Legacy Config 预置。
*
* 该预置覆盖 JavaScript、JSX、TypeScript 与 TSX，启用 React recommended、自动 JSX
* runtime、React Hooks 和 JSX accessibility，并避免在 TSX 中重复要求 PropTypes。
* 应用源码使用 browser 环境；需要类型信息的规则应通过后置 `/type-aware` 启用。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/react"],
* };
* ```
*
* @public
*/
const config = (0, require("./core/index").createPreset)("react");
//#endregion
module.exports = config;

//# sourceMappingURL=react.js.map