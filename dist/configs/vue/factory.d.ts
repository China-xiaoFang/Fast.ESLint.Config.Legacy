import { TypeAwareOptions } from "../typescript/factory.js";
import { Linter } from "eslint";
//#region src/configs/vue/factory.d.ts
/**
 * Vue 2/3 单文件组件的内部配置选项。
 *
 * @internal
 */
interface VueConfigOptions extends TypeAwareOptions {
  /**
   * 决定 upstream Vue preset 与主版本专属规则。
   * @default 3
   */
  version?: 2 | 3;
  /**
   * Vue 单文件组件范围。
   * @default ["**\/*.vue"]
   */
  files?: string[];
  /**
   * 是否在 Vue script 中启用 TypeScript parser 与规则。
   * @default true
   */
  typescript?: boolean;
}
/**
 * 创建 Vue 2/3 单文件组件配置。
 *
 * `vue-eslint-parser` 始终负责模板；TypeScript 启用时再通过 `parserOptions.parser` 解析
 * script，并应用 TypeScript 核心替代规则。Vue common 规则在 upstream preset 之后应用，
 * 最后追加 Vue 主版本专属规则。
 *
 * @param options - Vue 主版本、文件范围、TypeScript 与类型感知选项。
 * @returns 匹配 Vue SFC 的单个 Legacy override。
 * @internal
 */
declare const createVueConfigs: ({ files, typeChecked, tsconfigRootDir, typescript, version }?: VueConfigOptions) => Linter.ConfigOverride[];
//#endregion
export { VueConfigOptions, createVueConfigs };
//# sourceMappingURL=factory.d.ts.map