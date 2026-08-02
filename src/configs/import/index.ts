import { GLOBS_CODE } from "../../constants";

import { createImportConfigs } from "./factory";

import type { Linter } from "eslint";

/**
 * 模块导入的 ESLint 8 Legacy Config 规则配置。
 *
 * 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 文件启用 import-x 推荐规则，
 * 并检查重复导入、导入位置与排序。依赖项目 resolver 的高误报规则默认关闭。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/import"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = { reportUnusedDisableDirectives: true, overrides: createImportConfigs(GLOBS_CODE) };

export default config;
