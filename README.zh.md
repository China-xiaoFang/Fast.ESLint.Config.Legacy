**中文** | [English](./README.md)

# @fast-china/eslint-config-legacy

面向 ESLint 8 `.eslintrc` 生态的生产级共享配置。提供 Vue 2、Vue 3、React、Angular、Node.js、TypeScript、JavaScript、JSON、YAML、Markdown、Promise、RegExp 与 import 规则。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## 版本定位

当前 2.x 发布线只维护 ESLint 8.57 Legacy Config。ESLint 9 不在支持范围内；ESLint 10 项目请使用 [`@fast-china/eslint-config`](https://www.npmjs.com/package/@fast-china/eslint-config)。

| ESLint | 配置包                             | 配置格式            |
| ------ | ---------------------------------- | ------------------- |
| 8.57   | `@fast-china/eslint-config-legacy` | `.eslintrc.cjs`     |
| 9      | 不支持                             | —                   |
| 10     | `@fast-china/eslint-config`        | `eslint.config.mjs` |

## 架构设计

- 公共 API 只有明确的 `extends` 子路径；不提供含义模糊的包根配置或运行时配置工厂。
- `src/configs` 负责创建配置，`src/rules` 只提供本地规则记录，`src/core/index.ts` 组合确定性预置，`src/presets` 保存公开入口。
- 每个完整预置通过 Legacy `overrides` 隔离 JavaScript、TypeScript、框架模板与数据文件。
- Node.js 使用独立 `/node` 完整预置；browser 预置中的构建配置文件仍会获得窄范围 Node globals。
- 类型感知通过可叠加的 `/type-aware` 预置保留，并使用 typescript-eslint Project Service。
- Prettier 独立执行；ESLint 只关闭格式冲突规则。
- 从 ESLint 8 与随包插件生成精确规则名类型。
- TypeScript 6 与 tsdown 输出可被 ESLint 8 直接 `require()` 的 CommonJS 配置、`export =` 声明和 source map。

## 环境要求

- Node.js `^22.18.0 || >=24.11.0`
- 仓库开发使用 pnpm `^11.0.0`
- ESLint `^8.57.0`
- TypeScript `>=4.8.4 <6.1.0`

CI 与 Flat Config 项目使用相同的 Node.js 22.18.0、24.11.0 矩阵。发布包仍可由 pnpm、npm、Yarn 或 Bun 安装；pnpm 是本仓库唯一的锁文件和开发流程基准。

## 安装

```sh
pnpm add -D eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

插件与解析器都是本包的直接依赖。

## 完整预置

每个完整预置都可以作为 `.eslintrc.cjs` 中唯一的共享配置入口。

| extends 名称                                  | 适用项目                                     |
| --------------------------------------------- | -------------------------------------------- |
| `@fast-china/eslint-config-legacy/base`       | 无框架 JS + TS + 数据文件 + Markdown         |
| `@fast-china/eslint-config-legacy/javascript` | JavaScript 与 JSX                            |
| `@fast-china/eslint-config-legacy/typescript` | JavaScript + TypeScript 与 TSX               |
| `@fast-china/eslint-config-legacy/node`       | Node.js + JavaScript + TypeScript + 数据文件 |
| `@fast-china/eslint-config-legacy/vue2`       | Vue 2 + TypeScript + Vite/Webpack            |
| `@fast-china/eslint-config-legacy/vue3`       | Vue 3 + TypeScript + Vite                    |
| `@fast-china/eslint-config-legacy/react`      | React + TypeScript + Hooks + JSX 无障碍      |
| `@fast-china/eslint-config-legacy/angular`    | Angular TS + 内联/外部模板                   |

每个子路径都直接导出配置对象，ESLint 8 不需要访问 `.default`。

### Vue 3

```js
// .eslintrc.cjs
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/vue3"],
};
```

Vue 2、React、Angular 分别替换为 `/vue2`、`/react`、`/angular`。Angular 项目执行 ESLint 时应包含 `.html`，以检查外部模板。

### Node.js

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/node"],
};
```

Node 预置提供 Node globals，但不会强制引入单独的 Node 规则插件。

## 可叠加预置

可叠加预置必须放在一个完整预置之后。

| extends 名称                                      | 用途                                            |
| ------------------------------------------------- | ----------------------------------------------- |
| `@fast-china/eslint-config-legacy/type-aware`     | 类型感知 TS、TSX、Angular TS 与 Vue script 检查 |
| `@fast-china/eslint-config-legacy/sort-package`   | 安全整理 `package.json`                         |
| `@fast-china/eslint-config-legacy/sort-tsconfig`  | 按 TypeScript 文档主题整理 `tsconfig*.json`     |
| `@fast-china/eslint-config-legacy/lodash`         | 统一使用 `lodash` 包入口                        |
| `@fast-china/eslint-config-legacy/lodash-unified` | 统一使用 `lodash-unified` 包入口                |

### 类型感知

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/vue3", "@fast-china/eslint-config-legacy/type-aware"],
};
```

`/type-aware` 为 TypeScript 与 Vue 文件启用 `recommended-type-checked`、`stylistic-type-checked` 和 Project Service。被检查文件必须属于可发现的 tsconfig；复杂 monorepo 可以在项目自己的 override 中补充 `parserOptions.tsconfigRootDir`。

### 按需排序

```js
module.exports = {
	root: true,
	extends: [
		"@fast-china/eslint-config-legacy/base",
		"@fast-china/eslint-config-legacy/sort-package",
		"@fast-china/eslint-config-legacy/sort-tsconfig",
	],
};
```

排序保持按需启用，因为首次自动修复可能产生较大差异。`package.json#exports` 内具有语义的条件键永远不会被重排。

## 类型安全的项目规则

```ts
import { type RuleOptions, defineRules } from "@fast-china/eslint-config-legacy/rules";

const rules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"jsx-a11y/alt-text": "error",
	"react-hooks/rules-of-hooks": "error",
	"vue/attributes-order": "error",
	"yml/no-empty-document": "error",
});

const reusableRules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
} satisfies RuleOptions;
```

项目专属规则直接写在消费项目 `.eslintrc` 的 `rules` 或 `overrides` 中。仅由消费项目安装的插件规则不属于本包生成的类型范围。

## 高影响默认规则

启用预置或执行 `eslint --fix` 前，请阅读[默认规则与高影响风险](./docs/rules-risk.zh.md)。其中标记了高影响框架规则、大范围自动修复、上游推荐集和按需策略。

所有本地规则都有原因注释；`[高影响]`、`[可自动修复]`、`[安全关注]`、`[默认关闭]`、`[按需启用]` 表示需要特别关注的决策。

## 开发与发布检查

```sh
pnpm install
pnpm typegen
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

更多信息见[工程审查报告](./docs/engineering-audit.zh.md)、[依赖兼容矩阵](./docs/dependency-compatibility.zh.md)、[变更日志](./CHANGELOG.md)、[贡献指南](./CONTRIBUTING.md)与[安全策略](./SECURITY.md)。

## License

[Apache-2.0](./LICENSE)
