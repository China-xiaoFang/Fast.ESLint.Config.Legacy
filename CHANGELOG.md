# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases follow Semantic Versioning.

## [2.0.1] - 2026-08-02

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
