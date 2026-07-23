import { Linter } from 'eslint';

type RuntimeEnvironment = "browser" | "node" | "universal";
interface TypeScriptConfigOptions {
    /** 启用需要类型信息的 typescript-eslint 预置；默认关闭。 */
    typeChecked?: boolean;
    /** 传给 parserOptions.project；typeChecked 开启时默认为 true。 */
    project?: boolean | string | string[];
    /** TypeScript 配置查找根目录；默认使用当前 ESLint 工作目录。 */
    tsconfigRootDir?: string;
}
interface VueConfigOptions extends TypeScriptConfigOptions {
    /** Vue 主版本；默认 Vue 3。 */
    version?: 2 | 3;
}
interface FastConfigOptions {
    /** 应用源码的运行时全局变量；Vue/Vite 项目通常使用 browser。 */
    environment?: RuntimeEnvironment;
    /** 是否启用 eslint-plugin-import 的正确性与排序规则。 */
    imports?: boolean;
    /** 是否启用 JSON、JSONC、JSON5 及常用清单排序。 */
    json?: boolean;
    /** 是否启用 Markdown 代码块处理器。 */
    markdown?: boolean;
    /** 是否在各语言预置末尾关闭与 Prettier 冲突的规则。 */
    prettier?: boolean;
    /** 是否启用正则表达式推荐规则。 */
    regexp?: boolean;
    /** TypeScript 支持；传入对象可开启类型感知规则。 */
    typescript?: boolean | TypeScriptConfigOptions;
    /** Vue 支持；默认 Vue 3，也可显式选择 Vue 2。 */
    vue?: boolean | 2 | 3 | VueConfigOptions;
}
declare const defaultOptions: Readonly<{
    environment: "browser";
    imports: true;
    json: true;
    markdown: true;
    prettier: true;
    regexp: true;
    typescript: true;
    vue: 3;
}>;
/**
 * 创建 ESLint 8 `.eslintrc` 配置对象。
 *
 * 默认面向 Vue 3 + Vite + TypeScript；返回值也可直接赋给 `module.exports`。
 */
declare const createConfig: (options?: FastConfigOptions) => Linter.Config;
/** 纯 JavaScript 预置，不处理 TypeScript、Vue、JSON 和 Markdown。 */
declare const PresetJavaScriptConfig: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
/** TypeScript 预置，不处理 Vue、JSON 和 Markdown。 */
declare const PresetTypeScriptConfig: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
/** JavaScript + TypeScript + JSON 基础预置。 */
declare const PresetBasicConfig: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
/** Node.js + TypeScript 预置。 */
declare const PresetNodeConfig: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
/** Vue 2 兼容预置。 */
declare const PresetVue2Config: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;
/** 默认的 Vue 3 + Vite + TypeScript 完整预置。 */
declare const PresetVueConfig: Linter.Config<Linter.RulesRecord, Linter.RulesRecord>;

export { type FastConfigOptions, PresetBasicConfig, PresetJavaScriptConfig, PresetNodeConfig, PresetTypeScriptConfig, PresetVue2Config, PresetVueConfig, type RuntimeEnvironment, type TypeScriptConfigOptions, type VueConfigOptions, createConfig, defaultOptions };
