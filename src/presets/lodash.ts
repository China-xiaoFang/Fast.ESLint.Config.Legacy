import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * 将静态 Lodash 导入来源统一为 `lodash` 的叠加预置。
 *
 * 必须放在一个完整预置之后。该策略拒绝 `lodash-es`、`lodash-unified` 及其子路径，
 * 但允许 `lodash` 根入口和 `lodash/*` 子路径。它不检查动态 `import()` 或 CommonJS
 * `require()`，也不会安装或替换任何依赖。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: [
 *     "@fast-china/eslint-config-legacy/typescript",
 *     "@fast-china/eslint-config-legacy/lodash",
 *   ],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("lodash");

export default config;
