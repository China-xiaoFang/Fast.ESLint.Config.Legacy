**中文** | [English](./README.md)

# @fast-china/eslint-config-legacy

面向 Vue 3、Vite、TypeScript 与 JavaScript 项目的 ESLint 8 `.eslintrc` 共享配置。

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## 版本定位

本包只维护 ESLint 8.57 的 Legacy Config，适用于仍使用 `.eslintrc.cjs` 的项目。ESLint 9 是 Flat Config 迁移期，不在本包支持范围；ESLint 10 项目请使用 [`@fast-china/eslint-config`](https://www.npmjs.com/package/@fast-china/eslint-config)。

| ESLint 主版本 | 推荐包                             | 配置格式            |
| ------------- | ---------------------------------- | ------------------- |
| 8.57          | `@fast-china/eslint-config-legacy` | `.eslintrc.cjs`     |
| 9             | 不提供兼容承诺                     | 迁移到 Flat Config  |
| 10            | `@fast-china/eslint-config`        | `eslint.config.mjs` |

## 特性

- Vue 3 + Vite + TypeScript 是明确默认值，不再根据当前目录猜测 Vue 版本。
- JavaScript、TypeScript、Vue SFC、JSON、JSONC、JSON5、Markdown、RegExp 与 import 规则按文件类型隔离。
- 提供 `createConfig()`，可选择 browser、Node.js、universal、纯 JavaScript、Vue 2 或类型感知模式。
- Vite 配置、脚本、测试和 CLI 自动获得 Node.js globals；浏览器源码不会因此隐藏 `process` 等未声明变量。
- Prettier 只负责格式化；本包仅关闭冲突规则，不在 ESLint 内重复运行 Prettier。
- 生成 bundled 核心与插件规则名类型，`defineRules()` 可以补全已知规则并拒绝拼错的名称。
- 提供运行时、类型、自动修复、规则文档、发布入口和 Node 多版本 CI 测试。

## 环境要求

- Node.js `^18.18.0`、`^20.9.0` 或 `>=21.1.0`
- ESLint `^8.57.0`
- TypeScript `>=4.8.4 <6.1.0`

版本范围与随包的 typescript-eslint、Vue parser 和插件运行要求一致。

## 安装

```sh
npm install --save-dev eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

也可以使用 pnpm、Yarn 或 Bun 的等价命令。

## 快速开始：Vue 3 + Vite

创建 `.eslintrc.cjs`：

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
};
```

建议创建 `.eslintignore`：

```text
coverage
dist
node_modules
```

运行全部支持的文件类型：

```sh
npx eslint . --ext .js,.cjs,.mjs,.ts,.cts,.mts,.tsx,.vue,.json,.jsonc,.json5,.md
```

默认配置会启用 Vue 3、TypeScript、JavaScript、JSON 各方言、Markdown、导入排序、正则检查和浏览器 globals。`vite.config.*`、`*.config.*`、`scripts/`、`tests/`、`bin/` 与 CLI 文件会额外切换到 Node.js globals。

## 适配其他项目

当根默认预置不合适时，从 `/factory` 子路径创建完整的 Legacy Config，并直接导出返回值。

### Node.js + TypeScript

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

module.exports = createConfig({
	environment: "node",
	vue: false,
});
```

### 纯 JavaScript

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

module.exports = createConfig({
	environment: "node",
	json: false,
	markdown: false,
	typescript: false,
	vue: false,
});
```

### Vue 2

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

module.exports = createConfig({ vue: 2 });
```

### 类型感知 TypeScript 与 Vue

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

module.exports = createConfig({
	typescript: {
		typeChecked: true,
		tsconfigRootDir: __dirname,
	},
	vue: {
		typeChecked: true,
		tsconfigRootDir: __dirname,
		version: 3,
	},
});
```

类型感知模式会启用 `recommended-type-checked` 和 `stylistic-type-checked`，被检查的文件必须属于 `parserOptions.project` 能找到的 `tsconfig.json`。大型 monorepo 建议显式传入 `project` 和 `tsconfigRootDir`。

## Factory 选项

| 选项          | 默认值      | 作用                                                         |
| ------------- | ----------- | ------------------------------------------------------------ |
| `environment` | `"browser"` | 选择 `"browser"`、`"node"` 或 `"universal"` globals。        |
| `imports`     | `true`      | 启用 import 正确性与排序规则。                               |
| `json`        | `true`      | 启用 JSON/JSONC/JSON5 及 package/tsconfig 排序。             |
| `markdown`    | `true`      | 启用 Markdown processor 与代码块规则。                       |
| `prettier`    | `true`      | 关闭与 Prettier 冲突的 ESLint/plugin 规则。                  |
| `regexp`      | `true`      | 启用正则表达式推荐规则。                                     |
| `typescript`  | `true`      | 可关闭，或传入 `typeChecked`、`project`、`tsconfigRootDir`。 |
| `vue`         | `3`         | 可关闭、传入 `2`/`3`，或传入 Vue 与类型感知选项。            |

可直接使用的命名预置包括 `PresetJavaScriptConfig`、`PresetTypeScriptConfig`、`PresetBasicConfig`、`PresetNodeConfig`、`PresetVue2Config` 和 `PresetVueConfig`。

## 覆盖项目规则

使用根 `extends` 时，项目 override 天然位于共享配置之后：

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
	overrides: [
		{
			files: ["src/**/*.ts", "src/**/*.vue"],
			rules: {
				"@typescript-eslint/no-unused-vars": "warn",
				"no-console": "off",
			},
		},
	],
};
```

使用 factory 时，也可以把项目 override 追加到返回对象：

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

const config = createConfig({ vue: false });

config.overrides.push({
	files: ["scripts/**/*.ts"],
	rules: { "@typescript-eslint/no-explicit-any": "off" },
});

module.exports = config;
```

## 规则名类型与按需规则

```ts
import { type RuleOptions, defineRules } from "@fast-china/eslint-config-legacy/rules";

const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import/order": ["error", { "newlines-between": "always" }],
	"vue/attributes-order": "error",
});

const reusableRules = {
	"no-console": ["warn", { allow: ["warn", "error"] }],
} satisfies RuleOptions;
```

类型覆盖 ESLint 8 核心规则和随包插件的规则名；规则选项仍使用 ESLint 8 的通用 `RuleEntry` 类型。项目自行安装的额外插件不在该名称集合内。

组织级 `importUseLodashRules` 和 `importUseLodashUnifiedRules` 仍从 `/rules` 导出，但不会进入任何默认预置。

## Prettier

Prettier 不再是 peer dependency，`eslint-plugin-prettier` 也不再安装。需要格式化时在项目中独立执行：

```sh
npm install --save-dev prettier
npx prettier --check .
```

如果使用其他格式化工具，或希望保留完整的样式类 ESLint 规则，请使用 `createConfig({ prettier: false })`。

## 默认高影响规则

默认配置包含少量高影响规则：首次启用时可能产生大量排序差异、阻断旧写法，或要求复核 import 副作用、类型导入、循环闭包、Vue props 与组件事件。源码使用 `[高影响]`、`[可自动修复]` 和 `[安全关注]` 标记，并通过测试保证标记与插件元数据、风险文档同步。

完整清单、自动修复风险、关闭示例与维护约定见 [默认规则、破坏性风险与维护约定](./docs/rules-risk.zh.md)。在旧项目中运行 `eslint --fix` 前，建议先只检查，在独立提交中应用修复，并运行类型检查、构建和测试。

## 从 1.0.5 及更早版本迁移

- ESLint peer 范围收窄为 `^8.57.0`，Node.js 最低运行范围与新版 TS/Vue 插件对齐。
- Vue 3 变为确定默认，不再从 `process.cwd()` 猜测；Vue 2 必须通过 factory 显式选择。
- 默认不再强制 lodash-unified。
- Prettier 不再作为 ESLint 规则执行，也不再是 peer dependency。
- `import/order` 改为分组之间保留空行；多个现代语法和组件 API 规则提升为 error。
- 显式函数返回类型不再强制，降低 Vue/Vite 应用噪声。
- 根入口只暴露 ESLint 可加载的配置对象；组合 API 位于 `/factory`，规则位于 `/rules`。

## 开发与贡献

```sh
npm install
npm run typegen
npm run check
npm pack --dry-run --ignore-scripts
```

完整工程审查见 [工程质量审查报告](./docs/engineering-audit.zh.md)，贡献流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 开源协议

[Apache-2.0](./LICENSE)
