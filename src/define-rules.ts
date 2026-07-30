import type { RuleName, RuleOptions } from "./typegen";
import type { Linter } from "eslint";

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, RuleName>, never>;

/**
 * 为消费项目定义类型安全的 ESLint 8 规则记录。
 *
 * 函数在运行时原样返回传入对象，不克隆、不冻结，也不改变规则优先级；它只在 TypeScript
 * 编译阶段限制规则名为本包内置的 ESLint 与插件规则，并保留每条规则的具体值类型。
 * 仅由消费项目额外安装的插件不属于生成类型范围，应直接使用 ESLint 的 `Linter.RulesRecord`。
 *
 * @param rules - 需要写入 `.eslintrc` 的规则记录。
 * @returns 与传入值引用相同、同时兼容 `Linter.RulesRecord` 的规则记录。
 *
 * @example
 * ```ts
 * const rules = defineRules({
 *   "no-console": "warn",
 *   "vue/no-v-html": "error",
 * });
 * ```
 *
 * @public
 */
export const defineRules = <const Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord =>
	rules as Rules & Linter.RulesRecord;
