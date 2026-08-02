const require_constants_index = require("../constants/index.js");
const require_javascript = require("../rules/javascript.js");
const require_typescript = require("../rules/typescript.js");
const require_vue = require("../rules/vue.js");
const require_typescript$1 = require("./typescript.js");
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
const createVueConfigs = ({ files = [require_constants_index.GLOB_VUE], typeChecked = false, tsconfigRootDir, typescript = true, version = 3 } = {}) => {
	const typeScriptOptions = {
		typeChecked,
		tsconfigRootDir
	};
	return [{
		files,
		extends: [...typescript ? require_typescript$1.createTypeScriptExtends(typeScriptOptions) : [], version === 3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended"],
		parser: "vue-eslint-parser",
		parserOptions: {
			...typescript ? require_typescript$1.createTypeScriptParserOptions(typeScriptOptions) : {
				ecmaVersion: "latest",
				sourceType: "module"
			},
			...typescript ? { parser: "@typescript-eslint/parser" } : {},
			extraFileExtensions: [".vue"],
			ecmaFeatures: { jsx: true }
		},
		rules: {
			...require_javascript.javascriptRules,
			...typescript ? require_typescript.typescriptRules : {},
			...require_vue.vueCommonRules,
			...version === 3 ? require_vue.vue3Rules : require_vue.vue2Rules
		}
	}];
};
/** 可直接用于 Legacy `extends` 的 Vue 3 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createVueConfigs({ version: 3 })
};
//#endregion
exports.createVueConfigs = createVueConfigs;
exports.default = config;

//# sourceMappingURL=vue.js.map