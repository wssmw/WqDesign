# FormEnhance 表单增强组件

FormEnhance 是一个基于 Element Plus 的表单组件增强封装，提供了更便捷的表单操作和数据处理能力。

## 基础用法

<preview path="../demos/components/FormEnhance/basic.vue" title="基础用法" description="FormEnhance 组件的基础用法，包含输入框、数字输入框、选择器、时间选择器和开关"></preview>

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| formData | 表单数据对象 | Object | - |
| formConfig | 表单项配置数组 | Array | [] |
| label-width | 标签宽度 | String | '100px' |
| label-position | 标签位置 | String | 'right' |
| size | 表单尺寸 | String | 'default' |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 表单提交事件 | formData: 表单数据对象 |
| reset | 表单重置事件 | - |
| change | 表单项值变化事件 | (field, value) |

## 表单项配置

每个表单项支持以下配置：

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 表单项类型 | String | - |
| key | 字段名 | String | - |
| label | 标签文本 | String | - |
| rules | 验证规则 | Array | [] |
| options | 选项数据（用于select等） | Array | [] |
| placeholder | 占位文本 | String | - |
| disabled | 是否禁用 | Boolean | false |
| required | 是否必填 | Boolean | false |

## 支持的表单项类型

- input: 输入框
- input-number: 数字输入框
- select: 选择器
- radio: 单选框
- checkbox: 多选框
- switch: 开关
- date-picker: 日期选择器
- time-picker: 时间选择器
- textarea: 文本域
- upload: 上传
- editor: 富文本编辑器
