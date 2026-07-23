import {
	CONST_DTS,
	CONST_JSON,
	CONST_JSON5,
	CONST_JSONC,
	CONST_TSCONFIG,
	CONST_VUE,
	GLOB_COMMONJS,
	GLOB_JAVASCRIPT,
	GLOB_JSONC_AS_JSON,
	GLOB_NODE,
	GLOB_TYPESCRIPT,
} from "./constants";
import { commonRules, importRules, javascriptRules, packageJsonSortRules, tsconfigJsonSortRules, typescriptRules, vueRules } from "./rules";

import type { Linter } from "eslint";

export type RuntimeEnvironment = "browser" | "node" | "universal";

export interface TypeScriptConfigOptions {
	/** 启用需要类型信息的 typescript-eslint 预置；默认关闭。 */
	typeChecked?: boolean;
	/** 传给 parserOptions.project；typeChecked 开启时默认为 true。 */
	project?: boolean | string | string[];
	/** TypeScript 配置查找根目录；默认使用当前 ESLint 工作目录。 */
	tsconfigRootDir?: string;
}

export interface VueConfigOptions extends TypeScriptConfigOptions {
	/** Vue 主版本；默认 Vue 3。 */
	version?: 2 | 3;
}

export interface FastConfigOptions {
	/** 应用源码的运行时全局变量；Vue/Vite 项目通常使用 browser。 */
	environment?: RuntimeEnvironment;
	/** 是否启用 eslint-plugin-import 的正确性与排序规则。 */
	imports?: boolean;
	/** 是否启用 JSON、JSONC、JSON5 及常用清单排序。 */
	json?: boolean;
	/** 是否启用 Markdown 代码块处理器。 */
	markdown?: boolean;
	/** 是否在各语言预置末尾关闭与 Prettier 冲突的规则。 */
	prettier?: boolean;
	/** 是否启用正则表达式推荐规则。 */
	regexp?: boolean;
	/** TypeScript 支持；传入对象可开启类型感知规则。 */
	typescript?: boolean | TypeScriptConfigOptions;
	/** Vue 支持；默认 Vue 3，也可显式选择 Vue 2。 */
	vue?: boolean | 2 | 3 | VueConfigOptions;
}

export const defaultOptions = Object.freeze({
	environment: "browser",
	imports: true,
	json: true,
	markdown: true,
	prettier: true,
	regexp: true,
	typescript: true,
	vue: 3,
} satisfies Required<FastConfigOptions>);

const createRuntimeEnv = (environment: RuntimeEnvironment): NonNullable<Linter.ConfigOverride["env"]> => ({
	es2022: true,
	browser: environment !== "node",
	node: environment !== "browser",
});

const createParserOptions = (options: TypeScriptConfigOptions): Linter.ParserOptions => ({
	ecmaVersion: "latest",
	sourceType: "module",
	...(options.typeChecked
		? {
				project: options.project ?? true,
				tsconfigRootDir: options.tsconfigRootDir ?? process.cwd(),
			}
		: {}),
});

const createCodeExtends = (
	options: Required<Pick<FastConfigOptions, "imports" | "prettier" | "regexp">>,
	languageExtends: string[] = [],
	withTypeScriptImportSettings = false
): string[] => [
	"eslint:recommended",
	...languageExtends,
	...(options.imports ? ["plugin:import/recommended", ...(withTypeScriptImportSettings ? ["plugin:import/typescript"] : [])] : []),
	...(options.regexp ? ["plugin:regexp/recommended"] : []),
	...(options.prettier ? ["prettier"] : []),
];

const createJsonExtends = (dialect: "json" | "json5" | "jsonc", prettier: boolean): string[] => [
	`plugin:jsonc/recommended-with-${dialect}`,
	...(prettier ? ["plugin:jsonc/prettier"] : []),
];

/**
 * 创建 ESLint 8 `.eslintrc` 配置对象。
 *
 * 默认面向 Vue 3 + Vite + TypeScript；返回值也可直接赋给 `module.exports`。
 */
export const createConfig = (options: FastConfigOptions = {}): Linter.Config => {
	const resolvedOptions = { ...defaultOptions, ...options };
	const typeScriptEnabled = resolvedOptions.typescript !== false;
	const typeScriptOptions: TypeScriptConfigOptions = typeof resolvedOptions.typescript === "object" ? resolvedOptions.typescript : {};
	const vueEnabled = resolvedOptions.vue !== false;

	let vueOptions: VueConfigOptions = {
		...typeScriptOptions,
		version: 3,
	};

	if (typeof resolvedOptions.vue === "number") {
		vueOptions = { ...vueOptions, version: resolvedOptions.vue };
	} else if (typeof resolvedOptions.vue === "object") {
		vueOptions = { ...vueOptions, ...resolvedOptions.vue };
	}

	const sharedExtendsOptions = {
		imports: resolvedOptions.imports,
		prettier: resolvedOptions.prettier,
		regexp: resolvedOptions.regexp,
	};
	const runtimeEnv = createRuntimeEnv(resolvedOptions.environment);
	const overrides: Linter.ConfigOverride[] = [];

	// JavaScript 与 JSX 使用 ESLint 核心推荐规则。
	overrides.push({
		files: [...GLOB_JAVASCRIPT],
		extends: createCodeExtends(sharedExtendsOptions),
		env: runtimeEnv,
		parserOptions: {
			ecmaVersion: "latest",
			ecmaFeatures: { jsx: true },
			sourceType: "module",
		},
		rules: {
			...commonRules,
			...javascriptRules,
			...(resolvedOptions.imports ? importRules : {}),
		},
	});

	if (typeScriptEnabled) {
		const typeScriptExtends = [
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/stylistic",
			...(typeScriptOptions.typeChecked
				? ["plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"]
				: []),
		];

		overrides.push({
			files: [...GLOB_TYPESCRIPT],
			extends: createCodeExtends(sharedExtendsOptions, typeScriptExtends, true),
			env: runtimeEnv,
			parser: "@typescript-eslint/parser",
			parserOptions: {
				...createParserOptions(typeScriptOptions),
				ecmaFeatures: { jsx: true },
			},
			rules: {
				...commonRules,
				...javascriptRules,
				...(resolvedOptions.imports ? importRules : {}),
				...typescriptRules,
			},
		});
	}

	if (vueEnabled) {
		const vueVersion = vueOptions.version ?? 3;
		const vueExtends = [
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/stylistic",
			...(vueOptions.typeChecked
				? ["plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"]
				: []),
			vueVersion === 3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended",
		];

		overrides.push({
			files: [CONST_VUE],
			extends: createCodeExtends(sharedExtendsOptions, vueExtends, true),
			env: runtimeEnv,
			parser: "vue-eslint-parser",
			parserOptions: {
				...createParserOptions(vueOptions),
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".vue"],
				ecmaFeatures: { jsx: true },
			},
			rules: {
				...commonRules,
				...javascriptRules,
				...(resolvedOptions.imports ? importRules : {}),
				...typescriptRules,
				...vueRules,
			},
		});
	}

	if (resolvedOptions.json) {
		// 严格 JSON 排除以 .json 结尾、但规范允许注释的工具配置。
		overrides.push({
			files: [CONST_JSON],
			excludedFiles: [...GLOB_JSONC_AS_JSON],
			extends: createJsonExtends("json", resolvedOptions.prettier),
		});
		overrides.push({
			files: [CONST_JSONC],
			extends: createJsonExtends("jsonc", resolvedOptions.prettier),
		});
		overrides.push({
			files: [CONST_JSON5],
			extends: createJsonExtends("json5", resolvedOptions.prettier),
		});
		overrides.push({
			files: ["**/.vscode/settings.json"],
			extends: createJsonExtends("jsonc", resolvedOptions.prettier),
		});
		overrides.push({
			files: ["**/package.json"],
			rules: packageJsonSortRules,
		});
		overrides.push({
			files: [...CONST_TSCONFIG],
			extends: createJsonExtends("jsonc", resolvedOptions.prettier),
			rules: tsconfigJsonSortRules,
		});
	}

	// 声明文件允许未使用的公开符号和非内联类型导入。
	if (typeScriptEnabled) {
		overrides.push({
			files: [CONST_DTS],
			rules: {
				"@typescript-eslint/consistent-type-imports": "off",
				"@typescript-eslint/no-unused-vars": "off",
			},
		});
	}

	// .cjs/.cts 明确表示 CommonJS，不应强制改写为 ESM import。
	overrides.push({
		files: [...GLOB_COMMONJS],
		rules: {
			"@typescript-eslint/no-require-imports": "off",
		},
	});

	// Vite 配置、脚本、测试和 CLI 使用 Node.js 全局变量，并允许必要的控制台输出。
	overrides.push({
		files: [...GLOB_NODE],
		env: {
			es2022: true,
			browser: false,
			node: true,
		},
		rules: {
			"no-console": "off",
		},
	});

	// Markdown 虚拟代码块应以示例为主，避免未声明变量和解析器规则制造噪声。
	if (resolvedOptions.markdown) {
		overrides.push({
			files: ["**/*.md/**"],
			rules: {
				"@typescript-eslint/no-unused-vars": "off",
				"import/no-duplicates": "off",
				"import/no-unresolved": "off",
				"no-console": "off",
				"no-undef": "off",
			},
		});
	}

	return {
		...(resolvedOptions.markdown ? { extends: ["plugin:markdown/recommended"] } : {}),
		reportUnusedDisableDirectives: true,
		overrides,
	};
};

/** 纯 JavaScript 预置，不处理 TypeScript、Vue、JSON 和 Markdown。 */
export const PresetJavaScriptConfig = createConfig({
	json: false,
	markdown: false,
	typescript: false,
	vue: false,
});

/** TypeScript 预置，不处理 Vue、JSON 和 Markdown。 */
export const PresetTypeScriptConfig = createConfig({
	json: false,
	markdown: false,
	vue: false,
});

/** JavaScript + TypeScript + JSON 基础预置。 */
export const PresetBasicConfig = createConfig({ markdown: false, vue: false });

/** Node.js + TypeScript 预置。 */
export const PresetNodeConfig = createConfig({ environment: "node", vue: false });

/** Vue 2 兼容预置。 */
export const PresetVue2Config = createConfig({ vue: 2 });

/** 默认的 Vue 3 + Vite + TypeScript 完整预置。 */
export const PresetVueConfig = createConfig();
