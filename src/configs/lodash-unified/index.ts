import { GLOBS_CODE } from "../../constants";
import { createLodashConfigs } from "../lodash/factory";

import type { Linter } from "eslint";

/**
 * lodash-unified 导入来源策略的 ESLint 8 Legacy Config 叠加配置。
 *
 * 该配置要求 JavaScript、TypeScript 与 Vue 代码统一从 `lodash-unified` 导入工具函数，
 * 并限制直接使用 `lodash`。
 * 它不包含语言 parser 或基础规则，应在完整语言配置之后按需叠加。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy", "@fast-china/eslint-config-legacy/lodash-unified"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = {
	reportUnusedDisableDirectives: true,
	overrides: createLodashConfigs("lodash-unified", GLOBS_CODE),
};

export default config;
