# Default rules, high-impact risks, and maintenance

This guide documents `/vue3` and the other explicit presets in `@fast-china/eslint-config-legacy` 2.x and highlights rules that require extra review during adoption or `eslint --fix`.

## Risk labels

- `[高影响]` (high impact): broad diagnostics, structural changes, or behavior/API review.
- `[可自动修复]` (fixable): the locked rule declares an ESLint fix; review is still required.
- `[安全关注]` (security): a trust-boundary or injection concern.
- `[默认关闭]` / `[按需启用]`: available but not enabled by the relevant default preset.

## Vue 3 preset

| Scope                  | Default presets                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| JavaScript/JSX         | `eslint:recommended`                                                                                 |
| TypeScript/TSX         | `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:@typescript-eslint/stylistic` |
| Vue 3 SFC              | JavaScript and TypeScript presets plus `plugin:vue/recommended`                                      |
| Imports                | `plugin:import-x/recommended`; resolver-dependent checks remain disabled                             |
| Promises               | `plugin:promise/recommended`                                                                         |
| Regular expressions    | `plugin:regexp/recommended`                                                                          |
| JSON dialects          | Matching `eslint-plugin-jsonc` recommended presets                                                   |
| YAML                   | `plugin:yml/recommended` and `plugin:yml/prettier`                                                   |
| Markdown               | `plugin:markdown/recommended-legacy`                                                                 |
| Prettier compatibility | `prettier` and plugin-specific compatibility configs; Prettier is not executed by ESLint             |

The lockfile is the source of truth for upstream rule contents. Plugin upgrades can change recommended sets.

## Other direct presets

| Preset     | Additional upstream behavior                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `/node`    | Complete JS/TS/data preset using Node globals without a dedicated Node rule plugin                        |
| `/vue2`    | `plugin:vue/vue2-recommended`; the Vue 3 emits contract is explicitly disabled                            |
| `/react`   | React recommended, automatic JSX runtime, Hooks, JSX a11y, and local button/iframe DOM safety constraints |
| `/angular` | angular-eslint recommended, external/inline template and accessibility presets, plus local OnPush         |

Browser presets apply Node globals only to narrowly scoped tooling files.

## High-impact local defaults

Each rule is a default only within its owning preset. React rules do not enter `/vue3`, for example.

| Rule                                                        | Fixable    | Main concern                                                                                     |
| ----------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `import-x/order`                                            | Yes        | Reorders imports; manually moving side-effect imports can change initialization order.           |
| `@typescript-eslint/no-unused-vars`                         | Yes        | Fixes can remove unused bindings or imports; review module side effects and parameter positions. |
| `@typescript-eslint/consistent-type-imports`                | Yes        | Type-only imports can remove runtime module evaluation; preserve side effects explicitly.        |
| `@typescript-eslint/no-require-imports`                     | No         | Blocks CommonJS in normal TS files; `.cjs` and `.cts` are exempt.                                |
| `no-var`                                                    | Yes        | Block scope and loop-closure behavior need review.                                               |
| `prefer-arrow-callback`                                     | Yes        | Review `this`, `arguments`, constructability, and stack names.                                   |
| `logical-assignment-operators`                              | Yes        | Getter, Proxy, and reactive-object access counts need behavioral tests.                          |
| `no-restricted-syntax` (`LabeledStatement`)                 | No         | Multi-level loop control may require refactoring.                                                |
| `vue/require-explicit-emits`                                | No         | Makes Vue 3 emitted events part of the component API.                                            |
| `vue/no-mutating-props`                                     | No         | Requires one-way data flow and often a component design change.                                  |
| `vue/attributes-order`                                      | Yes        | Creates broad template-only ordering diffs.                                                      |
| `react/self-closing-comp`                                   | Yes        | Rewrites empty JSX/TSX elements and can create a broad first-run diff.                           |
| `@angular-eslint/prefer-on-push-component-change-detection` | No         | Requires Angular components to use OnPush and can change asynchronous view-update behavior.      |
| JS `no-unused-vars` and `no-undef`                          | No         | Existing JS projects may have many errors until environment globals are configured.              |
| RegExp recommended preset                                   | Some rules | Fixes must be checked against real and boundary inputs.                                          |

`vue/no-v-html` is a warning and a security signal. Only use it with trusted or reliably sanitized HTML.

## High-impact upstream behavior

- `plugin:promise/recommended` may require Promise chains to return consistently and handle rejection. Preserve error propagation instead of adding empty catches.
- React Hooks 7 recommended includes React Compiler-derived checks for static components, immutability, refs, effect state updates, purity, and related constraints in addition to the classic two Hooks rules.
- Local React rules require an explicit button `type` and warn about missing iframe sandboxing. Treat them as behavior and permission-boundary checks, not formatting noise.
- JSX a11y and Angular template accessibility expose missing alternative text, keyboard behavior, labels, valid ARIA, and focus support. Treat these as usability issues, not CI noise.
- Angular recommended sets can require standalone APIs, modern template control flow, or lifecycle changes. Lower individual rules during coordinated adoption if necessary.

## Explicitly opt-in behavior

- Type-aware TypeScript/Vue sets are enabled only by adding `/type-aware` after a complete preset; they start Project Service and add rules such as `no-floating-promises`.
- Vue 2, React, and Angular behavior is limited to its direct preset.
- `preferLodashRules` and `preferLodashUnifiedRules` are organization import-source policies exposed from `/rules`; `/lodash` and `/lodash-unified` apply them as explicit overlays.
- Resolver-dependent `import-x/no-unresolved` and related static export checks remain disabled.
- `/sort-package` and `/sort-tsconfig` are explicit overlays. Their ordering rules can create broad diffs and should be reviewed in an isolated commit.
- Keys under `package.json#exports` are never sorted, even when package sorting is enabled, because condition order is semantic.
- `eslint-plugin-prettier` and `prettier/prettier` are never enabled.

## Safe adoption

Run a read-only lint first. Apply fixes on a dedicated branch or commit, then inspect imports, side-effect modules, package exports, component APIs, reactive state, Promise chains, templates, and accessibility changes. Finish with type checking, builds, and tests.

Project overrides should be narrow:

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy/react"],
	overrides: [
		{
			files: ["legacy/**/*.tsx"],
			rules: {
				"react/button-has-type": "warn",
				"react-hooks/immutability": "warn",
			},
		},
	],
};
```

## Maintenance checklist

1. Add a rationale comment for every local rule override under `src/rules/`.
2. Mark high-impact rules with `[高影响]`; verify locked `meta.fixable` before adding `[可自动修复]`.
3. Keep this file, the Chinese guide, both READMEs, and `CHANGELOG.md` synchronized.
4. Never sort maps with order semantics, especially `package.json#exports` conditions.
5. Run `pnpm typegen` after changing ESLint or a bundled plugin and review `src/typegen.d.ts`.
6. Add an integration test for parser, plugin, scope, fix, export, complete preset, or overlay changes.
7. Run `pnpm check` and inspect `pnpm --config.ignore-scripts=true pack --dry-run` before release.
