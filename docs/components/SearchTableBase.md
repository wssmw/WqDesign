# SearchTableBase 搜索表格组件

SearchTableBase 是一个集成了搜索表单和数据表格的组件，提供了常用的 CRUD 操作界面。

## 基础用法

<preview path="../demos/components/SearchTableBase/basic.vue" title="基础用法" description="SearchTableBase 组件的基础用法"></preview>

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| columns | 表格列配置 | Array | [] |
| searchFilterData | 搜索表单项配置 | Array | [] |
| request | 数据请求函数 | Function | - |
| operateData | 统一操作 | Array | {} |
| pagination | 分页配置 | Object | {} |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| add | 添加按钮点击事件 | - |
| edit | 编辑按钮点击事件 | row: 当前行数据 |
| delete | 删除按钮点击事件 | row: 当前行数据 |
| selection-change | 多选变化事件 | selection: 选中的行数据 |
| search | 搜索事件 | formData: 搜索表单数据 |
| reset | 重置事件 | - |


