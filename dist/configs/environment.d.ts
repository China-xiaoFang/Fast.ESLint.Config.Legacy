import { Linter } from "eslint";
//#region src/configs/environment.d.ts
/**
 * 根配置与自定义组合支持的应用源码运行环境。
 *
 * `universal` 同时提供 browser 和 Node.js globals，适用于明确共享同一源码的 SSR 场景。
 *
 * @internal
 */
type RuntimeEnvironment = "browser" | "node" | "universal";
/**
 * 应用源码环境 override 的内部创建选项。
 *
 * @internal
 */
interface EnvironmentConfigOptions {
  /**
   * 应用源码实际运行的环境。
   * @default "browser"
   */
  environment?: RuntimeEnvironment;
  /**
   * 需要获得运行时环境 globals 的代码文件；空数组表示不生成 override。
   * @default []
   */
  files?: readonly string[];
}
/**
 * 创建应用源码运行时环境配置。
 *
 * @param options - 运行环境和目标文件范围。
 * @returns 一个限定文件范围的 env override；文件范围为空时返回空数组。
 * @internal
 */
declare const createEnvironmentConfigs: ({ environment, files }?: EnvironmentConfigOptions) => Linter.ConfigOverride[];
/**
 * 创建 Node.js 工程文件环境配置。
 *
 * 配置仅匹配 config、setup、scripts、bin、CLI 和测试命名的工程文件，不会把 Node globals
 * 泄漏到 browser 应用源码。它必须晚于语言规则应用，才能可靠关闭工具脚本中的 `no-console`。
 *
 * @returns Node.js 工程文件专用的单个 override。
 * @internal
 */
declare const createNodeToolingConfigs: () => Linter.ConfigOverride[];
/** 可直接用于 Legacy `extends` 的浏览器运行环境配置。 */
declare const config: Linter.Config;
//#endregion
export { EnvironmentConfigOptions, RuntimeEnvironment, createEnvironmentConfigs, createNodeToolingConfigs, config as default };
//# sourceMappingURL=environment.d.ts.map