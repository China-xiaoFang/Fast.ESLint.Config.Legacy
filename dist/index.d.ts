import { Linter } from "eslint";
//#region src/index.d.ts
/**
 * Vue 3 Web 浏览器管理项目的完整 ESLint 8 Legacy Config 配置。
 *
 * 该配置统一检查 JavaScript、TypeScript、Vue 3 单文件组件、JSON、YAML 与 Markdown，
 * 并启用 import、Promise、RegExp 和 Prettier 兼容规则。应用源码使用 browser 环境；
 * CommonJS、构建脚本、测试及其他工程文件会按文件范围获得 Node.js globals。
 *
 * Markdown processor 必须通过根级 `extends` 注册，其虚拟代码块规则则合并到
 * `overrides`。Vue 2、React、Angular、类型感知及排序规则不会默认启用，应通过对应
 * 子路径按需叠加。
 *
 * @example
 * ```js
 * module.exports = {
 *   root: true,
 *   extends: ["@fast-china/eslint-config-legacy"],
 * };
 * ```
 *
 * @public
 */
declare const config: Linter.Config;
export = config;
//# sourceMappingURL=index.d.ts.map