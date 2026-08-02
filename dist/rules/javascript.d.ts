//#region src/rules/javascript.d.ts
/**
 * JavaScript、JSX 以及框架脚本共同使用的 ESLint 核心规则记录。
 *
 * TypeScript 和 Vue 配置会在该记录之后关闭不理解扩展语法的核心规则。记录本身不包含
 * parserOptions 或文件范围；高影响规则的行为与项目级覆盖方式见规则风险文档。
 *
 * @public
 */
declare const javascriptRules: {
  "no-console": ["warn", {
    allow: string[];
  }];
  "no-debugger": "error";
  "no-constant-condition": ["error", {
    checkLoops: boolean;
  }];
  "no-restricted-syntax": ["error", string];
  "no-var": "error";
  "no-empty": ["error", {
    allowEmptyCatch: boolean;
  }];
  "no-irregular-whitespace": "error";
  "no-use-before-define": ["warn", {
    classes: boolean;
    functions: boolean;
    variables: boolean;
  }];
  "prefer-const": ["warn", {
    destructuring: string;
    ignoreReadBeforeAssign: boolean;
  }];
  "prefer-arrow-callback": ["error", {
    allowNamedFunctions: boolean;
    allowUnboundThis: boolean;
  }];
  "object-shorthand": ["error", string, {
    ignoreConstructors: boolean;
    avoidQuotes: boolean;
  }];
  "logical-assignment-operators": ["error", string, {
    enforceForIfStatements: boolean;
  }];
  "prefer-object-spread": "error";
  "prefer-rest-params": "error";
  "prefer-spread": "error";
  "prefer-template": "error";
  "no-redeclare": "error";
};
//#endregion
export { javascriptRules };
//# sourceMappingURL=javascript.d.ts.map