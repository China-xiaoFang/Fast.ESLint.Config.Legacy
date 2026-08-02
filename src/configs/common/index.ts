import { createCommonConfigs } from "./factory";

import type { Linter } from "eslint";

/**
 * 所有代码文件共用的 ESLint 8 Legacy Config 基础规则配置。
 *
 * 该配置启用适用于 JavaScript、TypeScript 及框架源码的通用正确性与代码质量规则，
 * 不负责配置 parser、运行环境或框架插件，应与对应的语言和环境配置组合使用。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/common"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createCommonConfigs() };

export default config;
