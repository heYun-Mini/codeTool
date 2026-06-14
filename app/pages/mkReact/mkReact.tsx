import { Button, Label, Textarea } from "flowbite-react";
import { useState, useMemo } from "react";

interface FieldConfig {
  fieldText: string;
  fieldName: string;
  fieldType: string;
  typeParam?: string;
}

interface LineConfig {
  fields: FieldConfig[];
  error?: string;
}

export function MkReact() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [generatedI18n, setGeneratedI18n] = useState<string>("");

  // 解析输入
  const parseInput = (text: string): LineConfig[] => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    const result: LineConfig[] = [];

    for (const line of lines) {
      const fieldsInLine = line.split(';').map(s => s.trim()).filter(s => s);
      const lineConfig: LineConfig = { fields: [] };

      if (fieldsInLine.length > 2) {
        lineConfig.error = `该行字段过多，最多支持2个字段，当前${fieldsInLine.length}个`;
        result.push(lineConfig);
        continue;
      }

      let hasError = false;
      for (const fieldStr of fieldsInLine) {
        const parts = fieldStr.split(':');
        
        if (parts.length < 3) {
          lineConfig.error = `字段格式错误：${fieldStr}（应为 "fieldText:fieldName:fieldType" 格式）`;
          hasError = true;
          break;
        }

        const [fieldText, fieldName, fieldTypeStr] = parts;

        if (!fieldText.trim()) {
          lineConfig.error = `"${fieldStr}" 字段缺少中文名`;
          hasError = true;
          break;
        }

        if (!fieldName.trim()) {
          lineConfig.error = `"${fieldStr}" 字段缺少程序名`;
          hasError = true;
          break;
        }

        // 解析fieldType和typeParam
        const fieldTypeMatch = fieldTypeStr.match(/^([^<]*)(?:<(.*)>)?$/);
        const fieldType = fieldTypeMatch?.[1]?.trim() || 'input';
        const typeParam = fieldTypeMatch?.[2]?.trim();

        // 校验fieldType和typeParam
        const validTypes = ['select', 'address', 'attachment', 'switch', 'datePicker', 'number', 'textArea', 'radio', 'tag', 'dynamicSelect', 'checkbox', 'input'];
        
        if (fieldType && !validTypes.includes(fieldType)) {
          lineConfig.error = `"${fieldStr}" 字段类型不合法：${fieldType}`;
          hasError = true;
          break;
        }

        // 校验typeParam
        if (fieldType === 'address' && typeParam) {
          const paramNum = parseInt(typeParam);
          if (isNaN(paramNum) || paramNum < 1 || paramNum > 255) {
            lineConfig.error = `"${fieldStr}" address类型的orgType参数应为1-255之间的数字`;
            hasError = true;
            break;
          }
        }

        if (fieldType === 'datePicker' && typeParam) {
          if (typeParam !== 'date' && typeParam !== 'dateTime') {
            lineConfig.error = `"${fieldStr}" datePicker类型的参数应为 date 或 dateTime`;
            hasError = true;
            break;
          }
        }

        lineConfig.fields.push({
          fieldText: fieldText.trim(),
          fieldName: fieldName.trim(),
          fieldType: fieldType || 'input',
          typeParam
        });
      }

      if (!hasError && lineConfig.fields.length === 0) {
        lineConfig.error = `解析行失败：${line}`;
      }

      result.push(lineConfig);
    }

    return result;
  };

  // 生成FormView属性
  const generateFormViewProps = (field: FieldConfig): string => {
    const { fieldType, typeParam } = field;
    const props: string[] = [];

    if (fieldType !== 'input') {
      props.push(`type={'${fieldType}'}`);
    }

    props.push(`mode={mode}`);

    if (fieldType === 'address' && typeParam) {
      props.push(`orgType={${typeParam}}`);
    }

    if (fieldType === 'datePicker') {
      if (typeParam === 'date') {
        props.push(`picker={'date'}`);
        props.push(`format='YYYY-MM-DD'`);
      } else if (typeParam === 'dateTime') {
        props.push(`showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}`);
        props.push(`format={'YYYY-MM-DD HH:mm:ss'}`);
      }
    }

    return props.join('\n    ');
  };

  // 生成rules属性
  const generateRules = (fieldType: string): string => {
    if (fieldType === 'input') {
      return 'getPleaseEnterRules()';
    }
    return 'getPleaseSelectRules()';
  };

  // 生成Grid.Col span
  const generateSpan = (lineFieldCount: number): number => {
    return lineFieldCount > 1 ? 12 : 24;
  };

  // 生成单个字段的代码
  const generateFieldCode = (field: FieldConfig, span: number): string => {
    const formViewProps = generateFormViewProps(field);
    const rules = generateRules(field.fieldType);

    return `<Grid.Col span={${span}}>
    <Form.Item  name='${field.fieldName}'
        label={fmtMsg(':common.columns.${field.fieldName}', '${field.fieldText}')}
        rules={${rules}()}>
        <FormView  ${formViewProps} />
    </Form.Item>
</Grid.Col>`;
  };

  // 处理生成
  const handleGenerate = () => {
    setError("");
    setGeneratedCode("");
    setGeneratedI18n("");

    if (!input.trim()) {
      setError("请输入字段配置");
      return;
    }

    const lines = parseInput(input);
    const errors: string[] = [];
    const codeLines: string[] = [];
    const i18nMap: Record<string, string> = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.error) {
        errors.push(`第 ${i + 1} 行：${line.error}`);
        continue;
      }

      if (line.fields.length === 0) {
        continue;
      }

      const span = generateSpan(line.fields.length);

      for (const field of line.fields) {
        codeLines.push(generateFieldCode(field, span));
        i18nMap[field.fieldName] = field.fieldText;
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    // 生成代码
    const code = codeLines.join('\n\n');
    setGeneratedCode(code);

    // 生成i18n配置
    const i18nLines = Object.entries(i18nMap).map(
      ([key, value]) => `"${key}": "${value}",`
    );
    setGeneratedI18n(i18nLines.join('\n'));
  };

  // 清空
  const handleReset = () => {
    setInput("");
    setError("");
    setGeneratedCode("");
    setGeneratedI18n("");
  };

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h5 className="mb-4">React 表单代码生成工具</h5>
        <p className="text-sm text-gray-600 mb-4">
          输入格式: fieldText:fieldName:fieldType&lt;typeParam&gt; (通过 ; 分隔同行字段，通过换行分隔不同行)
        </p>

        <div className="flex flex-col gap-6">
          {/* 输入表单 */}
          <div className="w-full">
            <div className="mb-4 w-full">
              <div className="mb-2 block">
                <Label htmlFor="input">字段配置输入</Label>
              </div>
              <Textarea
                id="input"
                name="input"
                rows={8}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full"
                placeholder={`姓名:fdName:\n备注:fdRemark:;创建时间:fdCreateTime:datePicker<dateTime>\n创建人:fdCreateUser:address<8>`}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="button" onClick={handleGenerate} color="blue">
                生成代码
              </Button>
              <Button type="button" onClick={handleReset} color="gray">
                清空
              </Button>
            </div>
          </div>

          {/* React 代码结果 */}
          {generatedCode && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <Label>生成的 React 代码</Label>
                <button
                  onClick={() => copyToClipboard(generatedCode)}
                  className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                >
                  复制
                </button>
              </div>
              <Textarea
                readOnly
                value={generatedCode}
                rows={10}
                className="bg-gray-50 font-mono text-sm w-full"
              />
            </div>
          )}

          {/* 多语言配置 */}
          {generatedI18n && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <Label>多语言配置</Label>
                <button
                  onClick={() => copyToClipboard(generatedI18n)}
                  className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                >
                  复制
                </button>
              </div>
              <Textarea
                readOnly
                value={generatedI18n}
                rows={6}
                className="bg-gray-50 font-mono text-sm w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
