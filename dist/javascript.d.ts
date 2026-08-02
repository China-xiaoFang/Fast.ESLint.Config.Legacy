import { Linter } from "eslint";
//#region src/configs/javascript/index.d.ts
/**
 * JavaScript 与 JSX 文件的 ESLint 8 Legacy Config 基础配置。
 *
 * 该配置使用 `eslint:recommended` 并启用本项目的 JavaScript 正确性与风格规则，
 * 仅处理 JavaScript 和 JSX；TypeScript 文件应叠加 `/typescript`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/javascript"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=javascript.d.ts.map