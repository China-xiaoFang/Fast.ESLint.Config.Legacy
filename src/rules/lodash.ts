import type { RuleOptions } from "../typegen";

/**
 * 按需启用：要求项目统一使用 lodash-unified。
 * 该规则只限制静态 import/export，不检查动态 import() 或 CommonJS require()。
 * 可通过 `createLodashConfigs("lodash-unified")` 启用，或从 `/rules` 导入后用于自定义文件范围。
 *
 * @public
 */
export const preferLodashUnifiedRules = {
	// [高影响][按需启用] 阻止 lodash/lodash-es 及其子路径，启用前应先统一项目依赖。
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
 * 按需启用：要求项目统一使用 lodash。
 * 根入口与 lodash/* 子路径均允许，但不能与 lodash-es 或 lodash-unified 混用。
 * 可通过 `createLodashConfigs("lodash")` 启用，或从 `/rules` 导入后用于自定义文件范围。
 *
 * @public
 */
export const preferLodashRules = {
	// [高影响][按需启用] 阻止 lodash-es/lodash-unified 及其子路径，启用前应统一项目依赖。
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
