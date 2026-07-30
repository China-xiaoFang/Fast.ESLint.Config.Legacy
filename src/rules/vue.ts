import type { RuleOptions } from "../typegen";

/**
 * Vue SFC 本地覆写规则。
 *
 * 上游 recommended 预置负责基础正确性，这里只记录 Vue 2/3 共同的项目取舍与附加约束。
 * Vue 主版本差异由 `vue2Rules` 与 `vue3Rules` 追加，记录本身不配置 parser 或文件范围。
 *
 * @public
 */
export const vueCommonRules = {
	// [安全关注] v-html 可能引入 XSS；保留 warn 以兼容经过可靠净化的富文本场景。
	"vue/no-v-html": "warn",
	// [默认关闭] TypeScript 类型 props 和 required 声明已能表达可选性，不强制提供默认值。
	"vue/require-default-prop": "off",
	// [默认关闭] 允许 App、Layout 等约定俗成的单词组件名。
	"vue/multi-word-component-names": "off",
	// 优先从 vue 入口导入由 Vue 重新导出的 API，避免依赖内部包边界。
	"vue/prefer-import-from-vue": "warn",
	// 防止 props、data、computed、methods 等组件命名空间出现冲突。
	"vue/no-dupe-keys": "error",
	// [高影响] 禁止组件直接修改 props，要求通过事件或本地状态维持单向数据流。
	"vue/no-mutating-props": "error",
	// 避免自定义组件名与 Vue 内置组件冲突。
	"vue/no-reserved-component-names": "error",
	// [安全关注] 禁止在组件节点上使用 v-text/v-html，避免覆盖组件内容和模糊数据边界。
	"vue/no-v-text-v-html-on-component": "error",
	// 统一模板与脚本中的自定义事件名称为 camelCase。
	"vue/custom-event-name-casing": ["error", "camelCase"],
	// [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。
	"vue/one-component-per-file": "off",
	// [高影响][可自动修复] 统一模板属性分组；首次启用可能产生大量仅排序的模板差异。
	"vue/attributes-order": [
		"error",
		{
			order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"],
		},
	],
} satisfies RuleOptions;

/**
 * Vue 2 专属规则记录。
 *
 * 不强制使用 Vue 3 才完整支持的 emits 组件契约；只应与 Vue 2 upstream preset 组合。
 *
 * @public
 */
export const vue2Rules = {
	// Vue 2.6 及以下版本没有稳定的 emits 选项，不能把 Vue 3 公共事件契约用于 Vue 2 组件。
	"vue/require-explicit-emits": "off",
} satisfies RuleOptions;

/**
 * Vue 3 专属规则记录。
 *
 * 要求组件显式声明对外事件，使 emits 成为可审查的组件公共 API。
 *
 * @public
 */
export const vue3Rules = {
	// [高影响] 组件必须声明对外事件；未声明 emits 的组件会暴露未建模的公共事件 API。
	"vue/require-explicit-emits": "error",
} satisfies RuleOptions;
