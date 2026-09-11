# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases follow Semantic Versioning.

## [2.1.6] - 2026-09-11

### Added

- Added exhaustive switch checks, type-only export enforcement, readonly private-member detection, direct `eval` rejection, multiline brace consistency, and final-position `default` branches.

### Changed

- Replaced the opt-in `recommended-type-checked` preset with the official `strict-type-checked` and `stylistic-type-checked` baselines while preserving the ESLint 8 Legacy architecture.
- Required return types for named TypeScript and TSX functions while preserving contextual inference for inline callbacks; Vue SFCs no longer require function-return or module-boundary annotations and may keep declarative callback parameters.
- Made Promise waiting, ordering, and error handling an application decision by disabling `no-floating-promises` and `strict-void-return`, while retaining Promise misuse, invalid await, unsafe-type, and correctness-only `return-await` checks.
- Rejected `void promise` workarounds, retained semantic choices for primitive `||`, and relaxed syntax-only checks that do not improve type safety.
- Updated the TypeScript ESLint, Vue ESLint, Node type, and build dependencies to their latest compatible releases.

## [2.1.5] - 2026-09-01

### Changed

- Unified `extraFileExtensions: [".vue", ".nvue"]` across type-aware TypeScript, TSX, Vue, and NVue parsing so Project Service does not reload the project while linting mixed file types.
- Synchronized the Project Service extension policy with `@fast-china/eslint-config` 2.1.5 while preserving the ESLint 8 Legacy architecture.

## [2.1.4] - 2026-08-30

### Changed

- Classified `@/**` root aliases as leading internal imports and moved the `type` group after every other non-style import group, while styles remain in their final stable group.
- Synchronized the alias and terminal type-group policy with `@fast-china/eslint-config` 2.1.4 while preserving the ESLint 8 Legacy architecture.

## [2.1.3] - 2026-08-29

### Changed

- Enabled `import-x/order` `sortTypesGroup` so separate type imports retain the final type group while sorting by their original source category within it.
- Synchronized the type-group ordering policy and supporting documentation with `@fast-china/eslint-config` 2.1.3 while preserving the ESLint 8 Legacy architecture.

## [2.1.2] - 2026-08-29

### Changed

- Changed `@typescript-eslint/consistent-type-imports` fixes from inline type specifiers to separate `import type` declarations.
- Synchronized the type import policy and supporting documentation with `@fast-china/eslint-config` 2.1.2 while preserving the ESLint 8 Legacy architecture.

## [2.1.1] - 2026-08-29

### Added

- Added `import-x/style-imports-last` to require one final, stable stylesheet import group without automatic reordering.

### Changed

- Excluded stylesheet imports from `import-x/order` while preserving its grouping, alphabetizing, and `warnOnUnassignedImports` checks for all other imports.
- Synchronized the stylesheet import policy and supporting documentation with `@fast-china/eslint-config` 2.1.1 while preserving the ESLint 8 Legacy architecture.

## [2.1.0] - 2026-08-26

### Added

- Added the typed `regexpRules` record to the public `/rules` entry.

### Changed

- Synchronized the JavaScript, TypeScript, Vue, RegExp, Lodash, and package manifest rule policies with `@fast-china/eslint-config` while preserving the ESLint 8 Legacy architecture and Vue 2 compatibility.
- Replaced the full RegExp recommended preset with an explicit correctness and safety rule set.

## [2.0.6] - 2026-08-10

### Changed

- Allowed type-aware TypeScript configurations to forward `unknown` Promise rejection reasons without disabling `prefer-promise-reject-errors` for statically known non-`Error` values.

## [2.0.5] - 2026-08-09

### Changed

- Added prioritized import path groups for the uni-app, Vue, Element Plus, Fast Element Plus, Fast China, and Lodash ecosystems while keeping type-only imports in the dedicated type group.
- Changed import group spacing to a compact no-blank-line style and normalized the repository imports to the new policy.
- Kept the CommonJS package test stable across ESLint and Prettier formatting.

## [2.0.4] - 2026-08-08

### Changed

- Added consistent `fast` and `fast-china` package keywords and aligned the npm publish allowlist with the other Fast packages.
- Removed `src` and declaration maps that referenced unpublished source files while retaining CommonJS runtime source maps.
- Added package-contract coverage for the publish allowlist and declaration-map boundary.

## [2.0.3] - 2026-08-04

### Changed

- Standardized the bilingual README, repository ignores, editor settings, TypeScript checks, and tsdown configuration with the other Fast frontend SDK repositories.
- Renamed the package contract test and tsdown configuration to the shared `.mjs` and `.ts` conventions while preserving CommonJS package output.
- Removed documentation- and comment-governance tests and kept runtime, type-consumer, package, Publint, and declaration validation.

## [2.0.2] - 2026-08-02

### Configuration

- The package root is the only merged config and targets Vue 3, TypeScript, Vite browser administration projects.
- Top-level granular subpaths remain directly usable from Legacy `extends`; `/vue` targets Vue 3 and `/vue2` targets Vue 2.
- `/configs` exports reusable language, data-file, framework, import, Promise, RegExp, environment, compatibility, and policy creators.
- `/constants` and `/rules` expose shared globs and typed local rule records.
- React coverage includes Hooks, JSX accessibility, TypeScript props, automatic JSX runtime, button behavior, and iframe sandbox diagnostics.
- Angular coverage includes TypeScript, external templates, inline-template processing, template accessibility, and OnPush diagnostics.
- `createVueConfigs()` retains Vue 2 and Vue 3 upstream presets and framework-specific rule boundaries.

### Architecture

- Public exports include the package root, granular Legacy configs, `/configs`, `/constants`, `/rules`, and package metadata.
- Each `src/configs/<name>` directory colocates its directly loadable default config in `index.ts` and reusable config construction in `factory.ts`; `src/rules` owns rule records.
- Granular build entries now point directly to `src/configs`; the redundant `src/extends` adapter directory has been removed without requiring consumers to access `.default`.
- `defineRules` is implemented directly in `src/rules/index.ts` without a separate helper module.
- `src/typegen.d.ts` contains generated ESLint 8 and bundled-plugin rule names used by the public `/rules` API.
- Type-aware linting is an explicit `/configs` Project Service fragment for TypeScript, TSX, Angular TypeScript, and Vue scripts.
- Node.js globals are provided by environment config creators without an additional Node rule plugin.
- JSON, JSONC, JSON5, YAML, Markdown, Promise, RegExp, import-x, and Prettier compatibility are scoped by file type.

### Toolchain

- Registry metadata was reviewed on 2026-08-02. All dependencies already use the newest ESLint 8-compatible release; incompatible ESLint 9/10 and TypeScript 7 major upgrades remain intentionally excluded.

- pnpm 11 is the repository package manager and `pnpm-lock.yaml` is the only dependency lockfile.
- CI runs on Node.js 22.18.0 and 24.18.0 with frozen-lockfile installation.
- TypeScript 6 and tsdown produce ESLint 8-compatible CommonJS entries, `export =` declarations, declaration maps, and runtime source maps.
- Package and tsconfig sorting remain explicit overlays and never reorder semantic `package.json#exports` condition keys.

### Quality

- Runtime and type-consumer tests cover every export, supported language and framework, environment globals, Project Service, fix safety, rule documentation, and declarations.
- `publint`, Are the Types Wrong, ESLint, TypeScript, Prettier, generated-type drift checks, and package dry-runs protect releases.
- Bilingual README, dependency compatibility, high-impact rule guidance, security policy, contribution guidance, and engineering audit documentation are included.
