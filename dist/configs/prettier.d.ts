import { Linter } from "eslint";
//#region src/configs/prettier.d.ts
/**
 * 创建 Prettier 兼容层。
 *
 * 它只关闭冲突规则，不在 ESLint 中执行 Prettier；项目规则仍在它之后生效。
 *
 * @param files - 需要关闭格式冲突规则的代码文件 glob。
 * @returns 单个 `prettier` extends override；文件集合为空时返回空数组。
 * @internal
 */
declare const createPrettierConfigs: (files: readonly string[]) => Linter.ConfigOverride[];
/** 可直接用于 Legacy `extends` 的 Prettier 冲突兼容配置。 */
declare const config: Linter.Config;
//#endregion
export { createPrettierConfigs, config as default };
//# sourceMappingURL=prettier.d.ts.map