import { Linter } from "eslint";
//#region src/core/index.d.ts
type CompletePresetName = "angular" | "base" | "javascript" | "node" | "react" | "typescript" | "vue2" | "vue3";
/**
 * 内部组合器支持的完整预置与叠加预置名称。
 *
 * 名称必须与 `src/presets` 和 `package.json#exports` 保持一一对应。
 *
 * @internal
 */
type PresetName = CompletePresetName | "lodash" | "lodash-unified" | "sort-package" | "sort-tsconfig" | "type-aware";
/**
 * 创建公开的静态 Legacy 预置。
 *
 * 完整预置可以单独继承；`type-aware`、排序和 Lodash 预置必须放在完整预置之后叠加。
 * 该函数只供 `src/presets` 构建入口调用，不从 package exports 暴露。
 * 每次调用都会创建新的配置对象和 override 数组，公开入口之间不会共享可变配置状态。
 *
 * @param name - 与公开子路径对应的预置名称。
 * @returns 完整预置或只包含目标能力的叠加预置。
 * @throws {TypeError} 当内部调用方传入未注册的预置名称时抛出。
 * @internal
 */
declare const createPreset: (name: PresetName) => Linter.Config;
//#endregion
export { PresetName, createPreset };
//# sourceMappingURL=index.d.ts.map