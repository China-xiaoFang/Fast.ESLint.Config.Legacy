import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * Vue 3 应用的完整 ESLint 8 Legacy Config 预置。
 *
 * 该预置覆盖 JavaScript、TypeScript、Vue 3 SFC、JSON 方言、YAML 与 Markdown，
 * 使用 `plugin:vue/recommended` 并要求组件显式声明 emits。Vue 模板由
 * `vue-eslint-parser` 解析，TypeScript script 交给 `@typescript-eslint/parser`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/vue3"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("vue3");

export default config;
