### verbatimModuleSyntax
```ts
// app\lib\data\navigation.ts 文件内容
// 定义导航项的类型（可选但推荐）
export interface NavItem {
  title: string;
  href: string;
  // 可扩展：icon?: React.ReactNode, requiredRole?: string 等
}

// 导出导航菜单数据
export const navigation: NavItem[] = [
  { title: "首页", href: "/" },
  { title: "ekp代码生成", href: "/ekpcode" },
  { title: "文本切割处理", href: "/split" },
  { title: "文本拼接", href: "/append" },
];
```
tsconfig.json 中启用了 "verbatimModuleSyntax": true 这个配置要求类型导入必须使用 import type 语法，原代码将类型 NavItem 和值 navigation 混合在一个导入语句中，违反了此规则<br/>
修复内容：
- 将类型导入分离：import type { NavItem } from "~/lib/data/navigation"
- 保持值导入不变：import { navigation } from "~/lib/data/navigation"


这样修复后，TypeScript 编译器就能正确区分类型和运行时值的导入，满足 verbatimModuleSyntax 的要求。