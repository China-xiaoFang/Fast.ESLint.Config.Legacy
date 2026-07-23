[中文](./README.zh.md) | **English**

# @fast-china/eslint-config-legacy

An ESLint 8 `.eslintrc` shareable config for Vue 3, Vite, TypeScript, and JavaScript projects.

[![npm version](https://img.shields.io/npm/v/@fast-china/eslint-config-legacy?color=orange)](https://www.npmjs.com/package/@fast-china/eslint-config-legacy)
[![license](https://img.shields.io/npm/l/@fast-china/eslint-config-legacy)](./LICENSE)

## Version policy

This package is the ESLint 8.57 Legacy Config line for projects that still use `.eslintrc.cjs`. ESLint 9 is treated as a Flat Config transition release and is outside this package's support matrix. Use [`@fast-china/eslint-config`](https://www.npmjs.com/package/@fast-china/eslint-config) for ESLint 10.

| ESLint major | Package                            | Configuration format   |
| ------------ | ---------------------------------- | ---------------------- |
| 8.57         | `@fast-china/eslint-config-legacy` | `.eslintrc.cjs`        |
| 9            | No compatibility commitment        | Migrate to Flat Config |
| 10           | `@fast-china/eslint-config`        | `eslint.config.mjs`    |

## Features

- Explicit Vue 3 + Vite + TypeScript defaults; no runtime Vue-version guessing.
- File-scoped JavaScript, TypeScript, Vue SFC, JSON, JSONC, JSON5, Markdown, RegExp, and import rules.
- A `createConfig()` factory for browser, Node.js, universal, JavaScript-only, Vue 2, and type-aware projects.
- Node.js globals only for Vite configs, scripts, tests, bins, and CLI files instead of every browser source file.
- Prettier compatibility without executing Prettier as an ESLint rule.
- Generated bundled rule names and a `defineRules()` helper that rejects misspelled known rule names.
- Runtime, consumer-type, auto-fix, risk-documentation, package-entry, and multi-version CI coverage.

## Requirements

- Node.js `^18.18.0`, `^20.9.0`, or `>=21.1.0`
- ESLint `^8.57.0`
- TypeScript `>=4.8.4 <6.1.0`

## Install

```sh
npm install --save-dev eslint@^8.57.0 typescript @fast-china/eslint-config-legacy
```

Equivalent pnpm, Yarn, and Bun commands are also supported.

## Quick start: Vue 3 + Vite

Create `.eslintrc.cjs`:

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
};
```

Run every supported file type:

```sh
npx eslint . --ext .js,.cjs,.mjs,.ts,.cts,.mts,.tsx,.vue,.json,.jsonc,.json5,.md
```

The default config enables Vue 3, TypeScript, JavaScript, JSON dialects, Markdown, import ordering, RegExp checks, and browser globals. Common config, script, test, bin, and CLI files receive Node.js globals.

## Other project types

Load the factory from its dedicated subpath when the root preset does not match the project.

### Node.js + TypeScript

```js
const { createConfig } = require("@fast-china/eslint-config-legacy/factory");

module.exports = createConfig({
	environment: "node",
	vue: false,
});
```

### JavaScript only

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

### Type-aware TypeScript and Vue

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

Type-aware mode enables the `recommended-type-checked` and `stylistic-type-checked` presets. Every linted file must belong to a `tsconfig.json` found through `parserOptions.project`.

## Factory options

| Option        | Default     | Purpose                                                          |
| ------------- | ----------- | ---------------------------------------------------------------- |
| `environment` | `"browser"` | Select `"browser"`, `"node"`, or `"universal"` globals.          |
| `imports`     | `true`      | Enable import correctness and ordering.                          |
| `json`        | `true`      | Enable JSON dialects and package/tsconfig ordering.              |
| `markdown`    | `true`      | Enable the Markdown processor and fenced-code handling.          |
| `prettier`    | `true`      | Disable ESLint/plugin rules that conflict with Prettier.         |
| `regexp`      | `true`      | Enable the RegExp recommended preset.                            |
| `typescript`  | `true`      | Disable or pass `typeChecked`, `project`, and `tsconfigRootDir`. |
| `vue`         | `3`         | Disable, select `2`/`3`, or pass Vue and type-aware options.     |

Named factory exports include `PresetJavaScriptConfig`, `PresetTypeScriptConfig`, `PresetBasicConfig`, `PresetNodeConfig`, `PresetVue2Config`, and `PresetVueConfig`.

## Project overrides

Overrides declared after the shared config take precedence:

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

## Rule-name types and opt-in rules

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

The generated type covers ESLint 8 core and every bundled plugin rule name. Options use ESLint 8's general `RuleEntry` type. Rules from additional project-installed plugins are outside this name set.

Organization-specific `importUseLodashRules` and `importUseLodashUnifiedRules` remain available from `/rules`, but no default preset enables them.

## Prettier

Prettier is no longer a peer dependency, and `eslint-plugin-prettier` is not installed. Run formatting separately:

```sh
npm install --save-dev prettier
npx prettier --check .
```

Use `createConfig({ prettier: false })` with another formatter or when you want to retain every stylistic ESLint rule.

## High-impact defaults

Some defaults can create broad ordering changes, block legacy patterns, or require review of import side effects, type imports, loop closures, Vue props, and emitted component events. Source comments use `[高影响]`, `[可自动修复]`, and `[安全关注]`, and tests keep those labels synchronized with rule metadata and documentation.

See [Default rules and disruptive risks](./docs/rules-risk.md) before running `eslint --fix` on an existing codebase. Apply fixes in an isolated commit and run type checking, builds, and tests.

## Migration from 1.0.5 and earlier

- The peer range is now ESLint `^8.57.0`, with Node.js aligned to current TypeScript/Vue plugin requirements.
- Vue 3 is deterministic. Vue 2 must be selected through the factory.
- The default no longer forces lodash-unified.
- Prettier is no longer run inside ESLint or declared as a peer.
- `import/order` now requires blank lines between groups, and several modern syntax/component API rules are errors.
- Explicit function return types are no longer mandatory.
- The package root only exports the ESLint-loadable config; composition is under `/factory`, and raw rules are under `/rules`.

## Development

```sh
npm install
npm run typegen
npm run check
npm pack --dry-run --ignore-scripts
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) and the [Chinese engineering audit](./docs/engineering-audit.zh.md).

## License

[Apache-2.0](./LICENSE)
