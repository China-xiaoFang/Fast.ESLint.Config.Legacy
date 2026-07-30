import { Linter } from "eslint";
//#region src/presets/sort-tsconfig.d.ts
/**
 * 按 TypeScript 文档主题整理 `tsconfig*.json` 字段的叠加预置。
 *
 * 必须放在一个完整预置之后。该预置把 tsconfig 当作 JSONC，保留注释和所有配置值，
 * 只在执行 `eslint --fix` 时调整顶层字段与 `compilerOptions` 的阅读顺序。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: [
 *     "@fast-china/eslint-config-legacy/base",
 *     "@fast-china/eslint-config-legacy/sort-tsconfig",
 *   ],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=sort-tsconfig.d.ts.map