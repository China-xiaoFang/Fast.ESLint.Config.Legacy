import { defineConfig } from "tsdown";

export default defineConfig({
	// 所有公开 Legacy 预置都位于与 configs 同级的 presets，并只引用内部 core/index。
	entry: {
		"core/index": "src/core/index.ts",
		"rules/index": "src/rules/index.ts",
		angular: "src/presets/angular.ts",
		base: "src/presets/base.ts",
		javascript: "src/presets/javascript.ts",
		lodash: "src/presets/lodash.ts",
		"lodash-unified": "src/presets/lodash-unified.ts",
		node: "src/presets/node.ts",
		react: "src/presets/react.ts",
		"sort-package": "src/presets/sort-package.ts",
		"sort-tsconfig": "src/presets/sort-tsconfig.ts",
		"type-aware": "src/presets/type-aware.ts",
		typescript: "src/presets/typescript.ts",
		vue2: "src/presets/vue2.ts",
		vue3: "src/presets/vue3.ts",
	},
	format: "cjs",
	platform: "node",
	// 与 Flat Config 仓库一致，构建与发布代码以 Node 22 为最低语法基线。
	target: "node22",
	// CommonJS 是 ESLint 8 Legacy Config 通过 require() 同步加载共享配置所需的发布格式。
	checks: { legacyCjs: false },
	// ESLint 8 Legacy Config 通过 require() 加载 .js；保持现有公开路径和声明扩展名。
	fixedExtension: false,
	// 单一 default export 必须落为 module.exports / export =，不能出现 { default: config }。
	cjsDefault: true,
	dts: {
		cjsDefault: true,
		compilerOptions: { declarationMap: true },
		generator: "tsc",
		resolver: "tsc",
		// 声明文件与 JavaScript 一样发布可追踪的 source map，便于消费者定位到原始 TypeScript。
		sourcemap: true,
	},
	// 构建后同时验证 package exports、CommonJS 类型解析和发布包结构。
	publint: true,
	// node16 profile 用于验证 CommonJS 的 Node 类型解析契约，与运行时最低版本无关。
	attw: { profile: "node16", level: "error" },
	deps: {
		// 所有直接预置共享同一个 core/index 运行时，配置创建模块只打包进 Core 一次。
		neverBundle: ["../core/index"],
	},
	// 多入口共享 chunk 使用稳定名称，避免内容变更导致无意义的文件重命名。
	hash: false,
	sourcemap: true,
	// dist 是受版本控制的发布产物；避免构建器递归清理目录并误删需人工审查的文件。
	clean: false,
	treeshake: true,
	failOnWarn: true,
});
