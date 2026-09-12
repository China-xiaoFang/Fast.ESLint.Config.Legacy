import type { RuleOptions } from "../typegen";

/**
 * Vue 组件脚本语义规则。
 *
 * @remarks
 * 这些规则可以检查 SFC 脚本以及使用 `defineComponent()`、Options API 或 `setup()` 的
 * 独立 JSX/TSX 组件。纯模板语法规则由 {@link vueTemplateRules} 单独维护。
 */
export const vueScriptRules = {
	/** [默认关闭] TypeScript 类型 props 和 `required` 声明已能表达可选性，不强制每个可选 prop 提供默认值。 */
	"vue/require-default-prop": "off",
	/** 组件事件必须显式声明，形成可检查的对外事件契约。 */
	"vue/require-explicit-emits": "error",
	/** [默认关闭] 允许 `App`、`Layout` 等约定俗成的单词组件名。 */
	"vue/multi-word-component-names": "off",
	/** [默认关闭] 允许直接使用 Vue 子包入口，兼容编译器与运行时等明确子模块导入。 */
	"vue/prefer-import-from-vue": "off",
	/** `props`、`data`、`computed`、`methods` 等选项中禁止同名键，避免成员互相遮蔽。 */
	"vue/no-dupe-keys": "error",
	/** Props 属于父组件只读输入，子组件应通过 emit 或本地状态更新。 */
	"vue/no-mutating-props": "error",
	/** `setup` 中直接解构 props 会丢失响应性，要求保留 props 引用或使用 `toRefs` 等响应式转换。 */
	"vue/no-setup-props-reactivity-loss": "error",
	/** 禁止以会丢失响应性的方式解构或传递 ref 对象，确保后续更新仍能被 Vue 追踪。 */
	"vue/no-ref-object-reactivity-loss": "error",
	/** 组件名不能占用 Vue 内置组件或平台保留名称。 */
	"vue/no-reserved-component-names": "error",
	/** `emit`、`emits` 和事件处理引用中的自定义事件名称统一使用 camelCase，原生 DOM 事件不受影响。 */
	"vue/custom-event-name-casing": ["error", "camelCase"],
	/** [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。 */
	"vue/one-component-per-file": "off",
} satisfies RuleOptions;

/**
 * Vue 模板语法规则。
 *
 * @remarks
 * 这些规则依赖 `vue-eslint-parser` 生成的模板节点，只应用于 `.vue` 与 `.nvue`。
 * JSX 属性遵循 JavaScript 标识符和运行时约定，不能套用模板的 kebab-case 与属性排序。
 */
export const vueTemplateRules = {
	/** `v-html` 可能引入 XSS；保留警告以兼容经过净化的富文本场景。 */
	"vue/no-v-html": "warn",
	/** 自定义组件的模板属性统一使用 kebab-case；脚本中的 Props 与 JSX 属性仍使用 camelCase。 */
	"vue/attribute-hyphenation": ["error", "always"],
	/** 禁止在组件节点使用 `v-text` 或 `v-html`，避免覆盖组件内容并模糊数据边界。 */
	"vue/no-v-text-v-html-on-component": "error",
	/** 模板属性按定义、循环、条件、修饰、唯一属性、全局属性、普通属性、事件和内容排序。 */
	"vue/attributes-order": [
		"error",
		{
			order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "UNIQUE", "GLOBAL", "OTHER_ATTR", "EVENTS", "CONTENT"],
		},
	],
} satisfies RuleOptions;

/** Vue SFC 同时使用组件脚本语义规则与模板语法规则。 */
export const vueRules = {
	/** 复用可在 SFC 与独立 JSX/TSX 中检查的 Vue 组件脚本语义规则。 */
	...vueScriptRules,
	/** 叠加仅对 Vue 模板节点有效的语法规则。 */
	...vueTemplateRules,
} satisfies RuleOptions;
