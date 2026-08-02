import { Linter } from "eslint";
//#region src/configs/commonjs.d.ts
/**
 * 创建 CommonJS 扩展名兼容 override。
 *
 * `.cjs` 与 `.cts` 已明确表达模块格式，因此关闭禁止 `require()` 的 TypeScript 规则；
 * 该 override 不改变 parser、env 或其他模块规则。
 *
 * @returns `.cjs` 与 `.cts` 文件共用的单个规则 override。
 * @internal
 */
declare const createCommonJsConfigs: () => Linter.ConfigOverride[];
/** 可直接用于 Legacy `extends` 的 CommonJS 兼容配置。 */
declare const config: Linter.Config;
//#endregion
export { createCommonJsConfigs, config as default };
//# sourceMappingURL=commonjs.d.ts.map