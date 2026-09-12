import type { RuleOptions } from "../typegen";

/**
 * 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
 *
 * @remarks
 * 默认规则面向 SDK、OA、Admin 与客户端项目使用同一套质量标准。这里只保留
 * 跨语言且误报较少的规则；纯格式和语法偏好交给 Prettier 或项目自行覆盖。
 */
export const commonRules = {
	/** 要求数组回调在所有可到达分支返回值，避免 `map`、`filter` 等调用静默产生 `undefined`。 */
	"array-callback-return": "error",
	/** 浏览器弹窗通常不适合生产代码；使用警告允许原型调试，同时确保发布前能够被发现。 */
	"no-alert": "warn",
	/** `switch` 的 `case` 不创建词法作用域；要求用花括号包裹声明，避免跨分支冲突。 */
	"no-case-declarations": "error",
	/** 禁止动态执行字符串代码，避免代码注入和静态分析失效。 */
	"no-eval": "error",
	/** 禁止 `setTimeout`、`setInterval` 等 API 通过字符串间接执行代码。 */
	"no-implied-eval": "error",
	/** 禁止使用 `Function` 构造器动态编译字符串代码，避免绕过静态分析和安全策略。 */
	"no-new-func": "error",
	/** Promise executor 的返回值会被忽略，禁止误把 `return` 当作 Promise 的解析结果。 */
	"no-promise-executor-return": "error",
	/** 禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。 */
	"no-multi-str": "error",
	/** `with` 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。 */
	"no-with": "error",
	/** Promise 是否等待由业务语义决定，不使用 `void promise` 作为 ESLint 规避语法。 */
	"no-void": "error",
	/** 简单单行分支允许省略花括号；多行分支必须使用花括号，同一条件链保持一致。 */
	curly: ["error", "multi-line", "consistent"],
	/** `default` 分支不是强制项，但存在时统一位于其他 `case` 之后。 */
	"default-case-last": "error",
	/** 要求严格相等；保留 `value == null` 同时判断 `null` 与 `undefined` 的常用写法。 */
	eqeqeq: ["error", "always", { null: "ignore" }],
	/** 使用幂运算符代替 `Math.pow`，使数学表达式更直接。 */
	"prefer-exponentiation-operator": "error",
	/** `import` 声明内部的成员按名称排序；声明之间的分组和顺序交给 `import-x/order`。 */
	"sort-imports": ["error", { ignoreDeclarationSort: true }],
} satisfies RuleOptions;
