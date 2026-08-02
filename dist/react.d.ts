import { Linter } from "eslint";
//#region src/configs/react/index.d.ts
/**
 * React 应用的完整 ESLint 8 Legacy Config 配置。
 *
 * 该配置检查 JavaScript、TypeScript、JSX 与 TSX，启用 React 推荐规则、自动 JSX
 * runtime、Hooks、JSX 无障碍规则及本项目的 DOM 安全约束。TSX 不重复检查 PropTypes。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/react"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=react.d.ts.map