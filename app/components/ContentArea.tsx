import React from "react";

interface ContentAreaProps {
  title?: string;
  children: React.ReactNode;
}

export function ContentArea({ title = "请选择功能", children }: ContentAreaProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部标题栏 */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}

// 默认欢迎内容
export function WelcomeContent() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
      
        <div className="grid grid-cols-1 gap-4 text-left">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800">EKP代码生成</div>
            </div>
          </div>
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-800">文本切割处理</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}