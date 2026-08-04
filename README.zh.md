<p align="left">
	<strong>简体中文</strong> | <a href="./README.md">English</a>
</p>

<p align="center">
	<img src="./Fast.png" alt="logo" width="160" />
</p>

# @fast-china/eslint-config-legacy

面向 Vue Web 浏览器管理项目的生产级 ESLint 8 `.eslintrc` 配置。可复用创建器同时支持 Vue 2/3、React、Angular、Node.js、TypeScript、JavaScript、JSON、YAML、Markdown、Promise、RegExp 与 import 规则。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy) [![Node.js](https://img.shields.io/badge/node-%5E22.18%20%7C%7C%20%5E24.18-brightgreen)](https://nodejs.org/) [![ESLint](https://img.shields.io/badge/eslint-%5E8.57-4b32c3)](https://eslint.org/) [![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## 版本定位

包提供一个合并配置入口、可直接继承的细粒度配置和三个编程入口：

- 包根：面向 Vue 3、TypeScript、Vite 浏览器后台管理项目。
- `/typescript`、`/vue`、`/vue2` 等顶层子路径：可直接写入 `extends` 的细粒度配置。
- `/configs`：可复用 Legacy Config 配置片段创建器，保留 Vue 2 与 Vue 3。
- `/constants`：共享文件 glob。
- `/rules`：带类型的本地规则记录与 `RuleOptions`。

项目不再包含 presets 目录或预置分发器。每个 `src/configs/<name>/index.ts` 都是可直接加载的默认 Legacy 配置，可复用创建器就近放在同目录的 `factory.ts` 中；`src/index.ts` 使用这些创建器组合包根配置。

## 环境要求

- Node.js `^22.18.0 || ^24.18.0`
- 仓库开发使用 pnpm `^11.0.0`
- ESLint `^8.57.0`
- TypeScript `^4.0.0 || ^5.0.0 || ^6.0.0`

## 安装

```sh
pnpm add -D eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

插件与解析器都是本包的直接依赖。

## 默认配置

```js
// .eslintrc.cjs
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
};
```

根入口默认启用 browser globals、JavaScript、TypeScript、Vue 3、import-x、Promise、RegExp、JSON 方言、YAML、Markdown、CommonJS/工程文件兼容与 Prettier 冲突处理。

## 细粒度 extends

每个细粒度配置都可以直接继承：

```js
module.exports = {
	root: true,
	extends: [
		"@fast-china/eslint-config-legacy/common",
		"@fast-china/eslint-config-legacy/javascript",
		"@fast-china/eslint-config-legacy/typescript",
		"@fast-china/eslint-config-legacy/vue2",
		"@fast-china/eslint-config-legacy/prettier",
	],
};
```

可用名称包括 `/angular`、`/common`、`/commonjs`、`/environment`、`/import`、`/javascript`、`/json`、`/lodash`、`/lodash-unified`、`/markdown`、`/node`、`/prettier`、`/promise`、`/react`、`/regexp`、`/sort-package`、`/sort-tsconfig`、`/type-aware`、`/typescript`、`/vue`、`/vue2` 与 `/yaml`。

`/vue` 默认是 Vue 3，`/vue2` 是单独的 Vue 2 配置。

## 可复用配置片段

需要其他组合时，从 `/configs` 导入创建器：

```js
const {
	createCommonConfigs,
	createEnvironmentConfigs,
	createJavaScriptConfigs,
	createTypeScriptConfigs,
	createVueConfigs,
} = require("@fast-china/eslint-config-legacy/configs");
const { GLOBS_CODE } = require("@fast-china/eslint-config-legacy/constants");

module.exports = {
	root: true,
	overrides: [
		...createEnvironmentConfigs({ environment: "browser", files: GLOBS_CODE }),
		...createCommonConfigs(GLOBS_CODE),
		...createJavaScriptConfigs(),
		...createTypeScriptConfigs(),
		...createVueConfigs({ version: 2 }),
	],
};
```

Vue 3 使用 `createVueConfigs({ version: 3 })`。React、Angular、类型感知 TypeScript、排序、Lodash 导入策略、JSON、YAML、Markdown、Promise、RegExp、import 与 Prettier 创建器都由同一个 `/configs` 入口导出。

`createMarkdownConfigs()` 会分别返回根级 `extends` 与代码块 `overrides`，手动组合时必须同时保留。

## 类型安全的项目规则

```ts
import { type RuleOptions, defineRules } from "@fast-china/eslint-config-legacy/rules";

const rules = defineRules({
	"@typescript-eslint/no-unused-vars": "error",
	"vue/attributes-order": "error",
});

const reusableRules = {
	"no-console": "warn",
} satisfies RuleOptions;
```

`defineRules` 的实现直接位于 `src/rules/index.ts`，不再保留单独的辅助模块。

## 文档

- [依赖兼容矩阵](./docs/dependency-compatibility.zh.md)
- [默认规则与风险指南](./docs/rules-risk.zh.md)
- [工程质量审查报告](./docs/engineering-audit.zh.md)
- [贡献指南](./CONTRIBUTING.md)
- [安全策略](./SECURITY.md)
- [更新日志](./CHANGELOG.md)

## 开发与发布检查

```sh
pnpm install --frozen-lockfile
pnpm typegen
pnpm check
pnpm --config.ignore-scripts=true pack --dry-run
```

修改源码时可使用 `pnpm dev` 启动长期运行的 tsdown 监听构建。

测试按照验证目标分为消费者类型、运行时配置和包契约。`pnpm test` 会先构建，再依次运行三组测试。

## 许可证

[Apache-2.0](./LICENSE)
