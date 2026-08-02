Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_angular = require("./angular.js");
const require_common = require("./common.js");
const require_import = require("./import.js");
const require_javascript = require("./javascript.js");
const require_lodash = require("./lodash.js");
const require_react = require("./react.js");
const require_sort_package = require("./sort-package.js");
const require_sort_tsconfig = require("./sort-tsconfig.js");
const require_typescript = require("./typescript.js");
const require_vue = require("./vue.js");
//#region src/rules/index.ts
/**
* 为消费项目定义类型安全的 ESLint 8 规则记录。
*
* @param rules - 需要写入 `.eslintrc` 的规则记录。
* @returns 与传入值引用相同、同时兼容 `Linter.RulesRecord` 的规则记录。
* @public
*/
const defineRules = (rules) => rules;
//#endregion
exports.angularRules = require_angular.angularRules;
exports.commonRules = require_common.commonRules;
exports.defineRules = defineRules;
exports.importRules = require_import.importRules;
exports.javascriptRules = require_javascript.javascriptRules;
exports.packageJsonSortRules = require_sort_package.packageJsonSortRules;
exports.preferLodashRules = require_lodash.preferLodashRules;
exports.preferLodashUnifiedRules = require_lodash.preferLodashUnifiedRules;
exports.reactAutomaticRuntimeRules = require_react.reactAutomaticRuntimeRules;
exports.reactRules = require_react.reactRules;
exports.reactTypeScriptRules = require_react.reactTypeScriptRules;
exports.tsconfigJsonSortRules = require_sort_tsconfig.tsconfigJsonSortRules;
exports.typescriptRules = require_typescript.typescriptRules;
exports.vue2Rules = require_vue.vue2Rules;
exports.vue3Rules = require_vue.vue3Rules;
exports.vueCommonRules = require_vue.vueCommonRules;

//# sourceMappingURL=index.js.map