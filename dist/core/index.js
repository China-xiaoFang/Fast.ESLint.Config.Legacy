Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rules = require("../rules.js");
//#region src/constants/index.ts
/**
* 配置创建器共用的内部文件匹配常量。
*
* 所有 glob 都使用 ESLint 8 Legacy override 语义，以消费项目工作目录为匹配根；它们不是
* package exports。新增扩展名时必须同步检查环境、框架、声明文件和 CommonJS override。
*
* @packageDocumentation
*/
/** JavaScript 与 JSX 文件；扩展名列表与 Node.js ESM/CJS 约定保持一致。 */
const GLOBS_JAVASCRIPT = ["**/*.{js,cjs,mjs,jsx}"];
/** TypeScript 与 TSX 文件；包含 TypeScript 的 ESM/CJS 专用扩展名。 */
const GLOBS_TYPESCRIPT = ["**/*.{ts,cts,mts,tsx}"];
/** TypeScript 声明文件。 */
const GLOB_DECLARATION = "**/*.d.{ts,cts,mts}";
/** Vue 2/3 单文件组件。 */
const GLOB_VUE = "**/*.vue";
/** Angular 组件、指令、服务等框架源码。 */
const GLOB_ANGULAR_TYPESCRIPT = "**/*.ts";
/** Angular 外部 HTML 模板；内联模板由 Angular processor 提取。 */
const GLOB_ANGULAR_TEMPLATE = "**/*.html";
/** 严格 JSON 文件；JSONC 风格的 `.json` 工具配置会在配置层排除。 */
const GLOB_JSON = "**/*.json";
/** 显式使用 `.jsonc` 扩展名的 JSON with Comments 文件。 */
const GLOB_JSONC = "**/*.jsonc";
/** JSON5 文件。 */
const GLOB_JSON5 = "**/*.json5";
/** Markdown 文档。 */
const GLOB_MARKDOWN = "**/*.md";
/** YAML 文档。 */
const GLOB_YAML = "**/*.{yaml,yml}";
/** 默认由 JavaScript、TypeScript 与 Vue 规则处理的全部代码文件。 */
const GLOBS_CODE = [
	...GLOBS_JAVASCRIPT,
	...GLOBS_TYPESCRIPT,
	GLOB_VUE
];
/**
* 默认按照 Node.js 环境处理的工程文件。
*
* 完整预置决定应用源码环境，避免 browser/node 全局变量互相掩盖。
*/
const GLOBS_NODE_TOOLING = [
	"**/*.{config,setup}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/.*rc.{js,cjs,mjs,ts,cts,mts}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{test,tests,__tests__}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}"
];
/** TypeScript 配置文件。 */
const GLOBS_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
/** 允许注释、但扩展名仍为 .json 的常见工具配置。 */
const GLOBS_JSONC_AS_JSON = [...GLOBS_TSCONFIG, "**/.vscode/settings.json"];
/** CommonJS 文件；这些文件允许显式 require()。 */
const GLOBS_COMMONJS = ["**/*.cjs", "**/*.cts"];
//#endregion
//#region src/configs/typescript.ts
/**
* 创建 TypeScript 与 Vue TypeScript 共用的 parserOptions。
*
* 非类型感知模式只声明现代 ECMAScript module 语义；类型感知模式另外启动 Project
* Service，并只在调用方明确提供时写入 `tsconfigRootDir`。
*
* @param options - 类型感知开关及可选 tsconfig 根目录。
* @returns 可用于 `@typescript-eslint/parser` 或 Vue 子 parser 的新 parserOptions 对象。
* @internal
*/
const createTypeScriptParserOptions = (options = {}) => ({
	ecmaVersion: "latest",
	sourceType: "module",
	...options.typeChecked ? {
		projectService: true,
		...options.tsconfigRootDir ? { tsconfigRootDir: options.tsconfigRootDir } : {}
	} : {}
});
/**
* 返回与类型感知模式对应的 typescript-eslint Legacy 推荐预置链。
*
* @param options - 类型感知开关。
* @returns recommended 与 stylistic 的有序 Legacy extends 名称。
* @internal
*/
const createTypeScriptExtends = (options = {}) => options.typeChecked ? ["plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"] : ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/stylistic"];
/**
* 创建 TypeScript 配置。
*
* 本地 JavaScript 规则继续覆盖 TS 文件，再由 typescript-eslint 替代规则关闭不理解类型语法的核心实现。
*
* @param options - TypeScript 文件范围与类型感知 parser 选项。
* @param files - 可覆盖 `options.files` 的显式文件范围，供框架配置复用。
* @returns 包含 parser、extends、parserOptions 与完整本地规则记录的单个 override。
* @internal
*/
const createTypeScriptConfig = (options = {}, files = options.files ?? GLOBS_TYPESCRIPT) => ({
	files: [...files],
	extends: createTypeScriptExtends(options),
	parser: "@typescript-eslint/parser",
	parserOptions: {
		...createTypeScriptParserOptions(options),
		ecmaFeatures: { jsx: true }
	},
	rules: {
		...require_rules.javascriptRules,
		...require_rules.typescriptRules
	}
});
/**
* 将 {@link createTypeScriptConfig} 包装为组合器使用的 override 数组。
*
* @param options - TypeScript 文件范围与 parser 选项。
* @returns 始终包含一个 TypeScript override 的数组。
* @internal
*/
const createTypeScriptConfigs = (options = {}) => [createTypeScriptConfig(options)];
/**
* 创建 TypeScript 声明文件兼容 override。
*
* 声明文件允许未使用的公共符号和仅用于全局扩展的类型导入，因此关闭普通源码中用于
* 清理实现细节的 unused 与 type-import 规则。该 override 应位于普通 TypeScript 配置之后。
*
* @returns 匹配 `.d.ts`、`.d.cts` 与 `.d.mts` 的单个 override。
* @internal
*/
const createTypeScriptDeclarationConfigs = () => [{
	files: [GLOB_DECLARATION],
	rules: {
		"@typescript-eslint/consistent-type-imports": "off",
		"@typescript-eslint/no-unused-vars": "off"
	}
}];
/**
* 创建可叠加在任意 TypeScript/React/Angular/Vue 完整预置之后的类型感知配置。
*
* Project Service 会从被检查文件向上寻找最近的 tsconfig；复杂 monorepo 可以在自己的
* `.eslintrc` override 中补充 `parserOptions.tsconfigRootDir`。
* TypeScript/TSX 与 Vue SFC 使用独立 parser 链，避免 Vue 模板被 TypeScript parser 误读。
*
* @returns 依次覆盖 TypeScript 方言与 Vue SFC 的两个类型感知 overrides。
* @internal
*/
const createTypeAwareConfigs = () => {
	const typeAwareOptions = { typeChecked: true };
	const typeAwareExtends = createTypeScriptExtends(typeAwareOptions);
	return [{
		files: [...GLOBS_TYPESCRIPT],
		extends: typeAwareExtends,
		parser: "@typescript-eslint/parser",
		parserOptions: {
			...createTypeScriptParserOptions(typeAwareOptions),
			ecmaFeatures: { jsx: true }
		}
	}, {
		files: [GLOB_VUE],
		extends: typeAwareExtends,
		parser: "vue-eslint-parser",
		parserOptions: {
			...createTypeScriptParserOptions(typeAwareOptions),
			parser: "@typescript-eslint/parser",
			extraFileExtensions: [".vue"],
			ecmaFeatures: { jsx: true }
		}
	}];
};
//#endregion
//#region src/configs/angular.ts
/**
* 创建 Angular TypeScript、外部模板与内联模板 Legacy overrides。
*
* TypeScript override 先继承 typescript-eslint，再追加 Angular 推荐规则；启用内联模板时
* 同一个 override 会注册 Angular template processor。外部模板始终使用专用 template parser。
* 空文件范围不会创建对应 override。
*
* @param options - Angular 文件范围、processor 与模板无障碍选项。
* @param typeScriptOptions - 传递给 TypeScript 配置层的 parser 与类型感知选项。
* @returns 按 TypeScript 源码、外部模板顺序排列的 ESLint 8 overrides。
* @internal
*/
const createAngularConfigs = ({ inlineTemplates = true, templateAccessibility = true, templateFiles = [GLOB_ANGULAR_TEMPLATE], typescriptFiles = [GLOB_ANGULAR_TYPESCRIPT] } = {}, typeScriptOptions = {}) => {
	const typeScriptConfig = createTypeScriptConfig(typeScriptOptions, typescriptFiles);
	return [...typescriptFiles.length > 0 ? [{
		...typeScriptConfig,
		files: typescriptFiles,
		extends: [...typeScriptConfig.extends, "plugin:@angular-eslint/recommended"],
		...inlineTemplates ? {
			plugins: ["@angular-eslint/template"],
			processor: "@angular-eslint/template/extract-inline-html"
		} : {},
		rules: {
			...typeScriptConfig.rules,
			...require_rules.angularRules
		}
	}] : [], ...templateFiles.length > 0 ? [{
		files: templateFiles,
		parser: "@angular-eslint/template-parser",
		extends: ["plugin:@angular-eslint/template/recommended", ...templateAccessibility ? ["plugin:@angular-eslint/template/accessibility"] : []]
	}] : []];
};
//#endregion
//#region src/configs/common.ts
/**
* 创建跨 JavaScript、TypeScript、Vue、React 与 Angular 源码生效的基础配置。
*
* `eslint:recommended` 提供语言级正确性检查，本仓库只在其后补充经过说明的公共规则。
*
* @param files - 应用基础正确性规则的 glob 集合。
* @returns 单个限定文件范围的 override；文件集合为空时返回空数组。
* @internal
*/
const createBaseConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["eslint:recommended"],
	rules: require_rules.commonRules
}] : [];
//#endregion
//#region src/configs/commonjs.ts
/**
* 创建 CommonJS 扩展名兼容 override。
*
* `.cjs` 与 `.cts` 已明确表达模块格式，因此关闭禁止 `require()` 的 TypeScript 规则；
* 该 override 不改变 parser、env 或其他模块规则。
*
* @returns `.cjs` 与 `.cts` 文件共用的单个规则 override。
* @internal
*/
const createCommonJsConfigs = () => [{
	files: [...GLOBS_COMMONJS],
	rules: { "@typescript-eslint/no-require-imports": "off" }
}];
//#endregion
//#region src/configs/environment.ts
/** 将静态预置的运行时选择转换为 ESLint 8 Legacy Config 的 env 映射。 */
const createRuntimeEnvironment = (environment) => ({
	es2022: true,
	browser: environment !== "node",
	node: environment !== "browser"
});
/**
* 创建应用源码运行时环境配置。
*
* @param options - 运行环境和目标文件范围。
* @returns 一个限定文件范围的 env override；文件范围为空时返回空数组。
* @internal
*/
const createEnvironmentConfigs = ({ environment = "browser", files = [] } = {}) => files.length > 0 ? [{
	files: [...files],
	env: createRuntimeEnvironment(environment)
}] : [];
/**
* 创建 Node.js 工程文件环境配置。
*
* 配置仅匹配 config、setup、scripts、bin、CLI 和测试命名的工程文件，不会把 Node globals
* 泄漏到 browser 应用源码。它必须晚于语言规则应用，才能可靠关闭工具脚本中的 `no-console`。
*
* @returns Node.js 工程文件专用的单个 override。
* @internal
*/
const createNodeToolingConfigs = () => [{
	files: [...GLOBS_NODE_TOOLING],
	env: {
		es2022: true,
		browser: false,
		node: true
	},
	rules: { "no-console": "off" }
}];
//#endregion
//#region src/configs/import.ts
/**
* 创建模块导入配置。
*
* 共享库不猜测项目的路径别名或 resolver，因此只启用 import-x 推荐规则和确定性排序；
* resolver 相关规则由 `importRules` 明确关闭。
*
* @param files - 应用 import-x 规则的脚本和框架文件 glob。
* @returns 单个限定文件范围的 override；文件集合为空时返回空数组。
* @internal
*/
const createImportConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["plugin:import-x/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	rules: require_rules.importRules
}] : [];
//#endregion
//#region src/configs/javascript.ts
/**
* 创建 JavaScript 与 JSX 配置。
*
* JSX 解析在这里显式开启；基础正确性和公共规则由更早的 `createBaseConfigs()` 提供。
*
* @param files - 由该 override 接管的 JavaScript 文件 glob。
* @returns 包含 parserOptions 与本地 JavaScript 规则的单个 override。
* @internal
*/
const createJavaScriptConfig = (files = GLOBS_JAVASCRIPT) => ({
	files: [...files],
	parserOptions: {
		ecmaVersion: "latest",
		ecmaFeatures: { jsx: true },
		sourceType: "module"
	},
	rules: require_rules.javascriptRules
});
/**
* 将 {@link createJavaScriptConfig} 包装为组合器使用的 override 数组。
*
* @param files - 由 JavaScript 配置接管的文件 glob。
* @returns 始终包含一个 JavaScript override 的数组。
* @internal
*/
const createJavaScriptConfigs = (files = GLOBS_JAVASCRIPT) => [createJavaScriptConfig(files)];
//#endregion
//#region src/configs/json.ts
/**
* 返回指定 JSON 方言对应的 Legacy 推荐预置链。
*
* @param dialect - 严格 JSON、JSON5 或允许注释的 JSONC。
* @param prettier - 是否在推荐规则之后关闭与 Prettier 冲突的规则。
* @returns 可直接写入 Legacy override `extends` 的有序名称数组。
* @internal
*/
const createJsonExtends = (dialect, prettier = true) => [`plugin:jsonc/recommended-with-${dialect}`, ...prettier ? ["plugin:jsonc/prettier"] : []];
/**
* 创建 JSON、JSONC 与 JSON5 配置。
*
* 严格 JSON 排除虽然以 `.json` 结尾、但规范允许注释的 tsconfig 与 VS Code 设置文件。
* 每个方言使用独立 override，防止严格 JSON 规则误读 JSONC/JSON5 语法。
*
* @param options - Prettier 兼容层开关。
* @returns 按严格 JSON、JSONC、JSON5、VS Code settings、tsconfig 排列的 overrides。
* @internal
*/
const createJsonConfigs = ({ prettier = true } = {}) => [
	{
		files: [GLOB_JSON],
		excludedFiles: [...GLOBS_JSONC_AS_JSON],
		extends: createJsonExtends("json", prettier)
	},
	{
		files: [GLOB_JSONC],
		extends: createJsonExtends("jsonc", prettier)
	},
	{
		files: [GLOB_JSON5],
		extends: createJsonExtends("json5", prettier)
	},
	{
		files: ["**/.vscode/settings.json"],
		extends: createJsonExtends("jsonc", prettier)
	},
	{
		files: [...GLOBS_TSCONFIG],
		extends: createJsonExtends("jsonc", prettier)
	}
];
//#endregion
//#region src/configs/lodash.ts
/**
* 创建 Lodash 静态导入来源约束。
*
* @param preference - 唯一允许使用的 Lodash 包入口。
* @param files - 应用该组织策略的代码文件 glob。
* @returns 单个规则 override；文件集合为空时返回空数组。
* @internal
*/
const createLodashConfigs = (preference, files) => files.length > 0 ? [{
	files: [...files],
	rules: preference === "lodash" ? require_rules.preferLodashRules : require_rules.preferLodashUnifiedRules
}] : [];
//#endregion
//#region src/configs/markdown.ts
/**
* 创建 Markdown processor 与虚拟代码块配置。
*
* 示例代码缺少完整工程上下文，因此关闭 resolver、未使用符号和控制台等高噪声检查。
* processor 的根级 extends 与虚拟文件 override 分开返回，调用方必须保留两部分和顺序。
*
* @returns 根级 Markdown extends 与代码块 override 的组合结果。
* @internal
*/
const createMarkdownConfigs = () => ({
	extends: ["plugin:markdown/recommended-legacy"],
	overrides: [{
		files: [`${GLOB_MARKDOWN}/**`],
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"import-x/no-duplicates": "off",
			"import-x/no-unresolved": "off",
			"no-console": "off",
			"no-undef": "off",
			"promise/catch-or-return": "off"
		}
	}]
});
//#endregion
//#region src/configs/prettier.ts
/**
* 创建 Prettier 兼容层。
*
* 它只关闭冲突规则，不在 ESLint 中执行 Prettier；项目规则仍在它之后生效。
*
* @param files - 需要关闭格式冲突规则的代码文件 glob。
* @returns 单个 `prettier` extends override；文件集合为空时返回空数组。
* @internal
*/
const createPrettierConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["prettier"]
}] : [];
//#endregion
//#region src/configs/promise.ts
/**
* 创建 Promise 控制流与异常处理推荐配置。
*
* 该配置应用 `plugin:promise/recommended`，不启动类型服务；需要类型信息的 Promise
* 检查由 `/type-aware` 中的 typescript-eslint 预置提供。
*
* @param files - 应用 Promise 规则的代码文件 glob。
* @returns 单个推荐规则 override；文件集合为空时返回空数组。
* @internal
*/
const createPromiseConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["plugin:promise/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
}] : [];
//#endregion
//#region src/configs/react.ts
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
const createReactConfigs = ({ javascriptFiles = [...GLOBS_JAVASCRIPT], jsxRuntime = "automatic", typescriptFiles = [...GLOBS_TYPESCRIPT], version = "detect" } = {}, { javascript = true, typescript = true, typescriptOptions = {} } = {}) => {
	const reactExtends = [
		"plugin:react/recommended",
		...jsxRuntime === "automatic" ? ["plugin:react/jsx-runtime"] : [],
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended"
	];
	const runtimeRules = jsxRuntime === "automatic" ? require_rules.reactAutomaticRuntimeRules : {};
	const settings = { react: { version } };
	const javaScriptConfig = createJavaScriptConfig(javascriptFiles);
	const typeScriptConfig = createTypeScriptConfig(typescriptOptions, typescriptFiles);
	return [...javascript && javascriptFiles.length > 0 ? [{
		...javaScriptConfig,
		files: javascriptFiles,
		extends: reactExtends,
		settings,
		rules: {
			...javaScriptConfig.rules,
			...require_rules.reactRules,
			...runtimeRules
		}
	}] : [], ...typescript && typescriptFiles.length > 0 ? [{
		...typeScriptConfig,
		files: typescriptFiles,
		extends: [...typeScriptConfig.extends, ...reactExtends],
		settings,
		rules: {
			...typeScriptConfig.rules,
			...require_rules.reactRules,
			...runtimeRules,
			...require_rules.reactTypeScriptRules
		}
	}] : []];
};
//#endregion
//#region src/configs/regexp.ts
/**
* 创建正则表达式正确性、可读性和性能推荐配置。
*
* 部分上游规则支持自动修复；配置层只注册规则，不对修复后的真实匹配行为作保证。
*
* @param files - 应用 RegExp 规则的代码文件 glob。
* @returns 单个推荐规则 override；文件集合为空时返回空数组。
* @internal
*/
const createRegexpConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["plugin:regexp/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
}] : [];
//#endregion
//#region src/configs/root.ts
/**
* 创建最终可由 ESLint 8 同步加载的 `.eslintrc` 配置对象。
*
* 输入数组都会复制，避免调用方在创建完成后通过修改原数组改变预置。空的可选字段不会
* 出现在结果中；`reportUnusedDisableDirectives` 始终启用以发现失效的 eslint-disable 注释。
*
* @param options - 根级 extends、globals、忽略项与按优先级排列的 overrides。
* @returns 新建且不共享输入数组的 `Linter.Config`。
* @internal
*/
const createLegacyConfig = ({ extends: configExtends = [], globals, ignorePatterns = [], overrides = [] } = {}) => ({
	...configExtends.length > 0 ? { extends: [...configExtends] } : {},
	...globals ? { globals } : {},
	...ignorePatterns.length > 0 ? { ignorePatterns: [...ignorePatterns] } : {},
	reportUnusedDisableDirectives: true,
	overrides: [...overrides]
});
//#endregion
//#region src/configs/sort-package.ts
/**
* 创建显式启用的 `package.json` 排序 override。
*
* 当调用方没有加载 JSON 基础配置时，该函数会为 `package.json` 补充严格 JSON parser
* 与推荐规则。实际字段顺序由 `packageJsonSortRules` 定义，并刻意避开条件导出对象。
*
* @param options - JSON 基础配置存在性及 Prettier 兼容层开关。
* @returns 只匹配 `package.json` 的单个 override。
* @internal
*/
const createPackageJsonSortConfigs = ({ json = true, prettier = true } = {}) => [{
	files: ["**/package.json"],
	...json ? {} : { extends: createJsonExtends("json", prettier) },
	rules: require_rules.packageJsonSortRules
}];
//#endregion
//#region src/configs/sort-tsconfig.ts
/**
* 创建显式启用的 `tsconfig*.json` 排序 override。
*
* 当调用方没有加载 JSON 基础配置时，该函数会补充 JSONC parser 与推荐规则，确保注释
* 合法且被保留。排序只改变字段顺序，不改变编译器选项、文件列表或项目引用值。
*
* @param options - JSON 基础配置存在性及 Prettier 兼容层开关。
* @returns 匹配根和派生 tsconfig 文件的单个 override。
* @internal
*/
const createTsconfigSortConfigs = ({ json = true, prettier = true } = {}) => [{
	files: [...GLOBS_TSCONFIG],
	...json ? {} : { extends: createJsonExtends("jsonc", prettier) },
	rules: require_rules.tsconfigJsonSortRules
}];
//#endregion
//#region src/configs/vue.ts
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
const createVueConfigs = ({ files = [GLOB_VUE], typeChecked = false, tsconfigRootDir, typescript = true, version = 3 } = {}) => {
	const typeScriptOptions = {
		typeChecked,
		tsconfigRootDir
	};
	return [{
		files,
		extends: [...typescript ? createTypeScriptExtends(typeScriptOptions) : [], version === 3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended"],
		parser: "vue-eslint-parser",
		parserOptions: {
			...typescript ? createTypeScriptParserOptions(typeScriptOptions) : {
				ecmaVersion: "latest",
				sourceType: "module"
			},
			...typescript ? { parser: "@typescript-eslint/parser" } : {},
			extraFileExtensions: [".vue"],
			ecmaFeatures: { jsx: true }
		},
		rules: {
			...require_rules.javascriptRules,
			...typescript ? require_rules.typescriptRules : {},
			...require_rules.vueCommonRules,
			...version === 3 ? require_rules.vue3Rules : require_rules.vue2Rules
		}
	}];
};
//#endregion
//#region src/configs/yaml.ts
/**
* 创建 YAML 解析、推荐规则与可选 Prettier 兼容配置。
*
* @param options - Prettier 兼容层开关。
* @returns 匹配 `.yaml` 与 `.yml` 的单个 override。
* @internal
*/
const createYamlConfigs = ({ prettier = true } = {}) => [{
	files: [GLOB_YAML],
	parser: "yaml-eslint-parser",
	extends: ["plugin:yml/recommended", ...prettier ? ["plugin:yml/prettier"] : []]
}];
//#endregion
//#region src/core/index.ts
/**
* 静态 Legacy 预置的内部组合器。
*
* 该模块由 `src/presets` 构建入口共享，但不属于 package exports。公开配置边界由
* `package.json#exports` 中的明确子路径定义，消费项目不应直接依赖本模块。
*
* @packageDocumentation
*/
/**
* 每个完整预置都是确定的静态契约。
*
* Legacy Config 通过 `extends` 组合，不需要把可变工厂暴露为公共 API；这里的定义只负责
* 消除各入口之间的重复，并保证配置顺序始终一致。
*/
const completePresetDefinitions = {
	angular: {
		angular: true,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false
	},
	base: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false
	},
	javascript: {
		angular: false,
		dataFiles: false,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: false,
		vue: false
	},
	node: {
		angular: false,
		dataFiles: true,
		environment: "node",
		javascript: true,
		react: false,
		typescript: true,
		vue: false
	},
	react: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: true,
		typescript: true,
		vue: false
	},
	typescript: {
		angular: false,
		dataFiles: false,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false
	},
	vue2: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: 2
	},
	vue3: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: 3
	}
};
/**
* 根据静态定义创建一个可独立写入 `.eslintrc#extends` 的完整预置。
*
* 配置顺序是公共契约的一部分：环境与基础正确性在前，语言和框架规则居中，声明文件、
* CommonJS、Node 工程文件和 Markdown 虚拟文件兼容层随后应用，Prettier 兼容层最后应用。
* 文件 glob 会去重，防止 Angular 与通用 TypeScript 范围重复产生基础 override。
*
* @param definition - 一个经过静态表校验的完整预置定义。
* @returns 可由 ESLint 8 同步加载的完整 Legacy Config 对象。
*/
const createCompletePreset = ({ angular, dataFiles, environment, javascript, react, typescript, vue }) => {
	const projectFiles = [
		...javascript ? GLOBS_JAVASCRIPT : [],
		...typescript ? GLOBS_TYPESCRIPT : [],
		...vue ? [GLOB_VUE] : [],
		...angular ? [GLOB_ANGULAR_TYPESCRIPT] : []
	].filter((file, index, files) => files.indexOf(file) === index);
	const markdownConfigs = dataFiles ? createMarkdownConfigs() : void 0;
	return createLegacyConfig({
		extends: markdownConfigs?.extends,
		overrides: [
			...createEnvironmentConfigs({
				environment,
				files: projectFiles
			}),
			...createBaseConfigs(projectFiles),
			...javascript ? createJavaScriptConfigs() : [],
			...typescript ? createTypeScriptConfigs() : [],
			...vue ? createVueConfigs({ version: vue }) : [],
			...react ? createReactConfigs() : [],
			...angular ? createAngularConfigs() : [],
			...createImportConfigs(projectFiles),
			...createPromiseConfigs(projectFiles),
			...createRegexpConfigs(projectFiles),
			...dataFiles ? createJsonConfigs() : [],
			...dataFiles ? createYamlConfigs() : [],
			...typescript ? createTypeScriptDeclarationConfigs() : [],
			...createCommonJsConfigs(),
			...createNodeToolingConfigs(),
			...markdownConfigs?.overrides ?? [],
			...createPrettierConfigs(projectFiles)
		]
	});
};
/**
* 创建公开的静态 Legacy 预置。
*
* 完整预置可以单独继承；`type-aware`、排序和 Lodash 预置必须放在完整预置之后叠加。
* 该函数只供 `src/presets` 构建入口调用，不从 package exports 暴露。
* 每次调用都会创建新的配置对象和 override 数组，公开入口之间不会共享可变配置状态。
*
* @param name - 与公开子路径对应的预置名称。
* @returns 完整预置或只包含目标能力的叠加预置。
* @throws {TypeError} 当内部调用方传入未注册的预置名称时抛出。
* @internal
*/
const createPreset = (name) => {
	if (name in completePresetDefinitions) return createCompletePreset(completePresetDefinitions[name]);
	switch (name) {
		case "lodash":
		case "lodash-unified": return createLegacyConfig({ overrides: createLodashConfigs(name, GLOBS_CODE) });
		case "sort-package": return createLegacyConfig({ overrides: createPackageJsonSortConfigs() });
		case "sort-tsconfig": return createLegacyConfig({ overrides: createTsconfigSortConfigs() });
		case "type-aware": return createLegacyConfig({ overrides: createTypeAwareConfigs() });
	}
	throw new TypeError(`Unknown Legacy preset: ${name}`);
};
//#endregion
exports.createPreset = createPreset;

//# sourceMappingURL=index.js.map