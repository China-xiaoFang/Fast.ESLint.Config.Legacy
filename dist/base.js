//#region src/presets/base.ts
/**
* 无前端框架项目的完整 ESLint 8 Legacy Config 预置。
*
* 该预置覆盖 JavaScript、JSX、TypeScript、TSX、JSON 方言、YAML、Markdown、
* Promise、RegExp 与模块导入规则。源码默认使用 browser 环境，Node.js 工程文件
* 使用独立 override。该预置不启用 Vue、React 或 Angular 规则。
*
* @example
* ```js
* module.exports = {
*   extends: ["@fast-china/eslint-config-legacy/base"],
* };
* ```
*
* @public
*/
const config = (0, require("./core/index").createPreset)("base");
//#endregion
module.exports = config;

//# sourceMappingURL=base.js.map