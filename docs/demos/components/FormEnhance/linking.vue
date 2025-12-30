<template>
  <FormEnhance
    v-model="formData"
    :formConfig="formConfig"
    @submit="submitHandle"
    @on-enter="enterHandle"
    @on-clear="clearHandle"
  >
  </FormEnhance>
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
    linking: {
      key: 'name',
      value: '123',
      linkingType: 'show',
    },
  },
  {
    key: 'test',
    type: 'input',
    label: 'test',
    placeholder: 'test',
    linking: {
      key: 'desc',
      value: '456',
      linkingType: 'hidden',
    },
  },
]
</script>
