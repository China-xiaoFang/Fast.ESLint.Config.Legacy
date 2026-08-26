import { GLOBS_CODE } from "../../constants";
import { createRegexpConfigs } from "./factory";
import type { Linter } from "eslint";

/**
 * 正则表达式的 ESLint 8 Legacy Config 规则配置。
 *
 * 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 启用显式维护的 eslint-plugin-regexp
 * 正确性与安全规则，检查无效结构、潜在错误和灾难性回溯。
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
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createRegexpConfigs(GLOBS_CODE) };

export default config;
