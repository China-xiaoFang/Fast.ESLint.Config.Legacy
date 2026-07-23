const fs = require("node:fs");
const path = require("node:path");

// tsup 将 TypeScript 的 `export =` 声明生成为 ESM default；运行时入口实际是 CommonJS。
// 发布前覆写这一明确文件，保证 `import config = require(...)` 与 Node require 的类型一致。
const outputPath = path.resolve(__dirname, "../dist/index.d.ts");
const declaration = `import type { Linter } from "eslint";\n\ndeclare const config: Linter.Config;\n\nexport = config;\n`;

fs.writeFileSync(outputPath, declaration, "utf8");
