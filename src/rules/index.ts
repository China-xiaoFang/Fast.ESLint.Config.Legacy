/**
 * 类型安全规则工具与本包本地规则记录的公共入口。
 *
 * 大多数项目应继承公开预置并在 `.eslintrc` 中覆写少量规则；本入口面向需要共享
 * 组织级规则或审查本包具体规则取舍的高级用例。导出的对象是普通规则记录，不包含
 * parser、plugin、env 或文件范围，直接使用时由调用方负责提供这些配置上下文。
 *
 * @packageDocumentation
 */
/** 类型安全规则 API 使用的规则名与规则记录类型。 */
export type { RuleName, RuleOptions } from "../typegen";

export { defineRules } from "../define-rules";

export * from "./angular";
export * from "./common";
export * from "./import";
export * from "./javascript";
export * from "./lodash";
export * from "./react";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
