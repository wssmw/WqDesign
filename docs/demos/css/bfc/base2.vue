<script setup></script>
<template>
  <div class="bfc">
    <div class="item">
      <h3>1. 未触发BFC（元素被浮动元素覆盖）</h3>
      <div class="left">我是左侧浮动内容</div>
      <div class="right">我是右侧内容,但是我没有浮动,没有bfc</div>
    </div>
    <div class="item has_bfc">
      <h3>2. 触发BFC（元素不被浮动元素覆盖）</h3>
      <div class="left">我是左侧浮动内容</div>
      <div class="right">我是右侧内容,但是我没有浮动,我有bfc</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bfc {
  display: flex;
  .item {
    .left {
      float: left;
      width: 60px;
      height: 60px;
      background-color: pink;
    }
    .right {
      width: 120px;
      height: 120px;
      background-color: cornflowerblue;
    }
  }
  .has_bfc {
    .right {
      overflow: hidden;
    }
  }
}
</style>
