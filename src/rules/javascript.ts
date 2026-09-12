import type { RuleOptions } from "../typegen";

/**
 * JavaScript 本地覆写规则。
 *
 * @remarks
 * `@eslint/js` 推荐预置负责基础正确性。本记录补充命名、声明顺序和现代语法约定，
 * 供 SDK、管理端和客户端共同使用。
 */
export const javascriptRules = {
	/** 变量和类型使用 camelCase；对象属性允许沿用外部协议字段名。 */
	camelcase: ["error", { properties: "never" }],
	/** 控制台调用在应用源码中需要人工确认；`warn` 和 `error` 仍可用于必要的诊断输出。 */
	"no-console": [
		"warn",
		{
			allow: ["warn", "error"],
		},
	],
	/** 防止调试断点进入发布代码并中断运行。 */
	"no-debugger": "error",
	/** 禁止意外的恒定条件，但允许 `while (true)` 等有明确退出逻辑的循环。 */
	"no-constant-condition": [
		"error",
		{
			checkLoops: false,
		},
	],
	/** 禁止标签语句和 `with`，避免难以追踪的跳转与动态标识符解析。 */
	"no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
	/** 现代项目使用 `let` 或 `const` 替代 `var`，避免函数作用域和循环闭包陷阱。 */
	"no-var": "error",
	/** 允许明确表示忽略失败的空 `catch`，其他空代码块视为遗漏。 */
	"no-empty": ["error", { allowEmptyCatch: true }],
	/** 禁止肉眼难以识别、可能导致解析差异的非常规空白字符。 */
	"no-irregular-whitespace": "error",
	/** 变量和类先声明后使用；函数声明允许使用 JavaScript 提升语义。 */
	"no-use-before-define": ["warn", { classes: true, functions: false, variables: true }],
	/** 能保持引用不变的变量优先使用 `const`；读取发生在赋值前时不做不可靠判断。 */
	"prefer-const": [
		"warn",
		{
			destructuring: "all",
			ignoreReadBeforeAssign: true,
		},
	],
	/** 属性和值同名时强制使用对象简写，带引号键名不强制改写。 */
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true,
		},
	],
	/** 不依赖动态 `this` 的回调使用箭头函数；允许确实需要调用方绑定 `this` 的普通函数。 */
	"prefer-arrow-callback": ["error", { allowNamedFunctions: false, allowUnboundThis: true }],
	/** 将可等价改写的逻辑赋值统一为 `||=`、`&&=`、`??=`，并覆盖对应的 `if` 赋值写法。 */
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	/** 创建新对象时用对象展开代替 `Object.assign({}, source)`，不改写会修改既有目标对象的调用。 */
	"prefer-object-spread": "error",
	/** 使用具名 rest 参数代替 `arguments`，使参数范围明确并获得真实数组和类型推断能力。 */
	"prefer-rest-params": "error",
	/** 参数数组展开调用时使用 `fn(...args)` 代替 `fn.apply(thisArg, args)`，使调用目标和参数更直观。 */
	"prefer-spread": "error",
	/** 字符串中包含变量时使用模板字符串，减少多段 `+` 拼接和隐式类型转换造成的歧义。 */
	"prefer-template": "error",
	/** 同一作用域禁止重复声明变量、函数或类，避免前一声明被覆盖；TS 文件由对应扩展规则处理。 */
	"no-redeclare": "error",
} satisfies RuleOptions;
