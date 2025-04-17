# 快速开始

## 安装

### 使用 npm

```bash
npm install @wq-design element-plus
```

### 使用 yarn

```bash
yarn add @wq-design element-plus
```

### 使用 pnpm

```bash
pnpm add @wq-design element-plus
```

## 完整引入

```js
import { createApp } from 'vue'
import WqDesign from '@wq-design'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@wq-design/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(WqDesign)
app.use(ElementPlus)
app.mount('#app')
```

## 按需引入

```js
import { createApp } from 'vue'
import { WqButton, WqForm } from '@wq-design'
import { ElButton, ElForm } from 'element-plus'
import 'element-plus/dist/index.css'
import '@wq-design/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('WqButton', WqButton)
app.component('WqForm', WqForm)
app.component('ElButton', ElButton)
app.component('ElForm', ElForm)
app.mount('#app')
```

## 组件使用示例

```vue
<template>
  <wq-button type="primary">主要按钮</wq-button>
  <wq-form :model="form" :rules="rules" ref="formRef">
    <wq-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </wq-form-item>
  </wq-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { WqButton, WqForm, WqFormItem } from '@wq-design'
import { ElInput } from 'element-plus'

const formRef = ref(null)
const form = reactive({
  username: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ]
}
</script>
```

## 常见问题

### 1. 如何自定义主题？

WqDesign 支持通过 CSS 变量和 SCSS 变量来自定义主题：

```scss
// 在你的项目中创建一个样式文件，例如 theme.scss
:root {
  --wq-primary-color: #409eff;
  --wq-border-radius: 4px;
  // 更多自定义变量...
}
```

### 2. 如何处理组件间的样式冲突？

WqDesign 的组件都带有 `wq-` 前缀，可以有效避免样式冲突。如果仍然遇到冲突，可以使用更具体的选择器：

```scss
.wq-form {
  .wq-form-item {
    // 你的自定义样式
  }
}
```

### 3. 如何获取组件实例？

可以通过 ref 获取组件实例：

```vue
<template>
  <wq-form ref="formRef">
    <!-- 表单内容 -->
  </wq-form>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)

// 调用组件方法
const validate = () => {
  formRef.value?.validate()
}
</script>
```

## 浏览器兼容性

- 现代浏览器
- Chrome >= 64
- Firefox >= 67
- Edge >= 79
- Safari >= 12
- Opera >= 51

## 相关链接

- [Element Plus 文档](https://element-plus.org/)
- [Vue 3 文档](https://v3.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
