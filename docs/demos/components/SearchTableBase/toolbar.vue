<template>
  <search-table-base
    :columns="columns"
    :search-items="searchItems"
    :request="fetchData"
    :toolbar="toolbar"
    @add="handleAdd"
    @batch-delete="handleBatchDelete"
  />
</template>

<script setup>

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'gender', label: '性别' },
  { prop: 'address', label: '地址' }
]

const searchItems = [
  {
    type: 'input',
    field: 'name',
    label: '姓名',
    placeholder: '请输入姓名'
  }
]

const toolbar = {
  show: true,
  buttons: [
    {
      text: '新增',
      type: 'primary',
      icon: 'Plus',
      handler: 'add'
    },
    {
      text: '批量删除',
      type: 'danger',
      icon: 'Delete',
      handler: 'batchDelete'
    }
  ]
}

const fetchData = async (params) => {
  // 模拟数据
  return {
    list: [
      { id: 1, name: '张三', age: 25, gender: '男', address: '北京市' },
      { id: 2, name: '李四', age: 30, gender: '女', address: '上海市' }
    ],
    total: 2
  }
}

const handleAdd = () => {
  console.log('点击新增按钮')
}

const handleBatchDelete = (selection) => {
  console.log('批量删除', selection)
}
</script> 