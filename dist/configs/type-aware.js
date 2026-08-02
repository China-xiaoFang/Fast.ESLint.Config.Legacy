//#region src/configs/type-aware.ts
/** 可直接用于 Legacy `extends` 的 TypeScript 与 Vue 类型感知配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./typescript.js").createTypeAwareConfigs()
};
//#endregion
exports.default = config;

//# sourceMappingURL=type-aware.js.map