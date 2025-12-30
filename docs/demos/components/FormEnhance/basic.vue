<template>
  <FormEnhance
    v-model="formData"
    :formConfig="formConfig"
    @submit="submitHandle"
    @on-enter="enterHandle"
    @on-clear="clearHandle"
  >
  </FormEnhance>
  <el-button @click="() => console.log(formData, 'aa')">点击</el-button>
</template>

<script setup>
import { ref } from 'vue'
const formData = ref({})
// 表单配置
const formConfig = [
  // 活动名称
  {
    key: 'name',
    type: 'input',
    label: '活动名称',
    placeholder: '请输入活动名称',
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  },
  // 活动形式
  {
    key: 'desc',
    type: 'textarea',
    label: '活动形式',
    placeholder: '请输入活动形式',
    rules: [{ required: true, message: '请输入活动形式', trigger: 'blur' }],
  },
  {
    key: 'password',
    type: 'password',
    label: '密码',
    placeholder: '请输入密码',
    rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  },

  // 活动区域
  {
    key: 'region',
    type: 'select',
    label: '活动区域',
    placeholder: '请选择活动区域',
    options: [
      { label: '线下主题活动', value: '线下主题活动' },
      { label: '单纯品牌曝光', value: '单纯品牌曝光' },
    ],
    rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
  },

  // 活动时间 (日期+分隔符+时间)
  {
    key: 'date1',
    type: 'date',
    label: '活动时间',
    placeholder: '选择日期',
    rules: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
  },
  {
    key: 'date2',
    type: 'daterange',
    label: '活动时间',
    placeholder: '选择日期',
    rules: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
  },
  {
    key: 'date3',
    type: 'datetimerange',
    label: '活动时间',
    placeholder: '选择日期',
    rules: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
  },

  // 即时配送
  {
    key: 'delivery',
    type: 'switch',
    label: '即时配送',
  },

  // 活动性质
  {
    key: 'type',
    type: 'checkbox',
    label: '活动性质',
    options: [
      { label: '美食/餐厅线上活动', value: '美食/餐厅线上活动' },
      { label: '地推活动', value: '地推活动' },
      { label: '线下主题活动', value: '线下主题活动' },
      { label: '单纯品牌曝光', value: '单纯品牌曝光' },
    ],
    rules: [{ required: true, message: '请选择活动性质', trigger: 'blur' }],
  },
  // 特殊资源
  {
    key: 'resource',
    type: 'radio',
    label: '特殊资源',
    options: [
      { label: '线上品牌商赞助', value: '线上品牌商赞助' },
      { label: '线下场地免费', value: '线下场地免费' },
    ],
    rules: [{ required: true, message: '请选择', trigger: 'blur' }],
  },
  {
    key: 'upload',
    type: 'upload',
    label: '上传文件',
    showPreview: true,
    listType: 'picture-card',
  },
]
const submitHandle = (val) => {
  console.log(val, 'submit')
}
const enterHandle = (val) => {
  console.log(val, 'enter')
}
const clearHandle = (val) => {
  console.log(val, 'clear')
}
</script>
