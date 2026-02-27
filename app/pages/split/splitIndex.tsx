import { Button, Checkbox, Label, TextInput, Textarea, Alert } from "flowbite-react";
import { useState } from "react";
import { useRef } from 'react';
import type { FormEvent } from "react";

export function SplitIndex() {
  // 1. 定义状态
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null); // 👈 创建 ref
  // 2. 处理提交函数
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认刷新行为
    setError("");
    setResult("");

    const formData = new FormData(e.currentTarget);
    
    // 获取表单数据
    const originalText = formData.get("originalText") as string;
    const leftPad = formData.get("leftPad") as string;
    const rightPad = formData.get("rightPad") as string;
    let delimiter = formData.get("delimiter") as string;
    const shouldTrim = formData.get("trim") === "on"; // Checkbox 选中时为 "on"
    try {
      if(delimiter ===  '\\n'){
        delimiter = '\n';
      }
      let items = originalText.split(delimiter);
      
      if (shouldTrim) {
        items = items.map(item => item.trim());
      }
      
      const processedItems = items.map(item => {
        return `${leftPad || ''}${item}${rightPad || ''}`;
      });
      
      setResult(processedItems.join('\n'));
      
    } catch (err) {
      setError("处理过程中出现错误");
    }
  };
  // 一键清空所有表单字段
  const formReset = () =>{
    formRef.current?.reset();
    setResult("");
    setError("");
  }
  return (
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：表单 */}
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" ref={formRef} >
                
                {/* 原始文本 */}
                <div className="mb-4 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="originalText">原始文本</Label>
                  </div>
                  <Textarea 
                    id="originalText" 
                    name="originalText" 
                    rows={5}
                    className="w-full"
                    required 
                  />
                </div>

                {/* 左填充 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="leftPad">左填充内容</Label>
                  </div>
                  <TextInput 
                    id="leftPad" 
                    name="leftPad" 
                    type="text" 
                  />
                </div>

                {/* 右填充 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="rightPad">右填充内容</Label>
                  </div>
                  <TextInput 
                    id="rightPad" 
                    name="rightPad" 
                    type="text" 
                  />
                </div>

                {/* 切割符 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="delimiter">切割符</Label>
                  </div>
                  <TextInput 
                    id="delimiter" 
                    name="delimiter" 
                    type="text" 
                    required 
                  />
                </div>

                {/* 选项：去除空格 */}
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="trim" 
                    name="trim" 
                    defaultChecked
                  />
                  <Label htmlFor="trim">去除首尾空格与换行符</Label>
                </div>
                <div className="flex gap-2">
                  {/* 提交按钮 */}
                  <Button type="submit" color="blue" className="mt-2">
                    开始处理
                  </Button>
                  <Button type="button" onClick={formReset} color="gray">
                    清空
                  </Button>
                </div>
              </form>
            </div>

            {/* 右侧：结果显示 */}
            <div className="flex flex-col h-full">
              <div className="mb-2 block">
                <Label>处理结果</Label>
              </div>
      
              <div className="mb-4 w-full">
                <Textarea
                  readOnly
                  value={result}
                  rows={12}
                  className="bg-gray-50 font-mono text-sm w-full"
                />
                {result && (
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="absolute top-2 right-2 text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                  >
                    复制
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
