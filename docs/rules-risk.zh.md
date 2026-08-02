# 默认规则、高影响风险与维护约定

本文档说明 `@fast-china/eslint-config-legacy` 2.x 的包根配置和可复用创建器启用了什么，以及哪些规则在首次启用或执行 `eslint --fix` 时可能造成大面积差异、结构性改动或行为变化。

## 风险标记

- `[高影响]`：可能大面积报错、要求结构性重构，或需要人工确认运行时与公共 API 行为。
- `[可自动修复]`：当前锁定版本的规则声明可被 `eslint --fix` 修改；不代表可以跳过代码审查。
- `[安全关注]`：主要提示注入、信任边界等安全问题。
- `[默认关闭]`、`[按需启用]`：源码保留该能力，但默认配置不会启用。

“高影响”不表示规则本身不安全，而是采用成本或修复审查成本较高。自动修复通常以保持语义为目标，但模块副作用、getter/Proxy、循环闭包、组件事件和条件导出都必须由项目维护者复核。

## 默认继承的上游预置

包根是唯一合并配置，面向 Vue 3 + Vite + TypeScript 浏览器管理项目，并对不同文件类型分别应用配置，避免规则跨语言污染。

| 范围             | 默认继承                                                                                             | 说明                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| JavaScript/JSX   | `eslint:recommended`                                                                                 | 基础语法和运行时正确性，包括 `no-undef`、`no-unused-vars`。                    |
| TypeScript/TSX   | `eslint:recommended`、`plugin:@typescript-eslint/recommended`、`plugin:@typescript-eslint/stylistic` | 默认不读取类型信息；会显式关闭不理解 TypeScript 的核心替代规则。               |
| Vue 3 SFC        | JavaScript、TypeScript 非类型感知配置、`plugin:vue/recommended`                                      | `/vue` 默认为 Vue 3；Vue 2 使用 `/vue2`。                                      |
| import           | `plugin:import-x/recommended`                                                                        | 本库补充导入位置、去重和排序；依赖 resolver 的高误报规则默认关闭。             |
| Promise          | `plugin:promise/recommended`                                                                         | 检查 Promise 链返回、异常处理、回调名称与反模式；默认作用于所有脚本语言。      |
| RegExp           | `plugin:regexp/recommended`                                                                          | 部分规则可以自动改写正则，修复后必须运行覆盖真实输入的测试。                   |
| JSON/JSONC/JSON5 | `eslint-plugin-jsonc` 对应方言预置                                                                   | `tsconfig*.json` 与 VS Code settings 按 JSONC 处理，不会被严格 JSON 规则误报。 |
| YAML             | `plugin:yml/recommended`、`plugin:yml/prettier`                                                      | 检查 YAML 结构并关闭与 Prettier 冲突的样式规则。                               |
| Markdown         | `plugin:markdown/recommended-legacy`                                                                 | 处理 fenced code block；示例代码会关闭部分不适用的项目规则。                   |
| Prettier 兼容    | `prettier` 与 `plugin:jsonc/prettier`                                                                | 只关闭冲突规则，不会在 ESLint 内执行 Prettier。                                |

上游预置的实际规则集合由 `pnpm-lock.yaml` 中的版本决定。升级 ESLint 或插件时，应使用 `ESLint#calculateConfigForFile()`、集成测试和锁文件核对实际结果，而不是维护一份容易过期的完整复制列表。

## 独立配置继承的规则

以下框架规则不会进入包根配置，只由对应创建器启用：

| 创建器          | 上游预置与本地能力                                                                                        | 主要边界                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `/node`         | Node globals                                                                                              | 不引入专用 Node 规则插件，也不包含其他语言或数据文件规则。              |
| `/vue`、`/vue2` | Vue 3 与 Vue 2 独立默认导出；仍可使用 `createVueConfigs({ version })`                                     | 按版本选择 Vue SFC parser 与组件规则。                                  |
| `/react`        | `plugin:react/recommended`、`react/jsx-runtime`、`plugin:react-hooks/recommended`、`jsx-a11y/recommended` | TSX 不重复检查 PropTypes；本地规则补充 button、iframe 等 DOM 安全约束。 |
| `/angular`      | `plugin:@angular-eslint/recommended`、template recommended、template accessibility、本地 OnPush 约束      | 检查 `.ts`、`.html` 和内联模板；selector 前缀必须由应用自行配置。       |

browser 预置只在窄范围工程文件中提供 Node globals。

## 本地高影响规则

“默认”指规则在它所属的配置中默认启用：Vue 3 规则属于包根和 `/vue`，Vue 2、React 与 Angular 规则分别通过 `/vue2`、`/react`、`/angular` 或对应创建器启用。

| 规则                                                        | 等级       | 自动修复   | 主要影响                                                                           | 采用建议                                                 |
| ----------------------------------------------------------- | ---------- | ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `import-x/order`                                            | error      | 是         | 重排并分组 import。裸副作用 import 只会被报告，人工移动可能改变初始化顺序。        | 优先检查 polyfill、样式、注册器和入口 import。           |
| `@typescript-eslint/no-unused-vars`                         | error      | 是         | 现有代码可能产生大量未使用声明错误；修复可能删除未使用绑定或 import。              | 复核模块副作用、参数位置，再运行类型检查、构建和测试。   |
| `@typescript-eslint/consistent-type-imports`                | error      | 是         | 将纯类型依赖改成内联 `type` import；若原 import 还承担副作用，编译后行为可能变化。 | 将副作用改成独立 `import "module"`，并复核构建产物。     |
| `@typescript-eslint/no-require-imports`                     | error      | 否         | 阻断普通 `.ts` 中的 CommonJS、条件加载和部分工具链互操作写法。                     | `.cjs`/`.cts` 已自动豁免；确有需要的文件应按范围关闭。   |
| `no-var`                                                    | error      | 是         | 把 `var` 改为块级声明；声明提升和循环闭包行为需要关注。                            | 先保留测试基线，重点复核循环内回调。                     |
| `prefer-arrow-callback`                                     | error      | 是         | 改写回调形式；依赖 `this`、`arguments`、构造行为或函数名栈信息的代码需人工确认。   | 检查事件处理器、类库回调和栈追踪。                       |
| `logical-assignment-operators`                              | error      | 是         | 改成 `\|\|=`、`&&=`、`??=`；getter、Proxy 或响应式对象的读取和写入次数需要确认。   | 对状态容器和 Vue 响应式对象运行行为测试。                |
| `no-restricted-syntax`（`LabeledStatement`）                | error      | 否         | 禁止 labeled break/continue，可能要求重构多层循环控制流。                          | 必要时可以按文件降级，重构后再恢复。                     |
| `vue/require-explicit-emits`                                | error      | 否         | 要求组件声明事件，相当于补全组件公共 API；未声明事件的组件可能大量报错。           | 根据真实 `$emit`/`emit` 调用补齐事件，不要盲目关闭。     |
| `vue/no-mutating-props`                                     | error      | 否         | 强制单向数据流，可能要求引入本地状态、computed setter 或事件。                     | 将修复作为组件设计变更审查。                             |
| `vue/attributes-order`                                      | error      | 是         | 首次运行会重排大量模板属性，通常不改变运行逻辑但会形成大 diff。                    | 独立提交模板排序，不与业务修改混合。                     |
| `react/self-closing-comp`                                   | error      | 是         | 首次启用会批量改写无子节点的 JSX/TSX 标签，形成较大的模板差异。                    | 将机械格式变化与组件逻辑修改分开提交。                   |
| `@angular-eslint/prefer-on-push-component-change-detection` | error      | 否         | Angular 预置要求组件使用 OnPush，可能改变异步状态触发视图更新的方式。              | 逐组件验证 signals、Observable、事件与手工变更检测。     |
| `no-unused-vars`、`no-undef`（JS 上游预置）                 | error      | 否         | JavaScript 代码可能出现大量阻断；`no-undef` 还会暴露缺失的环境全局变量。           | 先正确选择 `environment`，再清理无用代码或声明项目全局。 |
| RegExp 推荐预置                                             | 由上游决定 | 部分规则是 | 可能改写字符类、量词或断言；语法等价不代表业务输入覆盖充分。                       | 修复后运行覆盖真实输入和边界值的正则测试。               |

## 上游推荐预置的高影响行为

- `plugin:promise/recommended` 在包根和 `createPromiseConfigs()` 中启用。`promise/always-return`、`promise/catch-or-return` 等规则可能要求重写已有 Promise 链；不要用空 catch 机械消除诊断，应确认异常传播和返回值语义。
- React Hooks 7 的 recommended 不仅包含 `rules-of-hooks` 与 `exhaustive-deps`，还包含静态组件、不可变性、refs、effect 内 setState、purity 等 React Compiler 规则。已有 React 代码首次启用时可能出现结构性问题，应逐组件处理，而不是整体关闭预置。
- React 本地规则要求 button 显式声明 `type`，并提示缺失 iframe sandbox；这些约束用于避免意外提交和过宽的嵌入权限，不应作为纯格式噪声处理。
- `plugin:jsx-a11y/recommended` 与 Angular template accessibility 会暴露缺少替代文本、键盘交互、label、ARIA 属性或焦点支持的问题。这些通常是产品可用性缺陷，不应只为通过 CI 而禁用。
- Angular recommended/template recommended 可能要求 standalone、现代控制流或更明确的生命周期用法。采用这些约束时可以按单条规则降级，并结合 Angular 自身版本计划处理。

`sort-imports` 默认为 warning 且可以自动修复，只排序同一条 import 中的成员；如果项目使用 `--max-warnings 0`，warning 同样会阻断 CI。

`vue/no-v-html` 默认为 warning，属于安全关注而不是自动重写规则。它要求调用方确认 HTML 来自可信来源或经过可靠净化。

## 明确不默认启用的高影响能力

- TypeScript 和 Vue 的类型感知规则只在叠加 `/type-aware` 或组合 `createTypeAwareConfigs()` 时启用；它会启动 Project Service、增加项目服务开销，并启用 `no-floating-promises` 等需要类型信息的规则。
- React 和 Angular 规则通过 `/react`、`/angular` 或对应创建器启用；Vue 2 使用 `/vue2` 或 `createVueConfigs({ version: 2 })`，`/vue` 默认为 Vue 3。
- `preferLodashRules` 与 `preferLodashUnifiedRules` 是组织级导入来源策略，可从 `/rules` 导入；`createLodashConfigs()` 可应用对应策略。
- `import-x/no-unresolved`、`import-x/named` 等依赖具体 resolver 或别名配置的检查默认关闭。
- `/sort-package` 与 `/sort-tsconfig` 只在显式叠加时启用。其 `jsonc/sort-keys` 与 `jsonc/sort-array-values` 可能形成较大清单差异，应独立提交并复核。
- 即使开启排序，`package.json#exports` 内部键也永不自动排序。Node 条件导出按照键顺序匹配，改写顺序可能改变实际加载文件。
- `eslint-plugin-prettier` 和 `prettier/prettier` 不会启用；格式化应由 Prettier CLI 或编辑器单独完成。

## 按项目降低规则强度

项目 override 放在共享配置之后即可，并尽量限定文件范围：

```js
module.exports = {
	root: true,
	extends: ["@fast-china/eslint-config-legacy"],
	overrides: [
		{
			files: ["**/*.{ts,tsx,mts,cts,vue}"],
			rules: {
				"@typescript-eslint/consistent-type-imports": "warn",
				"@typescript-eslint/no-require-imports": "off",
				"@typescript-eslint/no-unused-vars": "warn",
			},
		},
		{
			files: ["**/*.vue"],
			rules: {
				"vue/attributes-order": "warn",
				"vue/require-explicit-emits": "warn",
			},
		},
		{
			files: ["**/{package.json,tsconfig*.json}"],
			rules: {
				// 仅当 extends 已叠加清单排序预置时需要此降级。
				"jsonc/sort-array-values": "off",
				"jsonc/sort-keys": "off",
			},
		},
	],
};
```

建议先执行只读检查，再在独立分支或独立提交中运行 `eslint --fix`。重点审查 import、副作用入口、包导出、组件事件、响应式对象和清单文件，并运行项目的类型检查、构建与测试。

## 修改规则时的维护清单

1. 在 `src/rules/` 为每条本地规则写明作用、启用原因和重要例外，不要只翻译规则名。
2. 新增或升级高影响规则时添加 `[高影响]`；使用 `[可自动修复]` 前必须核对当前锁定版本的 `meta.fixable`。
3. 同步更新本文件、英文版、两份 README 和 `CHANGELOG.md`。
4. 排序规则不得触碰键顺序有语义的映射，包括 `package.json#exports` 条件对象。
5. ESLint 或内置插件版本变化后运行 `pnpm typegen`，审查并提交 `src/typegen.d.ts`。
6. 为解析器、插件、作用域、自动修复、公开导出、根配置或可复用创建器变化增加集成测试。
7. 完成后运行 `pnpm check` 和 `pnpm --config.ignore-scripts=true pack --dry-run`，并检查真实发布清单。
