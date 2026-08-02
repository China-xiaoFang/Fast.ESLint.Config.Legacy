//#region src/rules/common.ts
/**
* 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
*
* 维护约定：每条本地覆写都要说明启用原因；可能造成大面积改动、采用阻力或
* 行为变化的规则使用 `[高影响]` 标记，并同步维护规则风险文档。
* 该记录不包含文件范围，直接消费时应由调用方把它放入适当的 Legacy override。
*
* @public
*/
const commonRules = {
	"array-callback-return": "error",
	"no-alert": "warn",
	"no-case-declarations": "error",
	"no-multi-str": "error",
	"no-with": "error",
	"no-void": ["error", { allowAsStatement: true }],
	eqeqeq: [
		"error",
		"always",
		{ null: "ignore" }
	],
	"prefer-exponentiation-operator": "error",
	"prefer-object-has-own": "error",
	"sort-imports": ["warn", {
		ignoreCase: false,
		ignoreDeclarationSort: true,
		ignoreMemberSort: false,
		memberSyntaxSortOrder: [
			"none",
			"all",
			"multiple",
			"single"
		],
		allowSeparatedGroups: false
	}]
};
//#endregion
exports.commonRules = commonRules;

//# sourceMappingURL=common.js.map