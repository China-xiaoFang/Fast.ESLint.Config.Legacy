**English** | [中文](./README.zh.md)

# @fast-china/eslint-config-legacy

Production ESLint 8 `.eslintrc` configuration for Vue web administration projects. Reusable creators also cover Vue 2/3, React, Angular, Node.js, TypeScript, JavaScript, JSON, YAML, Markdown, Promise, RegExp, and import rules.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## Scope

The 2.x line supports ESLint 8.57 Legacy Config. ESLint 9 is not supported; ESLint 10 projects should use [`@fast-china/eslint-config`](https://www.npmjs.com/package/@fast-china/eslint-config).

The package has one merged configuration entry, direct granular extends, and three programming entries:

- Package root: Vue 3, TypeScript, Vite, browser administration projects.
- Top-level subpaths such as `/typescript`, `/vue`, and `/vue2`: directly extendable granular configs.
- `/configs`: reusable Legacy Config fragment creators, including Vue 2 and Vue 3.
- `/constants`: shared file globs.
- `/rules`: typed local rule records and `RuleOptions`.

There is no preset directory or preset dispatcher. Each `src/configs/<name>/index.ts` is a directly loadable default Legacy config, while its reusable creator is colocated in `factory.ts`; `src/index.ts` composes the package root from those creators.

## Requirements

- Node.js `^22.18.0 || ^24.18.0`
- pnpm `^11.0.0` for repository development
- ESLint `^8.57.0`
- TypeScript `^4.0.0 || ^5.0.0 || ^6.0.0`

## Installation

```sh
pnpm add -D eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

Plugins and parsers are direct package dependencies.

## Default configuration

```js
// .eslintrc.cjs
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
};
```

The root enables browser globals, JavaScript, TypeScript, Vue 3, import-x, Promise, RegExp, JSON dialects, YAML, Markdown, CommonJS/tooling compatibility, and the Prettier conflict-disable layer.

## Direct granular extends

Each granular config can be used directly:

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

Available names are `/angular`, `/common`, `/commonjs`, `/environment`, `/import`, `/javascript`, `/json`, `/lodash`, `/lodash-unified`, `/markdown`, `/node`, `/prettier`, `/promise`, `/react`, `/regexp`, `/sort-package`, `/sort-tsconfig`, `/type-aware`, `/typescript`, `/vue`, `/vue2`, and `/yaml`.

`/vue` defaults to Vue 3. `/vue2` is the separate Vue 2 config.

## Reusable configuration fragments

Projects that need a different composition can import creators from `/configs`:

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

Use `createVueConfigs({ version: 3 })` for Vue 3. React, Angular, type-aware TypeScript, sorting, Lodash import policies, JSON, YAML, Markdown, Promise, RegExp, import, and Prettier creators are exported from the same `/configs` entry.

`createMarkdownConfigs()` returns root `extends` and code-block `overrides` separately; preserve both when composing it manually.

## Typed project rules

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

The `defineRules` implementation lives directly in `src/rules/index.ts`; there is no separate helper module.

## Development checks

```sh
pnpm install
pnpm typegen
pnpm test
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

Tests are separated by verification target: consumer types, runtime configs, rules, and package contracts. `pnpm test` builds the package before running all four suites.

See the [engineering audit](./docs/engineering-audit.zh.md), [compatibility matrix](./docs/dependency-compatibility.md), [risk guide](./docs/rules-risk.md), and [changelog](./CHANGELOG.md).

## License

[Apache-2.0](./LICENSE)
