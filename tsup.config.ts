import { defineConfig } from "tsup";

export default defineConfig({
	// 单次构建所有公开入口，避免多个构建任务互相清理 dist。
	entry: {
		index: "src/index.ts",
		factory: "src/factory.ts",
		"rules/index": "src/rules/index.ts",
	},
	format: ["cjs"],
	target: "node18",
	dts: true,
	splitting: false,
	sourcemap: true,
	// 仓库禁止批量删除；旧产物由维护者按明确路径单独清理。
	clean: false,
	treeshake: true,
});
