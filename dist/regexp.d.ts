import { Linter } from "eslint";
//#region src/configs/regexp/index.d.ts
/**
 * 正则表达式的 ESLint 8 Legacy Config 规则配置。
 *
 * 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 启用 eslint-plugin-regexp 推荐规则，
 * 检查无效、冗余或容易产生错误匹配的正则表达式。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/regexp"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=regexp.d.ts.map