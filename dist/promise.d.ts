import { Linter } from "eslint";
//#region src/configs/promise/index.d.ts
/**
 * Promise 正确性的 ESLint 8 Legacy Config 规则配置。
 *
 * 该配置对 JavaScript、JSX、TypeScript、TSX 与 Vue 启用 eslint-plugin-promise 推荐规则，
 * 检查 Promise 链返回、异常处理、回调命名及常见异步反模式。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/promise"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=promise.d.ts.map