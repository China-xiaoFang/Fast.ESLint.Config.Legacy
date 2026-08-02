import { Linter } from "eslint";
//#region src/factories/sort-package.d.ts
/**
 * `package.json` 排序 override 的内部组合选项。
 *
 * @internal
 */
interface PackageJsonSortConfigOptions {
  /**
   * JSON 基础配置是否已经由根配置或自定义组合启用。
   * @default true
   */
  json?: boolean;
  /**
   * 补建 JSON 基础配置时是否启用 Prettier 兼容层。
   * @default true
   */
  prettier?: boolean;
}
/**
 * 创建显式启用的 `package.json` 排序 override。
 *
 * 当调用方没有加载 JSON 基础配置时，该函数会为 `package.json` 补充严格 JSON parser
 * 与推荐规则。实际字段顺序由 `packageJsonSortRules` 定义，并刻意避开条件导出对象。
 *
 * @param options - JSON 基础配置存在性及 Prettier 兼容层开关。
 * @returns 只匹配 `package.json` 的单个 override。
 * @internal
 */
declare const createPackageJsonSortConfigs: ({ json, prettier }?: PackageJsonSortConfigOptions) => Linter.ConfigOverride[];
//#endregion
export { PackageJsonSortConfigOptions, createPackageJsonSortConfigs };
//# sourceMappingURL=sort-package.d.ts.map