import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * 整理 `package.json` 顶层字段、依赖映射与 `files` 数组的叠加预置。
 *
 * 必须放在一个完整预置之后，并且只在执行 `eslint --fix` 时改写顺序。
 * `package.json#exports` 内的条件键具有解析语义，因此本预置永远不会排序其内部结构。
 * 首次修复可能产生较大的清单差异，建议独立审查。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: [
 *     "@fast-china/eslint-config-legacy/base",
 *     "@fast-china/eslint-config-legacy/sort-package",
 *   ],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("sort-package");

export default config;
