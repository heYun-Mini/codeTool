import React from "react";
import { ContentArea } from "../components/ContentArea";

export function Index() {
  return (
    <ContentArea title="EKP代码生成">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">EKP代码生成工具</h2>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3">版本选择</h3>
              <p className="text-gray-600 text-sm">
                选择合适的EKP版本进行代码生成
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-3">参数配置</h3>
              <p className="text-gray-600 text-sm">
                配置生成代码所需的各项参数
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentArea>
  );
}
