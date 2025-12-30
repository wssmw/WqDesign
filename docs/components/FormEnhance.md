# FormEnhance 表单增强组件

FormEnhance 是一个基于 Element Plus 的表单组件增强封装，提供了更便捷的表单操作和数据处理能力。

## 基础用法

<preview path="../demos/components/FormEnhance/basic.vue" title="基础用法" description="FormEnhance 组件的基础用法，包含输入框、数字输入框、选择器、时间选择器和开关"></preview>

## 动态显示
FormEnhance 组件支持通过linking字段判断当前表单显示与隐藏。

### linking字段


每个linking可以接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| `key` | 根据那个字段进行判断 | String |
| `value` | key对应的取值,当value等于key时,会执行linkingType对应的显隐 | any |
| `linkingType` | 整个表单数据对象 | ['show','hidden'] |

<preview path="../demos/components/FormEnhance/linking.vue" title="动态显示" description="FormEnhance 组件支持通过linking字段判断当前表单显示与隐藏。"></preview>

## 插槽使用

FormEnhance 组件支持通过插槽自定义表单项的内容。插槽名称对应 `formConfig` 中每个表单项的 `key` 值。

### 插槽参数

每个插槽可以接收以下参数：

| 参数名 | 说明 | 类型 |
|--------|------|------|
| `info` | 当前表单项的配置对象 | Object |
| `modelValue` | 当前字段的值 | Any |
| `model` | 整个表单数据对象 | Object |

### 使用说明

1. **完全自定义表单项**: 当你使用插槽时，会完全替换掉默认的表单项组件。你需要自己处理 `el-form-item` 和表单验证。

2. **子组件插槽传递**: 对于所有表单项类型，可以使用 `字段名-插槽名` 的命名方式来传递插槽到子组件。例如：
   - `username-prepend` -> 传递给子组件的 `prepend` 插槽
   - `username-append` -> 传递给子组件的 `append` 插槽
   - `date1-prefix-icon` -> 传递给子组件的 `prefix-icon` 插槽
   - 以此类推，支持任意子组件支持的插槽名
   
   这种方式不会完全替换表单项，只是将插槽内容传递给子组件内部的 Element Plus 组件。

### 使用示例

<preview path="../demos/components/FormEnhance/slot-usage.vue" title="插槽使用示例" description="FormEnhance 组件插槽使用的完整示例，包含完全自定义表单项、自定义 Select 选项、使用 slot 类型等多种用法"></preview>

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue / v-model | 表单数据对象（双向绑定） | Object | {} |
| operateType | 当前表单类型 | String | edit  ['edit', 'view', 'search'] |
| formConfig | 表单项配置数组 | Array | [] |
| rules | 表单项配置校验规则 | Array | [] |
| label-width | 标签宽度 | String | '100px' |
| label-position | 标签位置 | String | 'right' |
| size | 表单尺寸 | String | 'default' |
| submitVoid | 表单提交内容是否包含空字符 | Boolean | 'true' |
| submitShow | 是否显示提交按钮 | Boolean | 'true' |
| submitPosition | 提交按钮位置 | Boolean | 'bottom' ['top', 'bottom'] |
| submitText | 提交按钮文案 | String | 提交 |
| submitShape | 提交按钮是否为圆角按钮 | Boolean | false |
| resetShow | 是否显示重置按钮 | Boolean | true |
| resetText | 重置按钮文案 | String | 重置 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 表单提交事件 | formData: 表单数据对象 |
| update:modelValue | v-model 更新事件 | formData: 表单数据对象 |
| change | 表单项值变化事件 | formData: 表单数据对象 |
| on-enter | 输入框回车事件 | formData: 表单数据对象 |
| on-clear | 输入框清空事件 | formData: 表单数据对象 |


### 暴露的方法和属性

通过 ref 可以访问以下方法和属性：

| 方法/属性 | 说明 | 返回值/类型 |
|-----------|------|-------------|
| `submitForm()` | 提交表单 | Promise |
| `resetForm()` | 重置表单 | void |
| `validate()` | 验证表单 | Promise |
| `clearValidate()` | 清除验证 | void |


## 通用表单项配置

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
- textarea: 文本域
- password: 密码

- date: 时间
- daterange: 时间段
- datetime: 时间(带时分秒)
- datetimerange: 时间段(带时分秒)
- year: 年
- month: 月
- week: 星期

- select: 选择器
- switch: 开关
- radio: 单选框
- checkbox: 多选框
- upload: 上传
- hr: 换行
- slot: 自定义插槽类型（需要提供对应的插槽）


## 特殊表单项配置
详情请看element-plus中对应的参数