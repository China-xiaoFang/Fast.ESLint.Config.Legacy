const require_constants_index = require("../../constants/index.js");
const require_react = require("../../rules/react.js");
const require_factory = require("../typescript/factory.js");
const require_factory$1 = require("../javascript/factory.js");
//#region src/configs/react/factory.ts
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
const createReactConfigs = ({ javascriptFiles = [...require_constants_index.GLOBS_JAVASCRIPT], jsxRuntime = "automatic", typescriptFiles = [...require_constants_index.GLOBS_TYPESCRIPT], version = "detect" } = {}, { javascript = true, typescript = true, typescriptOptions = {} } = {}) => {
	const reactExtends = [
		"plugin:react/recommended",
		...jsxRuntime === "automatic" ? ["plugin:react/jsx-runtime"] : [],
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended"
	];
	const runtimeRules = jsxRuntime === "automatic" ? require_react.reactAutomaticRuntimeRules : {};
	const settings = { react: { version } };
	const javaScriptConfig = require_factory$1.createJavaScriptConfig(javascriptFiles);
	const typeScriptConfig = require_factory.createTypeScriptConfig(typescriptOptions, typescriptFiles);
	return [...javascript && javascriptFiles.length > 0 ? [{
		...javaScriptConfig,
		files: javascriptFiles,
		extends: reactExtends,
		settings,
		rules: {
			...javaScriptConfig.rules,
			...require_react.reactRules,
			...runtimeRules
		}
	}] : [], ...typescript && typescriptFiles.length > 0 ? [{
		...typeScriptConfig,
		files: typescriptFiles,
		extends: [...typeScriptConfig.extends, ...reactExtends],
		settings,
		rules: {
			...typeScriptConfig.rules,
			...require_react.reactRules,
			...runtimeRules,
			...require_react.reactTypeScriptRules
		}
	}] : []];
};
//#endregion
exports.createReactConfigs = createReactConfigs;

//# sourceMappingURL=factory.js.map