import { Button, Label, TextInput, Textarea,Radio } from "flowbite-react";
import { useState, useMemo } from "react";
import { useRef } from 'react';
export function AppendIndex() {
  // 1. 定义状态

  const [zsText, setZsText] = useState<string>("");
  const [yxText, setYxText] = useState<string>("");
  const [zsDelimiter, setZsDelimiter] = useState<string>("");
  const [yxDelimiter, setYxDelimiter] = useState<string>("");
  const [zsLeftPad, setZsLeftPad] = useState<string>("");
  const [zsRightPad, setZsRightPad] = useState<string>("");
  const [yxLeftPad, setYxLeftPad] = useState<string>("");
  const [yxRightPad, setYxRightPad] = useState<string>("");
  // 默认选择zy(左右拼接)
  const [appendMode, setAppendMode] = useState<string>("zy");
  const [error, setError] = useState<string>("");
  // 2. 处理提交函数
  const result = useMemo(() => {
    setError("");
    try {
      if(zsDelimiter === '\\n'){
        setZsDelimiter('\n');
      }
      if(yxDelimiter === '\\n'){
        setYxDelimiter('\n');
      }
      const zsItems = zsText.split(zsDelimiter);
      const yxItems = yxText.split(yxDelimiter);
      // {左}{字符串}{右}
      const processedItems = appendMode === "zy" ? 
      zsItems.map((zsItem, index) => `${zsLeftPad || ''}${zsItem}${zsRightPad || ''}${yxLeftPad || ''}${yxItems[index] || ''}${yxRightPad || ''}`) 
      : zsItems.map((zsItem, index) => `${zsLeftPad || ''}${zsItem}${zsRightPad || ''}\n${yxLeftPad || ''}${yxItems[index] || ''}${yxRightPad || ''}`);
      return (processedItems.join('\n'));
      
    } catch (err) {
      setError("处理过程中出现错误");
    }
  },[zsText, yxText, zsDelimiter, yxDelimiter, zsLeftPad, zsRightPad, yxLeftPad, yxRightPad, appendMode]);
  // 一键清空所有表单字段
  const formReset = () =>{
    setZsText("");
    setYxText(""); 
    setZsDelimiter("");
    setYxDelimiter("");
    setZsLeftPad("");
    setZsRightPad("");
    setYxLeftPad("");
    setYxRightPad("");
    setAppendMode("zy")
    setError("");
  }
  return (
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h5>将两段文本各自分割后，进行上下/左右拼接</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：表单 */}
            <div>
                <div className="mb-4 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="zsText">左/上 内容</Label>
                  </div>
                  <Textarea 
                    id="zsText" 
                    name="zsText" 
                    rows={5}
                    value={zsText}
                    onChange={(e) => setZsText(e.target.value)}
                    className="w-full"
                    required 
                  />
                </div>
              
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="delimiter">切割符(用\n表示换行)</Label>
                  </div>
                  <TextInput 
                    id="zsDelimiter" 
                    name="zsDelimiter" 
                    type="text" 
                    value={zsDelimiter}
                    onChange={(e) => setZsDelimiter(e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="zsLeftPad">左填充内容</Label>
                  </div>
                  <TextInput 
                    id="zsLeftPad" 
                    name="zsLeftPad" 
                    type="text" 
                    value={zsLeftPad}
                    onChange={(e) => setZsLeftPad(e.target.value)}
                  />
                </div>
                {/* 右填充 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="zsRightPad">右填充内容</Label>
                  </div>
                  <TextInput 
                    id="zsRightPad" 
                    name="zsRightPad" 
                    type="text" 
                    value={zsRightPad}
                    onChange={(e) => setZsRightPad(e.target.value)}
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
                    value={yxText}
                    onChange={(e) => setYxText(e.target.value)}
                  />
                </div>
              
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="yxDelimiter">切割符(用\n表示换行)</Label>
                  </div>
                  <TextInput 
                    id="yxDelimiter" 
                    name="yxDelimiter" 
                    type="text" 
                    required 
                    value={yxDelimiter}
                    onChange={(e) => setYxDelimiter(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="yxLeftPad">左填充内容</Label>
                  </div>
                  <TextInput 
                    id="yxLeftPad" 
                    name="yxLeftPad" 
                    type="text" 
                    value={yxLeftPad}
                    onChange={(e) => setYxLeftPad(e.target.value)}
                  />
                </div>

                {/* 右填充 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="yxRightPad">右填充内容</Label>
                  </div>
                  <TextInput 
                    id="yxRightPad" 
                    name="yxRightPad" 
                    value={yxRightPad}
                    onChange={(e) => setYxRightPad(e.target.value)} 
                    type="text" 
                  />
                </div>
                <div className="flex max-w-md flex-col gap-4">
                  <div className="flex items-center gap-2">
                      <Radio id="united-state" name="appendMode" value="zy" 
                      checked={appendMode === "zy"} onChange={(e) => setAppendMode(e.target.value)}  />
                      <Label htmlFor="united-state">左右拼接</Label>
                  </div>
                  <div className="flex items-center gap-2">
                      <Radio id="germany" name="appendMode" value="sx"
                      checked={appendMode === "sx"} onChange={(e) => setAppendMode(e.target.value)}  />
                      <Label htmlFor="germany">上下拼接</Label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={formReset} color="gray">
                    清空
                  </Button>
                </div>
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
