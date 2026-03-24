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
  { title: "Split & Wrap", href: "/split" },
  { title: "文本拼接", href: "/append" },
  
  // 后续新增菜单只需在这里添加
];