/**
 * 可独立组合的 ESLint 8 Legacy Config 创建函数入口。
 *
 * 根入口不会重复导出这些成员；需要自行组合配置时请使用
 * `@fast-china/eslint-config-legacy/configs`。
 *
 * @packageDocumentation
 */
export * from "./angular/factory";
export * from "./common/factory";
export * from "./commonjs/factory";
export * from "./environment/factory";
export * from "./import/factory";
export * from "./javascript/factory";
export * from "./json/factory";
export * from "./lodash/factory";
export * from "./markdown/factory";
export * from "./prettier/factory";
export * from "./promise/factory";
export * from "./react/factory";
export * from "./regexp/factory";
export * from "./sort-package/factory";
export * from "./sort-tsconfig/factory";
export * from "./typescript/factory";
export * from "./vue/factory";
export * from "./yaml/factory";
