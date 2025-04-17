<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="logo">WQ Design</div>
      <div class="header-right">
        <el-button type="primary" plain>GitHub</el-button>
      </div>
    </header>

    <div class="app-main">
      <!-- Sidebar Menu -->
      <aside class="app-sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          :collapse="false"
          router
        >
          <el-menu-item index="/">
            <el-icon><component :is="View" /></el-icon>
            <span>组件总览</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><component :is="Menu" /></el-icon>
              <span>基础组件</span>
            </template>
            <el-menu-item index="/components/button">Button 按钮</el-menu-item>
            <el-menu-item index="/components/input">Input 输入框</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><component :is="Grid" /></el-icon>
              <span>布局组件</span>
            </template>
            <el-menu-item index="/components/layout">Layout 布局</el-menu-item>
            <el-menu-item index="/components/grid">Grid 栅格</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </aside>

      <!-- Main Content -->
      <main class="app-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { View, Menu, Grid } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.app-main {
  display: flex;
  margin-top: 60px;
  height: calc(100vh - 60px);
}

.app-sidebar {
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
}

.sidebar-menu {
  border-right: none;
}

.app-content {
  flex: 1;
  margin-left: 240px;
  padding: 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
}
</style>
