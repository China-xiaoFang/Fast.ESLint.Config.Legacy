import { Linter } from "eslint";
//#region src/configs/sort-package/index.d.ts
/**
 * package.json 的 ESLint 8 Legacy Config 排序叠加配置。
 *
 * 该配置规范清单字段及部分数组的顺序，但不会排序具有条件匹配语义的 `exports`
 * 对象。首次自动修复可能产生较大差异，建议独立提交并复核。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/json", "@fast-china/eslint-config-legacy/sort-package"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=sort-package.d.ts.map