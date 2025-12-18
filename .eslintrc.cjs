const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	extends: ["./dist/index.cjs"],
});
