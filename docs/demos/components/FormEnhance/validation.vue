<template>
  <form-enhance
    v-model="formData"
    :form-config="formConfig"
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import FormEnhance from '@wq-design/components/FormEnhance'

const formData = ref({
  username: '',
  email: '',
  phone: ''
})

const formConfig = {
  labelWidth: '100px',
  formItems: [
    {
      type: 'input',
      field: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      field: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ]
    },
    {
      type: 'input',
      field: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      rules: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ]
    }
  ],
  submitText: '提交',
  resetText: '重置'
}

const handleSubmit = (data) => {
  console.log('表单数据：', data)
}
</script> 