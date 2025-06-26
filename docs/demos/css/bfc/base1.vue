<script setup></script>
<template>
  <div class="bfc">
    <h3>1.没有触发bfc时,内部有浮动元素则会高度塌陷</h3>
    <div class="bfc_1">
      <div class="box"></div>
    </div>
    <h3>2.触发bfc后,内部有浮动元素不会高度塌陷</h3>
    <div class="bfc_2">
      <div class="box"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bfc {
  .box {
    width: 20px;
    height: 20px;
    border: 1px solid black;
  }
  .bfc_1 {
    border: 1px solid black;
    .box {
      float: left;
    }
  }
  .bfc_2 {
    display: flex;
    border: 1px solid black;
    .box {
      float: left;
    }
  }
}
</style>
