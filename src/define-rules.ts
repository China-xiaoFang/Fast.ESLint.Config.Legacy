import type { RuleName, RuleOptions } from "./typegen";
import type { Linter } from "eslint";

type RejectUnknownRuleNames<Rules extends RuleOptions> = Rules & Record<Exclude<keyof Rules, RuleName>, never>;

/**
 * 为 bundled ESLint 8 核心规则与插件规则提供规则名自动补全。
 *
 * 该函数不会修改传入对象；它只在 TypeScript 编译阶段拒绝未知规则名。
 */
export const defineRules = <Rules extends RuleOptions>(rules: RejectUnknownRuleNames<Rules>): Rules & Linter.RulesRecord =>
	rules as Rules & Linter.RulesRecord;

export type { RuleName, RuleOptions } from "./typegen";
