# 工程质量审查报告

审查日期：2026-07-29

审查对象：`@fast-china/eslint-config-legacy` 2.0.0

对照项目：同级 `Fast.ESLint.Config` 2.0.1（ESLint 10 Flat Config）

## 结论

仓库具备独立开发、测试、构建和发布 ESLint 8.57 Legacy Config 预置所需的完整工程边界：

- 公共配置 API 仅由明确的 `extends` 子路径组成，包根不导出含义不确定的默认配置或动态工厂。
- 完整预置覆盖 JavaScript、TypeScript、Node.js、Vue 2、Vue 3、React 与 Angular。
- `/type-aware` 通过 typescript-eslint Project Service 为 TypeScript、TSX、Angular TypeScript 与 Vue script 提供类型感知检查。
- JSON、JSONC、JSON5、YAML、Markdown、Promise、RegExp、import-x 与 Prettier 兼容层均按文件范围隔离。
- TypeScript 6 与 tsdown 生成 ESLint 8 可同步加载的 CommonJS 入口、`export =` 声明以及声明和运行时 source map。
- pnpm 11 是仓库唯一包管理流程；CI 使用 Node.js 22.18.0 与 24.11.0。

ESLint 9 不属于本包支持范围；ESLint 10 Flat Config 由 `@fast-china/eslint-config` 提供。

## 源码边界

```text
src/
├─ configs/       ESLint 配置片段创建器
├─ constants/     内部文件匹配常量
├─ core/index.ts  静态预置组合入口
├─ define-rules.ts 类型安全规则记录辅助函数
├─ presets/       公开 extends 子路径入口
├─ rules/         本地规则记录及 /rules 公共入口
└─ typegen.d.ts   生成的规则名与规则记录类型
```

依赖方向固定为 `presets -> core -> configs -> rules/constants`：

- `src/presets/*.ts` 每个文件只对应一个公开配置子路径。
- `src/core/index.ts` 维护完整预置定义和叠加预置分发，不属于 package exports。
- `src/configs/*.ts` 负责 parser、plugin、processor、env、extends 与 override 创建。
- `src/rules/*.ts` 只保存带采用原因和风险标记的规则记录。
- `src/typegen.d.ts` 由 `pnpm typegen` 生成，规则模块统一从 `../typegen` 引用。

## 公共 API

### 完整预置

`/base`、`/javascript`、`/typescript`、`/node`、`/vue2`、`/vue3`、`/react`、`/angular`

每个完整预置都可独立写入 `.eslintrc.cjs#extends`，并直接导出 `Linter.Config`，无需访问 `.default`。

### 叠加预置

`/type-aware`、`/sort-package`、`/sort-tsconfig`、`/lodash`、`/lodash-unified`

叠加预置应位于完整预置之后，只增加一种明确能力，不复制完整语言或框架配置。

### 规则 API

`/rules` 导出：

- `defineRules()`：在不改变对象引用和运行时值的前提下提供规则名类型检查。
- `RuleName` 与 `RuleOptions`：覆盖 ESLint 8 核心规则及本包直接提供的插件规则。
- 按语言和框架拆分的本地规则记录，用于高级组合与审查。

## 配置正确性

| 范围       | 当前实现                                               | 验证重点                                 |
| ---------- | ------------------------------------------------------ | ---------------------------------------- |
| JavaScript | `eslint:recommended` 与本地现代语法规则                | JSX、ESM/CJS、Node 工程文件 globals      |
| TypeScript | typescript-eslint recommended/stylistic 与核心替代规则 | TS/TSX、声明文件、CommonJS 扩展名        |
| Vue 2/3    | 独立上游预置与 `vue-eslint-parser`                     | 模板、TS script、框架专属 emits 规则     |
| React      | React、Hooks、JSX accessibility 与 TS props            | 自动 JSX runtime、Hooks、DOM 安全        |
| Angular    | TypeScript、外部模板和内联模板 processor               | 模板 accessibility 与 OnPush             |
| Node.js    | 独立完整预置和 Node globals                            | browser globals 不泄漏、无额外 Node 插件 |
| 数据文件   | JSON 方言、YAML 和 Markdown processor                  | tsconfig/VS Code JSONC、代码块虚拟文件   |
| 类型感知   | Project Service 叠加预置                               | 最近 tsconfig、TS 与 Vue 双 parser 链    |
| 排序       | package 与 tsconfig 显式叠加预置                       | 条件导出键顺序保持不变                   |

## 规则治理

- 每条本地规则都必须说明采用原因、行为边界和重要例外。
- `[高影响]`、`[可自动修复]`、`[安全关注]`、`[默认关闭]`、`[按需启用]` 使用统一语义。
- 高影响默认规则必须同时出现在中英文风险文档和集成测试中。
- 标记为可自动修复的规则必须与当前插件 `meta.fixable` 元数据一致。
- resolver 相关 import 规则默认关闭，避免共享配置猜测消费项目别名。
- package 排序不得进入 `exports` 条件对象等键顺序具有语义的结构。

## 构建与包管理

- `pnpm-lock.yaml` 是唯一依赖锁文件。
- `pnpm-workspace.yaml#allowBuilds` 只允许经过审查的 `esbuild` 和 `unrs-resolver` 构建脚本。
- `engines.pnpm` 约束 pnpm 11，不固定补丁版本。
- tsdown 以 Node 22 为输出目标，所有配置入口使用 CommonJS。
- `publint` 和 Are the Types Wrong 检查 package exports、CommonJS 解析与声明契约。
- 发布清单包含声明映射引用的 TypeScript 源码，不包含包根 SDK 或动态工厂入口。

## 质量门禁

```sh
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

`pnpm check` 依次执行：

1. 生成规则类型漂移检查。
2. tsdown 构建、publint 与 Are the Types Wrong。
3. TypeScript 严格类型检查。
4. ESLint 与 Prettier 检查。
5. 消费者声明测试与运行时集成测试。

运行时测试覆盖公开导出、Legacy `extends` 解析、语言与框架边界、parser/processor、环境 globals、类型感知、自动修复安全、规则注释和发布文件完整性。

## 已知边界

- ESLint 8 已停止功能演进；依赖安全公告按照 `SECURITY.md` 的明确例外处理，其他公告必须阻断检查。
- Angular ESLint 22、JSONC/RegExp/YAML 的新主版本以及部分 parser 已不接受 ESLint 8 或只提供 ESM，依赖版本必须遵循兼容矩阵。
- 类型感知文件必须属于 Project Service 可发现的 tsconfig；复杂 monorepo 应在项目 override 中配置 `tsconfigRootDir`。
- 自动发布需要单独确定 trusted publishing、分支保护与维护者审批策略。
