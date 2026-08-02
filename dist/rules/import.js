//#region src/rules/import.ts
/**
* 模块导入正确性、去重与确定性排序规则。
*
* 该记录由 import 配置创建器在 `plugin:import-x/recommended` 之后应用。共享配置无法知道
* 消费项目的 alias、tsconfig paths 或 bundler resolver，因此依赖具体解析器的规则保持关闭。
* 副作用 import 会参与顺序诊断，但不会被插件自动移动。
*
* @public
*/
const importRules = {
	"import-x/first": "error",
	"import-x/no-duplicates": "error",
	"import-x/order": ["error", {
		groups: [
			"builtin",
			"external",
			"internal",
			"parent",
			"sibling",
			"index",
			"object",
			"type",
			"unknown"
		],
		"newlines-between": "always",
		alphabetize: {
			order: "asc",
			caseInsensitive: true
		},
		warnOnUnassignedImports: true
	}],
	"import-x/no-unresolved": "off",
	"import-x/namespace": "off",
	"import-x/default": "off",
	"import-x/no-named-as-default": "off",
	"import-x/no-named-as-default-member": "off",
	"import-x/named": "off"
};
//#endregion
exports.importRules = importRules;

//# sourceMappingURL=import.js.map