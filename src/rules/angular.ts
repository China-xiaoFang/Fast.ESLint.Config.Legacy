import type { RuleOptions } from "../typegen";

/**
 * Angular TypeScript 源码的本地规则记录。
 *
 * 该记录由 `/angular` 在 angular-eslint recommended 之后应用，只包含本包明确增加的
 * TypeScript 侧约束；模板规则与无障碍规则由 Angular 官方模板预置提供。
 *
 * @public
 */
export const angularRules = {
	// [高影响] OnPush 会改变组件变更检测边界，修复后必须验证状态更新与视图刷新。
	"@angular-eslint/prefer-on-push-component-change-detection": "error",
} satisfies RuleOptions;
