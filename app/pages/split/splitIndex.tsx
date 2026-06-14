import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useState, useMemo } from "react";
import { TextareaWithCopy } from "~/components/TextareaWithCopy";

export function SplitIndex() {
  //  // 1. 定义状态
  const [originalText, setOriginalText] = useState<string>("");
  const [leftPad, setLeftPad] = useState<string>("");
  const [rightPad, setRightPad] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>("");
  const [shouldTrim, setShouldTrim] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // 2. 处理提交函数
  const result =useMemo<string>(() => {
    setError(""); 
    try {
      if(delimiter ===  '\\n'){
        setDelimiter('\n');
      }
      let items = originalText.split(delimiter);
      
      if (shouldTrim) {
        items = items.map(item => item.trim());
      }
      
      const processedItems = items.map(item => {
        return `${leftPad || ''}${item}${rightPad || ''}`;
      });
      
      return (processedItems.join('\n'));
      
    } catch (err) {
      setError("处理过程中出现错误");
      return "";
    }
  },[originalText, leftPad, rightPad,delimiter,shouldTrim]);
  // 一键清空所有表单字段
  const formReset = () =>{
    setOriginalText("")
    setDelimiter("");
    setLeftPad("");
    setRightPad(""); 
    setShouldTrim(true)
    setError("");
  }
  return (
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h5>按分隔符切割文本并批量添加前后缀</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：表�?*/}
            <div>
                {/* 原始文本 */}
                <div className="mb-4 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="originalText">原始文本</Label>
                  </div>
                  <Textarea 
                    id="originalText" 
                    name="originalText" 
                    value={originalText}
                    onChange={(e)=>{setOriginalText(e.target.value)}}
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
                    value={leftPad}
                    onChange={(e)=>{setLeftPad(e.target.value)}}
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
                    value={rightPad}
                    onChange={(e)=>{setRightPad(e.target.value)}} 
                    type="text" 
                  />
                </div>

                {/* 切割符 */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="delimiter">切割符(用\n表示换行)</Label>
                  </div>
                  <TextInput 
                    id="delimiter" 
                    name="delimiter" 
                    value={delimiter}
                    onChange={(e)=>{setDelimiter(e.target.value)}}
                    type="text" 
                    required 
                  />
                </div>

                {/* 选项：去除空格 */}
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="shouldTrim" 
                    name="shouldTrim" 
                    value={shouldTrim ? "on" : ""}
                    onChange={(e)=>{setShouldTrim(e.target.checked)}}
                  />
                  <Label htmlFor="trim">去除首尾空格与换行符</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={formReset} color="gray">
                    清空
                  </Button>
                </div>
            </div>

            {/* 右侧：结果显示?*/}
            <div className="flex flex-col h-full">
              <div className="mb-2 block">
                <Label>处理结果</Label>
              </div>
              <TextareaWithCopy result={result} rows={12} />
            </div>
          </div>
        </div>
      </div>
  );
}

