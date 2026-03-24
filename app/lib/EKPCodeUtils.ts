export interface EKPCodeResult{
    modelCode: string;
    formCode: string;
    dataDictJson: string;
    hbmXml: string;
    properties: string;
}
export class EKPCodeUtils {
    static generateCode(fields: string, msgPrefix: string): EKPCodeResult {
        const fieldList = fields.split("\n");
        return {
            modelCode: this.generateModelCode(fieldList),
            formCode: this.generateFormCode(fieldList),
            dataDictJson: this.generateDataDictJsonCode(fieldList, msgPrefix),
            hbmXml: this.generateHbmXmlCode(fieldList),
            properties: this.generateProperties(fieldList, msgPrefix),  
        }
    }
    
    /**
     * 生成model 类文件中的代码，包含 字段定义、set get方法，getToFormPropertyMap() 方法中的代码
     * @param fieldList  字段列表，每行一个字段，依次为：字段名 类型 注释
     */
    static generateModelCode(fieldList: string[]): string {
        let result = "";
        let setAndGet = ""
        let convertorCode = ""
        fieldList.forEach(item=>{
            const fieldItemArr = item.split("=");
            result += `// ${fieldItemArr[2]}\n`+
                       `private ${this.getModelNameByModelPath(fieldItemArr[1])} ${fieldItemArr[0]};\n`;
            setAndGet += this.generateSetAndGet(fieldItemArr[0], this.getModelNameByModelPath(fieldItemArr[1]), fieldItemArr[2]);
            convertorCode += this.getModelToFormPropertyCode(fieldItemArr[0], this.getModelNameByModelPath(fieldItemArr[1]))
        })
        result += setAndGet;
        result += convertorCode;
        return result;
    }
    /**
     * 生成Form表单中的代码内容
     * @param fields 
     * @returns 
     */
    static generateFormCode(fieldList: string[]): string {
        let result = "";
        let setAndGet = ""
        let convertorCode = ""
        fieldList.forEach(item=>{
            const fieldItemArr = item.split("=");
            result += `// ${fieldItemArr[2]}\n`+
                       `private String ${fieldItemArr[0]};\n`;
            setAndGet += this.generateSetAndGet(fieldItemArr[0], "String", fieldItemArr[2]);
            convertorCode += this.getFormToModelPropertyCode(fieldItemArr[0], this.getModelNameByModelPath(fieldItemArr[1]))
        })
        result += setAndGet;
        result += convertorCode;
        result += this.getResetMethodCode(fieldList);
        return result;
    }
    /** 生成 set 和 get 方法 */
    static generateSetAndGet  (property: string, type: string, annotation: string): string {
        return `/** ${annotation} */\n`+
                `public ${type} get${this.UppercaseFirst(property)}(){\n`+
                    `return this.${property};\n`+
                `}\n`+
                `/** ${annotation} */\n`+
                `public void set${this.UppercaseFirst(property)}(${type} ${property}){\n`+
                    `this.${property} = ${property};\n`+
                `}\n`;

    }
   
    /**
     * 生成  FormToModelPropertyMap getToModelPropertyMap() (form 转 model )方法中的代码
     */
    static getFormToModelPropertyCode(property :string,fieldType: string): string {
       if(fieldType=="Date"){
            return `toModelPropertyMap.put("${property}",new FormConvertor_Common("${property}").setDateTimeType(DateUtil.TYPE_DATE));\n`;
        }else if(!this.checkPropertyIsSimpleType(fieldType)){
            return  `toModelPropertyMap.put("${property}Id", new FormConvertor_IDToModel("${property}",${fieldType}.class));\n`;
        }
        return "";
    }
    /**
     * 生成  ModelToFormPropertyMap getToFormPropertyMap() (model 转 form )方法中的代码
     */
    static getModelToFormPropertyCode(property :string,fieldType: string): string {
       if(fieldType=="Date"){
            return `toFormPropertyMap.put("${property}",new ModelConvertor_Common("${property}").setDateTimeType(DateUtil.TYPE_DATE));\n`;
        }else if(!this.checkPropertyIsSimpleType(fieldType)){
            return  `toFormPropertyMap.put("${property}.fdName", new ModelConvertor_Common("${property}Name"));\n`+
                    `toFormPropertyMap.put("${property}.fdId", "${property}Id");\n`;
        }
        return "";
    }
    /**
     * 生成 reset 方法中的代码
     */
    static getResetMethodCode(fieldList:String[]): string{
        let result = ""
        fieldList.forEach(item=>{
            result +=  `this.${item} = null;\n`
        })
        return result;
    }
    static generateDataDictJsonCode(fieldList: string[], msgPrefix: string): string {
        const lines: string[] = [];

        for (const item of fieldList) {
            const [fieldName, fieldType, fieldComment] = item.split('=');
            if (!fieldName || !fieldType || !fieldComment) continue; // 容错

            const column = this.camelToSnake(fieldName);
            const isSimple = this.checkPropertyIsSimpleType(fieldType);

            let fieldStr = `        "${fieldName}": {\n`;

            if (isSimple) {
                fieldStr += `            "propertyType": "simple",\n`;
                fieldStr += `            "type": "${fieldType}",\n`;
            
                if (fieldType === 'String') {
                fieldStr += `            "length": "500",\n`;
                fieldStr += `            "defaultValue": "",\n`;
                }
            }else{
                fieldStr += `            "propertyType": "model",\n`;
                fieldStr += `            "type": "${fieldType}",\n`;
            }

            // 通用属性（无论是否 simple 都添加）
            fieldStr += `            "messageKey": "${msgPrefix}.${fieldName}",\n`;
            fieldStr += `            "column": "${column}",\n`;
            fieldStr += `            "notNull": "true",\n`;
            fieldStr += `            "validate": "true",\n`;
            fieldStr += `            "canDisplay": "true",\n`;
            fieldStr += `            "readOnly": "false",\n`;
            fieldStr += `            "canRelation": "true",\n`;
            fieldStr += `            "canSearch": "true"\n`;
            fieldStr += `        }`;

            lines.push(fieldStr);
        }

        return lines.join(',\n') + '\n';
    }
    /**
     * 根据字段列表生成 Hibernate HBM XML 的 property / many-to-one 片段
     */
    static generateHbmXmlCode(propertyList: string[]): string {
        const lines: string[] = [];

        for (const item of propertyList) {
            const [fieldName, fieldType, fieldComment] = item.split('=');
            if (!fieldName || !fieldType) continue;

            const column = this.camelToSnake(fieldName); 

            if (this.checkPropertyIsSimpleType(fieldType)) {
            // 普通类型（包括 String）
            let prop = `    <property \n` +
                        `            name="${fieldName}" \n` +
                        `            column="${column}" \n` +
                        `            update="true" \n` +
                        `            insert="true"`;

            // 如果是 String，添加 length
            if (fieldType === 'String') {
                prop += `\n            length="200"`;
            }

            prop += '/>';
            lines.push(prop);
            } else {
            // 非简单类型：视为多对一关联
            const columnWithId = `${column}_id`; // 通常外键字段加 _id 后缀
            const manyToOne = `    <many-to-one \n` +
                                `            name="${fieldName}" \n` +
                                `            column="${columnWithId}" \n` +
                                `            update="true" \n` +
                                `            insert="true"/>`;
            lines.push(manyToOne);
            }
        }
        return lines.join('\n') + '\n';
    }
    static generateProperties(propertyList: string[], msgPrefix: string): string {
        const lines: string[] = [];
        const prefix = msgPrefix.split(":")[1]
        for (const item of propertyList) {
            const [fieldName, fieldType, fieldComment] = item.split('=');
            lines.push(`${prefix}.${fieldName}=${fieldComment}`);
        }
        return lines.join('\n');
    }
    /** 将字段名字的首字母大写，示例：fdType -> FdType*/
    static UppercaseFirst  (str: string): string  {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * 将小驼峰命名（camelCase）转换为下划线命名（snake_case）*/
    static camelToSnake(str: string): string {
        return str.replace(/([A-Z])/g, '_$1').toLowerCase();
    }

    /**
     * 将下划线命名（snake_case）转换为小驼峰（camelCase） */
    static snakeToCamel(str: string): string {
        return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    }
    /** 检查字段类型是否为Date、String、Integer、Boolean、Double 简单类型，如果是，则返回true */
    static checkPropertyIsSimpleType(fieldType:string) :boolean{
        return fieldType === "Date" || fieldType === "String" 
            || fieldType === "Integer" || fieldType === "Boolean"
            || fieldType === "Double";
    }
    /** 根据模型路径获取模型名称 */
    static getModelNameByModelPath(modelPath: string): string {
        const modelPathArr = modelPath.split(".");
        return modelPathArr[modelPathArr.length - 1];
    }
}
