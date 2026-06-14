# 需求

实现一个工具页面，功能是根据字段中文名（fieldText）、程序名（fieldName）、字段类型(fieldType)，一行还是半行 生成对应的react代码。
react代码示例：

```tsx
<Grid.Col span={12}>
    <Form.Item
        name='fdContacts'
        label={fmtMsg(':common.columns.customerContact', '客户联系人')}
        rules={getPleaseEnterRules()}  >
        <FormView mode={mode} />
    </Form.Item>
</Grid.Col>
```

`Grid.Col`属性：`span`为网格宽度，12为半行，24为一行，这两个数是固定值，默认值为12。
`Form.Item`属性：`name`为表单字段的名称（程序名），用于绑定表单数据。`label`为表单字段的标签，用于显示在表单中，内部的`fmtMsg(':common.columns.customerContact', '客户联系人')`为多语言函数，key值格式固定，为`':common.columns.字段名'`，value值为字段中文名。`rules`为必填校验，分为请选择（getPleaseEnterRules()）和请输入（getPleaseSelectRules()）两种类型，所有字段都加上这个属性，为input类型是为‘请输入’，其他类型为'请选择'

`FormView`为封装后的表单控件，用于渲染表单字段。`mode`属性默认不动，无需处理。
`type`属性组件类型，包含：

1. select-下拉选择
2. address-地址选择
3. attachment-附件上传
4. switch-开关
5. datePicker-日期选择
6. number-数字输入
7. textArea-多行文本
8. radio-单选框
9. tag-标签选择
10. dynamicSelect-动态下拉选择
11. checkbox-复选框
12. input-普通文本输入，为默认值

当type为`address`时，有组织架构类型属性`orgType`，值为数字类型，1：机构，2：部门，4：岗位，8：人员，16：群组，128：公共岗，支持位运算，例如希望获取机构或部门则可以传递 1 | 2（=3）、获取所有类型则可以传递 1 | 2 | 4 | 8 （=15）
为`datePicker`时，又可以分为日期选择（date）和日期时间选择（dateTime），为日期选择时可固定为

```tsx
<FormView
    type={'datePicker'}
    mode={mode}
    picker={'date'}
    format='YYYY-MM-DD'/>
```

为日期时间时可固定为

```tsx
<FormView type={'datePicker'} mode={mode}
    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
    format={'YYYY-MM-DD HH:mm:ss'} />
```

其他组件类型暂时固定只传type、mode属性，默认为`input`类型，所以为`input`类型时，可不传`type`属性。

除了生成React代码外，还需要生成对应的多语言配置项，key值程序名，value为中文名，示例：`"remark": "备注",` ，当有多个字段时，例如名字，备注、编号，则为

```text
"remark": "备注",
"title": "标题",
"applicationNumber": "申请编号",
```

用户输入的基础格式为： `fieldText:fieldName:fieldType<typeParam>`，如果fieldType为空，则默认为`input`类型,此时的输入为： `fieldText:fieldName:`,
通过`;`分隔多个字段，例如

```text
姓名:fdName:
备注:fdRemark:;创建时间:fdCreateTime:datePicker<dateTime>
创建人:fdCreateUser:address<8>
```

那么姓名就独立为一行，备注和创建时间就为一行（通过`;`分隔），创建人也独立就为一行,行与行通过换行符区分，通常而言，一行最多有两个字段，因此，如果输入超出限制，则提示用户输入错误。注意`备注:fdRemark:;`中的`:;`表达，fieldType为空，但是`:`不可忽略，对输入的校验结果直接在react代码输入中显示，也就是校验成功则输入react片段代码，失败则显示失败内容，例如输入`备注:fdRemark;创建时间:fdCreateTime:datePicker<dateTime>`，则‘备注’字段会校验失败，提示`“备注”字段缺少组件类型`，对所有字段进行全量校验后才统一输入所有错误。

注意：

1.直接输出代码即可，无需预览
2.没有样式要求，因为组件是封装后的，开发人员复制生成的代码后再进一步调整
3.添加一个确认生成按钮，点击后校验用户输入，校验通过后，生成react代码，因为实时根据用户输入会频繁触发校验