import { GLOB_VUE } from "../constants";
import { javascriptRules, typescriptRules, vue2Rules, vue3Rules, vueCommonRules } from "../rules";

import { type TypeAwareOptions, createTypeScriptExtends, createTypeScriptParserOptions } from "./typescript";

import type { Linter } from "eslint";

/**
 * Vue 2/3 单文件组件的内部配置选项。
 *
 * @internal
 */
export interface VueConfigOptions extends TypeAwareOptions {
	/**
	 * 决定 upstream Vue preset 与主版本专属规则。
	 * @default 3
	 */
	version?: 2 | 3;
	/**
	 * Vue 单文件组件范围。
	 * @default ["**\/*.vue"]
	 */
	files?: string[];
	/**
	 * 是否在 Vue script 中启用 TypeScript parser 与规则。
	 * @default true
	 */
	typescript?: boolean;
}

/**
 * 创建 Vue 2/3 单文件组件配置。
 *
 * `vue-eslint-parser` 始终负责模板；TypeScript 启用时再通过 `parserOptions.parser` 解析
 * script，并应用 TypeScript 核心替代规则。Vue common 规则在 upstream preset 之后应用，
 * 最后追加 Vue 主版本专属规则。
 *
 * @param options - Vue 主版本、文件范围、TypeScript 与类型感知选项。
 * @returns 匹配 Vue SFC 的单个 Legacy override。
 * @internal
 */
export const createVueConfigs = ({
	files = [GLOB_VUE],
	typeChecked = false,
	tsconfigRootDir,
	typescript = true,
	version = 3,
}: VueConfigOptions = {}): Linter.ConfigOverride[] => {
	const typeScriptOptions = { typeChecked, tsconfigRootDir };

	return [
		{
			files,
			extends: [
				...(typescript ? createTypeScriptExtends(typeScriptOptions) : []),
				version === 3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended",
			],
			parser: "vue-eslint-parser",
			parserOptions: {
				...(typescript ? createTypeScriptParserOptions(typeScriptOptions) : { ecmaVersion: "latest", sourceType: "module" }),
				...(typescript ? { parser: "@typescript-eslint/parser" } : {}),
				extraFileExtensions: [".vue"],
				ecmaFeatures: { jsx: true },
			},
			rules: {
				...javascriptRules,
				...(typescript ? typescriptRules : {}),
				...vueCommonRules,
				...(version === 3 ? vue3Rules : vue2Rules),
			},
		},
	];
};
