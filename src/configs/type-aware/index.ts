import { createTypeAwareConfigs } from "../typescript/factory";

import type { Linter } from "eslint";

/**
 * TypeScript 与 Vue 的 ESLint 8 Legacy Config 类型感知叠加配置。
 *
 * 该配置启用 typescript-eslint Project Service 及需要类型信息的推荐规则，包括
 * Promise、条件判断和类型安全检查。它会增加检查开销，应放在 `/typescript`、
 * `/vue`、`/vue2` 或其他完整配置之后叠加。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/typescript", "@fast-china/eslint-config-legacy/type-aware"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createTypeAwareConfigs() };

export default config;
