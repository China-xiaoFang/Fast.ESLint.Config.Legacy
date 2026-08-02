import { Linter } from "eslint";
//#region src/configs/lodash.d.ts
/**
 * Lodash 静态导入来源策略。
 *
 * @internal
 */
type LodashPreference = "lodash" | "lodash-unified";
/**
 * 创建 Lodash 静态导入来源约束。
 *
 * @param preference - 唯一允许使用的 Lodash 包入口。
 * @param files - 应用该组织策略的代码文件 glob。
 * @returns 单个规则 override；文件集合为空时返回空数组。
 * @internal
 */
declare const createLodashConfigs: (preference: LodashPreference, files: readonly string[]) => Linter.ConfigOverride[];
/** 可直接用于 Legacy `extends` 的 Lodash 导入策略配置。 */
declare const config: Linter.Config;
//#endregion
export { LodashPreference, createLodashConfigs, config as default };
//# sourceMappingURL=lodash.d.ts.map