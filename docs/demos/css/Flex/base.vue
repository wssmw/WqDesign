<script setup></script>
<template>
  <div class="flex">
    <div class="left">
      <h3>没有flex的效果</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
    <div class="right">
      <h3>有flex的效果</h3>
      <div class="father">
        <div class="child">第一个孩子</div>
        <div class="child">第二个孩子</div>
        <div class="child">第三个孩子</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex {
  display: flex;
  .child {
    width: 60px;
    height: 60px;
    background-color: pink;
    margin: 10px;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    .father {
      display: flex;
    }
  }
}
</style>
