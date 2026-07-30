const { spawnSync } = require("node:child_process");
const path = require("node:path");

/**
 * ESLint 8 已停止功能版本演进，npm 对 GHSA-mh99-v99m-4gvg 的自动修复要求升级 ESLint 10。
 * 本脚本只接受由这一条已记录公告传递产生的结果；任何新的叶子公告仍会令 CI 失败。
 */
const allowedAdvisories = new Set(["GHSA-mh99-v99m-4gvg"]);
const packageManagerCli = process.env.npm_execpath;
const pnpmCli = packageManagerCli && path.basename(packageManagerCli).toLowerCase().includes("pnpm") ? packageManagerCli : undefined;
const executable = pnpmCli ? process.execPath : process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const args = [...(pnpmCli ? [pnpmCli] : []), "audit", "--prod", "--json"];
const audit = spawnSync(executable, args, {
	encoding: "utf8",
	shell: false,
});

if (audit.status === 0) {
	console.log("pnpm audit found no production dependency vulnerabilities.");
	process.exit(0);
}

let report;
try {
	report = JSON.parse(audit.stdout);
} catch {
	console.error(audit.error?.message || audit.stderr || audit.stdout || "pnpm audit did not return a JSON report.");
	process.exit(1);
}

// Registry/network failures also use a non-zero exit code and JSON output. Keep them
// distinct from real advisory results so CI never reports a misleading vulnerability.
if (report.error || (report.message && !report.vulnerabilities && !report.advisories)) {
	console.error("pnpm audit could not retrieve an advisory report.");
	console.error(report.message || report.error?.summary || audit.stderr || "Unknown audit endpoint error.");
	process.exit(1);
}

// pnpm 会保留 GitHub Advisory 标识；按标识白名单校验可避免依赖路径字段变化时静默放宽例外。
const advisoryIds = new Set(JSON.stringify(report).match(/GHSA-[a-z0-9-]+/gi) ?? []);
const unexpected = [...advisoryIds].filter((advisory) => !allowedAdvisories.has(advisory));

if (advisoryIds.size === 0 || unexpected.length > 0) {
	console.error("pnpm audit found vulnerabilities outside the documented ESLint 8 compatibility exception:");
	console.error(`- ${unexpected.join(", ") || "audit report did not expose a recognized GHSA identifier"}`);
	process.exit(1);
}

const total = report.metadata?.vulnerabilities?.total ?? Object.keys(report.vulnerabilities ?? report.advisories ?? {}).length;
console.warn(
	`Accepted ${total} transitive audit findings derived only from GHSA-mh99-v99m-4gvg; ` + "the supported fix requires ESLint 10. See SECURITY.md."
);
