//#region src/rules/lodash.d.ts
/**
 * 按需启用：要求项目统一使用 lodash-unified。
 * 该规则只限制静态 import/export，不检查动态 import() 或 CommonJS require()。
 * 可通过 `createLodashConfigs("lodash-unified")` 启用，或从 `/rules` 导入后用于自定义文件范围。
 *
 * @public
 */
declare const preferLodashUnifiedRules: {
  "no-restricted-imports": ["error", {
    paths: {
      name: string;
      message: string;
    }[];
    patterns: {
      group: string[];
      message: string;
    }[];
  }];
};
/**
 * 按需启用：要求项目统一使用 lodash。
 * 根入口与 lodash/* 子路径均允许，但不能与 lodash-es 或 lodash-unified 混用。
 * 可通过 `createLodashConfigs("lodash")` 启用，或从 `/rules` 导入后用于自定义文件范围。
 *
 * @public
 */
declare const preferLodashRules: {
  "no-restricted-imports": ["error", {
    paths: {
      name: string;
      message: string;
    }[];
    patterns: {
      group: string[];
      message: string;
    }[];
  }];
};
//#endregion
export { preferLodashRules, preferLodashUnifiedRules };
//# sourceMappingURL=lodash.d.ts.map