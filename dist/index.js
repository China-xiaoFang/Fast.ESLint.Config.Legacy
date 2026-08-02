const require_constants_index = require("./constants/index.js");
const require_factory = require("./configs/typescript/factory.js");
const require_factory$1 = require("./configs/common/factory.js");
const require_factory$2 = require("./configs/commonjs/factory.js");
const require_factory$3 = require("./configs/environment/factory.js");
const require_factory$4 = require("./configs/import/factory.js");
const require_factory$5 = require("./configs/javascript/factory.js");
const require_factory$6 = require("./configs/json/factory.js");
const require_factory$7 = require("./configs/markdown/factory.js");
const require_factory$8 = require("./configs/prettier/factory.js");
const require_factory$9 = require("./configs/promise/factory.js");
const require_factory$10 = require("./configs/regexp/factory.js");
const require_factory$11 = require("./configs/vue/factory.js");
const require_factory$12 = require("./configs/yaml/factory.js");
//#region src/index.ts
/**
* 面向 Vue 3、TypeScript、Vite 与浏览器后台管理项目的默认 ESLint 8 Legacy Config。
* 配置创建函数、glob 常量和规则记录分别由 `./configs`、`./constants` 与 `./rules` 提供。
*
* @packageDocumentation
*/
/** Markdown processor 需要根级 extends，虚拟代码块规则则合并到 overrides。 */
const markdownConfigs = require_factory$7.createMarkdownConfigs();
/**
* Vue 3 Web 浏览器管理项目的完整 ESLint 8 Legacy Config 配置。
*
* 该配置统一检查 JavaScript、TypeScript、Vue 3 单文件组件、JSON、YAML 与 Markdown，
* 并启用 import、Promise、RegExp 和 Prettier 兼容规则。应用源码使用 browser 环境；
* CommonJS、构建脚本、测试及其他工程文件会按文件范围获得 Node.js globals。
*
* Markdown processor 必须通过根级 `extends` 注册，其虚拟代码块规则则合并到
* `overrides`。Vue 2、React、Angular、类型感知及排序规则不会默认启用，应通过对应
* 子路径按需叠加。
*
* @example
* ```js
* module.exports = {
*   root: true,
*   extends: ["@fast-china/eslint-config-legacy"],
* };
* ```
*
* @public
*/
const config = {
	extends: markdownConfigs.extends,
	reportUnusedDisableDirectives: true,
	overrides: [
		...require_factory$3.createEnvironmentConfigs({
			environment: "browser",
			files: require_constants_index.GLOBS_CODE
		}),
		...require_factory$1.createCommonConfigs(require_constants_index.GLOBS_CODE),
		...require_factory$5.createJavaScriptConfigs(),
		...require_factory.createTypeScriptConfigs(),
		...require_factory$11.createVueConfigs({ version: 3 }),
		...require_factory$4.createImportConfigs(require_constants_index.GLOBS_CODE),
		...require_factory$9.createPromiseConfigs(require_constants_index.GLOBS_CODE),
		...require_factory$10.createRegexpConfigs(require_constants_index.GLOBS_CODE),
		...require_factory$6.createJsonConfigs(),
		...require_factory$12.createYamlConfigs(),
		...require_factory.createTypeScriptDeclarationConfigs(),
		...require_factory$2.createCommonJsConfigs(),
		...require_factory$3.createNodeToolingConfigs(),
		...markdownConfigs.overrides,
		...require_factory$8.createPrettierConfigs(require_constants_index.GLOBS_CODE)
	]
};
//#endregion
module.exports = config;

//# sourceMappingURL=index.js.map