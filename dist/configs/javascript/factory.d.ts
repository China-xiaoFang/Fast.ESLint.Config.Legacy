import { Linter } from "eslint";
//#region src/configs/javascript/factory.d.ts
interface JavaScriptConfigOverride extends Linter.ConfigOverride {
  rules: Linter.RulesRecord;
}
/**
 * 创建 JavaScript 与 JSX 配置。
 *
 * JSX 解析在这里显式开启；基础正确性和公共规则由更早的 `createCommonConfigs()` 提供。
 *
 * @param files - 由该 override 接管的 JavaScript 文件 glob。
 * @returns 包含 parserOptions 与本地 JavaScript 规则的单个 override。
 * @internal
 */
declare const createJavaScriptConfig: (files?: readonly string[]) => JavaScriptConfigOverride;
/**
 * 将 {@link createJavaScriptConfig} 包装为组合器使用的 override 数组。
 *
 * @param files - 由 JavaScript 配置接管的文件 glob。
 * @returns 始终包含一个 JavaScript override 的数组。
 * @internal
 */
declare const createJavaScriptConfigs: (files?: readonly string[]) => Linter.ConfigOverride[];
//#endregion
export { createJavaScriptConfig, createJavaScriptConfigs };
//# sourceMappingURL=factory.d.ts.map