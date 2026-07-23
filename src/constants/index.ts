/** JavaScript 文件。 */
export const CONST_JS = "**/*.?([cm])js";

/** JSX 文件。 */
export const CONST_JSX = "**/*.?([cm])jsx";

/** TypeScript 文件。 */
export const CONST_TS = "**/*.?([cm])ts";

/** TSX 文件。 */
export const CONST_TSX = "**/*.?([cm])tsx";

/** TypeScript 声明文件。 */
export const CONST_DTS = "**/*.d.?([cm])ts";

/** 严格 JSON 文件。 */
export const CONST_JSON = "**/*.json";

/** JSON with Comments 文件。 */
export const CONST_JSONC = "**/*.jsonc";

/** JSON5 文件。 */
export const CONST_JSON5 = "**/*.json5";

/** Markdown 文件。 */
export const CONST_MD = "**/*.md";

/** Vue 单文件组件。 */
export const CONST_VUE = "**/*.vue";

/** JavaScript 文件集合。 */
export const GLOB_JAVASCRIPT = [CONST_JS, CONST_JSX];

/** TypeScript 文件集合。 */
export const GLOB_TYPESCRIPT = [CONST_TS, CONST_TSX];

/** ESLint 可以处理的脚本和组件文件。 */
export const GLOB_CODE = [...GLOB_JAVASCRIPT, ...GLOB_TYPESCRIPT, CONST_VUE];

/**
 * 默认按照 Node.js 环境处理的工程文件。
 *
 * 应用源码仍使用 factory 选择的运行时环境，避免 browser/node 全局变量互相掩盖。
 */
export const GLOB_NODE = [
	"**/*.{config,setup}.{js,cjs,mjs,ts,cts,mts}",
	"**/.*rc.{js,cjs,mjs,ts,cts,mts}",
	"**/{scripts,bin}/**/*.{js,cjs,mjs,ts,cts,mts}",
	"**/{test,tests}/**/*.{js,cjs,mjs,ts,cts,mts}",
	"**/cli.{js,cjs,mjs,ts,cts,mts}",
];

/** TypeScript 配置文件。 */
export const CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];

/** 允许注释、但扩展名仍为 .json 的常见工具配置。 */
export const GLOB_JSONC_AS_JSON = [...CONST_TSCONFIG, "**/.vscode/settings.json"];

/** CommonJS 文件；这些文件允许显式 require()。 */
export const GLOB_COMMONJS = ["**/*.cjs", "**/*.cts"];
