import type { RuleOptions } from "../typegen";

/**
 * 统一使用 `lodash-unified` 的可选导入策略。
 *
 * @remarks
 * 该规则只约束静态 import/export 的模块来源，不会安装依赖，也不会检查动态
 * `import()` 或 CommonJS `require()`。选择此策略的项目应自行安装 `lodash-unified`。
 */
export const preferLodashUnifiedRules = {
	/** [高影响][按需启用] 禁止混用 `lodash` 与 `lodash-es`，避免同一项目维护多套等价依赖入口。 */
	"no-restricted-imports": [
		"error",
		{
			paths: [
				{
					name: "lodash",
					message: 'Use "lodash-unified" consistently instead of "lodash".',
				},
				{
					name: "lodash-es",
					message: 'Use "lodash-unified" consistently instead of "lodash-es".',
				},
			],
			patterns: [
				{
					group: ["lodash/*", "lodash-es/*"],
					message: 'Use exports from "lodash-unified" instead of Lodash subpath imports.',
				},
			],
		},
	],
} satisfies RuleOptions;

/**
 * 统一使用 `lodash` 的可选导入策略。
 *
 * @remarks
 * 根入口和 `lodash/*` 子路径都允许使用；规则只负责避免与 `lodash-es` 或
 * `lodash-unified` 混用，不替项目决定整包导入或按方法导入。
 */
export const preferLodashRules = {
	/** [高影响][按需启用] 禁止混用 `lodash-es` 与 `lodash-unified`，保持运行时和类型来源一致。 */
	"no-restricted-imports": [
		"error",
		{
			paths: [
				{
					name: "lodash-es",
					message: 'Use "lodash" consistently instead of "lodash-es".',
				},
				{
					name: "lodash-unified",
					message: 'Use "lodash" consistently instead of "lodash-unified".',
				},
			],
			patterns: [
				{
					group: ["lodash-es/*", "lodash-unified/*"],
					message: 'Use "lodash" or a "lodash/*" subpath consistently.',
				},
			],
		},
	],
} satisfies RuleOptions;
