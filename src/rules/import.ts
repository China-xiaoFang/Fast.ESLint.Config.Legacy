import type { RuleOptions } from "../typegen";

/**
 * 模块导入正确性、去重与确定性排序规则。
 *
 * 该记录由 import 配置创建器在 `plugin:import-x/recommended` 之后应用。共享配置无法知道
 * 消费项目的 alias、tsconfig paths 或 bundler resolver，因此依赖具体解析器的规则保持关闭。
 * 副作用 import 会参与顺序诊断，但不会被插件自动移动。
 *
 * @public
 */
export const importRules = {
	// import 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。
	"import-x/first": "error",
	// 合并同一模块的重复 import，避免绑定分散或副作用被误读。
	"import-x/no-duplicates": "error",
	// [高影响][可自动修复] 按来源分组并排序；带副作用的裸 import 只报告，移动前必须确认执行顺序。
	"import-x/order": [
		"error",
		{
			groups: [
				// Node.js 内置模块
				"builtin",
				// 第三方依赖
				"external",
				// 项目内部别名模块
				"internal",
				// 父级目录模块
				"parent",
				// 同级目录模块
				"sibling",
				// 当前目录入口模块
				"index",
				// TypeScript import = require() 导入
				"object",
				// TypeScript 类型导入
				"type",
				// 无法识别分类的导入
				"unknown",
			],
			// 不同 import 分组之间必须保留一个空行
			"newlines-between": "always",
			// 同一分组内按照模块路径字母升序排列。
			alphabetize: {
				order: "asc",
				caseInsensitive: true,
			},
			// 副作用导入参与顺序检查，但插件不会自动移动它们。
			warnOnUnassignedImports: true,
		},
	],
	// [默认关闭] Vite/TypeScript 别名由项目 resolver 校验，避免共享配置绑定特定方案。
	"import-x/no-unresolved": "off",
	// [默认关闭] 未配置 resolver 时，namespace 导出的静态分析容易产生误报。
	"import-x/namespace": "off",
	// [默认关闭] 未配置 resolver 时，默认导出的静态分析容易产生误报。
	"import-x/default": "off",
	// [默认关闭] 不限制同时存在默认导出与相近命名导出的模块 API 风格。
	"import-x/no-named-as-default": "off",
	// [默认关闭] 不限制通过默认导入对象访问同名属性的项目 API 风格。
	"import-x/no-named-as-default-member": "off",
	// [默认关闭] 未配置 resolver 时，命名导出的静态分析容易产生误报。
	"import-x/named": "off",
} satisfies RuleOptions;
