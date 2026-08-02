//#region src/rules/sort-tsconfig.d.ts
/**
 * tsconfig.json 属性排序规则。
 *
 * `[高影响][可自动修复][按需启用]`：由 `/sort-tsconfig` 显式开启，首次修复会重排大量字段，但只改变 JSONC 的阅读顺序，
 * 不改变 TypeScript 编译选项值。
 * 记录只描述排序规则，JSONC parser 和推荐规则由配置层负责提供。
 *
 * @public
 */
declare const tsconfigJsonSortRules: {
  "jsonc/no-comments": "off";
  "jsonc/sort-keys": ["error", {
    order: string[];
    pathPattern: string;
  }, {
    order: string[];
    pathPattern: string;
  }];
};
//#endregion
export { tsconfigJsonSortRules };
//# sourceMappingURL=sort-tsconfig.d.ts.map