import { Linter } from "eslint";
//#region src/configs/json/factory.d.ts
/**
 * JSON 方言配置的内部选项。
 *
 * @internal
 */
interface JsonConfigOptions {
  /**
   * 是否追加 eslint-plugin-jsonc 的 Prettier 兼容预置。
   * @default true
   */
  prettier?: boolean;
}
/**
 * 返回指定 JSON 方言对应的 Legacy 推荐预置链。
 *
 * @param dialect - 严格 JSON、JSON5 或允许注释的 JSONC。
 * @param prettier - 是否在推荐规则之后关闭与 Prettier 冲突的规则。
 * @returns 可直接写入 Legacy override `extends` 的有序名称数组。
 * @internal
 */
declare const createJsonExtends: (dialect: "json" | "json5" | "jsonc", prettier?: boolean) => string[];
/**
 * 创建 JSON、JSONC 与 JSON5 配置。
 *
 * 严格 JSON 排除虽然以 `.json` 结尾、但规范允许注释的 tsconfig 与 VS Code 设置文件。
 * 每个方言使用独立 override，防止严格 JSON 规则误读 JSONC/JSON5 语法。
 *
 * @param options - Prettier 兼容层开关。
 * @returns 按严格 JSON、JSONC、JSON5、VS Code settings、tsconfig 排列的 overrides。
 * @internal
 */
declare const createJsonConfigs: ({ prettier }?: JsonConfigOptions) => Linter.ConfigOverride[];
//#endregion
export { JsonConfigOptions, createJsonConfigs, createJsonExtends };
//# sourceMappingURL=factory.d.ts.map