import type { RuleOptions } from "../typegen";

/**
 * 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
 *
 * 维护约定：每条本地覆写都要说明启用原因；可能造成大面积改动、采用阻力或
 * 行为变化的规则使用 `[高影响]` 标记，并同步维护规则风险文档。
 * 该记录不包含文件范围，直接消费时应由调用方把它放入适当的 Legacy override。
 *
 * @public
 */
export const commonRules = {
	// 数组回调必须在所有可到达分支返回值，避免 map/filter 等调用静默产生 undefined。
	"array-callback-return": "error",
	// 浏览器弹窗通常不适合生产代码；保留为警告以兼容原型开发和已有管理页面。
	"no-alert": "warn",
	// switch 的 case 不创建词法作用域；要求用花括号包裹声明，避免跨 case 冲突。
	"no-case-declarations": "error",
	// 禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。
	"no-multi-str": "error",
	// with 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。
	"no-with": "error",
	// 允许用 `void promise` 明确忽略 Promise，但禁止在普通表达式中滥用 void。
	"no-void": [
		"error",
		{
			allowAsStatement: true,
		},
	],
	// 要求严格相等；保留 `value == null` 同时判断 null/undefined 的常用写法。
	eqeqeq: ["error", "always", { null: "ignore" }],
	// 幂运算统一使用 **，减少 Math.pow 嵌套并保持现代语法风格。
	"prefer-exponentiation-operator": "error",
	// 使用 Object.hasOwn，避免对象覆盖或缺少 hasOwnProperty 时产生异常。
	"prefer-object-has-own": "error",
	// [可自动修复] 声明间顺序交给 import 插件；这里只排序同一 import 的成员。
	"sort-imports": [
		"warn",
		{
			ignoreCase: false,
			ignoreDeclarationSort: true,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
			allowSeparatedGroups: false,
		},
	],
} satisfies RuleOptions;
