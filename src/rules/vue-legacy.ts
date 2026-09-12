import { vueRules } from "./vue";
import type { RuleOptions } from "../typegen";

/**
 * Vue 2/3 Legacy 规则入口的向后兼容导出。
 *
 * @remarks
 * 现代基准已将 Vue 脚本与模板规则合并为 {@link vueRules}。Legacy 包继续保留旧命名，
 * 避免删除公开导出；Vue 3 组合后的规则与基准一致，Vue 2 只关闭其运行时不支持的 emits 契约。
 */
const { "vue/require-explicit-emits": requireExplicitEmits, ...commonRules } = vueRules;

/** @deprecated 请改用 {@link vueRules}。 */
export const vueCommonRules = commonRules satisfies RuleOptions;

/** Vue 2 不具备稳定的 emits 公共契约。 */
export const vue2Rules = {
	"vue/require-explicit-emits": "off",
} satisfies RuleOptions;

/** Vue 3 保持与基准一致的 emits 公共契约。 */
export const vue3Rules = {
	"vue/require-explicit-emits": requireExplicitEmits,
} satisfies RuleOptions;
