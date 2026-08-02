//#region src/constants/index.d.ts
/**
 * 配置创建器共用的内部文件匹配常量。
 *
 * 所有 glob 都使用 ESLint 8 Legacy override 语义，以消费项目工作目录为匹配根；它们不是
 * package exports。新增扩展名时必须同步检查环境、框架、声明文件和 CommonJS override。
 *
 * @packageDocumentation
 */
/** JavaScript 与 JSX 文件；扩展名列表与 Node.js ESM/CJS 约定保持一致。 */
declare const GLOBS_JAVASCRIPT: readonly ["**/*.{js,cjs,mjs,jsx}"];
/** TypeScript 与 TSX 文件；包含 TypeScript 的 ESM/CJS 专用扩展名。 */
declare const GLOBS_TYPESCRIPT: readonly ["**/*.{ts,cts,mts,tsx}"];
/** TypeScript 声明文件。 */
declare const GLOB_DECLARATION = "**/*.d.{ts,cts,mts}";
/** Vue 2/3 单文件组件。 */
declare const GLOB_VUE = "**/*.vue";
/** Angular 组件、指令、服务等框架源码。 */
declare const GLOB_ANGULAR_TYPESCRIPT = "**/*.ts";
/** Angular 外部 HTML 模板；内联模板由 Angular processor 提取。 */
declare const GLOB_ANGULAR_TEMPLATE = "**/*.html";
/** 严格 JSON 文件；JSONC 风格的 `.json` 工具配置会在配置层排除。 */
declare const GLOB_JSON = "**/*.json";
/** 显式使用 `.jsonc` 扩展名的 JSON with Comments 文件。 */
declare const GLOB_JSONC = "**/*.jsonc";
/** JSON5 文件。 */
declare const GLOB_JSON5 = "**/*.json5";
/** Markdown 文档。 */
declare const GLOB_MARKDOWN = "**/*.md";
/** YAML 文档。 */
declare const GLOB_YAML = "**/*.{yaml,yml}";
/** 默认由 JavaScript、TypeScript 与 Vue 规则处理的全部代码文件。 */
declare const GLOBS_CODE: readonly ["**/*.{js,cjs,mjs,jsx}", "**/*.{ts,cts,mts,tsx}", "**/*.vue"];
/**
 * 默认按照 Node.js 环境处理的工程文件。
 *
 * 根配置或消费项目决定应用源码环境，避免 browser/node 全局变量互相掩盖。
 */
declare const GLOBS_NODE_TOOLING: readonly ["**/*.{config,setup}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}", "**/.*rc.{js,cjs,mjs,ts,cts,mts}", "**/{scripts,bin}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}", "**/{test,tests,__tests__}/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}", "**/*.{test,spec}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}", "**/cli.{js,cjs,mjs,ts,cts,mts}"];
/** TypeScript 配置文件。 */
declare const GLOBS_TSCONFIG: readonly ["**/tsconfig.json", "**/tsconfig.*.json"];
/** 允许注释、但扩展名仍为 .json 的常见工具配置。 */
declare const GLOBS_JSONC_AS_JSON: readonly ["**/tsconfig.json", "**/tsconfig.*.json", "**/.vscode/settings.json"];
/** CommonJS 文件；这些文件允许显式 require()。 */
declare const GLOBS_COMMONJS: readonly ["**/*.cjs", "**/*.cts"];
//#endregion
export { GLOBS_CODE, GLOBS_COMMONJS, GLOBS_JAVASCRIPT, GLOBS_JSONC_AS_JSON, GLOBS_NODE_TOOLING, GLOBS_TSCONFIG, GLOBS_TYPESCRIPT, GLOB_ANGULAR_TEMPLATE, GLOB_ANGULAR_TYPESCRIPT, GLOB_DECLARATION, GLOB_JSON, GLOB_JSON5, GLOB_JSONC, GLOB_MARKDOWN, GLOB_VUE, GLOB_YAML };
//# sourceMappingURL=index.d.ts.map