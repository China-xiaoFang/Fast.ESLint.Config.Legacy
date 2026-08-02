import { Linter } from "eslint";
//#region src/configs/environment/index.d.ts
/**
 * 浏览器源码的 ESLint 8 Legacy Config 运行环境配置。
 *
 * 该配置为 JavaScript、JSX、TypeScript、TSX 与 Vue 文件启用 browser 和 ES2022
 * globals，不会向应用源码暴露 Node.js globals。纯 Node.js 项目应改用 `/node`。
 *
 * @example
 * ```js
 * module.exports = {
 *   extends: ["@fast-china/eslint-config-legacy/environment"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=environment.d.ts.map