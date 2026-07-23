const fs = require("node:fs");
const path = require("node:path");

const { builtinRules } = require("eslint/use-at-your-own-risk");

const checkOnly = process.argv.includes("--check");
const outputPath = path.resolve(__dirname, "../src/typegen.d.ts");
const plugins = [
	["@typescript-eslint", require("@typescript-eslint/eslint-plugin")],
	["import", require("eslint-plugin-import")],
	["jsonc", require("eslint-plugin-jsonc")],
	["markdown", require("eslint-plugin-markdown")],
	["regexp", require("eslint-plugin-regexp")],
	["vue", require("eslint-plugin-vue")],
];

const ruleNames = new Set(builtinRules.keys());

for (const [prefix, plugin] of plugins) {
	for (const ruleName of Object.keys(plugin.rules ?? {})) {
		ruleNames.add(`${prefix}/${ruleName}`);
	}
}

const union = [...ruleNames]
	.sort((left, right) => left.localeCompare(right, "en"))
	.map((ruleName) => `\t| ${JSON.stringify(ruleName)}`)
	.join("\n");
const generated = `import type { Linter } from "eslint";\n\n/**\n * Generated from ESLint 8 and every plugin bundled by this package.\n * Run \`npm run typegen\` after changing dependency versions; do not edit manually.\n */\nexport type RuleName =\n${union};\n\n/** Known bundled rule names mapped to ESLint 8 rule entries. */\nexport type RuleOptions = Partial<Record<RuleName, Linter.RuleEntry>>;\n`;

if (checkOnly) {
	const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";

	if (current !== generated) {
		console.error("Generated rule names are stale. Run `npm run typegen` and commit src/typegen.d.ts.");
		process.exitCode = 1;
	}
} else {
	fs.writeFileSync(outputPath, generated, "utf8");
	console.log(`Generated ${ruleNames.size} bundled rule names.`);
}
