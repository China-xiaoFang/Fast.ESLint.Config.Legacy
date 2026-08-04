const config: import("tsdown").UserConfig = {
	// 生成默认合并配置、可直接用于 Legacy extends 的独立配置，以及三个编程入口。
	entry: {
		"configs/index": "src/configs/index.ts",
		"constants/index": "src/constants/index.ts",
		"rules/index": "src/rules/index.ts",
		angular: "src/configs/angular/index.ts",
		common: "src/configs/common/index.ts",
		commonjs: "src/configs/commonjs/index.ts",
		environment: "src/configs/environment/index.ts",
		import: "src/configs/import/index.ts",
		index: "src/index.ts",
		javascript: "src/configs/javascript/index.ts",
		json: "src/configs/json/index.ts",
		lodash: "src/configs/lodash/index.ts",
		"lodash-unified": "src/configs/lodash-unified/index.ts",
		markdown: "src/configs/markdown/index.ts",
		node: "src/configs/node/index.ts",
		prettier: "src/configs/prettier/index.ts",
		promise: "src/configs/promise/index.ts",
		react: "src/configs/react/index.ts",
		regexp: "src/configs/regexp/index.ts",
		"sort-package": "src/configs/sort-package/index.ts",
		"sort-tsconfig": "src/configs/sort-tsconfig/index.ts",
		"type-aware": "src/configs/type-aware/index.ts",
		typescript: "src/configs/typescript/index.ts",
		vue: "src/configs/vue/index.ts",
		vue2: "src/configs/vue2/index.ts",
		yaml: "src/configs/yaml/index.ts",
	},
	// 将全部发布文件写入仓库根目录的唯一 dist 目录。
	outDir: "dist",
	// ESLint 8 Legacy Config 通过 require() 同步加载共享配置，因此发布 CommonJS 产物。
	format: "cjs",
	// 配置包只在 Node.js 环境中执行，不需要浏览器平台兼容处理。
	platform: "node",
	// 与 Flat Config 仓库一致，构建与发布代码以 Node 22 为最低语法基线。
	target: "node22",
	// ESLint 8 Legacy Config 通过 require() 加载 .js；保持现有公开路径和声明扩展名。
	fixedExtension: false,
	// 单一 default export 必须落为 module.exports / export =，不能出现 { default: config }。
	cjsDefault: true,
	// 保留源码模块结构，使各入口直接复用 configs、constants 与 rules 下的内部模块。
	unbundle: true,
	dts: {
		// 让声明文件的默认导出与 CommonJS 运行时导出保持一致。
		cjsDefault: true,
		// 使用 TypeScript 编译器生成声明文件，保证公共类型与源码一致。
		generator: "tsc",
		// 使用 TypeScript 的模块解析规则处理声明文件之间的引用。
		resolver: "tsc",
		// 声明文件与 JavaScript 一样发布可追踪的 source map，便于消费者定位到原始 TypeScript。
		sourcemap: true,
	},
	// 为 JavaScript 产物生成 source map，便于定位到原始 TypeScript 源码。
	sourcemap: true,
	// 每次构建前清空完整 dist，避免入口删除或重命名后残留陈旧产物。
	clean: true,
	// 移除未使用代码，减少各预置入口的发布体积。
	treeshake: true,
	// cjsDefault 已显式处理默认导出，无需 legacyCjs 检查重复约束产物结构。
	checks: { legacyCjs: false },
	// node16 profile 用于验证 CommonJS 的 Node 类型解析契约，与运行时最低版本无关。
	attw: { profile: "node16", level: "error" },
	// 构建后验证 package exports、CommonJS 类型解析和发布包结构。
	publint: true,
	// 将构建警告视为失败，防止带有潜在问题的产物进入发布流程。
	failOnWarn: true,
};

module.exports = config;
