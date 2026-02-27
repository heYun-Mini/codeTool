import { Button, Label, TextInput, Textarea,Radio } from "flowbite-react";
import { useState } from "react";
import { useRef } from 'react';
import type { FormEvent } from "react";

export function AppendIndex() {
  // 1. 定义状态
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null); 
  // 2. 处理提交函数
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认刷新行为
    setError("");
    setResult("");

    const formData = new FormData(e.currentTarget);
    
    // 获取表单数据
    // 左/上内容
    const zsText = formData.get("zsText") as string;
    // 左/上切割符
    let zsDelimiter = formData.get("zsDelimiter") as string;
    // 右/下内容
    const yxText = formData.get("yxText") as string;
    // 右/下切割符
    let yxDelimiter = formData.get("yxDelimiter") as string;
    // 拼接模式 左右(zy) 上下(sx)
    const shouldTrim = formData.get("appendMode"); 
    try {
      if(zsDelimiter === '\\n'){
        zsDelimiter = '\n';
      }
      if(yxDelimiter === '\\n'){
        yxDelimiter = '\n';
      }
      const zsItems = zsText.split(zsDelimiter);
      const yxItems = yxText.split(yxDelimiter);
      const processedItems = shouldTrim === "zy" ? 
      zsItems.map((zsItem, index) => `${zsItem}${yxItems[index] || ''}`) 
      : zsItems.map((zsItem, index) => `${zsItem}\n${yxItems[index] || ''}`);
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" ref={formRef} >

                <div className="mb-4 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="zsText">左/上 内容</Label>
                  </div>
                  <Textarea 
                    id="zsText" 
                    name="zsText" 
                    rows={5}
                    className="w-full"
                    required 
                  />
                </div>
              
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="delimiter">切割符</Label>
                  </div>
                  <TextInput 
                    id="zsDelimiter" 
                    name="zsDelimiter" 
                    type="text" 
                    required 
                  />
                </div>
                <div className="mb-4 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="yxText">右/下 内容</Label>
                  </div>
                  <Textarea 
                    id="yxText" 
                    name="yxText" 
                    rows={5}
                    className="w-full"
                    required 
                  />
                </div>
              
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="yxDelimiter">切割符</Label>
                  </div>
                  <TextInput 
                    id="yxDelimiter" 
                    name="yxDelimiter" 
                    type="text" 
                    required 
                  />
                </div>
               <div className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
                <Radio id="united-state" name="appendMode" value="zy" defaultChecked />
                <Label htmlFor="united-state">左右拼接</Label>
            </div>
            <div className="flex items-center gap-2">
                <Radio id="germany" name="appendMode" value="sx" />
                <Label htmlFor="germany">上下拼接</Label>
            </div>
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
