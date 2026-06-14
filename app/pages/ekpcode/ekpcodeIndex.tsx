import React from "react";
import { ContentArea } from "~/components/ContentArea";
import { VersionRadio } from "~/components/ekpcode/versionRadio";
import {useState, useMemo} from "react";
import { Button, Label, TextInput, Textarea,Radio } from "flowbite-react";
import { EKPCodeUtils } from "~/lib/EKPCodeUtils";
import  type { EKPCodeResult } from "~/lib/EKPCodeUtils";
import { TextareaWithCopy } from "~/components/TextareaWithCopy";
export function Index() {
  // 生成的字段
  const [fields, setFields] = useState<string>("");
  const [ekpVersion, setEKPVersion] = useState<string>("v16");
  const [msgPrefix, setMsgPrefix] = useState<string>("");

  const result: EKPCodeResult = useMemo(() => {
    if(!fields || !msgPrefix) {
      return {
        modelCode: '',
        formCode: '',
        dataDictJson: '',
        hbmXml: '',
        properties: ''
      };
    };
    return EKPCodeUtils.generateCode(fields, msgPrefix);
  }, [ekpVersion, fields, msgPrefix]);
  return (
    <ContentArea title="EKP 代码生成">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* ekp 版本选择 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <VersionRadio selectedVersion={ekpVersion} onChange={setEKPVersion}/>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
               <div className="mb-2 block">
                  <Label htmlFor="field">模块前缀</Label>
                </div>
               <TextInput id="msgPrefix" name="msgPrefix" value={msgPrefix} 
               onChange = {(e) => {setMsgPrefix(e.target.value)}}
               className="w-full"required  />
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
               <div className="mb-2 block">
                  <Label htmlFor="field">需要生成的字段</Label>
                </div>
               <Textarea 
                    id="Fields" 
                    name="fields" 
                    rows={5}
                    className="w-full"
                    value={fields}
                    onChange={(e) => {setFields(e.target.value)}}
                    required 
                  />
            </div>
          </div>
      </div>
      <div className="resultDiv w-full mx-auto">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-2 block">
            <Label htmlFor="modelCode">model 文件内容</Label>
          </div>
          <TextareaWithCopy result={result.modelCode} rows={5} />
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-2 block">
            <Label htmlFor="formCode">form 文件内容</Label>
          </div>
          <TextareaWithCopy result={result.formCode} rows={5} />
        </div>
         <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-2 block">
            <Label htmlFor="modelCode">hbmXml 文件内容</Label>
          </div>
          <TextareaWithCopy result={result.hbmXml} rows={5} />
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-2 block">
            <Label htmlFor="modelCode">properties 文件内容</Label>
          </div>
          <TextareaWithCopy result={result.properties} rows={5} />
        </div>
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="mb-2 block">
            <Label htmlFor="modelCode">dataDict 文件内容</Label>
          </div>
          <TextareaWithCopy result={result.dataDictJson} rows={5} />
        </div>
      </div>
     
    </ContentArea>
  );
}