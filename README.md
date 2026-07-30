[中文](./README.zh.md) | **English**

# @fast-china/eslint-config-legacy

Production-ready shareable configs for the ESLint 8 `.eslintrc` ecosystem. The package provides explicit presets for Vue 2, Vue 3, React, Angular, Node.js, TypeScript, JavaScript, JSON, YAML, Markdown, Promise, RegExp, and import rules.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## Scope

The current 2.x release line supports ESLint 8.57 Legacy Config only. ESLint 9 is outside the support range; ESLint 10 projects should use [`@fast-china/eslint-config`](https://www.npmjs.com/package/@fast-china/eslint-config).

| ESLint | Package                            | Format              |
| ------ | ---------------------------------- | ------------------- |
| 8.57   | `@fast-china/eslint-config-legacy` | `.eslintrc.cjs`     |
| 9      | Unsupported                        | —                   |
| 10     | `@fast-china/eslint-config`        | `eslint.config.mjs` |

## Design

- Public APIs are static `extends` subpaths. There is no ambiguous package-root config or runtime configuration factory.
- `src/configs` owns configuration creation, `src/rules` owns local rule records, `src/core/index.ts` assembles deterministic presets, and `src/presets` contains public entry files.
- Every complete preset scopes JavaScript, TypeScript, framework templates, and data formats with Legacy `overrides`.
- Node.js is a complete `/node` preset. Build and configuration files still receive narrowly scoped Node globals in browser presets.
- Type-aware linting is retained as an explicit `/type-aware` overlay using typescript-eslint Project Service.
- Prettier runs separately; ESLint only disables conflicting formatting rules.
- Exact rule-name types are generated from ESLint 8 and bundled plugins.
- TypeScript 6 and tsdown emit directly requireable CommonJS presets with `export =` declarations and source maps.

## Requirements

- Node.js `^22.18.0 || >=24.11.0`
- pnpm `^11.0.0` for repository development
- ESLint `^8.57.0`
- TypeScript `>=4.8.4 <6.1.0`

CI uses the same Node.js 22.18.0 and 24.11.0 matrix as the Flat Config project. The package remains consumable through pnpm, npm, Yarn, or Bun; pnpm is the repository's lockfile and workflow authority.

## Install

```sh
pnpm add -D eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

Parsers and plugins are direct dependencies of this package.

## Complete presets

Each complete preset can be used as the only shared entry in `.eslintrc.cjs`.

| Extends name                                  | Project type                                   |
| --------------------------------------------- | ---------------------------------------------- |
| `@fast-china/eslint-config-legacy/base`       | Framework-free JS + TS + data + Markdown       |
| `@fast-china/eslint-config-legacy/javascript` | JavaScript and JSX                             |
| `@fast-china/eslint-config-legacy/typescript` | JavaScript + TypeScript and TSX                |
| `@fast-china/eslint-config-legacy/node`       | Node.js + JavaScript + TypeScript + data       |
| `@fast-china/eslint-config-legacy/vue2`       | Vue 2 + TypeScript + Vite/Webpack              |
| `@fast-china/eslint-config-legacy/vue3`       | Vue 3 + TypeScript + Vite                      |
| `@fast-china/eslint-config-legacy/react`      | React + TypeScript + Hooks + JSX accessibility |
| `@fast-china/eslint-config-legacy/angular`    | Angular TS + inline/external templates         |

Every subpath exports the config object itself, so ESLint 8 never needs `.default`.

### Vue 3

```js
// .eslintrc.cjs
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/vue3"],
};
```

Use `/vue2`, `/react`, or `/angular` in the same way. Angular projects should include `.html` when invoking ESLint so external templates are checked.

### Node.js

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/node"],
};
```

The Node preset provides Node globals without imposing a separate Node rule plugin.

## Composable overlays

Overlay presets must follow a complete preset in `extends`.

| Extends name                                      | Purpose                                                 |
| ------------------------------------------------- | ------------------------------------------------------- |
| `@fast-china/eslint-config-legacy/type-aware`     | Type-aware TS, TSX, Angular TS, and Vue script checks   |
| `@fast-china/eslint-config-legacy/sort-package`   | Safe `package.json` sorting                             |
| `@fast-china/eslint-config-legacy/sort-tsconfig`  | Sort `tsconfig*.json` by TypeScript documentation topic |
| `@fast-china/eslint-config-legacy/lodash`         | Require the `lodash` package entry                      |
| `@fast-china/eslint-config-legacy/lodash-unified` | Require the `lodash-unified` package entry              |

### Type-aware linting

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/vue3", "@fast-china/eslint-config-legacy/type-aware"],
};
```

`/type-aware` enables `recommended-type-checked`, `stylistic-type-checked`, and Project Service for TypeScript and Vue files. Every linted file must belong to a discoverable tsconfig. A complex monorepo can add a project-owned override with `parserOptions.tsconfigRootDir`.

### Opt-in sorting

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

Sorting remains opt-in because the first automatic fix can create a large diff. Conditional keys inside `package.json#exports` are never reordered.

## Typed project rules

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

Place project-specific rules in the consuming `.eslintrc` `rules` or `overrides`. Rules supplied only by consumer-installed plugins are outside this package's generated type.

## High-impact defaults

Read [Default rules and high-impact risks](./docs/rules-risk.md) before enabling a preset or running `eslint --fix`. It identifies high-impact framework rules, broad automatic fixes, upstream recommended sets, and opt-in policies.

Every local override has a rationale comment. `[高影响]`, `[可自动修复]`, `[安全关注]`, `[默认关闭]`, and `[按需启用]` mark important decisions.

## Development and release checks

```sh
pnpm install
pnpm typegen
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

See the [engineering audit](./docs/engineering-audit.zh.md), [dependency compatibility matrix](./docs/dependency-compatibility.md), [changelog](./CHANGELOG.md), [contribution guide](./CONTRIBUTING.md), and [security policy](./SECURITY.md).

## License

[Apache-2.0](./LICENSE)
