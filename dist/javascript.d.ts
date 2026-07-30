import { Linter } from "eslint";
//#region src/presets/javascript.d.ts
/**
 * JavaScript 与 JSX 项目的最小完整 ESLint 8 Legacy Config 预置。
 *
 * 该预置只接管 `.js`、`.cjs`、`.mjs` 与 `.jsx`，并启用基础正确性、import、
 * Promise、RegExp 和 Prettier 兼容配置。它不加载 TypeScript、框架或数据文件规则。
 * 普通源码使用 browser 环境，明确的工程文件仍使用 Node.js 环境。
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