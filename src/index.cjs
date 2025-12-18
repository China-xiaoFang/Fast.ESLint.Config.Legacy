const {
	CONST_JS,
	CONST_JSX,
	CONST_TS,
	CONST_TSX,
	CONST_DTS,
	CONST_TSCONFIG,
	CONST_VUE,
	CONST_JSON,
	CONST_JSONC,
	CONST_JSON5,
	CONST_JSON6,
} = require("./constants/index");
const { isVue3 } = require("./env/index");
const {
	commonRules,
	importRules,
	importUseLodashUnifiedRules,
	javascriptRules,
	packageJsonSortRules,
	tsconfigJsonSortRules,
	typescriptRules,
	vueRules,
} = require("./rules");

// @see: http://eslint.cn
module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	plugins: ["@typescript-eslint", "regexp", "prettier"],
	// 继承某些已有的规则
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:regexp/recommended",
		"plugin:jsonc/recommended-with-jsonc",
		"plugin:markdown/recommended-legacy",
		isVue3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended",
		"plugin:prettier/recommended",
	],
	globals: {
		$: "readonly",
		$$: "readonly",
		$computed: "readonly",
		$customRef: "readonly",
		$ref: "readonly",
		$shallowRef: "readonly",
		$toRef: "readonly",
	},
	parserOptions: {
		ecmaFeatures: {
			// 允许使用 JSX 语法，适用于 Vue 组件中的 JSX 代码。
			jsx: true,
		},
		sourceType: "module",
	},
	settings: {
		// 确保 ESLint 和 eslint-plugin-import 能够正确解析项目中的所有相关文件类型
		"import/resolver": {
			node: {
				extensions: [CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, CONST_DTS],
			},
		},
	},
	overrides: [
		{
			files: ["**/*.md/*.js"],
			rules: {
				// 使用使用控制台
				"no-console": "off",
				// 关闭 - 禁止使用未声明的变量，除非/*global *\/注释中提到
				"no-undef": "off",
				// 关闭 - 禁用对无法解析的模块导入的检查
				"import/no-unresolved": "off",
				// 关闭 - 禁止在文件中重复导入相同的模块
				"import/no-duplicates": "off",
			},
		},
		{
			files: ["**/scripts/*", "**/cli.*"],
			rules: {
				// 使用使用控制台
				"no-console": "off",
			},
		},
		{
			files: [CONST_TS, CONST_TSX],
			parserOptions: {
				ecmaFeatures: {
					// 允许使用 TSX 语法，适用于 Vue 组件中的 TSX 代码。
					tsx: true,
				},
				sourceType: "module",
			},
		},
		{
			files: [CONST_DTS],
			rules: {
				// 关闭 - 一致地使用 TypeScript 类型导入
				"@typescript-eslint/consistent-type-imports": "off",
			},
		},
		{
			files: ["**/vite.config.*"],
			rules: {
				// 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
				"@typescript-eslint/explicit-function-return-type": "off",
			},
		},
		{
			files: ["**/*.md/*.ts"],
			rules: {
				// 允许定义未使用的变量
				"@typescript-eslint/no-unused-vars": "off",
			},
		},
		{
			files: [CONST_JSON, CONST_JSONC, CONST_JSON5, CONST_JSON6],
			// 允许 ESLint 处理 JSON 文件中的模板和脚本
			parser: "jsonc-eslint-parser",
		},
		{
			files: ["**/package.json"],
			rules: packageJsonSortRules,
		},
		{
			files: CONST_TSCONFIG,
			rules: tsconfigJsonSortRules,
		},
		{
			files: [CONST_VUE],
			// 允许 ESLint 处理 Vue 文件中的模板和脚本
			parser: "vue-eslint-parser",
			parserOptions: {
				// 允许在 Vue 文件中的脚本部分使用 TypeScript 语法
				parser: "@typescript-eslint/parser",
				// 指定额外的文件扩展名，告诉解析器 .vue 文件也需要处理
				extraFileExtensions: [".vue"],
				// 允许使用 JSX/TSX 语法，适用于 Vue 组件中的 JSX/TSX 代码。
				ecmaFeatures: {
					jsx: true,
					tsx: true,
				},
				sourceType: "module",
			},
			rules: {
				// 关闭 - 禁止使用未声明的变量，以避免在 .vue 文件中出现关于未定义变量的警告，这在 Vue 单文件组件中可能不适用或会导致不必要的警告
				"no-undef": "off",

				// 关闭 - 要求在 TypeScript 函数和方法中显式地指定返回类型
				"@typescript-eslint/explicit-function-return-type": "off",
			},
		},
	],
	/**
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		...commonRules,

		...javascriptRules,

		...importRules,

		...importUseLodashUnifiedRules,

		...typescriptRules,

		...vueRules,

		// 确保 Prettier 错误被 ESLint 捕获
		"prettier/prettier": "error",
	},
};
