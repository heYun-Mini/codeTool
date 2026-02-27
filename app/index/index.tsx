export function Index() {
  return (
    <main className="w-full p-6">
      <div className="max-w-6xl mx-auto">
        {/* 头部标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            欢迎使用 codeTool 代码生成工具
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            一站式代码生成解决方案，支持 EKP 代码生成、文本处理等多种功能，
            提升开发效率，简化重复性工作。
          </p>
        </div>

        {/* 功能卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* EKP 代码生成卡片 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">EK</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">EKP 代码生成</h3>
            </div>
            <p className="text-gray-600 mb-4">
              自动生成 EKP 相关代码，支持多种版本选择，提高开发效率。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                代码生成
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                版本管理
              </span>
            </div>
          </div>

          {/* 文本切割处理卡片 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">TX</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">文本切割处理</h3>
            </div>
            <p className="text-gray-600 mb-4">
              智能文本分割和处理工具，支持多种格式转换和批量操作。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                文本处理
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                批量操作
              </span>
            </div>
          </div>

          {/* 开发工具卡片 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">DV</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">开发工具集</h3>
            </div>
            <p className="text-gray-600 mb-4">
              集成多种实用开发工具，持续更新更多功能模块。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                工具集合
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                持续更新
              </span>
            </div>
          </div>
        </div>

        {/* 使用指南区域 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">快速开始</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">选择功能</h3>
              <p className="text-gray-600 text-sm">
                在左侧导航栏中选择需要的功能模块
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">配置参数</h3>
              <p className="text-gray-600 text-sm">
                根据需求填写相应的配置信息
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">生成代码</h3>
              <p className="text-gray-600 text-sm">
                点击生成按钮获取所需代码
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

