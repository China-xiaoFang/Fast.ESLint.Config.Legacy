import type { RuleOptions } from "../typegen";

/**
 * Vue SFC 本地覆写规则。
 * 上游 recommended 预置负责基础正确性，这里只记录项目取舍与附加约束。
 */
export const vueRules = {
	// [安全关注] v-html 可能引入 XSS；保留 warn 以兼容经过可靠净化的富文本场景。
	"vue/no-v-html": "warn",
	// [默认关闭] TypeScript 类型 props 和 required 声明已能表达可选性，不强制提供默认值。
	"vue/require-default-prop": "off",
	// [高影响] 组件必须声明对外事件；旧组件迁移时会暴露未建模的公共事件 API。
	"vue/require-explicit-emits": "error",
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
