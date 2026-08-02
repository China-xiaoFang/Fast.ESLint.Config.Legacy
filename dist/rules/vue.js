//#region src/rules/vue.ts
/**
* Vue SFC 本地覆写规则。
*
* 上游 recommended 预置负责基础正确性，这里只记录 Vue 2/3 共同的项目取舍与附加约束。
* Vue 主版本差异由 `vue2Rules` 与 `vue3Rules` 追加，记录本身不配置 parser 或文件范围。
*
* @public
*/
const vueCommonRules = {
	"vue/no-v-html": "warn",
	"vue/require-default-prop": "off",
	"vue/multi-word-component-names": "off",
	"vue/prefer-import-from-vue": "warn",
	"vue/no-dupe-keys": "error",
	"vue/no-mutating-props": "error",
	"vue/no-reserved-component-names": "error",
	"vue/no-v-text-v-html-on-component": "error",
	"vue/custom-event-name-casing": ["error", "camelCase"],
	"vue/one-component-per-file": "off",
	"vue/attributes-order": ["error", { order: [
		"DEFINITION",
		"LIST_RENDERING",
		"CONDITIONALS",
		"RENDER_MODIFIERS",
		"GLOBAL",
		"UNIQUE",
		"OTHER_ATTR",
		"EVENTS",
		"CONTENT"
	] }]
};
/**
* Vue 2 专属规则记录。
*
* 不强制使用 Vue 3 才完整支持的 emits 组件契约；只应与 Vue 2 upstream preset 组合。
*
* @public
*/
const vue2Rules = { "vue/require-explicit-emits": "off" };
/**
* Vue 3 专属规则记录。
*
* 要求组件显式声明对外事件，使 emits 成为可审查的组件公共 API。
*
* @public
*/
const vue3Rules = { "vue/require-explicit-emits": "error" };
//#endregion
exports.vue2Rules = vue2Rules;
exports.vue3Rules = vue3Rules;
exports.vueCommonRules = vueCommonRules;

//# sourceMappingURL=vue.js.map