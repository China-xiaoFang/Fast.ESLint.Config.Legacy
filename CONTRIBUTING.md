# Contributing

Thank you for improving `@fast-china/eslint-config-legacy`.

## Prerequisites

- A supported Node.js version from `package.json` (`.nvmrc` selects the repository baseline)
- pnpm `11.x`

## Local workflow

```sh
pnpm install
pnpm typegen
pnpm check
pnpm audit
```

`pnpm check` regenerates no source files. TypeScript 6 and tsdown build the real CommonJS presets and declarations targeting Node 22; publint and Are the Types Wrong inspect the packed artifact. The command also type-checks source and consumer examples, lints every supported file type, checks formatting, and runs integration tests against `dist`.

Use `pnpm lint:fix` and `pnpm format` only for intentional mechanical changes. Inspect their diffs before committing.

## Changing dependencies, presets, or rules

1. Keep this package on ESLint 8.57 Legacy Config. ESLint 9/10 and Flat Config work belongs in `@fast-china/eslint-config`.
2. Scope each parser, preset, plugin, processor, environment, and rule group to the file types it supports.
3. Keep browser and Node.js globals separate; add narrow tooling overrides instead of making globals universal.
4. Prefer upstream recommended presets, then document every local override immediately above the rule.
5. Mark high-impact defaults with `[高影响]`; verify the locked rule's `meta.fixable` before adding `[可自动修复]`.
6. Keep `docs/rules-risk.zh.md` and `docs/rules-risk.md` synchronized with high-impact defaults.
7. Never sort a map whose key order has semantics, including `package.json#exports` condition objects.
8. Keep organization-specific dependency restrictions out of complete presets; expose them as explicit overlay presets or rule records.
9. Keep framework and language plugins on release lines whose peer range still includes ESLint 8.57; never bypass an incompatible peer range.
10. Run `pnpm outdated --format json` and update both dependency compatibility documents whenever direct versions change. “Latest” means the newest release still loadable by ESLint 8 Legacy Config.
11. Review dependency build scripts before adding an entry to `pnpm-workspace.yaml#allowBuilds`; never approve an unrelated package.
12. After changing ESLint or a bundled plugin, run `pnpm typegen` and commit `src/typegen.d.ts`.
13. Add or update an integration test for every parser, plugin, processor, scope, auto-fix, generated type, preset, or public export change.
14. Update both README files and `CHANGELOG.md` for user-visible behavior changes.
15. Keep rule records under `src/rules`, all ESLint config construction under `src/configs`, deterministic composition under `src/core/index.ts`, and public CommonJS entries under `src/presets`.
16. Complete presets must work alone; overlays such as `/type-aware` and sorting must document that they follow a complete preset.

The repository does not permit bulk deletion. Remove obsolete files only by explicit path, one file at a time.

## Pull requests

Keep changes focused and describe compatibility effects. Do not commit credentials or publish from a pull request. Node.js, ESLint, TypeScript, Vue, React, Angular, Prettier, module-format, or default-rule changes are release-significant.

## Release check

```sh
pnpm check
pnpm audit
pnpm --config.ignore-scripts=true pack --dry-run
```

Inspect the archive and verify that `/rules` plus every complete and overlay preset contain JavaScript, declarations, and source maps. The package root must remain unexported, direct configs must not require `.default`, and the build must report zero publint and Are the Types Wrong problems. Publishing remains maintainer-controlled.
