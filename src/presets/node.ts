import { createPreset } from "../core/index";

import type { Linter } from "eslint";

/**
 * Node.js 项目的完整 ESLint 8 Legacy Config 预置。
 *
 * JavaScript、TypeScript、JSON 方言、YAML 与 Markdown 均包含在预置中；代码文件
 * 获得 Node.js globals，不会混入 browser globals。本预置不引入专用 Node 规则插件，
 * 因此不会强加特定 Node.js API 风格。如需类型感知规则，请在其后叠加 `/type-aware`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/node"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = createPreset("node");

export default config;
