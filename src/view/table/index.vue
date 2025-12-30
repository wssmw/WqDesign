<template>
  <div>
    <Table :data="tableData" :columns="columns">
      <template #columns-status="{ row, column, $index }">
        <h1>
          {{ row }}
        </h1>
      </template>
    </Table>
  </div>
</template>
<script setup>
import { Table } from '../../../packages/components/index'
const columns = [
  {
    label: '明细',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: 'test',
    render: ({ row, h }) => {
      console.log(row)
      return h('span', row.status)
    },
  },
]
const tableData = [
  {
    name: '123',
    age: 123,
    status: 'test',
  },
  {
    name: '123',
    age: 123,
    status: 'test',
  },
  {
    name: '123',
    age: 123,
    status: 'test',
  },
  {
    name: '123',
    age: 123,
    status: 'test',
  },
]
</script>
<style scoped lang="scss"></style>
