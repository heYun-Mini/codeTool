import { Link, useResolvedPath, useMatch } from "react-router";
import { navigation } from "../lib/data/navigation";

interface SidebarLinkProps {
  to: string;
  children: React.ReactNode;
}

function SidebarLink({ to, children }: SidebarLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
        match
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <span className="font-medium">{children}</span>
    </Link>
  );
}

export function Sidebar() {
  const navigationWithIcons = navigation.map(item => ({
    ...item
  }));

  return (
    <aside className="w-64 bg-gray-800 min-h-screen flex flex-col">
      {/* 导航菜单 */}
      <nav className="flex-1 px-4 pt-2">
        <ul className="space-y-2">
          {navigationWithIcons.map((item) => (
            <li key={item.href}>
              <SidebarLink to={item.href}>
                {item.title}
              </SidebarLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* 底部空白占位 */}
      <div className="flex-1"></div>
    </aside>
  );
}