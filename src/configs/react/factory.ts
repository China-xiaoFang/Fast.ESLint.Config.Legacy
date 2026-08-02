import { GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT } from "../../constants";
import { reactAutomaticRuntimeRules, reactRules, reactTypeScriptRules } from "../../rules";
import { createJavaScriptConfig } from "../javascript/factory";
import { type TypeScriptConfigOptions, createTypeScriptConfig } from "../typescript/factory";

import type { Linter } from "eslint";

/**
 * React、Hooks 与 JSX accessibility 的内部配置选项。
 *
 * 根入口默认不启用 React；创建器使用 automatic JSX runtime 和 React 版本自动检测。项目如需覆盖
 * 这些行为，应通过自己的 Legacy override 或 React settings 表达。
 *
 * @internal
 */
export interface ReactConfigOptions {
	/**
	 * 普通 JS/JSX React 文件。
	 * @default 所有 JavaScript 方言
	 */
	javascriptFiles?: string[];
	/**
	 * TS/TSX React 文件。
	 * @default 所有 TypeScript 方言
	 */
	typescriptFiles?: string[];
	/**
	 * 传递给 `settings.react.version` 的 React 版本。
	 * @default "detect"
	 */
	version?: "detect" | string;
	/**
	 * JSX runtime；automatic 会关闭显式 React 作用域规则。
	 * @default "automatic"
	 */
	jsxRuntime?: "automatic" | "classic";
}

/** 控制 React 创建器接管哪些脚本语言的内部组合选项。 */
interface ReactLanguageOptions {
	/**
	 * 是否创建 JavaScript/JSX React override。
	 * @default true
	 */
	javascript?: boolean;
	/**
	 * 是否创建 TypeScript/TSX React override。
	 * @default true
	 */
	typescript?: boolean;
	/**
	 * 传递给 TypeScript parser 与规则层的配置。
	 * @default {}
	 */
	typescriptOptions?: TypeScriptConfigOptions;
}

/**
 * 创建 React、Hooks 与 JSX accessibility Legacy overrides。
 *
 * JavaScript 和 TypeScript 使用独立 override，但共享 React、Hooks、JSX accessibility
 * extends 与 React version settings。TSX override 额外关闭 PropTypes；automatic runtime
 * 额外关闭要求 React 标识符处于作用域的规则。禁用语言或提供空文件范围时不会创建对应项。
 *
 * @param options - React 版本、JSX runtime 与两种语言的文件范围。
 * @param languageOptions - 语言开关及 TypeScript parser 选项。
 * @returns 按 JavaScript、TypeScript 顺序排列的 React overrides。
 * @internal
 */
export const createReactConfigs = (
	{
		javascriptFiles = [...GLOBS_JAVASCRIPT],
		jsxRuntime = "automatic",
		typescriptFiles = [...GLOBS_TYPESCRIPT],
		version = "detect",
	}: ReactConfigOptions = {},
	{ javascript = true, typescript = true, typescriptOptions = {} }: ReactLanguageOptions = {}
): Linter.ConfigOverride[] => {
	const reactExtends = [
		"plugin:react/recommended",
		...(jsxRuntime === "automatic" ? ["plugin:react/jsx-runtime"] : []),
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
	];
	const runtimeRules = jsxRuntime === "automatic" ? reactAutomaticRuntimeRules : {};
	const settings = { react: { version } };
	const javaScriptConfig = createJavaScriptConfig(javascriptFiles);
	const typeScriptConfig = createTypeScriptConfig(typescriptOptions, typescriptFiles);

	return [
		...(javascript && javascriptFiles.length > 0
			? [
					{
						...javaScriptConfig,
						files: javascriptFiles,
						extends: reactExtends,
						settings,
						rules: { ...javaScriptConfig.rules, ...reactRules, ...runtimeRules },
					},
				]
			: []),
		...(typescript && typescriptFiles.length > 0
			? [
					{
						...typeScriptConfig,
						files: typescriptFiles,
						extends: [...typeScriptConfig.extends, ...reactExtends],
						settings,
						rules: {
							...typeScriptConfig.rules,
							...reactRules,
							...runtimeRules,
							...reactTypeScriptRules,
						},
					},
				]
			: []),
	];
};
