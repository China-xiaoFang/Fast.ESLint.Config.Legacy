import { createMarkdownConfigs } from "./factory";

import type { Linter } from "eslint";

const markdownConfigs = createMarkdownConfigs();

/**
 * Markdown 文档的 ESLint 8 Legacy Config 配置。
 *
 * 该配置启用 `plugin:markdown/recommended-legacy` processor，检查 Markdown
 * 文档中的 JavaScript 与 TypeScript 代码块，并关闭不适用于片段代码的规则。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/markdown"],
 * };
 * ```
 *
 * @public
 */
const config: Linter.Config = {
	extends: markdownConfigs.extends,
	reportUnusedDisableDirectives: true,
	overrides: markdownConfigs.overrides,
};

export default config;
