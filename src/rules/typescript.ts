import type { RuleOptions } from "../typegen";

/**
 * TypeScript 本地覆写规则。
 *
 * @remarks
 * `.ts`、`.mts` 与 `.cts` 导出成员视为模块公共 API，参数与返回类型必须显式声明；
 * 内部实现和内联回调保留类型推断。TSX 由配置末尾覆写保留组件返回类型推断。
 */
export const typescriptRules = {
	/** 单独组合 `createTypeScriptConfigs()` 时也禁止用 `void` 操作符标记被忽略的 Promise。 */
	"no-void": "error",
	/** TypeScript 重载与声明合并由扩展规则识别，关闭会把合法重载误判为重复声明的核心规则。 */
	"no-redeclare": "off",
	/** [默认关闭] 内部函数依赖 TypeScript 推断；公共导出边界由模块边界规则单独检查。 */
	"@typescript-eslint/explicit-function-return-type": "off",
	/** 导出函数和类的公共方法必须显式声明参数与返回类型，使公共 API 不依赖实现细节推断；参数不允许显式 `any`。 */
	"@typescript-eslint/explicit-module-boundary-types": ["error", { allowArgumentsExplicitlyTypedAsAny: false }],
	/** 使用 TypeScript 版本避免核心规则误判声明合并、类型和值的同名声明。 */
	"@typescript-eslint/no-redeclare": "error",
	/** 未使用符号视为错误；仅参数和异常可用下划线明确表示有意忽略。 */
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			args: "after-used",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
		},
	],
	/** [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 `namespace`。 */
	"@typescript-eslint/no-namespace": "off",
	/** `any` 会绕过类型检查，但第三方边界和渐进迁移仍可能需要，因此只警告。 */
	"@typescript-eslint/no-explicit-any": "warn",
	/** TypeScript 源码统一使用 ESM `import`；Node.js 工具文件由末尾覆写单独放开。 */
	"@typescript-eslint/no-require-imports": "error",
	/** 禁止普通空函数，避免遗漏实现；仅允许无函数体逻辑的构造器和有意留空的重写方法。 */
	"@typescript-eslint/no-empty-function": ["error", { allow: ["constructors", "overrideMethods"] }],
	/** 使用 TypeScript 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。 */
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			allowShortCircuit: true,
			allowTernary: true,
		},
	],
	/** 删除局部变量中可直接推断的原始类型；参数和属性允许保留公共契约与文档信息。 */
	"@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
	/** [默认关闭] 已知运行时不变量可使用标准非空断言；矛盾、重复和无效断言仍由专项规则检查。 */
	"@typescript-eslint/no-non-null-assertion": "off",
	/** 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。 */
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	/** 纯类型依赖必须使用独立的 `import type`，避免生成无用运行时导入并统一导入声明结构。 */
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			disallowTypeAnnotations: false,
			fixStyle: "separate-type-imports",
			prefer: "type-imports",
		},
	],
	/** 禁止 `import { type Foo }` 产生仅用于类型的运行时导入，统一提升为独立的 `import type`。 */
	"@typescript-eslint/no-import-type-side-effects": "error",
} satisfies RuleOptions;

/**
 * TypeScript 类型感知规则覆写。
 *
 * @remarks
 * 这些规则只在 Project Service 提供完整类型信息后应用。覆写优先保留真实 Bug 与类型安全检查，
 * 同时关闭会改变业务语义、强制单一语法形式或给通用 SDK 代码带来明显噪声的规则。
 */
export const typescriptTypeCheckedRules = {
	/** [默认关闭] 是否等待、返回或处理 Promise 由开发者根据业务顺序和异常语义决定。 */
	"@typescript-eslint/no-floating-promises": "off",
	/** [默认关闭] 不限制框架生命周期和事件回调的返回写法。 */
	"@typescript-eslint/strict-void-return": "off",
	/** [默认关闭] 核心 `no-void` 已禁止全部 `void` 操作符，关闭类型感知的重复诊断。 */
	"@typescript-eslint/no-meaningless-void-operator": "off",
	/** 保留简洁的 `() => notify()` 回调，其他容易混淆 `void` 值与返回值的用法继续检查。 */
	"@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
	/** 数字和布尔值是模板字符串的常见安全插值；对象、`any` 和空值仍需显式处理。 */
	"@typescript-eslint/restrict-template-expressions": ["error", { allowBoolean: true, allowNumber: true }],
	/** [默认关闭] 动态删除对象字段是表单和字典的正常操作；数组 `delete` 仍由专项规则禁止。 */
	"@typescript-eslint/no-dynamic-delete": "off",
	/** [默认关闭] 纯静态工具类可能是 SDK 的有意 API 设计，不强制改写为函数或对象。 */
	"@typescript-eslint/no-extraneous-class": "off",
	/** 弃用 API 需要可见，但兼容多个依赖版本时不应直接阻断构建。 */
	"@typescript-eslint/no-deprecated": "warn",
	/** [默认关闭] TypeScript 类型不一定覆盖外部输入的真实运行时，允许保留防御性条件。 */
	"@typescript-eslint/no-unnecessary-condition": "off",
	/** [默认关闭] 不强制使用 `interface` 或 `type` 的单一类型定义形式。 */
	"@typescript-eslint/consistent-type-definitions": "off",
	/** [默认关闭] 不强制使用索引签名、`Record` 或映射类型中的某一种固定写法。 */
	"@typescript-eslint/consistent-indexed-object-style": "off",
	/** [默认关闭] 不强制类的只读字面量属性改写为 getter 或字段中的某一种固定形式。 */
	"@typescript-eslint/class-literal-property-style": "off",
	/** [默认关闭] 不强制使用 `RegExp#exec` 取代字符串匹配 API。 */
	"@typescript-eslint/prefer-regexp-exec": "off",
	/** 纯类型导出必须使用 `export type`，避免生成或暗示不存在的运行时导出。 */
	"@typescript-eslint/consistent-type-exports": "error",
	/** 只在构造阶段赋值且之后保持不变的私有成员应声明为 `readonly`。 */
	"@typescript-eslint/prefer-readonly": "error",
	/** 原始类型的 `||` 与 `??` 可能承载不同业务语义，不为了风格强制互换。 */
	"@typescript-eslint/prefer-nullish-coalescing": ["error", { ignorePrimitives: true }],
	/** 仅在类型明确包含 `null` 或 `undefined` 时要求使用可选链，避免改变其他假值的业务语义。 */
	"@typescript-eslint/prefer-optional-chain": ["error", { requireNullish: true }],
	/** [默认关闭] 公共重载会影响类型查询与调用契约，不为减少声明行数强制合并。 */
	"@typescript-eslint/unified-signatures": "off",
	/** 联合类型和枚举新增成员时，`switch` 必须覆盖全部分支或显式提供 `default`。 */
	"@typescript-eslint/switch-exhaustiveness-check": "error",
	/** 禁止展开静态可知不可迭代或语义不匹配的值。 */
	"@typescript-eslint/no-misused-spread": "error",
	/** 禁止把不同类别的值混入同一枚举，避免比较和序列化语义不稳定。 */
	"@typescript-eslint/no-mixed-enums": "error",
	/** 非空断言与空值合并同时出现时逻辑矛盾。 */
	"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
	/** 删除不会改变条件结果的布尔字面量比较。 */
	"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
	/** 删除模板字符串中没有插值语义的冗余表达式。 */
	"@typescript-eslint/no-unnecessary-template-expression": "error",
	/** 删除可由调用参数直接推断的显式泛型实参。 */
	"@typescript-eslint/no-unnecessary-type-arguments": "error",
	/** 禁止不会改变运行时值或静态类型的冗余转换。 */
	"@typescript-eslint/no-unnecessary-type-conversion": "error",
	/** 默认参数已经表达回退值，不再重复传入 `undefined`。 */
	"@typescript-eslint/no-useless-default-assignment": "error",
	/** getter 与 setter 必须使用相互兼容的类型。 */
	"@typescript-eslint/related-getter-setter-pairs": "error",
	/** 只在错误处理语义需要时要求 `return await`，不增加纯风格 `await`。 */
	"@typescript-eslint/return-await": ["error", "error-handling-correctness-only"],
	/** Promise `catch` 回调接收未知拒绝原因，使用 `unknown` 后再显式收窄。 */
	"@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
	/** 无 `await` 的 `async` 会改变返回值和异常语义，应删除 `async` 或返回真实 Promise。 */
	"@typescript-eslint/require-await": "error",
	/** 允许透明转发外部 Promise 的未知拒绝原因；静态可知的 `string`、`number` 等仍会被报告。 */
	"@typescript-eslint/prefer-promise-reject-errors": ["error", { allowThrowingUnknown: true }],
} satisfies RuleOptions;
