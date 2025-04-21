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
  title: '',
  content: '',
  category: '',
  tags: []
})

const formConfig = {
  labelWidth: '120px',
  labelPosition: 'top',
  formItems: [
    {
      type: 'input',
      field: 'title',
      label: '文章标题',
      placeholder: '请输入文章标题',
      span: 24
    },
    {
      type: 'textarea',
      field: 'content',
      label: '文章内容',
      placeholder: '请输入文章内容',
      rows: 4,
      span: 24
    },
    {
      type: 'select',
      field: 'category',
      label: '文章分类',
      options: [
        { label: '技术', value: 'tech' },
        { label: '生活', value: 'life' },
        { label: '随笔', value: 'essay' }
      ],
      span: 12
    },
    {
      type: 'checkbox',
      field: 'tags',
      label: '文章标签',
      options: [
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
        { label: 'JavaScript', value: 'js' }
      ],
      span: 24
    }
  ],
  submitText: '提交',
  resetText: '重置',
  gutter: 20
}

const handleSubmit = (data) => {
  console.log('表单数据：', data)
}
</script> 