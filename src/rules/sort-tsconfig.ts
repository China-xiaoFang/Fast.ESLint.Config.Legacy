import type { RuleOptions } from "../typegen";

/**
 * tsconfig.json 属性排序规则。
 *
 * `[高影响][可自动修复]`：首次修复会重排大量字段，但只改变 JSONC 的阅读顺序，
 * 不改变 TypeScript 编译选项值。
 */
export const tsconfigJsonSortRules = {
	// tsconfig 是 JSONC，注释用于解释编译器取舍，必须保留。
	"jsonc/no-comments": "off",

	// [高影响][可自动修复] 只调整顶层和 compilerOptions 的键顺序，不改写选项值或数组。
	"jsonc/sort-keys": [
		"error",
		// 顶层按继承、选项、项目引用和文件范围的阅读顺序排列。
		{
			order: ["extends", "compilerOptions", "references", "files", "include", "exclude"],
			pathPattern: "^$",
		},
		// compilerOptions 的顺序跟随 TypeScript 文档主题，便于检索和代码审查。
		{
			order: [
				/* Projects */
				"incremental",
				"composite",
				"tsBuildInfoFile",
				"disableSourceOfProjectReferenceRedirect",
				"disableSolutionSearching",
				"disableReferencedProjectLoad",
				/* Language and Environment */
				"target",
				"jsx",
				"jsxFactory",
				"jsxFragmentFactory",
				"jsxImportSource",
				"lib",
				"moduleDetection",
				"noLib",
				"reactNamespace",
				"useDefineForClassFields",
				"emitDecoratorMetadata",
				"experimentalDecorators",
				/* Modules */
				"baseUrl",
				"rootDir",
				"rootDirs",
				"customConditions",
				"module",
				"moduleResolution",
				"moduleSuffixes",
				"noResolve",
				"paths",
				"resolveJsonModule",
				"resolvePackageJsonExports",
				"resolvePackageJsonImports",
				"typeRoots",
				"types",
				"allowArbitraryExtensions",
				"allowImportingTsExtensions",
				"allowUmdGlobalAccess",
				/* JavaScript Support */
				"allowJs",
				"checkJs",
				"maxNodeModuleJsDepth",
				/* Type Checking */
				"strict",
				"strictBindCallApply",
				"strictFunctionTypes",
				"strictNullChecks",
				"strictPropertyInitialization",
				"allowUnreachableCode",
				"allowUnusedLabels",
				"alwaysStrict",
				"exactOptionalPropertyTypes",
				"noFallthroughCasesInSwitch",
				"noImplicitAny",
				"noImplicitOverride",
				"noImplicitReturns",
				"noImplicitThis",
				"noPropertyAccessFromIndexSignature",
				"noUncheckedIndexedAccess",
				"noUnusedLocals",
				"noUnusedParameters",
				"useUnknownInCatchVariables",
				/* Emit */
				"declaration",
				"declarationDir",
				"declarationMap",
				"downlevelIteration",
				"emitBOM",
				"emitDeclarationOnly",
				"importHelpers",
				"importsNotUsedAsValues",
				"inlineSourceMap",
				"inlineSources",
				"isolatedDeclarations",
				"mapRoot",
				"newLine",
				"noEmit",
				"noEmitHelpers",
				"noEmitOnError",
				"outDir",
				"outFile",
				"preserveConstEnums",
				"preserveValueImports",
				"removeComments",
				"sourceMap",
				"sourceRoot",
				"stripInternal",
				/* Interop Constraints */
				"allowSyntheticDefaultImports",
				"esModuleInterop",
				"forceConsistentCasingInFileNames",
				"isolatedModules",
				"preserveSymlinks",
				"verbatimModuleSyntax",
				/* Completeness */
				"skipDefaultLibCheck",
				"skipLibCheck",
			],
			pathPattern: "^compilerOptions$",
		},
	],
} satisfies RuleOptions;
