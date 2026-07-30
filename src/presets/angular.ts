import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * Angular 应用的完整 ESLint 8 Legacy Config 预置。
 *
 * 该预置检查 JavaScript、TypeScript、Angular 组件源码、外部 `.html` 模板和
 * `@Component()` 内联模板，并启用 angular-eslint 的推荐与模板无障碍规则。
 * 应用源码使用 browser 环境；构建脚本等工程文件会单独获得 Node.js globals。
 * 如需依赖类型信息的规则，请在本预置之后叠加 `/type-aware`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/angular"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("angular");

export default config;
