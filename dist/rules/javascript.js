//#region src/rules/javascript.ts
/**
* JavaScript、JSX 以及框架脚本共同使用的 ESLint 核心规则记录。
*
* TypeScript 和 Vue 配置会在该记录之后关闭不理解扩展语法的核心规则。记录本身不包含
* parserOptions 或文件范围；高影响规则的行为与项目级覆盖方式见规则风险文档。
*
* @public
*/
const javascriptRules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"no-debugger": "error",
	"no-constant-condition": ["error", { checkLoops: false }],
	"no-restricted-syntax": ["error", "LabeledStatement"],
	"no-var": "error",
	"no-empty": ["error", { allowEmptyCatch: true }],
	"no-irregular-whitespace": "error",
	"no-use-before-define": ["warn", {
		classes: true,
		functions: false,
		variables: true
	}],
	"prefer-const": ["warn", {
		destructuring: "all",
		ignoreReadBeforeAssign: true
	}],
	"prefer-arrow-callback": ["error", {
		allowNamedFunctions: false,
		allowUnboundThis: true
	}],
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true
		}
	],
	"logical-assignment-operators": [
		"error",
		"always",
		{ enforceForIfStatements: true }
	],
	"prefer-object-spread": "error",
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"no-redeclare": "error"
};
//#endregion
exports.javascriptRules = javascriptRules;

//# sourceMappingURL=javascript.js.map