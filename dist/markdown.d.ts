import { Linter } from "eslint";
//#region src/configs/markdown/index.d.ts
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
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=markdown.d.ts.map