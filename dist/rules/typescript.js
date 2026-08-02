//#region src/rules/typescript.ts
/**
* TypeScript 本地覆写规则。
*
* 先关闭会误判 TypeScript 语法的核心规则，再启用 typescript-eslint 对应实现。
* 该记录不启动类型服务；需要类型信息的规则由 `createTypeAwareConfigs()` 提供。
*
* @public
*/
const typescriptRules = {
	"constructor-super": "off",
	"getter-return": "off",
	"no-class-assign": "off",
	"no-const-assign": "off",
	"no-dupe-args": "off",
	"no-dupe-class-members": "off",
	"no-dupe-keys": "off",
	"no-func-assign": "off",
	"no-import-assign": "off",
	"no-new-native-nonconstructor": "off",
	"no-new-symbol": "off",
	"no-obj-calls": "off",
	"no-setter-return": "off",
	"no-this-before-super": "off",
	"no-unreachable": "off",
	"no-unsafe-negation": "off",
	"no-undef": "off",
	"no-redeclare": "off",
	"no-unused-vars": "off",
	"no-unused-expressions": "off",
	"@typescript-eslint/no-redeclare": "error",
	"@typescript-eslint/no-unused-vars": ["error", {
		args: "after-used",
		argsIgnorePattern: "^_",
		caughtErrors: "all",
		caughtErrorsIgnorePattern: "^_",
		ignoreRestSiblings: true,
		varsIgnorePattern: "^_"
	}],
	"@typescript-eslint/no-namespace": "off",
	"@typescript-eslint/no-explicit-any": "warn",
	"@typescript-eslint/no-require-imports": "error",
	"@typescript-eslint/no-unused-expressions": ["error", {
		allowShortCircuit: true,
		allowTernary: true
	}],
	"@typescript-eslint/no-inferrable-types": "error",
	"@typescript-eslint/no-non-null-assertion": "warn",
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	"@typescript-eslint/consistent-type-imports": ["error", {
		disallowTypeAnnotations: false,
		fixStyle: "inline-type-imports",
		prefer: "type-imports"
	}]
};
//#endregion
exports.typescriptRules = typescriptRules;

//# sourceMappingURL=typescript.js.map