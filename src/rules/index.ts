/**
 * 本地规则覆写的公共入口。
 *
 * 标记为 `[高影响]` 的默认规则必须同步更新中英文风险文档和集成测试。
 */
export { defineRules } from "../define-rules";
export type { RuleName, RuleOptions } from "../typegen";

export * from "./common";
export * from "./import";
export * from "./javascript";
export * from "./sort-package";
export * from "./sort-tsconfig";
export * from "./typescript";
export * from "./vue";
