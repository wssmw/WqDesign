<template>
  <div class="component-demo">
    <h1>Button 按钮</h1>
    <p class="description">常用的操作按钮，支持多种状态和样式。</p>

    <div class="demo-section">
      <h2>基础用法</h2>
      <div class="demo-block">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>不同尺寸</h2>
      <div class="demo-block">
        <el-button size="large">大型按钮</el-button>
        <el-button>默认按钮</el-button>
        <el-button size="small">小型按钮</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>禁用状态</h2>
      <div class="demo-block">
        <el-button disabled>禁用按钮</el-button>
        <el-button type="primary" disabled>禁用主要按钮</el-button>
        <el-button type="text" disabled>禁用文本按钮</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>加载状态</h2>
      <div class="demo-block">
        <el-button loading>加载中</el-button>
        <el-button type="primary" loading>加载中</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h2>图标按钮</h2>
      <div class="demo-block">
        <el-button icon="Search">搜索</el-button>
        <el-button type="primary" icon="Edit">编辑</el-button>
        <el-button type="success" icon="Check">成功</el-button>
        <el-button type="info" icon="Message">消息</el-button>
        <el-button type="warning" icon="Star">收藏</el-button>
        <el-button type="danger" icon="Delete">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'
</script>

<style scoped>
.component-demo {
  padding: 20px;
}

h1 {
  margin-bottom: 10px;
  font-size: 28px;
  color: #303133;
}

.description {
  color: #606266;
  font-size: 14px;
  margin-bottom: 30px;
}

.demo-section {
  margin-bottom: 40px;
}

h2 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 20px;
}

.demo-block {
  padding: 24px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}

.demo-block .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style> 