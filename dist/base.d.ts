import { Linter } from "eslint";
//#region src/presets/base.d.ts
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
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=base.d.ts.map