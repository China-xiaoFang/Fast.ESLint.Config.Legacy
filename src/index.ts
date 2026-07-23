import { PresetVueConfig } from "./factory";

/**
 * ESLint 8 shareable config 的根入口必须直接导出配置对象，
 * 这样 `extends: ["@fast-china/eslint-config-legacy"]` 才能被 ESLint 加载。
 */
export = PresetVueConfig;
