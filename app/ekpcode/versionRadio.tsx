
import { Label, Radio } from "flowbite-react";

export function VersionRadio() {
  return (
    <div>
        <div className="mb-2 block">
            <Label htmlFor="input-info" color="info" >版本</Label>
        </div>
      <div className="flex max-w-md flex-col gap-4">
        <div className="flex items-center gap-2">
            <Radio id="v16" name="countries" value="v16" defaultChecked />
            <Label htmlFor="v16">v16及以下</Label>
        </div>
        <div className="flex items-center gap-2">
            <Radio id="v17" name="countries" value="v17" />
            <Label htmlFor="v17">v17</Label>
        </div>
      </div>
    </div>
    
  );
}
