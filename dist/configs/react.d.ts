import { TypeScriptConfigOptions } from "./typescript.js";
import { Linter } from "eslint";
//#region src/configs/react.d.ts
/**
 * React、Hooks 与 JSX accessibility 的内部配置选项。
 *
 * 根入口默认不启用 React；创建器使用 automatic JSX runtime 和 React 版本自动检测。项目如需覆盖
 * 这些行为，应通过自己的 Legacy override 或 React settings 表达。
 *
 * @internal
 */
interface ReactConfigOptions {
  /**
   * 普通 JS/JSX React 文件。
   * @default 所有 JavaScript 方言
   */
  javascriptFiles?: string[];
  /**
   * TS/TSX React 文件。
   * @default 所有 TypeScript 方言
   */
  typescriptFiles?: string[];
  /**
   * 传递给 `settings.react.version` 的 React 版本。
   * @default "detect"
   */
  version?: "detect" | string;
  /**
   * JSX runtime；automatic 会关闭显式 React 作用域规则。
   * @default "automatic"
   */
  jsxRuntime?: "automatic" | "classic";
}
/** 控制 React 创建器接管哪些脚本语言的内部组合选项。 */
interface ReactLanguageOptions {
  /**
   * 是否创建 JavaScript/JSX React override。
   * @default true
   */
  javascript?: boolean;
  /**
   * 是否创建 TypeScript/TSX React override。
   * @default true
   */
  typescript?: boolean;
  /**
   * 传递给 TypeScript parser 与规则层的配置。
   * @default {}
   */
  typescriptOptions?: TypeScriptConfigOptions;
}
/**
 * 创建 React、Hooks 与 JSX accessibility Legacy overrides。
 *
 * JavaScript 和 TypeScript 使用独立 override，但共享 React、Hooks、JSX accessibility
 * extends 与 React version settings。TSX override 额外关闭 PropTypes；automatic runtime
 * 额外关闭要求 React 标识符处于作用域的规则。禁用语言或提供空文件范围时不会创建对应项。
 *
 * @param options - React 版本、JSX runtime 与两种语言的文件范围。
 * @param languageOptions - 语言开关及 TypeScript parser 选项。
 * @returns 按 JavaScript、TypeScript 顺序排列的 React overrides。
 * @internal
 */
declare const createReactConfigs: ({ javascriptFiles, jsxRuntime, typescriptFiles, version }?: ReactConfigOptions, { javascript, typescript, typescriptOptions }?: ReactLanguageOptions) => Linter.ConfigOverride[];
/** 可直接用于 Legacy `extends` 的 React 配置。 */
declare const config: Linter.Config;
//#endregion
export { ReactConfigOptions, createReactConfigs, config as default };
//# sourceMappingURL=react.d.ts.map