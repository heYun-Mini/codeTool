import { Link, useResolvedPath, useMatch } from "react-router";
import type { NavItem } from "~/lib/data/navigation";
import { navigation } from "~/lib/data/navigation";

interface NavItemProps {
  item: NavItem;
}

function NavigationItem({ item }: NavItemProps) {
  const resolved = useResolvedPath(item.href);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={item.href}
      className={`block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        match ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
        </div>
      </div>
    </Link>
  );
}

export function NavigationPanel() {
  return (
    <div className="h-full flex flex-col">
      {/* 搜索框区域 */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索功能..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
        </div>
      </div>
      
      {/* 导航列表 - 设置最大高度并允许滚动 */}
      <div className="flex-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavigationItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}