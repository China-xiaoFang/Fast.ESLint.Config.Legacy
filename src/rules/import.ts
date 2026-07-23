import type { RuleOptions } from "../typegen";

/**
 * 按需启用：要求项目统一使用 lodash-unified。
 * 该组织偏好不会进入默认配置，使用者需从 rules 子路径显式导入。
 */
export const importUseLodashUnifiedRules = {
	// [高影响][按需启用] 阻止 lodash/lodash-es 及其子路径，启用前应先完成依赖迁移。
	"no-restricted-imports": [
		"error",
		{
			paths: [
				{ name: "lodash", message: "Use lodash-unified instead." },
				{ name: "lodash-es", message: "Use lodash-unified instead." },
			],
			patterns: [
				{
					group: ["lodash/*", "lodash-es/*"],
					message: "Use lodash-unified instead.",
				},
			],
		},
	],
} satisfies RuleOptions;

/**
 * 按需启用：要求项目统一使用 lodash。
 * 该组织偏好不会进入默认配置，使用者需从 rules 子路径显式导入。
 */
export const importUseLodashRules = {
	// [高影响][按需启用] 阻止 lodash-es/lodash-unified 及其子路径，启用前应完成依赖迁移。
	"no-restricted-imports": [
		"error",
		{
			paths: [
				{ name: "lodash-es", message: "Use lodash instead." },
				{ name: "lodash-unified", message: "Use lodash instead." },
			],
			patterns: [
				{
					group: ["lodash-es/*", "lodash-unified/*"],
					message: "Use lodash instead.",
				},
			],
		},
	],
} satisfies RuleOptions;

/** 默认启用的模块导入正确性与排序规则。 */
export const importRules = {
	// import 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。
	"import/first": "error",
	// 合并同一模块的重复 import，避免绑定分散或副作用被误读。
	"import/no-duplicates": "error",
	// [高影响][可自动修复] 按来源分组并排序；带副作用的裸 import 只报告，移动前必须确认执行顺序。
	"import/order": [
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
	"import/no-unresolved": "off",
	// [默认关闭] 未配置 resolver 时，namespace 导出的静态分析容易产生误报。
	"import/namespace": "off",
	// [默认关闭] 未配置 resolver 时，默认导出的静态分析容易产生误报。
	"import/default": "off",
	// [默认关闭] 不限制同时存在默认导出与相近命名导出的模块 API 风格。
	"import/no-named-as-default": "off",
	// [默认关闭] 不限制通过默认导入对象访问同名属性的项目 API 风格。
	"import/no-named-as-default-member": "off",
	// [默认关闭] 未配置 resolver 时，命名导出的静态分析容易产生误报。
	"import/named": "off",
} satisfies RuleOptions;
