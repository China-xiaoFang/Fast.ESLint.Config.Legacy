# 依赖版本与兼容性矩阵

核对日期：2026-08-02。版本来源为 registry，并与同级 `Fast.ESLint.Config` 2.0.5 的依赖策略交叉核对。

本库选择“仍能由 ESLint 8.57 Legacy Config 通过 CommonJS 加载的最新版”，而不是强行追随不兼容的最高主版本。

## 兼容边界

| 层级           | 版本范围                                  | 说明                                        |
| -------------- | ----------------------------------------- | ------------------------------------------- |
| 运行时 Node.js | `^22.18.0 \|\| ^24.18.0`                  | 与 Flat Config 项目维护中的版本矩阵一致     |
| CI Node.js     | 22.18.0、24.18.0                          | 共享质量矩阵，暂不测试 Node 26              |
| ESLint         | `^8.57.0`                                 | 本包唯一 lint 引擎产品边界                  |
| TypeScript     | `^4.0.0 \|\| ^5.0.0 \|\| ^6.0.0`          | 对外声明的 TypeScript 兼容范围              |
| 构建工具       | TypeScript 6.0.3、tsdown 0.22.14、pnpm 11 | tsdown 输出 Node 22；锁文件固定精确依赖版本 |

本包主动采用与 `@fast-china/eslint-config` 一致的受维护 Node 基线。兼容 ESLint 8 表示兼容 Legacy Config 格式，不再同时承诺已停止维护的 Node 版本。

## 包管理器结论

本仓库使用 pnpm 11：

- `pnpm-lock.yaml` 是唯一依赖锁文件。
- `pnpm-workspace.yaml#allowBuilds` 记录经过审查的依赖构建脚本。
- CI 使用 `pnpm/action-setup` 和冻结锁文件，与 Flat Config 项目保持一致。
- 发布包与包管理器无关，消费者仍可使用 pnpm、npm、Yarn 或 Bun。

清单只通过 `engines.pnpm` 约束 pnpm 11，不固定 `packageManager` 补丁版本。

## 当前最新版

以下直接依赖已位于核对日的 npm 最新版：

| 依赖                               | 版本    | 用途                                        |
| ---------------------------------- | ------- | ------------------------------------------- |
| `@typescript-eslint/eslint-plugin` | 8.65.0  | TypeScript 规则，仍支持 ESLint 8 与 TS 6.0  |
| `@typescript-eslint/parser`        | 8.65.0  | TypeScript/Vue script 解析                  |
| `eslint-config-prettier`           | 10.1.8  | 关闭格式冲突                                |
| `eslint-plugin-import-x`           | 4.17.1  | Legacy Config/CommonJS 可加载的 import 规则 |
| `eslint-plugin-jsx-a11y`           | 6.10.2  | React JSX accessibility                     |
| `eslint-plugin-markdown`           | 5.1.0   | ESLint 8 的 `recommended-legacy` processor  |
| `eslint-plugin-promise`            | 7.3.0   | Promise 推荐规则                            |
| `eslint-plugin-react`              | 7.37.5  | React Legacy 推荐规则                       |
| `eslint-plugin-react-hooks`        | 7.1.1   | Hooks 与 React Compiler 规则                |
| `eslint-plugin-vue`                | 10.10.0 | Vue 2/3 Legacy Config                       |
| `vue-eslint-parser`                | 10.4.1  | Vue SFC parser                              |
| `@arethetypeswrong/core`           | 0.18.5  | 发布类型解析检查                            |
| `prettier`                         | 3.9.6   | 仓库格式检查                                |
| `publint`                          | 0.3.22  | npm 包结构检查                              |
| `react`                            | 19.2.8  | React 消费测试                              |
| `tsdown`                           | 0.22.14 | CommonJS 多入口与声明构建                   |

`@types/node` 使用 Node 24 类型线，与当前 CI 和开发基线一致；tsdown 仍以 Node 22 作为语法输出目标。

## 有意停留在 ESLint 8 兼容线

| 依赖                                     | 当前    | npm 最新 | 保留原因                                        |
| ---------------------------------------- | ------- | -------- | ----------------------------------------------- |
| `@angular-eslint/eslint-plugin`          | 21.4.0  | 22.1.0   | 22.x peer 只接受 ESLint 9/10                    |
| `@angular-eslint/eslint-plugin-template` | 21.4.0  | 22.1.0   | 与 Angular ESLint 21 兼容线保持一致             |
| `@angular-eslint/template-parser`        | 21.4.0  | 22.1.0   | 与 Angular ESLint 21 兼容线保持一致             |
| `eslint-plugin-jsonc`                    | 2.21.1  | 3.3.0    | 3.x 要求 ESLint 9.38+ 且只导出 ESM              |
| `eslint-plugin-regexp`                   | 2.10.0  | 3.1.1    | 3.x 要求 ESLint 9.38+                           |
| `eslint-plugin-yml`                      | 1.19.1  | 3.7.0    | 3.x 要求 ESLint 9.38+ 且只导出 ESM              |
| `jsonc-eslint-parser`                    | 2.4.2   | 3.1.0    | 3.x 只导出 ESM，不能作为 Legacy parser 同步加载 |
| `yaml-eslint-parser`                     | 1.3.2   | 2.1.0    | 2.x 只导出 ESM，不能作为 Legacy parser 同步加载 |
| `eslint`                                 | 8.57.1  | 10.8.0   | 本包只提供 ESLint 8.57 `.eslintrc`              |
| `@types/eslint`                          | 8.56.12 | 9.6.1    | 声明必须描述 ESLint 8 API                       |
| `@types/node`                            | 24.13.3 | 26.x     | 类型基线跟随受维护的开发环境                    |
| `typescript`                             | 6.0.3   | 7.0.2    | typescript-eslint 8.65 peer 上限是 `<6.1.0`     |

`eslint-plugin-markdown` 5.1.0 已被上游标记为 deprecated，但替代包面向新版 ESLint 配置模型。本包仍需 ESLint 8 Legacy Config 的 `recommended-legacy`，因此继续保留其最终版本。

## Resolver 与构建脚本边界

与 Fast.ESLint.Config 一致，本包只继承 `plugin:import-x/recommended`：不猜测消费项目的 TypeScript/Vite 别名解析方案，resolver 强相关规则继续默认关闭。

`unrs-resolver` 仍由 import-x 的内部解析链传递引入，并包含标准平台绑定选择脚本。pnpm 通过已审查的 `allowBuilds` 清单放行；升级 import-x 时必须重新检查解析版本与脚本来源。

## 升级与验证

```sh
pnpm typegen
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

`pnpm outdated` 出现上表中的兼容锁是预期结果。不得使用 `--force`、peer override 或自动主版本升级来追求“零 outdated”。
