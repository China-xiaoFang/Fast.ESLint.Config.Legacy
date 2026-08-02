//#region src/rules/typescript.d.ts
/**
 * TypeScript 本地覆写规则。
 *
 * 先关闭会误判 TypeScript 语法的核心规则，再启用 typescript-eslint 对应实现。
 * 该记录不启动类型服务；需要类型信息的规则由 `createTypeAwareConfigs()` 提供。
 *
 * @public
 */
declare const typescriptRules: {
  "constructor-super": "off";
  "getter-return": "off";
  "no-class-assign": "off";
  "no-const-assign": "off";
  "no-dupe-args": "off";
  "no-dupe-class-members": "off";
  "no-dupe-keys": "off";
  "no-func-assign": "off";
  "no-import-assign": "off";
  "no-new-native-nonconstructor": "off";
  "no-new-symbol": "off";
  "no-obj-calls": "off";
  "no-setter-return": "off";
  "no-this-before-super": "off";
  "no-unreachable": "off";
  "no-unsafe-negation": "off";
  "no-undef": "off";
  "no-redeclare": "off";
  "no-unused-vars": "off";
  "no-unused-expressions": "off";
  "@typescript-eslint/no-redeclare": "error";
  "@typescript-eslint/no-unused-vars": ["error", {
    args: string;
    argsIgnorePattern: string;
    caughtErrors: string;
    caughtErrorsIgnorePattern: string;
    ignoreRestSiblings: boolean;
    varsIgnorePattern: string;
  }];
  "@typescript-eslint/no-namespace": "off";
  "@typescript-eslint/no-explicit-any": "warn";
  "@typescript-eslint/no-require-imports": "error";
  "@typescript-eslint/no-unused-expressions": ["error", {
    allowShortCircuit: boolean;
    allowTernary: boolean;
  }];
  "@typescript-eslint/no-inferrable-types": "error";
  "@typescript-eslint/no-non-null-assertion": "warn";
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error";
  "@typescript-eslint/consistent-type-imports": ["error", {
    disallowTypeAnnotations: boolean;
    fixStyle: string;
    prefer: string;
  }];
};
//#endregion
export { typescriptRules };
//# sourceMappingURL=typescript.d.ts.map