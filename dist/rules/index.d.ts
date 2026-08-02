import { RuleName, RuleOptions } from "../typegen.js";
import { angularRules } from "./angular.js";
import { commonRules } from "./common.js";
import { importRules } from "./import.js";
import { javascriptRules } from "./javascript.js";
import { preferLodashRules, preferLodashUnifiedRules } from "./lodash.js";
import { reactAutomaticRuntimeRules, reactRules, reactTypeScriptRules } from "./react.js";
import { packageJsonSortRules } from "./sort-package.js";
import { tsconfigJsonSortRules } from "./sort-tsconfig.js";
import { typescriptRules } from "./typescript.js";
import { vue2Rules, vue3Rules, vueCommonRules } from "./vue.js";
import { Linter } from "eslint";
//#region src/rules/index.d.ts
type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, RuleName>, never>;
/**
 * 为消费项目定义类型安全的 ESLint 8 规则记录。
 *
 * @param rules - 需要写入 `.eslintrc` 的规则记录。
 * @returns 与传入值引用相同、同时兼容 `Linter.RulesRecord` 的规则记录。
 * @public
 */
declare const defineRules: <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>) => Rules & Linter.RulesRecord;
//#endregion
export { type RuleName, type RuleOptions, angularRules, commonRules, defineRules, importRules, javascriptRules, packageJsonSortRules, preferLodashRules, preferLodashUnifiedRules, reactAutomaticRuntimeRules, reactRules, reactTypeScriptRules, tsconfigJsonSortRules, typescriptRules, vue2Rules, vue3Rules, vueCommonRules };
//# sourceMappingURL=index.d.ts.map