'use strict';

var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/constants/index.ts
var CONST_JS, CONST_JSX, CONST_TS, CONST_TSX, CONST_DTS, CONST_JSON, CONST_JSONC, CONST_JSON5, CONST_VUE, GLOB_JAVASCRIPT, GLOB_TYPESCRIPT, GLOB_NODE, CONST_TSCONFIG, GLOB_JSONC_AS_JSON, GLOB_COMMONJS;
var init_constants = __esm({
  "src/constants/index.ts"() {
    CONST_JS = "**/*.?([cm])js";
    CONST_JSX = "**/*.?([cm])jsx";
    CONST_TS = "**/*.?([cm])ts";
    CONST_TSX = "**/*.?([cm])tsx";
    CONST_DTS = "**/*.d.?([cm])ts";
    CONST_JSON = "**/*.json";
    CONST_JSONC = "**/*.jsonc";
    CONST_JSON5 = "**/*.json5";
    CONST_VUE = "**/*.vue";
    GLOB_JAVASCRIPT = [CONST_JS, CONST_JSX];
    GLOB_TYPESCRIPT = [CONST_TS, CONST_TSX];
    [...GLOB_JAVASCRIPT, ...GLOB_TYPESCRIPT, CONST_VUE];
    GLOB_NODE = [
      "**/*.{config,setup}.{js,cjs,mjs,ts,cts,mts}",
      "**/.*rc.{js,cjs,mjs,ts,cts,mts}",
      "**/{scripts,bin}/**/*.{js,cjs,mjs,ts,cts,mts}",
      "**/{test,tests}/**/*.{js,cjs,mjs,ts,cts,mts}",
      "**/cli.{js,cjs,mjs,ts,cts,mts}"
    ];
    CONST_TSCONFIG = ["**/tsconfig.json", "**/tsconfig.*.json"];
    GLOB_JSONC_AS_JSON = [...CONST_TSCONFIG, "**/.vscode/settings.json"];
    GLOB_COMMONJS = ["**/*.cjs", "**/*.cts"];
  }
});

// src/rules/common.ts
var commonRules;
var init_common = __esm({
  "src/rules/common.ts"() {
    commonRules = {
      // 数组回调必须在所有可到达分支返回值，避免 map/filter 等调用静默产生 undefined。
      "array-callback-return": "error",
      // 浏览器弹窗通常不适合生产代码；保留为警告以兼容原型开发和已有管理页面。
      "no-alert": "warn",
      // switch 的 case 不创建词法作用域；要求用花括号包裹声明，避免跨 case 冲突。
      "no-case-declarations": "error",
      // 禁止反斜杠续行字符串，优先使用可读性更好的模板字符串。
      "no-multi-str": "error",
      // with 会让标识符解析不可预测，并且在严格模式和 ESM 中不可用。
      "no-with": "error",
      // 允许用 `void promise` 明确忽略 Promise，但禁止在普通表达式中滥用 void。
      "no-void": [
        "error",
        {
          allowAsStatement: true
        }
      ],
      // 要求严格相等；保留 `value == null` 同时判断 null/undefined 的常用写法。
      eqeqeq: ["error", "always", { null: "ignore" }],
      // 幂运算统一使用 **，减少 Math.pow 嵌套并保持现代语法风格。
      "prefer-exponentiation-operator": "error",
      // 使用 Object.hasOwn，避免对象覆盖或缺少 hasOwnProperty 时产生异常。
      "prefer-object-has-own": "error",
      // [可自动修复] 声明间顺序交给 import 插件；这里只排序同一 import 的成员。
      "sort-imports": [
        "warn",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: false
        }
      ]
    };
  }
});

// src/rules/import.ts
var importRules;
var init_import = __esm({
  "src/rules/import.ts"() {
    importRules = {
      // import 必须位于其他语句之前，避免模块依赖散落在执行逻辑中。
      "import/first": "error",
      // 合并同一模块的重复 import，避免绑定分散或副作用被误读。
      "import/no-duplicates": "error",
      // [高影响][可自动修复] 按来源分组并排序；带副作用的裸 import 只报告，移动前必须确认执行顺序。
      "import/order": [
        "error",
        {
          groups: [
            // Node.js 内置模块
            "builtin",
            // 第三方依赖
            "external",
            // 项目内部别名模块
            "internal",
            // 父级目录模块
            "parent",
            // 同级目录模块
            "sibling",
            // 当前目录入口模块
            "index",
            // TypeScript import = require() 导入
            "object",
            // TypeScript 类型导入
            "type",
            // 无法识别分类的导入
            "unknown"
          ],
          // 不同 import 分组之间必须保留一个空行
          "newlines-between": "always",
          // 同一分组内按照模块路径字母升序排列。
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          // 副作用导入参与顺序检查，但插件不会自动移动它们。
          warnOnUnassignedImports: true
        }
      ],
      // [默认关闭] Vite/TypeScript 别名由项目 resolver 校验，避免共享配置绑定特定方案。
      "import/no-unresolved": "off",
      // [默认关闭] 未配置 resolver 时，namespace 导出的静态分析容易产生误报。
      "import/namespace": "off",
      // [默认关闭] 未配置 resolver 时，默认导出的静态分析容易产生误报。
      "import/default": "off",
      // [默认关闭] 不限制同时存在默认导出与相近命名导出的模块 API 风格。
      "import/no-named-as-default": "off",
      // [默认关闭] 不限制通过默认导入对象访问同名属性的项目 API 风格。
      "import/no-named-as-default-member": "off",
      // [默认关闭] 未配置 resolver 时，命名导出的静态分析容易产生误报。
      "import/named": "off"
    };
  }
});

// src/rules/javascript.ts
var javascriptRules;
var init_javascript = __esm({
  "src/rules/javascript.ts"() {
    javascriptRules = {
      // 控制台调用在应用源码中需要人工确认；warn/error 仍可用于必要的诊断输出。
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],
      // 防止调试断点进入发布代码并中断运行。
      "no-debugger": "error",
      // 禁止意外的恒定条件，但允许 while (true) 等有明确退出逻辑的循环。
      "no-constant-condition": [
        "error",
        {
          checkLoops: false
        }
      ],
      // [高影响] 禁止标签语句；包含多层循环 labeled break/continue 的代码需先重构控制流。
      "no-restricted-syntax": ["error", "LabeledStatement"],
      // [高影响][可自动修复] 使用 let/const 替代 var；迁移时需复核循环闭包和声明提升行为。
      "no-var": "error",
      // 禁止无说明的空代码块；允许用于“忽略失败”语义的空 catch。
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true
        }
      ],
      // 拒绝肉眼难以识别、可能导致解析差异的非常规空白字符。
      "no-irregular-whitespace": "error",
      // 变量和类先声明后使用；函数声明允许提升。使用 warn 降低旧项目迁移阻力。
      "no-use-before-define": [
        "warn",
        {
          classes: true,
          functions: false,
          variables: true
        }
      ],
      // [可自动修复] 能保持引用不变的变量优先使用 const；读取先于赋值时不做不可靠判断。
      "prefer-const": [
        "warn",
        {
          destructuring: "all",
          ignoreReadBeforeAssign: true
        }
      ],
      // [高影响][可自动修复] 优先箭头回调；批量迁移后应复核 this、arguments 与函数名栈信息。
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],
      // [可自动修复] 属性和值同名时使用对象简写，带引号键名不强制改写。
      "object-shorthand": [
        "error",
        "always",
        {
          ignoreConstructors: false,
          avoidQuotes: true
        }
      ],
      // [高影响][可自动修复] 使用 ||=、&&=、??=；涉及 getter/Proxy 时应复核求值次数。
      "logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
      // [可自动修复] 合并对象时优先展开语法，避免 Object.assign 的额外目标对象样板。
      "prefer-object-spread": "error",
      // 可变参数函数优先 rest 参数，避免依赖类数组 arguments；该规则只报告，不自动改写签名。
      "prefer-rest-params": "error",
      // 调用可迭代对象时优先 spread；该规则只报告，避免自动改变 apply 的 this 语义。
      "prefer-spread": "error",
      // [可自动修复] 字符串拼接优先模板字符串，便于阅读和多段插值。
      "prefer-template": "error",
      // 同一作用域禁止重复声明，避免后声明遮盖前声明。
      "no-redeclare": "error"
    };
  }
});

// src/rules/sort-package.ts
var packageJsonSortRules;
var init_sort_package = __esm({
  "src/rules/sort-package.ts"() {
    packageJsonSortRules = {
      // [高影响][可自动修复] npm 的 files 清单按字母排序；数组顺序不改打包集合。
      "jsonc/sort-array-values": [
        "error",
        {
          order: { type: "asc" },
          pathPattern: "^files$"
        }
      ],
      // [高影响][可自动修复] 仅排序明确安全的 package.json 区域，不进入 exports 条件对象。
      "jsonc/sort-keys": [
        "error",
        // 根字段按常见阅读顺序组织，减少不同项目之间的清单噪声。
        {
          order: [
            "name",
            "version",
            "private",
            "packageManager",
            "description",
            "type",
            "keywords",
            "license",
            "homepage",
            "bugs",
            "repository",
            "author",
            "contributors",
            "funding",
            "files",
            "main",
            "module",
            "types",
            "exports",
            "typesVersions",
            "sideEffects",
            "unpkg",
            "jsdelivr",
            "browser",
            "bin",
            "man",
            "directories",
            "publishConfig",
            "scripts",
            "peerDependencies",
            "peerDependenciesMeta",
            "optionalDependencies",
            "dependencies",
            "devDependencies",
            "engines",
            "config",
            "overrides",
            "pnpm",
            "husky",
            "lint-staged",
            "eslintConfig",
            "prettier"
          ],
          pathPattern: "^$"
        },
        // 各类依赖映射按包名排序，方便发现重复或异常依赖。
        {
          order: { type: "asc" },
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
        },
        // overrides/resolutions 只排序直接键；修改前仍应关注包管理器的模式匹配语义。
        {
          order: { type: "asc" },
          pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
        }
      ]
    };
  }
});

// src/rules/sort-tsconfig.ts
var tsconfigJsonSortRules;
var init_sort_tsconfig = __esm({
  "src/rules/sort-tsconfig.ts"() {
    tsconfigJsonSortRules = {
      // tsconfig 是 JSONC，注释用于解释编译器取舍，必须保留。
      "jsonc/no-comments": "off",
      // [高影响][可自动修复] 只调整顶层和 compilerOptions 的键顺序，不改写选项值或数组。
      "jsonc/sort-keys": [
        "error",
        // 顶层按继承、选项、项目引用和文件范围的阅读顺序排列。
        {
          order: ["extends", "compilerOptions", "references", "files", "include", "exclude"],
          pathPattern: "^$"
        },
        // compilerOptions 的顺序跟随 TypeScript 文档主题，便于检索和代码审查。
        {
          order: [
            /* Projects */
            "incremental",
            "composite",
            "tsBuildInfoFile",
            "disableSourceOfProjectReferenceRedirect",
            "disableSolutionSearching",
            "disableReferencedProjectLoad",
            /* Language and Environment */
            "target",
            "jsx",
            "jsxFactory",
            "jsxFragmentFactory",
            "jsxImportSource",
            "lib",
            "moduleDetection",
            "noLib",
            "reactNamespace",
            "useDefineForClassFields",
            "emitDecoratorMetadata",
            "experimentalDecorators",
            /* Modules */
            "baseUrl",
            "rootDir",
            "rootDirs",
            "customConditions",
            "module",
            "moduleResolution",
            "moduleSuffixes",
            "noResolve",
            "paths",
            "resolveJsonModule",
            "resolvePackageJsonExports",
            "resolvePackageJsonImports",
            "typeRoots",
            "types",
            "allowArbitraryExtensions",
            "allowImportingTsExtensions",
            "allowUmdGlobalAccess",
            /* JavaScript Support */
            "allowJs",
            "checkJs",
            "maxNodeModuleJsDepth",
            /* Type Checking */
            "strict",
            "strictBindCallApply",
            "strictFunctionTypes",
            "strictNullChecks",
            "strictPropertyInitialization",
            "allowUnreachableCode",
            "allowUnusedLabels",
            "alwaysStrict",
            "exactOptionalPropertyTypes",
            "noFallthroughCasesInSwitch",
            "noImplicitAny",
            "noImplicitOverride",
            "noImplicitReturns",
            "noImplicitThis",
            "noPropertyAccessFromIndexSignature",
            "noUncheckedIndexedAccess",
            "noUnusedLocals",
            "noUnusedParameters",
            "useUnknownInCatchVariables",
            /* Emit */
            "declaration",
            "declarationDir",
            "declarationMap",
            "downlevelIteration",
            "emitBOM",
            "emitDeclarationOnly",
            "importHelpers",
            "importsNotUsedAsValues",
            "inlineSourceMap",
            "inlineSources",
            "isolatedDeclarations",
            "mapRoot",
            "newLine",
            "noEmit",
            "noEmitHelpers",
            "noEmitOnError",
            "outDir",
            "outFile",
            "preserveConstEnums",
            "preserveValueImports",
            "removeComments",
            "sourceMap",
            "sourceRoot",
            "stripInternal",
            /* Interop Constraints */
            "allowSyntheticDefaultImports",
            "esModuleInterop",
            "forceConsistentCasingInFileNames",
            "isolatedModules",
            "preserveSymlinks",
            "verbatimModuleSyntax",
            /* Completeness */
            "skipDefaultLibCheck",
            "skipLibCheck"
          ],
          pathPattern: "^compilerOptions$"
        }
      ]
    };
  }
});

// src/rules/typescript.ts
var typescriptRules;
var init_typescript = __esm({
  "src/rules/typescript.ts"() {
    typescriptRules = {
      // TypeScript 编译器负责派生类构造器校验，核心规则无法完整理解 TS 扩展语法。
      "constructor-super": "off",
      // TypeScript 的 getter 签名和抽象成员由编译器校验，避免核心规则误判。
      "getter-return": "off",
      // TypeScript 类型系统负责只读类绑定校验，核心规则不处理声明合并。
      "no-class-assign": "off",
      // TypeScript 编译器负责 const 赋值诊断，避免扩展语法节点被核心规则误判。
      "no-const-assign": "off",
      // TypeScript 函数重载由编译器校验，核心规则无法区分重载签名。
      "no-dupe-args": "off",
      // TypeScript 允许连续方法重载签名，核心规则会把它们当成重复成员。
      "no-dupe-class-members": "off",
      // TypeScript 的类型和值命名空间可能合法同名，交给编译器和 TS 插件处理。
      "no-dupe-keys": "off",
      // TypeScript 编译器负责函数绑定可写性，避免声明语法产生核心规则误报。
      "no-func-assign": "off",
      // TypeScript 编译器负责 import 绑定写入检查，并理解 import equals 等扩展语法。
      "no-import-assign": "off",
      // TypeScript 编译器负责原生构造器调用合法性，核心规则的语法模型不完整。
      "no-new-native-nonconstructor": "off",
      // TypeScript 编译器负责 Symbol 构造调用诊断，避免重复报告。
      "no-new-symbol": "off",
      // TypeScript 编译器负责内建对象调用诊断，避免重复报告。
      "no-obj-calls": "off",
      // TypeScript 编译器负责 setter 返回值约束，并能理解抽象或声明成员。
      "no-setter-return": "off",
      // TypeScript 编译器负责 super() 前 this 的使用诊断，避免扩展字段语法误报。
      "no-this-before-super": "off",
      // TypeScript 控制流分析负责不可达代码诊断，能处理 never 和类型收窄。
      "no-unreachable": "off",
      // TypeScript 编译器负责扩展运算符类型校验，避免核心规则处理 TS 节点时误判。
      "no-unsafe-negation": "off",
      // TypeScript 自己负责符号声明，核心 no-undef 无法识别类型、接口和声明合并。
      "no-undef": "off",
      // 由 TypeScript 版本接管，避免同一问题重复报告或误判声明合并。
      "no-redeclare": "off",
      // 由 TypeScript 版本接管，正确区分只存在于类型空间的符号。
      "no-unused-vars": "off",
      // 由 TypeScript 版本接管，以识别断言、非空表达式等扩展语法。
      "no-unused-expressions": "off",
      // 使用 TypeScript 版本避免误判声明合并、类型和值的同名声明。
      "@typescript-eslint/no-redeclare": "error",
      // [高影响] 未使用符号视为错误；以下划线开头可显式表示参数或变量被有意忽略。
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_"
        }
      ],
      // [默认关闭] 声明文件、全局扩展和部分 SDK 仍需要 namespace。
      "@typescript-eslint/no-namespace": "off",
      // any 会绕过类型检查，但在迁移和第三方边界中有合理用途，因此只警告。
      "@typescript-eslint/no-explicit-any": "warn",
      // [高影响] 默认要求 ESM import；CommonJS 扩展名会在专用 override 中关闭此规则。
      "@typescript-eslint/no-require-imports": "error",
      // 使用 TS 版本识别类型断言等语法；允许常见的短路和三元表达式调用模式。
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      // [可自动修复] 删除可由 TypeScript 明确推断的原始值类型标注，减少重复信息。
      "@typescript-eslint/no-inferrable-types": "error",
      // 非空断言可能隐藏空值缺陷；以警告提示逐步消除而不阻断首次迁移。
      "@typescript-eslint/no-non-null-assertion": "warn",
      // 可选链之后再做非空断言逻辑矛盾，通常表示边界条件设计有误。
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      // [高影响][可自动修复] 纯类型依赖改用内联 type import；需复核仅靠 import 触发的模块副作用。
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
          fixStyle: "inline-type-imports",
          prefer: "type-imports"
        }
      ]
    };
  }
});

// src/rules/vue.ts
var vueRules;
var init_vue = __esm({
  "src/rules/vue.ts"() {
    vueRules = {
      // [安全关注] v-html 可能引入 XSS；保留 warn 以兼容经过可靠净化的富文本场景。
      "vue/no-v-html": "warn",
      // [默认关闭] TypeScript 类型 props 和 required 声明已能表达可选性，不强制提供默认值。
      "vue/require-default-prop": "off",
      // [高影响] 组件必须声明对外事件；旧组件迁移时会暴露未建模的公共事件 API。
      "vue/require-explicit-emits": "error",
      // [默认关闭] 允许 App、Layout 等约定俗成的单词组件名。
      "vue/multi-word-component-names": "off",
      // 优先从 vue 入口导入由 Vue 重新导出的 API，避免依赖内部包边界。
      "vue/prefer-import-from-vue": "warn",
      // 防止 props、data、computed、methods 等组件命名空间出现冲突。
      "vue/no-dupe-keys": "error",
      // [高影响] 禁止组件直接修改 props，要求通过事件或本地状态维持单向数据流。
      "vue/no-mutating-props": "error",
      // 避免自定义组件名与 Vue 内置组件冲突。
      "vue/no-reserved-component-names": "error",
      // [安全关注] 禁止在组件节点上使用 v-text/v-html，避免覆盖组件内容和模糊数据边界。
      "vue/no-v-text-v-html-on-component": "error",
      // 统一模板与脚本中的自定义事件名称为 camelCase。
      "vue/custom-event-name-casing": ["error", "camelCase"],
      // [默认关闭] 允许在一个 SFC 中声明仅供当前文件使用的小型辅助组件。
      "vue/one-component-per-file": "off",
      // [高影响][可自动修复] 统一模板属性分组；首次启用可能产生大量仅排序的模板差异。
      "vue/attributes-order": [
        "error",
        {
          order: ["DEFINITION", "LIST_RENDERING", "CONDITIONALS", "RENDER_MODIFIERS", "GLOBAL", "UNIQUE", "OTHER_ATTR", "EVENTS", "CONTENT"]
        }
      ]
    };
  }
});

// src/rules/index.ts
var init_rules = __esm({
  "src/rules/index.ts"() {
    init_common();
    init_import();
    init_javascript();
    init_sort_package();
    init_sort_tsconfig();
    init_typescript();
    init_vue();
  }
});

// src/factory.ts
var defaultOptions, createRuntimeEnv, createParserOptions, createCodeExtends, createJsonExtends, createConfig, PresetVueConfig;
var init_factory = __esm({
  "src/factory.ts"() {
    init_constants();
    init_rules();
    defaultOptions = Object.freeze({
      environment: "browser",
      imports: true,
      json: true,
      markdown: true,
      prettier: true,
      regexp: true,
      typescript: true,
      vue: 3
    });
    createRuntimeEnv = (environment) => ({
      es2022: true,
      browser: environment !== "node",
      node: environment !== "browser"
    });
    createParserOptions = (options) => ({
      ecmaVersion: "latest",
      sourceType: "module",
      ...options.typeChecked ? {
        project: options.project ?? true,
        tsconfigRootDir: options.tsconfigRootDir ?? process.cwd()
      } : {}
    });
    createCodeExtends = (options, languageExtends = [], withTypeScriptImportSettings = false) => [
      "eslint:recommended",
      ...languageExtends,
      ...options.imports ? ["plugin:import/recommended", ...withTypeScriptImportSettings ? ["plugin:import/typescript"] : []] : [],
      ...options.regexp ? ["plugin:regexp/recommended"] : [],
      ...options.prettier ? ["prettier"] : []
    ];
    createJsonExtends = (dialect, prettier) => [
      `plugin:jsonc/recommended-with-${dialect}`,
      ...prettier ? ["plugin:jsonc/prettier"] : []
    ];
    createConfig = (options = {}) => {
      const resolvedOptions = { ...defaultOptions, ...options };
      const typeScriptEnabled = resolvedOptions.typescript !== false;
      const typeScriptOptions = typeof resolvedOptions.typescript === "object" ? resolvedOptions.typescript : {};
      const vueEnabled = resolvedOptions.vue !== false;
      let vueOptions = {
        ...typeScriptOptions,
        version: 3
      };
      if (typeof resolvedOptions.vue === "number") {
        vueOptions = { ...vueOptions, version: resolvedOptions.vue };
      } else if (typeof resolvedOptions.vue === "object") {
        vueOptions = { ...vueOptions, ...resolvedOptions.vue };
      }
      const sharedExtendsOptions = {
        imports: resolvedOptions.imports,
        prettier: resolvedOptions.prettier,
        regexp: resolvedOptions.regexp
      };
      const runtimeEnv = createRuntimeEnv(resolvedOptions.environment);
      const overrides = [];
      overrides.push({
        files: [...GLOB_JAVASCRIPT],
        extends: createCodeExtends(sharedExtendsOptions),
        env: runtimeEnv,
        parserOptions: {
          ecmaVersion: "latest",
          ecmaFeatures: { jsx: true },
          sourceType: "module"
        },
        rules: {
          ...commonRules,
          ...javascriptRules,
          ...resolvedOptions.imports ? importRules : {}
        }
      });
      if (typeScriptEnabled) {
        const typeScriptExtends = [
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/stylistic",
          ...typeScriptOptions.typeChecked ? ["plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"] : []
        ];
        overrides.push({
          files: [...GLOB_TYPESCRIPT],
          extends: createCodeExtends(sharedExtendsOptions, typeScriptExtends, true),
          env: runtimeEnv,
          parser: "@typescript-eslint/parser",
          parserOptions: {
            ...createParserOptions(typeScriptOptions),
            ecmaFeatures: { jsx: true }
          },
          rules: {
            ...commonRules,
            ...javascriptRules,
            ...resolvedOptions.imports ? importRules : {},
            ...typescriptRules
          }
        });
      }
      if (vueEnabled) {
        const vueVersion = vueOptions.version ?? 3;
        const vueExtends = [
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/stylistic",
          ...vueOptions.typeChecked ? ["plugin:@typescript-eslint/recommended-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"] : [],
          vueVersion === 3 ? "plugin:vue/recommended" : "plugin:vue/vue2-recommended"
        ];
        overrides.push({
          files: [CONST_VUE],
          extends: createCodeExtends(sharedExtendsOptions, vueExtends, true),
          env: runtimeEnv,
          parser: "vue-eslint-parser",
          parserOptions: {
            ...createParserOptions(vueOptions),
            parser: "@typescript-eslint/parser",
            extraFileExtensions: [".vue"],
            ecmaFeatures: { jsx: true }
          },
          rules: {
            ...commonRules,
            ...javascriptRules,
            ...resolvedOptions.imports ? importRules : {},
            ...typescriptRules,
            ...vueRules
          }
        });
      }
      if (resolvedOptions.json) {
        overrides.push({
          files: [CONST_JSON],
          excludedFiles: [...GLOB_JSONC_AS_JSON],
          extends: createJsonExtends("json", resolvedOptions.prettier)
        });
        overrides.push({
          files: [CONST_JSONC],
          extends: createJsonExtends("jsonc", resolvedOptions.prettier)
        });
        overrides.push({
          files: [CONST_JSON5],
          extends: createJsonExtends("json5", resolvedOptions.prettier)
        });
        overrides.push({
          files: ["**/.vscode/settings.json"],
          extends: createJsonExtends("jsonc", resolvedOptions.prettier)
        });
        overrides.push({
          files: ["**/package.json"],
          rules: packageJsonSortRules
        });
        overrides.push({
          files: [...CONST_TSCONFIG],
          extends: createJsonExtends("jsonc", resolvedOptions.prettier),
          rules: tsconfigJsonSortRules
        });
      }
      if (typeScriptEnabled) {
        overrides.push({
          files: [CONST_DTS],
          rules: {
            "@typescript-eslint/consistent-type-imports": "off",
            "@typescript-eslint/no-unused-vars": "off"
          }
        });
      }
      overrides.push({
        files: [...GLOB_COMMONJS],
        rules: {
          "@typescript-eslint/no-require-imports": "off"
        }
      });
      overrides.push({
        files: [...GLOB_NODE],
        env: {
          es2022: true,
          browser: false,
          node: true
        },
        rules: {
          "no-console": "off"
        }
      });
      if (resolvedOptions.markdown) {
        overrides.push({
          files: ["**/*.md/**"],
          rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "import/no-duplicates": "off",
            "import/no-unresolved": "off",
            "no-console": "off",
            "no-undef": "off"
          }
        });
      }
      return {
        ...resolvedOptions.markdown ? { extends: ["plugin:markdown/recommended"] } : {},
        reportUnusedDisableDirectives: true,
        overrides
      };
    };
    createConfig({
      json: false,
      markdown: false,
      typescript: false,
      vue: false
    });
    createConfig({
      json: false,
      markdown: false,
      vue: false
    });
    createConfig({ markdown: false, vue: false });
    createConfig({ environment: "node", vue: false });
    createConfig({ vue: 2 });
    PresetVueConfig = createConfig();
  }
});

// src/index.ts
var require_src = __commonJS({
  "src/index.ts"(exports, module) {
    init_factory();
    module.exports = PresetVueConfig;
  }
});
var index = require_src();

module.exports = index;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map