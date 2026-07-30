import type { RuleOptions } from "../typegen";

/**
 * TypeScript 本地覆写规则。
 *
 * 先关闭会误判 TypeScript 语法的核心规则，再启用 typescript-eslint 对应实现。
 * 该记录不启动类型服务；需要类型信息的规则由 `/type-aware` 的上游预置提供。
 *
 * @public
 */
export const typescriptRules = {
	// TypeScript 编译器负责派生类构造器校验，核心规则无法完整理解 TS 扩展语法。
	"constructor-super": "off",
	// TypeScript 的 getter 签名和抽象成员由编译器校验，避免核心规则误判。
	"getter-return": "off",
	// TypeScript 类型系统负责只读类绑定校验，核心规则不处理声明合并。
	"no-class-assign": "off",
	// TypeScript 编译器负责 const 赋值诊断，避免扩展语法节点被核心规则误判。
	"no-const-assign": "off",
	// TypeScript 函数重载由编译器校验，核心规则无法区分重载签名。
	"no-dupe-args": "off",
	// TypeScript 允许连续方法重载签名，核心规则会把它们当成重复成员。
	"no-dupe-class-members": "off",
	// TypeScript 的类型和值命名空间可能合法同名，交给编译器和 TS 插件处理。
	"no-dupe-keys": "off",
	// TypeScript 编译器负责函数绑定可写性，避免声明语法产生核心规则误报。
	"no-func-assign": "off",
	// TypeScript 编译器负责 import 绑定写入检查，并理解 import equals 等扩展语法。
	"no-import-assign": "off",
	// TypeScript 编译器负责原生构造器调用合法性，核心规则的语法模型不完整。
	"no-new-native-nonconstructor": "off",
	// TypeScript 编译器负责 Symbol 构造调用诊断，避免重复报告。
	"no-new-symbol": "off",
	// TypeScript 编译器负责内建对象调用诊断，避免重复报告。
	"no-obj-calls": "off",
	// TypeScript 编译器负责 setter 返回值约束，并能理解抽象或声明成员。
	"no-setter-return": "off",
	// TypeScript 编译器负责 super() 前 this 的使用诊断，避免扩展字段语法误报。
	"no-this-before-super": "off",
	// TypeScript 控制流分析负责不可达代码诊断，能处理 never 和类型收窄。
	"no-unreachable": "off",
	// TypeScript 编译器负责扩展运算符类型校验，避免核心规则处理 TS 节点时误判。
	"no-unsafe-negation": "off",
	// TypeScript 自己负责符号声明，核心 no-undef 无法识别类型、接口和声明合并。
	"no-undef": "off",
	// 由 TypeScript 版本接管，避免同一问题重复报告或误判声明合并。
	"no-redeclare": "off",
	// 由 TypeScript 版本接管，正确区分只存在于类型空间的符号。
	"no-unused-vars": "off",
	// 由 TypeScript 版本接管，以识别断言、非空表达式等扩展语法。
	"no-unused-expressions": "off",

	// 使用 TypeScript 版本避免误判声明合并、类型和值的同名声明。
	"@typescript-eslint/no-redeclare": "error",
	// [高影响][可自动修复] 未使用符号视为错误；自动删除前需确认 import 副作用，以下划线表示有意忽略。
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			args: "after-used",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
			varsIgnorePattern: "^_",
		},
	],
	// [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 namespace。
	"@typescript-eslint/no-namespace": "off",
	// any 会绕过类型检查，但在渐进类型化和第三方边界中有合理用途，因此只警告。
	"@typescript-eslint/no-explicit-any": "warn",
	// [高影响] 默认要求 ESM import；CommonJS 扩展名会在专用 override 中关闭此规则。
	"@typescript-eslint/no-require-imports": "error",
	// 使用 TS 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			allowShortCircuit: true,
			allowTernary: true,
		},
	],
	// [可自动修复] 删除可由 TypeScript 明确推断的原始值类型标注，减少重复信息。
	"@typescript-eslint/no-inferrable-types": "error",
	// 非空断言可能隐藏空值缺陷；以警告提示逐步消除而不阻断首次启用。
	"@typescript-eslint/no-non-null-assertion": "warn",
	// 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	// [高影响][可自动修复] 纯类型依赖改用内联 type import；需复核仅靠 import 触发的模块副作用。
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "inline-type-imports",
			prefer: "type-imports",
		},
	],
} satisfies RuleOptions;
