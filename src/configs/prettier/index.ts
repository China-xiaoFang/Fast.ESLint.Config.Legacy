import { GLOBS_CODE } from "../../constants";

import { createPrettierConfigs } from "./factory";

import type { Linter } from "eslint";

/**
 * Prettier 兼容的 ESLint 8 Legacy Config 叠加配置。
 *
 * 该配置关闭 JavaScript、JSX、TypeScript、TSX 与 Vue 中可能和 Prettier 冲突的
 * ESLint 格式规则；它不会通过 ESLint 执行 Prettier，也不会修改文件。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/prettier"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createPrettierConfigs(GLOBS_CODE) };

export default config;
