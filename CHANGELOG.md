# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases follow Semantic Versioning.

## [2.0.0] - Unreleased

### Presets

- Complete CommonJS presets: `/base`, `/javascript`, `/typescript`, `/node`, `/vue2`, `/vue3`, `/react`, and `/angular`.
- Explicit overlays: `/type-aware`, `/sort-package`, `/sort-tsconfig`, `/lodash`, and `/lodash-unified`.
- React coverage includes Hooks, JSX accessibility, TypeScript props, automatic JSX runtime, button behavior, and iframe sandbox diagnostics.
- Angular coverage includes TypeScript, external templates, inline-template processing, template accessibility, and OnPush diagnostics.
- Vue 2 and Vue 3 use separate upstream presets and framework-specific rule boundaries.

### Architecture

- Public configuration APIs use explicit Legacy `extends` subpaths; the package root is intentionally not exported.
- `src/configs` owns configuration construction, `src/rules` owns rule records, `src/core/index.ts` owns deterministic composition, and `src/presets` owns public entries.
- `src/typegen.d.ts` contains generated ESLint 8 and bundled-plugin rule names used by the public `/rules` API.
- Type-aware linting is an explicit Project Service overlay for TypeScript, TSX, Angular TypeScript, and Vue scripts.
- Node.js is a complete preset with correctly scoped globals and no additional Node rule plugin.
- JSON, JSONC, JSON5, YAML, Markdown, Promise, RegExp, import-x, and Prettier compatibility are scoped by file type.

### Toolchain

- pnpm 11 is the repository package manager and `pnpm-lock.yaml` is the only dependency lockfile.
- CI runs on Node.js 22.18.0 and 24.11.0 with frozen-lockfile installation.
- TypeScript 6 and tsdown produce ESLint 8-compatible CommonJS entries, `export =` declarations, declaration maps, and runtime source maps.
- Package and tsconfig sorting remain explicit overlays and never reorder semantic `package.json#exports` condition keys.

### Quality

- Runtime and type-consumer tests cover every export, supported language and framework, environment globals, Project Service, fix safety, rule documentation, and declarations.
- `publint`, Are the Types Wrong, ESLint, TypeScript, Prettier, generated-type drift checks, and package dry-runs protect releases.
- Bilingual README, dependency compatibility, high-impact rule guidance, security policy, contribution guidance, and engineering audit documentation are included.
