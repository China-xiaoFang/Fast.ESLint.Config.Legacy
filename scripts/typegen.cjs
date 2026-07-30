const fs = require("node:fs");
const path = require("node:path");

const { builtinRules } = require("eslint/use-at-your-own-risk");

const checkOnly = process.argv.includes("--check");
const outputPath = path.resolve(__dirname, "../src/typegen.d.ts");
const plugins = [
	["@angular-eslint", require("@angular-eslint/eslint-plugin")],
	["@angular-eslint/template", require("@angular-eslint/eslint-plugin-template")],
	["@typescript-eslint", require("@typescript-eslint/eslint-plugin")],
	["import-x", require("eslint-plugin-import-x")],
	["jsonc", require("eslint-plugin-jsonc")],
	["jsx-a11y", require("eslint-plugin-jsx-a11y")],
	["markdown", require("eslint-plugin-markdown")],
	["promise", require("eslint-plugin-promise")],
	["react", require("eslint-plugin-react")],
	["react-hooks", require("eslint-plugin-react-hooks")],
	["regexp", require("eslint-plugin-regexp")],
	["vue", require("eslint-plugin-vue")],
	["yml", require("eslint-plugin-yml")],
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
const generated = `import type { Linter } from "eslint";\n\n/**\n * ESLint 8 核心规则与本包直接提供的插件规则标识符联合类型。\n *\n * 该类型是 \`@fast-china/eslint-config-legacy/rules\` 公共类型 API 的数据源。\n * 修改 ESLint 或插件版本后必须运行 \`pnpm typegen\`；请勿手动编辑本文件。\n *\n * @public\n */\nexport type RuleName =\n${union};\n\n/**\n * 本包可识别的类型安全规则记录。\n *\n * 键只能是 {@link RuleName}，值遵循 ESLint 8 的规则严重级别与选项元组格式。\n * 消费项目可以配合 \`defineRules()\` 使用，以保留具体规则值推断并拒绝未知规则名。\n *\n * @public\n */\nexport type RuleOptions = Partial<Record<RuleName, Linter.RuleEntry>>;\n`;

if (checkOnly) {
	const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";

	if (current !== generated) {
		console.error("Generated rule names are stale. Run `pnpm typegen` and commit src/typegen.d.ts.");
		process.exitCode = 1;
	}
} else {
	fs.writeFileSync(outputPath, generated, "utf8");
	console.log(`Generated ${ruleNames.size} bundled rule names.`);
}
