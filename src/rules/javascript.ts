import type { RuleOptions } from "../typegen";

/**
 * JavaScript、JSX 以及框架脚本共同使用的 ESLint 核心规则记录。
 *
 * TypeScript 和 Vue 配置会在该记录之后关闭不理解扩展语法的核心规则。记录本身不包含
 * parserOptions 或文件范围；高影响规则的行为与项目级覆盖方式见规则风险文档。
 *
 * @public
 */
export const javascriptRules = {
	// 控制台调用在应用源码中需要人工确认；warn/error 仍可用于必要的诊断输出。
	"no-console": [
		"warn",
		{
			allow: ["warn", "error"],
		},
	],
	// 防止调试断点进入发布代码并中断运行。
	"no-debugger": "error",
	// 禁止意外的恒定条件，但允许 while (true) 等有明确退出逻辑的循环。
	"no-constant-condition": [
		"error",
		{
			checkLoops: false,
		},
	],
	// [高影响] 禁止标签语句；包含多层循环 labeled break/continue 的代码需先重构控制流。
	"no-restricted-syntax": ["error", "LabeledStatement"],
	// [高影响][可自动修复] 使用 let/const 替代 var；修复后需复核循环闭包和声明提升行为。
	"no-var": "error",
	// 禁止无说明的空代码块；允许用于“忽略失败”语义的空 catch。
	"no-empty": [
		"error",
		{
			allowEmptyCatch: true,
		},
	],
	// 拒绝肉眼难以识别、可能导致解析差异的非常规空白字符。
	"no-irregular-whitespace": "error",
	// 变量和类先声明后使用；函数声明允许提升。使用 warn 避免首次启用时产生过多阻断。
	"no-use-before-define": [
		"warn",
		{
			classes: true,
			functions: false,
			variables: true,
		},
	],
	// [可自动修复] 能保持引用不变的变量优先使用 const；读取先于赋值时不做不可靠判断。
	"prefer-const": [
		"warn",
		{
			destructuring: "all",
			ignoreReadBeforeAssign: true,
		},
	],
	// [高影响][可自动修复] 优先箭头回调；批量修复后应复核 this、arguments 与函数名栈信息。
	"prefer-arrow-callback": [
		"error",
		{
			allowNamedFunctions: false,
			allowUnboundThis: true,
		},
	],
	// [可自动修复] 属性和值同名时使用对象简写，带引号键名不强制改写。
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true,
		},
	],
	// [高影响][可自动修复] 使用 ||=、&&=、??=；涉及 getter/Proxy 时应复核求值次数。
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
	// [可自动修复] 合并对象时优先展开语法，避免 Object.assign 的额外目标对象样板。
	"prefer-object-spread": "error",
	// 可变参数函数优先 rest 参数，避免依赖类数组 arguments；该规则只报告，不自动改写签名。
	"prefer-rest-params": "error",
	// 调用可迭代对象时优先 spread；该规则只报告，避免自动改变 apply 的 this 语义。
	"prefer-spread": "error",
	// [可自动修复] 字符串拼接优先模板字符串，便于阅读和多段插值。
	"prefer-template": "error",
	// 同一作用域禁止重复声明，避免后声明遮盖前声明。
	"no-redeclare": "error",
} satisfies RuleOptions;
