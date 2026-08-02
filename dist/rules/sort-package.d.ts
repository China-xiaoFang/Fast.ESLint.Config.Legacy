//#region src/rules/sort-package.d.ts
/**
 * package.json 属性排序规则。
 *
 * `[高影响][可自动修复][按需启用]`：由 `/sort-package` 显式开启，首次修复可能重排大量字段。
 * 注意：这里故意不排序 exports 内部键；条件导出的键顺序具有模块解析语义。
 * 记录只描述排序规则，JSON parser 和方言预置由配置层负责提供。
 *
 * @public
 */
declare const packageJsonSortRules: {
  "jsonc/sort-array-values": ["error", {
    order: {
      type: string;
    };
    pathPattern: string;
  }];
  "jsonc/sort-keys": ["error", {
    order: string[];
    pathPattern: string;
  }, {
    order: {
      type: string;
    };
    pathPattern: string;
  }, {
    order: {
      type: string;
    };
    pathPattern: string;
  }];
};
//#endregion
export { packageJsonSortRules };
//# sourceMappingURL=sort-package.d.ts.map