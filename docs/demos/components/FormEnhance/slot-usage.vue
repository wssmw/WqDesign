<template>
  <FormEnhance :form-config="formConfig" :rules="rules" @submit="handleSubmit">
    <!-- 方式1: 完全自定义某个表单项的内容 -->
    <!-- 插槽名称对应 formConfig 中表单项的 key -->
    <!-- 注意：需要使用 model 参数来绑定数据，而不是外部的 formData -->
    <template #customField="{ info, model }">
      <el-form-item :label="info.label" prop="customField">
        <el-input v-model="model[info.key]" placeholder="这是完全自定义的内容">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </template>

    <!-- 方式2: 使用子组件插槽传递（适用于所有表单项类型） -->
    <!-- 插槽命名规则：字段名-插槽名，会自动传递给子组件内部的 Element Plus 组件 -->
    <!-- 例如：username-prepend 会传递给子组件的 prepend 插槽 -->
    <template #username-prepend>
      <el-icon><User /></el-icon>
    </template>
    <template #username-append>
      <el-button :icon="Search" circle />
    </template>
    <!-- 可以传递任意子组件支持的插槽，例如日期选择器的 prefix-icon -->
    <template #date1-prefix-icon>
      <el-icon><Calendar /></el-icon>
    </template>
  </FormEnhance>
</template>

<script setup>
import { Search, Calendar, User } from '@element-plus/icons-vue'

// 注意：FormEnhance 组件内部管理表单数据，不需要外部定义 formData
// 表单数据通过插槽的 model 参数访问

const formConfig = [
  {
    key: 'username',
    type: 'input',
    label: '用户名',
    placeholder: '请输入用户名',
  },

  {
    key: 'customField',
    type: 'input', // 即使类型是 input，也可以通过插槽完全替换
    label: '自定义字段',
  },
]

const rules = {
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
}

const handleSubmit = (data) => {
  console.log('表单提交数据：', data)
  // data 是处理后的表单数据，已经移除了不可见字段和空值（如果配置了）
}

const handleCustomAction = () => {
  console.log('自定义操作')
}
</script>
