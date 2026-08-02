//#region src/rules/import.d.ts
/**
 * 模块导入正确性、去重与确定性排序规则。
 *
 * 该记录由 import 配置创建器在 `plugin:import-x/recommended` 之后应用。共享配置无法知道
 * 消费项目的 alias、tsconfig paths 或 bundler resolver，因此依赖具体解析器的规则保持关闭。
 * 副作用 import 会参与顺序诊断，但不会被插件自动移动。
 *
 * @public
 */
declare const importRules: {
  "import-x/first": "error";
  "import-x/no-duplicates": "error";
  "import-x/order": ["error", {
    groups: string[];
    "newlines-between": string;
    alphabetize: {
      order: string;
      caseInsensitive: boolean;
    };
    warnOnUnassignedImports: boolean;
  }];
  "import-x/no-unresolved": "off";
  "import-x/namespace": "off";
  "import-x/default": "off";
  "import-x/no-named-as-default": "off";
  "import-x/no-named-as-default-member": "off";
  "import-x/named": "off";
};
//#endregion
export { importRules };
//# sourceMappingURL=import.d.ts.map