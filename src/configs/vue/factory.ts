import { GLOB_VUE } from "../../constants";
import { javascriptRules, typescriptRules, typescriptTypeCheckedRules, vue2Rules, vue3Rules, vueCommonRules } from "../../rules";
import { createTypeScriptExtends, createTypeScriptParserOptions } from "../typescript/factory";
import type { Linter } from "eslint";
import type { TypeAwareOptions } from "../typescript/factory";

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
				ecmaFeatures: { jsx: true },
			},
			rules: {
				...javascriptRules,
				...(typescript ? typescriptRules : {}),
				...(typescript && typeScriptOptions.typeChecked ? typescriptTypeCheckedRules : {}),
				...(typescript
					? {
							// SFC 以模板上下文和快速迭代为主，不强制补写函数返回类型或模块边界类型。
							"@typescript-eslint/explicit-function-return-type": "off",
							"@typescript-eslint/explicit-module-boundary-types": "off",
							// defineEmits 校验器和框架回调的形参可用于声明契约而不读取；普通未使用变量和导入仍然报错。
							"@typescript-eslint/no-unused-vars": ["error", { args: "none", caughtErrors: "none", ignoreRestSiblings: true }],
						}
					: {}),
				...vueCommonRules,
				...(version === 3 ? vue3Rules : vue2Rules),
			},
		},
	];
};
