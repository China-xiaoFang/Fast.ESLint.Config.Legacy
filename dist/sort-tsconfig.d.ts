import { Linter } from "eslint";
//#region src/configs/sort-tsconfig/index.d.ts
/**
 * tsconfig 文件的 ESLint 8 Legacy Config 排序叠加配置。
 *
 * 该配置规范 `tsconfig.json` 及其变体中的顶层字段、compilerOptions 和数组顺序。
 * 首次自动修复可能产生较大差异，建议独立提交并复核。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/json", "@fast-china/eslint-config-legacy/sort-tsconfig"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=sort-tsconfig.d.ts.map