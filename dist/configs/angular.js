const require_constants_index = require("../constants/index.js");
const require_angular = require("../rules/angular.js");
const require_typescript = require("./typescript.js");
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
const createAngularConfigs = ({ inlineTemplates = true, templateAccessibility = true, templateFiles = [require_constants_index.GLOB_ANGULAR_TEMPLATE], typescriptFiles = [require_constants_index.GLOB_ANGULAR_TYPESCRIPT] } = {}, typeScriptOptions = {}) => {
	const typeScriptConfig = require_typescript.createTypeScriptConfig(typeScriptOptions, typescriptFiles);
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
			...require_angular.angularRules
		}
	}] : [], ...templateFiles.length > 0 ? [{
		files: templateFiles,
		parser: "@angular-eslint/template-parser",
		extends: ["plugin:@angular-eslint/template/recommended", ...templateAccessibility ? ["plugin:@angular-eslint/template/accessibility"] : []]
	}] : []];
};
/** 可直接用于 Legacy `extends` 的 Angular 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createAngularConfigs()
};
//#endregion
exports.createAngularConfigs = createAngularConfigs;
exports.default = config;

//# sourceMappingURL=angular.js.map