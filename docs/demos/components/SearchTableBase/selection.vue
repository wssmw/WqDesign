<template>
  <search-table-base
    :columns="columns"
    :search-items="searchItems"
    :request="fetchData"
    selection
    @selection-change="handleSelectionChange"
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

const handleSelectionChange = (selection) => {
  console.log('选中的行：', selection)
}
</script> 