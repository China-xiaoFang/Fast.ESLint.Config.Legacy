import { Linter } from "eslint";
//#region src/factories/yaml.d.ts
/**
 * YAML 配置的内部选项。
 *
 * @internal
 */
interface YamlConfigOptions {
  /**
   * 是否追加 eslint-plugin-yml 的 Prettier 兼容预置。
   * @default true
   */
  prettier?: boolean;
}
/**
 * 创建 YAML 解析、推荐规则与可选 Prettier 兼容配置。
 *
 * @param options - Prettier 兼容层开关。
 * @returns 匹配 `.yaml` 与 `.yml` 的单个 override。
 * @internal
 */
declare const createYamlConfigs: ({ prettier }?: YamlConfigOptions) => Linter.ConfigOverride[];
//#endregion
export { YamlConfigOptions, createYamlConfigs };
//# sourceMappingURL=yaml.d.ts.map