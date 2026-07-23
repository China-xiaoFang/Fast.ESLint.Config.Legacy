import type { RuleOptions } from "../typegen";

/**
 * package.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：默认随 JSON 支持启用，首次修复可能重排大量字段。
 * 注意：这里故意不排序 exports 内部键；条件导出的键顺序具有模块解析语义。
 */
export const packageJsonSortRules = {
	// [高影响][可自动修复] npm 的 files 清单按字母排序；数组顺序不改打包集合。
	"jsonc/sort-array-values": [
		"error",
		{
			order: { type: "asc" },
			pathPattern: "^files$",
		},
	],
	// [高影响][可自动修复] 仅排序明确安全的 package.json 区域，不进入 exports 条件对象。
	"jsonc/sort-keys": [
		"error",
		// 根字段按常见阅读顺序组织，减少不同项目之间的清单噪声。
		{
			order: [
				"name",
				"version",
				"private",
				"packageManager",
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
				"prettier",
			],
			pathPattern: "^$",
		},
		// 各类依赖映射按包名排序，方便发现重复或异常依赖。
		{
			order: { type: "asc" },
			pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
		},
		// overrides/resolutions 只排序直接键；修改前仍应关注包管理器的模式匹配语义。
		{
			order: { type: "asc" },
			pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
		},
	],
} satisfies RuleOptions;
