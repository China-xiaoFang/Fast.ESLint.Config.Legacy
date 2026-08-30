import type { RuleOptions } from "../typegen";

/**
 * 模块导入正确性、去重与确定性排序规则。
 *
 * 该记录由 import 配置创建器在 `plugin:import-x/recommended` 之后应用。共享配置无法知道
 * 消费项目的 alias、tsconfig paths 或 bundler resolver，因此依赖具体解析器的规则保持关闭。
 * 非样式副作用 import 会参与顺序诊断；样式 import 由配置创建器注册的本地规则处理。
 *
 * @public
 */
export const importRules = {
	// import 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。
	"import-x/first": "error",
	// 合并同一模块的重复 import，避免绑定分散或副作用被误读。
	"import-x/no-duplicates": "error",
	// [高影响][可自动修复] 非样式 import 按来源分组并排序；副作用 import 只报告，移动前必须确认执行顺序。
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
				// 无法识别分类的导入
				"unknown",
				// TypeScript 类型导入始终位于所有非样式导入之后
				"type",
			],
			// 常用平台、框架和工具依赖优先于其他第三方依赖，并按声明顺序分层排序
			pathGroups: [
				// uni-app 平台生态
				{ pattern: "@dcloudio/**", group: "external", position: "before" },
				// Vue 核心、路由、状态管理和 VueUse 生态
				{ pattern: "{vue,@vue/**,vue-router,pinia,@pinia/**,@vueuse/**}", group: "external", position: "before" },
				// Element Plus 生态及其子路径
				{ pattern: "{element-plus,element-plus/**,@element-plus/**}", group: "external", position: "before" },
				// Fast Element Plus 生态及其子路径
				{ pattern: "{fast-element-plus,fast-element-plus/**,@fast-element-plus/**}", group: "external", position: "before" },
				// Fast China 组织包及其子路径
				{ pattern: "@fast-china/**", group: "external", position: "before" },
				// Lodash、lodash-es、lodash-unified 及其子路径
				{ pattern: "lodash{,-es,-unified}{,/**}", group: "external", position: "before" },
				// 项目根目录 @/ 别名归入 internal，并优先于其他 internal 导入
				{ pattern: "@/**", group: "internal", position: "before" },
			],
			// 类型导入不参与自定义 pathGroups 匹配，统一保留在 type 总分组
			pathGroupsExcludedImportTypes: ["type"],
			// type 总分组内部继续按照 builtin、external、internal、parent、sibling、index 来源层级排序
			sortTypesGroup: true,
			// 所有 import 分组连续排列，不保留空行
			"newlines-between": "never",
			// 同一分组内按照模块路径字母升序排列。
			alphabetize: {
				order: "asc",
				caseInsensitive: true,
			},
			// 非样式副作用导入参与顺序检查；样式导入由 createImportConfigs 注册的本地规则独立处理。
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
