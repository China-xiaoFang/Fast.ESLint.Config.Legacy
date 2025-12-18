import { defineConfig } from "tsup";

export default defineConfig([
	{
		// 入口文件
		entry: ["src/rules/index.ts"],
		// 输出目录
		outDir: "dist/rules",
		// 输出格式
		format: ["esm"],
		// 编译版本
		target: "node16",
		// 生成类型定义文件
		dts: true,
		// 启用代码拆分
		splitting: false,
		// 生成 source map
		sourcemap: true,
		// 清理输出目录
		clean: true,
		// 压缩输出文件
		minify: false,
		// 去除未使用的代码
		treeshake: false,
	},
	{
		// 入口文件
		entry: ["src/index.cjs"],
		// 输出目录
		outDir: "dist",
		// 输出格式
		format: ["cjs"],
		// 编译版本
		target: "node16",
		// 生成类型定义文件
		dts: false,
		// 启用代码拆分
		splitting: false,
		// 生成 source map
		sourcemap: true,
		// 清理输出目录
		clean: true,
		// 压缩输出文件
		minify: false,
		// 去除未使用的代码
		treeshake: false,
	},
]);
