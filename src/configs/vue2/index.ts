import { createVueConfigs } from "../vue/factory";

import type { Linter } from "eslint";

/**
 * Vue 2 单文件组件的完整 ESLint 8 Legacy Config 配置。
 *
 * 该配置通过 vue-eslint-parser 检查 `.vue` 模板及 JavaScript、TypeScript script，
 * 启用 Vue 2 对应的推荐配置和组件规则，不启用仅适用于 Vue 3 的 emits 契约。
 * 需要类型感知规则时，应在该配置之后叠加 `/type-aware`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/vue2"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createVueConfigs({ version: 2 }) };

export default config;
