import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * 将静态 Lodash 导入来源统一为 `lodash-unified` 的叠加预置。
 *
 * 必须放在一个完整预置之后。该策略拒绝 `lodash`、`lodash-es` 及其子路径，
 * 但不会检查动态 `import()` 或 CommonJS `require()`，也不会修改项目依赖。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: [
 *     "@fast-china/eslint-config-legacy/vue3",
 *     "@fast-china/eslint-config-legacy/lodash-unified",
 *   ],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("lodash-unified");

export default config;
