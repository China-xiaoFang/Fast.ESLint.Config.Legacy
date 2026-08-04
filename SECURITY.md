# Security policy

## Supported versions

Security fixes are provided for the current release.

## Reporting a vulnerability

Please report suspected vulnerabilities privately to the repository maintainers before opening a public issue. Include the affected version, a minimal reproduction, the expected impact, and any known mitigation. Do not include real credentials or private project data.

Rules such as `vue/no-v-html`, JSX accessibility checks, and Angular template diagnostics are defensive signals, not sanitizers. Applications remain responsible for validating trust boundaries, sanitizing untrusted HTML used by Vue `v-html`, React `dangerouslySetInnerHTML`, or Angular HTML bindings, and testing security-sensitive behavior.

## Known ESLint 8 toolchain advisory

The ESLint 8 dependency graph is reported through [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg), a denial-of-service issue in brace expansion. npm's supported dependency-tree fix upgrades ESLint to 10, which is intentionally outside this Legacy Config package.

The affected glob patterns are developer-controlled configuration and CLI inputs in this package; do not build lint glob patterns from untrusted input. Run the standard `pnpm audit` command and review every finding against the lockfile and this documented compatibility boundary. The repository does not suppress or allowlist advisories in executable code. Remove this notice if an ESLint 8-compatible upstream fix becomes available.

## Dependency install scripts

pnpm denies undeclared dependency build scripts. `pnpm-workspace.yaml#allowBuilds` permits only the reviewed `esbuild` tool binary and the `unrs-resolver` platform binding required by import-x. Review their sources whenever the lockfile changes; never add a broad or unrelated approval.
