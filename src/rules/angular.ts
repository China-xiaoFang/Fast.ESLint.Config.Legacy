import type { RuleOptions } from "../typegen";

/**
 * Angular TypeScript 推荐规则。
 *
 * @remarks
 * Angular ESLint 的拆分插件不直接导出 Flat Config 预置；本记录与 angular-eslint
 * 22.x 的 `tsRecommended` 保持一致，并逐条说明启用理由。
 */
export const angularRules = {
	/** 生命周期方法只能出现在对应的 Angular 组件或指令上下文中，避免无效钩子。 */
	"@angular-eslint/contextual-lifecycle": "error",
	/** 空生命周期方法没有行为且容易误导维护者，应直接移除。 */
	"@angular-eslint/no-empty-lifecycle-method": "error",
	/** Input 别名会让模板 API 与类属性名称分离，增加搜索和重构成本。 */
	"@angular-eslint/no-input-rename": "error",
	/** 统一使用 `input()` 或 `@Input` 声明输入，避免与 metadata 数组混用两套 API。 */
	"@angular-eslint/no-inputs-metadata-property": "error",
	/** 输出名称不得覆盖原生 DOM 事件，否则模板事件含义容易混淆。 */
	"@angular-eslint/no-output-native": "error",
	/** 输出本身已经表达事件语义，不使用 `on` 前缀以保持 Angular 公共 API 约定。 */
	"@angular-eslint/no-output-on-prefix": "error",
	/** Output 别名会让模板 API 与类属性名称分离，增加搜索和重构成本。 */
	"@angular-eslint/no-output-rename": "error",
	/** 统一使用 `output()` 或 `@Output` 声明输出，避免与 metadata 数组混用两套 API。 */
	"@angular-eslint/no-outputs-metadata-property": "error",
	/** Angular 推荐使用 `inject()` 统一依赖注入写法。 */
	"@angular-eslint/prefer-inject": "error",
	/** Angular 22 默认采用 `OnPush`，禁止组件显式退回 `Eager` 或旧的 `Default` 策略。 */
	"@angular-eslint/prefer-on-push-component-change-detection": "error",
	/** 独立组件是现代 Angular 的默认模型。 */
	"@angular-eslint/prefer-standalone": "error",
	/** Pipe 类实现接口后可由 TypeScript 检查 `transform` 签名，避免运行时才发现不一致。 */
	"@angular-eslint/use-pipe-transform-interface": "error",
	/** 生命周期接口让方法拼写和签名可由 TypeScript 验证；警告级别便于渐进补齐旧代码。 */
	"@angular-eslint/use-lifecycle-interface": "warn",
} satisfies RuleOptions;

/**
 * Angular HTML 模板推荐规则。
 *
 * @remarks
 * 该记录与 angular-eslint 22.x 的 `templateRecommended` 对齐，并补充默认启用的现代
 * 控制流约束。它同时应用于外部模板与 processor 提取的内联模板。
 */
export const angularTemplateRules = {
	/** 双向绑定必须使用 `[(...)]` 顺序，反写的“香蕉盒”通常是模板笔误。 */
	"@angular-eslint/template/banana-in-box": "error",
	/** 模板比较使用严格等号，避免 Angular 表达式中的隐式类型转换。 */
	"@angular-eslint/template/eqeqeq": "error",
	/** 对 `async` pipe 结果直接取反会让初始 `null` 状态产生反直觉分支。 */
	"@angular-eslint/template/no-negated-async": "error",
	/** 采用现代 `@if` 和 `@for` 控制流，与 Angular 推荐模板语法保持一致。 */
	"@angular-eslint/template/prefer-control-flow": "error",
} satisfies RuleOptions;

/**
 * Angular 模板无障碍规则。
 *
 * @remarks
 * 规则覆盖替代文本、键盘交互、焦点、表单标签与 ARIA 合法性，可通过
 * `createAngularConfigs({ templateAccessibility: false })` 整组关闭而不影响模板基础正确性规则。
 */
export const angularTemplateAccessibilityRules = {
	/** 图片和图像型元素需要替代文本，确保非视觉用户能获得等价信息。 */
	"@angular-eslint/template/alt-text": "error",
	/** `click` 交互需要键盘等价入口，避免仅鼠标用户可操作。 */
	"@angular-eslint/template/click-events-have-key-events": "error",
	/** 需要可访问名称的元素不得为空，避免读屏软件播报无意义控件。 */
	"@angular-eslint/template/elements-content": "error",
	/** 具有交互语义的元素必须可聚焦，确保键盘导航能够到达。 */
	"@angular-eslint/template/interactive-supports-focus": "error",
	/** 表单 `label` 必须关联控件，扩大可点击区域并为辅助技术提供名称。 */
	"@angular-eslint/template/label-has-associated-control": "error",
	/** `mouseover` 和 `mouseout` 行为需要对应键盘焦点事件，保持输入方式等价。 */
	"@angular-eslint/template/mouse-events-have-key-events": "error",
	/** `autofocus` 会突然移动焦点并干扰读屏流程，默认禁止。 */
	"@angular-eslint/template/no-autofocus": "error",
	/** 禁止 `marquee`、`blink` 等干扰性元素，避免可读性和可访问性问题。 */
	"@angular-eslint/template/no-distracting-elements": "error",
	/** ARIA role 必须提供该角色要求的属性，避免声明不完整的语义。 */
	"@angular-eslint/template/role-has-required-aria": "error",
	/** `scope` 只能用于表头 `<th>`，避免在普通单元格上声明无效的表头范围。 */
	"@angular-eslint/template/table-scope": "error",
	/** ARIA 属性名和值必须有效，避免浏览器静默忽略错误语义。 */
	"@angular-eslint/template/valid-aria": "error",
} satisfies RuleOptions;
