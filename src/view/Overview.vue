<template>
  <div class="overview">
    <h1>组件总览</h1>
    <div class="component-grid">
      <el-card v-for="component in components" :key="component.name" class="component-card">
        <template #header>
          <div class="card-header">
            <span>{{ component.title }}</span>
            <el-tag size="small" :type="component.type">{{ component.type }}</el-tag>
          </div>
        </template>
        <div class="card-content">
          <el-icon :size="24" class="component-icon">
            <component :is="component.icon" />
          </el-icon>
          <p class="component-desc">{{ component.description }}</p>
        </div>
        <div class="card-footer">
          <el-button type="primary" link @click="goToComponent(component.path)">
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { View, Menu, Grid, Edit } from '@element-plus/icons-vue'

const router = useRouter()

const components = [
  {
    name: 'button',
    title: 'Button 按钮',
    type: '基础',
    icon: 'Edit',
    description: '常用的操作按钮，支持多种状态和样式。',
    path: '/components/button'
  },
  {
    name: 'input',
    title: 'Input 输入框',
    type: '基础',
    icon: 'Edit',
    description: '通过鼠标或键盘输入字符，支持多种类型。',
    path: '/components/input'
  },
  {
    name: 'layout',
    title: 'Layout 布局',
    type: '布局',
    icon: 'Grid',
    description: '用于布局的容器组件，方便快速搭建页面结构。',
    path: '/components/layout'
  },
  {
    name: 'grid',
    title: 'Grid 栅格',
    type: '布局',
    icon: 'Grid',
    description: '通过基础的 24 分栏，迅速简便地创建布局。',
    path: '/components/grid'
  }
]

const goToComponent = (path) => {
  router.push(path)
}
</script>

<style scoped>
.overview {
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  font-size: 28px;
  color: #303133;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.component-card {
  transition: all 0.3s;
}

.component-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

.component-icon {
  color: #409eff;
  margin-bottom: 10px;
}

.component-desc {
  color: #606266;
  font-size: 14px;
  margin: 10px 0;
}

.card-footer {
  text-align: right;
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
}
</style> 