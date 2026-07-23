# Default rules, disruptive risks, and maintenance

This guide documents what `@fast-china/eslint-config-legacy` 2.x enables by default and which rules deserve extra review when adopting the config or running `eslint --fix`.

## Risk labels

- `[高影响]` (high impact): potentially broad diagnostics, structural migration work, or behavior/API review.
- `[可自动修复]` (fixable): the locked rule version declares an ESLint fix; review is still required.
- `[安全关注]` (security): highlights trust-boundary and injection risks.
- `[默认关闭]` / `[按需启用]`: available in source but not enabled by the default preset.

## Default upstream presets

| Scope                  | Default presets                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| JavaScript/JSX         | `eslint:recommended`                                                                                 |
| TypeScript/TSX         | `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:@typescript-eslint/stylistic` |
| Vue 3 SFC              | JavaScript and TypeScript presets plus `plugin:vue/recommended`                                      |
| Imports                | `plugin:import/recommended`; TypeScript and Vue also use `plugin:import/typescript`                  |
| Regular expressions    | `plugin:regexp/recommended`                                                                          |
| JSON dialects          | The matching `eslint-plugin-jsonc` recommended preset for JSON, JSONC, or JSON5                      |
| Markdown               | `plugin:markdown/recommended`                                                                        |
| Prettier compatibility | `prettier` and `plugin:jsonc/prettier`; Prettier is not executed inside ESLint                       |

The lockfile is the source of truth for upstream rule contents. Plugin upgrades can change these sets.

## High-impact defaults

| Rule                                         | Fixable    | Main concern                                                                                      |
| -------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `jsonc/sort-keys`, `jsonc/sort-array-values` | Yes        | Large manifest diffs. Conditional keys under `package.json#exports` are intentionally excluded.   |
| `import/order`                               | Yes        | Reorders imports; manually moving side-effect imports can change initialization order.            |
| `@typescript-eslint/no-unused-vars`          | No         | Can produce many migration errors. This version does not delete code automatically.               |
| `@typescript-eslint/consistent-type-imports` | Yes        | Type-only imports can remove runtime module evaluation; preserve side effects explicitly.         |
| `@typescript-eslint/no-require-imports`      | No         | Blocks CommonJS and conditional loading in normal TypeScript files; `.cjs` and `.cts` are exempt. |
| `no-var`                                     | Yes        | Block scope and loop closure behavior need review.                                                |
| `prefer-arrow-callback`                      | Yes        | Review `this`, `arguments`, constructability, and stack names.                                    |
| `logical-assignment-operators`               | Yes        | Getter, Proxy, and reactive-object access counts need behavioral tests.                           |
| `no-restricted-syntax` (`LabeledStatement`)  | No         | Multi-level loop control may require refactoring.                                                 |
| `vue/require-explicit-emits`                 | No         | Makes emitted events part of the documented component API.                                        |
| `vue/no-mutating-props`                      | No         | Requires one-way data flow and often a component design change.                                   |
| `vue/attributes-order`                       | Yes        | Creates broad template-only ordering diffs.                                                       |
| JS `no-unused-vars` and `no-undef`           | No         | Existing JS projects may have many errors until environment globals are configured.               |
| RegExp recommended preset                    | Some rules | Fixes should be checked against real and boundary inputs.                                         |

`vue/no-v-html` is a warning and a security signal. Only use it with trusted or reliably sanitized HTML.

Type-aware rules, Vue 2, organization-specific lodash restrictions, resolver-dependent import rules, and Prettier-as-an-ESLint-rule are not enabled by default. See the [Chinese guide](./rules-risk.zh.md) for scoped override examples and the full maintenance checklist.
