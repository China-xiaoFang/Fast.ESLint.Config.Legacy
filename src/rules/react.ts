import type { RuleOptions } from "../typegen";

/**
 * React 本地覆写规则。
 *
 * React、Hooks 与 JSX accessibility 推荐预置负责基础正确性；这里补充与
 * `@fast-china/eslint-config` 意图一致、且能由 ESLint 8 插件可靠实现的约束。
 * 该记录同时用于 JSX 与 TSX；TypeScript 专属关闭项由 `reactTypeScriptRules` 单独提供。
 *
 * @public
 */
export const reactRules = {
	// button 缺少 type 时在表单内默认为 submit，显式声明可避免意外提交。
	"react/button-has-type": "error",
	// [安全关注] 未受限 iframe 权限面较大；以 warn 提醒评估可信来源和 sandbox 策略。
	"react/iframe-missing-sandbox": "warn",
	// JSX 属性拼写错误会被 React 忽略或错误透传到 DOM，应在提交前阻断。
	"react/no-unknown-property": "error",
	// [安全关注] target="_blank" 未隔离 opener 时可能允许目标页控制来源页。
	"react/jsx-no-target-blank": "error",
	// [高影响][可自动修复] 无子节点的组件统一使用自闭合形式；首次启用会产生较多 JSX 差异。
	"react/self-closing-comp": ["error", { component: true, html: true }],
	// [可自动修复] 布尔属性为 true 时省略显式值，保持模板简洁。
	"react/jsx-boolean-value": ["error", "never"],
	// 数组索引无法在插入或重排后稳定标识元素，以警告推动使用业务键。
	"react/no-array-index-key": "warn",
	// 无意义 Fragment 会增加组件树阅读成本；警告级别为复杂条件渲染保留人工判断空间。
	"react/jsx-no-useless-fragment": "warn",
} satisfies RuleOptions;

/**
 * React 自动 JSX runtime 的兼容规则记录。
 *
 * React 配置创建器默认采用 automatic runtime，因此不要求每个 JSX/TSX 文件显式导入 React。
 * 使用 classic runtime 的自定义组合不应应用该记录。
 *
 * @public
 */
export const reactAutomaticRuntimeRules = {
	// 自动 JSX runtime 不再要求每个 JSX 文件显式导入 React。
	"react/react-in-jsx-scope": "off",
	// 自动 JSX runtime 不需要通过伪引用把 React 标记为已使用。
	"react/jsx-uses-react": "off",
} satisfies RuleOptions;

/**
 * React TypeScript 文件的规则兼容层。
 *
 * TSX props 已由 TypeScript 描述，因此关闭重复且可能漂移的运行时 PropTypes 检查。
 *
 * @public
 */
export const reactTypeScriptRules = {
	// TSX props 由 TypeScript 校验；重复的 PropTypes 容易与类型声明漂移。
	"react/prop-types": "off",
} satisfies RuleOptions;
