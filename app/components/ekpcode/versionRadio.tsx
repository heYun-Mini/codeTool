import { Label, Radio } from "flowbite-react";
// 定义 props 类型
interface VersionRadioProps {
  selectedVersion: string;        // 当前选中的值
  onChange: (value: string) => void; // 值变化时的回调 声明：我期望收到一个接收 string 并无返回值的函数
}
export function VersionRadio({ selectedVersion, onChange }: VersionRadioProps) {
  return (
    <div>
        <div className="mb-2 block">
            <Label htmlFor="input-info" color="info" >版本</Label>
        </div>
      <div className="flex max-w-md flex-col gap-4">
        <div className="flex items-center gap-2">
            <Radio id="v16" name="ekpVersion" value="v16"  
            checked={selectedVersion === "v16"} // 受控：由外部 state 决定是否选中
            onChange={() => onChange("v16")} />
            <Label htmlFor="v16">v16及以下</Label>
        </div>
        <div className="flex items-center gap-2">
            <Radio id="v17" name="ekpVersion" value="v17"
            checked={selectedVersion === "v17"}
            onChange={(e) => onChange(e.target.value)} />
            <Label htmlFor="v17">v17</Label>
        </div>
      </div>
    </div>
    
  );
}
