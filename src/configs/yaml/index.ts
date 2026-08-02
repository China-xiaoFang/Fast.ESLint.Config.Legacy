import { createYamlConfigs } from "./factory";

import type { Linter } from "eslint";

/**
 * YAML 文件的 ESLint 8 Legacy Config 配置。
 *
 * 该配置使用 yaml-eslint-parser 解析 `.yaml` 与 `.yml`，启用 eslint-plugin-yml
 * 推荐规则及 Prettier 兼容配置，不会通过 ESLint 执行格式化工具。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/yaml"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createYamlConfigs() };

export default config;
