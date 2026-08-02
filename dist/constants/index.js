Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/constants/index.ts
/**
* 配置创建器共用的内部文件匹配常量。
*
* 所有 glob 都使用 ESLint 8 Legacy override 语义，以消费项目工作目录为匹配根；它们不是
* package exports。新增扩展名时必须同步检查环境、框架、声明文件和 CommonJS override。
*
* @packageDocumentation
*/
/** JavaScript 与 JSX 文件；扩展名列表与 Node.js ESM/CJS 约定保持一致。 */
const GLOBS_JAVASCRIPT = ["**/*.{js,cjs,mjs,jsx}"];
/** TypeScript 与 TSX 文件；包含 TypeScript 的 ESM/CJS 专用扩展名。 */
const GLOBS_TYPESCRIPT = ["**/*.{ts,cts,mts,tsx}"];
/** TypeScript 声明文件。 */
const GLOB_DECLARATION = "**/*.d.{ts,cts,mts}";
/** Vue 2/3 单文件组件。 */
const GLOB_VUE = "**/*.vue";
/** Angular 组件、指令、服务等框架源码。 */
const GLOB_ANGULAR_TYPESCRIPT = "**/*.ts";
/** Angular 外部 HTML 模板；内联模板由 Angular processor 提取。 */
const GLOB_ANGULAR_TEMPLATE = "**/*.html";
/** 严格 JSON 文件；JSONC 风格的 `.json` 工具配置会在配置层排除。 */
const GLOB_JSON = "**/*.json";
/** 显式使用 `.jsonc` 扩展名的 JSON with Comments 文件。 */
const GLOB_JSONC = "**/*.jsonc";
/** JSON5 文件。 */
const GLOB_JSON5 = "**/*.json5";
/** Markdown 文档。 */
const GLOB_MARKDOWN = "**/*.md";
/** YAML 文档。 */
const GLOB_YAML = "**/*.{yaml,yml}";
/** 默认由 JavaScript、TypeScript 与 Vue 规则处理的全部代码文件。 */
const GLOBS_CODE = [
	...GLOBS_JAVASCRIPT,
	...GLOBS_TYPESCRIPT,
	GLOB_VUE
];
/**
* 默认按照 Node.js 环境处理的工程文件。
*
* 根配置或消费项目决定应用源码环境，避免 browser/node 全局变量互相掩盖。
*/
const GLOBS_NODE_TOOLING = [
	"**/*.{config,setup}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/.*rc.{js,cjs,mjs,ts,cts,mts}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/{test,tests,__tests__}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}"
];
/** TypeScript 配置文件。 */
const GLOBS_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
/** 允许注释、但扩展名仍为 .json 的常见工具配置。 */
const GLOBS_JSONC_AS_JSON = [...GLOBS_TSCONFIG, "**/.vscode/settings.json"];
/** CommonJS 文件；这些文件允许显式 require()。 */
const GLOBS_COMMONJS = ["**/*.cjs", "**/*.cts"];
//#endregion
exports.GLOBS_CODE = GLOBS_CODE;
exports.GLOBS_COMMONJS = GLOBS_COMMONJS;
exports.GLOBS_JAVASCRIPT = GLOBS_JAVASCRIPT;
exports.GLOBS_JSONC_AS_JSON = GLOBS_JSONC_AS_JSON;
exports.GLOBS_NODE_TOOLING = GLOBS_NODE_TOOLING;
exports.GLOBS_TSCONFIG = GLOBS_TSCONFIG;
exports.GLOBS_TYPESCRIPT = GLOBS_TYPESCRIPT;
exports.GLOB_ANGULAR_TEMPLATE = GLOB_ANGULAR_TEMPLATE;
exports.GLOB_ANGULAR_TYPESCRIPT = GLOB_ANGULAR_TYPESCRIPT;
exports.GLOB_DECLARATION = GLOB_DECLARATION;
exports.GLOB_JSON = GLOB_JSON;
exports.GLOB_JSON5 = GLOB_JSON5;
exports.GLOB_JSONC = GLOB_JSONC;
exports.GLOB_MARKDOWN = GLOB_MARKDOWN;
exports.GLOB_VUE = GLOB_VUE;
exports.GLOB_YAML = GLOB_YAML;

//# sourceMappingURL=index.js.map