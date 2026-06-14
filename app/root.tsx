import { Outlet, Scripts, ScrollRestoration, Link, useLocation } from "react-router";
import "./app.css";
import {useState} from "react";

interface NavItem {
  href: string;
  title: string;
}

const navigation: NavItem[] = [
  { href: "/ekpcode", title: "EKP 代码生成" },
  { href: "/split", title: "文本分割与填充" },
  { href: "/append", title: "文本拼接Pro" }
];

function NavigationItem({ item }: { item: NavItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  
  return (
    <Link
      to={item.href}
      className={`block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isActive ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
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

function NavigationPanel() {
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
      
      {/* 导航列表 */}
      <div className="flex-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavigationItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function RootLayout() {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClose = () => setIsOpen(false);
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>codeTool</title>
      </head>
      <body className="bg-gray-100">
        <div className="flex">
          {/* 左侧固定导航区域 */}
          <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col z-10">
            <NavigationPanel />
          </div>
          
          {/* 右侧内容区域 - 需要留出左侧导航栏的空间 */}
          <div className="flex-1 ml-64 flex flex-col bg-gray-50 min-h-screen">
            {/* 内容区域占满剩余空间 */}
            <div className="flex-1 overflow-auto p-6">
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}