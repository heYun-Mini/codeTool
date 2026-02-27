import { Outlet, Scripts, ScrollRestoration } from "react-router";

//  # 微信风格布局（左侧导航 + 右侧内容）

export default function RootLayout() {
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
            {/* 顶部搜索/标题区域 */}
            <div className="p-4 border-b border-gray-200">
              <div className="text-lg font-semibold text-gray-800">codeTool</div>
              <div className="text-xs text-gray-500 mt-1">代码生成工具平台</div>
            </div>
            
            {/* 导航列表区域 */}
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
          
          {/* 右侧内容区域 - 需要留出左侧导航栏的空间 */}
          <div className="flex-1 ml-64 flex flex-col bg-gray-50 min-h-screen">
            {/* 内容区域占满剩余空间 */}
            <div className="flex-1 overflow-hidden">
              {/* 这里将显示具体的功能内容 */}
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}