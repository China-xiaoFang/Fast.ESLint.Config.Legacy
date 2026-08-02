//#region src/rules/lodash.ts
/**
* 按需启用：要求项目统一使用 lodash-unified。
* 该规则只限制静态 import/export，不检查动态 import() 或 CommonJS require()。
* 可通过 `createLodashConfigs("lodash-unified")` 启用，或从 `/rules` 导入后用于自定义文件范围。
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
* 可通过 `createLodashConfigs("lodash")` 启用，或从 `/rules` 导入后用于自定义文件范围。
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
exports.preferLodashRules = preferLodashRules;
exports.preferLodashUnifiedRules = preferLodashUnifiedRules;

//# sourceMappingURL=lodash.js.map