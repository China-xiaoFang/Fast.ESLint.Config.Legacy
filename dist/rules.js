//#region src/define-rules.ts
/**
* 为消费项目定义类型安全的 ESLint 8 规则记录。
*
* 函数在运行时原样返回传入对象，不克隆、不冻结，也不改变规则优先级；它只在 TypeScript
* 编译阶段限制规则名为本包内置的 ESLint 与插件规则，并保留每条规则的具体值类型。
* 仅由消费项目额外安装的插件不属于生成类型范围，应直接使用 ESLint 的 `Linter.RulesRecord`。
*
* @param rules - 需要写入 `.eslintrc` 的规则记录。
* @returns 与传入值引用相同、同时兼容 `Linter.RulesRecord` 的规则记录。
*
* @example
* ```ts
* const rules = defineRules({
*   "no-console": "warn",
*   "vue/no-v-html": "error",
* });
* ```
*
* @public
*/
const defineRules = (rules) => rules;
//#endregion
//#region src/rules/angular.ts
/**
* Angular TypeScript 源码的本地规则记录。
*
* 该记录由 `/angular` 在 angular-eslint recommended 之后应用，只包含本包明确增加的
* TypeScript 侧约束；模板规则与无障碍规则由 Angular 官方模板预置提供。
*
* @public
*/
const angularRules = { "@angular-eslint/prefer-on-push-component-change-detection": "error" };
//#endregion
//#region src/rules/common.ts
/**
* 跨 JavaScript、TypeScript 与 Vue 脚本生效的公共规则。
*
* 维护约定：每条本地覆写都要说明启用原因；可能造成大面积改动、采用阻力或
* 行为变化的规则使用 `[高影响]` 标记，并同步维护规则风险文档。
* 该记录不包含文件范围，直接消费时应由调用方把它放入适当的 Legacy override。
*
* @public
*/
const commonRules = {
	"array-callback-return": "error",
	"no-alert": "warn",
	"no-case-declarations": "error",
	"no-multi-str": "error",
	"no-with": "error",
	"no-void": ["error", { allowAsStatement: true }],
	eqeqeq: [
		"error",
		"always",
		{ null: "ignore" }
	],
	"prefer-exponentiation-operator": "error",
	"prefer-object-has-own": "error",
	"sort-imports": ["warn", {
		ignoreCase: false,
		ignoreDeclarationSort: true,
		ignoreMemberSort: false,
		memberSyntaxSortOrder: [
			"none",
			"all",
			"multiple",
			"single"
		],
		allowSeparatedGroups: false
	}]
};
//#endregion
//#region src/rules/import.ts
/**
* 模块导入正确性、去重与确定性排序规则。
*
* 该记录由所有脚本完整预置在 `plugin:import-x/recommended` 之后应用。共享配置无法知道
* 消费项目的 alias、tsconfig paths 或 bundler resolver，因此依赖具体解析器的规则保持关闭。
* 副作用 import 会参与顺序诊断，但不会被插件自动移动。
*
* @public
*/
const importRules = {
	"import-x/first": "error",
	"import-x/no-duplicates": "error",
	"import-x/order": ["error", {
		groups: [
			"builtin",
			"external",
			"internal",
			"parent",
			"sibling",
			"index",
			"object",
			"type",
			"unknown"
		],
		"newlines-between": "always",
		alphabetize: {
			order: "asc",
			caseInsensitive: true
		},
		warnOnUnassignedImports: true
	}],
	"import-x/no-unresolved": "off",
	"import-x/namespace": "off",
	"import-x/default": "off",
	"import-x/no-named-as-default": "off",
	"import-x/no-named-as-default-member": "off",
	"import-x/named": "off"
};
//#endregion
//#region src/rules/javascript.ts
/**
* JavaScript、JSX 以及框架脚本共同使用的 ESLint 核心规则记录。
*
* TypeScript 和 Vue 配置会在该记录之后关闭不理解扩展语法的核心规则。记录本身不包含
* parserOptions 或文件范围；高影响规则的行为与项目级覆盖方式见规则风险文档。
*
* @public
*/
const javascriptRules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"no-debugger": "error",
	"no-constant-condition": ["error", { checkLoops: false }],
	"no-restricted-syntax": ["error", "LabeledStatement"],
	"no-var": "error",
	"no-empty": ["error", { allowEmptyCatch: true }],
	"no-irregular-whitespace": "error",
	"no-use-before-define": ["warn", {
		classes: true,
		functions: false,
		variables: true
	}],
	"prefer-const": ["warn", {
		destructuring: "all",
		ignoreReadBeforeAssign: true
	}],
	"prefer-arrow-callback": ["error", {
		allowNamedFunctions: false,
		allowUnboundThis: true
	}],
	"object-shorthand": [
		"error",
		"always",
		{
			ignoreConstructors: false,
			avoidQuotes: true
		}
	],
	"logical-assignment-operators": [
		"error",
		"always",
		{ enforceForIfStatements: true }
	],
	"prefer-object-spread": "error",
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"no-redeclare": "error"
};
//#endregion
//#region src/rules/lodash.ts
/**
* 按需启用：要求项目统一使用 lodash-unified。
* 该规则只限制静态 import/export，不检查动态 import() 或 CommonJS require()。
* 可通过 `/lodash-unified` 叠加预置启用，或从 `/rules` 导入后用于自定义文件范围。
*
* @public
*/
const preferLodashUnifiedRules = { "no-restricted-imports": ["error", {
	paths: [{
		name: "lodash",
		message: "Use lodash-unified instead."
	}, {
		name: "lodash-es",
		message: "Use lodash-unified instead."
	}],
	patterns: [{
		group: ["lodash/*", "lodash-es/*"],
		message: "Use lodash-unified instead."
	}]
}] };
/**
* 按需启用：要求项目统一使用 lodash。
* 根入口与 lodash/* 子路径均允许，但不能与 lodash-es 或 lodash-unified 混用。
* 可通过 `/lodash` 叠加预置启用，或从 `/rules` 导入后用于自定义文件范围。
*
* @public
*/
const preferLodashRules = { "no-restricted-imports": ["error", {
	paths: [{
		name: "lodash-es",
		message: "Use lodash instead."
	}, {
		name: "lodash-unified",
		message: "Use lodash instead."
	}],
	patterns: [{
		group: ["lodash-es/*", "lodash-unified/*"],
		message: "Use lodash instead."
	}]
}] };
//#endregion
//#region src/rules/react.ts
/**
* React 本地覆写规则。
*
* React、Hooks 与 JSX accessibility 推荐预置负责基础正确性；这里补充与
* `@fast-china/eslint-config` 意图一致、且能由 ESLint 8 插件可靠实现的约束。
* 该记录同时用于 JSX 与 TSX；TypeScript 专属关闭项由 `reactTypeScriptRules` 单独提供。
*
* @public
*/
const reactRules = {
	"react/button-has-type": "error",
	"react/iframe-missing-sandbox": "warn",
	"react/no-unknown-property": "error",
	"react/jsx-no-target-blank": "error",
	"react/self-closing-comp": ["error", {
		component: true,
		html: true
	}],
	"react/jsx-boolean-value": ["error", "never"],
	"react/no-array-index-key": "warn",
	"react/jsx-no-useless-fragment": "warn"
};
/**
* React 自动 JSX runtime 的兼容规则记录。
*
* `/react` 默认采用 automatic runtime，因此不要求每个 JSX/TSX 文件显式导入 React。
* 使用 classic runtime 的自定义组合不应应用该记录。
*
* @public
*/
const reactAutomaticRuntimeRules = {
	"react/react-in-jsx-scope": "off",
	"react/jsx-uses-react": "off"
};
/**
* React TypeScript 文件的规则兼容层。
*
* TSX props 已由 TypeScript 描述，因此关闭重复且可能漂移的运行时 PropTypes 检查。
*
* @public
*/
const reactTypeScriptRules = { "react/prop-types": "off" };
//#endregion
//#region src/rules/sort-package.ts
/**
* package.json 属性排序规则。
*
* `[高影响][可自动修复][按需启用]`：由 `/sort-package` 显式开启，首次修复可能重排大量字段。
* 注意：这里故意不排序 exports 内部键；条件导出的键顺序具有模块解析语义。
* 记录只描述排序规则，JSON parser 和方言预置由配置层负责提供。
*
* @public
*/
const packageJsonSortRules = {
	"jsonc/sort-array-values": ["error", {
		order: { type: "asc" },
		pathPattern: "^files$"
	}],
	"jsonc/sort-keys": [
		"error",
		{
			order: [
				"name",
				"version",
				"private",
				"packageManager",
				"allowScripts",
				"description",
				"type",
				"keywords",
				"license",
				"homepage",
				"bugs",
				"repository",
				"author",
				"contributors",
				"funding",
				"files",
				"main",
				"module",
				"types",
				"exports",
				"typesVersions",
				"sideEffects",
				"unpkg",
				"jsdelivr",
				"browser",
				"bin",
				"man",
				"directories",
				"publishConfig",
				"scripts",
				"peerDependencies",
				"peerDependenciesMeta",
				"optionalDependencies",
				"dependencies",
				"devDependencies",
				"engines",
				"config",
				"overrides",
				"pnpm",
				"husky",
				"lint-staged",
				"eslintConfig",
				"prettier"
			],
			pathPattern: "^$"
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
		},
		{
			order: { type: "asc" },
			pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
		}
	]
};
//#endregion
//#region src/rules/sort-tsconfig.ts
/**
* tsconfig.json 属性排序规则。
*
* `[高影响][可自动修复][按需启用]`：由 `/sort-tsconfig` 显式开启，首次修复会重排大量字段，但只改变 JSONC 的阅读顺序，
* 不改变 TypeScript 编译选项值。
* 记录只描述排序规则，JSONC parser 和推荐规则由配置层负责提供。
*
* @public
*/
const tsconfigJsonSortRules = {
	"jsonc/no-comments": "off",
	"jsonc/sort-keys": [
		"error",
		{
			order: [
				"extends",
				"compilerOptions",
				"references",
				"files",
				"include",
				"exclude"
			],
			pathPattern: "^$"
		},
		{
			order: [
				"incremental",
				"composite",
				"tsBuildInfoFile",
				"disableSourceOfProjectReferenceRedirect",
				"disableSolutionSearching",
				"disableReferencedProjectLoad",
				"target",
				"jsx",
				"jsxFactory",
				"jsxFragmentFactory",
				"jsxImportSource",
				"lib",
				"moduleDetection",
				"noLib",
				"reactNamespace",
				"useDefineForClassFields",
				"emitDecoratorMetadata",
				"experimentalDecorators",
				"baseUrl",
				"rootDir",
				"rootDirs",
				"customConditions",
				"module",
				"moduleResolution",
				"moduleSuffixes",
				"noResolve",
				"paths",
				"resolveJsonModule",
				"resolvePackageJsonExports",
				"resolvePackageJsonImports",
				"typeRoots",
				"types",
				"allowArbitraryExtensions",
				"allowImportingTsExtensions",
				"allowUmdGlobalAccess",
				"allowJs",
				"checkJs",
				"maxNodeModuleJsDepth",
				"strict",
				"strictBindCallApply",
				"strictFunctionTypes",
				"strictNullChecks",
				"strictPropertyInitialization",
				"allowUnreachableCode",
				"allowUnusedLabels",
				"alwaysStrict",
				"exactOptionalPropertyTypes",
				"noFallthroughCasesInSwitch",
				"noImplicitAny",
				"noImplicitOverride",
				"noImplicitReturns",
				"noImplicitThis",
				"noPropertyAccessFromIndexSignature",
				"noUncheckedIndexedAccess",
				"noUnusedLocals",
				"noUnusedParameters",
				"useUnknownInCatchVariables",
				"declaration",
				"declarationDir",
				"declarationMap",
				"downlevelIteration",
				"emitBOM",
				"emitDeclarationOnly",
				"importHelpers",
				"importsNotUsedAsValues",
				"inlineSourceMap",
				"inlineSources",
				"isolatedDeclarations",
				"mapRoot",
				"newLine",
				"noEmit",
				"noEmitHelpers",
				"noEmitOnError",
				"outDir",
				"outFile",
				"preserveConstEnums",
				"preserveValueImports",
				"removeComments",
				"sourceMap",
				"sourceRoot",
				"stripInternal",
				"allowSyntheticDefaultImports",
				"esModuleInterop",
				"forceConsistentCasingInFileNames",
				"isolatedModules",
				"preserveSymlinks",
				"verbatimModuleSyntax",
				"skipDefaultLibCheck",
				"skipLibCheck"
			],
			pathPattern: "^compilerOptions$"
		}
	]
};
//#endregion
//#region src/rules/typescript.ts
/**
* TypeScript 本地覆写规则。
*
* 先关闭会误判 TypeScript 语法的核心规则，再启用 typescript-eslint 对应实现。
* 该记录不启动类型服务；需要类型信息的规则由 `/type-aware` 的上游预置提供。
*
* @public
*/
const typescriptRules = {
	"constructor-super": "off",
	"getter-return": "off",
	"no-class-assign": "off",
	"no-const-assign": "off",
	"no-dupe-args": "off",
	"no-dupe-class-members": "off",
	"no-dupe-keys": "off",
	"no-func-assign": "off",
	"no-import-assign": "off",
	"no-new-native-nonconstructor": "off",
	"no-new-symbol": "off",
	"no-obj-calls": "off",
	"no-setter-return": "off",
	"no-this-before-super": "off",
	"no-unreachable": "off",
	"no-unsafe-negation": "off",
	"no-undef": "off",
	"no-redeclare": "off",
	"no-unused-vars": "off",
	"no-unused-expressions": "off",
	"@typescript-eslint/no-redeclare": "error",
	"@typescript-eslint/no-unused-vars": ["error", {
		args: "after-used",
		argsIgnorePattern: "^_",
		caughtErrors: "all",
		caughtErrorsIgnorePattern: "^_",
		ignoreRestSiblings: true,
		varsIgnorePattern: "^_"
	}],
	"@typescript-eslint/no-namespace": "off",
	"@typescript-eslint/no-explicit-any": "warn",
	"@typescript-eslint/no-require-imports": "error",
	"@typescript-eslint/no-unused-expressions": ["error", {
		allowShortCircuit: true,
		allowTernary: true
	}],
	"@typescript-eslint/no-inferrable-types": "error",
	"@typescript-eslint/no-non-null-assertion": "warn",
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	"@typescript-eslint/consistent-type-imports": ["error", {
		disallowTypeAnnotations: false,
		fixStyle: "inline-type-imports",
		prefer: "type-imports"
	}]
};
//#endregion
//#region src/rules/vue.ts
/**
* Vue SFC 本地覆写规则。
*
* 上游 recommended 预置负责基础正确性，这里只记录 Vue 2/3 共同的项目取舍与附加约束。
* Vue 主版本差异由 `vue2Rules` 与 `vue3Rules` 追加，记录本身不配置 parser 或文件范围。
*
* @public
*/
const vueCommonRules = {
	"vue/no-v-html": "warn",
	"vue/require-default-prop": "off",
	"vue/multi-word-component-names": "off",
	"vue/prefer-import-from-vue": "warn",
	"vue/no-dupe-keys": "error",
	"vue/no-mutating-props": "error",
	"vue/no-reserved-component-names": "error",
	"vue/no-v-text-v-html-on-component": "error",
	"vue/custom-event-name-casing": ["error", "camelCase"],
	"vue/one-component-per-file": "off",
	"vue/attributes-order": ["error", { order: [
		"DEFINITION",
		"LIST_RENDERING",
		"CONDITIONALS",
		"RENDER_MODIFIERS",
		"GLOBAL",
		"UNIQUE",
		"OTHER_ATTR",
		"EVENTS",
		"CONTENT"
	] }]
};
/**
* Vue 2 专属规则记录。
*
* 不强制使用 Vue 3 才完整支持的 emits 组件契约；只应与 Vue 2 upstream preset 组合。
*
* @public
*/
const vue2Rules = { "vue/require-explicit-emits": "off" };
/**
* Vue 3 专属规则记录。
*
* 要求组件显式声明对外事件，使 emits 成为可审查的组件公共 API。
*
* @public
*/
const vue3Rules = { "vue/require-explicit-emits": "error" };
//#endregion
Object.defineProperty(exports, "angularRules", {
	enumerable: true,
	get: function() {
		return angularRules;
	}
});
Object.defineProperty(exports, "commonRules", {
	enumerable: true,
	get: function() {
		return commonRules;
	}
});
Object.defineProperty(exports, "defineRules", {
	enumerable: true,
	get: function() {
		return defineRules;
	}
});
Object.defineProperty(exports, "importRules", {
	enumerable: true,
	get: function() {
		return importRules;
	}
});
Object.defineProperty(exports, "javascriptRules", {
	enumerable: true,
	get: function() {
		return javascriptRules;
	}
});
Object.defineProperty(exports, "packageJsonSortRules", {
	enumerable: true,
	get: function() {
		return packageJsonSortRules;
	}
});
Object.defineProperty(exports, "preferLodashRules", {
	enumerable: true,
	get: function() {
		return preferLodashRules;
	}
});
Object.defineProperty(exports, "preferLodashUnifiedRules", {
	enumerable: true,
	get: function() {
		return preferLodashUnifiedRules;
	}
});
Object.defineProperty(exports, "reactAutomaticRuntimeRules", {
	enumerable: true,
	get: function() {
		return reactAutomaticRuntimeRules;
	}
});
Object.defineProperty(exports, "reactRules", {
	enumerable: true,
	get: function() {
		return reactRules;
	}
});
Object.defineProperty(exports, "reactTypeScriptRules", {
	enumerable: true,
	get: function() {
		return reactTypeScriptRules;
	}
});
Object.defineProperty(exports, "tsconfigJsonSortRules", {
	enumerable: true,
	get: function() {
		return tsconfigJsonSortRules;
	}
});
Object.defineProperty(exports, "typescriptRules", {
	enumerable: true,
	get: function() {
		return typescriptRules;
	}
});
Object.defineProperty(exports, "vue2Rules", {
	enumerable: true,
	get: function() {
		return vue2Rules;
	}
});
Object.defineProperty(exports, "vue3Rules", {
	enumerable: true,
	get: function() {
		return vue3Rules;
	}
});
Object.defineProperty(exports, "vueCommonRules", {
	enumerable: true,
	get: function() {
		return vueCommonRules;
	}
});

//# sourceMappingURL=rules.js.map