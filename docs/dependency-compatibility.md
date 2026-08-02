# Dependency versions and compatibility

Reviewed on 2026-08-02 against registry metadata and the sibling `Fast.ESLint.Config` 2.0.5 strategy.

This package selects the newest release that ESLint 8.57 Legacy Config can load through CommonJS. It does not force incompatible latest majors.

## Compatibility boundary

| Layer        | Range                                     | Reason                                               |
| ------------ | ----------------------------------------- | ---------------------------------------------------- |
| Runtime Node | `^22.18.0 \|\| ^24.18.0`                  | Matches the maintained Flat Config project matrix    |
| CI Node      | 22.18.0 and 24.18.0                       | Shared quality matrix; Node 26 is not tested yet     |
| ESLint       | `^8.57.0`                                 | The package's only lint-engine product boundary      |
| TypeScript   | `^4.0.0 \|\| ^5.0.0 \|\| ^6.0.0`          | Published TypeScript compatibility range             |
| Build tools  | TypeScript 6.0.3, tsdown 0.22.14, pnpm 11 | Output targets Node 22; lockfile pins exact packages |

The package intentionally uses the same maintained Node baseline as `@fast-china/eslint-config`. ESLint 8 compatibility describes the configuration format, not a promise to preserve end-of-life Node releases.

## Package-manager decision

The repository uses pnpm 11:

- `pnpm-lock.yaml` is the sole dependency lockfile.
- `pnpm-workspace.yaml#allowBuilds` records reviewed dependency build scripts.
- CI uses `pnpm/action-setup` and a frozen pnpm lockfile, matching the Flat Config project.
- Published packages remain package-manager neutral.

The manifest constrains only pnpm 11 through `engines.pnpm`; it does not pin a patch-level `packageManager` value.

## Current latest releases

These direct dependencies are current as of the review date:

| Dependency                         | Version | Purpose                                    |
| ---------------------------------- | ------- | ------------------------------------------ |
| `@typescript-eslint/eslint-plugin` | 8.65.0  | ESLint 8 and TypeScript 6 rules            |
| `@typescript-eslint/parser`        | 8.65.0  | TypeScript and Vue script parsing          |
| `eslint-config-prettier`           | 10.1.8  | Formatting-conflict disable layer          |
| `eslint-plugin-import-x`           | 4.17.1  | CommonJS Legacy import rules               |
| `eslint-plugin-jsx-a11y`           | 6.10.2  | React JSX accessibility                    |
| `eslint-plugin-markdown`           | 5.1.0   | ESLint 8 `recommended-legacy` processor    |
| `eslint-plugin-promise`            | 7.3.0   | Promise recommendations                    |
| `eslint-plugin-react`              | 7.37.5  | React Legacy recommendations               |
| `eslint-plugin-react-hooks`        | 7.1.1   | Hooks and React Compiler diagnostics       |
| `eslint-plugin-vue`                | 10.10.0 | Vue 2/3 Legacy Config                      |
| `vue-eslint-parser`                | 10.4.1  | Vue SFC parser                             |
| `@arethetypeswrong/core`           | 0.18.5  | Published type-resolution checks           |
| `prettier`                         | 3.9.6   | Repository formatting                      |
| `publint`                          | 0.3.22  | Package-structure checks                   |
| `react`                            | 19.2.8  | React consumer tests                       |
| `tsdown`                           | 0.22.14 | CommonJS multi-entry and declaration build |

`@types/node` uses the Node 24 line, matching the active CI and development baseline. tsdown still targets Node 22 syntax.

## Intentional ESLint 8 compatibility lines

| Dependency                            | Current | Latest | Why it stays                                              |
| ------------------------------------- | ------- | ------ | --------------------------------------------------------- |
| Angular ESLint plugin/template/parser | 21.4.0  | 22.1.0 | 22.x peers accept ESLint 9/10 only                        |
| `eslint-plugin-jsonc`                 | 2.21.1  | 3.3.0  | 3.x needs ESLint 9.38+ and is ESM-only                    |
| `eslint-plugin-regexp`                | 2.10.0  | 3.1.1  | 3.x needs ESLint 9.38+                                    |
| `eslint-plugin-yml`                   | 1.19.1  | 3.7.0  | 3.x needs ESLint 9.38+ and is ESM-only                    |
| `jsonc-eslint-parser`                 | 2.4.2   | 3.1.0  | 3.x cannot be synchronously loaded as a Legacy parser     |
| `yaml-eslint-parser`                  | 1.3.2   | 2.1.0  | 2.x cannot be synchronously loaded as a Legacy parser     |
| `eslint`                              | 8.57.1  | 10.8.0 | The package intentionally exposes ESLint 8.57 `.eslintrc` |
| `@types/eslint`                       | 8.56.12 | 9.6.1  | Declarations must model the ESLint 8 API                  |
| `@types/node`                         | 24.13.3 | 26.x   | Types follow the maintained development baseline          |
| `typescript`                          | 6.0.3   | 7.0.2  | typescript-eslint 8.65 requires TypeScript below 6.1      |

`eslint-plugin-markdown` 5.1.0 is deprecated upstream, but its replacement targets the newer ESLint configuration model. This package retains the final `recommended-legacy` release while it supports ESLint 8 Legacy Config.

## Resolver and build-script boundary

As in Fast.ESLint.Config, this package inherits only `plugin:import-x/recommended`: it does not guess a consumer's TypeScript/Vite alias resolver, and resolver-sensitive rules remain disabled by default.

`unrs-resolver` remains transitively required by import-x and contains a standard platform-binding selector script. pnpm permits it through the reviewed `allowBuilds` list. Review the resolved version and script source whenever import-x changes.

## Upgrade verification

```sh
pnpm typegen
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

Entries in the compatibility table are expected in `pnpm outdated`. Do not use `--force`, peer overrides, or automatic major upgrades merely to reach “zero outdated.”
