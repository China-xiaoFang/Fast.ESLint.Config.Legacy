//#region src/configs/vue2.ts
/** 可直接用于 Legacy `extends` 的 Vue 2 配置。 */
const config = {
	reportUnusedDisableDirectives: true,
	overrides: require("./vue.js").createVueConfigs({ version: 2 })
};
//#endregion
exports.default = config;

//# sourceMappingURL=vue2.js.map