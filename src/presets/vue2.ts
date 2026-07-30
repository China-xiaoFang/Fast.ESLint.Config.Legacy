import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * Vue 2 应用的完整 ESLint 8 Legacy Config 预置。
 *
 * 该预置覆盖 JavaScript、TypeScript、Vue 2 SFC、JSON 方言、YAML 与 Markdown，
 * 使用 `plugin:vue/vue2-recommended`，并关闭仅适用于 Vue 3 公共事件契约的规则。
 * browser 源码与 Node.js 工程文件使用彼此隔离的环境。
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
const config: Linter.Config = createPreset("vue2");

export default config;
