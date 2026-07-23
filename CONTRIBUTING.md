# Contributing

Thank you for improving `@fast-china/eslint-config-legacy`.

## Prerequisites

- A Node.js version supported by `package.json`
- npm 10 or a compatible npm release

## Local workflow

```sh
npm install
npm run typegen
npm run check
```

`npm run check` regenerates no files. It verifies generated rule names, builds the actual CommonJS package, type-checks source and consumer examples, lints every supported file type, checks formatting, and runs integration tests against `dist`.

Use `npm run lint:fix` and `npm run format` only for intentional mechanical changes. Inspect their diffs before committing.

## Changing dependencies or rules

1. Keep this package on ESLint 8.57 Legacy Config. ESLint 9/10 and Flat Config work belongs in `@fast-china/eslint-config`.
2. Scope each parser, preset, plugin, and rule group to the file types it supports.
3. Keep browser and Node.js globals separate; add narrow tooling overrides instead of making globals universal.
4. Prefer upstream recommended presets, then document every local override immediately above the rule.
5. Mark disruptive defaults with `[高影响]`; check the locked rule's `meta.fixable` before adding `[可自动修复]`.
6. Keep `docs/rules-risk.zh.md` and `docs/rules-risk.md` synchronized with high-impact defaults.
7. Never sort a map whose key order has semantics, including `package.json#exports` condition objects.
8. Keep organization-specific package restrictions out of default presets; expose them as opt-in rule records.
9. After changing ESLint or a bundled plugin, run `npm run typegen` and commit `src/typegen.d.ts`.
10. Add or update an integration test for parser, plugin, scope, auto-fix, generated type, factory option, or public export changes.
11. Update both README files and `CHANGELOG.md` for user-visible behavior changes.

The repository does not permit bulk deletion. Remove obsolete files only by explicit path, one file at a time.

## Pull requests

Keep changes focused and describe compatibility effects. Do not commit credentials or publish from a pull request. Node.js, ESLint, TypeScript, Vue, Prettier, module-format, or default-rule changes are release-significant.

## Release check

```sh
npm run check
npm pack --dry-run --ignore-scripts
```

Inspect the archive and verify that the root, `/factory`, and `/rules` exports each include JavaScript and declaration files. Publishing remains maintainer-controlled.
