const require_constants_index = require("../constants/index.js");
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
		files: [require_constants_index.GLOB_JSON],
		excludedFiles: [...require_constants_index.GLOBS_JSONC_AS_JSON],
		extends: createJsonExtends("json", prettier)
	},
	{
		files: [require_constants_index.GLOB_JSONC],
		extends: createJsonExtends("jsonc", prettier)
	},
	{
		files: [require_constants_index.GLOB_JSON5],
		extends: createJsonExtends("json5", prettier)
	},
	{
		files: ["**/.vscode/settings.json"],
		extends: createJsonExtends("jsonc", prettier)
	},
	{
		files: [...require_constants_index.GLOBS_TSCONFIG],
		extends: createJsonExtends("jsonc", prettier)
	}
];
/** 可直接用于 Legacy `extends` 的 JSON 方言配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createJsonConfigs()
};
//#endregion
exports.createJsonConfigs = createJsonConfigs;
exports.createJsonExtends = createJsonExtends;
exports.default = config;

//# sourceMappingURL=json.js.map