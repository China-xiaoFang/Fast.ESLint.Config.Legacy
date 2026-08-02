const require_constants_index = require("../constants/index.js");
//#region src/configs/yaml.ts
/**
* 创建 YAML 解析、推荐规则与可选 Prettier 兼容配置。
*
* @param options - Prettier 兼容层开关。
* @returns 匹配 `.yaml` 与 `.yml` 的单个 override。
* @internal
*/
const createYamlConfigs = ({ prettier = true } = {}) => [{
	files: [require_constants_index.GLOB_YAML],
	parser: "yaml-eslint-parser",
	extends: ["plugin:yml/recommended", ...prettier ? ["plugin:yml/prettier"] : []]
}];
/** 可直接用于 Legacy `extends` 的 YAML 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: createYamlConfigs()
};
//#endregion
exports.createYamlConfigs = createYamlConfigs;
exports.default = config;

//# sourceMappingURL=yaml.js.map