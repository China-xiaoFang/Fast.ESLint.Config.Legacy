//#region src/rules/sort-package.ts
/**
* package.json 属性排序规则。
*
* `[高影响][可自动修复][按需启用]`：由 `/sort-package` 显式开启，首次修复可能重排大量字段。
* 注意：这里故意不排序 exports 内部键；条件导出的键顺序具有模块解析语义。
* 记录只描述排序规则，JSON parser 和方言预置由配置层负责提供。
*
* @public
*/
const packageJsonSortRules = {
	"jsonc/sort-array-values": ["error", {
		order: { type: "asc" },
		pathPattern: "^files$"
	}],
	"jsonc/sort-keys": [
		"error",
		{
			order: [
				"name",
				"version",
				"private",
				"packageManager",
				"allowScripts",
				"description",
				"type",
				"keywords",
				"license",
				"homepage",
				"bugs",
				"repository",
				"author",
				"contributors",
				"funding",
				"files",
				"main",
				"module",
				"types",
				"exports",
				"typesVersions",
				"sideEffects",
				"unpkg",
				"jsdelivr",
				"browser",
				"bin",
				"man",
				"directories",
				"publishConfig",
				"scripts",
				"peerDependencies",
				"peerDependenciesMeta",
				"optionalDependencies",
				"dependencies",
				"devDependencies",
				"engines",
				"config",
				"overrides",
				"pnpm",
				"husky",
				"lint-staged",
				"eslintConfig",
				"prettier"
			],
			pathPattern: "^$"
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
		}
	]
};
//#endregion
exports.packageJsonSortRules = packageJsonSortRules;

//# sourceMappingURL=sort-package.js.map