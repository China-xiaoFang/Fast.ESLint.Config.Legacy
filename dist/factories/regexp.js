//#region src/factories/regexp.ts
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
exports.createRegexpConfigs = createRegexpConfigs;

//# sourceMappingURL=regexp.js.map