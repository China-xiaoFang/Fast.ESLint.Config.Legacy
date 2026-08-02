import { GLOBS_CODE } from "../../constants";
import { createEnvironmentConfigs, createNodeToolingConfigs } from "../environment/factory";

import type { Linter } from "eslint";

/**
 * Node.js 项目的 ESLint 8 Legacy Config 运行环境配置。
 *
 * 该配置为 JavaScript、JSX、TypeScript、TSX、Vue 及常见工程脚本启用 Node.js 和
 * ES2022 globals，不包含浏览器 globals，也不引入专用 Node.js 规则插件。
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
const config: Linter.Config = {
	reportUnusedDisableDirectives: true,
	overrides: [...createEnvironmentConfigs({ environment: "node", files: GLOBS_CODE }), ...createNodeToolingConfigs()],
};

export default config;
