# 工程质量审查报告

审查日期：2026-08-02

审查对象：`@fast-china/eslint-config-legacy` 2.0.3

对照项目：同级 `Fast.ESLint.Config` 2.0.4（ESLint 10 Flat Config）

## 结论

仓库采用与 Flat Config 项目一致的模块边界，同时保留 ESLint 8 Legacy Config 的同步加载约束：

- 包根是唯一合并配置，面向 Vue 3、TypeScript、Vite 浏览器管理项目。
- 顶层细粒度子路径均可直接写入 Legacy `extends`；`/vue` 对应 Vue 3，`/vue2` 对应 Vue 2。
- `/configs` 提供全部可复用配置片段创建器，并保留 Vue 2 与 Vue 3 支持。
- `/constants` 与 `/rules` 分别提供文件匹配常量和本地规则记录。
- 不存在 presets 目录、预置分发器、`createPreset`、`createLegacyConfig` 或 core 中间层。
- `defineRules` 直接合并在 `src/rules/index.ts`，避免为单个辅助函数保留独立模块。
- TypeScript 6 与 tsdown 生成 ESLint 8 可同步加载的 CommonJS 入口、`export =` 声明及 source map。
- pnpm 11 是唯一包管理流程；CI 使用 Node.js 22.18.0 与 24.18.0。

## 源码边界

```text
src/
├─ index.ts        唯一合并配置
├─ configs/        按领域聚合的默认配置、创建器及编程入口
├─ constants/      公开文件匹配常量
├─ rules/          本地规则记录、defineRules 及统一出口
└─ typegen.d.ts    生成的规则名与规则记录类型
```

依赖方向固定为 `index -> configs -> rules/constants`：

- `src/index.ts` 直接组合 Vue Web 管理项目默认能力。
- `src/configs/<name>/index.ts` 均为单一默认导出，使 CommonJS `require()` 可直接得到 Legacy 配置对象。
- 同目录 `factory.ts` 负责 parser、plugin、processor、env、extends 与 override 创建，并由 `/configs` 统一导出。
- `src/rules/*.ts` 只保存带采用原因和风险标记的规则记录。
- `src/typegen.d.ts` 由 `pnpm typegen` 生成。

## 公共 API

| 入口         | 用途                                              |
| ------------ | ------------------------------------------------- |
| 包根         | 可直接写入 `.eslintrc.cjs#extends` 的唯一合并配置 |
| 顶层子路径   | 可直接写入 `extends` 的语言、框架、环境和策略配置 |
| `/configs`   | 按需组合语言、框架、文件格式、环境和策略配置片段  |
| `/constants` | 文件 glob 常量                                    |
| `/rules`     | `RuleOptions` 与按语言、框架拆分的本地规则记录    |

Vue 2 不进入根配置，但可通过 `/vue2` 或 `createVueConfigs({ version: 2 })` 启用；`/vue` 与 `version: 3` 对应 Vue 3。

## 配置正确性

| 范围       | 当前实现                                               | 验证重点                                 |
| ---------- | ------------------------------------------------------ | ---------------------------------------- |
| JavaScript | `eslint:recommended` 与本地现代语法规则                | JSX、ESM/CJS、Node 工程文件 globals      |
| TypeScript | typescript-eslint recommended/stylistic 与核心替代规则 | TS/TSX、声明文件、CommonJS 扩展名        |
| Vue 2/3    | 版本参数选择上游预置与 `vue-eslint-parser`             | 模板、TS script、版本专属 emits 规则     |
| React      | React、Hooks、JSX accessibility 与 TS props            | 自动 JSX runtime、Hooks、DOM 安全        |
| Angular    | TypeScript、外部模板和内联模板 processor               | 模板 accessibility 与 OnPush             |
| Node.js    | 环境配置片段与 Node globals                            | browser globals 不泄漏、无额外 Node 插件 |
| 数据文件   | JSON 方言、YAML 和 Markdown processor                  | tsconfig/VS Code JSONC、代码块虚拟文件   |
| 类型感知   | Project Service 配置片段                               | 最近 tsconfig、TS 与 Vue 双 parser 链    |
| 排序       | package 与 tsconfig 按需配置片段                       | 条件导出键顺序保持不变                   |

## 构建与质量门禁

- `pnpm-lock.yaml` 是唯一依赖锁文件。
- `engines.pnpm` 约束 pnpm 11，不固定补丁版本。
- tsdown 以 Node 22 为输出目标，配置入口使用 CommonJS。
- `unbundle` 保留 configs、constants 与 rules 模块结构。
- `publint` 和 Are the Types Wrong 检查 package exports、CommonJS 解析与声明契约。

```sh
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

测试按职责分层：`integration` 使用真实 ESLint 覆盖 Legacy `extends`、Vue 2/3、框架、parser/processor、环境 globals、类型感知与自动修复，`contracts` 验证源码边界及发布入口，`types` 编译真实消费者导入。

## 已知边界

- ESLint 8 已停止功能演进；ESLint 9 不属于本包支持范围，ESLint 10 Flat Config 由 `@fast-china/eslint-config` 提供。
- 部分插件新主版本不再接受 ESLint 8 或只提供 ESM，依赖版本必须遵循兼容矩阵。
- 类型感知文件必须属于 Project Service 可发现的 tsconfig；复杂 monorepo 应显式配置 `tsconfigRootDir`。
