# ExampleComponent 组件

`ExampleComponent` 是一个示例组件，用于展示Vue组件的开发和使用方式。

## Props

| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `text` | `String` | `''` | 显示的文本内容 |

## 事件

| 事件名 | 参数 | 描述 |
| --- | --- | --- |
| `click` | `event` | 点击事件 |

## 插槽

| 插槽名 | 描述 |
| --- | --- |
| `default` | 默认插槽内容 |

## 示例代码

```vue
<template>
  <div class="demo-container">
    <ExampleComponent v-model:text="text" @click="handleClick">
      <p>{{ slotContent }}</p>
    </ExampleComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('Hello World')
const slotContent = ref('这是插槽内容')

function handleClick(event) {
  console.log('Clicked:', event)
}
</script>

<style>
.demo-container {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>